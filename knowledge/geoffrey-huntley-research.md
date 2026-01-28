# Geoffrey Huntley (@GeoffreyHuntley) - Deep Dive Research

## Overview

**Geoffrey Huntley** is an Australian software engineer, AI thought leader, and current engineer at **Sourcegraph** building [Amp](https://ampcode.com) - a frontier coding agent. He was previously the **AI Developer Productivity Tech Lead at Canva**. He has 76K+ followers on X and has become one of the most influential voices on AI-powered software development in 2025-2026.

**Key thesis:** "Software development is dead. Software can now be developed cheaper than the wage of a burger flipper at McDonald's and it can be built autonomously whilst you are AFK."

**Website:** [ghuntley.com](https://ghuntley.com)
**GitHub:** [github.com/ghuntley](https://github.com/ghuntley)
**X:** [@GeoffreyHuntley](https://x.com/GeoffreyHuntley)

---

## Major Contributions & Projects

### 1. The Ralph Wiggum Pattern (⭐ Most Famous)
**Repo:** [how-to-ralph-wiggum](https://github.com/ghuntley/how-to-ralph-wiggum) (1.1k stars)

The Ralph Wiggum technique is **running an AI coding agent in a while loop** with a prompt file:

```bash
while :; do cat PROMPT.md | claude-code ; done
```

**Core philosophy:**
- Ralph is "deterministically bad in an undeterministic world"
- Requires faith in eventual consistency
- Each failure is a tuning opportunity - "like tuning a guitar"
- Can replace majority of outsourcing for greenfield projects
- Works with any tool that doesn't cap tool calls

**Key insight:** "It begins with no playground, and Ralph is given instructions to construct one. Ralph is very good at making playgrounds, but he comes home bruised because he fell off the slide, so one then tunes Ralph by adding a sign next to the slide saying 'SLIDE DOWN, DON'T JUMP, LOOK AROUND,' and Ralph is more likely to look and see the sign."

The pattern was featured in [VentureBeat: "How Ralph Wiggum went from 'The Simpsons' to the biggest name in AI right now"](https://venturebeat.com/technology/how-ralph-wiggum-went-from-the-simpsons-to-the-biggest-name-in-ai-right-now)

### 2. How to Build a Coding Agent Workshop
**Repo:** [how-to-build-a-coding-agent](https://github.com/ghuntley/how-to-build-a-coding-agent) (5k stars)

Free workshop teaching how to build a coding agent from scratch in ~300 lines of Go. The workshop progresses through:
1. Basic chat with Claude API
2. File reading tool
3. Directory listing
4. Shell command execution  
5. File editing
6. Code search (ripgrep)

**Key quote:** "Cursor, Windsurf, Claude Code, GitHub Copilot, and Amp are just a small number of lines of code running in a loop of LLM tokens. The model does all the heavy lifting."

### 3. Cursed Programming Language 💀
**Repo:** [ghuntley/cursed](https://github.com/ghuntley/cursed) (591 stars)
**Website:** [cursed-lang.org](https://cursed-lang.org)

A Gen-Z programming language created by **running Claude in a loop for 3 months**. Features:
- All keywords are Gen Z slang (`vibe` = package, `yeet` = import, `slay` = func, `sus` = var, `damn` = return)
- Compiles to binaries via LLVM (Mac, Linux, Windows)
- Uses `ඞ` (Amogus) as the pointer symbol
- Claude can program IN this language despite it not being in training data

Example:
```
slay main_character() {
    vibez.spill("Hello, World!")
}
```

### 4. The NFT Bay
**Repo:** [thenftbay.org](https://github.com/ghuntley/thenftbay.org) (339 stars)

Satirical project that archived all NFTs from Ethereum & Solana blockchains as a "torrent", pointing out that NFTs are just hyperlinks to images usually hosted on Google Drive. 

Quote from the project: *"People are dropping millions on instructions on how to download images... 'WTF? We destroyed our planet for THIS?!'"*

### 5. NoYAML
**Repo:** [noyaml](https://github.com/ghuntley/noyaml) (536 stars)
**Website:** noyaml.com

A "silly emotional rant about the state of devops tooling" from 2018. Shows his long history of provocative tech commentary.

### 6. Reactive Extensions for .NET (Rx.NET)
**Repo:** [dotnet/reactive](https://github.com/dotnet/reactive) (7.1k stars)

Huntley was a major contributor to Rx.NET, the Reactive Extensions for .NET - a library for event-driven programming with composable, declarative models. This established his credibility in the .NET ecosystem before his AI focus.

### 7. Loom (Work in Progress)
**Repo:** [ghuntley/loom](https://github.com/ghuntley/loom) (Private/Research)

An experimental "infrastructure for evolutionary software" - a Rust-based AI coding agent he's building. Described as targeting "Level 9" on the software automation scale: **"autonomous loops evolve products and optimise automatically for revenue generation"** - essentially a software factory.

---

## His Full Take on AI Agents

### Core Beliefs

1. **LLMs are programmable computers:** "The huge thing that software engineers don't realize right now is – they can program the LLMs"

2. **LLMs are mirrors of operator skill:** Success with AI reflects the skill of the person using it, not just the tool itself

3. **Deliberate practice is essential:** Like learning guitar, AI requires intentional practice - you can't try once, fail, and conclude it doesn't work

4. **The 7 stages of AI adoption:**
   - Detraction/cope/disbelief ("it's not good enough")
   - Experimental usage
   - Deer in headlights ("Will I have a job?")
   - Concern/alarm
   - Engaged, consuming AI (using Cursor)
   - Engaged, programming LLMs (building with them)
   - Matrix moment ("you can now do anything")

5. **Model specialization matters:** Not all LLMs are the same. He maps them to a quadrant:
   - High safety vs low safety
   - Oracle (thinking) vs Agentic (tool-calling)
   - Claude Sonnet = "small-brained mechanical squirrel" that chases tool calls
   - Different models for different tasks (Grok for security research, Sonnet for agents)

### Context Engineering Philosophy

**"The less you allocate, the better the outcomes."**

- Context windows should be treated like Commodore 64 memory - very limited
- Don't install excessive MCP servers - more tools = worse performance
- Clear context window after each activity
- Cursor caps MCP tools at 40 for good reason

### On the Future of Software Engineering

- **"Software development is dead - I killed it"**
- Within 2026, majority of software engineers won't be doing "artisanal hand-crafted commits"
- Companies that succeed with AI will be "model-weight-first" - working WITH LLM preferences rather than against them
- The interviewing process is "fundamentally broken" in the AI era
- Natural attrition will occur between those who invest in AI skills and those who don't

### The "Gas Town" Levels (Steve Yegge's framework Huntley references)

1. Zero/near-zero AI (maybe code completions)
2. Coding agent in IDE with permissions
3. Agent in IDE, YOLO mode
4. Wide agent fills screen
5. CLI, single agent, YOLO
6. CLI, multi-agent (3-5 parallel)
7. 10+ agents, hand-managed
8. Building your own orchestrator

Huntley is working at **Level 9**: evolutionary software that autonomously evolves and optimizes for revenue.

---

## Other Patterns & Concepts

### Forward Mode vs Reverse Mode Ralph
- **Forward mode:** Building autonomously, AFK
- **Reverse mode:** Clean rooming (reverse engineering/recreating)

### Model-Weight-First Companies
Companies that build WITH the grain of LLM training data rather than fighting it with extensive cursor rules and corporate dogma. These companies don't need as much context engineering.

### The Oracle Pattern
Used at Amp/Sourcegraph: Wire GPT (or other thinking model) as a tool INTO an agentic LLM (Sonnet) that can call it for guidance, planning, and checking work.

### Back Pressure for Agents
Setting up structure around agents to provide automated feedback on quality/correctness enables longer-horizon tasks. The feedback keeps agents aligned.

---

## About $ralph Token

**Note:** Despite the name association, I found **no evidence of a "$ralph" cryptocurrency token** associated with Geoffrey Huntley. The "Ralph" in his work refers purely to the **Ralph Wiggum coding pattern/technique** (running agents in loops), not a crypto token.

If there is a $ralph token in crypto spaces, it appears to be unrelated to or unauthorized by Huntley. His work is about software development methodology, not cryptocurrency.

---

## Network & People Worth Following

### Mentioned/Connected in His Work

1. **Anaïs Betts** (@anais.dev) - His mentor, now at Anthropic. Created Slack, GitHub Desktop app, software updater ecosystem. Quote she shared that influenced him: "what if you had *1000* AI coworkers that went ham on your entire issue backlog at once"

2. **Erik Meijer** - Computer science legend, someone Huntley "always listens to"

3. **Steve Yegge** (@steveyegge) - Sourcegraph, creator of "Gas Town" orchestrator and the 8 levels of AI dev evolution framework. Author of "Revenge of the Junior Developer"

4. **Sahil Lavingia** (@sikivu) - Gumroad founder, whose AI-first hiring practices Huntley cites as example of the shift

5. **David Fowler** (@davidfowl) - Microsoft/.NET architect who noted "If you're using AI only to 'do' and not 'learn', you are missing out"

6. **Jaana Dogan** (@rakyll) - Google engineer discussing corporate vs startup AI challenges

7. **Clayton Farr** - Original creator of the Ralph Wiggum playbook that Huntley forked

### Companies/Orgs

- **Sourcegraph/Amp** - Where he currently works
- **Canva** - Previous employer where he led AI developer productivity
- **Anthropic** - Multiple connections (Anaïs Betts works there)

---

## Talks & Workshops

1. **"The Six-Month Recap"** - Closing talk at Web Directions Melbourne, June 2025. Comprehensive synthesis of his AI transformation thesis.

2. **"How to Build a Coding Agent" Workshop** - Delivered at multiple conferences, available as open source

3. **YouTube Channel** - Started publishing videos to "send down ladders before the big bang happens"

---

## Key Blog Posts (Recommended Reading Order)

1. **[The future belongs to people who can just do things](https://ghuntley.com/dothings/)** - The manifesto
2. **[An "oh fuck" moment in time](https://ghuntley.com/oh-fuck/)** - His awakening
3. **[What do I mean by some software devs are "ngmi"?](https://ghuntley.com/ngmi/)** - The fruit company parable
4. **[Ralph Wiggum as a "software engineer"](https://ghuntley.com/ralph/)** - The pattern explained
5. **[How to build a coding agent](https://ghuntley.com/agent/)** - Workshop blog post
6. **[Everything is a Ralph loop](https://ghuntley.com/loop/)** - Advanced concepts
7. **[LLMs are mirrors of operator skill](https://ghuntley.com/mirrors/)** - Philosophy on skill
8. **[Claude Sonnet is a small-brained mechanical squirrel](https://ghuntley.com/cars/)** - Model specialization
9. **[Too many MCP servers on the dance floor](https://ghuntley.com/allocations/)** - Context engineering
10. **[LLM weights vs the papercuts of corporate](https://ghuntley.com/papercuts/)** - Model-weight-first concept

---

## Memorable Quotes

> "The most high-IQ thing is perhaps the most low-IQ thing: run an agent in a loop."

> "It's 300 lines of code running in a loop with LLM tokens. That's all it is."

> "Ya know that old saying ideas are cheap and execution is everything? Well it's being flipped on its head by AI. Execution is now cheap. All that matters now is brand, distribution, ideas and retaining people who get it."

> "If you're a high-agency person, there's never been a better time to be alive..."

> "I haven't written code by hand for nine months."

> "Software is now clay on the pottery wheel."

> "The first robot used to chase tennis balls. The first digital robot chases tool calls."

---

## Summary

Geoffrey Huntley is essentially the **"prophet of AI-powered software development"** - documenting and demonstrating what's possible when you treat LLMs as programmable computers rather than just chat assistants. His work spans:

- **Practical techniques** (Ralph Wiggum pattern, agent workshops)
- **Provocative demonstrations** (Cursed language, NFT Bay)
- **Philosophical frameworks** (mirrors of skill, model specialization)
- **Production tools** (Amp at Sourcegraph, Loom research project)

He's worth following because he's not just theorizing - he's actively building the future he describes, and documenting the journey with brutal honesty.

---

*Research compiled: January 2026*
