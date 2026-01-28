# molt-dash

A minimal CLI dashboard for Moltbot status.

## Usage

```bash
./molt-dash
```

## What it shows

- 🚦 **Gateway status** - Running/stopped, PID, port
- 📡 **Channel health** - Discord connection status  
- 📊 **Active sessions** - Token usage with visual bars
- 📈 **Summary stats** - Total tokens, session counts

## Why?

`moltbot status` is comprehensive but verbose. `molt-dash` shows just what you need at a glance.

## Built with Ralph Pattern

This tool was built following the Ralph Wiggum Loop pattern:
- Atomic, focused scope
- Fresh context approach
- Single responsibility

## Installation

```bash
# Add to PATH
ln -s ~/clawd/tools/molt-dash/molt-dash /usr/local/bin/molt-dash

# Or run directly
~/clawd/tools/molt-dash/molt-dash
```
