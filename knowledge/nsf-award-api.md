# NSF Award Search API - Grant Forge Integration Research

## Overview

The NSF Award Search API provides **free, public access** to all NSF-funded awards from 2007 onward. This complements NIH RePORTER by covering the other major federal science funding agency, enabling comprehensive grant research.

**Key URLs:**
- API Base: `http://api.nsf.gov/services/v1/`
- Documentation: https://resources.research.gov/common/webapi/awardapisearch-v1.htm
- Web Interface: https://www.nsf.gov/funding/award-search
- Developer Portal: https://www.nsf.gov/digital/developer

## API Endpoints

### Three Main Endpoints

```
# Search awards (with parameters)
GET http://api.nsf.gov/services/v1/awards.{format}?parameters

# Get specific award by ID
GET http://api.nsf.gov/services/v1/awards/{id}.{format}

# Get project outcomes for an award
GET http://api.nsf.gov/services/v1/awards/{id}/projectoutcomes.{format}
```

**Formats:** `xml`, `json` (append `.xml` or `.json`)

## Data Available

### Award Information
| Field | Description | Training Value |
|-------|-------------|----------------|
| `title` | Award title | High - learn compelling titles |
| `abstractText` | Full abstract | **Critical** - funded proposal language |
| `estimatedTotalAmt` | Total funding amount | Budget benchmarking |
| `startDate` / `expDate` | Project dates | Timeline patterns |
| `transType` | Grant type (Standard/Continuing) | Grant structure |
| `projectOutComesReport` | Final outcomes (HTML) | Results/impact language |

### Investigator Details
| Field | Description |
|-------|-------------|
| `pdPIName` | Principal Investigator name |
| `piFirstName`, `piLastName`, `piMiddeInitial` | PI name components |
| `piEmail` | PI email address |
| `coPDPI` | Co-Principal Investigators |
| `poName`, `poEmail`, `poPhone` | Program Officer info |

### Institution Information
| Field | Description |
|-------|-------------|
| `awardeeName` | Institution name |
| `awardeeAddress`, `awardeeCity`, `awardeeStateCode` | Location |
| `awardeeZipCode` | 9-digit zip |
| `awardeeDistrictCode` | Congressional district |
| `ueiNumber` | Unique Entity Identifier |
| `perfLocation` | Performance site |

### NSF Organization Structure
| Field | Description |
|-------|-------------|
| `dirAbbr` | Directorate abbreviation (EDU, ENG, etc.) |
| `divAbbr` | Division abbreviation |
| `orgCodeDir`, `orgCodeDiv` | 8-digit org codes |
| `orgLongName`, `orgLongName2` | Full directorate/division names |
| `fundProgramName` | Funding program name |
| `progEleCode` | Program Element Code (6 digits) |
| `progRefCode` | Program Reference Code |
| `cfdaNumber` | Federal assistance catalog number |

### Financial Fields
| Field | Description |
|-------|-------------|
| `estimatedTotalAmt` | Total award amount |
| `fundsObligatedAmt` | Obligated funds |
| `fundsObligated` | Array of FY obligations |

## Sample API Requests

### Basic Keyword Search
```bash
# Search for "machine learning" awards
curl "http://api.nsf.gov/services/v1/awards.json?keyword=machine+learning"
```

### Get Specific Award
```bash
curl "http://api.nsf.gov/services/v1/awards/1052893.json"
```

### Advanced Search with Multiple Parameters
```bash
# Active AI awards from Stanford, >$500K
curl "http://api.nsf.gov/services/v1/awards.json?\
keyword=artificial+intelligence&\
ActiveAwards=true&\
awardeeName=stanford&\
estimatedTotalAmtFrom=500000"
```

### Get Project Outcomes
```bash
curl "http://api.nsf.gov/services/v1/awards/1052893/projectoutcomes.json"
```

### Date Range Search
```bash
# Awards starting in 2024
curl "http://api.nsf.gov/services/v1/awards.json?\
startDateStart=01/01/2024&\
startDateEnd=12/31/2024"
```

### Filter by Directorate/Division
```bash
# CISE Directorate awards (Computer Science)
curl "http://api.nsf.gov/services/v1/awards.json?\
org_code_dir=05000000"
```

## Request Parameters Reference

### Search Filters
| Parameter | Description | Example |
|-----------|-------------|---------|
| `keyword` | Free text search (Boolean supported) | `machine+learning` |
| `ActiveAwards` | Currently active awards | `true` |
| `ExpiredAwards` | Expired awards | `true` |
| `histAwd` | Historical awards | `true` |
| `id` | Award number | `1052893` |

### Date Filters
| Parameter | Description | Format |
|-----------|-------------|--------|
| `dateStart`, `dateEnd` | Initial amendment date range | mm/dd/yyyy |
| `startDateStart`, `startDateEnd` | Award start date range | mm/dd/yyyy |
| `expDateStart`, `expDateEnd` | Expiration date range | mm/dd/yyyy |

### Amount Filters
| Parameter | Description |
|-----------|-------------|
| `estimatedTotalAmtFrom` | Min total amount |
| `estimatedTotalAmtTo` | Max total amount |
| `fundsObligatedAmtFrom` | Min obligated amount |
| `fundsObligatedAmtTo` | Max obligated amount |

### Organization Filters
| Parameter | Description |
|-----------|-------------|
| `awardeeName` | Institution name |
| `awardeeCity`, `awardeeStateCode` | Location |
| `awardeeDistrictCode` | Congressional district |
| `ueiNumber` | Entity identifier |
| `org_code_dir` | Directorate code |
| `org_code_div` | Division code |

### Personnel Filters
| Parameter | Description |
|-----------|-------------|
| `pdPIName` | PI name |
| `coPDPI` | Co-PI name |
| `poName` | Program Officer name |

### Pagination
| Parameter | Description | Limits |
|-----------|-------------|--------|
| `rpp` | Results per page | 1-25 (default: 25) |
| `offset` | Starting record | 0-based |
| `sortKey` | Sort field | `awardNumber`, `startDate`, etc. |

**⚠️ Maximum 3,000 results per query** - use date ranges to paginate larger datasets.

## Boolean Search Support

The `keyword` parameter supports Boolean operators:
- `AND`: `machine+AND+learning`
- `OR`: `machine+OR+deep`
- `NOT`: `machine+NOT+manufacturing`
- Phrases: `"machine+learning"` (quoted)

## Rate Limits & Constraints

| Constraint | Value |
|------------|-------|
| Max results per page | 25 |
| Max total results | 3,000 |
| Rate limit | Not documented (be respectful) |
| Data availability | 2007+ |
| Auth required | None |

**Workaround for 3K limit:** Break queries by date range, directorate, or state.

## NSF Directorates (Org Codes)

| Code | Abbreviation | Name |
|------|--------------|------|
| 01000000 | BIO | Biological Sciences |
| 03000000 | MPS | Mathematical & Physical Sciences |
| 04000000 | GEO | Geosciences |
| 05000000 | CISE | Computer & Information Science |
| 07000000 | ENG | Engineering |
| 08000000 | SBE | Social, Behavioral & Economic Sciences |
| 11000000 | EDU | STEM Education |
| 15000000 | TIP | Technology, Innovation & Partnerships |

## Grant Types (transType)

- Standard Grant
- Continuing Grant
- Cooperative Agreement
- Fellowship Award
- Fixed Amount Award
- GAA (Grant Assistance Agreement)
- Interagency Agreement
- Contract
- Contract-BOA/Task Order
- Contract Interagency Agreement

---

# Comparison: NSF vs NIH RePORTER APIs

## Feature Comparison

| Feature | NSF Award API | NIH RePORTER |
|---------|---------------|--------------|
| **Auth Required** | ❌ No | ❌ No |
| **Output Formats** | JSON, XML, JSONP | JSON only |
| **Request Method** | GET (query params) | POST (JSON body) |
| **Max Results/Page** | 25 | 500 |
| **Max Total Results** | 3,000 | 10,000 (via offset) |
| **Data Coverage** | 2007+ | 1985+ (projects), 1993+ (full) |
| **Boolean Search** | ✅ AND/OR/NOT | ✅ Advanced text search |
| **Abstracts** | ✅ Full text | ✅ Full text |
| **Project Outcomes** | ✅ Separate endpoint | ❌ Not available |
| **Publications Linked** | ❌ No | ✅ Yes |
| **Field Selection** | ✅ printFields | ✅ include_fields |

## Data Richness Comparison

| Data Type | NSF | NIH | Notes |
|-----------|-----|-----|-------|
| **Abstracts** | ✅ | ✅ | Both have full text |
| **Titles** | ✅ | ✅ | Both have titles |
| **Award Amounts** | ✅ | ✅ | Both have funding data |
| **Specific Aims** | ❌ | ✅ | NIH has aims separately |
| **Public Health Relevance** | ❌ | ✅ | NIH-specific |
| **Project Terms/Keywords** | ❌ | ✅ | NIH text-mines these |
| **Study Section Info** | ❌ | ✅ | NIH review panels |
| **Project Outcomes** | ✅ | ❌ | NSF has rich outcomes |
| **Congressional District** | ✅ | ✅ | Both track |
| **Program Officer** | ✅ | ❌ | NSF includes PO |

## Complementary Strengths

### NSF Unique Advantages
1. **Project Outcomes Reports** - Rich HTML summaries of what was accomplished
2. **Program Officer Contact** - Know who manages the program
3. **Directorate/Division Structure** - Clear org hierarchy
4. **Program Element/Reference Codes** - NSF-specific funding codes
5. **JSONP Support** - Browser-friendly callbacks

### NIH Unique Advantages
1. **Specific Aims** - Critical grant section
2. **Public Health Relevance** - Plain language statements
3. **Text-Mined Terms** - Scientific keywords
4. **Publication Links** - Papers from funded research
5. **Deeper History** - Data back to 1985
6. **Larger Result Sets** - 500 per page, 10K total

## Combined Use Strategy for Grant Forge

### Training Data Coverage
- **Basic Science (STEM)**: NSF = primary, NIH = supplement
- **Biomedical/Health**: NIH = primary, NSF = supplement
- **Engineering**: Both valuable
- **Social/Behavioral**: Both have coverage (SBE directorate vs NIH institutes)

### Suggested Data Collection
```python
# Pseudocode for combined collection

# NSF - focus on STEM abstracts
nsf_data = []
for directorate in ["CISE", "ENG", "MPS", "BIO"]:
    for year in range(2018, 2025):
        results = query_nsf_api(
            org_code=directorate,
            startDateStart=f"01/01/{year}",
            startDateEnd=f"12/31/{year}"
        )
        nsf_data.extend(results)

# NIH - focus on R-series grants
nih_data = []
for code in ["R01", "R21", "R35"]:
    for year in range(2018, 2025):
        results = query_nih_api(
            activity_codes=[code],
            fiscal_years=[year]
        )
        nih_data.extend(results)

# Combine and dedupe by title similarity
training_corpus = combine_and_clean(nsf_data, nih_data)
```

### Data Schema for Combined Corpus
```json
{
  "source": "NSF|NIH",
  "award_id": "string",
  "title": "string",
  "abstract": "string",
  "amount": "number",
  "pi_name": "string",
  "institution": "string",
  "year": "number",
  "field_category": "string",
  "grant_type": "string",
  "outcomes": "string (NSF only)",
  "specific_aims": "string (NIH only)"
}
```

---

# Grant Forge Integration Ideas

## 1. Dual-Source Abstract Training
- Combine NSF + NIH abstracts for broader coverage
- Tag by source for domain-specific fine-tuning
- Use outcomes reports for "impact statement" training

## 2. Similar Grant Finder
- Search both APIs for comparable funded projects
- Help users find precedents for their research area

## 3. Program Targeting
- NSF: Use directorate/division filtering
- NIH: Use institute/activity code filtering
- Suggest appropriate programs based on keywords

## 4. Budget Benchmarking
- Compare award amounts across both agencies
- Field-specific budget recommendations

## 5. Keyword/Terminology Analysis
- NSF program names + NIH text-mined terms
- Build field-specific vocabulary

## 6. Success Pattern Analysis
- What language appears in funded grants?
- Agency-specific writing styles

---

# Quick Reference: API Examples

## NSF: Get Recent AI Awards (JSON)
```bash
curl "http://api.nsf.gov/services/v1/awards.json?keyword=artificial+intelligence&startDateStart=01/01/2024&rpp=25"
```

## NSF: Get Award with All Fields
```bash
curl "http://api.nsf.gov/services/v1/awards/2401234.json"
```

## NSF: Get Outcomes Report
```bash
curl "http://api.nsf.gov/services/v1/awards/2401234/projectoutcomes.json"
```

---

*Research compiled: January 2026*
*Source: NSF Award Search API v1 Documentation*
*Complements: NIH RePORTER API research (see nih-reporter-api.md)*
