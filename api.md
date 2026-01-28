# Agent

Types:

- <code><a href="./src/resources/agent/agent.ts">AmbientAgentConfig</a></code>
- <code><a href="./src/resources/agent/agent.ts">AgentRunResponse</a></code>

Methods:

- <code title="post /agent/run">client.agent.<a href="./src/resources/agent/agent.ts">run</a>({ ...params }) -> AgentRunResponse</code>

## Runs

Types:

- <code><a href="./src/resources/agent/runs.ts">ArtifactItem</a></code>
- <code><a href="./src/resources/agent/runs.ts">RunItem</a></code>
- <code><a href="./src/resources/agent/runs.ts">RunSourceType</a></code>
- <code><a href="./src/resources/agent/runs.ts">RunState</a></code>
- <code><a href="./src/resources/agent/runs.ts">RunListResponse</a></code>

Methods:

- <code title="get /agent/runs/{runId}">client.agent.runs.<a href="./src/resources/agent/runs.ts">retrieve</a>(runID) -> RunItem</code>
- <code title="get /agent/runs">client.agent.runs.<a href="./src/resources/agent/runs.ts">list</a>({ ...params }) -> RunListResponse</code>
