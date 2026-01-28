# IR Automation Playbook 🎯
## Fort Lewis College - Institutional Research Analyst

**Status:** AI-Native Automation Strategy  
**Goal:** Job on autopilot → Side project freedom  
**Philosophy:** CLI-first, data-centric, AI-augmented

---

## 🎪 The Situation

- Inherited role with **zero training**
- **30 years of legacy:** queries, Excel books, Tableau workbooks, Pyramid analytics
- Recent **Workday migration** — behind on rebuilding reports
- Upcoming **stipend project:** comparative salary analysis (FLC vs peers vs private industry vs BLS)
- Winn's superpower: Can automate this entire job

---

## 🚀 Quick Wins (Automate TODAY)

### 1. BLS Salary Data Fetcher
**Time to build:** 2 hours  
**Impact:** Eliminates manual salary research

```bash
# Example CLI
flc bls salaries --occupation "postsecondary teachers" --area "Colorado" --year 2024
```

The BLS Public Data API v2.0 is **free** (with registration) and provides:
- OEWS (Occupational Employment & Wage Statistics) - the goldmine
- Up to 50 series per request
- 20 years of historical data
- JSON or Excel output

**Series ID format for OEWS:** `OEWS{area_code}{occupation_code}{data_type}`

### 2. IPEDS Data Puller
**Time to build:** 3 hours  
**Impact:** Instant peer comparisons

IPEDS provides complete institutional data:
- Enrollment, completions, graduation rates
- Employee headcounts & salaries
- Institutional finances
- Available as CSV downloads or via Data Tools API

```bash
flc ipeds pull --institution "Fort Lewis College" --peers "Adams State,Western Colorado"
flc ipeds compare --metric enrollment --years 2020-2024
```

### 3. Report Template Generator
**Time to build:** 4 hours  
**Impact:** Standardized outputs, no manual formatting

```bash
flc report generate --template enrollment-summary --format pdf
flc report generate --template ipeds-feedback --compare-peers
```

---

## 📊 Data Sources & APIs

### Bureau of Labor Statistics (BLS) API

| Feature | v1.0 (Public) | v2.0 (Registered) |
|---------|---------------|-------------------|
| Registration | Not required | Required (free) |
| Daily queries | 25 | 500 |
| Series per query | 25 | 50 |
| Years per query | 10 | 20 |
| Calculations | No | Yes |

**Key Endpoints:**
```
GET  https://api.bls.gov/publicAPI/v2/timeseries/data/{series_id}
POST https://api.bls.gov/publicAPI/v2/timeseries/data/
GET  https://api.bls.gov/publicAPI/v2/surveys (list all surveys)
```

**Relevant Series:**
- `OE` - Occupational Employment & Wages (OEWS) ⭐
- `CE` - Employment, Hours, and Earnings
- `LA` - Local Area Unemployment Statistics
- `WM` - Modeled Wage Estimates (area-specific)

**OEWS Series ID Structure:**
```
OEUS[area][industry][occupation][datatype]

Example: OEUN0000000000025113213 
- OE = OEWS survey
- US = National
- 000000 = All industries
- 25-1000 = Postsecondary Teachers
- 13 = Annual mean wage
```

### IPEDS Data Access

**Direct Downloads:**
- Complete Data Files: https://nces.ed.gov/ipeds/datacenter/DataFiles.aspx
- Custom Data Files: CSV format, 1980-present
- Access Databases: 2004-present

**Data Feedback Reports:**
- Compare your institution against peers
- Pre-built visualizations
- Export to PDF/Excel

**Survey Components (12 total):**
1. Institutional Characteristics (IC)
2. Completions (C)
3. Fall Enrollment (EF)
4. Graduation Rates (GR)
5. Student Financial Aid (SFA)
6. Finance (F)
7. Human Resources (HR) ⭐ for salary analysis
8. Academic Libraries (AL)
9. Admissions (ADM)
10. Outcome Measures (OM)
11. 12-month Enrollment (E12)
12. Fall Staff (S)

### CUPA-HR (College & University Professional Association)
**The industry standard for higher ed salary benchmarking**

- Requires membership/subscription
- Most comprehensive higher ed salary data
- Position-level granularity
- Includes benefits data

If FLC has CUPA-HR access: **Use it.** Most accurate peer comparisons.

### Workday Integration Options

FLC recently migrated to Workday. Here's how to get data out:

#### 1. Workday Report Writer (Easiest)
- Build custom reports in Workday
- Schedule exports (CSV, Excel)
- Good for: Regular operational reports

#### 2. Workday Web Services (WWS) - SOAP API
```
Human_Resources          - Employee data, org structures
Compensation            - Pay data, salary grades
Compensation_Review     - Merit/market adjustments  
Staffing                - Positions, hiring
Financial_Management    - Budgets, actuals
Student_Records         - Enrollment, courses
Student_Core            - Student demographics
Academic_Foundation     - Programs, institutions
Admissions              - Applications, yield
Financial_Aid           - Aid packages, disbursements
```

#### 3. Workday Prism Analytics
- Direct data lake access
- Can join Workday data with external sources
- Good for: Complex analytics

#### 4. Workday REST API
- Modern alternative to SOAP
- Requires tenant configuration
- Good for: Real-time integrations

**Recommended Approach:**
1. **Short-term:** Export scheduled reports (CSV) → Process with CLI tools
2. **Medium-term:** Request SOAP API access for key reports
3. **Long-term:** Prism Analytics for advanced cross-data analysis

---

## 💰 Salary Analysis Project Architecture

### The Stipend Project

**Objective:** Compare FLC salaries against:
1. Peer institutions (via IPEDS/CUPA-HR)
2. Private industry (via BLS OEWS)
3. Colorado market (via state data + BLS area)
4. National benchmarks (via BLS national)

### Data Pipeline

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Workday       │────▶│   ETL Layer     │────▶│   Analysis DB   │
│   (FLC data)    │     │   (CLI tools)   │     │   (SQLite/DuckDB)│
└─────────────────┘     └─────────────────┘     └─────────────────┘
                               ▲                        │
┌─────────────────┐           │                        ▼
│   BLS API       │───────────┤              ┌─────────────────┐
│   (OEWS wages)  │           │              │   Report Gen    │
└─────────────────┘           │              │   (AI-assisted) │
                              │              └─────────────────┘
┌─────────────────┐           │                        │
│   IPEDS         │───────────┤                        ▼
│   (Peer data)   │           │              ┌─────────────────┐
└─────────────────┘           │              │   Outputs       │
                              │              │   PDF/Excel/Web │
┌─────────────────┐           │              └─────────────────┘
│   CUPA-HR       │───────────┘
│   (If available)│
└─────────────────┘
```

### Database Schema (DuckDB/SQLite)

```sql
-- FLC positions from Workday export
CREATE TABLE flc_positions (
    position_id VARCHAR PRIMARY KEY,
    title VARCHAR,
    department VARCHAR,
    job_family VARCHAR,
    soc_code VARCHAR,  -- Standard Occupational Classification
    salary_current DECIMAL,
    fte DECIMAL,
    hire_date DATE
);

-- BLS wage data
CREATE TABLE bls_wages (
    series_id VARCHAR,
    soc_code VARCHAR,
    area_code VARCHAR,
    year INT,
    period VARCHAR,
    wage_annual DECIMAL,
    wage_hourly DECIMAL,
    pct_10 DECIMAL,
    pct_25 DECIMAL,
    pct_50 DECIMAL,  -- median
    pct_75 DECIMAL,
    pct_90 DECIMAL
);

-- IPEDS peer institution data
CREATE TABLE ipeds_salaries (
    unitid INT,
    institution_name VARCHAR,
    year INT,
    faculty_rank VARCHAR,
    avg_salary DECIMAL,
    headcount INT
);

-- Comparison view
CREATE VIEW salary_analysis AS
SELECT 
    p.title,
    p.department,
    p.salary_current AS flc_salary,
    b.pct_50 AS market_median,
    b.pct_75 AS market_75th,
    ROUND((p.salary_current - b.pct_50) / b.pct_50 * 100, 1) AS pct_vs_median
FROM flc_positions p
JOIN bls_wages b ON p.soc_code = b.soc_code
WHERE b.area_code = '000000'  -- National
  AND b.year = 2024;
```

### Position → SOC Code Mapping

Critical step: Map FLC job titles to Standard Occupational Classification (SOC) codes.

**Approach:**
1. Export FLC positions with titles + job families
2. Use AI to suggest SOC codes based on title/description
3. Manual review for accuracy
4. Store mapping table for reuse

```bash
flc positions map-soc --input positions.csv --output mapped.csv
# Uses AI to suggest SOC codes, human reviews
```

---

## 🛠️ Tools to Build

### Core CLI: `flc` (Fort Lewis College IR Toolkit)

```
flc
├── bls           # BLS data operations
│   ├── fetch     # Fetch wage data by SOC/area
│   ├── series    # Look up series IDs
│   └── compare   # Compare occupations
│
├── ipeds         # IPEDS data operations
│   ├── pull      # Download institution data
│   ├── peers     # Define peer groups
│   └── compare   # Cross-institution comparisons
│
├── workday       # Workday data processing
│   ├── import    # Import Workday exports
│   ├── map-soc   # Map positions to SOC codes
│   └── export    # Prepare data for analysis
│
├── salary        # Salary analysis
│   ├── benchmark # Run full benchmark analysis
│   ├── gaps      # Identify salary gaps
│   └── report    # Generate salary report
│
├── report        # General reporting
│   ├── generate  # Generate from template
│   ├── templates # List available templates
│   └── schedule  # Set up recurring reports
│
└── db            # Database management
    ├── init      # Initialize analysis DB
    ├── load      # Load data into DB
    └── query     # Run ad-hoc queries
```

### Tool 1: BLS Data Fetcher (BUILD FIRST)
**File:** `tools/flc-bls.ts`

Features:
- Fetch OEWS data by occupation, area, year
- Cache results to avoid API limits
- Output to JSON, CSV, or direct to DB
- Handle series ID construction

### Tool 2: IPEDS Puller
**File:** `tools/flc-ipeds.ts`

Features:
- Download complete data files
- Parse and normalize
- Define and save peer groups
- Generate comparison tables

### Tool 3: Position Mapper
**File:** `tools/flc-mapper.ts`

Features:
- Read Workday position exports
- AI-assisted SOC code matching
- Manual override interface
- Store mappings for reuse

### Tool 4: Salary Analyzer
**File:** `tools/flc-salary.ts`

Features:
- Combine all data sources
- Calculate position-level comparisons
- Generate summary statistics
- Export analysis-ready datasets

### Tool 5: Report Generator
**File:** `tools/flc-report.ts`

Features:
- Markdown → PDF/Excel conversion
- Template system with variables
- Charts via mermaid or built-in
- Schedule via cron

---

## 📅 Timeline to Job on Autopilot

### Week 1: Foundation
- [ ] Register for BLS API key (free, instant)
- [ ] Build BLS data fetcher
- [ ] Download IPEDS complete data files
- [ ] Export current Workday position data

### Week 2: Data Pipeline
- [ ] Build IPEDS parser
- [ ] Set up DuckDB database
- [ ] Import FLC positions
- [ ] Create SOC code mappings

### Week 3: Salary Analysis MVP
- [ ] Build salary comparison queries
- [ ] Generate first benchmark report
- [ ] Validate against known data
- [ ] Iterate on methodology

### Week 4: Automation
- [ ] Schedule weekly Workday exports
- [ ] Set up monthly BLS refreshes
- [ ] Build report templates
- [ ] Document everything

### Month 2+: Expansion
- [ ] Add more report types
- [ ] Automate IPEDS submissions
- [ ] Build dashboard (optional)
- [ ] Train replacement (optional 😈)

---

## 🤖 AI-Native Patterns

### 1. AI-Assisted SOC Mapping
```typescript
// Use Claude to map job titles to SOC codes
async function suggestSOC(title: string, description: string) {
  const prompt = `Given this job title and description, suggest the most appropriate 
  Standard Occupational Classification (SOC) code. Return just the 6-digit code.
  
  Title: ${title}
  Description: ${description}
  
  SOC Code:`;
  // Claude returns "25-1065" (Political Science Teachers, Postsecondary)
}
```

### 2. AI-Generated Report Narratives
```typescript
// Generate executive summary from data
async function generateNarrative(analysisResults: SalaryAnalysis) {
  const prompt = `Write a 2-paragraph executive summary of this salary analysis:
  
  ${JSON.stringify(analysisResults, null, 2)}
  
  Focus on: key findings, positions requiring attention, comparison to market.`;
}
```

### 3. AI Query Interface
```typescript
// Natural language to SQL
async function queryData(question: string) {
  const prompt = `Convert this question to a SQL query for our salary analysis database:
  "${question}"
  
  Available tables: flc_positions, bls_wages, ipeds_salaries
  Return only the SQL query.`;
}

// Usage: "Show me all positions more than 15% below market median"
```

### 4. Anomaly Detection
```typescript
// Flag unusual patterns
async function detectAnomalies(data: SalaryData[]) {
  const prompt = `Review this salary data and identify any anomalies or concerns:
  
  ${JSON.stringify(data)}
  
  Look for: outliers, compression issues, equity concerns, missing data.`;
}
```

---

## 📚 Key Resources

### BLS
- API Registration: https://data.bls.gov/registrationEngine/
- API Documentation: https://www.bls.gov/developers/
- OEWS Overview: https://www.bls.gov/oes/
- SOC Code Search: https://www.bls.gov/soc/

### IPEDS
- Data Center: https://nces.ed.gov/ipeds/
- Complete Data Files: https://nces.ed.gov/ipeds/datacenter/DataFiles.aspx
- Data Feedback Reports: https://nces.ed.gov/ipeds/use-the-data

### Workday
- WWS API Documentation: https://community.workday.com/
- Integration Cloud: Check with FLC IT for access

### CUPA-HR
- Website: https://www.cupahr.org/surveys/
- Check if FLC has institutional access

---

## 🎯 Success Metrics

**Phase 1 (Month 1):** 
- Salary analysis takes <1 hour instead of 1 week
- Can regenerate any report in <5 minutes

**Phase 2 (Month 2-3):**
- Weekly reports auto-generated
- Ad-hoc requests answered same-day
- Data always current

**Phase 3 (Ongoing):**
- Job runs on autopilot
- Time freed for value-add analysis
- Side projects flourish 🚀

---

## Next Step

**Build the BLS Data Fetcher** — it's the highest-impact, lowest-complexity tool. Once you can pull salary data programmatically, everything else accelerates.

```bash
# Coming soon
flc bls fetch --soc 25-1000 --area Colorado --year 2024
```

---

*"The best IR analyst is one whose reports generate themselves."*
