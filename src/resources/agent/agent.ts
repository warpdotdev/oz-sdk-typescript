// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AgentAPI from './agent';
import * as AgentAgentAPI from './agent_';
import {
  Agent as AgentAPIAgent,
  AgentCreateParams,
  AgentResponse,
  AgentUpdateParams,
  CreateAgentRequest,
  ListAgentIdentitiesResponse,
  UpdateAgentRequest,
} from './agent_';
import * as RunsAPI from './runs';
import {
  ArtifactItem,
  RunCancelResponse,
  RunItem,
  RunItemsRunsCursorPage,
  RunListParams,
  RunSourceType,
  RunState,
  Runs,
} from './runs';
import * as SchedulesAPI from './schedules';
import {
  ScheduleCreateParams,
  ScheduleDeleteResponse,
  ScheduleListResponse,
  ScheduleUpdateParams,
  ScheduledAgentHistoryItem,
  ScheduledAgentItem,
  Schedules,
} from './schedules';
import * as SessionsAPI from './sessions';
import { SessionCheckRedirectResponse, Sessions } from './sessions';
import { APIPromise } from '../../core/api-promise';
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

  /**
   * Retrieve a list of available agents (skills) that can be used to run tasks.
   * Agents are discovered from environments or a specific repository.
   *
   * @example
   * ```ts
   * const agents = await client.agent.list();
   * ```
   */
  list(
    query: AgentListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AgentListResponse> {
    return this._client.get('/agent', { query, ...options });
  }

  /**
   * Retrieve an artifact by its UUID. For downloadable file-like artifacts, returns
   * a time-limited signed download URL. For plan artifacts, returns the current plan
   * content inline.
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
    query: AgentListEnvironmentsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AgentListEnvironmentsResponse> {
    return this._client.get('/agent/environments', { query, ...options });
  }

  /**
   * Alias for POST /agent/run. This is the preferred endpoint for creating new agent
   * runs. Behavior is identical to POST /agent/run.
   *
   * @example
   * ```ts
   * const response = await client.agent.run();
   * ```
   */
  run(body: AgentRunParams, options?: RequestOptions): APIPromise<AgentRunResponse> {
    return this._client.post('/agent/runs', { body, ...options });
  }
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
 * Configuration for a cloud agent run
 */
export interface AmbientAgentConfig {
  /**
   * Custom base prompt for the agent
   */
  base_prompt?: string;

  /**
   * Controls whether computer use is enabled for this agent. If not set, defaults to
   * false.
   */
  computer_use_enabled?: boolean;

  /**
   * UID of the environment to run the agent in
   */
  environment_id?: string;

  /**
   * Specifies which execution harness to use for the agent run. Default (nil/empty)
   * uses Warp's built-in harness.
   */
  harness?: AmbientAgentConfig.Harness;

  /**
   * Authentication secrets for third-party harnesses. Only the secret for the
   * harness specified gets injected into the environment.
   */
  harness_auth_secrets?: AmbientAgentConfig.HarnessAuthSecrets;

  /**
   * Number of minutes to keep the agent environment alive after task completion. If
   * not set, defaults to 10 minutes. Maximum allowed value is min(60,
   * floor(max_instance_runtime_seconds / 60) for your billing tier).
   */
  idle_timeout_minutes?: number;

  /**
   * Map of MCP server configurations by name
   */
  mcp_servers?: { [key: string]: McpServerConfig };

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
   * Configures sharing behavior for the run's shared session. When set, the worker
   * emits `--share public:<level>` and the bundled Warp client applies an
   * anyone-with-link ACL to the shared session once it has bootstrapped. The same
   * ACL is mirrored onto the backing conversation so link viewers can read the
   * conversation without being on the run's team. Subject to the workspace-level
   * anyone-with-link sharing setting.
   */
  session_sharing?: AmbientAgentConfig.SessionSharing;

  /**
   * Skill specification identifying which agent skill to use. Format:
   * "{owner}/{repo}:{skill_path}" Example:
   * "warpdotdev/warp-server:.claude/skills/deploy/SKILL.md" Use the list agents
   * endpoint to discover available skills.
   */
  skill_spec?: string;

  /**
   * Self-hosted worker ID that should execute this task. If not specified or set to
   * "warp", the task runs on Warp-hosted workers.
   */
  worker_host?: string;
}

export namespace AmbientAgentConfig {
  /**
   * Specifies which execution harness to use for the agent run. Default (nil/empty)
   * uses Warp's built-in harness.
   */
  export interface Harness {
    /**
     * The harness type identifier.
     *
     * - oz: Warp's built-in harness (default)
     * - claude: Claude Code harness
     */
    type?: 'oz' | 'claude';
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
  }

  /**
   * Configures sharing behavior for the run's shared session. When set, the worker
   * emits `--share public:<level>` and the bundled Warp client applies an
   * anyone-with-link ACL to the shared session once it has bootstrapped. The same
   * ACL is mirrored onto the backing conversation so link viewers can read the
   * conversation without being on the run's team. Subject to the workspace-level
   * anyone-with-link sharing setting.
   */
  export interface SessionSharing {
    /**
     * Grants anyone-with-link access at the specified level to the run's shared
     * session and backing conversation.
     *
     * - VIEWER: link viewers can read the session and conversation.
     * - EDITOR: link viewers can also interact with the session. Anonymous
     *   (unauthenticated) reads are not supported in this release; link viewers must
     *   still be authenticated Warp users.
     */
    public_access?: 'VIEWER' | 'EDITOR';
  }
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
export interface CloudEnvironment {
  /**
   * Configuration for a cloud environment used by scheduled agents
   */
  config: CloudEnvironmentConfig;

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
  last_task_created?: CloudEnvironment.LastTaskCreated;

  /**
   * Timestamp of the most recent task run in this environment (RFC3339)
   */
  last_task_run_timestamp?: string | null;

  /**
   * Ownership scope for a resource (team or personal)
   */
  scope?: Scope;
}

export namespace CloudEnvironment {
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
export interface CloudEnvironmentConfig {
  /**
   * Optional description of the environment
   */
  description?: string | null;

  /**
   * Docker image to use (e.g., "ubuntu:latest" or "registry/repo:tag")
   */
  docker_image?: string;

  /**
   * List of GitHub repositories to clone into the environment
   */
  github_repos?: Array<CloudEnvironmentConfig.GitHubRepo>;

  /**
   * Human-readable name for the environment
   */
  name?: string;

  /**
   * Optional cloud provider configurations for automatic auth
   */
  providers?: CloudEnvironmentConfig.Providers;

  /**
   * Shell commands to run during environment setup
   */
  setup_commands?: Array<string>;
}

export namespace CloudEnvironmentConfig {
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
 * Error response following RFC 7807 (Problem Details for HTTP APIs). Includes
 * backward-compatible extension members.
 *
 * The response uses the `application/problem+json` content type. Additional
 * extension members (e.g., `auth_url`, `provider`) may be present depending on the
 * error code.
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
   * A human-readable explanation specific to this occurrence of the problem
   * (RFC 7807)
   */
  detail?: string;

  /**
   * The request path that generated this error (RFC 7807)
   */
  instance?: string;

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
   * Reference to a Warp shared MCP server by UUID
   */
  warp_id?: string;
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
       * Conversation-relative filepath for the uploaded file
       */
      filepath: string;

      /**
       * Optional description of the file
       */
      description?: string;

      /**
       * Size of the uploaded file in bytes
       */
      size_bytes?: number;
    }
  }
}

export interface AgentListEnvironmentsResponse {
  /**
   * List of accessible cloud environments
   */
  environments: Array<CloudEnvironment>;
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
   * When true, includes skills whose SKILL.md file exists but is malformed. These
   * variants will have a non-empty `error` field describing the parse failure.
   * Defaults to false.
   */
  include_malformed_skills?: boolean;

  /**
   * When true, clears the agent list cache before fetching. Use this to force a
   * refresh of the available agents.
   */
  refresh?: boolean;

  /**
   * Optional repository specification to list agents from (format: "owner/repo"). If
   * not provided, lists agents from all accessible environments.
   */
  repo?: string;

  /**
   * Sort order for the returned agents.
   *
   * - "name": Sort alphabetically by name (default)
   * - "last_run": Sort by most recently used
   */
  sort_by?: 'name' | 'last_run';
}

export interface AgentListEnvironmentsParams {
  /**
   * Sort order for the returned environments.
   *
   * - `name`: alphabetical by environment name
   * - `last_updated`: most recently updated first (default)
   */
  sort_by?: 'name' | 'last_updated';
}

export interface AgentRunParams {
  /**
   * Optional agent identity UID to use as the execution principal for the run. This
   * is only valid for runs that are team owned.
   */
  agent_identity_uid?: string;

  /**
   * Optional file attachments to include with the prompt (max 5). Attachments are
   * uploaded to cloud storage and made available to the agent.
   */
  attachments?: Array<AgentRunParams.Attachment>;

  /**
   * Configuration for a cloud agent run
   */
  config?: AmbientAgentConfig;

  /**
   * Optional conversation ID to continue an existing conversation. If provided, the
   * agent will continue from where the previous run left off.
   */
  conversation_id?: string;

  /**
   * Whether the run should be interactive. If not set, defaults to false.
   */
  interactive?: boolean;

  /**
   * Optional run ID of the parent that spawned this run. Used for orchestration
   * hierarchies.
   */
  parent_run_id?: string;

  /**
   * The prompt/instruction for the agent to execute. Required unless a skill is
   * specified via the skill field or config.skill_spec.
   */
  prompt?: string;

  /**
   * Skill specification to use as the base prompt for the agent. Supported formats:
   *
   * - "repo:skill_name" - Simple name in specific repo
   * - "repo:skill_path" - Full path in specific repo
   * - "org/repo:skill_name" - Simple name with org and repo
   * - "org/repo:skill_path" - Full path with org and repo When provided, this takes
   *   precedence over config.skill_spec.
   */
  skill?: string;

  /**
   * Whether to create a team-owned run. Defaults to true for users on a single team.
   */
  team?: boolean;

  /**
   * Custom title for the run (auto-generated if not provided)
   */
  title?: string;
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

export declare namespace Agent {
  export {
    type AgentSkill as AgentSkill,
    type AmbientAgentConfig as AmbientAgentConfig,
    type AwsProviderConfig as AwsProviderConfig,
    type CloudEnvironment as CloudEnvironment,
    type CloudEnvironmentConfig as CloudEnvironmentConfig,
    type Error as Error,
    type ErrorCode as ErrorCode,
    type GcpProviderConfig as GcpProviderConfig,
    type McpServerConfig as McpServerConfig,
    type Scope as Scope,
    type UserProfile as UserProfile,
    type AgentListResponse as AgentListResponse,
    type AgentGetArtifactResponse as AgentGetArtifactResponse,
    type AgentListEnvironmentsResponse as AgentListEnvironmentsResponse,
    type AgentRunResponse as AgentRunResponse,
    type AgentListParams as AgentListParams,
    type AgentListEnvironmentsParams as AgentListEnvironmentsParams,
    type AgentRunParams as AgentRunParams,
  };

  export {
    Runs as Runs,
    type ArtifactItem as ArtifactItem,
    type RunItem as RunItem,
    type RunSourceType as RunSourceType,
    type RunState as RunState,
    type RunCancelResponse as RunCancelResponse,
    type RunItemsRunsCursorPage as RunItemsRunsCursorPage,
    type RunListParams as RunListParams,
  };

  export {
    Schedules as Schedules,
    type ScheduledAgentHistoryItem as ScheduledAgentHistoryItem,
    type ScheduledAgentItem as ScheduledAgentItem,
    type ScheduleListResponse as ScheduleListResponse,
    type ScheduleDeleteResponse as ScheduleDeleteResponse,
    type ScheduleCreateParams as ScheduleCreateParams,
    type ScheduleUpdateParams as ScheduleUpdateParams,
  };

  export {
    AgentAPIAgent as Agent,
    type AgentResponse as AgentResponse,
    type CreateAgentRequest as CreateAgentRequest,
    type ListAgentIdentitiesResponse as ListAgentIdentitiesResponse,
    type UpdateAgentRequest as UpdateAgentRequest,
    type AgentCreateParams as AgentCreateParams,
    type AgentUpdateParams as AgentUpdateParams,
  };

  export { Sessions as Sessions, type SessionCheckRedirectResponse as SessionCheckRedirectResponse };
}
