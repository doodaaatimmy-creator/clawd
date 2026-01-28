# Maverick-MCP Analysis for Options Analyst Integration

**Analysis Date:** 2026-01-28  
**Repo:** [wshobson/maverick-mcp](https://github.com/wshobson/maverick-mcp)  
**Stars:** 329 | **Forks:** 82 | **License:** MIT

---

## Executive Summary

Maverick-MCP is a professional-grade stock analysis MCP server built for Claude Desktop integration. It provides excellent infrastructure for financial data, technical analysis, backtesting, and AI-powered research. **However, it has zero options-specific functionality.** This makes it an ideal complement to our Options Analyst rather than a replacement.

**Integration Opportunity:** Merge maverick-mcp's infrastructure (FastMCP 2.0, VectorBT backtesting, LangGraph agents, intelligent caching) with our Options Analyst's domain expertise (GEX/DEX, IV surface, options chains, regime detection).

---

## 1. Architecture Overview

### Tech Stack
```
maverick-mcp
├── MCP Server:     FastMCP 2.0 (HTTP/SSE/STDIO transports)
├── Framework:      FastAPI + uvicorn
├── Database:       SQLAlchemy + PostgreSQL/SQLite
├── Caching:        Redis with in-memory fallback
├── AI/LLM:         LangChain + LangGraph (Anthropic/OpenAI/OpenRouter)
├── Backtesting:    VectorBT + NumPy + Pandas
├── Technical:      TA-Lib + pandas-ta
└── Data:           Tiingo API (primary), yfinance (fallback)
```

### Key Dependencies (pyproject.toml)
- `fastmcp>=2.7.0` - MCP server framework
- `vectorbt>=0.26.0` - Backtesting engine
- `ta-lib>=0.6.3` - Technical analysis
- `langgraph>=0.4.8` - Multi-agent orchestration
- `redis>=6.2.0` - Caching layer
- `tiingo>=0.16.1` - Stock data provider

---

## 2. Data Sources

### Current Sources
| Source | Type | Auth | Notes |
|--------|------|------|-------|
| **Tiingo** | Stock data, news | API key (free tier) | Primary data source |
| **yfinance** | Stock data | None | Fallback provider |
| **FRED** | Economic indicators | API key | Optional |
| **Exa** | Web search/research | API key | For AI research |
| **OpenRouter** | 400+ AI models | API key | Cost-optimized LLM access |

### ❌ NO Options Data Support
- No Polygon.io integration
- No options chain data
- No GEX/DEX calculations
- No IV surface analysis
- No options-specific tools

**This is the primary gap we can fill.**

---

## 3. MCP Tools Breakdown (39+ tools)

### Stock Data Tools
```python
# Data fetching with smart caching
fetch_stock_data(symbol, start_date, end_date, interval)
fetch_stock_data_batch(symbols)  # Parallel fetching
get_stock_info(ticker)
get_news_sentiment(ticker)
```

### Technical Analysis Tools
```python
# All via TA-Lib + pandas-ta
get_rsi_analysis(ticker, period=14)
get_macd_analysis(ticker)
get_support_resistance(ticker)
get_full_technical_analysis(ticker, days=365)  # Comprehensive
get_stock_chart_analysis(ticker)  # Visual generation
```

### Stock Screening Tools (Pre-seeded S&P 500)
```python
get_maverick_stocks()           # Bullish momentum
get_maverick_bear_stocks()      # Bearish setups
get_supply_demand_breakouts()   # Breakout identification
get_all_screening_recommendations()
get_screening_by_criteria(criteria)
```

### Portfolio Management Tools
```python
portfolio_add_position(ticker, shares, cost_basis)
portfolio_get_my_portfolio()
portfolio_remove_position(ticker)
portfolio_correlation_analysis()
compare_tickers(tickers)
risk_adjusted_analysis(tickers)
```

### Backtesting Tools (VectorBT)
```python
run_backtest(symbol, strategy, params)
optimize_strategy(symbol, strategy, metric)
walk_forward_analysis(symbol, strategy)
monte_carlo_simulation(symbol, strategy, n_simulations)
compare_strategies(symbol, strategies)
backtest_portfolio(symbols, strategy)
list_strategies()
parse_strategy(description)  # NLP to strategy config!
```

### AI Research Tools (LangGraph)
```python
research_comprehensive(query, scope)
research_company(symbol)
analyze_market_sentiment(topic)
coordinate_agents(task)  # Multi-agent supervisor
```

---

## 4. Backtesting Deep Dive

### Built-in Strategies (15+)
```python
STRATEGY_TEMPLATES = {
    # Trend Following
    "sma_cross": {"fast_period": 10, "slow_period": 20},
    "ema_cross": {"fast_period": 12, "slow_period": 26},
    "macd": {"fast": 12, "slow": 26, "signal": 9},
    "breakout": {"lookback": 20, "breakout_factor": 1.0},
    
    # Mean Reversion
    "rsi": {"period": 14, "oversold": 30, "overbought": 70},
    "bollinger": {"period": 20, "std_dev": 2.0},
    "mean_reversion": {"lookback": 20, "z_score_threshold": 2.0},
    
    # Momentum
    "momentum": {"lookback": 20, "threshold": 0.05},
    "volume_momentum": {"period": 20, "volume_factor": 1.5},
}
```

### VectorBT Engine Features
- **Parallel optimization** via grid search
- **Walk-forward analysis** for robustness testing
- **Monte Carlo simulation** with confidence intervals
- **Multi-symbol portfolio backtesting**
- **Performance metrics**: Sharpe, Sortino, Calmar, max drawdown, win rate
- **Visualization**: Equity curves, trade scatter, optimization heatmaps

### Architecture Worth Borrowing
```python
# From maverick_mcp/backtesting/vectorbt_engine.py
class VectorBTEngine:
    async def run_backtest(symbol, strategy_type, parameters, ...):
        # Fetch data with smart caching
        df = await self._get_price_data(symbol, start_date, end_date)
        
        # Apply strategy (generates signals)
        signals = self._apply_strategy(df, strategy_type, parameters)
        
        # Run VectorBT portfolio simulation
        portfolio = vbt.Portfolio.from_signals(
            close=df['Close'],
            entries=signals['entries'],
            exits=signals['exits'],
            init_cash=initial_capital,
            fees=0.001,  # 10 bps
            slippage=0.001,
        )
        
        return self._extract_metrics(portfolio)
```

---

## 5. Smart Caching Pattern

One of maverick-mcp's best features is intelligent caching:

```python
# From maverick_mcp/providers/stock_data.py
def _get_data_with_smart_cache(symbol, start_date, end_date, interval):
    """
    1. Gets all available data from cache
    2. Identifies missing date ranges
    3. Fetches ONLY missing data from API
    4. Combines and returns complete dataset
    """
    # Check cache for any existing data
    cached_df = self._get_cached_data_flexible(session, symbol, start_date, end_date)
    
    if cached_df is not None:
        # Find gaps in cached data
        missing_ranges = self._identify_missing_ranges(cached_df, start_date, end_date)
        
        if not missing_ranges:
            return cached_df  # Full cache hit!
        
        # Fetch only missing data
        for miss_start, miss_end in missing_ranges:
            new_data = self._fetch_from_api(symbol, miss_start, miss_end)
            self._cache_data(session, symbol, new_data)
            
        return self._combine_cached_and_new(cached_df, new_data)
    
    # Full cache miss - fetch everything
    df = self._fetch_from_api(symbol, start_date, end_date)
    self._cache_data(session, symbol, df)
    return df
```

**Worth adopting for Options Analyst** - would reduce Polygon API calls significantly.

---

## 6. Integration Plan for Options Analyst

### Option A: Add Options Module to Maverick-MCP (Recommended)

**Pros:** Leverages entire infrastructure, gets backtesting, caching, AI research for free  
**Cons:** Need to fork and maintain

```
maverick-mcp/
├── maverick_mcp/
│   ├── providers/
│   │   ├── stock_data.py      # Existing
│   │   └── options_data.py    # NEW: Polygon adapter
│   ├── tools/
│   │   ├── risk_management.py # Existing
│   │   └── options_tools.py   # NEW: GEX/DEX tools
│   ├── backtesting/
│   │   └── strategies/
│   │       └── options_strategies.py  # NEW: Options-specific
│   └── api/routers/
│       └── options.py         # NEW: Options MCP tools
```

**New Tools to Add:**
```python
# Options data tools
options_get_chain(ticker, expiration)
options_get_greeks(ticker, expiration)
options_get_iv_surface(ticker)

# GEX/DEX analytics (from our Options Analyst)
options_get_gex(ticker)
options_get_dex(ticker)
options_get_gamma_flip(ticker)
options_get_key_levels(ticker)

# Regime detection
options_get_regime(ticker)
options_get_term_structure(ticker)
options_get_iv_rank(ticker)

# Options-specific backtesting
backtest_options_strategy(ticker, strategy, params)
optimize_options_entry(ticker, direction, target_dte)
```

### Option B: Enhance Options Analyst with Maverick Patterns

**Pros:** Keep it separate, simpler to maintain  
**Cons:** Miss out on backtesting/AI research infrastructure

Port these patterns to Options Analyst:
1. Smart caching layer (reduce Polygon calls)
2. FastMCP 2.0 server (better Claude Desktop integration)
3. Circuit breaker pattern for API resilience
4. Health monitoring and metrics

### Option C: Two-Server Setup with Cross-Reference

Run both servers, use Claude Desktop multi-MCP:
```json
{
  "mcpServers": {
    "maverick-mcp": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "http://localhost:8003/sse/"]
    },
    "options-analyst": {
      "command": "python",
      "args": ["-m", "mcp_server"],
      "cwd": "/Users/clawdchad/repos/options-analyst"
    }
  }
}
```

---

## 7. Code Snippets Worth Borrowing

### Circuit Breaker Pattern
```python
# From maverick_mcp/utils/circuit_breaker_decorators.py
@with_stock_data_circuit_breaker
async def fetch_data(symbol):
    """Automatically handles API failures with:
    - Failure counting
    - Circuit open state (stops calling failing API)
    - Half-open retry attempts
    - Automatic recovery
    """
    return await api.get_data(symbol)
```

### Structured Logging with Performance Metrics
```python
# From maverick_mcp/utils/structured_logger.py
@with_structured_logging("run_backtest", include_performance=True, log_params=True)
async def run_backtest(symbol, strategy):
    """Automatically logs:
    - Start/end timestamps
    - Execution duration
    - Input parameters
    - Success/failure
    - Business metrics
    """
    ...
```

### Natural Language Strategy Parser
```python
# From maverick_mcp/backtesting/strategies/parser.py
class StrategyParser:
    def parse_simple(self, description: str) -> dict:
        """Parse natural language to strategy config.
        
        Examples:
        - "Buy when RSI is below 30" -> {"strategy": "rsi", "oversold": 30}
        - "10/20 SMA crossover" -> {"strategy": "sma_cross", "fast": 10, "slow": 20}
        """
```

### MCP Tool Registration Pattern
```python
# From maverick_mcp/api/routers/tool_registry.py
def register_all_router_tools(mcp: FastMCP) -> None:
    """Register tools directly on main server to avoid
    Claude Desktop's mounted router naming issues."""
    
    register_technical_tools(mcp)
    register_screening_tools(mcp)
    register_portfolio_tools(mcp)
    register_backtesting_tools(mcp)
    # etc.
```

---

## 8. Gaps We Can Fill

| Gap in Maverick | Our Options Analyst Has |
|-----------------|-------------------------|
| No options data | Polygon.io integration |
| No GEX/DEX | Full GEX/DEX/VEX analytics |
| No IV surface | Complete IV surface analysis |
| No gamma flip | Gamma flip calculation |
| No options regime | IV rank, term structure, regime classification |
| No options chains | Full chain data with Greeks |
| No put/call walls | Call wall/put wall identification |

**Unique value we bring:**
- **Gamma exposure analysis** - Key for understanding dealer positioning
- **Options flow interpretation** - Sentiment from options market
- **IV regime detection** - Expensive vs cheap options timing
- **GEX-based support/resistance** - Options-informed levels

---

## 9. Recommended Integration Roadmap

### Phase 1: Infrastructure Alignment (Week 1)
- [ ] Fork maverick-mcp
- [ ] Add Polygon.io provider to `providers/`
- [ ] Port smart caching pattern for options data
- [ ] Add circuit breaker for Polygon API

### Phase 2: Options Tools (Week 2)
- [ ] Create `api/routers/options.py` with MCP tools
- [ ] Port GEX/DEX calculations from Options Analyst
- [ ] Add IV surface tools
- [ ] Add regime detection tools

### Phase 3: Options Backtesting (Week 3)
- [ ] Create `backtesting/strategies/options_strategies.py`
- [ ] Add covered call strategy
- [ ] Add iron condor strategy
- [ ] Add gamma scalping strategy
- [ ] Add options entry optimization (DTE, delta targeting)

### Phase 4: AI Enhancement (Week 4)
- [ ] Add options-aware research agent
- [ ] Create options flow interpretation prompt
- [ ] Add GEX/DEX to stock analysis context
- [ ] Create combined fundamental + options regime analysis

---

## 10. Risk Assessment

### Technical Risks
| Risk | Mitigation |
|------|------------|
| Polygon API rate limits | Smart caching (maverick pattern) |
| VectorBT options complexity | Start with simple strategies |
| Maintenance burden of fork | Upstream tracking, selective cherry-pick |

### Data Risks
| Risk | Mitigation |
|------|------------|
| Options data staleness | Real-time refresh for intraday tools |
| Greeks calculation accuracy | Use Polygon-provided Greeks |
| Historical options limited | Focus on rolling 90-day windows |

---

## 11. Conclusion

**maverick-mcp is an excellent infrastructure foundation** with no options capability. Our Options Analyst has deep options domain expertise but simpler infrastructure. The integration opportunity is compelling:

**Best Path Forward:** Fork maverick-mcp and add an options module, bringing:
1. Our GEX/DEX/VEX analytics
2. Our IV surface and regime detection
3. New options backtesting strategies
4. Options-enhanced AI research

This creates a **best-of-both-worlds** solution: professional stock analysis infrastructure + elite options analytics = comprehensive market analysis platform.

---

## Appendix: Quick Reference

### Maverick-MCP GitHub
- Repo: https://github.com/wshobson/maverick-mcp
- Issues: 4 total (all closed)
- Last updated: 2026-01-28

### Our Options Analyst
- Location: `/Users/clawdchad/repos/options-analyst`
- Data: Polygon.io via DuckDB
- Access: CLI tools via Moltbot skill

### Key Files to Study
```
maverick-mcp/
├── maverick_mcp/api/server.py           # Main MCP server
├── maverick_mcp/api/routers/tool_registry.py  # Tool registration
├── maverick_mcp/providers/stock_data.py  # Smart caching
├── maverick_mcp/backtesting/vectorbt_engine.py  # Backtest engine
└── maverick_mcp/backtesting/strategies/templates.py  # Strategy defs
```
