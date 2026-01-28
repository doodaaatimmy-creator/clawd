#!/bin/bash
# Daily Dashboard - Morning Briefing for Winn
# Location: Durango, CO

set -e

# Colors
BOLD='\033[1m'
DIM='\033[2m'
CYAN='\033[36m'
YELLOW='\033[33m'
GREEN='\033[32m'
RED='\033[31m'
RESET='\033[0m'

CLAWD_DIR="${CLAWD_DIR:-$HOME/clawd}"

echo ""
echo -e "${BOLD}═══════════════════════════════════════════════════════${RESET}"
echo -e "${BOLD}  📊 DAILY DASHBOARD - $(date '+%A, %B %d %Y')${RESET}"
echo -e "${BOLD}═══════════════════════════════════════════════════════${RESET}"

# ─────────────────────────────────────────────────────────
# 🌤️ WEATHER
# ─────────────────────────────────────────────────────────
echo ""
echo -e "${CYAN}${BOLD}🌤️  WEATHER - Durango, CO${RESET}"
echo -e "${DIM}─────────────────────────────────────────────────────────${RESET}"

WEATHER=$(curl -s "https://api.open-meteo.com/v1/forecast?latitude=37.2753&longitude=-107.8801&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset&timezone=America/Denver&forecast_days=3&temperature_unit=fahrenheit&wind_speed_unit=mph" 2>/dev/null)

if [ -n "$WEATHER" ]; then
    CURRENT_TEMP=$(echo "$WEATHER" | jq -r '.current.temperature_2m // "?"')
    HUMIDITY=$(echo "$WEATHER" | jq -r '.current.relative_humidity_2m // "?"')
    WIND=$(echo "$WEATHER" | jq -r '.current.wind_speed_10m // "?"')
    HIGH=$(echo "$WEATHER" | jq -r '.daily.temperature_2m_max[0] // "?"')
    LOW=$(echo "$WEATHER" | jq -r '.daily.temperature_2m_min[0] // "?"')
    PRECIP=$(echo "$WEATHER" | jq -r '.daily.precipitation_probability_max[0] // "0"')
    SUNRISE=$(echo "$WEATHER" | jq -r '.daily.sunrise[0] // "?"' | cut -dT -f2)
    SUNSET=$(echo "$WEATHER" | jq -r '.daily.sunset[0] // "?"' | cut -dT -f2)
    
    echo -e "  ${BOLD}Now:${RESET} ${CURRENT_TEMP}°F  │  ${BOLD}High:${RESET} ${HIGH}°F  │  ${BOLD}Low:${RESET} ${LOW}°F"
    echo -e "  ${BOLD}Wind:${RESET} ${WIND} mph  │  ${BOLD}Humidity:${RESET} ${HUMIDITY}%  │  ${BOLD}Precip:${RESET} ${PRECIP}%"
    echo -e "  ${BOLD}☀️ Sunrise:${RESET} ${SUNRISE}  │  ${BOLD}🌙 Sunset:${RESET} ${SUNSET}"
else
    echo -e "  ${RED}Unable to fetch weather${RESET}"
fi

# ─────────────────────────────────────────────────────────
# 📈 MARKETS
# ─────────────────────────────────────────────────────────
echo ""
echo -e "${CYAN}${BOLD}📈 MARKETS${RESET}"
echo -e "${DIM}─────────────────────────────────────────────────────────${RESET}"

# Bitcoin from CoinGecko
BTC=$(curl -s "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true" 2>/dev/null)

if [ -n "$BTC" ]; then
    BTC_PRICE=$(echo "$BTC" | jq -r '.bitcoin.usd // 0 | floor')
    BTC_CHANGE=$(echo "$BTC" | jq -r '.bitcoin.usd_24h_change // 0 | . * 100 | round / 100')
    ETH_PRICE=$(echo "$BTC" | jq -r '.ethereum.usd // 0 | floor')
    ETH_CHANGE=$(echo "$BTC" | jq -r '.ethereum.usd_24h_change // 0 | . * 100 | round / 100')
    
    # Color based on change
    if (( $(echo "$BTC_CHANGE > 0" | bc -l) )); then
        BTC_COLOR=$GREEN
    else
        BTC_COLOR=$RED
    fi
    if (( $(echo "$ETH_CHANGE > 0" | bc -l) )); then
        ETH_COLOR=$GREEN
    else
        ETH_COLOR=$RED
    fi
    
    printf "  ${BOLD}BTC:${RESET}  \$%'d  ${BTC_COLOR}(%+.2f%%)${RESET}\n" "$BTC_PRICE" "$BTC_CHANGE"
    printf "  ${BOLD}ETH:${RESET}  \$%'d  ${ETH_COLOR}(%+.2f%%)${RESET}\n" "$ETH_PRICE" "$ETH_CHANGE"
else
    echo -e "  ${RED}Unable to fetch crypto prices${RESET}"
fi

# Stock market (basic - needs API key for real data)
echo -e "  ${DIM}SPY/QQQ: Add Polygon API key for real-time data${RESET}"

# ─────────────────────────────────────────────────────────
# 📅 CALENDAR
# ─────────────────────────────────────────────────────────
echo ""
echo -e "${CYAN}${BOLD}📅 TODAY'S EVENTS${RESET}"
echo -e "${DIM}─────────────────────────────────────────────────────────${RESET}"

if command -v icalBuddy &> /dev/null; then
    EVENTS=$(icalBuddy -f -nc -n eventsToday 2>/dev/null)
    if [ -n "$EVENTS" ]; then
        echo "$EVENTS" | sed 's/^/  /'
    else
        echo -e "  ${DIM}No events today${RESET}"
    fi
elif command -v gcalcli &> /dev/null; then
    gcalcli agenda --nocolor "$(date '+%Y-%m-%d')" "$(date -v+1d '+%Y-%m-%d')" 2>/dev/null | head -10 | sed 's/^/  /'
else
    echo -e "  ${DIM}Install icalBuddy (brew install ical-buddy) or gcalcli${RESET}"
fi

# ─────────────────────────────────────────────────────────
# ✅ PRIORITY TASKS
# ─────────────────────────────────────────────────────────
echo ""
echo -e "${CYAN}${BOLD}✅ PRIORITY TASKS${RESET}"
echo -e "${DIM}─────────────────────────────────────────────────────────${RESET}"

if [ -f "$CLAWD_DIR/PROJECT_QUEUE.md" ]; then
    # Extract Quick Actions
    echo -e "  ${BOLD}Quick Actions:${RESET}"
    grep -E "^\d+\. \[" "$CLAWD_DIR/PROJECT_QUEUE.md" 2>/dev/null | head -5 | sed 's/^/    /'
    
    # Count blocked items
    BLOCKED=$(grep -c "⏳ Blocked" "$CLAWD_DIR/PROJECT_QUEUE.md" 2>/dev/null || echo "0")
    if [ "$BLOCKED" -gt 0 ]; then
        echo -e "  ${YELLOW}⚠️  $BLOCKED items blocked - needs your attention${RESET}"
    fi
else
    echo -e "  ${DIM}PROJECT_QUEUE.md not found${RESET}"
fi

# ─────────────────────────────────────────────────────────
# 🤖 OVERNIGHT WORK
# ─────────────────────────────────────────────────────────
echo ""
echo -e "${CYAN}${BOLD}🤖 OVERNIGHT WORK${RESET}"
echo -e "${DIM}─────────────────────────────────────────────────────────${RESET}"

TODAY_MEMORY="$CLAWD_DIR/memory/$(date '+%Y-%m-%d').md"
YESTERDAY_MEMORY="$CLAWD_DIR/memory/$(date -v-1d '+%Y-%m-%d').md"

if [ -f "$TODAY_MEMORY" ]; then
    echo -e "  ${BOLD}Today's notes:${RESET}"
    head -15 "$TODAY_MEMORY" | sed 's/^/    /'
    LINES=$(wc -l < "$TODAY_MEMORY" | tr -d ' ')
    if [ "$LINES" -gt 15 ]; then
        echo -e "    ${DIM}... ($LINES lines total)${RESET}"
    fi
elif [ -f "$YESTERDAY_MEMORY" ]; then
    echo -e "  ${DIM}No notes yet today. Yesterday's summary:${RESET}"
    head -10 "$YESTERDAY_MEMORY" | sed 's/^/    /'
else
    echo -e "  ${DIM}No agent notes found${RESET}"
fi

# Recent git activity
if [ -d "$CLAWD_DIR/.git" ]; then
    COMMITS=$(cd "$CLAWD_DIR" && git log --oneline --since="12 hours ago" 2>/dev/null | head -5)
    if [ -n "$COMMITS" ]; then
        echo ""
        echo -e "  ${BOLD}Recent commits:${RESET}"
        echo "$COMMITS" | sed 's/^/    /'
    fi
fi

# ─────────────────────────────────────────────────────────
# 🐦 X HIGHLIGHTS (placeholder)
# ─────────────────────────────────────────────────────────
echo ""
echo -e "${CYAN}${BOLD}🐦 X HIGHLIGHTS${RESET}"
echo -e "${DIM}─────────────────────────────────────────────────────────${RESET}"

X_HIGHLIGHTS="$CLAWD_DIR/memory/x-highlights.md"
if [ -f "$X_HIGHLIGHTS" ]; then
    head -10 "$X_HIGHLIGHTS" | sed 's/^/  /'
else
    echo -e "  ${DIM}X integration not yet configured${RESET}"
    echo -e "  ${DIM}Agent can curate highlights to memory/x-highlights.md${RESET}"
fi

# ─────────────────────────────────────────────────────────
# 💰 GRANT ALERTS (future)
# ─────────────────────────────────────────────────────────
echo ""
echo -e "${CYAN}${BOLD}💰 GRANT ALERTS${RESET}"
echo -e "${DIM}─────────────────────────────────────────────────────────${RESET}"
echo -e "  ${DIM}Coming soon - Grant Forge integration${RESET}"

# ─────────────────────────────────────────────────────────
echo ""
echo -e "${BOLD}═══════════════════════════════════════════════════════${RESET}"
echo -e "${DIM}  Generated at $(date '+%H:%M:%S')  │  Run: dashboard${RESET}"
echo -e "${BOLD}═══════════════════════════════════════════════════════${RESET}"
echo ""
