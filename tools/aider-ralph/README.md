# ralph - AI Coding Loop

Seamless autonomous coding using local LLM (qwen2.5-coder).

Inspired by the [Ralph Wiggum Loop](https://github.com/snarktank/ralph) pattern.

## What It Does

1. **Ask** - You describe what you want to build
2. **Clarify** - AI asks follow-up questions to nail the spec
3. **Plan** - Generates atomic, verifiable tasks
4. **Build** - Loops through tasks with aider until complete
5. **Ship** - Each task is auto-committed on success

## Requirements

```bash
# Local LLM
brew install ollama
ollama pull qwen2.5-coder:14b

# Aider
pip install aider-chat

# Utils
brew install jq
```

## Usage

```bash
# Add to PATH
export PATH="$HOME/clawd/tools/aider-ralph:$PATH"

# Interactive - just run ralph
ralph

# With description
ralph "build a CLI tool that converts markdown to HTML"

# Add feature to existing project
cd my-project
ralph --here "add dark mode support"

# Resume interrupted session
ralph --resume

# Check status
ralph --status
```

## How It Works

### Phase 1: Discovery
```
What do you want to build?
> A CLI tool that fetches weather data and displays it beautifully
```

### Phase 2: Clarification
```
Quick questions to nail down the spec:

1. What weather API should it use (OpenWeatherMap, wttr.in, etc.)?
> wttr.in - no API key needed

2. What output format (plain text, colored terminal, JSON)?
> colored terminal output with ASCII art

3. Should it support multiple locations?
> yes, default to current location via IP
```

### Phase 3: Task Generation
```
Generated 8 tasks:

  [T001] Initialize project structure
  [T002] Create weather API client
  [T003] Implement location detection
  [T004] Build output formatter
  [T005] Add CLI argument parsing
  [T006] Implement caching layer
  [T007] Add error handling
  [T008] Final integration test
```

### Phase 4: Execution Loop
Each task runs in a fresh aider context with:
- Clear acceptance criteria
- Access to progress.txt (learnings from prior tasks)
- Auto-commit on success
- Failure recovery options

## Files Created

```
my-project/
├── .ralph/
│   ├── prd.json          # Task spec with pass/fail status
│   └── progress.txt      # Learnings across iterations
├── AGENTS.md             # Project knowledge base
└── ... (your code)
```

## Key Principles

From the Wiggum Loop pattern:

1. **Atomic Tasks** - Each task completable in one context window
2. **Verifiable** - Clear acceptance criteria, testable outcomes
3. **Fresh Context** - Each iteration starts clean (prevents degradation)
4. **Memory via Files** - progress.txt carries learnings forward
5. **Auto-Commit** - Passing work is preserved immediately

## Configuration

Global aider config at `~/.aider.conf.yml`:
- Model: ollama_chat/qwen2.5-coder:14b
- 32K context window
- Auto-commits enabled
- Repo mapping for codebase awareness

## Tips

- **Be specific** in your initial description
- **Answer the questions** - they improve the spec significantly
- **Review the tasks** before starting - tweak .ralph/prd.json if needed
- **Use --resume** if interrupted - picks up where you left off
- **Check AGENTS.md** after completion for documented patterns

## Limitations

- Local 14B model is good but not Claude-level
- Complex multi-file refactors may need manual guidance
- UI/frontend tasks harder to verify automatically
- Best for CLI tools, APIs, data pipelines

## License

MIT
