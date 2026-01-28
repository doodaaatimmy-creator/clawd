# Grants.gov API Documentation

> Research compiled for Grant Forge integration  
> Last updated: January 2026

## Overview

There are **two distinct APIs** for accessing federal grant data:

1. **Grants.gov Legacy API** - The original REST endpoints at `api.grants.gov`
2. **Simpler.Grants.gov API** - A modernized API at `api.simpler.grants.gov` (in active development)

Both provide access to the same underlying grant opportunity data, but with different authentication requirements and features.

---

## 1. Grants.gov Legacy API

### Base URL
```
https://api.grants.gov/v1/api/
```

### Authentication
**No authentication required** for the primary search endpoints. These are public APIs designed to democratize access to grant information.

### Endpoints

#### search2 - Search Opportunities
```
POST https://api.grants.gov/v1/api/search2
Content-Type: application/json
```

**Request Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `keyword` | string | Free text search term |
| `oppNum` | string | Opportunity number filter |
| `eligibilities` | string | Eligible applicant types (pipe-separated) |
| `agencies` | string | Agency codes (pipe-separated) |
| `oppStatuses` | string | Status filter: `forecasted\|posted\|closed\|archived` |
| `aln` | string | Assistance Listing Number (formerly CFDA) |
| `fundingCategories` | string | Category codes (pipe-separated) |
| `rows` | integer | Number of results to return |

**Example Request:**
```bash
curl -X POST "https://api.grants.gov/v1/api/search2" \
  -H "Content-Type: application/json" \
  -d '{
    "keyword": "health",
    "oppStatuses": "posted",
    "rows": 10
  }'
```

**Example Response:**
```json
{
  "errorcode": 0,
  "msg": "Webservice Succeeds",
  "data": {
    "hitCount": 1567,
    "oppHits": [
      {
        "id": "219999",
        "number": "HHS-2024-001",
        "title": "Community Health Grant",
        "agencyCode": "HHS",
        "agencyName": "Health & Human Services",
        "openDate": "01/15/2024",
        "closeDate": "06/30/2024",
        "oppStatus": "posted",
        "docType": "synopsis",
        "alnist": ["93.223"]
      }
    ],
    "oppStatusOptions": [...],
    "eligibilities": [...],
    "fundingCategories": [...],
    "fundingInstruments": [...]
  }
}
```

#### fetchOpportunity - Get Opportunity Details
```
POST https://api.grants.gov/v1/api/fetchOpportunity
Content-Type: application/json
```

**Request:**
```json
{
  "opportunityId": 289999
}
```

**Response includes:**
- Full opportunity details (title, number, category)
- Synopsis information (description, dates, agency contact)
- Award ceiling/floor amounts
- Eligible applicant types
- Funding instruments and categories
- Assistance Listing Numbers (ALN/CFDA)
- Attachments and document URLs
- Related opportunities

**Key Response Fields for Grant Forge:**
```json
{
  "data": {
    "id": 289999,
    "opportunityNumber": "HHS-2024-001",
    "opportunityTitle": "Community Health Grant",
    "synopsis": {
      "agencyCode": "HHS",
      "agencyName": "Health & Human Services",
      "synopsisDesc": "Description of opportunity...",
      "postingDate": "Jan 15, 2024",
      "awardCeiling": "500000",
      "awardFloor": "50000",
      "costSharing": false,
      "applicantTypes": [
        {"id": "12", "description": "Nonprofits having a 501(c)(3) status..."}
      ],
      "fundingInstruments": [
        {"id": "G", "description": "Grant"}
      ],
      "fundingActivityCategories": [
        {"id": "HL", "description": "Health"}
      ]
    },
    "alns": [
      {"alnNumber": "93.223", "programTitle": "Development and Coordination..."}
    ]
  }
}
```

---

## 2. Simpler.Grants.gov API (Modern)

### Base URL
```
https://api.simpler.grants.gov
```

### Authentication
**API Key Required** - Obtain from [simpler.grants.gov/developer](https://simpler.grants.gov/developer)

Include in all requests:
```
X-API-Key: YOUR_API_KEY_HERE
Content-Type: application/json
```

### Rate Limits
| Limit | Value |
|-------|-------|
| Requests per minute | 60 |
| Requests per day | 10,000 |
| Inactive key expiration | 30 days without use |

> Contact Simpler Grants team for higher throughput needs.

### Endpoints

#### POST /v1/opportunities/search
Search for grant opportunities with advanced filtering.

**Request Body:**
```json
{
  "query": "research",
  "query_operator": "AND",
  "filters": {
    "opportunity_status": {"one_of": ["posted", "forecasted"]},
    "funding_instrument": {"one_of": ["grant", "cooperative_agreement"]},
    "top_level_agency": {"one_of": ["NSF", "NIH"]},
    "applicant_type": {"one_of": ["nonprofits", "state_governments"]},
    "funding_category": {"one_of": ["health", "education"]},
    "post_date": {"start_date": "2024-01-01", "end_date": "2024-12-31"},
    "close_date": {"start_date": "2024-06-01"},
    "award_floor": {"min": 10000},
    "award_ceiling": {"max": 1000000},
    "estimated_total_program_funding": {"min": 100000},
    "expected_number_of_awards": {"min": 5, "max": 25},
    "assistance_listing_number": {"one_of": ["45.C9"]},
    "is_cost_sharing": {"one_of": [true]}
  },
  "pagination": {
    "page_offset": 1,
    "page_size": 25,
    "sort_order": [
      {"order_by": "post_date", "sort_direction": "descending"}
    ]
  },
  "format": "json"
}
```

**Filter Reference:**

| Filter | Values/Format |
|--------|---------------|
| `opportunity_status` | `forecasted`, `posted`, `closed`, `archived` |
| `funding_instrument` | `grant`, `cooperative_agreement`, etc. |
| `applicant_type` | `state_governments`, `county_governments`, `nonprofits`, `individuals`, etc. |
| `funding_category` | `arts`, `education`, `health`, `environment`, etc. |
| `post_date` / `close_date` | `YYYY-MM-DD` format |
| `award_floor` / `award_ceiling` | `min` and/or `max` numeric values |

**Sort Options:**
- `relevancy`, `opportunity_id`, `opportunity_number`
- `opportunity_title`, `post_date`, `close_date`
- `agency_code`, `agency_name`, `top_level_agency_name`
- `award_floor`, `award_ceiling`

**Response:**
```json
{
  "message": "Success",
  "data": [
    {
      "opportunity_id": "12345678-1234-1234-1234-123456789012",
      "opportunity_number": "EPA-R9-SFUND-23-003",
      "opportunity_title": "Superfund Site Remediation Research",
      "agency_code": "EPA",
      "agency_name": "Environmental Protection Agency",
      "post_date": "2024-01-15",
      "close_date": "2024-06-30",
      "opportunity_status": "posted",
      "funding_instrument": "grant",
      "funding_category": "environment",
      "award_floor": 50000,
      "award_ceiling": 500000,
      "estimated_total_program_funding": 2000000,
      "expected_number_of_awards": 4,
      "applicant_types": ["nonprofits", "universities"],
      "summary": "Funding for research into innovative remediation technologies...",
      "is_cost_sharing": false
    }
  ],
  "pagination_info": {
    "page_offset": 1,
    "page_size": 25,
    "total_pages": 15,
    "total_records": 367
  },
  "facet_counts": {
    "agency_name": {"EPA": 45, "NSF": 32, "NIH": 28},
    "funding_instrument": {"grant": 89, "cooperative_agreement": 16}
  }
}
```

**⚠️ Important:** Search returns max 10,000 opportunities. Use narrower filters or the extracts endpoint for full data.

#### GET /v1/opportunities/{opportunity_id}
Get detailed information about a specific opportunity by UUID.

```bash
GET https://api.simpler.grants.gov/v1/opportunities/12345678-1234-1234-1234-123456789012
```

#### POST /v1/extracts
Get metadata and download URLs for bulk data extracts.

**Request:**
```json
{
  "filters": {
    "extract_type": "opportunities_json",
    "created_at": {
      "start_date": "2024-01-01",
      "end_date": "2024-01-31"
    }
  },
  "pagination": {
    "page_offset": 1,
    "page_size": 25,
    "sort_order": [{"order_by": "created_at", "sort_direction": "descending"}]
  }
}
```

**Extract Types:**
- `opportunities_json` - Complete data in JSON format
- `opportunities_csv` - Complete data in CSV format

**Response includes pre-signed S3 download URLs:**
```json
{
  "data": [
    {
      "extract_type": "opportunities_json",
      "file_name": "opportunities_2024-01-15.json",
      "file_size": 15728640,
      "download_url": "https://bucket.s3.amazonaws.com/extracts/...?signature=...",
      "created_at": "2024-01-15T02:30:00Z"
    }
  ]
}
```

---

## 3. Bulk Download: XML Extract

### Overview
Grants.gov exports the **entire database daily** to an XML file. This is the most complete bulk data option.

### Download Location
Available from: [grants.gov/xml-extract](https://www.grants.gov/xml-extract)

### File Naming
```
GrantsDBExtractYYYYMMDD.zip
GrantsDBExtractYYYYMMDDv2.zip  (includes forecast information)
```

### XML Schema Fields

| Field | Max Size | Notes |
|-------|----------|-------|
| Opportunity Title | 255 chars | |
| Opportunity ID | 20 chars | |
| Opportunity Number | 40 chars | |
| Opportunity Category | 1 char | D=Discretionary, M=Mandatory, C=Continuation, E=Earmark, O=Other |
| Funding Instrument Type | 2 chars | G=Grant, CA=Cooperative Agreement, O=Other, PC=Procurement Contract |
| Category of Funding Activity | 3 chars | See codes below |
| CFDA Number(s) | 6 chars | Format: ##.### |
| Eligible Applicants | 2 chars | See codes below |
| Agency Code/Name | 255 chars | |
| Post Date | 8 chars | MMDDYYYY |
| Close Date | 8 chars | MMDDYYYY |
| Expected Number of Awards | 15 chars | |
| Estimated Total Program Funding | 15 chars | |
| Award Ceiling | 15 chars | |
| Award Floor | 15 chars | |
| Description | 18,000 chars | |
| Cost Sharing Requirement | 3 chars | Yes/No |
| Archive Date | 8 chars | MMDDYYYY |

### Funding Category Codes
| Code | Category |
|------|----------|
| ACA | Affordable Care Act |
| AG | Agriculture |
| AR | Arts |
| BC | Business and Commerce |
| CD | Community Development |
| ED | Education |
| EN | Energy |
| ENV | Environment |
| FN | Food and Nutrition |
| HL | Health |
| HO | Housing |
| ISS | Income Security and Social Services |
| NR | Natural Resources |
| ST | Science and Technology/R&D |
| T | Transportation |

### Eligible Applicant Codes
| Code | Type |
|------|------|
| 99 | Unrestricted |
| 00 | State governments |
| 01 | County governments |
| 02 | City/township governments |
| 06 | Public institutions of higher education |
| 07 | Native American tribal governments (federally recognized) |
| 12 | Nonprofits with 501(c)(3) status |
| 13 | Nonprofits without 501(c)(3) status |
| 20 | Private institutions of higher education |
| 21 | Individuals |
| 22 | For-profit organizations (not small business) |
| 23 | Small businesses |

---

## 4. Terms & Conditions Summary

### Usage Rights
- Search, display, analyze, retrieve, view grant data ✓
- Display attribution: *"This product uses the Grants.gov API but is not endorsed or certified by the U.S. Department of Health and Human Services."*

### Restrictions
- Cannot modify or falsely represent content
- Cannot use Grants.gov name to imply endorsement
- Subject to access/call limits (may be blocked if exceeded)
- HHS reserves right to terminate access

### Data Considerations
- Public data, no PII concerns
- Data provided "as is"
- No warranty on accuracy or availability

---

## 5. Grant Forge Integration Recommendations

### Recommended Approach

1. **Primary Data Source:** Use Simpler.Grants.gov API for real-time search
   - Better filtering capabilities
   - Structured JSON responses
   - Active development with improving features

2. **Backup/Bulk:** Use XML Extract for initial data load and periodic sync
   - Complete dataset
   - No rate limits for download
   - Good for offline analysis

3. **Legacy Fallback:** Grants.gov Legacy API if Simpler API is unavailable
   - No auth required
   - Simpler but less filtering options

### Key Data Points for Grant Forge

| Need | API Field (Simpler) | API Field (Legacy) |
|------|---------------------|-------------------|
| Grant listings | `/v1/opportunities/search` | `search2` |
| Eligibility | `applicant_types` | `applicantTypes[].description` |
| Deadlines | `close_date`, `post_date` | `closeDate`, `openDate` |
| Funding amounts | `award_floor`, `award_ceiling`, `estimated_total_program_funding` | `awardFloor`, `awardCeiling` |
| Agency | `agency_code`, `agency_name`, `top_level_agency` | `agencyCode`, `agencyName` |
| Categories | `funding_category`, `funding_instrument` | `fundingActivityCategories`, `fundingInstruments` |
| Description | `summary` (search) or full via GET | `synopsis.synopsisDesc` |
| ALN/CFDA | `assistance_listing_number` | `alns[].alnNumber` |

### Implementation Tips

1. **Caching Strategy:**
   - Cache search results for 1 hour
   - Cache individual opportunity details for 24 hours
   - Use extracts for initial database population

2. **Rate Limit Handling:**
   - Implement exponential backoff on 429 responses
   - Queue requests during high-volume periods
   - Consider the extracts endpoint for bulk operations

3. **Data Freshness:**
   - Grants.gov updates throughout the day
   - XML extract generated once daily
   - Search data in Simpler API cached hourly

4. **Error Handling:**
   ```python
   if response.status_code == 429:
       # Rate limited - back off and retry
       time.sleep(exponential_backoff())
   elif response.status_code == 401:
       # API key issue - check/refresh key
   elif response.status_code == 400:
       # Bad request - check parameters
   ```

---

## 6. API Quick Reference

### Simpler.Grants.gov (Recommended)
```
Base URL: https://api.simpler.grants.gov
Auth: X-API-Key header
Rate Limit: 60/min, 10,000/day
Docs: https://api.simpler.grants.gov/docs
Wiki: https://wiki.simpler.grants.gov/product/api
```

### Grants.gov Legacy
```
Base URL: https://api.grants.gov/v1/api
Auth: None required
Rate Limit: Fair use (not specified)
Docs: https://grants.gov/api/api-guide
```

### Bulk Data
```
XML Extract: https://www.grants.gov/xml-extract
Frequency: Daily
Format: ZIP containing XML + schema
```

---

## Resources

- [Grants.gov API Resources](https://www.grants.gov/api)
- [Simpler.Grants.gov Developer Portal](https://simpler.grants.gov/developer)
- [Simpler.Grants.gov API Wiki](https://wiki.simpler.grants.gov/product/api)
- [OpenAPI Documentation](https://api.simpler.grants.gov/docs)
- [Terms & Conditions](https://www.grants.gov/api/terms-conditions)
- [GitHub: simpler-grants-gov](https://github.com/HHS/simpler-grants-gov)
