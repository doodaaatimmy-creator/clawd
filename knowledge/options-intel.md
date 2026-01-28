# Options Intelligence

Continuous market intel gathering.

---

## Cycle 1 - 2026-01-28 11:42 UTC

### 🚨 MAJOR NEWS: Polygon.io → Massive Rebrand
- **Polygon.io options API now redirects to massive.com**
- New entity: "Massive" - same infrastructure, new name
- They still co-locate with OPRA, process ~3TB options data daily
- Cover all 17 US options exchanges
- Futures options coming soon
- URL: https://massive.com/docs/rest/options/overview

### 📊 GEX Analysis Tools (GitHub)
Found **27 public repos** for gamma exposure:

| Repo | Stars | Description |
|------|-------|-------------|
| `Matteo-Ferrara/gex-tracker` | 170 ⭐ | Dealers' GEX tracker |
| `Proshotv2/Gamma-Vanna-Options-Exposure` | 14 ⭐ | Dash app for GEX/VEX using Tradier API |
| `GMestreM/gex_dashboard` | 3 ⭐ | SPX GEX visualization |
| `GMestreM/gex_data` | 5 ⭐ | API for SPX options from CBOE, calculates GEX |
| `Nicholas-Battista/SPX_Gamma_Exposure` | 4 ⭐ | CSV upload → GEX chart (CBOE 15min delay) |
| `thechuck88/gamma-gex-scalper` | 3 ⭐ | **UPDATED YESTERDAY** - SPX 0DTE scalper using GEX signals |
| `pikki622/gex-analytics` | 2 ⭐ | GEX analytics for major indices |

**Best candidates for integration:**
1. `gex-tracker` - most mature (170 stars)
2. `gamma-gex-scalper` - actively maintained, 0DTE focus
3. `Gamma-Vanna-Options-Exposure` - already uses Tradier API

### 📈 IV Surface & Volatility Tools

| Repo | Description |
|------|-------------|
| `George-Dros/Volatility_Surface` | Streamlit IV surface visualizer (Yahoo + Black-Scholes) - **Updated Jan 2026** |
| `hyobyun/VolSurface` | 3D Vol surface in browser (JavaScript) |
| `tyrneh/options-implied-probability` | Computes market expectations from options data - **Updated Jan 2026** |
| `marcdemers/py_vollib_vectorized` | Vectorized vol calculations for pandas/numpy |
| `jasonstrimpel/volatility-trading` | Full volatility estimator suite (Sinclair's book) |
| `lyndskg/black-scholes-cpp` | C++ Black-Scholes with Greeks, IV, Heston model |

### 🏛️ Congressional Trading Intel
**QuiverQuant** (https://www.quiverquant.com/congresstrading/)
- Tracks STOCK Act disclosures (45-day filing requirement)
- Parses trades, calculates politician returns
- Shows backtested performance (with disclaimers)
- Metrics: Alpha, Sharpe, Max Drawdown, Win Rate
- **Potential integration**: Their data could flag stocks politicians are accumulating

### 🔧 Data APIs & Brokers

**Tradier** - NOW HAS MCP SERVER!
- URL: https://tradier.com
- Free market data API
- MCP Server = can connect directly to LLMs
- Already used by `Gamma-Vanna-Options-Exposure` repo
- **This is huge for AI-powered options analysis**

**Unusual Whales** (https://unusualwhales.com/live-options-flow)
- Live options flow feed
- Unusual activity detection
- Paid service, but popular in retail community

**Yahoo Finance via yfinance**
- `ranaroussi/yfinance` - most popular Python options data lib
- Free, no API key needed
- Includes WebSocket streaming
- Disclaimer: personal use only

### 🛠️ Notable Options Trading Platforms (Open Source)

| Repo | Stars | Description |
|------|-------|-------------|
| `nautechsystems/nautilus_trader` | High | High-perf algo trading platform (Rust) |
| `jmfernandes/robin_stocks` | High | Robinhood API wrapper |
| `michaelchu/optopsy` | Med | Options backtesting library |
| `tastyware/tastytrade` | Med | Unofficial Tastytrade SDK |
| `stoqey/ib` | Med | Interactive Brokers API (Node/TS) |
| `rburkholder/trade-frame` | Med | C++17 trading with IB, Alpaca, libtorch/CUDA |
| `guanquann/Stocksera` | Med | 60+ alternative data sources |

### 📋 Action Items for Next Cycles
1. **Deep dive**: `gex-tracker` repo - can we integrate?
2. **Research**: Tradier MCP server documentation
3. **Check**: Massive.com pricing vs old Polygon pricing
4. **Find**: Reddit discussions on options flow tools
5. **Search**: DEX (delta exposure) specific tools
6. **Monitor**: Congressional trading recent activity

---

## Cycle 2 - 2026-01-28 11:44 UTC

### 🎯 Deep Dive: gamma-gex-scalper (Production Ready!)

**Repo**: `thechuck88/gamma-gex-scalper`
- Created: 2026-01-10 (brand new!)
- Purpose: SPX/NDX 0DTE options scalper using GEX signals

**Backtest Results (1-year, $25k starting capital):**

| Index | Final Balance | ROI | Win Rate | Profit Factor | Avg Winner |
|-------|---------------|-----|----------|---------------|------------|
| NDX | $290,076 | **+1,060.3%** | 87.6% | 10.36 | $325.64 |
| SPX | $110,551 | +342.2% | 90.8% | 5.55 | $111.74 |

**Key Features:**
- Multi-index support (SPX, NDX, RUT, DJX)
- Index-agnostic codebase with config registry
- GEX pin strategy for calls/puts/iron condors
- Risk management: 50% TP, 10% SL, trailing stops
- Progressive hold: 80%+ profit → hold to expiration
- Half-Kelly position sizing (autoscaling)
- Discord alerts integration
- Systemd service templates included

**Why NDX outperforms (3.1x better):**
- 25-point spreads vs 5-point = 5x larger credits
- Higher tech volatility = higher premiums
- Stronger trends = GEX pin more effective

**Recommendation**: Allocate 70% NDX, 30% SPX for optimal risk/reward

### 🤖 Tradier MCP Server (Launched Dec 22, 2025!)

**Official Launch**: December 22, 2025
**URL**: https://tradier.com/individuals/mcp-server
**Docs**: https://docs.tradier.com/docs/tradier-mcp

**What it does:**
- Connects LLMs (Claude, ChatGPT, Cursor, Gemini) directly to Tradier API
- Zero-trust development, production-ready
- Real-time market data access
- Account retrieval
- Trade execution via natural language

**Compatibility:**
- Claude ✓
- ChatGPT ✓
- Cursor ✓
- Gemini ✓
- More integrations planned

**Quote from CEO Dan Raju:**
> "Developers can plug their trading logic and agents directly into their LLMs and begin building immediately without infrastructure overhead."

⚠️ **THIS IS HUGE**: First broker with native MCP integration for agentic AI trading!

### 📊 Deep Dive: Gamma-Vanna-Options-Exposure

**Repo**: `Proshotv2/Gamma-Vanna-Options-Exposure`
- Uses Tradier API for real-time options chain
- Calculates GEX, VEX (Vanna Exposure), DEX (Delta Exposure)
- Dash-based web dashboard

**Key Formulas Documented:**

**GEX (Gamma Exposure):**
```
GEX = Gamma × OI × 100 × (Spot Price)²
```

**Vanna Calculation:**
```python
d1 = (log(S/K) + (r - q + 0.5 * σ²) * T) / (σ * √T)
d2 = d1 - σ * √T
Vanna = exp(-q * T) * N'(d1) * (d2 / σ)
```

**VEX (Vanna Exposure):**
```
VEX = Vanna × OI × 100 × Spot
```

**Dependencies:**
- `py_vollib_vectorized` for IV calculation
- Black-Scholes model for pricing
- Credits `aaguiar10/gflows` for inspiration

**Limitations:**
- Requires manual daily updates of QQQ_Close and NQ_Close
- OAuth token hardcoded (needs env var)

### 📊 gex-tracker (Simple but Proven)

**Repo**: `Matteo-Ferrara/gex-tracker` (170 ⭐)
- Scrapes CBOE website for option data
- Basic GEX calculation

**Formula (dealers long calls, short puts):**
```
Call GEX = spot × gamma × OI × contract_size × spot × 0.01
Put GEX = -spot × gamma × OI × contract_size × spot × 0.01
```

**Output:**
- Total notional GEX (e.g., $-38.1 Bn)
- Gamma by strike chart
- Gamma by expiration chart  
- 3D surface visualization

**Pros**: Simple, minimal dependencies (pandas, requests, matplotlib)
**Cons**: No live data, scrapes website

### 📋 Action Items for Cycle 3
1. **Search**: Reddit r/options, r/algotrading for flow discussions
2. **Check**: Delta exposure (DEX) specific tools
3. **Research**: Massive.com (ex-Polygon) pricing tiers
4. **Find**: Open source alternatives to Unusual Whales
5. **Explore**: Congressional trading data APIs

---

## Cycle 3 - 2026-01-28 11:45 UTC

### 📢 Reddit Intel: Options Flow Tools (2025)

**Popular flow screeners mentioned on r/options:**

| Tool | Notes |
|------|-------|
| **Cheddar Flow** | Many good opinions, popular choice |
| **Tradevision** | Steady real-time updates, good for algo integration |
| **Unusual Whales** | Best GEX/VEX coverage + flows screener |
| **Tradytics** | More versatile, dark pool tracking, algo flow/CTA tracking |
| **BlackBoxStocks** | Flow screener option |
| **FlowAlgo** | Flow screener option |
| **ThinkorSwim** | Free! Can create custom scans for option volume tracking |

**Key insight from Reddit:**
> "Unusual Whales seems to be a bit better on the options coverage (the GEX, VEX side of things + flows screener)"
> "Tradytics has a lot of cool info on the options dashboard (algo line charts, net premium, call vs put OI chart)"

**User-built tools:**
- One user built a script synthesizing unusual activity, insider moves, options flow, sentiment, and TA with a confidence score (Oct 2025)

### 📊 DEX (Delta Exposure) Deep Dive

**Source**: TradingFlow documentation (https://doc.tradingflow.com)

**What is DEX?**
Delta Exposure translates option positions into equivalent shares:
- +500 DEX = behaves like owning 500 shares
- -500 DEX = behaves like shorting 500 shares

**Why DEX > Premium:**
- Premium affected by time decay, IV, rates, intrinsic value
- DEX shows **true directional intent** behind trades
- Cuts through external noise

**Why DEX > Notional Value:**
- Notional shows cost, not impact
- DEX shows how much trade actually moves with stock
- Better indicator of true market influence

**DEX Imbalance Formula:**
```
Net Delta Exposure = Total Positive Delta – Total Negative Delta
```
- Positive = bullish pressure
- Negative = bearish pressure

**Positive Delta Trades:**
- Buying calls
- Selling puts
- Buying call spreads
- Selling credit put spreads

**Negative Delta Trades:**
- Selling calls
- Buying puts
- Selling call spreads
- Buying put spreads

### 🤖 Delta Hedging Tools (22 GitHub Repos)

**Best Finds:**

| Repo | Description |
|------|-------------|
| `hedge0/OptionsKillerBotPython` | **LIVE TRADING BOT** - finds mispriced options via Schwab API, auto delta hedges |
| `Solstice-Designs/ScalpNet-v1` | Pinpoints intraday highs/lows using Auction Market Theory + delta-weighted volume (0DTE) |
| `schepal/delta_hedge` | Delta-hedging for crypto options on Deribit |
| `pinouche/trading` | Dynamic delta hedging using IBKR API (Updated Oct 2025) |
| `vivek-v-rao/DeltaHedging` | Delta hedging with transaction costs (C++) - Updated Mar 2025 |
| `kgeoffrey/AutoHedge.jl` | Automatic options hedging in Julia |
| `cteufel13/risk-neutral-hedging` | Deep dive into delta/gamma/vega hedging - **Updated Jul 2025** |

**OptionsKillerBot Details:**
- Uses Schwab API + FRED API
- Finds mispriced options by fitting IV models (RBF, RFV)
- Filters by bid price, IV, open interest
- Auto submits limit orders
- Delta hedges filled positions automatically
- Config via stocks.json

**ScalpNet-v1 (Vue-based):**
- Auction Market Theory implementation
- Delta-weighted volume analysis
- 0DTE option chain focus
- Predicts intraday highs/lows

### 📋 Action Items for Cycle 4
1. **Research**: Massive.com pricing vs old Polygon
2. **Find**: Open source unusual activity detection
3. **Check**: Congressional trading APIs (Capitol Trades, etc.)
4. **Deep dive**: ScalpNet-v1 for 0DTE signals
5. **Explore**: Crypto options tools (Deribit ecosystem)

---

## Cycle 4 - 2026-01-28 11:46 UTC

### 🏛️ Congressional Trading APIs & Tools

**APIs Available:**

| Provider | Endpoint | Notes |
|----------|----------|-------|
| **Finnhub** | `/congressional-trading` | Free tier available |
| **AInvest** | `/ownership/congress` | REST API, by ticker |
| **Financial Modeling Prep** | Senate Trading API | Also has House trades |

**AInvest API Details:**
- Tracks trades >$1000 under STOCK Act
- 45-day filing requirement
- Filter by ticker symbol
- Pagination support

**Use Cases:**
- Monitor senator stock purchases before favorable legislation
- Track House member patterns around regulatory announcements
- Analyze timing between committee hearings and transactions
- Identify late filers (beyond 45 days)

**Open Source Project: `burd5/congress_stock_trading`**
- Full ELT pipeline on AWS (ECR, ECS, Fargate, EventBridge)
- Scrapes Senate + House websites
- Uses Selenium, BeautifulSoup, PyPDF for House PDFs
- DBT transformations
- Flask API + React frontend
- Weekly scheduled updates
- Supabase DB storage

**Challenges noted:**
- House trades in PDFs (hard to extract)
- Politician name variations (William vs Bill Cassidy)
- Used PDFPlumber (also tried Camelot, Tabula)
- Considering LlamaParse for scanned images

### 📊 ScalpNet-v1 Deep Dive (0DTE Analytics)

**Repo**: `Solstice-Designs/ScalpNet-v1`
**Tech**: Vue.js + Python + ThinkorSwim

**Features:**
- Delta-weighted volume visualization (calls/puts by strike)
- Net delta analysis (Calls - Puts)
- Liquidity cliff identification
- Ghost bars for 1, 3, 5-min historical overlays
- Current price marker with slider
- 8-second refresh rate

**How it works:**
1. ThinkorSwim + Excel sheet exports options data
2. Excel saves to CSV every 4 seconds
3. Python reads/processes CSV
4. Vue frontend renders Plotly charts
5. Highlights liquidity events

**Architecture:**
```
ScalpNet/
├── backend/
│   ├── data_handler.py   # Excel → CSV
│   └── data_scheduler.py # Every 8 sec
├── frontend/
│   └── ScalpNetDashboard.vue
└── Excel Makeshift API
```

**Future plans:**
- Real API (Schwab)
- Add GEX and Vanna metrics
- WebSocket for real-time
- Alert notifications

### 🪙 Crypto Options GEX Tools

**CryptoGamma.io**
- Real-time BTC options GEX dashboard
- Deribit data
- Put/Call ratio, Put Skew
- API coming soon

**Glassnode** (New! ~2 weeks ago)
- **Taker-Flow-Based Gamma Exposure**
- Flow-first approach (not heuristics)
- BTC, ETH, SOL, XRP, PAXG coverage
- 10-minute resolution
- Tracks dealer positioning through actual trade flow

**Why crypto GEX is different from TradFi:**
- Equity heuristic fails (calls = investor short) doesn't apply
- Crypto traders actively BUY calls to speculate
- Puts traded tactically, not just as hedges
- Crypto venues show who is taker on each trade

**Glassnode Key Concepts:**

**Positive GEX (near spot):**
- Dealers long gamma
- Buy dips, sell rallies
- Creates "pinning" effect
- Mean-reverting, "sticky" zone
- Lower realized vol

**Negative GEX (near/below spot):**
- Dealers short gamma
- Sell into weakness, buy into strength
- Amplifies moves
- "Slippery" regime
- Wider stops needed

**Gamma Flip:**
- When net GEX changes sign around spot
- Transition from pinned to directional regime
- Key trading signal

**Other Crypto GEX Sources:**
- **Laevitas** (https://app.laevitas.ch/assets/options/gex/btc/deribit)
- **Amberdata** (https://pro.amberdata.io/options/deribit/btc/gamma-exposure/)

### 📋 Action Items for Cycle 5
1. **Search**: More unusual activity detection tools
2. **Research**: IV surface visualization live tools
3. **Check**: 0DTE specific strategies/patterns
4. **Find**: Options backtesting frameworks
5. **Explore**: Dark pool flow integration options

---

## Cycle 5 - 2026-01-28 11:47 UTC

### 🧪 Options Backtesting Frameworks

**General Python Backtesting:**
| Framework | Notes |
|-----------|-------|
| **Backtrader** | Feature-rich, open source |
| **Backtesting.py** | Simple, good docs |
| **pysystemtrade** | From "Systematic Trading" book, IB integration |

**Options-Specific: Optopsy**
`michaelchu/optopsy` - **The** options backtesting library

**Features:**
- Generate all strategy combinations automatically
- Supports: Calls/Puts, Straddles/Strangles, Vertical Spreads
- Uses any data source (just needs Pandas DataFrame)
- Returns statistics on % changes by DTE and OTM ranges

**Example output columns:**
- dte_range (e.g., (0, 7], (7, 14])
- otm_pct_range (e.g., (-0.1, -0.05])
- count, mean, std, min/max, percentiles

**Data source:**
- DeltaNeutral provides free historical options data
- https://historicaloptiondata.com/free-data/

### 🌑 Dark Pool Tracking Tools (2025 Comparison)

**Best 11 Dark Pool Trackers:**

| Tool | Best For | Price | Notes |
|------|----------|-------|-------|
| **Options Trading Toolbox** | All-in-one | Free | Dark pools + GEX + backtests |
| **CheddarFlow** | Live sweep tape | Paid | Strong real-time |
| **Unusual Whales** | Dark pool + options | Paid | Popular, visual charts |
| **FlowAlgo** | Fast intraday alerts | Paid | Tape-style feed |
| **Tradytics** | AI dashboards | Paid | Many overlays, alerts |
| **BlackBoxStocks** | Community calls | Paid | Audio alerts, chatroom |
| **CheddarQuant** | Quant/programmatic | Paid | APIs, custom filtering |
| **Market Chameleon** | Earnings research | Paid | Historical analysis |
| **ThinkorSwim** | DIY/free | Free | Custom scripts possible |
| **Bloomberg Terminal** | Institutional | $25k/yr | Full depth, overkill |
| **SpotGamma** | GEX + dark pool | Paid | Gamma wall confluence |

**Key insight:**
> "Dark pool prints reveal where hedge funds quietly transact away from public exchanges. Watching these orders tips you off to institutional accumulation/distribution, hidden positioning, insiders loading ahead of catalysts."

**Quant Data (quantdata.us):**
- Live flow, dark pool prints, gamma curves
- Instant alerts
- Discord community testimonials: "+$16k best month", "15 years trading, QD took it to another level"

### 📊 What Dark Pools Reveal
- Hidden bullish/bearish positioning
- Massive support/resistance zones
- Soon-to-be breakout levels
- Institutional accumulation before catalysts

### 📋 Action Items for Cycle 6
1. **Research**: IV surface live visualization tools
2. **Find**: 0DTE specific patterns/strategies
3. **Check**: More open source flow tracking
4. **Explore**: Options sentiment indicators
5. **Deep dive**: SpotGamma's methodology

---

## Cycle 6 - 2026-01-28 11:47 UTC

### 📊 IV Surface Visualization Tool

**Repo**: `George-Dros/Volatility_Surface` (23 ⭐)
Updated Jan 2026 - Streamlit app

**Features:**
- 3D IV surface visualization
- Yahoo Finance data (yfinance)
- Black-Scholes IV calculation
- Configurable inputs:
  - Risk-free rate
  - Dividend yield
  - Strike range filter
- Y-axis options: Strike price or log-moneyness
- Axes: Time to expiry (X), Strike/Moneyness (Y), IV% (Z)

**Use Cases:**
- Volatility smile/skew inspection
- Scenario testing (change r, q)
- Learning tool for options

**Limitations:**
- Calls only (puts planned)
- Can be noisy for illiquid options
- Depends on Yahoo data quality

**Future plans:**
- Add puts + put/call parity
- Liquidity filters (volume/OI/spread)
- Surface export (CSV + image)
- SVI model fits

### ⚡ 0DTE Gamma Scalping Strategies

**Source**: 0-dte.com + Option Alpha

**The Gamma Squeeze Strategy (0-dte.com)**

*When*: Late day, 2:00-3:00 PM ET
*What*: OTM butterfly against structural level (HVN/LVN)
*Why*: High gamma + accelerated theta decay

**Performance Claims:**
- 114% return over 18 months
- Sharpe ratio: 5.87
- Win rate: 50%
- Winner:Loser ratio: 1.7:1

**Entry Mechanics:**
1. Map volume profile (HVNs = consolidation, LVNs = trend zones)
2. Wait for price to approach key level (e.g., 5,822)
3. Use divergence tool (linear regression + volume + volatility)
4. Place OTM butterfly just outside level

**Risk Management:**
- $300-$600 risked per butterfly
- 50% trailing stop late-day
- Tighten to 30% near 3:30 PM
- Let losers expire worthless

**Why it works:**
- Late day = theta beast mode
- Near-ATM gamma spikes
- 2-3 point move → $300 → $500-$1000
- Low vol (VIX 8-17): Easy, gamma screaming
- High vol (VIX 28+): Trickier but still works

### 🎓 Option Alpha: 0DTE Gamma Insights

**Mat Cashman (OIC) Key Points:**

**0DTE characteristics:**
- "Gamma-rich" but virtually no vega
- Highly sensitive to time decay and settlement price
- ATM strikes near expiration = greatest gamma weight

**Market maker perspective:**
- Hedge deltas minute-by-minute
- Use futures/stocks to offset exposure
- What matters: residual position at each strike

**Trading insights:**
- Treat gamma like weather: "know if it's sunny, don't stare at the sun"
- Should enhance awareness, not dominate decisions
- High gamma = "potential energy" ready to move rapidly
- At-the-money near expiration = max reactivity

**Charm (Delta Decay):**
- Measures how delta changes as time passes
- Creates reinforcing cycles that amplify volatility
- Can cause flash crashes or sudden rallies

### 📋 Action Items for Cycle 7
1. **Search**: SpotGamma methodology/tools
2. **Find**: Volatility term structure tools
3. **Check**: More sentiment indicators
4. **Research**: Skew analysis tools
5. **Explore**: Options payoff visualization

---

## Cycle 7 - 2026-01-28 11:48 UTC

### 🎯 SpotGamma Methodology

**Free Tools:**
- SPX Gamma Exposure curve (https://spotgamma.com/free-tools/spx-gamma-exposure/)
- Standard net gamma curve

**Key Assumptions:**
- Dealers short puts, long calls
- Used as volatility estimate
- Map for large put/call positions

**Proprietary Metrics:**
- **SIV Index** (SpotGamma Implied Volatility)
- Improved volatility forecasting
- Based on S&P 500 gamma + IV changes + price movement

**HIRO Indicator:**
- Real-time options data
- See when options drive stocks
- 0DTE filter for short-term trades

### 📊 OptionLab (Options Strategy Evaluator)

**Repo**: `rgaveiga/optionlab` - Updated Dec 2025
**Purpose**: Quick evaluation of options trading strategies

**Outputs:**
- Profit/loss profile on target date
- Profitable price range (minimum $0.01 return)
- Greeks for each leg (delta, theta, rho, vega, gamma)
- Debit/credit on account
- Max/min returns within price range
- Expected profit when profitable
- Expected loss when unprofitable
- Probability of profit

**Install**: `pip install optionlab`

### 📈 Vollib - The IV Foundation Library

**Website**: https://vollib.org/
**Foundation**: Peter Jäckel's **LetsBeRational**

**Why it's special:**
- Extremely fast and accurate IV calculation
- 2 iterations to max precision (64-bit)
- All possible inputs handled
- Fast cumulative normal distribution

**Features:**
- Black, Black-Scholes, Black-Scholes-Merton
- Analytical and numerical Greeks
- Pure Python (py_vollib) - Python 2.7 & 3.x compatible

**Versions:**
- `py_vollib` - Python
- `j_vollib` - Java
- `js_vollib` - JavaScript

**Note**: Uses Numba for near-C performance

### 📊 Volatility Term Structure & Skew (PyQuant Tutorial)

**Using OpenBB SDK:**
```python
from openbb_terminal.sdk import openbb

# Download options chains
chains = openbb.stocks.options.chains("SPY", source="YahooFinance")
expirations = openbb.stocks.options.expirations("SPY")
```

**Term Structure Interpretation:**

**Upward sloping (normal):**
- Higher future uncertainty
- Event risk (earnings, economic data)
- More time premium = higher IV

**Spike in curve:**
- Options expiring next week
- Traders repositioning/speculating

**Skew Interpretation:**

**Negative skew:**
- Market preparing for drop
- OTM puts bid up for downside protection

**Volatility smile:**
- Expecting big move either direction
- Common around earnings/news events

### 📚 Key Python Libraries Stack

| Library | Purpose |
|---------|---------|
| `py_vollib` | IV calculation (LetsBeRational) |
| `py_vollib_vectorized` | Vectorized IV for pandas/numpy |
| `optionlab` | Strategy evaluation |
| `optopsy` | Options backtesting |
| `yfinance` | Free options data |
| `openbb` | Comprehensive finance SDK |
| `plotly` | 3D IV surface visualization |

### 📋 Action Items for Cycle 8
1. **Search**: Options sentiment indicators
2. **Find**: Put/call ratio tracking tools
3. **Check**: VIX term structure analysis
4. **Research**: Options max pain calculators
5. **Explore**: Machine learning for options

---

## Cycle 8 - 2026-01-28 11:49 UTC

### 💊 Max Pain Calculators

**Max Pain Theory:**
> Price gravitates to strike where option holders experience maximum losses and writers have minimal payout obligations.

**1. Python CLI Tool**
`asad70/Options-Max-Pain-Calculator`

**Features:**
- Command line interface
- Uses yfinance for data
- Returns max pain range + put/call ratio

**Calculation Method:**
1. For each ITM strike (puts & calls):
   - Find difference between stock price and strike
   - Multiply by open interest
   - Add put + call dollar value
2. Repeat for each strike
3. Highest value = max pain

**Trading use:**
- Write calls above max pain
- Write puts below max pain
- Collect premiums

**2. Deribit Max Pain (Crypto)**
`cryptarbitrage-code/deribit-max-pain`

**Features:**
- Uses Deribit API for crypto options
- BTC, ETH, SOL support
- Tkinter GUI + Matplotlib charts
- Multiple expiry selection

**3. TradingView Indicator (BackQuant)**
Open source Pine Script indicator!

**Features:**
- Max pain line visualization
- Strike level grid
- Pin zone highlighting
- Pain heatmap
- Gamma exposure profile
- Real-time dashboard

**Uses synthetic modeling since Pine Script can't access live options data**

**Display Elements:**
- Red line = Max pain level
- Colored zone = Pin risk area
- Dotted lines = Major strikes (green=support, orange=resistance)
- Yellow dotted = Gamma flip level
- Dashboard: Distance to pain, pin risk (HIGH/MEDIUM/LOW)

**Trading Applications:**
- Expiration pinning near max pain
- High OI strikes as support/resistance
- Above gamma flip = dampened vol
- Below gamma flip = amplified moves

### 📊 Options Greeks Tools (GitHub)

| Repo | Description |
|------|-------------|
| `TanvirDeol/Crypto-Option-Chain-Analyzer` | Real-time crypto options, IV vs HV, historical Greeks |
| `SuryanshGarg12/OptionAnomalyDetection` | Detects IV spikes, mispricings, gamma spikes → CSV output |
| `saimanish-p/options-pricing-and-greeks` | Interactive Black-Scholes + Monte Carlo visualization |
| `kupietools/theta-surface-toy` | Theta/delta vs DTE graphing (single page app) |
| `JesusAlMM/Volatility-Surface` | Streamlit IV surface + Greeks explorer |

### 🔍 OptionAnomalyDetection Details
`SuryanshGarg12/OptionAnomalyDetection`

**Detects:**
- IV spikes
- Mispricings
- Price jumps
- Spread widenings
- Gamma spikes

**Output:**
- CSV files
- Diagnostic plots

**Potential integration for unusual activity detection!**

### 📋 Summary: Best Tools by Category

| Category | Top Pick | Runner-up |
|----------|----------|-----------|
| **GEX Calculation** | `gex-tracker` | `gamma-gex-scalper` |
| **IV Surface** | `Volatility_Surface` | `JesusAlMM/Volatility-Surface` |
| **Backtesting** | `optopsy` | `optionlab` |
| **Max Pain** | `Options-Max-Pain-Calculator` | BackQuant TradingView |
| **Greeks Calc** | `py_vollib` | `py_vollib_vectorized` |
| **Data Source** | `yfinance` | Tradier API |
| **Congressional** | `congress_stock_trading` | AInvest API |
| **Delta Hedging** | `OptionsKillerBotPython` | `ScalpNet-v1` |
| **Dark Pool** | Options Trading Toolbox | Unusual Whales |
| **Crypto GEX** | Glassnode | CryptoGamma.io |

### 🚀 HIGH PRIORITY INTEGRATIONS

1. **Tradier MCP Server** - Direct LLM ↔ broker connection
2. **gamma-gex-scalper** - Production-ready 0DTE trading
3. **OptionAnomalyDetection** - Unusual activity detection
4. **Volatility_Surface** - Streamlit IV visualization
5. **optopsy** - Strategy backtesting

---

## Intel Gathering Summary

**Cycles Completed**: 8
**Lines of Intel**: 850+
**Key Discoveries**:
- Polygon.io → Massive rebrand
- Tradier MCP Server (Dec 2025) - game changer for AI trading
- gamma-gex-scalper: 1000%+ ROI backtest
- Glassnode taker-flow GEX for crypto
- Full stack of open source options tools identified

**Continuing intel loop...**

---

## Cycle 9 - 2026-01-28 11:50 UTC

### 🔬 OptionAnomalyDetection Deep Dive

**Repo**: `SuryanshGarg12/OptionAnomalyDetection`
**Updated**: May 2025
**Colab**: Available!

**5 Anomaly Types Detected:**

| Type | What It Detects |
|------|-----------------|
| **IV Spike** | Abnormal implied volatility jumps indicating sentiment change |
| **Mispricing** | Market mid vs Black-Scholes theoretical deviation (arbitrage opportunities) |
| **Price Jump** | Sudden significant price changes exceeding normal movements |
| **Spread Widening** | Unusual bid-ask expansion (liquidity issues, uncertainty) |
| **Gamma Spike** | Abnormal gamma increases (heightened price sensitivity) |

**Output Files:**
- `anomaly_results.csv` - Timestamp, instrument, type, z-score
- `anomaly_summary.csv` - Counts per instrument/type
- `anomaly_type_summary.csv` - Overall type counts
- `anomaly_plots/<INST>.png` - 5-panel diagnostic plots

**Data Fields Used:**
- `best_bid`, `best_offer`, `ltp`
- `bid_iv`, `ask_iv`, `iv`, `iv_ema60`
- `delta`, `gamma`, `theta`, `vega`

**THIS IS EXACTLY WHAT WE NEED FOR UNUSUAL ACTIVITY DETECTION!**

### 📚 More Options Pricing Tools (191 repos)

| Repo | Description |
|------|-------------|
| `jkirkby3/fypy` | Vanilla + exotic options pricing library, model calibration |
| `ilchen/options-pricing` | European/American options with free datasets (Updated Jan 2026) |
| `pratik141/nsedt` | NSE (Indian market) options data in pandas |
| `baileydanseglio/thetadata-python` | Real-time & historical US options data API |
| `JuliaComputing/Miletus.jl` | Financial contracts in Julia |
| `rahuljoshi44/GraphVega` | Open source options analytics platform |
| `ChiragJhawar/ProjectReward` | Options spread finder with payoff graphs |

### 🎓 MIT Thesis: Deep RL for Options

**Repo**: `samsonq/Thesis`
**Title**: "Multi-Agent Deep Reinforcement Learning and GAN-Based Market Simulation for Derivatives Pricing and Dynamic Hedging"

**Research combining:**
- Multi-agent reinforcement learning
- GANs for market simulation
- Derivatives pricing
- Dynamic hedging

### 🛠️ Complete Tool Integration Roadmap

**Phase 1: Data Foundation**
1. Set up Tradier API (free tier) or Massive/Polygon
2. Integrate yfinance for historical data
3. Configure real-time WebSocket feeds

**Phase 2: Core Analytics**
1. Deploy `gex-tracker` for GEX calculation
2. Run `Volatility_Surface` for IV visualization
3. Implement `Options-Max-Pain-Calculator`
4. Add `optopsy` for backtesting

**Phase 3: Signal Detection**
1. **OptionAnomalyDetection** for unusual activity
2. Connect to QuiverQuant congressional API
3. Integrate dark pool data (Unusual Whales API?)

**Phase 4: Trading Automation**
1. **Tradier MCP Server** for LLM ↔ broker
2. `gamma-gex-scalper` for 0DTE strategies
3. `OptionsKillerBotPython` for delta hedging

**Phase 5: Advanced**
1. Build custom GEX/VEX dashboard (Dash/Streamlit)
2. Integrate crypto GEX (Glassnode/Laevitas)
3. ML-based signal generation

---

## Cycle 10 - 2026-01-28 11:50 UTC

### 📊 VIX Analysis Tools

| Repo | Description |
|------|-------------|
| `meixler/vix` | Python VIX calculator using CBOE White Paper method |
| `qlero/vix_index_modelization` | Jupyter implementation of VIX modeling |
| `aidinattar/Volatility-carry-trading-strategy` | Multi-factor vol models |
| `rediar/Calculate-VIX-ETF-RollDown-Value` | VIX ETF contango rolldown (SVXY, XIV) |
| `ellenicoleroberts/Modeling_the_VIX_with_LSTM` | **LSTM models to forecast VIX using SPX options** |
| `Andre-Luis-Lopes-da-Silva/CBOE-Volatility-Index-VIX-Monitor` | Real-time VIX monitor with voice alerts |

### 🤖 VIX LSTM Forecasting

**Repo**: `ellenicoleroberts/Modeling_the_VIX_with_LSTM`

**Features:**
- Multivariate, multistep LSTM models
- Uses SPX options data
- Forecasts CBOE VIX
- Includes Monte Carlo simulation
- Facebook Prophet forecasts for comparison

**This could be integrated for volatility regime prediction!**

### 🖥️ MyTradingView - Complete Options Platform

**Repo**: `mnsrulz/mytradingview`
**Stack**: Next.js + Prisma + PostgreSQL + Tradier API
**Live**: https://mztrading.netlify.app/

**Features:**
- Stock options analysis
- Delta/Gamma (DEX/GEX) charts
- Open Interest tracking
- Volume analysis
- Spot price monitoring

**Data Sources & Update Frequencies:**

| Data | Source | Frequency |
|------|--------|-----------|
| Delta/Gamma | Tradier | Every hour |
| Delta/Gamma | CBOE | Every 15 min |
| Open Interest | - | Overnight |
| Volume | Tradier | Live |
| Volume | CBOE | 15 min delay |
| Spot Price | Tradier | Real-time |
| Spot Price | CBOE | 15 min delay |

**Required Environment:**
- `TRADIER_TOKEN` - API key
- `POSTGRES_PRISMA_URL` - Database
- Supabase for free PostgreSQL

**This is a PRODUCTION-READY options dashboard we could fork/extend!**

---

## 📊 Final Intel Summary

**Total Cycles**: 10
**Lines of Intel**: 1000+
**Duration**: Continuous loop

### 🏆 Top Discoveries

1. **Polygon.io → Massive** rebrand (same great data, new name)
2. **Tradier MCP Server** (Dec 2025) - LLM ↔ broker direct connection
3. **gamma-gex-scalper** - Production 0DTE bot, 1000%+ backtested ROI
4. **OptionAnomalyDetection** - IV spikes, mispricings, gamma spikes
5. **Glassnode taker-flow GEX** - Proper crypto gamma exposure
6. **MyTradingView** - Complete Next.js options platform

### 📦 Recommended Tool Stack

**Core:**
- Data: Tradier API + yfinance + Massive
- GEX: gex-tracker + gamma-gex-scalper
- IV Surface: Volatility_Surface
- Backtesting: optopsy
- Greeks: py_vollib + py_vollib_vectorized

**Detection:**
- Unusual Activity: OptionAnomalyDetection
- Dark Pool: Unusual Whales / Options Trading Toolbox
- Congressional: AInvest API / congress_stock_trading

**Trading:**
- LLM Integration: Tradier MCP Server
- 0DTE: gamma-gex-scalper
- Delta Hedging: OptionsKillerBotPython

**Dashboard:**
- MyTradingView (fork-ready)
- ScalpNet-v1 for 0DTE

### 🔄 Loop Status: CONTINUING

Intel gathering will continue monitoring for:
- New GEX/VEX tools
- Options flow innovations
- API updates (Massive, Tradier)
- ML/AI options research
- Congressional trading patterns
- Unusual whale activity

---

## Cycle 11 - 2026-01-28 11:51 UTC

### 📚 Awesome ML Trading Resources

**Repo**: `grananqvist/Awesome-Quant-Machine-Learning-Trading`
**Curated list** of ML + Trading resources with favorites marked ⭐

**Top Books:**
- ⭐ **Marcos López de Prado** - Advances in Financial Machine Learning
- ⭐ **Dr Howard B Bandy** - Quantitative Technical Analysis
- ⭐ **Michael Halls-Moore** - Advanced Algorithmic Trading
- Stefan Jansen - Hands-On ML for Algorithmic Trading
- Ernest P. Chan - Machine Trading

**Online Courses:**
- Udacity + Georgia Tech - ML for Trading
- Udacity + WorldQuant - AI for Trading
- NYU on Coursera - Reinforcement Learning in Finance

**Key Papers:**
- ⭐ Marcos López de Prado - "The 10 reasons most ML Funds fail"
- ⭐ Marcos López de Prado - "Ten Financial Applications of ML"
- Artur Sepp - "ML for Volatility Trading"
- Zhuoran Xiong et al. - "Practical Deep RL for Stock Trading"

### 🤖 ML Trading Tools (GitHub)

| Repo | Description |
|------|-------------|
| `grananqvist/Awesome-Quant-Machine-Learning-Trading` | Curated resource list |
| `PFund-Software-Ltd/pytrade.org` | Python algo trading library list |
| `mrkingsleyobi/quantumedge` | **HFT platform**: FPGA (14ns), GPU TensorRT (<1ms), 350ns latency |
| `kb-90/AutoTrading-DDQNAgent` | Double Deep Q-Network crypto trader using OKX APIs |
| `sleeyax/ml-crypto-trading-bot` | Experimental ML crypto bot in Rust |

### ⚡ QuantumEdge HFT Platform

**Repo**: `mrkingsleyobi/quantumedge`

**Performance:**
- FPGA: 14ns FIX protocol
- GPU TensorRT: <1ms ML inference
- Lock-free architecture
- DPDK networking
- **350ns latency**
- **500K orders/sec**
- **99.99% uptime**

**This is serious institutional-grade infrastructure!**

### 📊 Top YouTube Channels for ML Trading

- ⭐ **Quantopian** - ML for trading webinars
- ⭐ **Siraj Raval** - Deep Learning for stock prediction
- **Sentdex** - Python for Finance + ML
- **QuantNews** - ML for Algo Trading series
- ⭐ **Chat with Traders** - Interviews with ML quants

### 🎯 Key Lessons from Resources

**From "The 10 Reasons ML Funds Fail":**
1. Insufficient domain expertise
2. Overfitting
3. Wrong data preprocessing
4. Non-stationary data
5. Wrong performance metrics
6. Ignoring transaction costs
7. Memory effects in time series
8. Regime changes
9. Survivor bias
10. Wrong validation methods

**ML Success Factors:**
- Feature engineering is critical
- Proper cross-validation for time series
- Transaction costs must be modeled
- Ensemble methods often work best
- Domain knowledge > fancy algorithms

---

## 📈 INTEL LOOP PAUSE - CYCLE 11 COMPLETE

**Total Intel Gathered:**
- 11 cycles completed
- 1100+ lines of intel
- 100+ tools/repos documented
- 50+ APIs/data sources identified
- 10+ trading strategies documented

**Loop will resume on next heartbeat or explicit request.**

**To continue**: Request more intel gathering
**To act**: Start implementing top-priority integrations

---
