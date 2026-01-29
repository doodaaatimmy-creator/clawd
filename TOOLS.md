# TOOLS.md - Local Notes

Skills define *how* tools work. This file is for *your* specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:
- Camera names and locations
- SSH hosts and aliases  
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras
- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH
- home-server → 192.168.1.100, user: admin

### TTS
- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

## Browser Relay (Chrome)

### Troubleshooting: "tab not found" errors

When browser actions fail with "tab not found" but `tabs` still lists them:
1. The CDP websocket connections are stale (tabs exist but aren't responding)
2. **Recovery steps:**
   - `close` action still works on stale tabs
   - Close all orphaned tabs
   - `open` a fresh tab to the target URL
   - Proceed with snapshot/act

**Don't:** Keep retrying the same broken connection
**Do:** Close stale tabs → open fresh → continue

This happens when Chrome tabs have been idle too long or the relay connection hiccupped.

---

## Local LLM Token Optimization Pattern

**Available Models:**
- `qwen3:4b` — Fast, good reasoning, 4B params (DEFAULT)
- `llama3.2` — Solid all-rounder, 3.2B params

**When to Use Local:**
| Task | Use Local | Use Claude |
|------|-----------|------------|
| Summarizing files/logs | ✅ | ❌ |
| Pattern detection | ✅ | ❌ |
| Initial brainstorming | ✅ | ❌ |
| Scoring/ranking | ✅ | ❌ |
| Data analysis | ✅ | ❌ |
| Draft generation | ✅ | ❌ |
| Strategic depth | ❌ | ✅ |
| Final delivery/decisions | ❌ | ✅ |
| Complex multi-step reasoning | ❌ | ✅ |

**Standard Pattern:**
```bash
# Pipe data → local analysis
cat file.md | ollama run qwen3:4b 'Your prompt here'

# Or with thinking (slower but better)
cat file.md | ollama run qwen3:4b --verbose 'Think step by step: ...'
```

**Cron Jobs Using Local LLM:**
- Daily self-assessment (11 PM)
- Evening ideation (8 PM)
- Options signal review (2:30 PM weekdays)
- Weekly self-review synthesis (Sun 8 AM)
- Monthly X account reassess (1st of month)

**Rule:** Local does the heavy lifting. Claude delivers the final product.

---

Add whatever helps you do your job. This is your cheat sheet.
