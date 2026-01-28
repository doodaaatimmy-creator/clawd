# FLC IR Automation Tools

CLI-first tools for Fort Lewis College Institutional Research.

## Quick Start

```bash
# Navigate to tools directory
cd /Users/clawdchad/clawd/ideas/ir-automation/tools

# Run BLS fetcher (no dependencies needed - uses npx tsx)
npx tsx bls-fetcher.ts help
npx tsx bls-fetcher.ts series
npx tsx bls-fetcher.ts fetch --soc 25-1021 --area US
```

## Tools

### bls-fetcher.ts
Fetch wage data from BLS OEWS (Occupational Employment & Wage Statistics).

```bash
# List available SOC codes for higher ed
npx tsx bls-fetcher.ts series

# Fetch median wage for Computer Science teachers (national)
npx tsx bls-fetcher.ts fetch --soc 25-1021

# Fetch for Colorado
npx tsx bls-fetcher.ts fetch --soc 25-1021 --area CO

# Multiple occupations, JSON output
npx tsx bls-fetcher.ts fetch --soc 25-1011,25-1021,25-1031 --output json
```

## BLS API Key (Recommended)

Get a free API key for higher limits:
https://data.bls.gov/registrationEngine/

```bash
export BLS_API_KEY="your-key-here"
```

Without key: 25 queries/day, 25 series/query
With key: 500 queries/day, 50 series/query

## Coming Soon

- `ipeds-puller.ts` - Download and parse IPEDS data
- `workday-mapper.ts` - Map Workday positions to SOC codes
- `salary-analyzer.ts` - Full comparative analysis
- `report-generator.ts` - Generate formatted reports
