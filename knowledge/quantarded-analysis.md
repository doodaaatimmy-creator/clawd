# Quantarded Analysis

> Analyzed: 2026-01-28
> Source: https://quantarded.com + HN discussion

## Overview

Quantarded is an AI-powered stock signal aggregator that extracts trading signals from multiple public data sources. It uses OpenAI as a semantic parser (not predictor) to identify ticker mentions and buy/sell/neutral intent from noisy text data.

**Key Philosophy:** Intentionally conservative. Not a trading bot or prediction engine. Publishes weekly snapshots with transparent performance including weak/inconclusive weeks.

## Data Sources

| Source | Signal Strength | Description |
|--------|-----------------|-------------|
| r/wallstreetbets | High | Sentiment analysis on posts, comments, ticker mentions |
| Congressional Trades | High | House/Senate disclosure forms (filed late but publicly available) |
| Inverse Cramer | Medium | CNBC calls tracked and inversed as contrarian indicator |
| Form 4 Filings | Medium | Insider buys/sells from company executives |

## How It Works

### 1. WSB Sentiment Processing
- Uses OpenAI **strictly as a semantic parser** to extract:
  - Tickers mentioned
  - Buy/sell/neutral intent
- Then applies **mechanical weekly scoring model**:
  - Recency decay (recent chatter weighted higher)
  - Attention share (relative volume of mentions)
  - Buy/sell imbalance (90% buy vs 10% sell = stronger signal)
- No fundamentals, no price features, no user weighting

### 2. Congressional Trade Analysis
- Separate, slower model focused on:
  - **Credibility** - not all trades equal
  - **Position building** - repeated trades by same person over weeks
  - **Consensus clustering** - multiple lawmakers in same direction matters more
- Trades scored by: size, consensus, recency
- Smooth decay based on trade date and filing delay

### 3. Signal Normalization
- Raw data cleaned, deduped, bucketed into weekly cohorts
- WSB gets exponential decay weighting
- Normalized for cross-source comparison

### 4. Confidence Scoring
- Each algorithm produces own scores
- Scores express **conviction within context**, not probability of profit
- Intentionally conservative and capped
- Not comparable across signal types

## Weekly Output

- Top ranked stock picks with:
  - Signal strength
  - Direction (bullish/bearish)
  - Confidence level
- Full activity summary with entry points and position sizing (subscribers)
- Retro analysis on previous moves
- Published every Monday before market open

## Potential Value for Options Analyst

### High Value Applications

1. **Sentiment Pre-filter**
   - Use WSB sentiment data to identify high-attention tickers
   - Cross-reference with our IV/volume analysis
   - Higher WSB attention often correlates with increased options activity

2. **Congressional Trade Alerts**
   - Position building detection is valuable for longer-dated options plays
   - Consensus clustering could signal sector-wide moves
   - Filing delays mean signals are delayed but still actionable for leaps

3. **Contrarian Indicator**
   - Inverse Cramer signal could complement our contrarian options strategies
   - Useful for identifying potential mean-reversion plays

4. **Pre-earnings Intelligence**
   - WSB buzz often spikes before earnings
   - Could help identify pre-earnings straddle/strangle opportunities
   - Combined with our IV analysis = stronger thesis

### Integration Ideas

```
Options Analyst Workflow Enhancement:
1. Pull Quantarded weekly signals
2. Cross-reference with high IV tickers
3. Check if congressional trades align with technical setup
4. Prioritize plays where multiple signals converge
```

### Limitations to Note

- Weekly cadence (not real-time) - fine for swing trades, not day trades
- Signals express conviction, not probability - don't use as sole decision maker
- No options-specific data - we'd still need our IV/Greeks analysis
- Hypothetical backtested performance - not real trading results

## Verdict

**Useful as supplementary data source, not primary driver.**

Best used for:
- Identifying high-attention tickers to research further
- Congressional trade insights for position trades
- Contrarian signals to validate thesis
- Pre-filtering the options universe

Not a replacement for:
- IV analysis
- Technical analysis
- Greeks/risk management
- Fundamental DD

## Action Items

- [ ] Subscribe to free weekly signals for monitoring
- [ ] Track accuracy over 4-8 weeks before incorporating
- [ ] Consider building integration to pull their top picks into our scanner
- [ ] Evaluate paid tier if free signals prove valuable

## Links

- Site: https://quantarded.com
- HN Discussion: https://news.ycombinator.com/item?id=46793816
