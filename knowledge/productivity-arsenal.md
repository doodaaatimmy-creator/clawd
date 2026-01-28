# 🔧 Winn's Productivity Arsenal

*Actionable tools, workflows, and quick wins — updated January 2026*

---

## 1. CLI Power Tools (Install Today)

### The Core Four
```bash
# Install all at once
brew install fzf ripgrep fd bat jq eza zoxide
```

| Tool | What It Does | Killer Command |
|------|--------------|----------------|
| **fzf** | Fuzzy finder for everything | `Ctrl+R` for command history, `Ctrl+T` for files |
| **ripgrep (rg)** | Search code 10x faster than grep | `rg "TODO" --type py` |
| **fd** | Better `find` command | `fd "\.md$"` finds all markdown |
| **bat** | `cat` with syntax highlighting | `bat README.md` |
| **jq** | JSON swiss army knife | `curl api.com \| jq '.data[0].price'` |
| **eza** | Modern `ls` with git status | `eza -la --git` |
| **zoxide** | Smarter `cd` that learns | `z proj` jumps to ~/projects |

### Finance-Specific CLI
```bash
# Quick stock lookup (add to .zshrc)
stock() { curl -s "https://query1.finance.yahoo.com/v8/finance/chart/$1" | jq '.chart.result[0].meta | {symbol, price: .regularMarketPrice}' }

# Options chain scraper
alias options="curl -s 'https://query1.finance.yahoo.com/v7/finance/options/{$1}' | jq '.optionChain.result[0].options[0]'"
```

### Git Shortcuts
```bash
# Add to ~/.gitconfig
[alias]
    co = checkout
    br = branch
    st = status -sb
    lg = log --oneline --graph --decorate -20
    wip = !git add -A && git commit -m "WIP"
    undo = reset HEAD~1 --mixed
```

---

## 2. AI Workflow Patterns (From Claude Code Creator)

### The Boris Cherny Method (Claude Code Creator)
*Source: Anthropic engineering best practices*

#### Pattern A: Explore → Plan → Code → Commit
1. **Explore**: "Read the files handling [X]. Don't write code yet."
   - Use subagents for complex investigation
2. **Plan**: "Think about how to approach [problem]"
   - The word "think" triggers extended thinking mode
3. **Code**: "Implement the solution. Verify as you go."
4. **Commit**: "Commit with a descriptive message and create PR"

#### Pattern B: Test-Driven Development with AI
1. Write tests first: "Create tests for [feature] with these input/output pairs. We're doing TDD - no mocks."
2. Confirm failure: "Run tests, confirm they fail. Don't write implementation."
3. Commit tests
4. Implement: "Write code to pass tests. Don't modify tests. Keep going until all pass."
5. Commit code

#### The CLAUDE.md Power Move
Every mistake becomes a rule:
```markdown
# CLAUDE.md in repo root
## Commands
- npm run build: Build project
- npm test: Run tests

## Code Style
- Use ES modules, not CommonJS
- Always destructure imports

## Gotchas
- Don't use deprecated API v1 endpoints
- Always check for null before accessing user.email
```

**Pro tip**: Press `#` in Claude Code to auto-add learnings to CLAUDE.md

#### Run Parallel Instances
- Spin up multiple Claude Code sessions for independent tasks
- Share learnings between them via CLAUDE.md updates
- 10-30% productivity gain is realistic; disciplined repos see more

### High-Leverage Prompts

```markdown
# For codebase onboarding
"Give me a tour of this codebase. Focus on: architecture, key files, data flow, and any gotchas."

# For debugging
"This [error] happens when [condition]. Read the relevant files, think through possible causes, and propose 3 hypotheses before fixing."

# For refactoring
"Refactor [file] to [goal]. Show me the plan first. Preserve all existing behavior."

# For Grant Forge specifically
"Review the form handling in [component]. Check for: validation gaps, UX friction, accessibility issues. List findings before fixing."
```

---

## 3. Automation Quick Wins (Do Today)

### For IR Analyst Work

#### Auto-Filing Research
```bash
# Auto-organize downloaded PDFs by company ticker
# Add to cron or launchd
#!/bin/bash
for file in ~/Downloads/*.pdf; do
  ticker=$(pdftotext "$file" - | head -20 | grep -oE '\b[A-Z]{1,5}\b' | head -1)
  [ -n "$ticker" ] && mv "$file" ~/Documents/Research/$ticker/
done
```

#### SEC Filing Alerts
```bash
# In HEARTBEAT.md - check for new 8-K filings
## Every 4 hours
- Check SEC EDGAR for new filings from watchlist tickers
- Alert if 8-K, 10-Q, or 10-K filed
```

#### Quick Earnings Calendar
```bash
# Alias for earnings this week
alias earnings="curl -s 'https://api.nasdaq.com/api/calendar/earnings?date=$(date +%Y-%m-%d)' | jq '.data.rows[:10] | .[] | {symbol, company, time}'"
```

### For Options Trading

#### Position Snapshot Script
```python
# positions.py - Run with: python positions.py
import json
from datetime import datetime

# Your positions (update manually or connect to broker API)
positions = [
    {"symbol": "SPY", "strike": 480, "type": "call", "expiry": "2026-02-21", "qty": 5},
    # Add more...
]

for p in positions:
    days_to_expiry = (datetime.strptime(p['expiry'], '%Y-%m-%d') - datetime.now()).days
    print(f"{p['symbol']} {p['strike']}{p['type'][0].upper()} | {days_to_expiry}d to expiry")
```

#### Greeks Calculator Alias
```bash
# Quick Black-Scholes delta
alias delta="python3 -c \"import math; from scipy.stats import norm; S,K,T,r,sigma = map(float, '$@'.split()); d1=(math.log(S/K)+(r+sigma**2/2)*T)/(sigma*math.sqrt(T)); print(f'Delta: {norm.cdf(d1):.3f}')\""
```

### For Grant Forge

#### Auto-backup before deploys
```bash
# Pre-deploy hook in package.json
"predeploy": "pg_dump $DATABASE_URL > backups/$(date +%Y%m%d_%H%M%S).sql && git add -A && git commit -m 'Pre-deploy backup'"
```

#### Health Check Cron
```bash
# Add to crontab: every 15 min
*/15 * * * * curl -s https://grantforge.app/api/health || notify "Grant Forge health check failed"
```

---

## 4. macOS Keyboard Mastery

### System Essentials
| Shortcut | Action |
|----------|--------|
| `⌘ + Space` | Spotlight (or Raycast) |
| `⌘ + Tab` | Switch apps |
| `⌘ + \`` | Switch windows of same app |
| `⌘ + H` | Hide current window |
| `⌘ + Ctrl + Q` | Lock screen |
| `⌘ + Shift + 5` | Screenshot/record menu |
| `⌘ + Ctrl + Space` | Emoji picker |

### Window Management (Rectangle/built-in)
| Shortcut | Action |
|----------|--------|
| `Ctrl + ⌥ + ←/→` | Left/right half |
| `Ctrl + ⌥ + ↑` | Maximize |
| `Ctrl + ⌥ + Enter` | Maximize |
| `Ctrl + ⌥ + C` | Center window |

### Terminal Speed
| Shortcut | Action |
|----------|--------|
| `Ctrl + A/E` | Start/end of line |
| `Ctrl + W` | Delete word backward |
| `Ctrl + K` | Delete to end of line |
| `Ctrl + R` | Search command history (fzf) |
| `!!` | Repeat last command |
| `!$` | Last argument of previous command |

### Raycast Power Moves
**Install Raycast if you haven't**: `brew install --cask raycast`

Essential Extensions:
- **Clipboard History** (`⌘ + Shift + V`) - Never lose copied text
- **Window Management** - Replace Rectangle
- **Calculator** - Quick math without leaving keyboard
- **System Commands** - Sleep, restart, empty trash
- **GitHub** - Quick repo access, PR status
- **Snippets** - Text expansion (email templates, code snippets)

#### Custom Raycast Scripts
```bash
# ~/.config/raycast/scripts/stock-price.sh
#!/bin/bash
# @raycast.schemaVersion 1
# @raycast.title Stock Price
# @raycast.mode inline
# @raycast.argument1 { "type": "text", "placeholder": "Ticker" }

curl -s "https://query1.finance.yahoo.com/v8/finance/chart/$1" | jq -r '.chart.result[0].meta | "\(.symbol): $\(.regularMarketPrice)"'
```

#### Raycast Quicklinks for Finance
- `https://finviz.com/quote.ashx?t={Query}` → Quick stock charts
- `https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK={Query}` → SEC filings
- `https://twitter.com/search?q=%24{Query}` → Stock sentiment on X

---

## 5. Morning Routine Optimization (6 AM Wake)

### The Power Hour Framework
```
6:00 - 6:05  │ Wake. No phone. Water + stretch
6:05 - 6:15  │ Quick body: 20 pushups, cold face wash, coffee brewing
6:15 - 6:45  │ X Finance Space + Market Prep (see below)
6:45 - 7:00  │ Review calendar, set 3 priorities
7:00+        │ Deep work block (most important task)
```

### Market Prep Checklist (Automate This)
```markdown
# In HEARTBEAT.md - Run at 6:15 AM
## Morning Market Brief
- Futures status (ES, NQ, RTY)
- Overnight notable movers (>5% gap)
- Economic calendar events today
- Earnings before open
- My positions: overnight changes, Greeks decay
```

### Finance X Space Routine
**Before joining:**
1. Check pre-market futures (2 min)
2. Scan @zerohedge, @unusual_whales for overnight news (3 min)
3. Have your ticker watchlist ready

**While listening:**
- Keep a running note in Obsidian/Apple Notes
- Tag actionable ideas: 🎯 = research later, 💰 = potential trade
- Note speakers to follow

**After space:**
- Review notes, move 🎯 items to research queue
- Set any alerts based on discussed levels

### Quick Wins to Implement Today
1. **Disable notifications** until 9 AM (Focus mode)
2. **Prep clothes/coffee** night before
3. **No email** before 10 AM (batch check twice daily)
4. **Time-block** deep work: 7-9 AM and 2-4 PM
5. **End-of-day shutdown ritual**: Review wins, prep tomorrow's 3 priorities

---

## 6. Quick Reference Card

### Today's Install List
```bash
# Run this now
brew install fzf ripgrep fd bat jq eza zoxide
brew install --cask raycast rectangle

# Setup fzf keybindings
$(brew --prefix)/opt/fzf/install
```

### Files to Create
- [ ] `~/.claude/CLAUDE.md` - Global AI instructions
- [ ] `CLAUDE.md` in each project root
- [ ] `~/.config/raycast/scripts/` - Custom Raycast scripts
- [ ] `HEARTBEAT.md` - Morning automation checklist

### Daily Habits to Build
1. **Morning**: No phone first 15 min, market prep routine
2. **Work**: Use Claude Code's explore→plan→code→commit pattern
3. **Evening**: 5 min shutdown ritual, prep tomorrow

### Weekly Review
- [ ] Update CLAUDE.md with learnings
- [ ] Clean Downloads folder
- [ ] Review position Greeks and expiries
- [ ] Archive completed research

---

*"The goal is to be dangerous, not perfect."*

Last updated: January 28, 2026
