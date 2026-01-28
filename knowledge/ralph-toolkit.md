# Ralph Wiggum Loop - Pattern Reference

> "I'm helping!" - Ralph Wiggum

## Core Philosophy

Shift from **coding** to **orchestration**. Instead of writing code, define acceptance criteria. Let Claude iterate through tasks while you sleep.

## Why It Works

1. **Atomic Tasks** - Avoids context window limits by focusing on one small story at a time
2. **Verifiable Success** - Agent doesn't move on until changes pass specific tests
3. **Self-Correction** - Maintains "short-term memory" of mistakes to avoid repeating them

## Key Files (Memory System)

| File | Purpose | Lifecycle |
|------|---------|-----------|
| `prd.json` | Task list with pass/fail status | Source of truth |
| `AGENTS.md` | Long-term learnings | Persists across all sessions |
| `progress.txt` | Session learnings | Current session memory |
| `CLAUDE.md` | Permanent instructions | Toolkit-level |

## The 10-Step Loop

1. **PRD Generation** - Describe feature → AI generates PRD
2. **JSON Conversion** - PRD → `prd.json` with atomic user stories
3. **Initialize Script** - Run `ralph.sh` to start loop
4. **Task Selection** - Find first task where `passes: false`
5. **Implementation** - Write code in fresh context window
6. **Testing** - Check against acceptance criteria
7. **Commit** - Auto-commit passing code to Git
8. **Update JSON** - Mark task as `passes: true`
9. **Logging** - Write learnings to progress.txt / AGENTS.md
10. **Repeat** - Next task until feature ships

## Usage

```bash
# New project from scratch
ralph ~/ideas/my-app.md

# Add feature to existing project
cd ~/projects/my-app
ralph --here ~/ideas/new-feature.md

# Fully autonomous (no user input)
ralph --headless ~/ideas/my-app.md
```

## Best Practices

- **Spend 80% of time on PRD** - Vague instructions = wasted tokens
- **Make acceptance criteria verifiable** - Computer must be able to tell if done
- **Context management** - Keep stories small enough for token limit
- **Typical cost**: $3-30 for 10-14 iterations

## Local Installation

Located at: `/Users/clawdchad/repos/ralph-toolkit/`

```bash
# Add to PATH
export PATH="$HOME/repos/ralph-toolkit/scripts/ralph:$PATH"
```

## Platform Files

- `AGENTS.md` - Universal patterns
- `AGENTS.darwin.md` - macOS-specific gotchas  
- `AGENTS.linux.md` - Linux-specific gotchas
- `AGENTS.windows.md` - Windows-specific gotchas

## Critical Gotchas

1. **Never pipe to Claude CLI** - Breaks TTY/raw mode
2. **JSON in shell** - Always pipe via stdin, never inline
3. **Port conflicts** - Clean ports before starting dev servers

## Links

- Repo: https://github.com/snarktank/ralph
- Skills: https://github.com/snarktank/amp-skills
- AMP: https://ampcode.com/

## Tested: 2026-01-28

Built `molt-dash` CLI tool using the pattern. Observations:
- Fresh context approach worked well for small, focused tools
- progress.txt serves as effective session memory
- Atomic commits create clear history
- For small tools, direct implementation beat formal PRD
