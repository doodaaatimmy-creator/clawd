# Compensation Analysis System (CSAS)
## Fort Lewis College | Executive Project Proposal

---

<div align="center">

**Compensation & Sustainability Advisory Committee**  
*AI-Powered Salary Benchmarking & Equity Analysis Platform*

</div>

---

## Project Overview

A production-grade compensation analysis system that benchmarks FLC salaries against **27 peer institutions**, identifies pay equity gaps, enables scenario modeling for budget planning, and provides an interactive dashboard for committee decision-making.

---

## System Architecture

```
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│    DATA INPUTS              PROCESSING              DELIVERABLES           │
│    ───────────              ──────────              ────────────           │
│                                                                            │
│    ┌──────────┐         ┌──────────────┐         ┌──────────────┐         │
│    │ FLC Data │         │              │         │  Executive   │         │
│    │ (Workday)│────┐    │   FERPA      │         │  Dashboard   │         │
│    └──────────┘    │    │  Compliant   │    ┌───▶│  (4 KPIs)    │         │
│    ┌──────────┐    │    │  Pipeline    │    │    └──────────────┘         │
│    │ CUPA-HR  │────┼───▶│              │────┤    ┌──────────────┐         │
│    │Benchmarks│    │    │  • Ingest    │    │    │  Scenario    │         │
│    └──────────┘    │    │  • Clean     │    ├───▶│  Builder     │         │
│    ┌──────────┐    │    │  • Validate  │    │    └──────────────┘         │
│    │  IPEDS   │────┤    │  • Anonymize │    │    ┌──────────────┐         │
│    │(27 Peers)│    │    │              │    │    │  Drill-Down  │         │
│    └──────────┘    │    └──────────────┘    ├───▶│  Analysis    │         │
│    ┌──────────┐    │                        │    └──────────────┘         │
│    │ BLS/BEA  │────┘           │            │    ┌──────────────┐         │
│    │Cost Data │                │            │    │    AI        │         │
│    └──────────┘                ▼            └───▶│   Query      │         │
│                        ┌──────────────┐          └──────────────┘         │
│                        │  ANALYSIS    │                                    │
│                        │  ENGINE      │                                    │
│                        │              │                                    │
│                        │ • Market     │                                    │
│                        │   Benchmark  │                                    │
│                        │ • Equity     │                                    │
│                        │   Model      │                                    │
│                        │ • Compression│                                    │
│                        │   Detection  │                                    │
│                        │ • Scenario   │                                    │
│                        │   Modeling   │                                    │
│                        └──────────────┘                                    │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## Phase Breakdown

### Phase 1: Model Design & Architecture
| Component | Description | Status |
|-----------|-------------|--------|
| System Architecture | 7-layer data pipeline with security classification | ✅ Complete |
| Dashboard Interface | Interactive web application (3 views) | ✅ Complete |
| FERPA Compliance | k-anonymity, cell suppression, PII removal | ✅ Complete |
| Peer Institution Config | 27 institutions with IPEDS mapping | ✅ Complete |

### Phase 2: Data Preparation
| Component | Description | Status |
|-----------|-------------|--------|
| Data Ingestion | Ingest FLC Workday exports, CUPA-HR, IPEDS, BLS | 🔄 Awaiting Data |
| Cleaning & Validation | Standardize formats, handle missing values | 🔄 Ready |
| Schema Mapping | Map job titles to CUPA classifications (70%+ match) | 🔄 Ready |
| Quality Assurance | Data validation, anomaly detection, documentation | 🔄 Ready |

### Phase 3: Analysis & Product Development
| Component | Description | Status |
|-----------|-------------|--------|
| Market Benchmarking | FLC vs. peer median by position/rank | 🔄 Ready |
| Geographic Adjustment | Durango cost-of-living calibration | 🔄 Ready |
| Internal Equity | Regression model for unexplained pay gaps | 🔄 Ready |
| Compression Detection | Rank ratio analysis with flags | 🔄 Ready |
| What-If Scenarios | Budget impact modeling (3 preset + custom) | 🔄 Ready |
| Committee Collaboration | Training, iteration, ongoing support | 📋 Planned |

---

## Data Sources

| Source | Data Provided | Access | Refresh |
|--------|---------------|--------|---------|
| **FLC Workday** | Salaries, positions, tenure, demographics | Internal | Per cycle |
| **CUPA-HR DataOnDemand** | Faculty/staff benchmarks by discipline | Subscription | Annual |
| **IPEDS** | Peer institution financials | Public | Annual |
| **BLS OEWS** | Colorado regional wages by occupation | Public | Annual |
| **BEA RPP** | Regional price parities (cost of living) | Public | Annual |
| **MIT Living Wage** | Durango household survival thresholds | Public | Annual |

---

## Analytics Delivered

| Analysis | Business Question | Output |
|----------|-------------------|--------|
| **Market Benchmark** | How does FLC pay compare to 27 peers? | Position % (below/at/above market) |
| **Geographic Adjustment** | What's the Durango cost-of-living impact? | Adjusted peer comparisons |
| **Internal Equity** | Are there unexplained pay disparities? | Regression residuals by group |
| **Compression Detection** | Are senior employees underpaid vs. junior? | Rank ratio flags |
| **Scenario Modeling** | What would targeted raises cost? | Budget impact projections |

---

## Executive Dashboard

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    CSAS EXECUTIVE DASHBOARD                              │
├─────────────────┬─────────────────┬─────────────────┬───────────────────┤
│  MARKET         │  EQUITY         │  COMPRESSION    │  BUDGET           │
│  POSITION       │  GAP            │  SCORE          │  IMPACT           │
│                 │                 │                 │                   │
│    92.4%        │    2.1%         │    1.12         │    $1.2M          │
│   (vs peers)    │  (unexplained)  │   (healthy)     │  (to 95% parity)  │
├─────────────────┴─────────────────┴─────────────────┴───────────────────┤
│                                                                          │
│  ┌─────────────────────────┐    ┌─────────────────────────────────────┐ │
│  │ Market Position by Dept │    │ Compression by Department           │ │
│  │        [CHART]          │    │           [CHART]                   │ │
│  └─────────────────────────┘    └─────────────────────────────────────┘ │
│                                                                          │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │ Budget Scenario Comparison (Optimistic / Expected / Comprehensive)│  │
│  │                          [CHART]                                  │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

**Dashboard Views:**
- **Executive Summary** — KPIs, key findings, scenario overview
- **Department Drilldown** — Detailed analysis by dept/rank
- **What-If Builder** — Custom scenario modeling with real-time results

---

## Peer Institutions (27)

| Category | Institutions |
|----------|--------------|
| **Colorado Regional** | Colorado Mesa, Western State Colorado |
| **ABET Accredited** | Oregon Tech, UT Martin, Lake Superior State, Fairmont State, Utah Valley, Florida Poly |
| **AACSB Accredited** | Arkansas Fort Smith, IU East, IU Kokomo, Dalton State, TCNJ, SUNY Geneseo |
| **COPLAC Members** | New College of Florida, Kentucky State, Keene State, Northern State, Shepherd |
| **Multi-Accredited** | Winona State, UNC Asheville, USC Aiken, Christopher Newport, UVA Wise |
| **Special Mission** | UM Morris (NASNTI), Texas Southern (HBCU) |

---

## Committee Collaboration Model

| Activity | Description | Frequency |
|----------|-------------|-----------|
| **Dashboard Access** | Self-service exploration of data and scenarios | Ongoing |
| **Training Sessions** | Methodology walkthrough, tool orientation | Initial + as needed |
| **Analysis Requests** | Ad-hoc queries via AI interface | As needed |
| **Iteration Cycles** | Refine scenarios based on committee feedback | Per meeting |
| **Report Generation** | Board-ready PDF exports | Per request |

---

## Effort Estimate

| Phase | Scope | Hours | Level of Effort |
|-------|-------|-------|-----------------|
| **Phase 1** | Design & Architecture | 80-120 | ✅ Complete |
| **Phase 2** | Data Preparation | 40-80 | Medium |
| **Phase 3a** | Analysis Implementation | 60-100 | ✅ Complete |
| **Phase 3b** | Committee Collaboration | 20-40 | Light |
| **Ongoing** | Support & Maintenance | 4-8/month | Light |

**Total Development:** 200-340 hours  
**Annual Support:** 50-100 hours

---

## Investment Summary

| Component | Description | Estimate |
|-----------|-------------|----------|
| **System Development** | Architecture, pipeline, dashboard, analytics | $25,000 - $40,000 |
| **Data Integration** | Ingest, clean, validate FLC + external sources | $5,000 - $10,000 |
| **Training & Onboarding** | Committee orientation, documentation | $2,500 - $5,000 |
| **Annual Support** | Maintenance, updates, ad-hoc requests | $8,000 - $15,000/yr |

**Total Year 1:** $40,000 - $70,000  
**Annual Recurring:** $8,000 - $15,000

*Note: Estimates assume IR staff (Winn Cook) handles day-to-day data operations. External consultant engagement for specialized development and support.*

---

## Value Proposition

| Benefit | Impact |
|---------|--------|
| **Data-Driven Decisions** | Replace intuition with peer-validated benchmarks |
| **Equity Transparency** | Identify and document pay disparities systematically |
| **Budget Precision** | Model exact costs before committing resources |
| **FERPA Compliance** | Built-in privacy protection for sensitive data |
| **Institutional Memory** | Reproducible methodology survives staff turnover |
| **Board-Ready Output** | Professional reports for governance presentations |

---

## Next Steps

1. ☐ Approve project scope and budget
2. ☐ Confirm CUPA-HR subscription access
3. ☐ Export initial FLC Workday data
4. ☐ Schedule committee kickoff meeting
5. ☐ Begin Phase 2 data integration

---

<div align="center">

**Fort Lewis College | Office of Institutional Research**  
*Compensation & Sustainability Advisory Committee*

*Prepared January 2026*

</div>
