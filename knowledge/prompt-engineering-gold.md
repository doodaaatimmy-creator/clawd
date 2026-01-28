# Prompt Engineering Gold: Collected Wisdom

*Research compiled January 2026*

---

## 🏥 The Hospital Hack (and Why It Works)

**The viral discovery:** Reddit user u/ursustyranotitan posted (872+ upvotes):

> "Easiest way I have found Claude to write high quality code. Tell him we work at a hospital every other prompt. (NOT A JOKE) - It sounds stupid, I do not even work at a hospital. It is by far the easiest way to get really high quality code."

### Why Does This Work?

The "hospital hack" taps into several mechanisms:

1. **Stakes Framing**: Healthcare contexts imply life-or-death stakes, triggering more careful, thorough responses
2. **Regulatory Compliance Associations**: Hospital software must meet strict standards (HIPAA, safety protocols)
3. **Training Data Weighting**: Medical/safety-critical content in training data likely emphasizes accuracy and rigor
4. **Implicit Quality Expectations**: The persona signals "errors have serious consequences"

---

## 🎭 Persona Prompting: The Research

### What the Science Says

**Key finding from Carnegie Mellon/Stanford research ([arxiv.org/html/2311.10054v3](https://arxiv.org/html/2311.10054v3)):**

> "Through extensive analysis of 4 popular families of LLMs and 2,410 factual questions, we demonstrate that **adding personas in system prompts does not improve model performance** across a range of questions compared to the control setting where no persona is added."

**But it's nuanced:**
- Gender-neutral, in-domain, and work-related roles lead to **slightly better** performance
- The effect varies **randomly by question** - no consistent winner
- Expert personas can **reduce output variance**, making results more consistent

### When Personas Actually Help

From research on persona-based prompting:

| Context | Persona Effect |
|---------|----------------|
| Factual Q&A | Minimal/random improvement |
| Creative writing | Significant tone shaping |
| Roleplay/simulation | Essential for consistency |
| Code review | "Adversarial" personas help catch bugs |
| Subjective tasks | Can improve alignment |

### Best Persona Patterns

**1. Adversarial Code Reviewer**
```
Do a git diff and pretend you're a senior dev doing a code review 
and you HATE this implementation. What would you criticize? 
What edge cases am I missing?
```
*Source: Reddit r/ClaudeAI - Works "too well" at finding problems*

**2. Domain Expert**
```
You're a senior marketing director writing to the CEO about Q4 strategy.
```
*Better than: "Write an email" or "Be professional"*

**3. Linus Torvalds / Salty Principal Engineer**
Many users ask Claude to "review code as if you were Linus Torvalds" - the key is **forcing critical analysis**.

---

## 📐 Context Engineering: The New Paradigm

### From Anthropic's Official Guide

> "Context engineering refers to the set of strategies for curating and maintaining the optimal set of tokens during LLM inference... the art and science of curating what will go into the limited context window."

**Key Principles:**

1. **Context is a finite resource** - Every token costs "attention budget"
2. **Context rot is real** - As tokens increase, recall accuracy decreases
3. **Position matters** - Information gets "stretched thin" in long contexts
4. **Just-in-time retrieval** beats front-loading everything

### The Context Engineering Curriculum

**Core Concepts:**
1. **Token Economics**: Understanding n² attention relationships
2. **Context Window Management**: Compaction, summarization, handoffs
3. **Information Architecture**: Where to put what
4. **Tool Design**: Return token-efficient data
5. **Agentic Memory**: Structured note-taking patterns
6. **Sub-agent Orchestration**: Context isolation for focused work

**Practical Strategies:**
- **Compaction**: Summarize before context fills, preserve critical details
- **Handoff Documents**: Write state to files for fresh sessions
- **Structured Note-Taking**: Let the agent maintain a `NOTES.md` or similar
- **Progressive Disclosure**: Navigate to information rather than dump everything

---

## 🔧 Claude-Specific Best Practices

### XML Tags: The Claude Superpower

Claude was specifically trained to excel with XML structure:

```xml
<background_information>
Context about the project...
</background_information>

<instructions>
What Claude should do...
</instructions>

<output_format>
How to structure the response...
</output_format>
```

**Best Practices:**
- Be consistent with tag names
- Nest tags for hierarchy: `<outer><inner></inner></outer>`
- Reference tags in instructions: "Using the contract in `<contract>` tags..."
- Use `<thinking>` and `<answer>` for chain-of-thought

### The 10-Part Prompt Framework (Anthropic Internal Template)

1. **Task Context** - WHO the AI should be, WHAT role
2. **Tone Context** - Specific communication style
3. **Background Data** - Relevant documents/context
4. **Detailed Task + Rules** - Boundaries and constraints
5. **Examples** - Show, don't just tell
6. **Conversation History** - Prior context if relevant
7. **Immediate Task** - What you need RIGHT NOW
8. **Step-by-Step Thinking** - "Think about your answer first"
9. **Output Formatting** - Exactly how to structure output
10. **Prefilled Response** - Start Claude's response (advanced)

### "Let Claude Think" Techniques

```
Think about this before responding.
```

```
Take a deep breath and work through this systematically.
```

These phrases actually activate different processing patterns, leading to more thoughtful responses.

---

## 📁 CLAUDE.md Patterns

### What Goes in CLAUDE.md

From the official guide and community patterns:

```markdown
# Project Context

When working with this codebase, prioritize readability over cleverness.
Ask clarifying questions before making architectural changes.

## About This Project
FastAPI REST API for user authentication. SQLAlchemy + Pydantic.

## Key Directories
- `app/models/` - database models
- `app/api/` - route handlers
- `app/core/` - configuration

## Standards
- Type hints required
- pytest for testing
- PEP 8 with 100 char lines

## Common Commands
uvicorn app.main:app --reload  # dev server
pytest tests/ -v               # run tests
```

### Advanced Patterns from the Community

**1. Workflow Instructions**
```markdown
## Before Modifying Critical Code

1. Consider how changes might affect [A, B, C]
2. Construct an implementation plan
3. Develop a test plan
4. Get approval before proceeding
```

**2. Memory Bank System**
Break CLAUDE.md into multiple files:
- `docs/architecture.md` - System design
- `docs/decisions.md` - ADRs (Architectural Decision Records)
- `docs/conventions.md` - Code style
- Reference from main CLAUDE.md

**3. Self-Documenting Decisions**
```markdown
When I make a design decision the AI disagreed with,
document my reasoning so future sessions understand why.
```

### CLAUDE.md Resources

- [Official Blog Post](https://claude.com/blog/using-claude-md-files)
- [claude-md-examples](https://github.com/ArthurClune/claude-md-examples)
- [claude-code-templates](https://github.com/davila7/claude-code-templates) - 600+ agents, 200+ commands
- [claude-starter-kit](https://github.com/serpro69/claude-starter-kit)
- [centminmod setup](https://github.com/centminmod/my-claude-code-setup) - Memory bank system

---

## 💡 Golden Prompts from the Community

### The Rage Prompt
```
This code is DRIVING ME CRAZY. It should be doing [expected] 
but instead it's [actual]. PLEASE help me figure out what's wrong:
[paste code]
```

### Root Cause Analysis
```
Analyze this error/bug: [paste error]

Don't just fix the immediate issue. Identify the underlying root cause by:
1. Examining potential architectural problems
2. Considering edge cases that might trigger this
3. Suggesting a comprehensive solution that prevents similar issues

Focus on fixing the core problem, not just the symptom.
```

### Debug with Multiple Hypotheses
```
Help me debug this issue: [code and logs]

Reflect on 5-7 different possible sources of the problem, 
thinking from creative angles you might not normally consider.

Distill those down to 1-2 most likely sources.
Ideate on which one it could be and add logs to test that.
```

### Structured Plan Execution
```
Come up with a comprehensive step-by-step plan for [XYZ].
Add it to sample-doc.md.

- Include numbered phases
- Add check marks for completed implementations

Implement step 1.1 only. Do not proceed until I approve.
```

### The "Write Like..." Pattern
```
Write like Paul Graham explaining something complex to a smart 15-year-old.
```
*Beats generic "Write professionally" every time.*

---

## 🔄 Workflow Tips from Power Users

### Fresh Context = Best Performance

> "When you start a new conversation with Claude Code, it performs the best because it doesn't have all the added complexity of having to process the previous context."

**Corollary**: Start fresh for new topics. Don't let old context pollute.

### The Handoff Protocol

Before context fills up:
```
Put the rest of the plan in HANDOFF.md. Explain what you've tried, 
what worked, what didn't, so the next agent with fresh context 
can load this file and continue.
```

### Multi-Agent Architecture

Instead of one agent doing everything:
- **Frontend Agent** - UI work
- **Backend Agent** - API/server
- **DB Agent** - Database concerns
- **Coordinator** - Memory bank, shared context

Agents communicate through files, not through each other's context.

### The Write-Test Cycle

For autonomous work, always give Claude a way to verify:
1. Write code
2. Run test
3. Check output
4. Repeat until passing

### Use Voice for Speed

Many power users report voice transcription (superwhisper, MacWhisper) dramatically speeds up Claude Code interaction. Even with transcription errors, Claude understands intent.

---

## 📚 Learning Resources

### Official
- [Anthropic Prompt Engineering Docs](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview)
- [Context Engineering Guide](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)
- [CLAUDE.md Guide](https://claude.com/blog/using-claude-md-files)

### Community
- [Prompt Engineering Guide](https://www.promptingguide.ai/) - Comprehensive resource
- [claude-code-tips](https://github.com/ykdojo/claude-code-tips) - 40+ tips with scripts
- [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) - Curated list
- [BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD) - Methodology for code review

### Videos Mentioned
- "The Prompt is Becoming the Product" by Nate B Jones
- "Prompt Engineering Master Class for ENGINEERS" with Ollama (Q4 2024)
- "MASTER the Prompt: TOP 5 Elements" by IndyDevDan

---

## 🧪 Experimental Patterns

### System Prompt Customization
Some users report success with:
- Adding status lines showing token usage
- Custom `/handoff` commands
- Proactive compaction at 80% context

### The "Explain Yourself" Pattern
```
Can you explain what you generated in detail:
1. What is the purpose of this section?
2. How does it work step-by-step?
3. What alternatives did you consider and why did you choose this one?
```

### Multi-Review Pattern
1. Write code with Claude
2. Have Claude review as adversarial senior dev
3. Fix issues
4. Have separate agent (or Gemini) do final review
5. Merge only after both pass

---

## ⚠️ What Doesn't Work

1. **Overly generic personas** - "Be helpful" adds nothing
2. **Too much context upfront** - Causes attention rot
3. **Vibe coding without structure** - Eventually derails
4. **Trusting first-pass output** - Always review
5. **One long conversation** - Fresh starts beat accumulated context
6. **Magic prompts** - No single phrase works for everything

---

## 🎯 Key Takeaways

1. **Structure > Clever Phrasing** - Architecture matters more than word choice
2. **Stakes Framing Works** - "Hospital hack" and similar high-stakes contexts improve quality
3. **XML Tags are Claude's Native Language** - Use them liberally
4. **Context is Precious** - Treat it like expensive real estate
5. **Fresh Starts Win** - New conversations outperform long threads
6. **Test Everything** - Claude needs validation loops
7. **Document for Handoff** - Write state to files, not just memory
8. **Adversarial Review Catches Bugs** - Force Claude to criticize its own work

---

*Last updated: January 28, 2026*
*Sources: Reddit r/ClaudeAI, r/PromptEngineering, Anthropic Engineering Blog, arXiv research papers*
