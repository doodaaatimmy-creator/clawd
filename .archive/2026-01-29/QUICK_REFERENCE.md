# 🚀 QUICK REFERENCE - Clawd Workspace Master Index

*Last updated: January 28, 2026*

---

## 📚 Knowledge Documents

| File | Summary |
|------|---------|
| `knowledge/nih-reporter-api.md` | NIH RePORTER API v2 for grant data - $42B/year in awards, full abstracts, no auth needed |
| `knowledge/nsf-award-api.md` | NSF Award Search API - 2007+ awards, project outcomes, Boolean search support |
| `knowledge/grants-gov-api.md` | Grants.gov + Simpler.Grants.gov APIs - federal grant discovery, XML bulk exports |
| `knowledge/grant-competitors.md` | Competitive landscape: Pivot-RP, Instrumentl, Candid, OpenGrants, pricing & gaps |
| `knowledge/grant-market-size.md` | Market analysis: $2.2-2.8B (2024), 10%+ CAGR, key segments and opportunities |
| `knowledge/grant-writing-resources.md` | AI grant writing prompts, tools comparison, integration opportunities |
| `knowledge/pivot-competitor-notes.md` | Pivot-RP deep dive - enterprise pricing, "Grant Forge for the rest of us" opportunity |
| `knowledge/options-intel.md` | 11 cycles of options market intel: GEX tools, Tradier MCP, gamma-gex-scalper, APIs |
| `knowledge/unusual-whales-integration.md` | Unusual Whales API integration notes, existing MCP servers, flow data |
| `knowledge/quantarded-analysis.md` | WSB + congressional trades signal aggregator, AI semantic parsing approach |
| `knowledge/ralph-toolkit.md` | Ralph Wiggum Loop pattern - orchestration over coding, atomic tasks, PRD-driven |
| `knowledge/claude-code-swarm-gist.md` | Hidden Claude Code multi-agent system - teams, tasks, inboxes, spawn backends |
| `knowledge/hn-scan-2026-01-28.md` | Hacker News scan - OpenAI Prism, SERA coding agents, Karpathy notes, Quantarded |

---

## 🛠️ Tools Built

### Production Tools

| Tool | Location | Purpose |
|------|----------|---------|
| **molt-dash** | `tools/molt-dash/` | Minimal CLI dashboard for Moltbot status (tokens, sessions, gateway) |
| **gmail.sh** | `tools/gmail.sh` | Gmail utility with Keychain-secured credentials (send/check inbox) |
| **bls-fetcher** | `ideas/ir-automation/tools/bls-fetcher.ts` | BLS OEWS wage data fetcher for salary analysis |

### Tool Details

**molt-dash**
```bash
~/clawd/tools/molt-dash/molt-dash
# Shows: gateway status, channel health, active sessions, token usage
```

**bls-fetcher**
```bash
npx tsx ideas/ir-automation/tools/bls-fetcher.ts fetch --soc 25-1021 --area CO
npx tsx ideas/ir-automation/tools/bls-fetcher.ts series  # List SOC codes
```

---

## 💡 Ideas Documented

### Active Ideas

| Project | Location | Status | Summary |
|---------|----------|--------|---------|
| **IR Automation** | `ideas/ir-automation/` | 🟡 In Progress | Automate FLC institutional research - BLS, IPEDS, Workday integration |
| **GTA Durango** | `ideas/gta-durango/` | 📝 Designed | Vice City meets Colorado - GIS data pipeline, Unreal Engine 5 + Cesium |
| **ChipZone** | `ideas/chip-game/` | 📝 Designed | Golf chipping gamification app - phone camera ball tracking via Vision API |

### Idea Summaries

**IR Automation (Playbook)**
- Goal: Job on autopilot → side project freedom
- Data sources: BLS API, IPEDS, Workday exports, CUPA-HR
- Tools: `flc` CLI toolkit (bls, ipeds, workday, salary, report commands)
- Timeline: 4 weeks to MVP automation

**GTA Durango (Game Design)**
- "Neon Alpine" aesthetic - Vice City pink/purple + mountain town reality
- Technical: Unreal Engine 5 + Cesium for GIS, 1:8 scale (~2 sq mi)
- Unique features: Driveable narrow-gauge trains, ski/snowboard mechanics, Animas River
- MVP: Downtown only, 5 story missions, 6-9 month dev time

**ChipZone (Product Spec)**
- Use Apple Vision VNDetectTrajectoriesRequest for ball tracking
- AR ground plane + virtual targets
- Gamification: scoring, challenges, streaks
- Monetization: Freemium ($4.99/mo Pro subscription)
- MVP validation: >80% detection rate in daylight

---

## 🔑 Key APIs Discovered

### Grant/Research APIs

| API | Auth | Rate Limit | Key Data |
|-----|------|------------|----------|
| **NIH RePORTER v2** | None | ~1/sec, 500/page | Abstracts, $42B awards, 1985+ |
| **NSF Award Search** | None | 25/page, 3K max | Project outcomes, 2007+ |
| **Grants.gov Legacy** | None | Fair use | Federal opportunities, search |
| **Simpler.Grants.gov** | API Key | 60/min, 10K/day | Modern REST, better filtering |
| **IPEDS** | None | N/A | Institutional data, CSV downloads |

### Finance/Market APIs

| API | Auth | Cost | Key Data |
|-----|------|------|----------|
| **BLS Public Data v2** | Free key | 500/day with key | OEWS wages, employment stats |
| **Polygon.io (→Massive)** | API Key | Paid tiers | Options chains, OHLCV, all exchanges |
| **Tradier** | API Key | Free tier | Options data, **HAS MCP SERVER** |
| **Unusual Whales** | API Key | Paid | Flow data, dark pool, congressional |
| **QuiverQuant** | Web | Free tier | Congressional trading, backtests |

### Key Discovery: Tradier MCP Server (Dec 2025)
- First broker with native MCP integration for AI trading
- Direct Claude ↔ broker connection
- Real-time data + trade execution via natural language

---

## 👤 Important Accounts/Contacts

### Winn's Accounts

| Service | Handle/Account | Notes |
|---------|----------------|-------|
| **GitHub** | `doodaaatimmy-creator` | Active, use for pushes |
| **Gmail** | `doodaaatimmy@gmail.com` | Donny's own account |
| **X/Twitter** | `@ClawdChad` | Clawdius Maximus persona |
| **Discord** | ClawdChad Signals server | Guild: `1465753795333062793` |

### Work Contacts

| Contact | Role | Action Needed |
|---------|------|---------------|
| **Joe** | HR at Fort Lewis College | Paternity leave arrangements (May 27 due date) |

### API Keys Needed

| API | Status | Where to Get |
|-----|--------|--------------|
| Polygon | 🟡 Pending | polygon.io |
| BLS | 🟢 Free | data.bls.gov/registrationEngine/ |
| Simpler.Grants.gov | Available | simpler.grants.gov/developer |

---

## 🚧 Blockers & TODOs (Winn's Action Required)

### Priority 1: Grant Forge Deployment
- [ ] **Vercel auth/login** - needed to deploy
- [ ] **Supabase setup** - depends on deployment
- ⏳ Customer outreach blocked on live product

### Priority 2: Options Analyst
- [ ] **Get Polygon API key** - data population blocked
- ⏳ Unusual Whales integration blocked on Polygon

### Priority 3: Infrastructure
- [ ] **Create GitHub remote for clawd repo** - enable backup/push
- [ ] **Set up secure secrets management** - API key isolation

### Priority 4: Personal
- [ ] **Contact Joe in HR** - paternity leave arrangements
- Baby due: **May 27, 2025** 🎉
- 12 weeks state-backed leave = critical runway

---

## 📊 Quick Stats

| Category | Count |
|----------|-------|
| Knowledge docs | 13 |
| Tools built | 3 |
| Ideas documented | 3 |
| APIs catalogued | 10+ |
| Blockers for Winn | 5 |

---

## 🗂️ Directory Structure

```
/Users/clawdchad/clawd/
├── AGENTS.md           # Workspace rules
├── MEMORY.md           # Long-term memory
├── USER.md             # Winn's profile
├── SOUL.md             # Donny's identity
├── PROJECT_QUEUE.md    # Prioritized backlog
├── QUICK_REFERENCE.md  # THIS FILE
├── knowledge/          # Research & analysis (13 docs)
├── ideas/              # Project designs (3 projects)
│   ├── ir-automation/  # FLC job automation
│   ├── gta-durango/    # Game concept
│   └── chip-game/      # Golf app concept
├── tools/              # Built utilities
│   ├── molt-dash/      # Moltbot dashboard
│   └── gmail.sh        # Email utility
└── memory/             # Daily logs
```

---

## 🎯 Quick Access Commands

```bash
# Moltbot status
~/clawd/tools/molt-dash/molt-dash

# BLS wage data
npx tsx ~/clawd/ideas/ir-automation/tools/bls-fetcher.ts fetch --soc 25-1021

# Open knowledge folder
open ~/clawd/knowledge/

# Find something
grep -r "keyword" ~/clawd/knowledge/
```

---

## 🔗 Key External Resources

| Resource | URL |
|----------|-----|
| NIH RePORTER | https://api.reporter.nih.gov/ |
| NSF Awards | http://api.nsf.gov/services/v1/ |
| Grants.gov API | https://api.grants.gov/v1/api/ |
| BLS Registration | https://data.bls.gov/registrationEngine/ |
| Tradier MCP | https://docs.tradier.com/docs/tradier-mcp |
| Unusual Whales | https://unusualwhales.com/ |
| gamma-gex-scalper | https://github.com/thechuck88/gamma-gex-scalper |

---

*"Programs should be accessible via CLI and made for AI interaction between programs and databases. This is the way."* — Winn
