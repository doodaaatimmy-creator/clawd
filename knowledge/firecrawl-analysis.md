# Firecrawl Analysis

**Date:** 2026-01-28  
**Purpose:** Evaluate Firecrawl for AI-native web scraping for Grant Nexus

---

## What is Firecrawl?

Firecrawl is an **AI-native web data API** developed by Mendable.ai (YC-backed). It converts websites into clean, LLM-ready data (markdown, structured JSON, HTML) through a simple API.

**Website:** https://firecrawl.dev  
**GitHub:** https://github.com/firecrawl/firecrawl (77.9K+ stars)  
**License:** AGPL-3.0 (open source)

### Core Value Proposition
> "Turn entire websites into LLM-ready markdown or structured data with a single API call."

---

## Key Features

### API Endpoints

| Endpoint | Purpose | Credits |
|----------|---------|---------|
| **Scrape** | Single page → markdown/HTML/JSON | 1/page |
| **Crawl** | Entire site recursively | 1/page |
| **Map** | Discover all URLs on a site (fast) | 1/request |
| **Search** | Web search + optional content extraction | 2/10 results |
| **Extract** | Structured data with AI (schema/prompt) | varies |
| **Batch Scrape** | Multiple URLs in parallel | 1/page |

### Powerful Capabilities
- **JS Rendering:** Handles dynamic/JS-heavy pages (96% web coverage claimed)
- **Anti-bot Bypass:** Built-in stealth proxies, handles Cloudflare etc.
- **Smart Wait:** Intelligently waits for content to load
- **Actions:** Click, scroll, type, wait before scraping (cloud-only)
- **LLM Extraction:** Structured data via prompts or Pydantic/Zod schemas
- **Output Formats:** Markdown, HTML, JSON, screenshots, links, metadata
- **Media Parsing:** PDFs, DOCX, images
- **Change Tracking:** Monitor content changes over time

---

## How It Differs from Browser-Use / Playwright

| Feature | Firecrawl | Playwright/Puppeteer | browser-use |
|---------|-----------|---------------------|-------------|
| **Focus** | Data extraction API | Browser automation | AI browser control |
| **LLM-Ready Output** | ✅ Native (markdown, JSON) | ❌ Raw HTML only | ❌ Visual/action focus |
| **Proxy/Anti-bot** | ✅ Built-in (cloud) | ❌ DIY | ❌ DIY |
| **Self-hosted** | ✅ Available | ✅ Full | ✅ Full |
| **Actions** | ✅ Limited (cloud only) | ✅ Full control | ✅ AI-driven |
| **Learning Curve** | Low (API) | High | Medium |
| **Cost** | Per-page credits | Infrastructure | Infrastructure |
| **Best For** | Bulk data extraction | Complex automation | Natural language browsing |

### Key Differences:
1. **Firecrawl** = API-first data extraction, optimized for feeding LLMs
2. **Playwright** = Full browser automation, you handle everything
3. **browser-use** = AI agent navigates like human, visual understanding

**Firecrawl advantage:** No proxy management, anti-bot handling, or HTML-to-markdown conversion needed. It's batteries-included for the "get website content into AI" use case.

---

## Pricing

### Cloud Plans (firecrawl.dev)

| Plan | Credits/mo | Price/mo | Concurrent | Extra Credits |
|------|-----------|----------|------------|---------------|
| **Free** | 500 (one-time) | $0 | 2 | — |
| **Hobby** | 3,000 | $16 | 5 | $9/1k |
| **Standard** | 100,000 | $83 | 50 | $47/35k |
| **Growth** | 500,000 | $333 | 100 | $177/175k |
| **Enterprise** | Custom | Custom | Custom | Custom |

*Annual billing = 2 months free*

### Credit Costs
- Scrape/Crawl: 1 credit/page
- Map: 1 credit/request
- Search: 2 credits/10 results
- Agent (Preview): Dynamic pricing, 5 free daily runs

---

## Self-Hosted Options

Firecrawl is **open source (AGPL-3.0)** and can be self-hosted.

### Self-Host Limitations vs Cloud:
| Feature | Self-Hosted | Cloud |
|---------|-------------|-------|
| Core scraping | ✅ | ✅ |
| Crawling | ✅ | ✅ |
| Mapping | ✅ | ✅ |
| **Fire-engine** (anti-bot) | ❌ | ✅ |
| **Actions** (click/scroll) | ❌ | ✅ |
| Dashboard/analytics | ❌ | ✅ |
| Managed proxies | ❌ | ✅ |

### Running Self-Hosted
```bash
# Clone repo
git clone https://github.com/firecrawl/firecrawl.git
cd firecrawl

# Docker compose
docker-compose up -d
```

**Note:** Self-hosted requires managing your own:
- Proxies for anti-bot sites
- Infrastructure scaling
- Redis/PostgreSQL for job queues

---

## MCP Integration

Firecrawl has an **official MCP server** for AI coding assistants!

**Repo:** https://github.com/firecrawl/firecrawl-mcp-server

### Installation
```bash
# Run with npx
FIRECRAWL_API_KEY=fc-YOUR_KEY npx -y firecrawl-mcp
```

### Supported Platforms
- ✅ **Claude Desktop**
- ✅ **Cursor** (v0.45.6+)
- ✅ **Windsurf**
- ✅ **VS Code**
- ✅ HTTP Streamable mode

### MCP Tools Available
| Tool | Description |
|------|-------------|
| `firecrawl_scrape` | Single page extraction |
| `firecrawl_batch_scrape` | Multiple URLs |
| `firecrawl_crawl` | Full site crawl |
| `firecrawl_map` | URL discovery |
| `firecrawl_search` | Web search |
| `firecrawl_extract` | Structured extraction |

### Claude Desktop Config
```json
{
  "mcpServers": {
    "firecrawl": {
      "command": "npx",
      "args": ["-y", "firecrawl-mcp"],
      "env": {
        "FIRECRAWL_API_KEY": "YOUR_API_KEY"
      }
    }
  }
}
```

---

## Grant Nexus Use Case

### How Firecrawl Fits

For Grant Nexus (grant database aggregation), Firecrawl would be excellent for:

#### 1. **Initial Discovery** (Map endpoint)
```python
# Discover all grant listing pages
firecrawl.map("https://grants.gov")
firecrawl.map("https://www.nsf.gov/funding")
```

#### 2. **Bulk Grant Extraction** (Crawl/Batch)
```python
# Crawl entire grant section
firecrawl.crawl(
    "https://grants.gov/search-results",
    limit=1000,
    scrape_options={"formats": ["markdown"]}
)
```

#### 3. **Structured Data Extraction** (Extract)
```python
from pydantic import BaseModel

class Grant(BaseModel):
    title: str
    agency: str
    deadline: str
    amount_min: int
    amount_max: int
    eligibility: str
    url: str

# Extract structured grant data
firecrawl.extract(
    urls=["https://grants.gov/*"],
    schema=Grant,
    prompt="Extract grant opportunity details"
)
```

### Recommended Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Grant Nexus                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────┐    ┌──────────────┐    ┌───────────┐  │
│  │ Source List │───▶│   Firecrawl  │───▶│ Processor │  │
│  │ (URLs/RSS)  │    │   API/MCP    │    │ (LLM)     │  │
│  └─────────────┘    └──────────────┘    └───────────┘  │
│                            │                    │       │
│                            ▼                    ▼       │
│                     ┌─────────────┐      ┌──────────┐  │
│                     │ Raw Markdown │      │ Grants DB │  │
│                     │   Cache      │      │ (Vector)  │  │
│                     └─────────────┘      └──────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Cost Estimate (Grant Nexus)

| Scenario | Pages | Cost (Standard) |
|----------|-------|-----------------|
| Initial crawl (10 sources) | ~10,000 | ~$0.83 |
| Daily updates | ~500 | ~$0.04/day |
| Monthly | ~15,000 | Covered by $83 plan |

Standard plan (100k credits) would easily cover Grant Nexus scraping needs.

---

## Pros & Cons

### Pros ✅
- **LLM-optimized output** - No HTML parsing needed
- **Handles JS/SPAs** - Real browser rendering
- **Anti-bot built-in** - Works on protected sites (cloud)
- **Excellent MCP support** - Native Claude/Cursor integration
- **Open source option** - AGPL-3.0, self-host available
- **Structured extraction** - Schema-based JSON output
- **Great docs & SDKs** - Python, Node, Go, Rust
- **Y Combinator backed** - Active development, 77k+ GitHub stars

### Cons ❌
- **Cloud costs** - Can add up for large-scale scraping
- **Self-hosted limitations** - No fire-engine, actions, proxies
- **Credit system** - No true pay-per-use
- **Actions cloud-only** - Interactive scraping requires paid plan
- **Rate limits** - Lower tiers have restrictions
- **No social media** - Explicitly doesn't support social platforms

---

## Recommendations

### For Grant Nexus

1. **Start with Hobby ($16/mo)** for prototyping
2. **Upgrade to Standard ($83/mo)** for production
3. **Use Extract endpoint** for structured grant data
4. **Set up MCP** for development workflow

### Integration Priority
1. Add Firecrawl MCP to Claude Code/Cursor
2. Build grant extraction schemas (Pydantic)
3. Create source registry (grants.gov, NSF, NIH, etc.)
4. Implement change detection with crawl diffs

### Alternative Approach
For sites Firecrawl can't handle or to reduce costs:
- Use **self-hosted Firecrawl** for basic sites
- Use **Playwright/browser-use** for complex interactions
- Use **Firecrawl cloud** only for anti-bot protected sites

---

## Quick Start

```bash
# Install SDK
pip install firecrawl-py

# Test scrape
from firecrawl import Firecrawl
fc = Firecrawl(api_key="fc-YOUR_KEY")
doc = fc.scrape("https://grants.gov", formats=["markdown"])
print(doc.markdown)
```

---

## Links

- **Website:** https://firecrawl.dev
- **Docs:** https://docs.firecrawl.dev
- **GitHub:** https://github.com/firecrawl/firecrawl
- **MCP Server:** https://github.com/firecrawl/firecrawl-mcp-server
- **Pricing:** https://firecrawl.dev/pricing
- **Playground:** https://firecrawl.dev/playground
