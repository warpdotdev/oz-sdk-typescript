// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as TasksAPI from './tasks';
import { TaskItem, TaskListParams, TaskListResponse, TaskSourceType, TaskState, Tasks } from './tasks';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Agent extends APIResource {
  tasks: TasksAPI.Tasks = new TasksAPI.Tasks(this._client);

  /**
   * Spawn an ambient agent with a prompt and optional configuration. The agent will
   * be queued for execution and assigned a unique task ID.
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
 * Configuration for an ambient agent task
 */
export interface AmbientAgentConfig {
  /**
   * Custom base prompt for the agent
   */
  base_prompt?: string;

  /**
   * UID of a CloudEnvironment GSO to use
   */
  environment_id?: string;

  /**
   * Map of MCP server configurations by name
   */
  mcp_servers?: { [key: string]: AmbientAgentConfig.McpServers };

  /**
   * LLM model to use (uses workspace default if not specified)
   */
  model_id?: string;

  /**
   * Config name for searchability and traceability
   */
  name?: string;
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
   * Current state of the task:
   *
   * - QUEUED: Task is waiting to be picked up
   * - PENDING: Task is being prepared
   * - CLAIMED: Task has been claimed by a worker
   * - INPROGRESS: Task is actively being executed
   * - SUCCEEDED: Task completed successfully
   * - FAILED: Task failed
   */
  state: TasksAPI.TaskState;

  /**
   * Unique identifier for the created task
   */
  task_id: string;
}

export interface AgentRunParams {
  /**
   * The prompt/instruction for the agent to execute
   */
  prompt: string;

  /**
   * Configuration for an ambient agent task
   */
  config?: AmbientAgentConfig;

  /**
   * Custom title for the task (auto-generated if not provided)
   */
  title?: string;
}

Agent.Tasks = Tasks;

export declare namespace Agent {
  export {
    type AmbientAgentConfig as AmbientAgentConfig,
    type AgentRunResponse as AgentRunResponse,
    type AgentRunParams as AgentRunParams,
  };

  export {
    Tasks as Tasks,
    type TaskItem as TaskItem,
    type TaskSourceType as TaskSourceType,
    type TaskState as TaskState,
    type TaskListResponse as TaskListResponse,
    type TaskListParams as TaskListParams,
  };
}
