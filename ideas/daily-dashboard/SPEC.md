# Daily Dashboard - Specification

**Purpose:** A single-page morning briefing that shows Winn everything he needs to start the day.

**Location:** Durango, CO  
**User:** Winn (founder, options trader, grant writer)

---

## 📊 Dashboard Sections

### 1. 🌤️ Weather - Durango, CO

**What to show:**
- Current conditions (temp, feels like, wind, humidity)
- Today's high/low
- Precipitation probability
- 3-day outlook
- Sunrise/sunset times
- Air quality (wildfire season matters in CO)

**Data Sources:**
| Source | Type | Notes |
|--------|------|-------|
| [Open-Meteo](https://open-meteo.com) | Free API | No key required, excellent |
| [Weather.gov](https://api.weather.gov) | Free API | NOAA official, no key |
| [OpenWeatherMap](https://openweathermap.org/api) | Freemium | 1000 calls/day free |

**CLI Commands:**
```bash
# Open-Meteo (no API key needed!)
curl -s "https://api.open-meteo.com/v1/forecast?latitude=37.2753&longitude=-107.8801&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset&timezone=America/Denver&forecast_days=3"

# Weather.gov (official NOAA)
curl -s "https://api.weather.gov/points/37.2753,-107.8801" # Get grid endpoint first
curl -s "https://api.weather.gov/gridpoints/GJT/75,45/forecast" # Then fetch forecast
```

---

### 2. 📈 Markets - S&P, NASDAQ, BTC, Options Levels

**What to show:**
- Pre-market/current prices for SPY, QQQ, BTC
- Daily % change
- Key support/resistance levels (for options trading)
- VIX (fear gauge)
- Futures if before market open

**Data Sources:**
| Source | Type | Notes |
|--------|------|-------|
| [Yahoo Finance](https://finance.yahoo.com) | Scrape/API | Unofficial but reliable |
| [Polygon.io](https://polygon.io) | API (paid) | Best for options data |
| [Alpha Vantage](https://alphavantage.co) | Freemium | 25 calls/day free |
| [CoinGecko](https://coingecko.com/api) | Free | Best for crypto |
| [Tradier](https://tradier.com) | API | Options-focused |

**CLI Commands:**
```bash
# CoinGecko - BTC price (no key)
curl -s "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true"

# Alpha Vantage - SPY quote (needs free API key)
curl -s "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=SPY&apikey=YOUR_KEY"

# Yahoo Finance (unofficial, may break)
curl -s "https://query1.finance.yahoo.com/v8/finance/chart/SPY?interval=1d&range=1d"
```

**Options Levels (Manual/Agent-Populated):**
- Max pain for SPY/QQQ (weekly expiry)
- Key gamma levels
- 0DTE call/put walls
- Could integrate with Options Analyst project when ready

---

### 3. 📅 Calendar - Today's Events

**What to show:**
- Today's events with times
- Tomorrow preview (first 2-3 items)
- Event locations/links
- Time until next event

**Data Sources:**
| Source | Type | Notes |
|--------|------|-------|
| Google Calendar API | OAuth | Primary calendar |
| Apple Calendar (local) | AppleScript/sqlite | If using macOS Calendar |
| CalDAV | Standard | Works with most providers |

**CLI Commands:**
```bash
# Google Calendar via gcalcli (install: pip install gcalcli)
gcalcli agenda --nocolor --tsv

# macOS Calendar via AppleScript
osascript -e 'tell application "Calendar" to get summary of events of calendar "Home" whose start date > (current date)'

# Or use icalBuddy (brew install ical-buddy)
icalBuddy -f -nc eventsToday
```

**Moltbot Integration:**
```bash
# If calendar skill is configured:
moltbot calendar today
```

---

### 4. ✅ Priority Tasks - From PROJECT_QUEUE.md

**What to show:**
- Top 3 priority projects
- "Quick Actions for Winn" section
- Blocked items (so Winn knows what to unblock)
- Any items due today

**Data Source:**
- `/Users/clawdchad/clawd/PROJECT_QUEUE.md`

**CLI Commands:**
```bash
# Extract Quick Actions section
sed -n '/## Quick Actions for Winn/,/^##/p' PROJECT_QUEUE.md | head -20

# Count blocked items
grep -c "⏳ Blocked" PROJECT_QUEUE.md

# Get Priority 1 tasks
sed -n '/## 🔥 Priority 1/,/^##/p' PROJECT_QUEUE.md
```

**Agent Enhancement:**
- Chad could parse PROJECT_QUEUE.md and summarize
- Highlight items that changed since yesterday
- Suggest today's focus based on blockers cleared

---

### 5. 🤖 Overnight Work - Agent Activity

**What to show:**
- What Chad/agents accomplished overnight
- Any errors or issues
- Commits made
- Files created/modified

**Data Sources:**
| Source | Path/Command | Notes |
|--------|--------------|-------|
| Memory files | `memory/YYYY-MM-DD.md` | Agent's daily notes |
| Git log | `git log --since="yesterday"` | Recent commits |
| Session logs | Moltbot logs | If accessible |

**CLI Commands:**
```bash
# Today's memory file
cat memory/$(date +%Y-%m-%d).md 2>/dev/null || echo "No notes yet"

# Recent git activity
git log --oneline --since="12 hours ago" --all

# Files modified recently
find . -type f -mtime -1 -not -path "./.git/*" | head -20
```

**Agent Enhancement:**
- Chad writes a "## 🌙 Overnight Summary" section in daily memory
- Could include: tasks completed, issues hit, suggestions for today

---

### 6. 🐦 X Highlights - Top Posts

**What to show:**
- Top posts from accounts Winn follows
- Trending topics in finance/tech
- @ClawdChad engagement stats
- Any mentions or replies

**Data Sources:**
| Source | Type | Notes |
|--------|------|-------|
| X API v2 | OAuth | Requires developer account |
| Nitter | Scrape | Privacy-focused X frontend |
| RapidAPI Twitter | Paid API | Easier than official |

**CLI Commands:**
```bash
# X API v2 - Get home timeline (needs bearer token)
curl -s -H "Authorization: Bearer $X_BEARER_TOKEN" \
  "https://api.twitter.com/2/users/me/timelines/reverse_chronological?max_results=10"

# Get mentions
curl -s -H "Authorization: Bearer $X_BEARER_TOKEN" \
  "https://api.twitter.com/2/users/me/mentions"
```

**Agent Enhancement:**
- Chad monitors X and curates top 5-10 posts worth seeing
- Filters by engagement, relevance, or followed accounts
- Could store in `memory/x-highlights.md`

---

### 7. 💰 Grant Alerts - New Matching Grants (Future)

**What to show:**
- New grants matching saved criteria
- Application deadlines approaching
- Grant amounts and eligibility
- Link to Grant Forge for details

**Data Sources (Future):**
| Source | Type | Notes |
|--------|------|-------|
| Grants.gov | RSS/API | Federal grants |
| Foundation Directory | Paid | Private foundations |
| Candid/GuideStar | Paid | Nonprofit data |
| State grant portals | Varies | Colorado-specific |

**Implementation:**
- Grant Forge runs nightly searches
- Saves matches to database
- Dashboard pulls "new since yesterday"

```bash
# Future: Grant Forge CLI
grantforge alerts --new --since yesterday
```

---

## 🛠️ Implementation Options

### Option A: CLI Tool (`dashboard`)

**Pros:** Fast, runs anywhere, no server needed  
**Cons:** Text-only, no persistence

```bash
#!/bin/bash
# dashboard - Morning briefing CLI

echo "═══════════════════════════════════════════"
echo "  📊 DAILY DASHBOARD - $(date '+%A, %B %d')"
echo "═══════════════════════════════════════════"

# Weather
echo -e "\n🌤️  WEATHER - Durango, CO"
curl -s "https://api.open-meteo.com/v1/forecast?latitude=37.2753&longitude=-107.8801&current=temperature_2m,weather_code&timezone=America/Denver" | jq -r '"  Current: \(.current.temperature_2m)°C"'

# Markets
echo -e "\n📈 MARKETS"
curl -s "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true" | jq -r '"  BTC: $\(.bitcoin.usd) (\(.bitcoin.usd_24h_change | round)%)"'

# Calendar
echo -e "\n📅 TODAY'S EVENTS"
icalBuddy -f -nc eventsToday 2>/dev/null || echo "  (Install icalBuddy for calendar)"

# Tasks
echo -e "\n✅ PRIORITY TASKS"
sed -n '/## Quick Actions for Winn/,/^---/p' ~/clawd/PROJECT_QUEUE.md 2>/dev/null | grep -E "^\d\.|^\-" | head -5

# Overnight
echo -e "\n🤖 OVERNIGHT WORK"
cat ~/clawd/memory/$(date +%Y-%m-%d).md 2>/dev/null | head -10 || echo "  No agent notes yet today"

echo -e "\n═══════════════════════════════════════════"
```

**Installation:**
```bash
# Save to ~/bin/dashboard and make executable
chmod +x ~/bin/dashboard
```

---

### Option B: Web Dashboard (HTML + Local Server)

**Pros:** Visual, can refresh, shareable  
**Cons:** Needs server running

**Stack:**
- Simple HTML/CSS/JS page
- Node.js or Python backend (fetches data)
- Runs on localhost or Tailscale

**Directory Structure:**
```
daily-dashboard/
├── index.html          # Main dashboard page
├── style.css           # Styling
├── app.js              # Frontend logic
├── server.js           # Node backend
└── data/
    └── dashboard.json  # Cached data
```

---

### Option C: Canvas Presentation (Moltbot Native)

**Pros:** Integrated with agent, auto-updates  
**Cons:** Requires Moltbot canvas support

```bash
# Agent generates dashboard and presents
moltbot canvas present --url "file:///path/to/dashboard.html"
```

---

## 🤖 Agent Automation

### Daily Routine (Chad)

Add to `HEARTBEAT.md`:
```markdown
## 🌅 Morning Dashboard (06:00 MT)
- [ ] Fetch weather for Durango
- [ ] Get market pre-open data
- [ ] Summarize overnight work
- [ ] Check X for highlights
- [ ] Update memory/YYYY-MM-DD.md with "## 🌅 Morning Briefing"
```

### Cron Job Alternative

```bash
# Run dashboard generation at 6 AM
0 6 * * * /Users/clawdchad/bin/generate-dashboard.sh
```

### Agent-Generated Sections

Chad can populate these files nightly:
```
daily-dashboard/
├── data/
│   ├── weather.json      # Cached weather
│   ├── markets.json      # Market data
│   ├── tasks.json        # Parsed from PROJECT_QUEUE.md
│   ├── overnight.md      # Summary of agent work
│   └── x-highlights.md   # Curated X posts
```

---

## 📋 MVP Implementation Path

### Phase 1: CLI Script (1 hour)
1. Create `~/bin/dashboard` bash script
2. Add weather (Open-Meteo - works now)
3. Add BTC price (CoinGecko - works now)
4. Add task extraction from PROJECT_QUEUE.md

### Phase 2: Agent Integration (2 hours)
1. Chad writes overnight summary to memory
2. Parse memory file for "Overnight Work" section
3. Add to HEARTBEAT.md for morning routine

### Phase 3: Markets Deep Dive (when Polygon ready)
1. Add SPY/QQQ/VIX with Polygon API
2. Add options levels from Options Analyst
3. Integrate with trading workflow

### Phase 4: Web Version (optional)
1. Build simple HTML dashboard
2. Add auto-refresh
3. Mobile-friendly for phone checks

### Phase 5: X & Grants (future)
1. X API integration for highlights
2. Grant Forge integration for alerts

---

## 🔐 Required Credentials

| Service | Status | How to Get |
|---------|--------|------------|
| Open-Meteo | ✅ No key needed | Just use it |
| CoinGecko | ✅ No key needed | Just use it |
| Alpha Vantage | 🟡 Free key | alphavantage.co |
| Polygon.io | 🟡 Paid | polygon.io (for Options Analyst) |
| X API | 🟡 Developer account | developer.twitter.com |
| Google Calendar | 🟡 OAuth setup | console.cloud.google.com |

---

## 📍 Quick Start

```bash
# Create the script
mkdir -p ~/bin
cat > ~/bin/dashboard << 'EOF'
#!/bin/bash
echo "📊 DASHBOARD - $(date '+%A %B %d, %Y')"
echo ""
echo "🌤️ WEATHER - Durango, CO"
curl -s "https://api.open-meteo.com/v1/forecast?latitude=37.2753&longitude=-107.8801&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=America/Denver&forecast_days=1" | jq -r '"  Now: \(.current.temperature_2m)°C  |  High: \(.daily.temperature_2m_max[0])°C  |  Low: \(.daily.temperature_2m_min[0])°C"'
echo ""
echo "💰 BTC"
curl -s "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true" | jq -r '"  $\(.bitcoin.usd | floor) (\(.bitcoin.usd_24h_change | . * 100 | floor / 100)%)"'
echo ""
echo "✅ QUICK ACTIONS"
grep -E "^\d+\. \[" ~/clawd/PROJECT_QUEUE.md 2>/dev/null || echo "  Check PROJECT_QUEUE.md"
EOF
chmod +x ~/bin/dashboard

# Run it
~/bin/dashboard
```

---

*Spec created: $(date)*  
*Owner: Chad (agent) + Winn (human)*
