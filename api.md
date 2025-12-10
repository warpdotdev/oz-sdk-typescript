# Agent

Types:

- <code><a href="./src/resources/agent/agent.ts">AmbientAgentConfig</a></code>
- <code><a href="./src/resources/agent/agent.ts">AgentRunResponse</a></code>

Methods:

- <code title="post /agent/run">client.agent.<a href="./src/resources/agent/agent.ts">run</a>({ ...params }) -> AgentRunResponse</code>

## Tasks

Types:

- <code><a href="./src/resources/agent/tasks.ts">TaskItem</a></code>
- <code><a href="./src/resources/agent/tasks.ts">TaskSourceType</a></code>
- <code><a href="./src/resources/agent/tasks.ts">TaskState</a></code>
- <code><a href="./src/resources/agent/tasks.ts">TaskListResponse</a></code>

Methods:

- <code title="get /agent/tasks/{taskId}">client.agent.tasks.<a href="./src/resources/agent/tasks.ts">retrieve</a>(taskID) -> TaskItem</code>
- <code title="get /agent/tasks">client.agent.tasks.<a href="./src/resources/agent/tasks.ts">list</a>({ ...params }) -> TaskListResponse</code>
