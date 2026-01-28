---
name: options-analyst
description: Options analytics tools for GEX/DEX analysis, IV surface, regime detection, and options flow. Query options data via DuckDB.
metadata: {"moltbot":{"emoji":"📊","requires":{"bins":["python3"],"config":[],"env":[]},"skillKey":"options-analyst"}}
---

# Options Analyst

Provides options analytics including gamma exposure (GEX), delta exposure (DEX), IV surface analysis, market regime detection, and options chain data.

## Location

Project: `/Users/clawdchad/repos/options-analyst`

## CLI Usage

All commands require activating the venv first:

```bash
cd /Users/clawdchad/repos/options-analyst && source venv/bin/activate && python -m mcp_server.cli_tools <command> [args]
```

### Available Commands

| Command | Description | Usage |
|---------|-------------|-------|
| `summary` | Ticker summary with GEX/DEX/regime | `summary SPY [--date YYYY-MM-DD]` |
| `intraday` | Real-time intraday snapshot | `intraday SPY` |
| `gex` | GEX levels and key strikes | `gex SPY` |
| `regime` | Market regime (IV rank, gamma regime) | `regime SPY` |
| `chain` | Options chain for expiration | `chain SPY 2025-02-21` |
| `overview` | Market overview of all tickers | `overview` |
| `watchlist` | List watchlist tickers | `watchlist` |
| `iv` | IV surface data | `iv SPY` |
| `history` | Exposure history | `history SPY [--days 30]` |
| `prices` | Price history (OHLCV) | `prices SPY [--days 60]` |
| `query` | Execute SQL query | `query "SELECT * FROM daily_exposures LIMIT 5"` |
| `status` | Data freshness status | `status` |

### Examples

**Get SPY summary:**
```bash
cd /Users/clawdchad/repos/options-analyst && source venv/bin/activate && python -m mcp_server.cli_tools summary SPY
```

**Get GEX levels for NVDA:**
```bash
cd /Users/clawdchad/repos/options-analyst && source venv/bin/activate && python -m mcp_server.cli_tools gex NVDA
```

**Get market overview:**
```bash
cd /Users/clawdchad/repos/options-analyst && source venv/bin/activate && python -m mcp_server.cli_tools overview
```

**Get regime data:**
```bash
cd /Users/clawdchad/repos/options-analyst && source venv/bin/activate && python -m mcp_server.cli_tools regime QQQ
```

**Custom SQL query:**
```bash
cd /Users/clawdchad/repos/options-analyst && source venv/bin/activate && python -m mcp_server.cli_tools query "SELECT ticker, net_gamma_exposure, gamma_flip_strike FROM daily_exposures ORDER BY date DESC LIMIT 10"
```

## Key Terms

- **GEX** (Gamma Exposure): Net dealer gamma exposure. Positive = dealers buy dips/sell rips (mean-reverting). Negative = dealers amplify moves (trending).
- **DEX** (Delta Exposure): Net delta exposure from options positions.
- **Gamma Flip**: Strike where dealer gamma flips from positive to negative.
- **Call Wall/Put Wall**: Strikes with highest call/put gamma concentration.
- **IV Rank**: Current IV vs 52-week range (0-100). High = expensive options.
- **PCR**: Put/Call ratio (volume or open interest). High = bearish sentiment.
- **Term Structure**: Contango (front < back IV) or Backwardation (front > back IV, fear).
- **Regime Summary**: Combined regime classification (e.g., "Low IV, Positive Gamma, Contango").

## Database Tables

- `daily_exposures` - GEX, DEX, gamma flip, key levels
- `market_regimes` - IV rank, gamma regime, term structure
- `options_snapshots` - Raw options chain data
- `price_history` - OHLCV data
- `watchlist` - Tracked tickers
