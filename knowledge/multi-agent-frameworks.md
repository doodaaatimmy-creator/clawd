# Multi-Agent Frameworks: CrewAI vs LangGraph

*Research Date: January 2026*

## Executive Summary

The multi-agent space has consolidated around two major frameworks:
- **CrewAI**: High-level, role-based agent orchestration with "crews" of autonomous agents
- **LangGraph**: Low-level, graph-based state machine for precise workflow control

**Moltbot's sub-agent pattern** sits somewhere in between—lighter than both but with characteristics of each.

---

## 1. CrewAI Architecture

### Core Philosophy
CrewAI is built around the metaphor of a **"crew"**—a team of specialized agents that collaborate to complete tasks. It emphasizes:
- **Role-based design**: Agents have roles, goals, and backstories
- **Natural delegation**: Agents can delegate to each other
- **Autonomous collaboration**: Minimal explicit control flow

### Key Abstractions

```
Crew
├── Agent (role, goal, backstory, tools)
│   └── Can delegate to other agents
├── Task (description, expected_output, agent)
│   └── Context from other tasks
└── Process (sequential | hierarchical)
```

#### Agent Attributes
| Attribute | Purpose |
|-----------|---------|
| `role` | Defines expertise (e.g., "Senior Data Researcher") |
| `goal` | Individual objective guiding decisions |
| `backstory` | Context/personality for richer interactions |
| `tools` | Capabilities available to agent |
| `allow_delegation` | Whether agent can delegate |
| `reasoning` | Enable reflection/planning before execution |
| `memory` | Maintain conversation history |

#### Task Flow
- **Sequential**: Tasks execute in order
- **Hierarchical**: Manager agent assigns tasks based on expertise
- **Context passing**: Tasks receive output from previous tasks

### Flows (New in 2025)
CrewAI added **Flows** for event-driven orchestration:
```python
from crewai.flow.flow import Flow, listen, start

class MyFlow(Flow):
    @start()
    def first_step(self):
        return "city: Tokyo"
    
    @listen(first_step)
    def second_step(self, input):
        return f"Fun fact about {input}"
```

- **`@start()`**: Entry point
- **`@listen(method)`**: Triggered when method completes
- **State management**: Structured (Pydantic) or unstructured (dict)
- **Persistence**: `@persist` decorator for durable state

### Strengths
- ✅ Easy to reason about (role-playing metaphor)
- ✅ Quick to prototype multi-agent systems
- ✅ Built-in memory, delegation, context management
- ✅ YAML configuration for maintainability
- ✅ No LangChain dependency (standalone since 2024)

### Weaknesses
- ❌ Less control over exact execution flow
- ❌ Can be "magic" - hard to debug
- ❌ Role-based design doesn't fit all problems
- ❌ Overhead for simple tasks

---

## 2. LangGraph Architecture

### Core Philosophy
LangGraph is a **low-level orchestration framework** inspired by:
- **Pregel** (Google's graph processing)
- **Apache Beam** (stream processing)
- **NetworkX** (graph API)

It provides **graphs as first-class primitives** for building stateful agents.

### Key Abstractions

```
StateGraph
├── State (TypedDict with reducers)
├── Nodes (functions that transform state)
├── Edges (connections between nodes)
│   ├── Regular edges (always follow)
│   └── Conditional edges (branching logic)
└── Checkpointer (persistence layer)
```

#### Graph API
```python
from langgraph.graph import StateGraph, START, END

class State(TypedDict):
    messages: list
    step_count: int

def node_a(state: State) -> dict:
    return {"step_count": state["step_count"] + 1}

graph = StateGraph(State)
graph.add_node("node_a", node_a)
graph.add_edge(START, "node_a")
graph.add_conditional_edges("node_a", should_continue, ["node_b", END])
graph.compile()
```

#### Functional API (Alternative)
```python
from langgraph.func import entrypoint, task

@task
def call_llm(messages):
    return model.invoke(messages)

@entrypoint()
def agent(messages):
    while True:
        response = call_llm(messages).result()
        if not response.tool_calls:
            break
        # Process tools...
    return messages
```

### Core Features

#### Durable Execution
- **Checkpointing**: Save state at key points
- **Resume from failures**: Pick up exactly where stopped
- **Three durability modes**: "exit" (fast), "async" (balanced), "sync" (safest)

#### Human-in-the-Loop
- **`interrupt()`**: Pause workflow for human review
- **`Command`**: Resume with modified state
- State inspection at any point

#### Memory
- Short-term: Working memory during execution
- Long-term: Persistent memory across sessions

### Strengths
- ✅ Precise control over execution flow
- ✅ Explicit state management
- ✅ Production-ready (used by Klarna, Replit, Elastic)
- ✅ Excellent debugging with LangSmith
- ✅ Durable execution for long-running workflows
- ✅ Graph visualization

### Weaknesses
- ❌ Steeper learning curve
- ❌ More boilerplate for simple agents
- ❌ LangChain ecosystem coupling (though usable standalone)
- ❌ State machine mental model not intuitive for everyone

---

## 3. Head-to-Head Comparison

| Dimension | CrewAI | LangGraph |
|-----------|--------|-----------|
| **Abstraction Level** | High (roles, crews) | Low (graphs, nodes) |
| **Mental Model** | Team collaboration | State machine |
| **Learning Curve** | Gentle | Steep |
| **Control Precision** | Medium | High |
| **Best For** | Autonomous multi-agent tasks | Complex workflow orchestration |
| **Debugging** | Verbose logs, callbacks | LangSmith traces, graph viz |
| **Persistence** | Flow @persist decorator | Built-in checkpointing |
| **Human-in-Loop** | Task `human_input` flag | interrupt() + Command |
| **Standalone** | Yes (no deps) | Usable without LangChain |
| **Production** | Cloud offering | LangSmith deployment |

### Use Case Fit

| Scenario | Winner | Why |
|----------|--------|-----|
| Research + Report generation | CrewAI | Natural division into researcher/writer roles |
| Complex approval workflows | LangGraph | Explicit branching, human-in-loop |
| Customer support agents | CrewAI | Role-based delegation |
| Financial transaction processing | LangGraph | Durable execution, state guarantees |
| Quick prototypes | CrewAI | Less boilerplate |
| Enterprise production | LangGraph | Better observability, durability |
| Multi-step tool use | Both | Both handle well |

---

## 4. How Moltbot's Sub-Agent Pattern Compares

### Current Moltbot Design
```
Main Agent
└── Subagent (spawned for specific task)
    ├── Isolated session
    ├── Task-specific context
    ├── Reports back on completion
    └── Can be terminated after
```

### Comparison Matrix

| Feature | CrewAI | LangGraph | Moltbot |
|---------|--------|-----------|---------|
| Agent definition | Declarative (role/goal) | Functional (nodes) | Prompt-based |
| Communication | Tool calls, delegation | State updates | File I/O, message tool |
| Orchestration | Crew process | Graph edges | Manual spawning |
| State management | Flow state, memory | StateGraph, checkpoints | File system |
| Persistence | @persist decorator | Checkpointer backends | File-based |
| Parallelism | Async tasks | Parallel nodes | Background sessions |

### What Moltbot Does Well
1. **Simplicity**: No framework overhead, just spawn a session
2. **Flexibility**: Full Claude capabilities in each sub-agent
3. **Isolation**: Clean separation between agents
4. **Tool sharing**: Same tools available to all agents

### What Moltbot Could Learn

#### From CrewAI
- **Role/Goal abstraction**: Instead of raw prompts, define agents with roles
- **Context passing**: Structured way to pass results between agents
- **Memory layer**: Shared memory across sub-agents
- **Delegation**: Agents requesting help from other agents

#### From LangGraph
- **Explicit state**: TypedDict-style state definitions
- **Checkpointing**: Save/resume long-running workflows
- **Conditional routing**: Based on agent output
- **Graph visualization**: See agent interaction patterns

---

## 5. Recommendations for Moltbot

### Keep What Works
- ✅ Lightweight spawning (no framework bloat)
- ✅ Full Claude capabilities in sub-agents
- ✅ File-based communication (simple, debuggable)

### Consider Adding

#### Near-term (Low effort, high value)
1. **Structured task definitions**: 
   ```python
   spawn_subagent(
       task="Research multi-agent frameworks",
       expected_output="Markdown report",
       context={"related_files": [...]}
   )
   ```

2. **Output contracts**: 
   - Define expected output format
   - Validate before reporting back

3. **Simple state passing**:
   - JSON blob for inter-agent context
   - Persistent task metadata

#### Medium-term (If patterns emerge)
1. **Agent templates**: Pre-defined roles (researcher, writer, coder)
2. **Workflow DSL**: Simple way to chain agents
3. **Checkpoint/resume**: For long-running tasks

#### Probably Skip
- Full graph-based orchestration (overkill)
- Complex delegation hierarchies (adds confusion)
- Tight framework coupling (reduces flexibility)

---

## 6. Community Sentiment (2025-2026)

### CrewAI
- **Stars**: 25k+ on GitHub
- **100k+ certified developers** through courses
- **Growing enterprise adoption** via AMP Suite
- **Criticism**: "Too magical", "Hard to debug complex scenarios"
- **Praise**: "Quick to prototype", "Great for autonomous tasks"

### LangGraph
- **Stars**: 10k+ on GitHub
- **Enterprise customers**: Klarna, Replit, Elastic
- **Criticism**: "Steep learning curve", "LangChain ecosystem lock-in"
- **Praise**: "Production-ready", "Excellent observability"

### General Trend
- Multi-agent hype has cooled from 2024 peak
- **Focus shifting**: From "more agents" to "better orchestration"
- **Production reality**: Most real use cases need 1-3 agents, not swarms

---

## 7. Code Examples

### CrewAI: Research + Report
```python
from crewai import Agent, Task, Crew, Process

researcher = Agent(
    role="Senior Researcher",
    goal="Find accurate information about {topic}",
    backstory="Expert researcher with academic rigor",
    tools=[search_tool, wiki_tool]
)

writer = Agent(
    role="Technical Writer",
    goal="Write clear, comprehensive reports",
    backstory="Technical writer with 10 years experience"
)

research_task = Task(
    description="Research {topic} thoroughly",
    expected_output="Key findings as bullet points",
    agent=researcher
)

report_task = Task(
    description="Write comprehensive report from research",
    expected_output="Markdown report with sections",
    agent=writer,
    context=[research_task]  # Gets research output
)

crew = Crew(
    agents=[researcher, writer],
    tasks=[research_task, report_task],
    process=Process.sequential
)

result = crew.kickoff(inputs={"topic": "Multi-agent AI"})
```

### LangGraph: Tool-Calling Agent
```python
from langgraph.graph import StateGraph, START, END

class State(TypedDict):
    messages: list
    tool_results: list

def call_model(state):
    response = model.invoke(state["messages"])
    return {"messages": [response]}

def call_tools(state):
    last_msg = state["messages"][-1]
    results = [tool.invoke(call) for call in last_msg.tool_calls]
    return {"tool_results": results, "messages": results}

def should_continue(state):
    return "tools" if state["messages"][-1].tool_calls else END

graph = StateGraph(State)
graph.add_node("model", call_model)
graph.add_node("tools", call_tools)
graph.add_edge(START, "model")
graph.add_conditional_edges("model", should_continue, ["tools", END])
graph.add_edge("tools", "model")

agent = graph.compile(checkpointer=InMemorySaver())
```

### Moltbot: Current Pattern
```python
# In AGENTS.md or spawning logic
spawn_subagent(
    label="research-task",
    prompt="""
    ## Subagent Context
    You were created to: Research multi-agent frameworks
    Complete this task. Your final message reports to main agent.
    
    ## Output
    Write findings to: /path/to/output.md
    """
)
```

---

## 8. Key Takeaways

1. **CrewAI** = "Give agents roles and let them figure it out"
2. **LangGraph** = "Define exactly how agents interact"
3. **Moltbot** = "Spawn helpers when needed, minimal ceremony"

### The Right Choice Depends On:
- **Autonomy needs**: High → CrewAI, Low → LangGraph
- **Control needs**: High → LangGraph, Medium → Both, Low → Moltbot
- **Production requirements**: Durable → LangGraph, Prototype → CrewAI
- **Team familiarity**: Graphs → LangGraph, Roles → CrewAI

### For Moltbot Specifically
The current sub-agent pattern is **actually quite good** for the use case:
- Personal assistant context
- Varied task types  
- No complex multi-agent coordination needed

**Recommendation**: Add light structure (task definitions, output contracts) without adopting full framework complexity. Let the pattern grow organically based on real usage.

---

## Sources
- https://docs.crewai.com
- https://docs.langchain.com/oss/python/langgraph
- https://github.com/crewAIInc/crewAI
- https://github.com/langchain-ai/langgraph
