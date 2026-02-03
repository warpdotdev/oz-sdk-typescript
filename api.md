# Agent

Types:

- <code><a href="./src/resources/agent/agent.ts">AgentSkill</a></code>
- <code><a href="./src/resources/agent/agent.ts">AmbientAgentConfig</a></code>
- <code><a href="./src/resources/agent/agent.ts">CloudEnvironmentConfig</a></code>
- <code><a href="./src/resources/agent/agent.ts">McpServerConfig</a></code>
- <code><a href="./src/resources/agent/agent.ts">UserProfile</a></code>
- <code><a href="./src/resources/agent/agent.ts">AgentListResponse</a></code>
- <code><a href="./src/resources/agent/agent.ts">AgentRunResponse</a></code>

Methods:

- <code title="get /agent">client.agent.<a href="./src/resources/agent/agent.ts">list</a>({ ...params }) -> AgentListResponse</code>
- <code title="post /agent/run">client.agent.<a href="./src/resources/agent/agent.ts">run</a>({ ...params }) -> AgentRunResponse</code>

## Runs

Types:

- <code><a href="./src/resources/agent/runs.ts">ArtifactItem</a></code>
- <code><a href="./src/resources/agent/runs.ts">RunItem</a></code>
- <code><a href="./src/resources/agent/runs.ts">RunSourceType</a></code>
- <code><a href="./src/resources/agent/runs.ts">RunState</a></code>
- <code><a href="./src/resources/agent/runs.ts">RunListResponse</a></code>
- <code><a href="./src/resources/agent/runs.ts">RunCancelResponse</a></code>

Methods:

- <code title="get /agent/runs/{runId}">client.agent.runs.<a href="./src/resources/agent/runs.ts">retrieve</a>(runID) -> RunItem</code>
- <code title="get /agent/runs">client.agent.runs.<a href="./src/resources/agent/runs.ts">list</a>({ ...params }) -> RunListResponse</code>
- <code title="post /agent/runs/{runId}/cancel">client.agent.runs.<a href="./src/resources/agent/runs.ts">cancel</a>(runID) -> string</code>

## Schedules

Types:

- <code><a href="./src/resources/agent/schedules.ts">ScheduledAgentItem</a></code>
- <code><a href="./src/resources/agent/schedules.ts">ScheduleListResponse</a></code>
- <code><a href="./src/resources/agent/schedules.ts">ScheduleDeleteResponse</a></code>

Methods:

- <code title="post /agent/schedules">client.agent.schedules.<a href="./src/resources/agent/schedules.ts">create</a>({ ...params }) -> ScheduledAgentItem</code>
- <code title="get /agent/schedules/{scheduleId}">client.agent.schedules.<a href="./src/resources/agent/schedules.ts">retrieve</a>(scheduleID) -> ScheduledAgentItem</code>
- <code title="put /agent/schedules/{scheduleId}">client.agent.schedules.<a href="./src/resources/agent/schedules.ts">update</a>(scheduleID, { ...params }) -> ScheduledAgentItem</code>
- <code title="get /agent/schedules">client.agent.schedules.<a href="./src/resources/agent/schedules.ts">list</a>() -> ScheduleListResponse</code>
- <code title="delete /agent/schedules/{scheduleId}">client.agent.schedules.<a href="./src/resources/agent/schedules.ts">delete</a>(scheduleID) -> ScheduleDeleteResponse</code>
- <code title="post /agent/schedules/{scheduleId}/pause">client.agent.schedules.<a href="./src/resources/agent/schedules.ts">pause</a>(scheduleID) -> ScheduledAgentItem</code>
- <code title="post /agent/schedules/{scheduleId}/resume">client.agent.schedules.<a href="./src/resources/agent/schedules.ts">resume</a>(scheduleID) -> ScheduledAgentItem</code>
