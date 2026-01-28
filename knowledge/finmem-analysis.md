# FinMem: Memory-Enhanced LLM Trading Agent Analysis

**Date:** 2026-01-28
**Status:** Research Complete
**Relevance:** High potential for Options Analyst integration

---

## 1. What is FinMem?

FinMem is a **Performance-Enhanced LLM Trading Agent with Layered Memory and Character Design**, developed by researchers from Stevens Institute of Technology and published in 2023.

### Key Publications
- **ArXiv:** [2311.13743](https://arxiv.org/abs/2311.13743) (November 2023)
- **GitHub:** [pipiku915/FinMem-LLM-StockTrading](https://github.com/pipiku915/FinMem-LLM-StockTrading)
- **Recognition:**
  - AAAI Spring Symposium on Human-Like Learning (Extended Abstract)
  - ICLR Workshop LLM Agents (March 2024)
  - IJCAI 2024 FinLLM Challenge participant (Task 3: Single Stock Trading)
  - Published in IEEE Journals (2025)

### Authors
Yangyang Yu, Haohang Li, Zhi Chen, Yuechen Jiang, Yang Li, Denghui Zhang, Rong Liu, Jordan W. Suchow, Khaldoun Khashanah

---

## 2. How Memory Helps Trading Decisions

The core insight is that **human traders don't process all information equally** — they have layered cognitive processes that prioritize critical information while letting less relevant data fade.

### Memory Architecture Benefits

1. **Temporal Hierarchy**
   - Working memory: Recent, immediate information
   - Short-term memory: Recent days/weeks of events
   - Long-term memory: Significant historical patterns

2. **Information Prioritization**
   - Access counter tracks how often memories are retrieved
   - Frequently accessed memories "ascend" to deeper layers
   - Infrequently accessed memories "decay" and are forgotten
   - Mimics human cognitive processes

3. **Context Retention**
   - Maintains critical market context beyond token limits
   - Preserves learnings from previous market conditions
   - Enables pattern recognition across time scales

4. **Self-Evolution**
   - Agent refines its knowledge through experience
   - Memory allows learning from past mistakes
   - Trading decisions improve over time

### Cognitive Span Tuning
- Adjustable "perceptual spans" for different market conditions
- Can retain information beyond human cognitive limits
- Tunable for different trading styles (short-term vs. long-term)

---

## 3. Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                          FINMEM FRAMEWORK                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐   ┌──────────────────┐   ┌─────────────────┐ │
│  │  PROFILING   │   │      MEMORY      │   │ DECISION-MAKING │ │
│  │   MODULE     │   │      MODULE      │   │     MODULE      │ │
│  ├──────────────┤   ├──────────────────┤   ├─────────────────┤ │
│  │              │   │                  │   │                 │ │
│  │ Character    │   │ ┌──────────────┐ │   │ Insight →       │ │
│  │ Design       │──▶│ │Working Memory│ │──▶│ Investment      │ │
│  │              │   │ └──────────────┘ │   │ Decision        │ │
│  │ Risk Profile │   │        ▼         │   │                 │ │
│  │              │   │ ┌──────────────┐ │   │ Buy/Sell/Hold   │ │
│  │ Trading      │   │ │Short-term   │ │   │ with confidence │ │
│  │ Style        │   │ │Memory       │ │   │                 │ │
│  │              │   │ └──────────────┘ │   │                 │ │
│  │              │   │        ▼         │   │                 │ │
│  │              │   │ ┌──────────────┐ │   │                 │ │
│  │              │   │ │Long-term    │ │   │                 │ │
│  │              │   │ │Memory       │ │   │                 │ │
│  │              │   │ └──────────────┘ │   │                 │ │
│  └──────────────┘   │                  │   └─────────────────┘ │
│                     │ Access Counter   │                        │
│                     │ Memory Transfer  │                        │
│                     │ Guardrails AI    │                        │
│                     └──────────────────┘                        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Three Core Modules

#### 1. Profiling Module
- **Purpose:** Customizes the agent's characteristics
- **Elements:**
  - Character design (risk tolerance, trading style)
  - Professional background simulation
  - Behavioral constraints

#### 2. Memory Module (Core Innovation)
- **Layered Processing:** Three-tier memory system
- **Access Counter:** Tracks memory utilization frequency
- **Memory Transfer:** Events move between layers based on importance
- **Guardrails AI:** Validates LLM outputs for consistency
- **Embedding:** Uses OpenAI `text-embedding-ada-002` for memory retrieval

#### 3. Decision-Making Module
- **Input:** Insights from memory retrieval
- **Output:** Investment decisions (Buy/Sell/Hold)
- **Process:** Converts accumulated knowledge into actionable trades

### Technical Stack
- **Language:** Python 3.10
- **LLM Support:** GPT-4, TGI-deployed HuggingFace models, Gemini
- **Embeddings:** OpenAI text-embedding-ada-002 (required)
- **Validation:** Guardrails AI
- **Deployment:** Docker containerized

---

## 4. Integration Potential with Options Analyst

### Strong Alignment ✅

| Feature | FinMem | Options Analyst | Integration Value |
|---------|--------|-----------------|-------------------|
| Memory layers | ✅ | ❌ (stateless) | **High** - Add persistence |
| Character profiles | ✅ | ✅ (risk params) | Medium - Already exists |
| Multi-source data | ✅ | ✅ | Medium - Extend to news |
| Decision framework | ✅ | ✅ | Medium - Structure exists |

### Potential Integration Points

1. **Memory Layer for Options Analyst**
   ```
   Working Memory: Current option chain, recent price action
   Short-term: Past week's trades, signals given
   Long-term: Historical accuracy, market regime patterns
   ```

2. **Learning from Past Recommendations**
   - Track which recommendations were profitable
   - Adjust confidence based on historical accuracy
   - Remember market conditions that preceded moves

3. **Context-Aware Analysis**
   - "Remember" earnings date patterns
   - Track sector rotation patterns over time
   - Maintain IV crush history for specific stocks

4. **Character Profiles for Different Strategies**
   - Aggressive: Higher delta, shorter expiry
   - Conservative: Lower delta, longer duration
   - Income: Focus on theta decay, premium selling

### Implementation Considerations

**Easy Integration:**
- Memory storage (vector DB or simple JSON)
- Access counter mechanism
- Profiling parameters

**Requires More Work:**
- Multi-source data ingestion (news, sentiment)
- Real-time memory updates during market hours
- Memory transfer algorithms

---

## 5. Data Sources Used

Based on the repository and paper:

### Primary Data
- **Market Data:** Historical stock prices (pickle files)
- **Default Ticker:** TSLA (2022-06-30 to 2022-10-11 in examples)

### Data Structure
```
data/
├── 06_input/
│   └── subset_symbols.pkl  # Market environment data
├── 05_train_model_output/  # Trained agent storage
├── 06_train_checkpoint/    # Training checkpoints
├── 10_checkpoint_test/     # Test checkpoints
└── 11_train_result/        # Training results
```

### Implied Data Sources (from paper context)
- News/sentiment (for memory events)
- Price and volume data
- Technical indicators
- Fundamental events

### Embeddings
- All text converted to embeddings via OpenAI API
- Required even for non-OpenAI LLM backends

---

## 6. Backtesting Results

### From Paper Claims
- **Outperforms:** Various algorithmic agents including DRL (Deep Reinforcement Learning) counterparts
- **Advantages over DRL:**
  - Better textual data integration
  - Higher interpretability
  - More transparent decision-making

### Test Configuration
- **Mode:** Train/Test split
- **Training:** Memory population phase
- **Testing:** Decision-making with populated memory

### Performance Highlights
- "Leading trading performance in stocks and funds"
- "Significantly enhanced trading performance" with tuned perceptual spans
- "Boosting cumulative investment returns"

### Limitations
- Specific numerical results not available in public README
- Paper behind paywall for detailed metrics
- Test period (2022) was during high volatility (TSLA split, market correction)

### IJCAI 2024 Challenge
- Participated in "Financial Challenges in Large Language Models - FinLLM"
- Task 3: Single Stock Trading
- Among 12 participating teams

---

## 7. Similar Projects

### Related LLM Financial Agents

| Project | Focus | Memory | Link |
|---------|-------|--------|------|
| **FinGPT** | Financial LLM fine-tuning | No | AI4Finance |
| **TradingGPT** | General trading agent | Limited | Various |
| **FinRL** | RL for trading | State-based | AI4Finance |
| **StockAgent** | Multi-agent trading | Agent-based | Academic |

### FinMem's Differentiation
- **Unique:** Cognitive-inspired layered memory
- **Unique:** Character/profiling design
- **Unique:** Memory transfer based on access patterns
- **Shared:** LLM-based decision making

---

## 8. Key Takeaways

### Strengths
1. **Biologically-inspired** memory system mimics human cognition
2. **Interpretable** decision-making process
3. **Self-improving** through experience accumulation
4. **Tunable** perceptual spans for different trading styles
5. **Academic credibility** (ICLR, IEEE publications)

### Weaknesses
1. **Requires OpenAI API** for embeddings (cost)
2. **Complex setup** (Docker, multiple configs)
3. **Limited public benchmark data**
4. **Single stock focus** (not portfolio-level)

### For Options Analyst Integration

**Recommended Approach:**
1. Start with simple memory layer (JSON-based)
2. Track recommendation outcomes
3. Build access counter for frequently retrieved patterns
4. Add character profiles for risk levels

**Priority Features:**
1. Historical accuracy tracking → confidence calibration
2. Market regime memory → adaptive recommendations
3. IV/Greeks memory → pattern recognition

---

## References

```bibtex
@misc{yu2023finmem,
  title={FinMem: A Performance-Enhanced LLM Trading Agent with 
         Layered Memory and Character Design}, 
  author={Yangyang Yu and Haohang Li and Zhi Chen and 
          Yuechen Jiang and Yang Li and Denghui Zhang and 
          Rong Liu and Jordan W. Suchow and Khaldoun Khashanah},
  year={2023},
  eprint={2311.13743},
  archivePrefix={arXiv},
  primaryClass={q-fin.CP}
}
```

**Links:**
- GitHub: https://github.com/pipiku915/FinMem-LLM-StockTrading
- ArXiv: https://arxiv.org/abs/2311.13743
- OpenReview: https://openreview.net/forum?id=sstfVOwbiG
- IEEE: https://ieeexplore.ieee.org/document/11112648/
