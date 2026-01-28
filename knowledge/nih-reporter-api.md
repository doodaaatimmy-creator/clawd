# NIH RePORTER API - Grant Forge Integration Research

## Overview

The NIH Research Portfolio Online Reporting Tools (RePORTER) provides **free, public API access** to data on NIH-funded research projects worth ~$42 billion annually. This is a **gold mine** for training Grant Forge.

**Key URLs:**
- API Documentation: https://api.reporter.nih.gov/
- Web Interface: https://reporter.nih.gov/
- Bulk Download (ExPORTER): https://reporter.nih.gov/exporter/
- V2 API Reference PDF: https://api.reporter.nih.gov/documents/Data%20Elements%20for%20RePORTER%20Project%20API_V2.pdf

## Data Available

### 1. Project Data (The Main Prize)
- **Project titles** - Actual funded grant titles
- **Abstracts** - Full scientific abstracts
- **Specific aims** - Research objectives
- **Public health relevance statements** - Plain language descriptions
- **Award amounts** - Direct/indirect costs, total funding
- **Fiscal years** - Historical data from 1985+
- **Activity codes** - R01, R21, K99, etc.
- **Funding mechanisms** - Grant types
- **Organization info** - Universities, institutions
- **PI information** - Investigator names, profiles
- **Project terms** - Scientific keywords (text-mined since FY2008)
- **Study section info** - Review panel details

### 2. Publications (Linked to Grants)
- PubMed IDs linked to grants
- Publication metadata
- Citations since 1980

### 3. Additional Data
- Patents
- Clinical studies
- Link tables (project-to-publication mappings)

## API Endpoints

### Project Search API (V2)
```
POST https://api.reporter.nih.gov/v2/projects/search
```

### Publication Search API
```
POST https://api.reporter.nih.gov/v2/publications/search
```

## Sample API Requests

### Basic Project Search
```json
{
  "criteria": {
    "fiscal_years": [2023, 2024],
    "activity_codes": ["R01"]
  },
  "offset": 0,
  "limit": 500
}
```

### Advanced Text Search (Get Abstracts)
```json
{
  "criteria": {
    "advanced_text_search": {
      "operator": "and",
      "search_field": "projecttitle,abstracttext,terms",
      "search_text": "machine learning cancer"
    },
    "fiscal_years": [2023]
  },
  "include_fields": [
    "ApplId",
    "ProjectTitle", 
    "AbstractText",
    "AwardAmount",
    "ActivityCode",
    "PiNames"
  ],
  "limit": 500
}
```

### Search by Institution
```json
{
  "criteria": {
    "org_names": ["STANFORD UNIVERSITY"],
    "fiscal_years": [2024]
  }
}
```

### Search by PI Name
```json
{
  "criteria": {
    "pi_names": [{"any_name": "smith"}]
  }
}
```

## Rate Limits & Bulk Download

### API Limits
| Parameter | Limit | Notes |
|-----------|-------|-------|
| Records per page | 500 max | Default is 50 |
| Offset max | 9,999 | Limits single query to 10K results |
| Rate limit | ~1 req/sec | Unofficial, be polite |
| Daily limit | None | But respect off-peak hours |

**Workaround for 10K limit:** Break large queries into smaller date ranges or use multiple criteria filters, then combine results.

### Bulk Download (ExPORTER)
For massive data needs, use ExPORTER bulk downloads:
- **Projects**: CSV files by fiscal year
- **Abstracts**: Separate CSV files
- **Publications**: Link tables
- **Patents**: Separate files
- **Clinical Studies**: Separate files

Download URL pattern:
```
https://reporter.nih.gov/exporter/projects/download/<fy>
https://reporter.nih.gov/exporter/abstracts/download/<fy>
```

Also available: GitHub tool for automated downloading: https://github.com/edsu/nih-reporter-exporter

## Grant Forge Training Data Strategy

### High-Value Data for Grant Writing AI

1. **Successful Grant Abstracts** 
   - These ARE funded grants - proven successful proposals
   - Full abstract text available
   - Can filter by award amount, activity code, institute

2. **Public Health Relevance Statements**
   - Plain language descriptions
   - Great for training "significance" sections

3. **Project Terms (Keywords)**
   - Text-mined scientific concepts
   - Useful for terminology training

4. **Title-Abstract Pairs**
   - Learn what makes compelling titles
   - Correlation with funding success

### Suggested Data Collection Approach

```python
# Pseudocode for data collection

# 1. Target high-value grants (R01, R21, etc.)
activity_codes = ["R01", "R21", "R34", "R35", "K99", "F31", "F32"]

# 2. Get recent successful grants
for year in range(2018, 2025):
    for code in activity_codes:
        results = query_nih_api(
            fiscal_year=year,
            activity_code=code,
            include_fields=[
                "ProjectTitle",
                "AbstractText", 
                "AwardAmount",
                "PiNames",
                "OrgName",
                "SpendingCategories"
            ]
        )
        save_to_training_set(results)
```

### Data Quality Notes
- Abstracts appear 7-10 days after Budget Start Date
- Data is updated weekly
- Pre-2008 terms were CRISP keywords (different system)
- Post-2008 terms are text-mined (more consistent)

## Existing Libraries/Tools

### Python
- **pynih**: https://github.com/neonwatty/pynih
  ```python
  from pynih import apis
  search_criteria = {'activity_codes': ['R01']}
  project_data = apis.query_project_api(search_criteria=search_criteria)
  ```

### R
- **repoRter.nih**: https://cran.r-project.org/package=repoRter.nih
  ```r
  req <- make_req(criteria = list(fiscal_years = 2024))
  res <- get_nih_data(req)
  ```

## Agencies Included
- NIH (all institutes) - from 1993
- CDC - from 1993
- AHRQ - from 1993
- HRSA - limited
- FDA - from 1993
- VA - from 2009
- ACF - from 2013

## Integration Ideas for Grant Forge

### 1. Training Corpus Builder
- Scrape abstracts by field/topic
- Build domain-specific sub-corpora
- Include metadata for conditional generation

### 2. Similar Grant Finder
- Use text similarity to find comparable funded grants
- Help users position their proposals

### 3. Keyword Optimizer
- Analyze successful grants for keyword patterns
- Suggest terminology improvements

### 4. Budget Benchmarking
- Use award amounts to suggest appropriate budget ranges
- Filter by institution type, activity code

### 5. Success Pattern Analysis
- Which abstracts get funded?
- What makes R01s different from R21s?
- Institute-specific language patterns

## Legal/Ethical Considerations

- **Public data** - No authentication required
- **Free to use** - No API key needed
- **Attribution** - Consider citing NIH RePORTER as data source
- **Rate limiting** - Be respectful of the service
- **Privacy** - PI names are public, but be thoughtful about use

## Next Steps

1. [ ] Build Python client for Grant Forge data ingestion
2. [ ] Define schema for training data storage
3. [ ] Create data cleaning pipeline (HTML entities, encoding)
4. [ ] Implement batched download strategy
5. [ ] Develop topic/field classification system
6. [ ] Test with sample queries

---
*Research compiled: January 2026*
*Source: NIH RePORTER API v2 Documentation*
