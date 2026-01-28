# Quantarded Deep Dive

> Research Date: 2026-01-28
> Status: Complete
> Integration Target: Options Analyst System

---

## 1. What is Quantarded?

**Quantarded** is an AI-powered stock signal aggregator that extracts trading signals from multiple public alternative data sources. The name is a portmanteau of "quant" + WSB slang, reflecting its origin in making institutional-grade alternative data accessible to retail traders.

### Core Philosophy
- **Semantic Parser, Not Predictor**: Uses OpenAI strictly to extract tickers and intent from noisy text data—not to predict prices
- **Mechanical Scoring**: After semantic parsing, applies deterministic weekly scoring models
- **Intentionally Conservative**: Publishes transparent performance including weak/inconclusive weeks
- **Weekly Cadence**: Not meant for day trading; targets swing trades and position building

### What Makes It Different
Unlike typical "AI trading" products that claim to predict the market, Quantarded:
1. Focuses on **signal aggregation** across data sources
2. Uses AI only for **parsing** (extracting tickers + buy/sell intent from text)
3. Applies **transparent mechanical rules** for scoring
4. Publishes **honest performance** including losing weeks

---

## 2. How It Extracts Signals

### 2.1 WSB Sentiment Processing

**Data Source**: r/WallStreetBets posts and comments

**Processing Pipeline**:
```
Raw Reddit Posts/Comments
        ↓
OpenAI Semantic Parser
   - Extract mentioned tickers
   - Classify intent: BUY / SELL / NEUTRAL
        ↓
Weekly Scoring Model
   - Recency decay (recent chatter weighted higher)
   - Attention share (relative volume of mentions)
   - Buy/sell imbalance (e.g., 90% buy = strong signal)
        ↓
Normalized Weekly Signal
```

**Key Design Choices**:
- No fundamentals considered
- No price features used
- No user weighting (all users equal)
- Exponential decay on recency

**Signal Output**:
- Top ranked tickers with bullish/bearish direction
- Confidence level (conviction within context, not probability)

### 2.2 Congressional Trade Analysis

**Data Source**: STOCK Act disclosure filings (House + Senate)

Congressional trades use a separate, slower model focused on:

| Factor | Description |
|--------|-------------|
| **Credibility** | Not all trades weighted equally |
| **Position Building** | Repeated trades by same person over weeks |
| **Consensus Clustering** | Multiple lawmakers trading same direction |
| **Size Weighting** | Larger transactions carry more weight |

**Processing Pipeline**:
```
STOCK Act Filings (45-day delay)
        ↓
Parse Trade Details
   - Representative name
   - Ticker
   - Transaction type (BUY/SELL)
   - Amount range
        ↓
Apply Credibility Scoring
   - Historical track record
   - Committee relevance
        ↓
Detect Position Building
   - Same person, same direction, multiple weeks
        ↓
Cluster Consensus Signals
   - Multiple lawmakers = stronger signal
        ↓
Apply Smooth Decay
   - Based on trade date + filing delay
        ↓
Congressional Signal Score
```

**Filing Delay Reality**:
- Politicians must file within 45 days
- Many file late (some penalties apply)
- Signals are delayed but still actionable for:
  - LEAPS (long-dated options)
  - Position trades (weeks/months)
  - Sector rotation plays

### 2.3 Additional Signal Sources

| Source | Signal Type | Notes |
|--------|-------------|-------|
| **Inverse Cramer** | Contrarian | CNBC calls tracked and inversed |
| **Form 4 Filings** | Insider Activity | Executive buys/sells |

### 2.4 Signal Normalization & Combination

1. Raw data cleaned and deduped
2. Bucketed into weekly cohorts
3. WSB gets exponential decay weighting
4. Normalized for cross-source comparison
5. Each source produces own confidence score

**Important**: Scores express **conviction within context**, not probability of profit. They are intentionally conservative and capped.

---

## 3. APIs and Tools

### 3.1 Primary Data Platform: Quiver Quantitative

The infrastructure behind Quantarded-style analysis is largely provided by **Quiver Quantitative** (https://www.quiverquant.com).

#### Python API

```bash
pip install quiverquant
```

```python
import quiverquant

# Connect with API token
quiver = quiverquant.quiver("<TOKEN>")

# WSB Data
df_wsb = quiver.wallstreetbets()              # All tickers
df_wsb_gme = quiver.wallstreetbets("GME")     # Specific ticker

# Congressional Trading
df_congress = quiver.congress_trading()                           # All trades
df_congress_tsla = quiver.congress_trading("TSLA")                # By ticker
df_congress_pelosi = quiver.congress_trading("Nancy Pelosi", politician=True)  # By politician

# Additional Data Sources
df_lobbying = quiver.lobbying("AAPL")
df_contracts = quiver.gov_contracts("LMT")
df_offexchange = quiver.offexchange("AMC")
df_insiders = quiver.insiders("TSLA")
df_wiki = quiver.wikipedia("MSFT")
df_twitter = quiver.twitter("GE")
df_flights = quiver.flights("TGT")  # Corporate jet flights!
```

#### API Pricing

| Tier | Price | Features |
|------|-------|----------|
| Hobbyist | $10/month | Tier 1 data (WSB, Congress, basic) |
| Trader | $75/month | Tier 1 + 2 (all datasets) |
| Institution | Custom | Full access + support |

**Web Platform**: $25/month or $300/year
- Includes backtesters, screeners, alerts
- 7-30 day free trials available

### 3.2 QuantConnect Integration

QuantConnect provides built-in Quiver data for algorithmic trading:

```python
from AlgorithmImports import *

class CongressTradingAlgo(QCAlgorithm):
    def initialize(self):
        # Add congress trading data for AAPL
        aapl = self.add_equity("AAPL", Resolution.DAILY).symbol
        self.add_data(QuiverCongress, aapl)
        
        # Add WSB data
        self.add_universe(QuiverWallStreetBetsUniverse, self.wsb_filter)
    
    def wsb_filter(self, alt_coarse):
        # Top 100 ranked, >10 mentions
        return [d.symbol for d in alt_coarse 
                if d.mentions > 10 and d.rank < 100]
    
    def on_data(self, slice):
        # Process congress trades
        congress_data = slice.Get(QuiverCongress)
        for symbol, trades in congress_data.items():
            net_direction = sum(
                (1 if t.transaction == OrderDirection.BUY else -1) * t.amount 
                for t in trades
            )
            if net_direction > 0:
                self.set_holdings(symbol.underlying, 1)
```

### 3.3 Alternative APIs

| API | Endpoint | Notes |
|-----|----------|-------|
| **Finnhub** | `/congressional-trading` | Free tier available |
| **AInvest** | `/ownership/congress` | REST API, filter by ticker |
| **Financial Modeling Prep** | Senate/House Trading API | Both chambers |

### 3.4 Open Source Tools

| Tool | Purpose | Repo |
|------|---------|------|
| **quiverquant** | Official Python API | `Quiver-Quantitative/python-api` |
| **simple-wsb-strat** | WSB trading strategy | `Quiver-Quantitative/simple-wsb-strat` |
| **congress_stock_trading** | Full AWS pipeline | `burd5/congress_stock_trading` |
| **TheWSBIndex** | WSB volatility predictor | `theriley106/TheWSBIndex` |

---

## 4. Integration with Options Analyst

### 4.1 High-Value Integration Points

#### A. Sentiment Pre-Filter for Options Scanning

```
Workflow Enhancement:
┌─────────────────────────────────────────────────────────────┐
│  1. Pull Quantarded/Quiver weekly signals                   │
│  2. Filter for high-attention tickers (WSB mentions > 50)   │
│  3. Cross-reference with our IV screening                   │
│     - High WSB attention often → increased options activity │
│  4. Prioritize tickers appearing in BOTH lists              │
└─────────────────────────────────────────────────────────────┘
```

**Implementation**:
```python
# In options analyst workflow
def get_sentiment_enhanced_universe():
    # Get WSB high-attention tickers
    wsb_hot = quiver.wallstreetbets()
    wsb_hot = wsb_hot[wsb_hot['mentions'] > 50]['ticker'].tolist()
    
    # Get our IV-based candidates
    iv_candidates = get_high_iv_opportunities()
    
    # Intersection = high conviction targets
    enhanced = [t for t in iv_candidates if t in wsb_hot]
    return enhanced
```

#### B. Congressional Trade Alerts for LEAPS

Position building detection is valuable for longer-dated options:

```
Signal Hierarchy:
┌────────────────────────────────────────────────────────────────┐
│ HIGHEST:  Multiple congresspeople + same direction + >$100k   │
│ HIGH:     Single congressperson + position building (3+ weeks)│
│ MEDIUM:   Large single trade ($50k+) by credible member       │
│ LOW:      Standard disclosure (informational only)            │
└────────────────────────────────────────────────────────────────┘
```

**Use Case**: When congressional consensus clustering detected:
- Consider 6-12 month LEAPS in same direction
- Use as sector rotation signal
- Cross-reference with committee assignments (e.g., Energy Committee → energy stocks)

#### C. Pre-Earnings Intelligence

```
Pre-Earnings Play Enhancement:
┌─────────────────────────────────────────────────────────────────┐
│  1. Monitor WSB buzz spike detection (3x+ normal volume)       │
│  2. Check if spike occurs 5-10 days before earnings            │
│  3. Combine with IV analysis:                                  │
│     - High attention + low IV rank = potential straddle entry  │
│     - High attention + high IV rank = premium selling opps     │
│  4. Validate thesis before trade entry                         │
└─────────────────────────────────────────────────────────────────┘
```

#### D. Contrarian Signal Layer

Inverse Cramer and extreme WSB sentiment can signal mean-reversion:

```python
def get_contrarian_signals():
    wsb = quiver.wallstreetbets()
    
    # Extreme bullish (potential top)
    overbought = wsb[
        (wsb['sentiment_score'] > 0.9) & 
        (wsb['mentions'] > 100)
    ]
    
    # Extreme bearish (potential bottom)
    oversold = wsb[
        (wsb['sentiment_score'] < 0.1) & 
        (wsb['mentions'] > 100)
    ]
    
    return {'potential_puts': overbought, 'potential_calls': oversold}
```

### 4.2 Proposed Integration Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    OPTIONS ANALYST ENHANCED                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐        │
│  │ Quiver API   │   │ Options Data │   │ Market Data  │        │
│  │ - WSB        │   │ - IV/Greeks  │   │ - Price      │        │
│  │ - Congress   │   │ - Chain      │   │ - Volume     │        │
│  │ - Insiders   │   │ - GEX        │   │ - Technicals │        │
│  └──────┬───────┘   └──────┬───────┘   └──────┬───────┘        │
│         │                  │                  │                  │
│         └──────────────────┼──────────────────┘                  │
│                            ▼                                     │
│              ┌─────────────────────────┐                        │
│              │    Signal Aggregator    │                        │
│              │  - Normalize scores     │                        │
│              │  - Weight by source     │                        │
│              │  - Detect confluence    │                        │
│              └───────────┬─────────────┘                        │
│                          ▼                                       │
│              ┌─────────────────────────┐                        │
│              │   Opportunity Ranker    │                        │
│              │  - Multi-factor score   │                        │
│              │  - Risk assessment      │                        │
│              │  - Strategy suggestion  │                        │
│              └───────────┬─────────────┘                        │
│                          ▼                                       │
│              ┌─────────────────────────┐                        │
│              │      Trade Ideas        │                        │
│              │  - Entry/exit levels    │                        │
│              │  - Position sizing      │                        │
│              │  - Greeks targets       │                        │
│              └─────────────────────────┘                        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 4.3 Implementation Roadmap

#### Phase 1: Data Integration (Week 1)
- [ ] Sign up for Quiver API (Hobbyist tier: $10/month)
- [ ] Add `quiverquant` to options analyst dependencies
- [ ] Create wrapper functions in options analyst codebase
- [ ] Test data retrieval and caching

#### Phase 2: Signal Processing (Week 2)
- [ ] Build WSB sentiment scorer module
- [ ] Build congressional trade tracker
- [ ] Implement signal normalization
- [ ] Add confluence detection logic

#### Phase 3: Options Integration (Week 3)
- [ ] Cross-reference with IV analysis
- [ ] Add sentiment layer to screener
- [ ] Create congressional LEAPS alerter
- [ ] Build pre-earnings buzz detector

#### Phase 4: Automation (Week 4)
- [ ] Set up daily signal refresh
- [ ] Create Discord/notification alerts
- [ ] Build performance tracking
- [ ] Document and refine

### 4.4 Sample Combined Analysis Output

```
═══════════════════════════════════════════════════════════════════
                    ENHANCED OPTIONS SIGNAL: NVDA
═══════════════════════════════════════════════════════════════════

📊 QUANTARDED SIGNALS
├─ WSB Attention:     HIGH (234 mentions, rank #3)
├─ WSB Sentiment:     BULLISH (87% buy intent)
├─ Congressional:     2 buys detected (Sen. X, Rep. Y)
├─ Insider Activity:  CEO bought $2.1M (Jan 15)
└─ Signal Age:        Fresh (< 7 days)

📈 OPTIONS METRICS
├─ IV Rank:           42nd percentile
├─ IV Percentile:     38%
├─ 30-day IV:         48.2%
├─ Put/Call Ratio:    0.67 (bullish)
└─ GEX:               Positive (dealers long gamma)

🎯 CONFLUENCE SCORE: 8.2/10

💡 SUGGESTED PLAYS
├─ Primary:    Bull call spread (Feb 140/150)
├─ Alt 1:      Cash-secured puts (Feb 135)
├─ Alt 2:      LEAPS (Jan 2027 140C) if congressional signal
└─ Avoid:      Premium selling (IV too low)

⚠️ RISK FACTORS
├─ Earnings in 23 days (Feb 21)
├─ WSB attention = potential volatility
└─ Congressional trades filed late (actual trade: Jan 5)
═══════════════════════════════════════════════════════════════════
```

---

## 5. Limitations & Considerations

### What Quantarded Signals ARE Good For
- ✅ Identifying high-attention tickers to research
- ✅ Congressional trade insights for position trades
- ✅ Contrarian signals to validate/challenge thesis
- ✅ Pre-filtering the options universe
- ✅ Sector rotation hints

### What They're NOT
- ❌ Real-time signals (weekly cadence)
- ❌ Probability of profit estimates
- ❌ Options-specific data
- ❌ Primary trading signals (use as supplement)
- ❌ Backtested real trading results

### Data Delays to Account For
| Source | Typical Delay |
|--------|---------------|
| WSB Sentiment | 1-24 hours |
| Congressional | 1-45+ days |
| Form 4 Insiders | 2 days |
| Inverse Cramer | Real-time |

---

## 6. Quick Start Checklist

- [ ] **Get Quiver API Key**: https://api.quiverquant.com ($10/month)
- [ ] **Install Python Package**: `pip install quiverquant`
- [ ] **Test Basic Queries**:
  ```python
  import quiverquant
  q = quiverquant.quiver("YOUR_TOKEN")
  print(q.wallstreetbets().head())
  print(q.congress_trading().head())
  ```
- [ ] **Set Up Daily Cron**: Fetch fresh data each morning
- [ ] **Integrate with Options Analyst**: Add sentiment layer to screener
- [ ] **Track Performance**: Log signal accuracy over 4-8 weeks
- [ ] **Iterate**: Adjust weights based on what works

---

## 7. Resources

### Official
- Quantarded: https://quantarded.com
- Quiver Quantitative: https://www.quiverquant.com
- Quiver API: https://api.quiverquant.com
- API Docs: https://api.quiverquant.com/docs/

### GitHub
- Python API: `Quiver-Quantitative/python-api`
- WSB Strategy: `Quiver-Quantitative/simple-wsb-strat`
- Congress Pipeline: `burd5/congress_stock_trading`

### Related Reading
- HN Discussion: https://news.ycombinator.com/item?id=46793816
- Seeking Alpha WSB Strategy: https://seekingalpha.com/article/4521071-wallstreetbets-quantitative-strategy

---

*Last Updated: 2026-01-28*
*Research by: Subagent (quantarded-research)*
