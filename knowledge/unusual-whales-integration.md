# Unusual Whales Integration Notes

## Overview
Unusual Whales provides options flow, dark pool, and market data via REST API.

## Existing MCP Servers

### 1. phields/unusualwhales-mcp
- GitHub: https://github.com/phields/unusualwhales-mcp
- Node.js implementation
- Supports SSE transport
- Can integrate with Claude Desktop

### 2. danwagnerco/mcp-server-unusualwhales
- **We forked this!** → https://github.com/doodaaatimmy-creator/mcp-server-unusualwhales
- Connects to Unusual Whales REST API
- Real-time options flow data

## API Endpoints (from docs)
- Options flow data
- Dark pool data
- Congressional trading
- Institutional holdings
- Market overview

## Integration Options for Options Analyst

### Option A: Use Existing MCP Server
1. Clone our forked repo
2. Configure with UW API key
3. Register with Claude Desktop or create Moltbot skill wrapper

### Option B: Direct API Integration
1. Add UW API client to options-analyst
2. Create CLI commands for UW data
3. Merge with existing Polygon data

### Option C: Complement Polygon
- Use Polygon for historical OHLCV and options chains
- Use Unusual Whales for flow data and sentiment
- Best of both worlds

## API Key
- Need to sign up at unusualwhales.com
- Pricing tiers available
- Free tier may have limits

## Next Steps
1. Get Unusual Whales API key
2. Test the forked MCP server
3. Evaluate data overlap with Polygon
4. Decide integration approach

---
*Created: 2026-01-28*
