# Claude Code Multi-Agent Orchestration System

> **Source**: [kieranklaassen's gist](https://gist.github.com/kieranklaassen/4f2aba89594a4aea4ad64d753984b2ea)  
> **Last Updated**: January 27, 2026  
> **Based on**: Claude Code v2.1.19 binary analysis

## Executive Summary

The Claude Code Swarm Orchestration system is a **hidden but fully implemented** feature in Claude Code that enables multi-agent coordination. It was discovered through binary analysis (`strings` on the compiled binary) and is gated behind feature flags (`I9() && qFB()`). The system provides a sophisticated framework for:

- **Team-based agent collaboration** with leader/worker topology
- **Task queues with dependencies** for pipeline workflows
- **Inter-agent messaging via inbox files**
- **Multiple spawn backends** (in-process, tmux, iTerm2)

---

## Core Architecture

### Primitives

| Primitive | Description | Storage |
|-----------|-------------|---------|
| **Agent** | A Claude instance that can use tools | N/A (process) |
| **Team** | Named group of agents with one leader | `~/.claude/teams/{name}/config.json` |
| **Teammate** | An agent that joined a team | Listed in team config |
| **Leader** | Agent that created the team | First member in config |
| **Task** | Work item with status, owner, dependencies | `~/.claude/tasks/{team}/N.json` |
| **Inbox** | JSON file for receiving messages | `~/.claude/teams/{name}/inboxes/{agent}.json` |
| **Message** | JSON object between agents | Stored in inbox files |

### File Structure

```
~/.claude/teams/{team-name}/
├── config.json          # Team metadata and member list
└── inboxes/
    ├── team-lead.json   # Leader's inbox
    ├── worker-1.json    # Worker 1's inbox
    └── worker-2.json    # Worker 2's inbox

~/.claude/tasks/{team-name}/
├── 1.json               # Task #1
├── 2.json               # Task #2
└── 3.json               # Task #3
```

---

## Two Ways to Spawn Agents

### Method 1: Task Tool (Subagents)
Short-lived, focused work that returns a result synchronously:

```javascript
Task({
  subagent_type: "Explore",
  description: "Find auth files",
  prompt: "Find all authentication-related files",
  model: "haiku"  // Optional: haiku, sonnet, opus
})
```

### Method 2: Task + team_name + name (Teammates)
Persistent teammates that communicate via inboxes:

```javascript
// Create team
Teammate({ operation: "spawnTeam", team_name: "my-project" })

// Spawn teammate
Task({
  team_name: "my-project",
  name: "security-reviewer",
  subagent_type: "security-sentinel",
  prompt: "Review auth code. Send findings to team-lead.",
  run_in_background: true
})
```

### Key Differences

| Aspect | Task (subagent) | Teammate |
|--------|-----------------|----------|
| Lifespan | Until complete | Until shutdown |
| Communication | Return value | Inbox messages |
| Task access | None | Shared task list |
| Team membership | No | Yes |
| Coordination | One-off | Ongoing |

---

## Built-in Agent Types

| Type | Tools | Best For |
|------|-------|----------|
| **Bash** | Bash only | Git ops, command execution |
| **Explore** | Read-only | Codebase exploration (uses Haiku) |
| **Plan** | Read-only | Architecture, planning |
| **general-purpose** | All tools (*) | Multi-step implementation |
| **claude-code-guide** | Read-only + Web | Claude Code questions |

---

## TeammateTool Operations

### Team Management
- `spawnTeam` - Create a team (you become leader)
- `discoverTeams` - List available teams
- `cleanup` - Remove team resources

### Membership
- `requestJoin` - Request to join a team
- `approveJoin` / `rejectJoin` - Leader handles requests

### Messaging
- `write` - Message one teammate
- `broadcast` - Message ALL teammates (expensive!)

### Shutdown
- `requestShutdown` - Leader asks teammate to exit
- `approveShutdown` / `rejectShutdown` - Teammate responds

### Plan Approval
- `approvePlan` / `rejectPlan` - For `plan_mode_required` teammates

---

## Task System

### Operations
- `TaskCreate` - Create work items with subject, description, activeForm
- `TaskList` - See all tasks with status
- `TaskGet` - Get task details
- `TaskUpdate` - Claim, start, complete tasks; set dependencies

### Automatic Dependency Unblocking
```javascript
TaskUpdate({ taskId: "2", addBlockedBy: ["1"] })  // #2 waits for #1
TaskUpdate({ taskId: "3", addBlockedBy: ["2"] })  // #3 waits for #2
// When #1 completes → #2 auto-unblocks
// When #2 completes → #3 auto-unblocks
```

---

## Orchestration Patterns

### Pattern 1: Parallel Specialists
Multiple specialists review simultaneously:
```javascript
// Spawn security, performance, simplicity reviewers in parallel
// Each sends findings to team-lead
// Leader synthesizes and shuts down team
```

### Pattern 2: Pipeline
Sequential dependencies:
```javascript
// Research → Plan → Implement → Test → Review
// Each stage auto-unblocks when predecessor completes
```

### Pattern 3: Swarm (Self-Organizing)
Workers grab tasks from a pool:
```javascript
// Create many independent tasks (no dependencies)
// Spawn multiple workers with same "claim-work-complete-repeat" prompt
// Workers race to claim, naturally load-balance
```

### Pattern 4: Plan Approval Workflow
Require plan approval before implementation:
```javascript
Task({
  team_name: "careful-work",
  name: "architect",
  mode: "plan",  // Requires approval
  run_in_background: true
})
// Leader receives plan_approval_request
// Leader calls approvePlan or rejectPlan with feedback
```

---

## Spawn Backends

| Backend | How It Works | Visibility | Persistence |
|---------|-------------|------------|-------------|
| **in-process** | Same Node.js process | Hidden | Dies with leader |
| **tmux** | Separate terminal panes | Visible in tmux | Survives leader |
| **iterm2** | Split panes in iTerm2 | Visible | Dies with window |

Auto-detection: checks `$TMUX`, `$TERM_PROGRAM`, `which tmux`, `which it2`

---

## Message Types

| Type | Purpose |
|------|---------|
| Regular text | Normal communication |
| `shutdown_request` | Leader asks teammate to exit |
| `shutdown_approved` | Teammate confirms exit |
| `idle_notification` | Auto-sent when teammate stops |
| `task_completed` | Teammate finished a task |
| `plan_approval_request` | Teammate submits plan for approval |
| `join_request` | Agent wants to join team |
| `permission_request` | Sandbox/tool permission escalation |

---

## Comparison: Claude Code Swarm vs Moltbot Sub-Agents

### Architecture Philosophy

| Aspect | Claude Code Swarm | Moltbot Sub-Agents |
|--------|-------------------|-------------------|
| **Model** | Team-based with leader/worker hierarchy | Flat spawning from main agent |
| **State** | File-based (JSON in `~/.claude/`) | Session-based (gateway manages) |
| **Communication** | Inbox files + polling | Direct messages back to main |
| **Persistence** | Teams persist across sessions | Ephemeral by design |
| **Task System** | Built-in task queue with dependencies | No built-in task system |

### Spawning Mechanisms

| Feature | Claude Code | Moltbot |
|---------|-------------|---------|
| **Spawn command** | `Task({ team_name, name, ... })` | `exec` with sub-agent context |
| **Agent types** | Built-in types + plugins | Any model/prompt combination |
| **Background mode** | `run_in_background: true` | Always async via gateway |
| **Result delivery** | Inbox polling | Final message returned |

### Coordination

| Feature | Claude Code | Moltbot |
|---------|-------------|---------|
| **Dependencies** | Explicit `addBlockedBy` | Manual coordination |
| **Shutdown** | Formal request/approve protocol | Natural completion |
| **Plan approval** | Built-in with feedback | Not built-in |
| **Broadcasting** | Native `broadcast` operation | Would need explicit messaging |

### Visibility

| Feature | Claude Code | Moltbot |
|---------|-------------|---------|
| **Worker output** | tmux/iTerm2 panes | Logs in gateway |
| **Status** | Read config/task files | Session status queries |
| **Debugging** | `tail -f` inbox files | Process log inspection |

---

## Key Insights

### What Claude Code Swarm Does Well
1. **Formal protocols** - Shutdown, join, plan approval have explicit request/approve flows
2. **Task dependencies** - Auto-unblocking simplifies pipeline workflows
3. **Visibility** - tmux/iTerm2 backends let you watch workers
4. **Team persistence** - Teams survive leader restart (with tmux backend)
5. **Plugin architecture** - Extensible agent types (e.g., `compound-engineering:review:*`)

### What Moltbot Does Differently
1. **Simplicity** - No formal team creation/cleanup ceremony needed
2. **Flexibility** - Any model, any prompt, any configuration
3. **Integration** - Sub-agents inherit channel/gateway context
4. **Lightweight** - No file-based state to manage
5. **Purpose-built** - Sub-agents complete task and report back naturally

### Potential Moltbot Enhancements (Inspired by Swarm)
1. **Task queue** - `TASKS.md` or similar for dependency-aware work items
2. **Heartbeat tracking** - Know when sub-agents are still alive
3. **Team context** - Share state across multiple sub-agents
4. **Plan mode** - Require approval before sub-agent executes destructive actions

---

## Best Practices from the Gist

1. **Always cleanup** - Don't leave orphaned teams
2. **Use meaningful names** - `security-reviewer` > `worker-1`
3. **Write clear prompts** - Tell workers exactly what to do and how to report
4. **Use task dependencies** - Let the system manage unblocking
5. **Check inboxes** - Workers send results there
6. **Match agent type to task** - Explore for reading, general-purpose for implementing
7. **Prefer `write` over `broadcast`** - Broadcasting is expensive (N messages)

---

## References

- [Main Gist](https://gist.github.com/kieranklaassen/4f2aba89594a4aea4ad64d753984b2ea)
- [Claude Code Capabilities Report](https://gist.github.com/kieranklaassen/7ee400209d0454f7c859f8d99fd34144)
- Based on Claude Code v2.1.19 binary analysis

---

*Document created: 2026-01-28*  
*Purpose: Understanding multi-agent patterns for potential Moltbot enhancement*
