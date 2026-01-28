// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as RunsAPI from './runs';
import { ArtifactItem, RunItem, RunListParams, RunListResponse, RunSourceType, RunState, Runs } from './runs';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Agent extends APIResource {
  runs: RunsAPI.Runs = new RunsAPI.Runs(this._client);

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
  mcp_servers?: { [key: string]: AmbientAgentConfig.McpServers };

  /**
   * LLM model to use (uses team default if not specified)
   */
  model_id?: string;

  /**
   * Config name for searchability and traceability
   */
  name?: string;

  /**
   * Self-hosted worker ID that should execute this task. If not specified or set to
   * "warp", the task runs on Warp-hosted workers.
   */
  worker_host?: string;
}

export namespace AmbientAgentConfig {
  /**
   * Configuration for an MCP server. Must have exactly one of: warp_id, command, or
   * url.
   */
  export interface McpServers {
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

export declare namespace Agent {
  export {
    type AmbientAgentConfig as AmbientAgentConfig,
    type AgentRunResponse as AgentRunResponse,
    type AgentRunParams as AgentRunParams,
  };

  export {
    Runs as Runs,
    type ArtifactItem as ArtifactItem,
    type RunItem as RunItem,
    type RunSourceType as RunSourceType,
    type RunState as RunState,
    type RunListResponse as RunListResponse,
    type RunListParams as RunListParams,
  };
}
