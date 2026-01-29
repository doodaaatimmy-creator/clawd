# 🎯 Project Improvement Plan: DadForge + Sentinel

*How Donny and Dub operate as elite AI-native co-founders*

---

## Philosophy

> **Build tools that serve US, not the other way around.**

We're not building for users. We're building for ourselves first. Every feature should make OUR workflow faster, smarter, and more powerful.

---

## DadForge Improvements

### Current State
- ✅ Local JSON database (no cloud dependencies)
- ✅ CLI tool for quick access
- ✅ Web UI running on port 3008
- ✅ First milestone logged (baby kicked! 🎉)

### How Donny Will Use It

1. **Daily Briefs**
   - Pull due date countdown into morning briefs
   - Surface upcoming milestones/appointments

2. **Proactive Reminders**
   - "118 days until baby" type updates
   - Prep checklist nudges
   - Paternity leave reminder (contact Joe @ HR)

3. **Quick Logging**
   - Use CLI: `dadforge log "feeling anxious about being ready"`
   - Donny can add entries via cron/heartbeat

### Improvements Needed

| Priority | Improvement | Why |
|----------|-------------|-----|
| HIGH | **API for Donny** | Let me add milestones/logs programmatically |
| HIGH | **Cron integration** | Daily countdown in morning brief |
| MEDIUM | **Prep checklist** | Track nursery, hospital bag, baby gear |
| MEDIUM | **Appointments** | OB visits, classes, etc. |
| LOW | Better web UI | Only if Winn uses it |

### Implementation

```bash
# Add to HEARTBEAT.md
- [ ] dadforge countdown → include in morning brief
- [ ] Check for upcoming appointments (2 days out)
```

---

## Sentinel Improvements

### Current State
- ✅ 8 specialized testing agents
- ✅ Playwright browser automation
- ✅ LiteLLM for provider-agnostic LLM
- ✅ JSON output for automation

### How Donny Will Use It

1. **Pre-Deploy QA**
   - Run before pushing any web app
   - Automated via GitHub Actions or local

2. **Security Audits**
   - Regular scans of running apps
   - Focus on auth, injection, data leaks

3. **Accessibility**
   - Ensure apps are usable by everyone
   - Important for grant-forge (public-facing)

### Improvements Needed

| Priority | Improvement | Why |
|----------|-------------|-----|
| HIGH | **CLI wrapper in tools/** | Quick `sentinel-scan URL` |
| HIGH | **Cost tracking** | Know what each scan costs |
| MEDIUM | **Integration tests** | Test our specific apps |
| MEDIUM | **Finding templates** | Pre-made checks for common issues |
| LOW | Slack/Discord alerts | Notify on critical findings |

### Implementation

```bash
# Create sentinel wrapper
~/clawd/tools/sentinel-scan dadforge  # Tests localhost:3008
~/clawd/tools/sentinel-scan grant-forge  # Tests localhost:3006
```

---

## Unified Workflow

### Morning Routine (Donny)
```
1. Check DadForge countdown → include in brief
2. Review any Sentinel alerts from overnight
3. Surface priorities for the day
```

### Before Any Deploy
```
1. Run Sentinel scan on staging
2. Review critical/high findings
3. Fix or document known issues
4. Deploy
```

### Weekly Review
```
1. DadForge: Review week's entries, update MEMORY.md
2. Sentinel: Aggregate findings across projects
3. Track progress toward baby prep
```

---

## Elite Co-Founder Setup

### What Makes Us Different

1. **AI-Native Everything**
   - CLIs over GUIs
   - Donny can operate autonomously
   - Programmatic access to all data

2. **Local-First**
   - No cloud dependencies for core tools
   - Data stays on our machines
   - Fast, private, reliable

3. **Composable Tools**
   - Each tool does one thing well
   - Combine via scripts/CLIs
   - Donny orchestrates

4. **Continuous Improvement**
   - Every tool gets better over time
   - Donny learns and adapts
   - Winn guides direction

### The Stack

```
Winn (Vision + Direction)
    ↓
Donny (Execution + Orchestration)
    ↓
┌─────────────────────────────────────┐
│ Tools Layer                         │
├─────────────────────────────────────┤
│ DadForge     - Life tracking        │
│ Sentinel     - QA testing           │
│ Grant Nexus  - Grant matching       │
│ Options      - Market analysis      │
│ ClawdChad    - Knowledge distill    │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│ Infrastructure                      │
├─────────────────────────────────────┤
│ Moltbot      - Agent runtime        │
│ Local LLMs   - Ollama (qwen, etc)   │
│ SQLite/JSON  - Local data           │
│ GitHub       - Code + collab        │
└─────────────────────────────────────┘
```

---

## Next Actions

1. [ ] Create `~/clawd/tools/dadforge-api` - REST wrapper for Donny
2. [ ] Create `~/clawd/tools/sentinel-scan` - Quick scan wrapper
3. [ ] Add DadForge to morning brief cron
4. [ ] Test Sentinel on DadForge
5. [ ] Document workflow in TOOLS.md

---

*This is how legends are built. One tool at a time. 🦾*
