# Options Analyst Integration with Moltbot

## Status

**Moltbot does not have native MCP server support.** The Options Analyst MCP server cannot be registered directly with Moltbot like it can with Claude Desktop.

## Integration Approach

Instead of MCP, we use a **Moltbot Skill** that wraps the options analyst CLI tools.

### What's Set Up

1. **Skill created**: `~/clawd/skills/options-analyst/SKILL.md`
   - Teaches the agent how to use the options analyst via CLI commands
   - Automatically loaded by Moltbot for the main agent

2. **CLI wrapper added**: `/Users/clawdchad/repos/options-analyst/mcp_server/cli_tools.py`
   - Provides easy command-line access to all MCP tools
   - Can be called via `exec` tool from Moltbot

### Usage

The agent can now use options analyst tools by running:

```bash
cd /Users/clawdchad/repos/options-analyst && source venv/bin/activate && python -m mcp_server.cli_tools <command> [args]
```

Available commands: `summary`, `intraday`, `gex`, `regime`, `chain`, `overview`, `watchlist`, `iv`, `history`, `prices`, `query`, `status`

### Example Agent Usage

The agent can ask for options data like:
- "What's the GEX for SPY?"
- "Show me the market overview"
- "What's the current regime for NVDA?"

And the skill teaches it to use the appropriate CLI commands.

## Alternative: Claude Desktop

If you want full MCP protocol support, use Claude Desktop with the config at:
`/Users/clawdchad/repos/options-analyst/.claude/mcp_config.json`

## Future: Moltbot Plugin

For deeper integration, a Moltbot plugin could be created that:
1. Spawns the MCP server process
2. Communicates via stdio
3. Registers the MCP tools as native Moltbot tools

This would require custom development following the [Moltbot Plugin Guide](/Users/clawdchad/Projects/moltbot/docs/plugin.md).
