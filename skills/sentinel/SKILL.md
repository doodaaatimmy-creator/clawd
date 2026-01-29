# Sentinel - Multi-Agent Web Testing Skill

AI-powered testing swarm for comprehensive web application QA.

## Overview

Sentinel deploys 8 specialized AI agents to test web applications from multiple perspectives:

| Agent | Focus |
|-------|-------|
| **Security Auditor** | XSS, CSRF, injection, auth vulnerabilities |
| **UX Explorer** | Navigation, usability, user flows |
| **Accessibility Checker** | WCAG compliance, screen reader, keyboard nav |
| **Performance Profiler** | Load times, resource usage, bottlenecks |
| **Edge Case Hunter** | Boundary conditions, error handling |
| **Form Tester** | Validation, submission, error states |
| **Auth Tester** | Login flows, permissions, session handling |
| **Data Boundary Tester** | Input limits, data validation |

## Installation

```bash
cd ~/clawd/projects/sentinel
pip install -e .
playwright install chromium
```

## Configuration

Set at least one LLM provider:
```bash
export ANTHROPIC_API_KEY=sk-ant-...
# or
export OPENAI_API_KEY=sk-...
```

## Usage

### Quick Scan
```bash
sentinel scan https://localhost:3008
```

### Targeted Scan
```bash
# Specific agents
sentinel scan https://localhost:3008 --agents security,ux,a11y

# Limit pages
sentinel scan https://localhost:3008 --max-pages 10

# Quiet mode (for automation)
sentinel scan https://localhost:3008 --quiet --output report.json
```

### Full Audit
```bash
sentinel scan https://example.com --agents all --max-pages 50
```

## Output

JSON report with:
- Findings by severity (critical/high/medium/low)
- Evidence (screenshots, DOM snapshots, logs)
- Reproduction steps
- Suggested fixes

## Integration

### Test DadForge
```bash
# Make sure DadForge is running
cd ~/clawd/projects/dadforge && npm run dev &

# Run security + UX scan
sentinel scan http://localhost:3008 --agents security,ux --max-pages 10
```

### Test Any Local App
```bash
sentinel scan http://localhost:PORT --agents all
```

### GitHub Issues Integration
```bash
export GITHUB_TOKEN=ghp_...
sentinel scan https://app.example.com --create-issues --repo owner/repo
```

## When to Use

- Before deploying any web app
- After major feature changes
- For security audits
- Accessibility compliance checks
- Performance benchmarking

## Cost Awareness

Each scan uses LLM API calls. Typical costs:
- Quick scan (5 pages, 2 agents): ~$0.10-0.20
- Full audit (20 pages, all agents): ~$1-3

Check `llm_usage.total_cost_usd` in output for exact costs.

## Example Workflow

```bash
# 1. Start your app
npm run dev &

# 2. Run Sentinel
sentinel scan http://localhost:3000 --agents security,ux,a11y

# 3. Review findings
cat sentinel_report.json | jq '.findings[] | select(.severity == "high")'

# 4. Fix issues and re-scan
```

## Limitations

- Requires running web server (won't test static files)
- LLM costs add up for large sites
- May generate some false positives (review findings)
- VR/native apps need different testing approach
