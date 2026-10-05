# Agent

Types:

- <code><a href="./src/resources/agent/agent.ts">AgentConfigSnapshot</a></code>
- <code><a href="./src/resources/agent/agent.ts">AgentSkill</a></code>
- <code><a href="./src/resources/agent/agent.ts">AwsInferenceProviderConfig</a></code>
- <code><a href="./src/resources/agent/agent.ts">AwsProviderConfig</a></code>
- <code><a href="./src/resources/agent/agent.ts">Environment</a></code>
- <code><a href="./src/resources/agent/agent.ts">EnvironmentConfig</a></code>
- <code><a href="./src/resources/agent/agent.ts">Error</a></code>
- <code><a href="./src/resources/agent/agent.ts">ErrorCode</a></code>
- <code><a href="./src/resources/agent/agent.ts">GcpProviderConfig</a></code>
- <code><a href="./src/resources/agent/agent.ts">Harness</a></code>
- <code><a href="./src/resources/agent/agent.ts">HarnessAuthSecrets</a></code>
- <code><a href="./src/resources/agent/agent.ts">InferenceProvidersConfig</a></code>
- <code><a href="./src/resources/agent/agent.ts">McpServerConfig</a></code>
- <code><a href="./src/resources/agent/agent.ts">MemoryStoreRef</a></code>
- <code><a href="./src/resources/agent/agent.ts">Scope</a></code>
- <code><a href="./src/resources/agent/agent.ts">SecretRef</a></code>
- <code><a href="./src/resources/agent/agent.ts">SessionSharingConfig</a></code>
- <code><a href="./src/resources/agent/agent.ts">UserProfile</a></code>
- <code><a href="./src/resources/agent/agent.ts">AgentListResponse</a></code>
- <code><a href="./src/resources/agent/agent.ts">AgentGetArtifactResponse</a></code>
- <code><a href="./src/resources/agent/agent.ts">AgentGetRunByExternalReferenceResponse</a></code>
- <code><a href="./src/resources/agent/agent.ts">AgentListEnvironmentsResponse</a></code>
- <code><a href="./src/resources/agent/agent.ts">AgentListModelsResponse</a></code>
- <code><a href="./src/resources/agent/agent.ts">AgentRunResponse</a></code>

Methods:

- <code title="get /agent">client.agent.<a href="./src/resources/agent/agent.ts">list</a>({ ...params }) -> AgentListResponse</code>
- <code title="get /agent/artifacts/{artifactUid}/download">client.agent.<a href="./src/resources/agent/agent.ts">downloadArtifact</a>(artifactUid) -> Response</code>
- <code title="get /agent/artifacts/{artifactUid}">client.agent.<a href="./src/resources/agent/agent.ts">getArtifact</a>(artifactUid) -> AgentGetArtifactResponse</code>
- <code title="get /agent/run-by-external-reference">client.agent.<a href="./src/resources/agent/agent.ts">getRunByExternalReference</a>({ ...params }) -> AgentGetRunByExternalReferenceResponse</code>
- <code title="get /agent/environments">client.agent.<a href="./src/resources/agent/agent.ts">listEnvironments</a>({ ...params }) -> AgentListEnvironmentsResponse</code>
- <code title="get /agent/models">client.agent.<a href="./src/resources/agent/agent.ts">listModels</a>() -> AgentListModelsResponse</code>
- <code title="post /agent/runs">client.agent.<a href="./src/resources/agent/agent.ts">run</a>({ ...params }) -> AgentRunResponse</code>

## Runs

Types:

- <code><a href="./src/resources/agent/runs.ts">ArtifactItem</a></code>
- <code><a href="./src/resources/agent/runs.ts">ConversationStep</a></code>
- <code><a href="./src/resources/agent/runs.ts">RunItem</a></code>
- <code><a href="./src/resources/agent/runs.ts">RunSourceType</a></code>
- <code><a href="./src/resources/agent/runs.ts">RunState</a></code>
- <code><a href="./src/resources/agent/runs.ts">RunCancelResponse</a></code>
- <code><a href="./src/resources/agent/runs.ts">RunGetConversationResponse</a></code>
- <code><a href="./src/resources/agent/runs.ts">RunGetHarnessUsageResponse</a></code>
- <code><a href="./src/resources/agent/runs.ts">RunGetTimelineResponse</a></code>
- <code><a href="./src/resources/agent/runs.ts">RunInterruptResponse</a></code>
- <code><a href="./src/resources/agent/runs.ts">RunListHandoffAttachmentsResponse</a></code>
- <code><a href="./src/resources/agent/runs.ts">RunSubmitFollowupResponse</a></code>

Methods:

- <code title="get /agent/runs/{runId}">client.agent.runs.<a href="./src/resources/agent/runs.ts">retrieve</a>(runID) -> RunItem</code>
- <code title="get /agent/runs">client.agent.runs.<a href="./src/resources/agent/runs.ts">list</a>({ ...params }) -> RunItemsRunsCursorPage</code>
- <code title="post /agent/runs/{runId}/cancel">client.agent.runs.<a href="./src/resources/agent/runs.ts">cancel</a>(runID) -> string</code>
- <code title="get /agent/runs/{runId}/conversation">client.agent.runs.<a href="./src/resources/agent/runs.ts">getConversation</a>(runID) -> RunGetConversationResponse</code>
- <code title="get /agent/runs/{runId}/harness-usage">client.agent.runs.<a href="./src/resources/agent/runs.ts">getHarnessUsage</a>(runID) -> RunGetHarnessUsageResponse</code>
- <code title="get /agent/runs/{runId}/timeline">client.agent.runs.<a href="./src/resources/agent/runs.ts">getTimeline</a>(runID) -> RunGetTimelineResponse</code>
- <code title="get /agent/runs/{runId}/transcript">client.agent.runs.<a href="./src/resources/agent/runs.ts">getTranscript</a>(runID) -> Response</code>
- <code title="post /agent/runs/{runId}/interrupt">client.agent.runs.<a href="./src/resources/agent/runs.ts">interrupt</a>(runID) -> unknown</code>
- <code title="get /agent/runs/{runId}/handoff/attachments">client.agent.runs.<a href="./src/resources/agent/runs.ts">listHandoffAttachments</a>(runID) -> RunListHandoffAttachmentsResponse</code>
- <code title="post /agent/runs/{runId}/followups">client.agent.runs.<a href="./src/resources/agent/runs.ts">submitFollowup</a>(runID, { ...params }) -> RunSubmitFollowupResponse</code>

## Schedules

Types:

- <code><a href="./src/resources/agent/schedules.ts">ScheduledAgentHistoryItem</a></code>
- <code><a href="./src/resources/agent/schedules.ts">ScheduledAgentItem</a></code>
- <code><a href="./src/resources/agent/schedules.ts">ScheduleListResponse</a></code>
- <code><a href="./src/resources/agent/schedules.ts">ScheduleDeleteResponse</a></code>

Methods:

- <code title="post /agent/schedules">client.agent.schedules.<a href="./src/resources/agent/schedules.ts">create</a>({ ...params }) -> ScheduledAgentItem</code>
- <code title="get /agent/schedules/{scheduleId}">client.agent.schedules.<a href="./src/resources/agent/schedules.ts">retrieve</a>(scheduleID) -> ScheduledAgentItem</code>
- <code title="put /agent/schedules/{scheduleId}">client.agent.schedules.<a href="./src/resources/agent/schedules.ts">update</a>(scheduleID, { ...params }) -> ScheduledAgentItem</code>
- <code title="get /agent/schedules">client.agent.schedules.<a href="./src/resources/agent/schedules.ts">list</a>({ ...params }) -> ScheduleListResponse</code>
- <code title="delete /agent/schedules/{scheduleId}">client.agent.schedules.<a href="./src/resources/agent/schedules.ts">delete</a>(scheduleID) -> ScheduleDeleteResponse</code>
- <code title="post /agent/schedules/{scheduleId}/pause">client.agent.schedules.<a href="./src/resources/agent/schedules.ts">pause</a>(scheduleID) -> ScheduledAgentItem</code>
- <code title="post /agent/schedules/{scheduleId}/resume">client.agent.schedules.<a href="./src/resources/agent/schedules.ts">resume</a>(scheduleID) -> ScheduledAgentItem</code>

## Agent

Types:

- <code><a href="./src/resources/agent/agent_.ts">AgentResponse</a></code>
- <code><a href="./src/resources/agent/agent_.ts">AutoMemoryResponse</a></code>
- <code><a href="./src/resources/agent/agent_.ts">CreateAgentRequest</a></code>
- <code><a href="./src/resources/agent/agent_.ts">ListAgentIdentitiesResponse</a></code>
- <code><a href="./src/resources/agent/agent_.ts">MemoryResponse</a></code>
- <code><a href="./src/resources/agent/agent_.ts">MemoryStoreAttachmentResponse</a></code>
- <code><a href="./src/resources/agent/agent_.ts">UpdateAgentRequest</a></code>

Methods:

- <code title="post /agent/identities">client.agent.agent.<a href="./src/resources/agent/agent_.ts">create</a>({ ...params }) -> AgentResponse</code>
- <code title="put /agent/identities/{uid}">client.agent.agent.<a href="./src/resources/agent/agent_.ts">update</a>(uid, { ...params }) -> AgentResponse</code>
- <code title="get /agent/identities">client.agent.agent.<a href="./src/resources/agent/agent_.ts">list</a>({ ...params }) -> ListAgentIdentitiesResponse</code>
- <code title="delete /agent/identities/{uid}">client.agent.agent.<a href="./src/resources/agent/agent_.ts">delete</a>(uid) -> void</code>
- <code title="get /agent/identities/{uid}">client.agent.agent.<a href="./src/resources/agent/agent_.ts">get</a>(uid) -> AgentResponse</code>

## Sessions

Types:

- <code><a href="./src/resources/agent/sessions.ts">SessionCheckRedirectResponse</a></code>

Methods:

- <code title="get /agent/sessions/{sessionUuid}/redirect">client.agent.sessions.<a href="./src/resources/agent/sessions.ts">checkRedirect</a>(sessionUuid) -> SessionCheckRedirectResponse</code>

## Conversations

Types:

- <code><a href="./src/resources/agent/conversations.ts">ConversationRetrieveResponse</a></code>
- <code><a href="./src/resources/agent/conversations.ts">ConversationCheckRedirectResponse</a></code>
- <code><a href="./src/resources/agent/conversations.ts">ConversationInterruptResponse</a></code>
- <code><a href="./src/resources/agent/conversations.ts">ConversationSubmitFollowupResponse</a></code>

Methods:

- <code title="get /agent/conversations/{conversation_id}">client.agent.conversations.<a href="./src/resources/agent/conversations.ts">retrieve</a>(conversationID) -> ConversationRetrieveResponse</code>
- <code title="get /agent/conversations/{conversationId}/redirect">client.agent.conversations.<a href="./src/resources/agent/conversations.ts">checkRedirect</a>(conversationID) -> ConversationCheckRedirectResponse</code>
- <code title="get /agent/conversations/{conversation_id}/screenshots/{screenshot_uid}/download">client.agent.conversations.<a href="./src/resources/agent/conversations.ts">downloadScreenshot</a>(screenshotUid, { ...params }) -> Response</code>
- <code title="get /agent/conversations/{conversation_id}/transcript">client.agent.conversations.<a href="./src/resources/agent/conversations.ts">getTranscript</a>(conversationID) -> Response</code>
- <code title="post /agent/conversations/{conversation_id}/interrupt">client.agent.conversations.<a href="./src/resources/agent/conversations.ts">interrupt</a>(conversationID) -> ConversationInterruptResponse</code>
- <code title="post /agent/conversations/{conversation_id}/followups">client.agent.conversations.<a href="./src/resources/agent/conversations.ts">submitFollowup</a>(conversationID, { ...params }) -> ConversationSubmitFollowupResponse</code>

# Networking

Types:

- <code><a href="./src/resources/networking.ts">NetworkingGetEgressRangesResponse</a></code>

Methods:

- <code title="get /networking/egress-ranges">client.networking.<a href="./src/resources/networking.ts">getEgressRanges</a>({ ...params }) -> NetworkingGetEgressRangesResponse</code>

# Factories

Types:

- <code><a href="./src/resources/factories/factories.ts">Factory</a></code>

Methods:

- <code title="get /factory">client.factories.<a href="./src/resources/factories/factories.ts">list</a>({ ...params }) -> FactoriesFactoriesCursorPage</code>
- <code title="get /factory/{uid}">client.factories.<a href="./src/resources/factories/factories.ts">get</a>(uid) -> Factory</code>

## Runs

Types:

- <code><a href="./src/resources/factories/runs.ts">RunCreateResponse</a></code>
- <code><a href="./src/resources/factories/runs.ts">RunListScoresResponse</a></code>

Methods:

- <code title="post /factory/{uid}/runs">client.factories.runs.<a href="./src/resources/factories/runs.ts">create</a>(uid, { ...params }) -> RunCreateResponse</code>
- <code title="get /factory/runs/{run_id}/scores">client.factories.runs.<a href="./src/resources/factories/runs.ts">listScores</a>(runID) -> RunListScoresResponse</code>

## Tasks

Types:

- <code><a href="./src/resources/factories/tasks.ts">Task</a></code>

Methods:

- <code title="post /factory/{uid}/tasks">client.factories.tasks.<a href="./src/resources/factories/tasks.ts">create</a>(uid, { ...params }) -> Task</code>
- <code title="patch /factory/{uid}/tasks/{task_uid}">client.factories.tasks.<a href="./src/resources/factories/tasks.ts">update</a>(taskUid, { ...params }) -> Task</code>
- <code title="get /factory/{uid}/tasks">client.factories.tasks.<a href="./src/resources/factories/tasks.ts">list</a>(uid, { ...params }) -> TasksFactoryTasksCursorPage</code>
- <code title="delete /factory/{uid}/tasks/{task_uid}">client.factories.tasks.<a href="./src/resources/factories/tasks.ts">delete</a>(taskUid, { ...params }) -> void</code>
- <code title="post /factory/{uid}/tasks/{task_uid}/cancel">client.factories.tasks.<a href="./src/resources/factories/tasks.ts">cancel</a>(taskUid, { ...params }) -> Task</code>
- <code title="get /factory/{uid}/tasks/{task_uid}">client.factories.tasks.<a href="./src/resources/factories/tasks.ts">get</a>(taskUid, { ...params }) -> Task</code>
- <code title="get /factory/{uid}/task-by-conversation">client.factories.tasks.<a href="./src/resources/factories/tasks.ts">getByConversation</a>(uid, { ...params }) -> Task</code>
- <code title="get /factory/{uid}/task-by-run">client.factories.tasks.<a href="./src/resources/factories/tasks.ts">getByRun</a>(uid, { ...params }) -> Task</code>

## Scorers

Types:

- <code><a href="./src/resources/factories/scorers.ts">ScorerCreateResponse</a></code>
- <code><a href="./src/resources/factories/scorers.ts">ScorerListResponse</a></code>
- <code><a href="./src/resources/factories/scorers.ts">ScorerListResultReasonsResponse</a></code>
- <code><a href="./src/resources/factories/scorers.ts">ScorerListResultsResponse</a></code>

Methods:

- <code title="post /factory/scorers">client.factories.scorers.<a href="./src/resources/factories/scorers.ts">create</a>({ ...params }) -> ScorerCreateResponse</code>
- <code title="get /factory/scorers">client.factories.scorers.<a href="./src/resources/factories/scorers.ts">list</a>({ ...params }) -> ScorerListResponse</code>
- <code title="get /factory/scorers/{scorer_id}/results/reasons">client.factories.scorers.<a href="./src/resources/factories/scorers.ts">listResultReasons</a>(scorerID, { ...params }) -> ScorerListResultReasonsResponse</code>
- <code title="get /factory/scorers/{scorer_id}/results">client.factories.scorers.<a href="./src/resources/factories/scorers.ts">listResults</a>(scorerID, { ...params }) -> ScorerListResultsResponsesScorerResultsCursorPage</code>

## Benchmarks

### Suites

Types:

- <code><a href="./src/resources/factories/benchmarks/suites.ts">SuiteCreateResponse</a></code>
- <code><a href="./src/resources/factories/benchmarks/suites.ts">SuiteListResponse</a></code>
- <code><a href="./src/resources/factories/benchmarks/suites.ts">SuiteGetResponse</a></code>
- <code><a href="./src/resources/factories/benchmarks/suites.ts">SuiteLaunchRunResponse</a></code>

Methods:

- <code title="post /factory/{uid}/benchmarks/suites">client.factories.benchmarks.suites.<a href="./src/resources/factories/benchmarks/suites.ts">create</a>(uid, { ...params }) -> SuiteCreateResponse</code>
- <code title="get /factory/{uid}/benchmarks/suites">client.factories.benchmarks.suites.<a href="./src/resources/factories/benchmarks/suites.ts">list</a>(uid, { ...params }) -> SuiteListResponsesBenchmarkSuitesCursorPage</code>
- <code title="get /factory/{uid}/benchmarks/suites/{suite_uid}">client.factories.benchmarks.suites.<a href="./src/resources/factories/benchmarks/suites.ts">get</a>(suiteUid, { ...params }) -> SuiteGetResponse</code>
- <code title="post /factory/{uid}/benchmarks/suites/{suite_uid}/runs">client.factories.benchmarks.suites.<a href="./src/resources/factories/benchmarks/suites.ts">launchRun</a>(suiteUid, { ...params }) -> SuiteLaunchRunResponse</code>

### Runs

Types:

- <code><a href="./src/resources/factories/benchmarks/runs.ts">RunListResponse</a></code>
- <code><a href="./src/resources/factories/benchmarks/runs.ts">RunGetResponse</a></code>
- <code><a href="./src/resources/factories/benchmarks/runs.ts">RunGetResultsResponse</a></code>

Methods:

- <code title="get /factory/{uid}/benchmarks/runs">client.factories.benchmarks.runs.<a href="./src/resources/factories/benchmarks/runs.ts">list</a>(uid, { ...params }) -> RunListResponsesRunsCursorPage</code>
- <code title="get /factory/{uid}/benchmarks/runs/{run_uid}">client.factories.benchmarks.runs.<a href="./src/resources/factories/benchmarks/runs.ts">get</a>(runUid, { ...params }) -> RunGetResponse</code>
- <code title="get /factory/{uid}/benchmarks/runs/{run_uid}/results">client.factories.benchmarks.runs.<a href="./src/resources/factories/benchmarks/runs.ts">getResults</a>(runUid, { ...params }) -> RunGetResultsResponse</code>

## Files

Types:

- <code><a href="./src/resources/factories/files/files.ts">FileValidateResponse</a></code>

Methods:

- <code title="post /factory-files/validate">client.factories.files.<a href="./src/resources/factories/files/files.ts">validate</a>({ ...params }) -> FileValidateResponse</code>

### Schemas

Types:

- <code><a href="./src/resources/factories/files/schemas.ts">SchemaRetrieveResponse</a></code>
- <code><a href="./src/resources/factories/files/schemas.ts">SchemaListResponse</a></code>
- <code><a href="./src/resources/factories/files/schemas.ts">SchemaGetDocumentResponse</a></code>

Methods:

- <code title="get /factory-files/schemas/{schema_version}">client.factories.files.schemas.<a href="./src/resources/factories/files/schemas.ts">retrieve</a>(schemaVersion, { ...params }) -> SchemaRetrieveResponse</code>
- <code title="get /factory-files/schemas">client.factories.files.schemas.<a href="./src/resources/factories/files/schemas.ts">list</a>({ ...params }) -> SchemaListResponse</code>
- <code title="get /factory-files/schemas/{schema_version}/{document}">client.factories.files.schemas.<a href="./src/resources/factories/files/schemas.ts">getDocument</a>(document, { ...params }) -> SchemaGetDocumentResponse</code>
