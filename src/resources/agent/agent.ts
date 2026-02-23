// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as RunsAPI from './runs';
import {
  ArtifactItem,
  RunCancelResponse,
  RunItem,
  RunListParams,
  RunListResponse,
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
  ScheduledAgentItem,
  Schedules,
} from './schedules';
import * as SessionsAPI from './sessions';
import { SessionCheckRedirectResponse, Sessions } from './sessions';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Agent extends APIResource {
  runs: RunsAPI.Runs = new RunsAPI.Runs(this._client);
  schedules: SchedulesAPI.Schedules = new SchedulesAPI.Schedules(this._client);
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
   * Retrieve an artifact by its UUID. For screenshot artifacts, returns a
   * time-limited signed download URL.
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
   * Spawn a cloud agent with a prompt and optional configuration. The agent will be
   * queued for execution and assigned a unique run ID.
   *
   * @example
   * ```ts
   * const response = await client.agent.run({
   *   prompt: 'Fix the bug in auth.go',
   * });
   * ```
   */
  run(body: AgentRunParams, options?: RequestOptions): APIPromise<AgentRunResponse> {
    return this._client.post('/agent/run', { body, ...options });
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
 * Response for artifact retrieval. Currently supports screenshot artifacts.
 */
export interface AgentGetArtifactResponse {
  /**
   * Type of the artifact (e.g., SCREENSHOT)
   */
  artifact_type: string;

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
  data: AgentGetArtifactResponse.Data;
}

export namespace AgentGetArtifactResponse {
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

export interface AgentRunParams {
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
Agent.Sessions = Sessions;

export declare namespace Agent {
  export {
    type AgentSkill as AgentSkill,
    type AmbientAgentConfig as AmbientAgentConfig,
    type CloudEnvironmentConfig as CloudEnvironmentConfig,
    type McpServerConfig as McpServerConfig,
    type UserProfile as UserProfile,
    type AgentListResponse as AgentListResponse,
    type AgentGetArtifactResponse as AgentGetArtifactResponse,
    type AgentRunResponse as AgentRunResponse,
    type AgentListParams as AgentListParams,
    type AgentRunParams as AgentRunParams,
  };

  export {
    Runs as Runs,
    type ArtifactItem as ArtifactItem,
    type RunItem as RunItem,
    type RunSourceType as RunSourceType,
    type RunState as RunState,
    type RunListResponse as RunListResponse,
    type RunCancelResponse as RunCancelResponse,
    type RunListParams as RunListParams,
  };

  export {
    Schedules as Schedules,
    type ScheduledAgentItem as ScheduledAgentItem,
    type ScheduleListResponse as ScheduleListResponse,
    type ScheduleDeleteResponse as ScheduleDeleteResponse,
    type ScheduleCreateParams as ScheduleCreateParams,
    type ScheduleUpdateParams as ScheduleUpdateParams,
  };

  export { Sessions as Sessions, type SessionCheckRedirectResponse as SessionCheckRedirectResponse };
}
