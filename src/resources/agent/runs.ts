// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AgentAPI from './agent';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Runs extends APIResource {
  /**
   * Retrieve detailed information about a specific agent run, including the full
   * prompt, session link, and resolved configuration.
   *
   * @example
   * ```ts
   * const runItem = await client.agent.runs.retrieve('runId');
   * ```
   */
  retrieve(runID: string, options?: RequestOptions): APIPromise<RunItem> {
    return this._client.get(path`/agent/runs/${runID}`, options);
  }

  /**
   * Retrieve a paginated list of agent runs with optional filtering. Results are
   * ordered by creation time (newest first).
   *
   * @example
   * ```ts
   * const runs = await client.agent.runs.list();
   * ```
   */
  list(query: RunListParams | null | undefined = {}, options?: RequestOptions): APIPromise<RunListResponse> {
    return this._client.get('/agent/runs', { query, ...options });
  }
}

export interface RunItem {
  /**
   * Timestamp when the run was created (RFC3339)
   */
  created_at: string;

  /**
   * The prompt/instruction for the agent
   */
  prompt: string;

  /**
   * Unique identifier for the run
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
  state: RunState;

  /**
   * @deprecated Use run_id instead.
   */
  task_id: string;

  /**
   * Human-readable title for the run
   */
  title: string;

  /**
   * Timestamp when the run was last updated (RFC3339)
   */
  updated_at: string;

  /**
   * Configuration for an ambient agent run
   */
  agent_config?: AgentAPI.AmbientAgentConfig;

  /**
   * UUID of the conversation associated with the run
   */
  conversation_id?: string;

  creator?: RunItem.Creator;

  /**
   * Whether the sandbox environment is currently running
   */
  is_sandbox_running?: boolean;

  /**
   * Resource usage information for the run
   */
  request_usage?: RunItem.RequestUsage;

  /**
   * UUID of the shared session (if available)
   */
  session_id?: string;

  /**
   * URL to view the agent session
   */
  session_link?: string;

  /**
   * Source that created the run:
   *
   * - LINEAR: Created from Linear integration
   * - API: Created via the Warp API
   * - SLACK: Created from Slack integration
   * - LOCAL: Created from local CLI/app
   * - SCHEDULED_AGENT: Created by a scheduled agent
   */
  source?: RunSourceType;

  /**
   * Timestamp when the agent started working on the run (RFC3339)
   */
  started_at?: string | null;

  status_message?: RunItem.StatusMessage;
}

export namespace RunItem {
  export interface Creator {
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

  /**
   * Resource usage information for the run
   */
  export interface RequestUsage {
    /**
     * Cost of compute resources for the run
     */
    compute_cost?: number;

    /**
     * Cost of LLM inference for the run
     */
    inference_cost?: number;
  }

  export interface StatusMessage {
    /**
     * Human-readable status message
     */
    message?: string;
  }
}

/**
 * Source that created the run:
 *
 * - LINEAR: Created from Linear integration
 * - API: Created via the Warp API
 * - SLACK: Created from Slack integration
 * - LOCAL: Created from local CLI/app
 * - SCHEDULED_AGENT: Created by a scheduled agent
 */
export type RunSourceType = 'LINEAR' | 'API' | 'SLACK' | 'LOCAL' | 'SCHEDULED_AGENT';

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
export type RunState = 'QUEUED' | 'PENDING' | 'CLAIMED' | 'INPROGRESS' | 'SUCCEEDED' | 'FAILED';

export interface RunListResponse {
  page_info: RunListResponse.PageInfo;

  runs: Array<RunItem>;
}

export namespace RunListResponse {
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

export interface RunListParams {
  /**
   * Filter by agent config name
   */
  config_name?: string;

  /**
   * Filter runs created after this timestamp (RFC3339 format)
   */
  created_after?: string;

  /**
   * Filter runs created before this timestamp (RFC3339 format)
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
   * Maximum number of runs to return
   */
  limit?: number;

  /**
   * Filter by model ID
   */
  model_id?: string;

  /**
   * Filter by run source type
   */
  source?: RunSourceType;

  /**
   * Filter by run state. Can be specified multiple times to match any of the given
   * states.
   */
  state?: Array<RunState>;
}

export declare namespace Runs {
  export {
    type RunItem as RunItem,
    type RunSourceType as RunSourceType,
    type RunState as RunState,
    type RunListResponse as RunListResponse,
    type RunListParams as RunListParams,
  };
}
