# HEARTBEAT.md — Donny's Pulse

## On Each Heartbeat, Rotate Through:

### 🌅 Morning Brief (FIRST heartbeat of day, ~6-7 AM MT)
- [ ] **Research scan** (use local LLM for summaries):
  - Open Reddit via browser → check subscribed subs feed
  - Open X (@ClawdChad) via browser → check feed
  - Extract top 3-5 valuable findings
  - Summarize with `ollama run qwen3:4b` to save tokens
  - Log raw findings to `memory/research/YYYY-MM-DD.md`
- [ ] Check weather for Durango
- [ ] Read `life/health/foot-protocol.md` — current phase
- [ ] Read `life/health/fitness-protocol.md` — today's workout
- [ ] Check Discord for overnight idea captures from Winn
- [ ] Calculate paternity countdown (days until May 27)
- [ ] Compile brief and send to Discord:
  - 🔬 Research highlights (2-3 bullets)
  - 🌤️ Weather snapshot
  - 💪 Health/fitness tasks
  - 🎯 Top priority reminder
  - 🍼 Paternity countdown
- [ ] Keep it tight — scannable, not a novel

### 📬 Check Inbound (EVERY heartbeat)
- [ ] **Discord** — Check #clawdchad-signals for messages FROM Winn (not just broadcast TO it)
- [ ] Respond to any missed messages before doing other tasks

### 🔍 Research & Synthesis (pick 1 per heartbeat)
- [ ] **X Signal Scan** — Check `memory/x-signal-accounts.md` Tier 2 list (rotate 3-4 accounts per heartbeat)
  - Extract insights to `memory/x-insights/YYYY-MM-DD.md`
  - Score each post (1-5), update Value Score in tracking file
  - If score 5 → consider reposting on @ClawdChad
- [ ] Check X (@ClawdChad mentions, notifications)
- [ ] Scan Hacker News for relevant tools, launches, opportunities
- [ ] Check grants.gov for new grants in education/research space
- [ ] Review options market unusual activity (when TradingView access ready)
- [ ] Find new repos/tools that could give us edge

### 🛠️ Build & Ship (always be building)
- [ ] If no active build: pick highest-impact item from PROJECT_QUEUE.md and start it
- [ ] If build in progress: check status, push forward, document progress
- [ ] Commit work to git, create PRs for review

### 📊 Track & Report
- [ ] Log findings to memory/YYYY-MM-DD.md
- [ ] Update MEMORY.md with significant insights
- [ ] Prepare items for next morning brief

### 🧠 Fact Extraction (every 2-3 heartbeats)
- [ ] Scan recent conversations for durable facts about people/companies/projects
- [ ] Write new facts to relevant `life/areas/<type>/<entity>/items.json`
- [ ] Focus on: relationships, status changes, milestones, preferences
- [ ] Skip: casual chat, temporary info, ephemeral details
- [ ] If fact contradicts existing one: mark old as `superseded`, add new with `supersededBy` pointer

### 💡 Ideation
- [ ] Capture 1 new product/feature idea based on what I learned
- [ ] Evaluate against: Can we build it? Will it make money? Do we have edge?

### 🪞 Self-Reflection (every 2-3 heartbeats)
Ask yourself:
- [ ] **What sounded right but went nowhere?** (confidence check)
- [ ] **Where did I default to consensus?** (independent thinking check)
- [ ] **What assumption didn't I pressure test?** (depth check)
- [ ] **Did I add noise instead of signal?** (speed/efficiency check)

**If any MISS identified:**
1. Log to `memory/self-review.md` with format:
   ```
   [YYYY-MM-DD] TAG: <confidence|uncertainty|speed|depth|signal|noise>
   DOMAIN: <options|research|coding|comms|general>
   MISS: <what went wrong>
   FIX: <actionable correction>
   ```
2. When task context overlaps a logged MISS tag → force counter-check before responding

**Also log WINS** — what worked well and why. Reinforce good patterns.

---

## Current Priority Build
**Grant Nexus** — waiting on repo access

## Secondary Builds
- Options flow analyzer
- Local LLM orchestration layer
- CLI toolkit for AI-native workflows

---

## Rules
- Never just HEARTBEAT_OK if there's work to do
- Always leave a trail in memory/
- Ship > perfect
- Think like a founder
