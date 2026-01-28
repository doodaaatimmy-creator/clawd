# Tradier MCP Integration Guide

> **Research Date:** 2026-01-28  
> **Status:** Ready for Integration  
> **Verdict:** Game-changer for AI-native trading ✅

## Executive Summary

Tradier has an **official hosted MCP server** that connects LLMs directly to their brokerage API. This enables Claude (and other AI assistants) to:
- Execute real trades (equities AND options)
- Access real-time market data
- Query account info, positions, and orders
- Place complex multi-leg options orders

This is **production-ready** and officially supported by Tradier.

---

## 1. Official Tradier MCP Server

### Endpoint
```
https://mcp.tradier.com/mcp
```

### Transport Protocol
- **Streamable HTTP** (modern MCP transport)
- No custom environment needed

### Supported Platforms
| Platform | Status | Config Method |
|----------|--------|---------------|
| Claude Desktop | ✅ | Connectors settings |
| Claude Web | ✅ | Connectors settings |
| Claude Code | ✅ | `claude mcp add` |
| ChatGPT | ✅ | Custom Apps |
| Cursor | ✅ | mcp.json |
| Gemini CLI | ✅ | settings.json |

---

## 2. Available Tools

The Tradier MCP exposes these tools to LLMs:

### Account Management
| Tool | Description |
|------|-------------|
| `get_user_profile` | Account details and profile settings |
| `get_account_balances` | Current account balance and margin info |
| `get_account_historical_balances` | Balance history over time |
| `get_positions` | Current holdings (symbol, qty, cost basis, value) |
| `get_orders` | All orders with status, type, price |
| `get_gainloss` | P&L report (realized and unrealized) |
| `get_account_history` | Historical activity (trades, dividends, transfers) |
| `get_watchlists` | User watchlists with symbols |
| `add_to_watchlist` | Add symbols to watchlist |

### Market Data
| Tool | Description |
|------|-------------|
| `get_market_quotes` | Real-time quotes (price, change, volume, bid/ask) |
| `get_options_chain` | Options chain with optional Greeks |
| `get_historical_data` | Historical prices (daily/weekly/monthly) |
| `get_market_calendar` | Trading days and holidays |

### Order Execution 🔥
| Tool | Description |
|------|-------------|
| `place_equity_order` | Buy/sell stocks |
| `place_option_order` | Single-leg options orders |
| `place_multileg_option_order` | Spreads, straddles, iron condors (2-4 legs) |
| `place_oco_order` | One-Cancels-Other orders |
| `place_oto_order` | One-Triggers-Other orders |
| `place_otoco_order` | OTO + OCO bracket orders |
| `cancel_order` | Cancel existing orders |

### Documentation
| Tool | Description |
|------|-------------|
| `search_tradier_docs` | Query Tradier API docs for strategies, order types |

---

## 3. Authentication Setup

### Get Your API Keys
1. Log in to [tradier.com](https://tradier.com)
2. Navigate to **API Settings**: https://web.tradier.com/user/api
3. You'll find two tokens:
   - **Production Token** - Live trading with real money
   - **Paper Trading Token** - Sandbox environment

### Paper vs Live Trading
```
PAPER_TRADING: true   → Use paper trading token (sandbox, delayed data)
PAPER_TRADING: false  → Use production token (live money!)
```

⚠️ **Start with paper trading** until you trust the integration.

---

## 4. Integration Methods

### Option A: Claude Code CLI (Recommended for Us)

```bash
claude mcp add --transport http tradier https://mcp.tradier.com/mcp \
  --header "API_KEY: your_api_key_here" \
  --header "PAPER_TRADING: true"
```

### Option B: Claude Desktop/Web

1. Go to **Settings → Connectors → Add Custom Connector**
2. Enter:
   - **Name:** Tradier MCP
   - **URL:** `https://mcp.tradier.com/mcp?api_key=YOUR_KEY&paper_trading=true`
3. Click Add

### Option C: Cursor IDE

Create/edit `~/.cursor/mcp.json`:
```json
{
  "mcpServers": {
    "tradier": {
      "url": "https://mcp.tradier.com/mcp",
      "headers": {
        "API_KEY": "your_api_key_here",
        "PAPER_TRADING": "true"
      },
      "trust": false,
      "timeout": 600000
    }
  }
}
```

### Option D: Gemini CLI

Edit `~/.gemini/settings.json`:
```json
{
  "mcpServers": {
    "tradier": {
      "httpUrl": "https://mcp.tradier.com/mcp",
      "headers": {
        "API_KEY": "your_api_key_here",
        "PAPER_TRADING": "true"
      }
    }
  }
}
```

---

## 5. Integration with Options Analyst

### Current State
Our Options Analyst (`skills/options-intel/`) provides:
- Market analysis and trade ideas
- Options flow interpretation
- Strategy recommendations

### Enhanced Architecture with Tradier MCP

```
┌─────────────────────────────────────────────────────────────┐
│                    Options Analyst v2                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │   Analysis   │───▶│   Decision   │───▶│  Execution   │  │
│  │    Engine    │    │    Layer     │    │    Layer     │  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
│         │                   │                   │           │
│         ▼                   ▼                   ▼           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Tradier MCP Server                       │  │
│  │  • get_options_chain (live Greeks)                   │  │
│  │  • get_market_quotes (real-time pricing)             │  │
│  │  • place_multileg_option_order (execution)           │  │
│  │  • get_positions (portfolio tracking)                │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Integration Path

#### Phase 1: Data Enhancement (Low Risk)
- Use `get_options_chain` with Greeks for better analysis
- Use `get_market_quotes` for real-time validation
- Use `get_historical_data` for backtesting signals

#### Phase 2: Paper Trading Integration (Medium Risk)
- Execute paper trades based on analyst recommendations
- Track paper P&L with `get_positions` and `get_gainloss`
- Build confidence in signal quality

#### Phase 3: Live Execution (Requires Approval)
- Automated trade execution with human-in-the-loop confirmation
- Position sizing based on account balance
- Risk management rules (max position size, daily loss limits)

---

## 6. Example Workflows

### Flow 1: Options Chain Analysis
```
User: "Analyze NVDA options for next month"

Claude → Tradier MCP:
  1. get_market_quotes(symbols="NVDA") 
  2. get_options_chain(symbol="NVDA", expiration="2026-02-28", greeks=true)
  
Claude → User:
  "NVDA @ $145.32. Here's the chain analysis:
   - ATM calls: IV 45%, Delta 0.52
   - Put skew suggests downside hedging
   - Recommend bull call spread 145/155..."
```

### Flow 2: Execute a Spread
```
User: "Open that bull call spread, 1 contract"

Claude → Tradier MCP:
  place_multileg_option_order(
    account_id="xxxxx",
    class="multileg",
    symbol="NVDA",
    type="debit",
    duration="day",
    legs=[
      {side: "buy_to_open", option_symbol: "NVDA260228C00145000", quantity: 1},
      {side: "sell_to_open", option_symbol: "NVDA260228C00155000", quantity: 1}
    ],
    price=3.50
  )

Claude → User:
  "Order submitted: NVDA Feb 145/155 bull call spread @ $3.50 debit.
   Order ID: 12345. Status: pending."
```

### Flow 3: Portfolio Review
```
User: "How are my options positions doing?"

Claude → Tradier MCP:
  1. get_positions(account_id="xxxxx")
  2. get_market_quotes(symbols=position_symbols)
  3. get_gainloss(account_id="xxxxx")

Claude → User:
  "Current positions:
   - NVDA 145/155 spread: +$120 (+34%)
   - AAPL 180 puts: -$50 (-15%)
   Total P&L: +$70"
```

---

## 7. Community Alternatives

### blake365/options-chain
- **Purpose:** Options chain data via Tradier Sandbox API
- **Limitations:** Sandbox only, no trading, 15-min delay
- **Use case:** Learning, demos
- **URL:** https://github.com/blake365/options-chain

### wshobson/maverick-mcp
- **Purpose:** Comprehensive stock analysis with backtesting
- **Data source:** Tiingo (not Tradier)
- **Features:** 39+ tools, technical analysis, portfolio tracking
- **Use case:** Analysis complement (not execution)
- **URL:** https://github.com/wshobson/maverick-mcp

**Recommendation:** Use official Tradier MCP for execution + Maverick MCP for advanced analysis.

---

## 8. Security Considerations

### API Key Protection
- Never commit API keys to git
- Use environment variables or secure config
- Consider rotating keys periodically

### Trading Safeguards
- Start with `PAPER_TRADING: true`
- Implement position size limits
- Add human confirmation for orders over threshold
- Log all trades for audit trail

### Risk Management Rules (Suggested)
```python
MAX_POSITION_SIZE = 0.10  # 10% of account per position
MAX_DAILY_LOSS = 0.02     # 2% account daily loss limit
REQUIRE_CONFIRMATION = True  # Human confirms before execution
```

---

## 9. Next Steps

### Immediate Actions
1. [ ] Sign up for Tradier account (if needed)
2. [ ] Get API keys from https://web.tradier.com/user/api
3. [ ] Configure MCP in Claude Code:
   ```bash
   claude mcp add --transport http tradier https://mcp.tradier.com/mcp \
     --header "API_KEY: $TRADIER_API_KEY" \
     --header "PAPER_TRADING: true"
   ```
4. [ ] Test with paper trading account

### Development Tasks
1. [ ] Update Options Analyst to use Tradier for live Greeks
2. [ ] Build position tracking integration
3. [ ] Create trade execution workflow with confirmations
4. [ ] Add paper trading performance dashboard

### Documentation
- Tradier MCP Docs: https://docs.tradier.com/docs/tradier-mcp
- Tradier API Reference: https://docs.tradier.com
- LLMs.txt (for context): https://docs.tradier.com/llms.txt

---

## 10. Verdict

**This is exactly what we need.** 

Tradier's official MCP server provides:
- ✅ Real-time market data with Greeks
- ✅ Full options trading (including multi-leg)
- ✅ Paper trading for safe testing
- ✅ Official support (not community hack)
- ✅ Works with Claude Code out of the box

Combined with our Options Analyst's analysis capabilities, we can build a true AI-native trading system:
- **Analysis** → Options Analyst generates ideas
- **Validation** → Tradier MCP provides live data
- **Execution** → Tradier MCP places orders
- **Monitoring** → Tradier MCP tracks positions

**This could genuinely be a game-changer.** 🚀
