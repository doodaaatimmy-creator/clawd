#!/usr/bin/env npx tsx
/**
 * BLS Data Fetcher - Fort Lewis College IR Toolkit
 * 
 * Fetches wage data from Bureau of Labor Statistics API v2.0
 * Primary focus: OEWS (Occupational Employment & Wage Statistics)
 * 
 * Usage:
 *   npx tsx bls-fetcher.ts fetch --soc 25-1000 --area Colorado
 *   npx tsx bls-fetcher.ts series --survey OE
 *   npx tsx bls-fetcher.ts compare --socs "25-1011,25-1021" --areas "CO,US"
 */

import * as fs from 'fs';
import * as path from 'path';

// ============================================================================
// Configuration
// ============================================================================

const BLS_API_V2 = 'https://api.bls.gov/publicAPI/v2/timeseries/data/';
const BLS_API_KEY = process.env.BLS_API_KEY || ''; // Get from https://data.bls.gov/registrationEngine/

// Cache directory
const CACHE_DIR = path.join(process.env.HOME || '.', '.cache', 'flc-bls');

// OEWS Data Types
const OEWS_DATA_TYPES: Record<string, string> = {
  '01': 'Employment',
  '02': 'Employment percent relative standard error',
  '03': 'Hourly mean wage',
  '04': 'Annual mean wage',
  '05': 'Wage percent relative standard error',
  '06': 'Hourly 10th percentile wage',
  '07': 'Hourly 25th percentile wage',
  '08': 'Hourly median wage',
  '09': 'Hourly 75th percentile wage',
  '10': 'Hourly 90th percentile wage',
  '11': 'Annual 10th percentile wage',
  '12': 'Annual 25th percentile wage',
  '13': 'Annual median wage',
  '14': 'Annual 75th percentile wage',
  '15': 'Annual 90th percentile wage',
};

// Common area codes
const AREA_CODES: Record<string, string> = {
  'US': '0000000',      // National
  'CO': 'S0800000',     // Colorado statewide
  'Durango': 'M0020420', // Durango, CO MSA (if available)
  // Add more as needed
};

// ============================================================================
// Types
// ============================================================================

interface BLSResponse {
  status: string;
  responseTime: number;
  message: string[];
  Results: {
    series: BLSSeries[];
  };
}

interface BLSSeries {
  seriesID: string;
  catalog?: {
    series_title: string;
    survey_name: string;
    area: string;
    occupation: string;
  };
  data: BLSDataPoint[];
}

interface BLSDataPoint {
  year: string;
  period: string;
  periodName: string;
  value: string;
  footnotes: { code: string; text: string }[];
  calculations?: {
    net_changes: Record<string, string>;
    pct_changes: Record<string, string>;
  };
}

interface WageData {
  seriesId: string;
  occupation: string;
  socCode: string;
  area: string;
  year: number;
  period: string;
  dataType: string;
  value: number;
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Ensure cache directory exists
 */
function ensureCacheDir(): void {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }
}

/**
 * Get cache file path for a request
 */
function getCachePath(key: string): string {
  const sanitized = key.replace(/[^a-zA-Z0-9-_]/g, '_');
  return path.join(CACHE_DIR, `${sanitized}.json`);
}

/**
 * Check if cache is valid (less than 24 hours old)
 */
function isCacheValid(cachePath: string, maxAgeHours = 24): boolean {
  if (!fs.existsSync(cachePath)) return false;
  
  const stats = fs.statSync(cachePath);
  const ageMs = Date.now() - stats.mtimeMs;
  const maxAgeMs = maxAgeHours * 60 * 60 * 1000;
  
  return ageMs < maxAgeMs;
}

/**
 * Build OEWS series ID
 * Format: OEUS{area}{industry}{occupation}{datatype}
 * 
 * Example: OEUN0000000000025101113
 *   - OE = OEWS survey
 *   - U = Ownership (U=total, private, govt, etc.)
 *   - N = National
 *   - 0000000000 = All industries (NAICS)
 *   - 25-1011 = SOC code (Postsecondary: Business)
 *   - 13 = Annual median wage
 */
function buildOEWSSeriesId(
  socCode: string,
  areaCode: string = '0000000',
  dataType: string = '13', // Annual median
  ownership: string = 'N', // National
  industry: string = '000000' // All industries
): string {
  // Remove dash from SOC code
  const soc = socCode.replace('-', '');
  
  // Pad as needed
  const area = areaCode.padEnd(7, '0').substring(0, 7);
  const ind = industry.padEnd(6, '0').substring(0, 6);
  
  return `OEU${ownership}${area}${ind}${soc}${dataType}`;
}

/**
 * Fetch data from BLS API
 */
async function fetchBLS(
  seriesIds: string[],
  startYear?: number,
  endYear?: number,
  useCache = true
): Promise<BLSResponse> {
  const cacheKey = `${seriesIds.join('_')}_${startYear}_${endYear}`;
  const cachePath = getCachePath(cacheKey);
  
  // Check cache first
  if (useCache && isCacheValid(cachePath)) {
    console.log(`📦 Using cached data: ${cachePath}`);
    const cached = fs.readFileSync(cachePath, 'utf8');
    return JSON.parse(cached);
  }
  
  // Build request
  const currentYear = new Date().getFullYear();
  const payload: Record<string, any> = {
    seriesid: seriesIds,
    startyear: String(startYear || currentYear - 2),
    endyear: String(endYear || currentYear),
    catalog: true,
    calculations: true,
    annualaverage: true,
  };
  
  if (BLS_API_KEY) {
    payload.registrationkey = BLS_API_KEY;
  }
  
  console.log(`🌐 Fetching from BLS API: ${seriesIds.length} series...`);
  
  const response = await fetch(BLS_API_V2, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  
  if (!response.ok) {
    throw new Error(`BLS API error: ${response.status} ${response.statusText}`);
  }
  
  const data: BLSResponse = await response.json();
  
  if (data.status !== 'REQUEST_SUCCEEDED') {
    throw new Error(`BLS API request failed: ${data.message.join(', ')}`);
  }
  
  // Cache the response
  ensureCacheDir();
  fs.writeFileSync(cachePath, JSON.stringify(data, null, 2));
  
  return data;
}

/**
 * Parse BLS response into structured wage data
 */
function parseWageData(response: BLSResponse): WageData[] {
  const results: WageData[] = [];
  
  for (const series of response.Results.series) {
    for (const dataPoint of series.data) {
      // Skip if no value
      if (!dataPoint.value || dataPoint.value === '-') continue;
      
      results.push({
        seriesId: series.seriesID,
        occupation: series.catalog?.occupation || 'Unknown',
        socCode: extractSOCFromSeriesId(series.seriesID),
        area: series.catalog?.area || 'Unknown',
        year: parseInt(dataPoint.year),
        period: dataPoint.periodName,
        dataType: extractDataTypeFromSeriesId(series.seriesID),
        value: parseFloat(dataPoint.value),
      });
    }
  }
  
  return results;
}

/**
 * Extract SOC code from series ID
 */
function extractSOCFromSeriesId(seriesId: string): string {
  // OEWS series: OEUNXXXXXXYYYYYY## 
  // SOC is positions 14-19 (0-indexed), need to insert dash
  if (seriesId.startsWith('OE') && seriesId.length >= 21) {
    const soc = seriesId.substring(14, 20);
    return `${soc.substring(0, 2)}-${soc.substring(2)}`;
  }
  return 'Unknown';
}

/**
 * Extract data type from series ID
 */
function extractDataTypeFromSeriesId(seriesId: string): string {
  if (seriesId.startsWith('OE') && seriesId.length >= 22) {
    const typeCode = seriesId.substring(20, 22);
    return OEWS_DATA_TYPES[typeCode] || typeCode;
  }
  return 'Unknown';
}

// ============================================================================
// CLI Commands
// ============================================================================

/**
 * Fetch wage data for specified SOC codes and areas
 */
async function cmdFetch(args: string[]): Promise<void> {
  // Parse arguments
  let socs: string[] = [];
  let areas: string[] = ['US'];
  let dataTypes: string[] = ['13']; // Annual median by default
  let startYear: number | undefined;
  let endYear: number | undefined;
  let output = 'table';
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    const next = args[i + 1];
    
    switch (arg) {
      case '--soc':
      case '-s':
        socs = next.split(',').map(s => s.trim());
        i++;
        break;
      case '--area':
      case '-a':
        areas = next.split(',').map(s => s.trim());
        i++;
        break;
      case '--type':
      case '-t':
        dataTypes = next.split(',').map(s => s.trim());
        i++;
        break;
      case '--start':
        startYear = parseInt(next);
        i++;
        break;
      case '--end':
        endYear = parseInt(next);
        i++;
        break;
      case '--output':
      case '-o':
        output = next;
        i++;
        break;
    }
  }
  
  if (socs.length === 0) {
    console.log('Usage: bls-fetcher fetch --soc 25-1011 [--area CO,US] [--type 13] [--start 2022] [--end 2024]');
    console.log('\nData types:');
    for (const [code, desc] of Object.entries(OEWS_DATA_TYPES)) {
      console.log(`  ${code}: ${desc}`);
    }
    return;
  }
  
  // Build series IDs
  const seriesIds: string[] = [];
  for (const soc of socs) {
    for (const area of areas) {
      for (const dataType of dataTypes) {
        const areaCode = AREA_CODES[area] || area;
        seriesIds.push(buildOEWSSeriesId(soc, areaCode, dataType));
      }
    }
  }
  
  console.log(`\n📊 Fetching OEWS data for:`);
  console.log(`   SOC codes: ${socs.join(', ')}`);
  console.log(`   Areas: ${areas.join(', ')}`);
  console.log(`   Data types: ${dataTypes.join(', ')}`);
  console.log(`   Series IDs: ${seriesIds.join(', ')}\n`);
  
  try {
    const response = await fetchBLS(seriesIds, startYear, endYear);
    const wageData = parseWageData(response);
    
    if (wageData.length === 0) {
      console.log('⚠️  No data found for the specified criteria.');
      console.log('   This could mean:');
      console.log('   - The SOC code is invalid or too specific');
      console.log('   - The area code is not in OEWS data');
      console.log('   - Data is suppressed for confidentiality');
      return;
    }
    
    // Output results
    switch (output) {
      case 'json':
        console.log(JSON.stringify(wageData, null, 2));
        break;
      case 'csv':
        console.log('seriesId,occupation,socCode,area,year,period,dataType,value');
        for (const d of wageData) {
          console.log(`${d.seriesId},${d.occupation},${d.socCode},${d.area},${d.year},${d.period},${d.dataType},${d.value}`);
        }
        break;
      default: // table
        console.log('\n📈 Results:\n');
        console.log('SOC Code   | Year | Area              | Value      | Type');
        console.log('-----------|------|-------------------|------------|------------------------');
        for (const d of wageData) {
          const areaShort = d.area.length > 15 ? d.area.substring(0, 15) + '...' : d.area.padEnd(17);
          const valueStr = d.value.toLocaleString().padStart(10);
          console.log(`${d.socCode} | ${d.year} | ${areaShort} | $${valueStr} | ${d.dataType}`);
        }
    }
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

/**
 * List available surveys and series
 */
async function cmdSeries(args: string[]): Promise<void> {
  console.log('\n📋 Common OEWS SOC Codes for Higher Education:\n');
  
  const higherEdSOCs = [
    ['25-1000', 'Postsecondary Teachers (all)'],
    ['25-1011', 'Business Teachers, Postsecondary'],
    ['25-1021', 'Computer Science Teachers, Postsecondary'],
    ['25-1031', 'Architecture Teachers, Postsecondary'],
    ['25-1032', 'Engineering Teachers, Postsecondary'],
    ['25-1041', 'Agricultural Sciences Teachers, Postsecondary'],
    ['25-1042', 'Biological Science Teachers, Postsecondary'],
    ['25-1043', 'Forestry Teachers, Postsecondary'],
    ['25-1051', 'Atmospheric, Earth, Marine Teachers, Postsecondary'],
    ['25-1052', 'Chemistry Teachers, Postsecondary'],
    ['25-1053', 'Environmental Science Teachers, Postsecondary'],
    ['25-1054', 'Physics Teachers, Postsecondary'],
    ['25-1061', 'Anthropology Teachers, Postsecondary'],
    ['25-1062', 'Area/Ethnic/Cultural Studies Teachers, Postsecondary'],
    ['25-1063', 'Economics Teachers, Postsecondary'],
    ['25-1064', 'Geography Teachers, Postsecondary'],
    ['25-1065', 'Political Science Teachers, Postsecondary'],
    ['25-1066', 'Psychology Teachers, Postsecondary'],
    ['25-1067', 'Sociology Teachers, Postsecondary'],
    ['25-1069', 'Social Sciences Teachers, Postsecondary, Other'],
    ['25-1071', 'Health Specialties Teachers, Postsecondary'],
    ['25-1072', 'Nursing Instructors, Postsecondary'],
    ['25-1081', 'Education Teachers, Postsecondary'],
    ['25-1082', 'Library Science Teachers, Postsecondary'],
    ['25-1111', 'Criminal Justice Teachers, Postsecondary'],
    ['25-1112', 'Law Teachers, Postsecondary'],
    ['25-1113', 'Social Work Teachers, Postsecondary'],
    ['25-1121', 'Art/Drama/Music Teachers, Postsecondary'],
    ['25-1122', 'Communications Teachers, Postsecondary'],
    ['25-1123', 'English Language Teachers, Postsecondary'],
    ['25-1124', 'Foreign Language Teachers, Postsecondary'],
    ['25-1125', 'History Teachers, Postsecondary'],
    ['25-1126', 'Philosophy/Religion Teachers, Postsecondary'],
    ['25-1191', 'Graduate Teaching Assistants'],
    ['25-1192', 'Home Economics Teachers, Postsecondary'],
    ['25-1193', 'Recreation/Fitness Teachers, Postsecondary'],
    ['25-1194', 'Career/Technical Education Teachers, Postsecondary'],
    ['25-1199', 'Postsecondary Teachers, All Other'],
    ['11-9033', 'Education Administrators, Postsecondary'],
    ['25-4010', 'Archivists, Curators, Museum Technicians'],
    ['25-4022', 'Librarians and Media Collections Specialists'],
  ];
  
  for (const [code, title] of higherEdSOCs) {
    console.log(`  ${code}  ${title}`);
  }
  
  console.log('\n🗺️  Area Codes:\n');
  for (const [name, code] of Object.entries(AREA_CODES)) {
    console.log(`  ${name.padEnd(10)} ${code}`);
  }
  
  console.log('\n📊 Data Types:\n');
  for (const [code, desc] of Object.entries(OEWS_DATA_TYPES)) {
    console.log(`  ${code}  ${desc}`);
  }
}

/**
 * Compare multiple SOC codes/areas
 */
async function cmdCompare(args: string[]): Promise<void> {
  // Parse --socs and --areas, then fetch all combinations
  // Show side-by-side comparison
  console.log('Compare command - coming soon!');
  console.log('For now, use: bls-fetcher fetch --soc 25-1011,25-1021 --area CO,US');
}

/**
 * Show help
 */
function cmdHelp(): void {
  console.log(`
🏛️  BLS Data Fetcher - Fort Lewis College IR Toolkit

USAGE:
  npx tsx bls-fetcher.ts <command> [options]

COMMANDS:
  fetch     Fetch wage data for specified SOC codes
  series    List available SOC codes and data types
  compare   Compare wages across occupations/areas
  help      Show this help message

FETCH OPTIONS:
  --soc, -s      SOC code(s), comma-separated (e.g., 25-1011,25-1021)
  --area, -a     Area code(s): US, CO, or BLS area code (default: US)
  --type, -t     Data type(s): 01-15 (default: 13 = annual median)
  --start        Start year (default: current year - 2)
  --end          End year (default: current year)
  --output, -o   Output format: table, json, csv (default: table)

EXAMPLES:
  # Fetch median annual wage for Computer Science teachers, national
  npx tsx bls-fetcher.ts fetch --soc 25-1021

  # Fetch multiple SOC codes for Colorado
  npx tsx bls-fetcher.ts fetch --soc 25-1011,25-1021,25-1031 --area CO

  # Get all percentiles for a position
  npx tsx bls-fetcher.ts fetch --soc 25-1021 --type 11,12,13,14,15

  # Output as JSON
  npx tsx bls-fetcher.ts fetch --soc 25-1000 --output json

ENVIRONMENT:
  BLS_API_KEY    Your BLS API v2.0 registration key (optional but recommended)
                 Get one free at: https://data.bls.gov/registrationEngine/

NOTES:
  - Without API key: 25 queries/day, 25 series/query, 10 years max
  - With API key: 500 queries/day, 50 series/query, 20 years max
  - Results are cached for 24 hours in ~/.cache/flc-bls/
`);
}

// ============================================================================
// Main
// ============================================================================

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const command = args[0] || 'help';
  const commandArgs = args.slice(1);
  
  switch (command) {
    case 'fetch':
      await cmdFetch(commandArgs);
      break;
    case 'series':
      await cmdSeries(commandArgs);
      break;
    case 'compare':
      await cmdCompare(commandArgs);
      break;
    case 'help':
    default:
      cmdHelp();
  }
}

main().catch(console.error);
