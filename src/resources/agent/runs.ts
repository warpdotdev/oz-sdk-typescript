// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AgentAPI from './agent';
import { APIPromise } from '../../core/api-promise';
import { PagePromise, RunsCursorPage, type RunsCursorPageParams } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Operations for running and managing cloud agents
 */
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
   * Retrieve a paginated list of agent runs with optional filtering. Results default
   * to `sort_by=updated_at` and `sort_order=desc`.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const runItem of client.agent.runs.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: RunListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<RunItemsRunsCursorPage, RunItem> {
    return this._client.getAPIList('/agent/runs', RunsCursorPage<RunItem>, { query, ...options });
  }

  /**
   * Cancel an agent run that is currently queued or in progress. Once cancelled, the
   * run will transition to a cancelled state.
   *
   * Not all runs can be cancelled. Runs that are in a terminal state (SUCCEEDED,
   * FAILED, ERROR, BLOCKED, CANCELLED) return 400. Runs in PENDING state return 409
   * (retry after a moment). Self-hosted, local, and GitHub Action runs return 422.
   *
   * @example
   * ```ts
   * const response = await client.agent.runs.cancel('runId');
   * ```
   */
  cancel(runID: string, options?: RequestOptions): APIPromise<string> {
    return this._client.post(path`/agent/runs/${runID}/cancel`, options);
  }
}

export type RunItemsRunsCursorPage = RunsCursorPage<RunItem>;

export type ArtifactItem =
  | ArtifactItem.PlanArtifact
  | ArtifactItem.PullRequestArtifact
  | ArtifactItem.ScreenshotArtifact;

export namespace ArtifactItem {
  export interface PlanArtifact {
    /**
     * Type of the artifact
     */
    artifact_type: 'PLAN';

    /**
     * Timestamp when the artifact was created (RFC3339)
     */
    created_at: string;

    data: PlanArtifact.Data;
  }

  export namespace PlanArtifact {
    export interface Data {
      /**
       * Unique identifier for the plan document
       */
      document_uid: string;

      /**
       * Unique identifier for the associated notebook
       */
      notebook_uid?: string;

      /**
       * Title of the plan
       */
      title?: string;
    }
  }

  export interface PullRequestArtifact {
    /**
     * Type of the artifact
     */
    artifact_type: 'PULL_REQUEST';

    /**
     * Timestamp when the artifact was created (RFC3339)
     */
    created_at: string;

    data: PullRequestArtifact.Data;
  }

  export namespace PullRequestArtifact {
    export interface Data {
      /**
       * Branch name for the pull request
       */
      branch: string;

      /**
       * URL of the pull request
       */
      url: string;
    }
  }

  export interface ScreenshotArtifact {
    /**
     * Type of the artifact
     */
    artifact_type: 'SCREENSHOT';

    /**
     * Timestamp when the artifact was created (RFC3339)
     */
    created_at: string;

    data: ScreenshotArtifact.Data;
  }

  export namespace ScreenshotArtifact {
    export interface Data {
      /**
       * Unique identifier for the screenshot artifact
       */
      artifact_uid: string;

      /**
       * MIME type of the screenshot image
       */
      mime_type: string;

      /**
       * Optional description of the screenshot
       */
      description?: string;
    }
  }
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
   * - BLOCKED: Run is blocked (e.g., awaiting user input or approval)
   * - ERROR: Run encountered an error
   * - CANCELLED: Run was cancelled by user
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
   * Configuration for a cloud agent run
   */
  agent_config?: AgentAPI.AmbientAgentConfig;

  /**
   * Information about the agent skill used for the run. Either full_path or
   * bundled_skill_id will be set, but not both.
   */
  agent_skill?: RunItem.AgentSkill;

  /**
   * Artifacts created during the run (plans, pull requests, etc.)
   */
  artifacts?: Array<ArtifactItem>;

  /**
   * UUID of the conversation associated with the run
   */
  conversation_id?: string;

  creator?: AgentAPI.UserProfile;

  /**
   * Where the run executed:
   *
   * - LOCAL: Executed in the user's local Oz environment
   * - REMOTE: Executed by a remote/cloud worker
   */
  execution_location?: 'LOCAL' | 'REMOTE';

  /**
   * Whether the sandbox environment is currently running
   */
  is_sandbox_running?: boolean;

  /**
   * Resource usage information for the run
   */
  request_usage?: RequestUsage;

  /**
   * Information about the schedule that triggered this run (only present for
   * scheduled runs)
   */
  schedule?: ScheduleInfo;

  /**
   * Ownership scope for a resource (team or personal)
   */
  scope?: AgentAPI.Scope;

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
   * - WEB_APP: Created from the Warp web app
   * - GITHUB_ACTION: Created from a GitHub action
   * - CLOUD_MODE: Created from a Cloud Mode
   * - CLI: Created from the CLI
   */
  source?: RunSourceType;

  /**
   * Timestamp when the agent started working on the run (RFC3339)
   */
  started_at?: string | null;

  /**
   * Status message for a run. For terminal error states, includes structured error
   * code and retryability info from the platform error catalog.
   */
  status_message?: RunStatusMessage;
}

export namespace RunItem {
  /**
   * Information about the agent skill used for the run. Either full_path or
   * bundled_skill_id will be set, but not both.
   */
  export interface AgentSkill {
    /**
     * Unique identifier for bundled skills
     */
    bundled_skill_id?: string;

    /**
     * Description of the skill
     */
    description?: string;

    /**
     * Path to the SKILL.md file (for file-based skills)
     */
    full_path?: string;

    /**
     * Human-readable name of the skill
     */
    name?: string;
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
 * - WEB_APP: Created from the Warp web app
 * - GITHUB_ACTION: Created from a GitHub action
 * - CLOUD_MODE: Created from a Cloud Mode
 * - CLI: Created from the CLI
 */
export type RunSourceType =
  | 'LINEAR'
  | 'API'
  | 'SLACK'
  | 'LOCAL'
  | 'SCHEDULED_AGENT'
  | 'WEB_APP'
  | 'GITHUB_ACTION'
  | 'CLOUD_MODE'
  | 'CLI';

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
export type RunState =
  | 'QUEUED'
  | 'PENDING'
  | 'CLAIMED'
  | 'INPROGRESS'
  | 'SUCCEEDED'
  | 'FAILED'
  | 'BLOCKED'
  | 'ERROR'
  | 'CANCELLED';

/**
 * Status message for a run. For terminal error states, includes structured error
 * code and retryability info from the platform error catalog.
 */
export interface RunStatusMessage {
  /**
   * Human-readable status message
   */
  message: string;

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
  error_code?: AgentAPI.ErrorCode;

  /**
   * Whether the error is transient and the client may retry by submitting a new run.
   * Only present on terminal error states. When false, retrying without addressing
   * the underlying cause will not succeed.
   */
  retryable?: boolean;
}

/**
 * Information about the schedule that triggered this run (only present for
 * scheduled runs)
 */
export interface ScheduleInfo {
  /**
   * Cron expression at the time the run was created
   */
  cron_schedule: string;

  /**
   * Unique identifier for the schedule
   */
  schedule_id: string;

  /**
   * Name of the schedule at the time the run was created
   */
  schedule_name: string;
}

/**
 * The ID of the cancelled run
 */
export type RunCancelResponse = string;

export interface RunListParams extends RunsCursorPageParams {
  /**
   * Filter runs by artifact type
   */
  artifact_type?: 'PLAN' | 'PULL_REQUEST' | 'SCREENSHOT';

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
   * Filter runs by environment ID
   */
  environment_id?: string;

  /**
   * Filter by where the run executed
   */
  execution_location?: 'LOCAL' | 'REMOTE';

  /**
   * Filter by model ID
   */
  model_id?: string;

  /**
   * Filter by agent config name
   */
  name?: string;

  /**
   * Fuzzy search query across run title, prompt, and skill_spec
   */
  q?: string;

  /**
   * Filter runs by the scheduled agent ID that created them
   */
  schedule_id?: string;

  /**
   * Filter runs by skill spec (e.g., "owner/repo:path/to/SKILL.md"). Alias for
   * skill_spec.
   */
  skill?: string;

  /**
   * Filter runs by skill spec (e.g., "owner/repo:path/to/SKILL.md")
   */
  skill_spec?: string;

  /**
   * Sort field for results.
   *
   * - `updated_at`: Sort by last update timestamp (default)
   * - `created_at`: Sort by creation timestamp
   * - `title`: Sort alphabetically by run title
   * - `agent`: Sort alphabetically by skill. Runs without a skill are grouped last.
   */
  sort_by?: 'updated_at' | 'created_at' | 'title' | 'agent';

  /**
   * Sort direction
   */
  sort_order?: 'asc' | 'desc';

  /**
   * Filter by run source type
   */
  source?: RunSourceType;

  /**
   * Filter by run state. Can be specified multiple times to match any of the given
   * states.
   */
  state?: Array<RunState>;

  /**
   * Filter runs updated after this timestamp (RFC3339 format)
   */
  updated_after?: string;
}

export declare namespace Runs {
  export {
    type ArtifactItem as ArtifactItem,
    type RequestUsage as RequestUsage,
    type RunItem as RunItem,
    type RunSourceType as RunSourceType,
    type RunState as RunState,
    type RunStatusMessage as RunStatusMessage,
    type ScheduleInfo as ScheduleInfo,
    type RunCancelResponse as RunCancelResponse,
    type RunItemsRunsCursorPage as RunItemsRunsCursorPage,
    type RunListParams as RunListParams,
  };
}
