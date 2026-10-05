// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AgentAPI from './agent';
import * as AgentAgentAPI from './agent_';
import {
  Agent as AgentAPIAgent,
  AgentCreateParams,
  AgentResponse,
  AgentUpdateParams,
  AutoMemoryResponse,
  CreateAgentRequest,
  ListAgentIdentitiesResponse,
  MemoryResponse,
  MemoryStoreAttachmentResponse,
  UpdateAgentRequest,
} from './agent_';
import * as ConversationsAPI from './conversations';
import {
  ConversationCheckRedirectResponse,
  ConversationDownloadScreenshotParams,
  ConversationInterruptResponse,
  ConversationRetrieveResponse,
  ConversationSubmitFollowupParams,
  ConversationSubmitFollowupResponse,
  Conversations,
} from './conversations';
import * as RunsAPI from './runs';
import {
  ArtifactItem,
  ConversationStep,
  RunCancelResponse,
  RunGetConversationResponse,
  RunGetHarnessUsageResponse,
  RunGetTimelineResponse,
  RunInterruptResponse,
  RunItem,
  RunItemsRunsCursorPage,
  RunListHandoffAttachmentsResponse,
  RunListParams,
  RunSourceType,
  RunState,
  RunSubmitFollowupParams,
  RunSubmitFollowupResponse,
  Runs,
} from './runs';
import * as SchedulesAPI from './schedules';
import {
  ScheduleCreateParams,
  ScheduleDeleteResponse,
  ScheduleListParams,
  ScheduleListResponse,
  ScheduleUpdateParams,
  ScheduledAgentHistoryItem,
  ScheduledAgentItem,
  Schedules,
} from './schedules';
import * as SessionsAPI from './sessions';
import { SessionCheckRedirectResponse, Sessions } from './sessions';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Operations for running and managing cloud agents
 */
export class Agent extends APIResource {
  runs: RunsAPI.Runs = new RunsAPI.Runs(this._client);
  schedules: SchedulesAPI.Schedules = new SchedulesAPI.Schedules(this._client);
  agent: AgentAgentAPI.Agent = new AgentAgentAPI.Agent(this._client);
  sessions: SessionsAPI.Sessions = new SessionsAPI.Sessions(this._client);
  conversations: ConversationsAPI.Conversations = new ConversationsAPI.Conversations(this._client);

  /**
   * Retrieve a list of available agents (skills) that can be used to run tasks.
   * Agents are discovered from environments or a specific repository.
   *
   * @deprecated
   */
  list(
    params: AgentListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AgentListResponse> {
    const { team_uid, ...query } = params ?? {};
    return this._client.get('/agent', {
      query,
      ...options,
      headers: buildHeaders([
        { ...(team_uid != null ? { 'X-Warp-Team-Uid': team_uid } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Redirect to a temporary signed download URL for a downloadable artifact. Public
   * artifacts can be downloaded without authentication; private artifacts require
   * the caller to be authenticated and authorized.
   *
   * @example
   * ```ts
   * const response = await client.agent.downloadArtifact(
   *   'artifactUid',
   * );
   *
   * const content = await response.blob();
   * console.log(content);
   * ```
   */
  downloadArtifact(artifactUid: string, options?: RequestOptions): APIPromise<Response> {
    return this._client.get(path`/agent/artifacts/${artifactUid}/download`, {
      ...options,
      headers: buildHeaders([{ Accept: 'application/octet-stream' }, options?.headers]),
      __binaryResponse: true,
    });
  }

  /**
   * Retrieve an artifact by its UUID: a time-limited signed download URL for
   * downloadable file-like artifacts, or the current plan content inline for plan
   * artifacts. Public artifacts can be read without authentication; private
   * artifacts require the caller to be authenticated and authorized.
   *
   * @example
   * ```ts
   * const response = await client.agent.getArtifact(
   *   'artifactUid',
   * );
   * ```
   */
  getArtifact(artifactUid: string, options?: RequestOptions): APIPromise<AgentGetArtifactResponse> {
    return this._client.get(path`/agent/artifacts/${artifactUid}`, options);
  }

  /**
   * Reverse-looks up the agent run that created an external reference with the given
   * URL. The URL is matched against the canonical locator stored when the artifact
   * was reported. Returns 404 when no matching run exists or when the caller lacks
   * access.
   *
   * @example
   * ```ts
   * const response =
   *   await client.agent.getRunByExternalReference({
   *     url: 'url',
   *   });
   * ```
   */
  getRunByExternalReference(
    query: AgentGetRunByExternalReferenceParams,
    options?: RequestOptions,
  ): APIPromise<AgentGetRunByExternalReferenceResponse> {
    return this._client.get('/agent/run-by-external-reference', { query, ...options });
  }

  /**
   * Retrieve cloud environments accessible to the authenticated principal. Returns
   * environments the caller owns, has been granted guest access to, or has accessed
   * via link sharing.
   *
   * @example
   * ```ts
   * const response = await client.agent.listEnvironments();
   * ```
   */
  listEnvironments(
    params: AgentListEnvironmentsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AgentListEnvironmentsResponse> {
    const { team_uid, ...query } = params ?? {};
    return this._client.get('/agent/environments', {
      query,
      ...options,
      headers: buildHeaders([
        { ...(team_uid != null ? { 'X-Warp-Team-Uid': team_uid } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Retrieve the list of LLM models available to the authenticated user for agent
   * runs. The response includes which model is the default, as well as per-model
   * metadata such as provider, cost, and whether the model is currently disabled
   * (and why).
   *
   * @example
   * ```ts
   * const response = await client.agent.listModels();
   * ```
   */
  listModels(options?: RequestOptions): APIPromise<AgentListModelsResponse> {
    return this._client.get('/agent/models', options);
  }

  /**
   * Spawn a cloud agent with a prompt and optional configuration. The agent will be
   * queued for execution and assigned a unique run ID.
   *
   * @example
   * ```ts
   * const response = await client.agent.run();
   * ```
   */
  run(params: AgentRunParams, options?: RequestOptions): APIPromise<AgentRunResponse> {
    const { team_uid, ...body } = params;
    return this._client.post('/agent/runs', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(team_uid != null ? { 'X-Warp-Team-Uid': team_uid } : undefined) },
        options?.headers,
      ]),
    });
  }
}

/**
 * Configuration for a cloud agent run
 */
export interface AgentConfigSnapshot {
  /**
   * Custom base prompt for the agent
   */
  base_prompt?: string;

  /**
   * Controls whether computer use is enabled for this agent. If not set, defaults to
   * true.
   */
  computer_use_enabled?: boolean;

  /**
   * Model the computer use subagent runs on; if omitted, the subagent picks its own
   * model automatically. Only applies to the built-in Warp harness — the value is
   * accepted but has no effect under a third-party harness or when computer use is
   * disabled. Requires an agent CLI version that supports the --computer-use-model
   * flag.
   */
  computer_use_model_id?: string;

  /**
   * Controls which principal's credentials are used when the platform mints tokens
   * (e.g. GitHub or GitLab OAuth tokens) on behalf of this run.
   *
   * - EXECUTOR (default when unset): credentials are sourced from the run's
   *   execution principal — a GitHub App installation token for agent principals, a
   *   personal OAuth token for user principals.
   * - CREATOR: credentials are always sourced from the run creator regardless of the
   *   execution principal, useful when a service account executes the run but Git
   *   operations should authenticate as the triggering human.
   */
  credential_strategy?: 'CREATOR' | 'EXECUTOR' | null;

  /**
   * UID of the environment to run the agent in
   */
  environment_id?: string;

  /**
   * Internal per-Factory run configuration, populated only by the server.
   */
  experimental?: { [key: string]: string | number | boolean | null };

  /**
   * Specifies which execution harness to use for the agent run. Default (nil/empty)
   * uses Warp's built-in harness. When stored as a named agent's default
   * (create/update agent identity), this field replaces the deprecated
   * base_harness/base_model pair: a harness other than `oz` here requires the
   * agent's base_model to be empty, since the two describe mutually exclusive
   * default models.
   */
  harness?: Harness;

  /**
   * Authentication secrets for third-party harnesses. Only the secret for the
   * harness specified gets injected into the environment.
   */
  harness_auth_secrets?: HarnessAuthSecrets;

  /**
   * Number of minutes to keep the agent environment alive after task completion. Set
   * to 0 to shut down immediately after task completion. If not set, defaults to 10
   * minutes. Maximum allowed value is min(60, floor(max_instance_runtime_seconds
   * / 60) for your billing tier).
   */
  idle_timeout_minutes?: number;

  /**
   * Inference provider settings used for LLM calls.
   */
  inference_providers?: InferenceProvidersConfig;

  /**
   * Map of MCP server configurations by name
   */
  mcp_servers?: { [key: string]: McpServerConfig };

  /**
   * Memory stores to attach to this run.
   */
  memory_stores?: Array<MemoryStoreRef>;

  /**
   * LLM model to use (uses team default if not specified)
   */
  model_id?: string;

  /**
   * Human-readable label for grouping, filtering, and traceability. Automatically
   * set to the skill name when running a skill-based agent. Set this explicitly to
   * categorize runs by intent (e.g., "nightly-dependency-check") so you can filter
   * and track them via the name query parameter on GET /agent/runs.
   */
  name?: string;

  /**
   * UID of the runner providing the run's compute (platform, instance shape, and
   * setup commands). When omitted on a request, the runner is resolved at run
   * creation from the agent's default runner, then the environment's default runner,
   * and the resolved UID is recorded on the run.
   */
  runner_id?: string;

  /**
   * Optional run-specific managed secret allowlist. Omission and an empty array both
   * add no generic secrets. Secret references from the resolved environment and
   * execution principal are still unioned into the run's secret scope.
   */
  secrets?: Array<SecretRef>;

  /**
   * Configures sharing behavior for the run's shared session; when set, the worker
   * emits `--share public:<level>` and the bundled Warp client applies an
   * anyone-with-link ACL to the shared session once it has bootstrapped. The same
   * ACL is mirrored onto the backing conversation so link viewers can read it
   * without being on the run's team, subject to the workspace-level anyone-with-link
   * sharing setting.
   */
  session_sharing?: SessionSharingConfig;

  /**
   * Skill specification identifying the primary agent skill to use, in
   * `{owner}/{repo}:{skill_path}` format (e.g.
   * `warpdotdev/warp-server:.claude/skills/deploy/SKILL.md`); mutually exclusive
   * with `skills` in create/update requests. Responses include the first `skills`
   * entry here for backward compatibility; use the list agents endpoint to discover
   * available skills.
   */
  skill_spec?: string;

  /**
   * Ordered skill specifications to attach to the run. Format:
   * "{owner}/{repo}:{skill_path}" Example:
   * "warpdotdev/warp-server:.claude/skills/deploy/SKILL.md" Mutually exclusive with
   * skill_spec in create/update requests.
   */
  skills?: Array<string>;

  /**
   * Self-hosted worker ID that should execute this task. If not specified or set to
   * "warp", the task runs on Warp-hosted workers.
   */
  worker_host?: string;
}

export interface AgentSkill {
  /**
   * Human-readable name of the agent
   */
  name: string;

  /**
   * Available variants of this agent
   */
  variants: Array<AgentSkill.Variant>;
}

export namespace AgentSkill {
  export interface Variant {
    /**
     * Stable identifier for this skill variant. Format: "{owner}/{repo}:{skill_path}"
     * Example: "warpdotdev/warp-server:.claude/skills/deploy/SKILL.md"
     */
    id: string;

    /**
     * Base prompt/instructions for the agent
     */
    base_prompt: string;

    /**
     * Description of the agent variant
     */
    description: string;

    /**
     * Environments where this agent variant is available
     */
    environments: Array<Variant.Environment>;

    source: Variant.Source;

    /**
     * Non-empty when the skill's SKILL.md file exists but is malformed. Contains a
     * description of the parse failure. Only present when
     * include_malformed_skills=true is passed to the list agents endpoint.
     */
    error?: string;

    /**
     * Timestamp of the last time this skill was run (RFC3339)
     */
    last_run_timestamp?: string | null;
  }

  export namespace Variant {
    export interface Environment {
      /**
       * Human-readable name of the environment
       */
      name: string;

      /**
       * Unique identifier for the environment
       */
      uid: string;
    }

    export interface Source {
      /**
       * GitHub repository name
       */
      name: string;

      /**
       * GitHub repository owner
       */
      owner: string;

      /**
       * Path to the skill definition file within the repository
       */
      skill_path: string;

      /**
       * Self-hosted worker host that reported this skill. Present only for skills
       * discovered from self-hosted workers (as opposed to skills from GitHub repos
       * linked to environments).
       */
      worker_host?: string;
    }
  }
}

/**
 * Configures AWS Bedrock as the LLM inference provider for this agent or run.
 */
export interface AwsInferenceProviderConfig {
  /**
   * If true, opt out of Bedrock at this layer.
   */
  disabled?: boolean;

  /**
   * AWS region used for STS when assuming the Bedrock inference role.
   */
  region?: string;

  /**
   * IAM role ARN to assume when calling Bedrock.
   */
  role_arn?: string;
}

/**
 * AWS IAM role assumption settings
 */
export interface AwsProviderConfig {
  /**
   * AWS IAM role ARN to assume
   */
  role_arn: string;
}

/**
 * A cloud environment for running agents
 */
export interface Environment {
  /**
   * Configuration for a cloud environment used by scheduled agents
   */
  config: EnvironmentConfig;

  /**
   * Timestamp when the environment was last updated (RFC3339)
   */
  last_updated: string;

  /**
   * True when the most recent task failed during setup before it started running
   */
  setup_failed: boolean;

  /**
   * Unique identifier for the environment
   */
  uid: string;

  creator?: UserProfile;

  last_editor?: UserProfile;

  /**
   * Summary of the most recently created task for an environment
   */
  last_task_created?: Environment.LastTaskCreated;

  /**
   * Timestamp of the most recent task run in this environment (RFC3339)
   */
  last_task_run_timestamp?: string | null;

  /**
   * Ownership scope for a resource (team or personal)
   */
  scope?: Scope;
}

export namespace Environment {
  /**
   * Summary of the most recently created task for an environment
   */
  export interface LastTaskCreated {
    /**
     * Unique identifier of the task
     */
    id: string;

    /**
     * When the task was created (RFC3339)
     */
    created_at: string;

    /**
     * Current state of the run:
     *
     * - QUEUED: Run is waiting to be picked up
     * - PENDING: Run is being prepared
     * - CLAIMED: Run has been claimed by a worker
     * - INPROGRESS: Run is actively being executed
     * - SUCCEEDED: Run completed successfully
     * - FAILED: Run failed
     * - BLOCKED: Run is blocked (e.g., awaiting user input or approval)
     * - ERROR: Run encountered an error
     * - CANCELLED: Run was cancelled by user
     */
    state: RunsAPI.RunState;

    /**
     * Title of the task
     */
    title: string;

    /**
     * When the task was last updated (RFC3339)
     */
    updated_at: string;

    /**
     * When the task started running (RFC3339), null if not yet started
     */
    started_at?: string | null;
  }
}

/**
 * Configuration for a cloud environment used by scheduled agents
 */
export interface EnvironmentConfig {
  /**
   * Optional description of the environment
   */
  description?: string | null;

  /**
   * Docker image to use (e.g., "ubuntu:latest" or "registry/repo:tag")
   */
  docker_image?: string;

  /**
   * When set (1–60 minutes), a failed run using this environment keeps its session
   * open for this many minutes so it can be inspected; null or absent means
   * immediate teardown (disabled by default). This is an idle window held open by
   * the agent process: activity in the session pushes the deadline out (so an active
   * session is not torn down mid-debug), and it ends early if the run's sandbox
   * reaches its own deadline first. Applies only to future failures of runs using
   * this environment; opting in keeps injected environment data (including secrets)
   * alive and incurs compute usage for as long as the session is held open.
   */
  failure_session_retention_minutes?: number | null;

  /**
   * List of GitHub repositories to clone into the environment
   */
  github_repos?: Array<EnvironmentConfig.GitHubRepo>;

  /**
   * Human-readable name for the environment
   */
  name?: string;

  /**
   * Optional cloud provider configurations for automatic auth
   */
  providers?: EnvironmentConfig.Providers;

  /**
   * Managed secret references contributed by this environment. Omission and an empty
   * array both contribute no secrets. These references are unioned with references
   * from the run config and execution principal.
   */
  secrets?: Array<SecretRef>;

  /**
   * Shell commands to run during environment setup
   */
  setup_commands?: Array<string>;
}

export namespace EnvironmentConfig {
  export interface GitHubRepo {
    /**
     * GitHub repository owner (user or organization)
     */
    owner: string;

    /**
     * GitHub repository name
     */
    repo: string;
  }

  /**
   * Optional cloud provider configurations for automatic auth
   */
  export interface Providers {
    /**
     * AWS IAM role assumption settings
     */
    aws?: AgentAPI.AwsProviderConfig;

    /**
     * GCP Workload Identity Federation settings
     */
    gcp?: AgentAPI.GcpProviderConfig;
  }
}

/**
 * Error response following RFC 7807 (Problem Details for HTTP APIs), using the
 * `application/problem+json` content type. Includes backward-compatible extension
 * members; additional ones (e.g., `auth_url`, `provider`) may be present depending
 * on the error code.
 */
export interface Error {
  /**
   * Human-readable error message combining title and detail. Backward-compatible
   * extension member for older clients.
   */
  error: string;

  /**
   * The HTTP status code for this occurrence of the problem (RFC 7807)
   */
  status: number;

  /**
   * A short, human-readable summary of the problem type (RFC 7807)
   */
  title: string;

  /**
   * A URI reference that identifies the problem type (RFC 7807). Format:
   * `https://docs.warp.dev/reference/api-and-sdk/troubleshooting/errors/{error_code}`
   * See PlatformErrorCode for the list of possible error codes.
   */
  type: string;

  /**
   * URL where the caller can reconnect the external provider.
   */
  auth_url?: string;

  /**
   * A human-readable explanation specific to this occurrence of the problem
   * (RFC 7807)
   */
  detail?: string;

  /**
   * The request path that generated this error (RFC 7807)
   */
  instance?: string;

  /**
   * External provider that requires authorization, such as `linear`.
   */
  provider?: string;

  /**
   * Whether the request can be retried. When true, the error is transient and the
   * request may be retried. When false, retrying without addressing the underlying
   * cause will not succeed.
   */
  retryable?: boolean;

  /**
   * OpenTelemetry trace ID for debugging and support requests
   */
  trace_id?: string;
}

/**
 * Machine-readable error code identifying the problem type. Used in the `type` URI
 * of Error responses and in the `error_code` field of RunStatusMessage.
 *
 * User errors (run transitions to FAILED):
 *
 * - `insufficient_credits` — Team has no remaining add-on credits
 * - `feature_not_available` — Required feature not enabled for user's plan
 * - `external_authentication_required` — User hasn't authorized a required
 *   external service
 * - `not_authorized` — Principal lacks permission for the requested operation
 * - `invalid_request` — Request is malformed or contains invalid parameters
 * - `resource_not_found` — Referenced resource does not exist
 * - `budget_exceeded` — Spending budget limit has been reached
 * - `integration_disabled` — Integration is disabled and must be enabled
 * - `integration_not_configured` — Integration setup is incomplete
 * - `operation_not_supported` — Requested operation not supported for this
 *   resource/state
 * - `environment_setup_failed` — Client-side environment setup failed
 * - `content_policy_violation` — Prompt or setup commands violated content policy
 * - `conflict` — Request conflicts with the current state of the resource
 *
 * Warp errors (run transitions to ERROR):
 *
 * - `authentication_required` — Request lacks valid authentication credentials
 * - `resource_unavailable` — Transient infrastructure issue (retryable)
 * - `agent_stream_network_error` — MAA response stream terminally failed because
 *   of a transport or EOF error
 * - `agent_stream_failure` — MAA server explicitly reported a terminal response
 *   stream failure
 * - `internal_error` — Unexpected server-side error (retryable)
 */
export type ErrorCode =
  | 'insufficient_credits'
  | 'feature_not_available'
  | 'external_authentication_required'
  | 'not_authorized'
  | 'invalid_request'
  | 'resource_not_found'
  | 'budget_exceeded'
  | 'integration_disabled'
  | 'integration_not_configured'
  | 'operation_not_supported'
  | 'environment_setup_failed'
  | 'content_policy_violation'
  | 'conflict'
  | 'authentication_required'
  | 'resource_unavailable'
  | 'agent_stream_network_error'
  | 'agent_stream_failure'
  | 'internal_error';

/**
 * GCP Workload Identity Federation settings
 */
export interface GcpProviderConfig {
  /**
   * GCP project number
   */
  project_number: string;

  /**
   * Workload Identity Federation pool ID
   */
  workload_identity_federation_pool_id: string;

  /**
   * Workload Identity Federation provider ID
   */
  workload_identity_federation_provider_id: string;

  /**
   * Optional GCP service account email to impersonate
   */
  service_account_email?: string;
}

/**
 * Specifies which execution harness to use for the agent run. Default (nil/empty)
 * uses Warp's built-in harness. When stored as a named agent's default
 * (create/update agent identity), this field replaces the deprecated
 * base_harness/base_model pair: a harness other than `oz` here requires the
 * agent's base_model to be empty, since the two describe mutually exclusive
 * default models.
 */
export interface Harness {
  /**
   * Model to use with a third-party harness (e.g. "claude-haiku-4-5"). Only applies
   * when type is a harness other than `oz`; the top-level config model_id targets
   * the built-in Warp harness instead. When omitted or empty, the harness uses its
   * own default model. For an individual Warp-managed Factory Claude Code agent,
   * send an explicit empty string to use the environment's model. Omitting model_id
   * when replacing that agent's harness is invalid.
   */
  model_id?: string;

  /**
   * Reasoning effort for harnesses that support it (e.g. Codex). Only applies when
   * type is a harness other than `oz`. Ignored by harnesses that do not support
   * reasoning levels.
   */
  reasoning_level?: string;

  /**
   * The harness type identifier.
   *
   * - oz: Warp's built-in harness (default)
   * - claude: Claude Code harness
   * - gemini: Gemini CLI harness
   * - codex: Codex CLI harness
   */
  type?: 'oz' | 'claude' | 'gemini' | 'codex';
}

/**
 * Authentication secrets for third-party harnesses. Only the secret for the
 * harness specified gets injected into the environment.
 */
export interface HarnessAuthSecrets {
  /**
   * Name of a managed secret for Claude Code harness authentication. The secret must
   * exist within the caller's personal or team scope. Only applicable when harness
   * type is "claude".
   */
  claude_auth_secret_name?: string;

  /**
   * Name of a managed secret for Codex harness authentication. The secret must exist
   * within the caller's personal or team scope. Only applicable when harness type is
   * "codex".
   */
  codex_auth_secret_name?: string;
}

/**
 * Inference provider settings used for LLM calls.
 */
export interface InferenceProvidersConfig {
  /**
   * Configures AWS Bedrock as the LLM inference provider for this agent or run.
   */
  aws?: AwsInferenceProviderConfig;
}

/**
 * Configuration for an MCP server. Must have exactly one of: warp_id, command, or
 * url.
 */
export interface McpServerConfig {
  /**
   * Stdio transport - command arguments
   */
  args?: Array<string>;

  /**
   * Stdio transport - command to run
   */
  command?: string;

  /**
   * Environment variables for the server
   */
  env?: { [key: string]: string };

  /**
   * HTTP headers for SSE/HTTP transport
   */
  headers?: { [key: string]: string };

  /**
   * SSE/HTTP transport - server URL
   */
  url?: string;

  /**
   * Reference to a Warp shared MCP server by UUID, or a well-known integration MCP
   * id (e.g. "linear") backed by the team's integration connection.
   */
  warp_id?: string;
}

/**
 * Reference to a memory store to attach to an agent.
 */
export interface MemoryStoreRef {
  /**
   * Access level for the store.
   */
  access: 'read_write' | 'read_only';

  /**
   * Instructions for how the agent should use this memory store. Must not be empty.
   */
  instructions: string;

  /**
   * UID of the memory store.
   */
  uid: string;
}

/**
 * Ownership scope for a resource (team or personal)
 */
export interface Scope {
  /**
   * Type of ownership ("User" for personal, "Team" for team-owned)
   */
  type: 'User' | 'Team';

  /**
   * UID of the owning user or team
   */
  uid?: string;
}

/**
 * Reference to a managed secret by name.
 */
export interface SecretRef {
  /**
   * Name of the managed secret.
   */
  name: string;
}

/**
 * Configures sharing behavior for the run's shared session; when set, the worker
 * emits `--share public:<level>` and the bundled Warp client applies an
 * anyone-with-link ACL to the shared session once it has bootstrapped. The same
 * ACL is mirrored onto the backing conversation so link viewers can read it
 * without being on the run's team, subject to the workspace-level anyone-with-link
 * sharing setting.
 */
export interface SessionSharingConfig {
  /**
   * Grants anyone-with-link access at the specified level to the run's shared
   * session and backing conversation; link viewers must still be authenticated Warp
   * users (anonymous reads are not supported in this release).
   *
   * - VIEWER: link viewers can read the session and conversation.
   * - EDITOR: link viewers can also interact with the session.
   */
  public_access?: 'VIEWER' | 'EDITOR';
}

export interface UserProfile {
  /**
   * Display name of the creator
   */
  display_name?: string;

  /**
   * Email address of the creator
   */
  email?: string;

  /**
   * URL to the creator's photo
   */
  photo_url?: string;

  /**
   * Type of the creator principal
   */
  type?: 'user' | 'service_account';

  /**
   * Unique identifier of the creator
   */
  uid?: string;
}

export interface AgentListResponse {
  /**
   * List of available agents
   */
  agents: Array<AgentSkill>;
}

/**
 * Response for retrieving a plan artifact.
 */
export type AgentGetArtifactResponse =
  | AgentGetArtifactResponse.PlanArtifactResponse
  | AgentGetArtifactResponse.ScreenshotArtifactResponse
  | AgentGetArtifactResponse.FileArtifactResponse;

export namespace AgentGetArtifactResponse {
  /**
   * Response for retrieving a plan artifact.
   */
  export interface PlanArtifactResponse {
    /**
     * Type of the artifact
     */
    artifact_type: 'PLAN';

    /**
     * Unique identifier (UUID) for the artifact
     */
    artifact_uid: string;

    /**
     * Timestamp when the artifact was created (RFC3339)
     */
    created_at: string;

    /**
     * Response data for a plan artifact, including current markdown content.
     */
    data: PlanArtifactResponse.Data;
  }

  export namespace PlanArtifactResponse {
    /**
     * Response data for a plan artifact, including current markdown content.
     */
    export interface Data {
      /**
       * Current markdown content of the plan
       */
      content: string;

      /**
       * MIME type of the returned plan content
       */
      content_type: string;

      /**
       * Unique identifier for the plan document
       */
      document_uid: string;

      /**
       * Unique identifier for the associated notebook
       */
      notebook_uid: string;

      /**
       * Current title of the plan
       */
      title?: string;

      /**
       * URL to open the plan in Warp Drive
       */
      url?: string;
    }
  }

  /**
   * Response for retrieving a screenshot artifact.
   */
  export interface ScreenshotArtifactResponse {
    /**
     * Type of the artifact
     */
    artifact_type: 'SCREENSHOT';

    /**
     * Unique identifier (UUID) for the artifact
     */
    artifact_uid: string;

    /**
     * Timestamp when the artifact was created (RFC3339)
     */
    created_at: string;

    /**
     * Response data for a screenshot artifact, including a signed download URL.
     */
    data: ScreenshotArtifactResponse.Data;

    /**
     * Links to the originating run and pull requests reported in its tree.
     * Destinations enforce their own access rules.
     */
    source_links?: ScreenshotArtifactResponse.SourceLinks;
  }

  export namespace ScreenshotArtifactResponse {
    /**
     * Response data for a screenshot artifact, including a signed download URL.
     */
    export interface Data {
      /**
       * MIME type of the screenshot (e.g., image/png)
       */
      content_type: string;

      /**
       * Time-limited signed URL to download the screenshot
       */
      download_url: string;

      /**
       * Timestamp when the download URL expires (RFC3339)
       */
      expires_at: string;

      /**
       * Optional description of the screenshot
       */
      description?: string;
    }

    /**
     * Links to the originating run and pull requests reported in its tree.
     * Destinations enforce their own access rules.
     */
    export interface SourceLinks {
      /**
       * Distinct pull requests reported by runs in the same tree.
       */
      pull_request_urls?: Array<string>;

      /**
       * Factory run page for the originating root run, when bound to a live Factory
       * task.
       */
      run_url?: string;
    }
  }

  /**
   * Response for retrieving a file artifact.
   */
  export interface FileArtifactResponse {
    /**
     * Type of the artifact
     */
    artifact_type: 'FILE';

    /**
     * Unique identifier (UUID) for the artifact
     */
    artifact_uid: string;

    /**
     * Timestamp when the artifact was created (RFC3339)
     */
    created_at: string;

    /**
     * Response data for a file artifact, including a signed download URL.
     */
    data: FileArtifactResponse.Data;

    /**
     * Links to the originating run and pull requests reported in its tree.
     * Destinations enforce their own access rules.
     */
    source_links?: FileArtifactResponse.SourceLinks;
  }

  export namespace FileArtifactResponse {
    /**
     * Response data for a file artifact, including a signed download URL.
     */
    export interface Data {
      /**
       * MIME type of the uploaded file
       */
      content_type: string;

      /**
       * Time-limited signed URL to download the file
       */
      download_url: string;

      /**
       * Timestamp when the download URL expires (RFC3339)
       */
      expires_at: string;

      /**
       * Last path component of filepath
       */
      filename: string;

      /**
       * Optional description of the file
       */
      description?: string;

      /**
       * Conversation-relative filepath for the uploaded file. Omitted for anonymous
       * reads of public artifacts.
       */
      filepath?: string;

      /**
       * Size of the uploaded file in bytes
       */
      size_bytes?: number;

      /**
       * Short, badge-visible label for the artifact. For recording artifacts, this is
       * the agent-authored title shown in Warp web and blocklist badges. Distinct from
       * description, which is longer and shown in detail views.
       */
      title?: string;
    }

    /**
     * Links to the originating run and pull requests reported in its tree.
     * Destinations enforce their own access rules.
     */
    export interface SourceLinks {
      /**
       * Distinct pull requests reported by runs in the same tree.
       */
      pull_request_urls?: Array<string>;

      /**
       * Factory run page for the originating root run, when bound to a live Factory
       * task.
       */
      run_url?: string;
    }
  }
}

/**
 * Response for a run reverse-lookup by external reference URL.
 */
export interface AgentGetRunByExternalReferenceResponse {
  /**
   * The ID of the run that produced the external reference.
   */
  run_id: string;
}

export interface AgentListEnvironmentsResponse {
  /**
   * List of accessible cloud environments
   */
  environments: Array<Environment>;
}

export interface AgentListModelsResponse {
  /**
   * The ID of the default model for agent runs
   */
  default_model_id: string;

  /**
   * List of available models
   */
  models: Array<AgentListModelsResponse.Model>;
}

export namespace AgentListModelsResponse {
  export interface Model {
    /**
     * Unique identifier for the model (e.g. "claude-4-6-opus-high" or "gpt-5-4-high")
     */
    id: string;

    /**
     * Human-readable name of the model
     */
    display_name: string;

    /**
     * The LLM provider
     */
    provider: 'OPENAI' | 'ANTHROPIC' | 'GOOGLE' | 'UNKNOWN';

    /**
     * Whether the model supports vision/image inputs
     */
    vision_supported: boolean;

    /**
     * Optional extra descriptor for the model
     */
    description?: string;

    /**
     * If set, the model is currently unavailable for the given reason
     */
    disable_reason?: 'PROVIDER_OUTAGE' | 'OUT_OF_REQUESTS' | 'ADMIN_DISABLED' | 'REQUIRES_UPGRADE';

    /**
     * Reasoning level descriptor, if any (e.g. "low", "medium", "high")
     */
    reasoning_level?: string;
  }
}

export interface AgentRunResponse {
  /**
   * Unique identifier for the created run
   */
  run_id: string;

  /**
   * Current state of the run:
   *
   * - QUEUED: Run is waiting to be picked up
   * - PENDING: Run is being prepared
   * - CLAIMED: Run has been claimed by a worker
   * - INPROGRESS: Run is actively being executed
   * - SUCCEEDED: Run completed successfully
   * - FAILED: Run failed
   * - BLOCKED: Run is blocked (e.g., awaiting user input or approval)
   * - ERROR: Run encountered an error
   * - CANCELLED: Run was cancelled by user
   */
  state: RunsAPI.RunState;

  /**
   * @deprecated Use run_id instead.
   */
  task_id: string;

  /**
   * Whether the system is at capacity when the run was created
   */
  at_capacity?: boolean;
}

export interface AgentListParams {
  /**
   * Query param: When true, includes skills whose SKILL.md file exists but is
   * malformed. These variants will have a non-empty `error` field describing the
   * parse failure. Defaults to false.
   */
  include_malformed_skills?: boolean;

  /**
   * Query param: When true, clears the agent list cache before fetching. Use this to
   * force a refresh of the available agents.
   */
  refresh?: boolean;

  /**
   * Query param: Optional repository specification to list agents from (format:
   * "owner/repo"). If not provided, lists agents from all accessible environments.
   */
  repo?: string;

  /**
   * Query param: Sort order for the returned agents.
   *
   * - "name": Sort alphabetically by name (default)
   * - "last_run": Sort by most recently used
   */
  sort_by?: 'name' | 'last_run';

  /**
   * Header param: UID of the team to use as the request's active team. Ignored for
   * service-account callers, which always act as their bound team.
   */
  team_uid?: string;
}

export interface AgentGetRunByExternalReferenceParams {
  /**
   * The canonical URL of the external reference artifact to look up.
   */
  url: string;
}

export interface AgentListEnvironmentsParams {
  /**
   * Query param: Sort order for the returned environments.
   *
   * - `name`: alphabetical by environment name
   * - `last_updated`: most recently updated first (default)
   */
  sort_by?: 'name' | 'last_updated';

  /**
   * Header param: UID of the team to use as the request's active team. Ignored for
   * service-account callers, which always act as their bound team.
   */
  team_uid?: string;
}

export interface AgentRunParams {
  /**
   * Body param: Optional agent identity UID to use as the execution principal for
   * the run. This is only valid for runs that are team owned.
   */
  agent_identity_uid?: string;

  /**
   * Body param: Optional file attachments to include with the prompt (max 5).
   * Attachments are uploaded to cloud storage and made available to the agent.
   */
  attachments?: Array<AgentRunParams.Attachment>;

  /**
   * Body param: Configuration for a cloud agent run
   */
  config?: AgentConfigSnapshot;

  /**
   * Body param: Optional conversation ID to continue an existing conversation. If
   * provided, the agent will continue from where the previous run left off.
   */
  conversation_id?: string;

  /**
   * Body param: Whether the run should be interactive. If not set, defaults to
   * false.
   */
  interactive?: boolean;

  /**
   * Body param: Custom key/value metadata attached to a run at creation time and
   * immutable afterward; at most 20 keys, with keys 1-64 bytes matching
   * [a-zA-Z0-9._-]+ (case-sensitive) and values 0-256 bytes of UTF-8 with no NUL
   * characters. Requests with invalid metadata are rejected. A run's effective
   * metadata is merged per key at creation: explicit request keys override keys
   * inherited from the parent run, which override automatic keys (ticket_id and
   * ticket_source on Linear- and Jira-triggered runs).
   */
  metadata?: { [key: string]: string };

  /**
   * Body param: Optional query mode for the run. Defaults to `normal` when omitted.
   * The server does not infer mode from prompt prefixes such as `/plan`, so callers
   * should pass this field explicitly to request non-normal behavior.
   */
  mode?: 'normal' | 'plan' | 'orchestrate';

  /**
   * Body param: Optional email address or user ID of a Warp user to attribute the
   * run to; when set, the resolved user becomes the run's creator instead of the
   * caller. Only agent API keys may use this field, only when the calling agent has
   * on_behalf_of enabled in its configuration (a team admin must turn this on per
   * agent), and only for team-owned runs. The target user must be an active member
   * of the run's owner team.
   */
  on_behalf_of?: string;

  /**
   * Body param: Optional run ID of the parent that spawned this run, used for
   * orchestration hierarchies; the parent run must exist and be visible to the
   * caller, or the request is rejected with a 400. Child runs are also subject to
   * the server's maximum orchestration depth, and requests that would exceed it are
   * rejected with a 400.
   */
  parent_run_id?: string;

  /**
   * Body param: The prompt/instruction for the agent to execute. Required unless a
   * skill is specified via the skill field, config.skill_spec, or config.skills.
   * Handoff requests may omit prompt when conversation_id is set.
   */
  prompt?: string;

  /**
   * Body param: Skill specification to use as the base prompt for the agent.
   * Supported formats:
   *
   * - "repo:skill_name" - Simple name in specific repo
   * - "repo:skill_path" - Full path in specific repo
   * - "org/repo:skill_name" - Simple name with org and repo
   * - "org/repo:skill_path" - Full path with org and repo When provided, this takes
   *   precedence over config.skill_spec.
   */
  skill?: string;

  /**
   * Body param: Whether to create a team-owned run. Defaults to true for users on a
   * single team.
   */
  team?: boolean;

  /**
   * Body param: Custom title for the run (auto-generated if not provided)
   */
  title?: string;

  /**
   * Header param: UID of the team to use as the request's active team. Ignored for
   * service-account callers, which always act as their bound team.
   */
  team_uid?: string;
}

export namespace AgentRunParams {
  /**
   * A base64-encoded file attachment to include with the prompt
   */
  export interface Attachment {
    /**
     * Base64-encoded attachment data
     */
    data: string;

    /**
     * Name of the attached file
     */
    file_name: string;

    /**
     * MIME type of the attachment. Supported image types: image/jpeg, image/png,
     * image/gif, image/webp
     */
    mime_type: string;
  }
}

Agent.Runs = Runs;
Agent.Schedules = Schedules;
Agent.Agent = AgentAPIAgent;
Agent.Sessions = Sessions;
Agent.Conversations = Conversations;

export declare namespace Agent {
  export {
    type AgentConfigSnapshot as AgentConfigSnapshot,
    type AgentSkill as AgentSkill,
    type AwsInferenceProviderConfig as AwsInferenceProviderConfig,
    type AwsProviderConfig as AwsProviderConfig,
    type Environment as Environment,
    type EnvironmentConfig as EnvironmentConfig,
    type Error as Error,
    type ErrorCode as ErrorCode,
    type GcpProviderConfig as GcpProviderConfig,
    type Harness as Harness,
    type HarnessAuthSecrets as HarnessAuthSecrets,
    type InferenceProvidersConfig as InferenceProvidersConfig,
    type McpServerConfig as McpServerConfig,
    type MemoryStoreRef as MemoryStoreRef,
    type Scope as Scope,
    type SecretRef as SecretRef,
    type SessionSharingConfig as SessionSharingConfig,
    type UserProfile as UserProfile,
    type AgentListResponse as AgentListResponse,
    type AgentGetArtifactResponse as AgentGetArtifactResponse,
    type AgentGetRunByExternalReferenceResponse as AgentGetRunByExternalReferenceResponse,
    type AgentListEnvironmentsResponse as AgentListEnvironmentsResponse,
    type AgentListModelsResponse as AgentListModelsResponse,
    type AgentRunResponse as AgentRunResponse,
    type AgentListParams as AgentListParams,
    type AgentGetRunByExternalReferenceParams as AgentGetRunByExternalReferenceParams,
    type AgentListEnvironmentsParams as AgentListEnvironmentsParams,
    type AgentRunParams as AgentRunParams,
  };

  export {
    Runs as Runs,
    type ArtifactItem as ArtifactItem,
    type ConversationStep as ConversationStep,
    type RunItem as RunItem,
    type RunSourceType as RunSourceType,
    type RunState as RunState,
    type RunCancelResponse as RunCancelResponse,
    type RunGetConversationResponse as RunGetConversationResponse,
    type RunGetHarnessUsageResponse as RunGetHarnessUsageResponse,
    type RunGetTimelineResponse as RunGetTimelineResponse,
    type RunInterruptResponse as RunInterruptResponse,
    type RunListHandoffAttachmentsResponse as RunListHandoffAttachmentsResponse,
    type RunSubmitFollowupResponse as RunSubmitFollowupResponse,
    type RunItemsRunsCursorPage as RunItemsRunsCursorPage,
    type RunListParams as RunListParams,
    type RunSubmitFollowupParams as RunSubmitFollowupParams,
  };

  export {
    Schedules as Schedules,
    type ScheduledAgentHistoryItem as ScheduledAgentHistoryItem,
    type ScheduledAgentItem as ScheduledAgentItem,
    type ScheduleListResponse as ScheduleListResponse,
    type ScheduleDeleteResponse as ScheduleDeleteResponse,
    type ScheduleCreateParams as ScheduleCreateParams,
    type ScheduleUpdateParams as ScheduleUpdateParams,
    type ScheduleListParams as ScheduleListParams,
  };

  export {
    AgentAPIAgent as Agent,
    type AgentResponse as AgentResponse,
    type AutoMemoryResponse as AutoMemoryResponse,
    type CreateAgentRequest as CreateAgentRequest,
    type ListAgentIdentitiesResponse as ListAgentIdentitiesResponse,
    type MemoryResponse as MemoryResponse,
    type MemoryStoreAttachmentResponse as MemoryStoreAttachmentResponse,
    type UpdateAgentRequest as UpdateAgentRequest,
    type AgentCreateParams as AgentCreateParams,
    type AgentUpdateParams as AgentUpdateParams,
  };

  export { Sessions as Sessions, type SessionCheckRedirectResponse as SessionCheckRedirectResponse };

  export {
    Conversations as Conversations,
    type ConversationRetrieveResponse as ConversationRetrieveResponse,
    type ConversationCheckRedirectResponse as ConversationCheckRedirectResponse,
    type ConversationInterruptResponse as ConversationInterruptResponse,
    type ConversationSubmitFollowupResponse as ConversationSubmitFollowupResponse,
    type ConversationDownloadScreenshotParams as ConversationDownloadScreenshotParams,
    type ConversationSubmitFollowupParams as ConversationSubmitFollowupParams,
  };
}
