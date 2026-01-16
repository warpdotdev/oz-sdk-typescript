// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AgentAPI from './agent';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Tasks extends APIResource {
  /**
   * Retrieve detailed information about a specific agent task, including the full
   * prompt, session link, and resolved configuration.
   *
   * @example
   * ```ts
   * const taskItem = await client.agent.tasks.retrieve(
   *   'taskId',
   * );
   * ```
   */
  retrieve(taskID: string, options?: RequestOptions): APIPromise<TaskItem> {
    return this._client.get(path`/agent/tasks/${taskID}`, options);
  }

  /**
   * Retrieve a paginated list of agent tasks with optional filtering. Results are
   * ordered by creation time (newest first).
   *
   * @example
   * ```ts
   * const tasks = await client.agent.tasks.list();
   * ```
   */
  list(
    query: TaskListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<TaskListResponse> {
    return this._client.get('/agent/tasks', { query, ...options });
  }
}

export interface TaskItem {
  /**
   * Timestamp when the task was created (RFC3339)
   */
  created_at: string;

  /**
   * The prompt/instruction for the agent
   */
  prompt: string;

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
  state: TaskState;

  /**
   * Unique identifier for the task
   */
  task_id: string;

  /**
   * Human-readable title for the task
   */
  title: string;

  /**
   * Timestamp when the task was last updated (RFC3339)
   */
  updated_at: string;

  /**
   * Configuration for an ambient agent task
   */
  agent_config?: AgentAPI.AmbientAgentConfig;

  creator?: TaskItem.Creator;

  /**
   * UUID of the shared session (if available)
   */
  session_id?: string;

  /**
   * URL to view the agent session
   */
  session_link?: string;

  /**
   * Source that created the task:
   *
   * - LINEAR: Created from Linear integration
   * - API: Created via the Warp API
   * - SLACK: Created from Slack integration
   * - LOCAL: Created from local CLI/app
   * - SCHEDULED_AGENT: Created by a scheduled agent
   */
  source?: TaskSourceType;

  /**
   * Timestamp when the agent started working on the task (RFC3339)
   */
  started_at?: string | null;

  status_message?: TaskItem.StatusMessage;
}

export namespace TaskItem {
  export interface Creator {
    /**
     * Type of the creator principal
     */
    type?: 'user' | 'service_account';

    /**
     * Unique identifier of the creator
     */
    uid?: string;
  }

  export interface StatusMessage {
    /**
     * Human-readable status message
     */
    message?: string;
  }
}

/**
 * Source that created the task:
 *
 * - LINEAR: Created from Linear integration
 * - API: Created via the Warp API
 * - SLACK: Created from Slack integration
 * - LOCAL: Created from local CLI/app
 * - SCHEDULED_AGENT: Created by a scheduled agent
 */
export type TaskSourceType = 'LINEAR' | 'API' | 'SLACK' | 'LOCAL' | 'SCHEDULED_AGENT';

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
export type TaskState = 'QUEUED' | 'PENDING' | 'CLAIMED' | 'INPROGRESS' | 'SUCCEEDED' | 'FAILED';

export interface TaskListResponse {
  page_info: TaskListResponse.PageInfo;

  tasks: Array<TaskItem>;
}

export namespace TaskListResponse {
  export interface PageInfo {
    /**
     * Whether there are more results available
     */
    has_next_page: boolean;

    /**
     * Opaque cursor for fetching the next page
     */
    next_cursor?: string;
  }
}

export interface TaskListParams {
  /**
   * Filter by agent config name
   */
  config_name?: string;

  /**
   * Filter tasks created after this timestamp (RFC3339 format)
   */
  created_after?: string;

  /**
   * Filter tasks created before this timestamp (RFC3339 format)
   */
  created_before?: string;

  /**
   * Filter by creator UID (user or service account)
   */
  creator?: string;

  /**
   * Pagination cursor from previous response
   */
  cursor?: string;

  /**
   * Maximum number of tasks to return
   */
  limit?: number;

  /**
   * Filter by model ID
   */
  model_id?: string;

  /**
   * Filter by task source type
   */
  source?: TaskSourceType;

  /**
   * Filter by task state. Can be specified multiple times to match any of the given
   * states.
   */
  state?: Array<TaskState>;
}

export declare namespace Tasks {
  export {
    type TaskItem as TaskItem,
    type TaskSourceType as TaskSourceType,
    type TaskState as TaskState,
    type TaskListResponse as TaskListResponse,
    type TaskListParams as TaskListParams,
  };
}
