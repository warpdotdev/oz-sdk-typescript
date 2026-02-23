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

  /**
   * Cancel an agent run that is currently queued or in progress. Once cancelled, the
   * run will transition to a failed state.
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
   * Whether the sandbox environment is currently running
   */
  is_sandbox_running?: boolean;

  /**
   * Resource usage information for the run
   */
  request_usage?: RunItem.RequestUsage;

  /**
   * Information about the schedule that triggered this run (only present for
   * scheduled runs)
   */
  schedule?: RunItem.Schedule;

  /**
   * Ownership scope for a resource (team or personal)
   */
  scope?: RunItem.Scope;

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

  status_message?: RunItem.StatusMessage;
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

  /**
   * Information about the schedule that triggered this run (only present for
   * scheduled runs)
   */
  export interface Schedule {
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

/**
 * The ID of the cancelled run
 */
export type RunCancelResponse = string;

export interface RunListParams {
  /**
   * Filter runs by artifact type (PLAN or PULL_REQUEST)
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
   * Pagination cursor from previous response
   */
  cursor?: string;

  /**
   * Filter runs by environment ID
   */
  environment_id?: string;

  /**
   * Maximum number of runs to return
   */
  limit?: number;

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
    type RunItem as RunItem,
    type RunSourceType as RunSourceType,
    type RunState as RunState,
    type RunListResponse as RunListResponse,
    type RunCancelResponse as RunCancelResponse,
    type RunListParams as RunListParams,
  };
}
