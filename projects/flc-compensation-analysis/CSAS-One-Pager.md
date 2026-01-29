# FLC Compensation Analysis System (CSAS)
### Project Roadmap for the Compensation & Sustainability Advisory Committee

---

## Overview

An AI-powered compensation analysis platform that benchmarks FLC salaries against 27 peer institutions, identifies equity gaps, and enables scenario modeling for informed budget decisions.

---

## Project Architecture

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│     PHASE 1     │      │     PHASE 2     │      │     PHASE 3     │
│  Design & Arch  │ ───▶ │   Data Prep     │ ───▶ │    Analysis     │
└─────────────────┘      └─────────────────┘      └─────────────────┘
        │                        │                        │
        ▼                        ▼                        ▼
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│ • Interface     │      │ • Ingest files  │      │ • Benchmarking  │
│ • Dashboard     │      │ • Clean & map   │      │ • Equity model  │
│ • Training docs │      │ • FERPA comply  │      │ • Scenarios     │
└─────────────────┘      └─────────────────┘      └─────────────────┘
```

---

## Phase 1: Model Design & Architecture

| Component | Description |
|-----------|-------------|
| **Interactive Interface** | Web-based dashboard for committee members to explore data and run analyses |
| **Dashboard Design** | Executive KPIs: market position, equity indicators, compression scores, budget impact |
| **Training Materials** | User guides and methodology documentation for committee onboarding |

**Deliverable:** System architecture, interface mockups, and training outline

---

## Phase 2: Data Preparation

### Inputs

| Source | Data | Classification |
|--------|------|----------------|
| **FLC Workday** | Salaries, positions, tenure, demographics | Internal |
| **CUPA-HR** | Faculty/staff benchmarks by discipline | Subscription |
| **IPEDS** | Peer institution financials (27 peers) | Public |
| **BLS OEWS** | Colorado regional wage data | Public |
| **BEA / MIT** | Cost-of-living indices, living wage thresholds | Public |

### Process
- Validate and ingest data files (CSV, Excel, API)
- Clean inconsistencies, handle missing values
- Map job titles to standard classifications
- Apply FERPA compliance rules (N ≥ 5 suppression)
- Generate data quality report

**Deliverable:** Analysis-ready datasets with full data dictionary

---

## Phase 3: Analysis & Product Development

### Analyses Performed

| Analysis | Question Answered | Output |
|----------|-------------------|--------|
| **Market Benchmarking** | How does FLC pay compare to peers? | Position % by role (below/at/above market) |
| **Geographic Adjustment** | What's the Durango cost-of-living impact? | Adjusted peer comparisons |
| **Internal Equity** | Are there unexplained pay disparities? | Regression model identifying gaps |
| **Compression Detection** | Are senior employees underpaid vs. junior? | Rank ratio analysis with flags |
| **Scenario Modeling** | What would targeted raises cost? | Budget impact projections |

### Outputs

| Deliverable | Description |
|-------------|-------------|
| **Executive Dashboard** | Real-time KPIs for leadership review |
| **Scenario Reports** | "What-if" analysis for budget planning |
| **Footprint Analysis** | Position distribution and grade structure |
| **Competitor Analysis** | FLC vs. peer positioning by category |
| **AI Query Support** | Natural language Q&A for ad-hoc requests |

---

## Data Flow

```
    ┌─────────────────────────────────────────────────────────────────┐
    │                                                                 │
    │   FLC Data ─────┐                                               │
    │   CUPA-HR ──────┼──▶ [ CLEAN & VALIDATE ] ──▶ [ ANALYZE ] ──▶  │
    │   IPEDS ────────┤         (Phase 2)            (Phase 3)        │
    │   BLS/BEA ──────┘                                     │         │
    │                                                       ▼         │
    │                                            ┌─────────────────┐  │
    │                                            │   DELIVERABLES  │  │
    │                                            ├─────────────────┤  │
    │                                            │ • Dashboard     │  │
    │                                            │ • Reports       │  │
    │                                            │ • Scenarios     │  │
    │                                            │ • AI Support    │  │
    │                                            └─────────────────┘  │
    │                                                                 │
    └─────────────────────────────────────────────────────────────────┘
```

---

## Peer Institutions (27)

Benchmarking against institutions selected for similar size, mission, and accreditation:

- **Colorado Regional:** Colorado Mesa, Western State Colorado
- **ABET Accredited:** Oregon Tech, UT Martin, Lake Superior State, Fairmont State
- **AACSB Accredited:** IU East, IU Kokomo, Dalton State, SUNY Geneseo
- **COPLAC Members:** New College of Florida, Keene State, Northern State, Shepherd

---

## Committee Interface

| Mode | Use Case |
|------|----------|
| **Dashboard** | Visual exploration, presentations, executive review |
| **Reports** | Formal analysis documentation, board materials |
| **AI Query** | "What's our market position for Associate Professors in Business?" |

---

## Ongoing Support (Phase 3+)

- Interpretation of results and methodology questions
- Response to ad-hoc committee requests via AI model
- Scenario modeling for budget proposals
- Annual refresh as new data becomes available

---

<div align="center">

**Fort Lewis College | Institutional Research**  
*Compensation & Sustainability Advisory Committee*

</div>
