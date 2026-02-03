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
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Agent extends APIResource {
  runs: RunsAPI.Runs = new RunsAPI.Runs(this._client);
  schedules: SchedulesAPI.Schedules = new SchedulesAPI.Schedules(this._client);

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
   * Spawn an ambient agent with a prompt and optional configuration. The agent will
   * be queued for execution and assigned a unique run ID.
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
 * Configuration for an ambient agent run
 */
export interface AmbientAgentConfig {
  /**
   * Custom base prompt for the agent
   */
  base_prompt?: string;

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
   * Config name for searchability and traceability
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
   */
  state: RunsAPI.RunState;
}

export interface AgentListParams {
  /**
   * Optional repository specification to list agents from (format: "owner/repo"). If
   * not provided, lists agents from all accessible environments.
   */
  repo?: string;
}

export interface AgentRunParams {
  /**
   * The prompt/instruction for the agent to execute
   */
  prompt: string;

  /**
   * Configuration for an ambient agent run
   */
  config?: AmbientAgentConfig;

  /**
   * Make the run visible to all team members, not only the calling user
   */
  team?: boolean;

  /**
   * Custom title for the run (auto-generated if not provided)
   */
  title?: string;
}

Agent.Runs = Runs;
Agent.Schedules = Schedules;

export declare namespace Agent {
  export {
    type AgentSkill as AgentSkill,
    type AmbientAgentConfig as AmbientAgentConfig,
    type CloudEnvironmentConfig as CloudEnvironmentConfig,
    type McpServerConfig as McpServerConfig,
    type UserProfile as UserProfile,
    type AgentListResponse as AgentListResponse,
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
}
