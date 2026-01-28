# Graphiti Analysis: Knowledge Graphs for AI Agents

**Research Date:** 2026-01-28
**Relevance:** Options Analyst memory/context management

---

## What is Graphiti?

**Repository:** [getzep/graphiti](https://github.com/getzep/graphiti)
**Creator:** Zep (getzep.com)
**License:** Open source (powers Zep's commercial platform)
**Paper:** [Zep: A Temporal Knowledge Graph Architecture for Agent Memory](https://arxiv.org/abs/2501.13956)

Graphiti is a **framework for building temporally-aware knowledge graphs** specifically designed for AI agents operating in dynamic environments. Unlike traditional RAG that relies on static document retrieval, Graphiti continuously integrates:

- User interactions
- Structured business data
- Unstructured enterprise data
- External information

...into a coherent, queryable graph that maintains **historical context and temporal awareness**.

---

## Core Concepts

### Knowledge Graph Basics

A knowledge graph represents facts as "triplets":
- **Two entities (nodes):** e.g., "Kendra", "Adidas shoes"
- **One relationship (edge):** e.g., "loves"
- **Result:** "Kendra loves Adidas shoes"

### What Makes Graphiti Unique

1. **Autonomous Graph Construction** — Builds the knowledge graph automatically from incoming data
2. **Temporal Awareness** — Tracks when facts were true, not just what's true now
3. **Bi-Temporal Model** — Distinguishes between:
   - When an event occurred
   - When it was ingested into the system
4. **Incremental Updates** — No need to rebuild the entire graph when new data arrives
5. **Contradiction Handling** — Temporal edge invalidation (not LLM-driven summarization)

---

## Architecture & How It Works

### Data Model

```
Episodes → Entities (Nodes) + Relationships (Edges) + Communities
```

**Episodes:** Units of data ingestion (conversations, JSON, documents)
- Text episodes (unstructured)
- JSON episodes (structured business data)

**Entities:** Custom-defined via Pydantic models
- Supports developer-defined entity types
- Automatic entity extraction from episodes

**Relationships:** Edges with temporal metadata
- Valid_from / valid_until timestamps
- Confidence scores
- Source attribution

### Retrieval Methods (Hybrid)

Graphiti combines multiple search strategies:

| Method | Purpose |
|--------|---------|
| **Semantic (embeddings)** | Meaning-based similarity |
| **Keyword (BM25)** | Exact term matching |
| **Graph traversal** | Relationship-based discovery |
| **Temporal queries** | Point-in-time accuracy |

**Result:** Sub-second latency (vs. GraphRAG's seconds-to-tens-of-seconds)

### Database Backends

- **Neo4j** (primary, recommended)
- **FalkorDB** (lightweight alternative)
- **Kuzu** (embedded option)
- **Amazon Neptune** (enterprise/AWS)

### LLM Providers

- OpenAI (default, best with structured outputs)
- Google Gemini
- Anthropic Claude
- Groq
- Azure OpenAI

---

## Graphiti vs. GraphRAG (Microsoft)

| Aspect | GraphRAG | Graphiti |
|--------|----------|----------|
| **Primary Use** | Static document summarization | Dynamic data management |
| **Data Handling** | Batch-oriented | Continuous incremental |
| **Knowledge Structure** | Entity clusters + community summaries | Episodes + semantic entities + temporal edges |
| **Retrieval** | Sequential LLM summarization | Hybrid semantic/keyword/graph |
| **Adaptability** | Low | High |
| **Temporal Handling** | Basic timestamps | Explicit bi-temporal tracking |
| **Contradiction Handling** | LLM summarization | Temporal edge invalidation |
| **Query Latency** | Seconds to tens of seconds | Sub-second |
| **Custom Entities** | No | Yes (Pydantic) |
| **Scalability** | Moderate | High (parallel processing) |

**Key Insight:** GraphRAG is for static document collections. Graphiti is for dynamic, evolving data.

---

## Graphiti vs. Mem0 Graph Memory

Both provide knowledge graph capabilities for AI agents, but with different approaches:

### Mem0 (with Graph Memory)

**Architecture:**
- Memory extraction from conversations → Vector DB + Graph backend
- Retrieval: Vector search narrows candidates, graph returns related context
- Graph backends: Neo4j, Kuzu, Neptune

**Strengths:**
- Simple API (`add`, `get`, `search`)
- Unified vector + graph approach
- User/session scoping built-in
- Lower complexity to get started

**Paper Results:**
- 26% improvement over OpenAI baseline
- Graph variant adds ~2% over base Mem0
- 91% lower latency vs. full-context

### Graphiti

**Architecture:**
- Episodes ingested → Temporally-aware knowledge graph
- Explicit bi-temporal modeling
- More sophisticated entity/relationship extraction
- Custom entity types via Pydantic

**Strengths:**
- Superior temporal reasoning
- Better at tracking how facts evolve over time
- More powerful for complex relational queries
- Designed for enterprise-scale data

**Paper Results (Zep):**
- 94.8% on DMR benchmark (vs. MemGPT's 93.4%)
- Up to 18.5% improvement on LongMemEval
- 90% latency reduction vs. full-context
- Excels at temporal reasoning tasks

### Comparison Summary

| Feature | Mem0 Graph | Graphiti |
|---------|------------|----------|
| **Complexity** | Lower | Higher |
| **Setup** | Simpler | More involved |
| **Temporal Modeling** | Basic | Advanced bi-temporal |
| **Custom Entities** | No | Yes (Pydantic) |
| **Query Latency** | Fast | Very fast |
| **Best For** | Conversation memory | Complex evolving data |
| **Scale** | Good | Enterprise-grade |
| **Commercial Option** | Mem0 Platform | Zep Platform |

---

## Integration Patterns

### MCP Server (Model Context Protocol)

Graphiti includes an MCP server for integration with:
- Claude
- Cursor
- Other MCP-compatible clients

**Capabilities:**
- Episode management (add/retrieve/delete)
- Entity/relationship handling
- Semantic and hybrid search
- Group management
- Graph maintenance

### REST API

FastAPI-based server for programmatic access.

### Python SDK

```python
from graphiti_core import Graphiti

# Initialize with Neo4j
graphiti = Graphiti(
    "bolt://localhost:7687",
    "neo4j",
    "password"
)

# Add episodes
await graphiti.add_episode(
    name="conversation_001",
    episode_body="User mentioned they trade AAPL options weekly",
    source_description="chat"
)

# Search
results = await graphiti.search("AAPL trading frequency")
```

### Custom Entity Definitions

```python
from pydantic import BaseModel

class OptionTrade(BaseModel):
    ticker: str
    strike: float
    expiry: str
    type: str  # call/put
    premium: float
    
class TradingStrategy(BaseModel):
    name: str
    risk_profile: str
    preferred_conditions: list[str]
```

---

## Options Analyst Application

### Potential Use Cases

1. **Trade History Tracking**
   - When positions were opened/closed
   - How strategies evolved over time
   - Relationship between market conditions and decisions

2. **Strategy Pattern Recognition**
   - "User tends to buy puts before earnings"
   - "User prefers iron condors in low IV environments"
   - Connect strategies to outcomes

3. **Market Condition Memory**
   - Track how user responded to different VIX levels
   - Remember what worked in specific market regimes
   - Link past decisions to current conditions

4. **Position Relationship Mapping**
   - Multi-leg spreads as related entities
   - Hedges connected to core positions
   - Roll history preserved

5. **Temporal Queries**
   - "What was my thesis on TSLA in March 2024?"
   - "How did I handle the last Fed meeting?"
   - Point-in-time portfolio reconstruction

### Architecture Sketch

```
Options Analyst
    │
    ├── Market Data Stream → Episodes (price, IV, events)
    │
    ├── User Conversations → Episodes (analysis, decisions)
    │
    └── Trade Executions → Episodes (structured JSON)
                              │
                              ▼
                    ┌─────────────────┐
                    │    Graphiti     │
                    │  Knowledge Graph │
                    └─────────────────┘
                              │
                              ▼
                    Entities: Tickers, Strategies, 
                              Trades, Market Events
                    
                    Relationships: "traded_during", 
                                  "hedged_with",
                                  "based_on_analysis"
```

### Custom Entities for Options

```python
class OptionContract(BaseModel):
    ticker: str
    strike: float
    expiry: date
    option_type: Literal["call", "put"]
    
class StrategyExecution(BaseModel):
    strategy_name: str
    legs: list[OptionContract]
    thesis: str
    market_conditions: dict
    
class MarketEvent(BaseModel):
    event_type: str  # earnings, fed, economic_data
    date: date
    expected_impact: str
    actual_impact: str
```

---

## Recommendations

### When to Use Graphiti

✅ **Good fit:**
- Complex relational data (multi-leg options, linked positions)
- Need to answer "what was true at time X?"
- Enterprise-scale data volumes
- Custom entity types required
- Sub-second query latency critical

❌ **Probably overkill:**
- Simple conversation memory
- Mostly static reference data
- Limited development resources
- Small data volumes

### For Options Analyst Specifically

**Recommendation:** **Start with Mem0 Graph, evaluate Graphiti for Phase 2**

**Rationale:**
1. Mem0 is simpler to integrate initially
2. Options Analyst needs basic conversation + trade memory first
3. Once patterns emerge, evaluate if temporal complexity warrants Graphiti
4. The trading domain does benefit from temporal awareness (Graphiti's strength)

**Migration Path:**
1. Phase 1: Mem0 with graph memory for conversation context
2. Phase 2: Evaluate if trade history tracking needs Graphiti's temporal model
3. Phase 3: Custom entity definitions for options-specific knowledge

### Resources

- **Graphiti Repo:** https://github.com/getzep/graphiti
- **Zep Paper:** https://arxiv.org/abs/2501.13956
- **Mem0 Paper:** https://arxiv.org/abs/2504.19413
- **Mem0 Graph Docs:** https://docs.mem0.ai/open-source/features/graph-memory

---

## Summary

Graphiti represents the state-of-the-art in temporal knowledge graphs for AI agents. Its key differentiators are:

1. **Bi-temporal modeling** — knows when things were true AND when it learned them
2. **Incremental updates** — no full recomputation needed
3. **Hybrid retrieval** — combines semantic, keyword, and graph search
4. **Custom entities** — Pydantic-based domain modeling
5. **Sub-second latency** — production-ready performance

For Options Analyst, this could enable sophisticated memory of trade decisions, market conditions, and strategy evolution over time. The temporal awareness is particularly valuable for answering "why did I do X back then?" questions.

**Bottom Line:** Graphiti is more powerful than Mem0's graph option, but also more complex. Choose based on whether you need advanced temporal reasoning and custom entity types.
