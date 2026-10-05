// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AgentAPI from './agent';
import { APIPromise } from '../../core/api-promise';
import { PagePromise, RunsCursorPage, type RunsCursorPageParams } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
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
    params: RunListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<RunItemsRunsCursorPage, RunItem> {
    const { team_uid, ...query } = params ?? {};
    return this._client.getAPIList('/agent/runs', RunsCursorPage<RunItem>, {
      query,
      ...options,
      headers: buildHeaders([
        { ...(team_uid != null ? { 'X-Warp-Team-Uid': team_uid } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Cancel an agent run that is currently queued or in progress; once cancelled, the
   * run transitions to a cancelled state. Not all runs can be cancelled: a run
   * already in a terminal state, in PENDING, or of an unsupported type (e.g. local,
   * GitHub Action) is rejected instead — see the error responses below for each
   * case.
   *
   * @example
   * ```ts
   * const response = await client.agent.runs.cancel('runId');
   * ```
   */
  cancel(runID: string, options?: RequestOptions): APIPromise<string> {
    return this._client.post(path`/agent/runs/${runID}/cancel`, options);
  }

  /**
   * Retrieve a run's conversation as a normalized sequence of messages and nested
   * steps. The response groups text, tool activity, and event content into
   * structured blocks.
   *
   * @example
   * ```ts
   * const response = await client.agent.runs.getConversation(
   *   'runId',
   * );
   * ```
   */
  getConversation(runID: string, options?: RequestOptions): APIPromise<RunGetConversationResponse> {
    return this._client.get(path`/agent/runs/${runID}/conversation`, options);
  }

  /**
   * Return the latest cumulative raw usage snapshot retained for a Claude Code or
   * Codex run. Missing metrics are represented as an unavailable result rather than
   * zero. Access uses the same run view authorization as transcript reads.
   *
   * @example
   * ```ts
   * const response = await client.agent.runs.getHarnessUsage(
   *   'runId',
   * );
   * ```
   */
  getHarnessUsage(runID: string, options?: RequestOptions): APIPromise<RunGetHarnessUsageResponse> {
    return this._client.get(path`/agent/runs/${runID}/harness-usage`, options);
  }

  /**
   * Retrieve chronological setup and lifecycle timeline events for an agent run.
   *
   * @example
   * ```ts
   * const response = await client.agent.runs.getTimeline(
   *   'runId',
   * );
   * ```
   */
  getTimeline(runID: string, options?: RequestOptions): APIPromise<RunGetTimelineResponse> {
    return this._client.get(path`/agent/runs/${runID}/timeline`, options);
  }

  /**
   * Retrieve the raw conversation transcript for an agent run. Returns a 302
   * redirect to a time-limited download URL for the transcript.
   *
   * @example
   * ```ts
   * const response = await client.agent.runs.getTranscript(
   *   'runId',
   * );
   *
   * const content = await response.blob();
   * console.log(content);
   * ```
   */
  getTranscript(runID: string, options?: RequestOptions): APIPromise<Response> {
    return this._client.get(path`/agent/runs/${runID}/transcript`, {
      ...options,
      headers: buildHeaders([{ Accept: 'application/octet-stream' }, options?.headers]),
      __binaryResponse: true,
    });
  }

  /**
   * Cancel the request the agent is currently working on without ending the run or
   * tearing down its sandbox. The run stays in progress and accepts follow-ups
   * afterwards. Only live runs on the Warp harness can be interrupted; use
   * `POST /agent/runs/{runId}/cancel` to end a run outright. A 202 means the
   * platform accepted the cancel; the agent applies it asynchronously.
   *
   * @example
   * ```ts
   * const response = await client.agent.runs.interrupt('runId');
   * ```
   */
  interrupt(runID: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post(path`/agent/runs/${runID}/interrupt`, options);
  }

  /**
   * Return fresh presigned download URLs for handoff snapshot files uploaded by the
   * latest ended execution of this run. An empty list is returned when no ended
   * execution exists or no snapshot files were uploaded.
   *
   * This endpoint is useful for third-party harnesses that want to download the
   * snapshot files produced by a previous execution before starting a handoff
   * execution themselves.
   *
   * @example
   * ```ts
   * const response =
   *   await client.agent.runs.listHandoffAttachments('runId');
   * ```
   */
  listHandoffAttachments(
    runID: string,
    options?: RequestOptions,
  ): APIPromise<RunListHandoffAttachmentsResponse> {
    return this._client.get(path`/agent/runs/${runID}/handoff/attachments`, options);
  }

  /**
   * Send a follow-up message to an existing run. The server transparently routes the
   * message based on the current state of the run (still queued, actively running,
   * or ended) and will resume the agent in a new sandbox if necessary. A 200
   * response means the follow-up was accepted; updated run state can be observed via
   * `GET /agent/runs/{runId}`.
   *
   * A run that failed during environment setup keeps its retained session reachable
   * for a bounded debug window. A follow-up sent to an eligible run in that window
   * is delivered into the retained session to start or continue a debug agent,
   * without reopening the run: it stays in its failed state, with its original
   * failure message and error code unchanged.
   *
   * @example
   * ```ts
   * const response = await client.agent.runs.submitFollowup(
   *   'runId',
   * );
   * ```
   */
  submitFollowup(
    runID: string,
    body: RunSubmitFollowupParams,
    options?: RequestOptions,
  ): APIPromise<RunSubmitFollowupResponse> {
    return this._client.post(path`/agent/runs/${runID}/followups`, { body, ...options });
  }
}

export type RunItemsRunsCursorPage = RunsCursorPage<RunItem>;

export type ArtifactItem =
  | ArtifactItem.PlanArtifact
  | ArtifactItem.PullRequestArtifact
  | ArtifactItem.ScreenshotArtifact
  | ArtifactItem.FileArtifact
  | ArtifactItem.ExternalReferenceArtifact;

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
       * Unique identifier for the plan artifact, usable with the artifact retrieval
       * endpoint
       */
      artifact_uid?: string;

      /**
       * Unique identifier for the associated notebook
       */
      notebook_uid?: string;

      /**
       * Title of the plan
       */
      title?: string;

      /**
       * URL to open the plan in Warp Drive
       */
      url?: string;
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
       * Current state of the pull request as last reported by the code host's webhooks.
       * `unknown` means Warp has no live provider record for this pull request (for
       * example, the repository's code host integration is not connected to the run's
       * team).
       */
      status: 'open' | 'draft' | 'merged' | 'closed' | 'unknown';

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

  export interface FileArtifact {
    /**
     * Type of the artifact
     */
    artifact_type: 'FILE';

    /**
     * Timestamp when the artifact was created (RFC3339)
     */
    created_at: string;

    data: FileArtifact.Data;
  }

  export namespace FileArtifact {
    export interface Data {
      /**
       * Unique identifier for the file artifact
       */
      artifact_uid: string;

      /**
       * Last path component of filepath
       */
      filename: string;

      /**
       * Conversation-relative filepath for the uploaded file. Omitted on an anonymous
       * read of a public file artifact.
       */
      filepath: string;

      /**
       * MIME type of the uploaded file
       */
      mime_type: string;

      /**
       * Optional description of the file
       */
      description?: string;

      /**
       * Size of the uploaded file in bytes
       */
      size_bytes?: number;

      thumbnail?: Data.Thumbnail;

      /**
       * Short, badge-visible label for the artifact. For recording artifacts, this is
       * the agent-authored title shown in Warp web and blocklist badges. Distinct from
       * description, which is longer and shown in detail views.
       */
      title?: string;
    }

    export namespace Data {
      export interface Thumbnail {
        /**
         * Time-limited signed URL to download the video's thumbnail image
         */
        download_url: string;

        /**
         * Timestamp when the thumbnail download URL expires (RFC3339)
         */
        expires_at: string;
      }
    }
  }

  export interface ExternalReferenceArtifact {
    /**
     * Type of the artifact
     */
    artifact_type: 'EXTERNAL_REFERENCE';

    /**
     * Timestamp when the artifact was created (RFC3339)
     */
    created_at: string;

    /**
     * Data for a generic external reference artifact.
     */
    data: ExternalReferenceArtifact.Data;
  }

  export namespace ExternalReferenceArtifact {
    /**
     * Data for a generic external reference artifact.
     */
    export interface Data {
      /**
       * Free-form category identifier for this reference (e.g. "linear_issue",
       * "spec_link", "jira_ticket"). Used for filtering and display.
       */
      reference_type: string;

      /**
       * Canonical URL for the reference. Used as the key for reverse lookups ("which run
       * produced this URL?").
       */
      url: string;

      /**
       * Optional category-specific extra fields.
       */
      metadata?: { [key: string]: unknown };

      /**
       * Optional human-readable label for the reference.
       */
      title?: string;
    }
  }
}

export interface ConversationStep {
  /**
   * Unique identifier for the step
   */
  id: string;

  /**
   * Ordered normalized messages for this step
   */
  messages: Array<ConversationStep.Message>;

  /**
   * Nested delegated work performed as part of this step
   */
  steps: Array<ConversationStep>;

  /**
   * Latest transcript message timestamp contained in this step or any nested step
   * (RFC3339)
   */
  completed_at?: string;

  /**
   * Original instruction or delegated work description for the step
   */
  description?: string;

  /**
   * Earliest transcript message timestamp contained in this step or any nested step
   * (RFC3339)
   */
  started_at?: string;

  /**
   * Summary of the work completed for the step
   */
  summary?: string;
}

export namespace ConversationStep {
  export interface Message {
    content: Array<
      | Message.TextContentBlock
      | Message.ActionContentBlock
      | Message.ActionResultContentBlock
      | Message.EventContentBlock
    >;

    /**
     * Role of the normalized message
     */
    role: 'user' | 'assistant' | 'tool' | 'system';

    /**
     * Underlying transcript message IDs grouped into this normalized message
     */
    message_ids?: Array<string>;

    /**
     * Request identifier shared by transcript messages from the same request, when
     * available
     */
    request_id?: string;

    /**
     * Timestamp of the first transcript message included in this normalized message
     * (RFC3339)
     */
    timestamp?: string;
  }

  export namespace Message {
    export interface TextContentBlock {
      /**
       * Plain text content
       */
      text: string;

      type: 'text';

      /**
       * Underlying transcript message ID that produced this content block, when
       * available
       */
      message_id?: string;
    }

    export interface ActionContentBlock {
      /**
       * Unique identifier for the action
       */
      id: string;

      /**
       * High-level category of an action performed during the conversation
       */
      category:
        | 'command'
        | 'files'
        | 'search'
        | 'integration'
        | 'documents'
        | 'computer'
        | 'review'
        | 'skill';

      /**
       * Curated public input for this action. This object is owned by the API and is not
       * a raw internal tool payload.
       */
      input: { [key: string]: unknown };

      /**
       * Public action name, such as run_command or edit_files
       */
      name: string;

      type: 'action';

      /**
       * Underlying transcript message ID that produced this content block, when
       * available
       */
      message_id?: string;
    }

    export interface ActionResultContentBlock {
      /**
       * Identifier of the corresponding action
       */
      action_id: string;

      /**
       * High-level category of an action performed during the conversation
       */
      category:
        | 'command'
        | 'files'
        | 'search'
        | 'integration'
        | 'documents'
        | 'computer'
        | 'review'
        | 'skill';

      /**
       * Public action name matching the corresponding action block
       */
      name: string;

      /**
       * Curated public result for this action. Large or binary internal payloads should
       * be summarized rather than passed through raw.
       */
      output: { [key: string]: unknown };

      /**
       * State of an action result
       */
      state: 'running' | 'completed' | 'failed' | 'denied';

      type: 'action_result';

      /**
       * Underlying transcript message ID that produced this content block, when
       * available
       */
      message_id?: string;
    }

    export interface EventContentBlock {
      /**
       * Minimal structured metadata for the event
       */
      data: { [key: string]: unknown };

      /**
       * Event type for intentionally exposed non-core transcript events
       */
      name: string;

      type: 'event';

      /**
       * Underlying transcript message ID that produced this content block, when
       * available
       */
      message_id?: string;
    }
  }
}

export interface RunItem {
  /**
   * Timestamp when the run was created (RFC3339)
   */
  created_at: string;

  /**
   * Timestamp when the run last reached a terminal state (RFC3339). Null while the
   * run is still active, and for terminal runs with no recorded finish time (runs
   * executed locally, and runs that finished before finish times were recorded).
   */
  finished_at: string | null;

  /**
   * The prompt/instruction for the agent
   */
  prompt: string;

  /**
   * UUID of the top-level run of this run's orchestration tree. Equals `run_id` for
   * a top-level run.
   */
  root_run_id: string;

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
  agent_config?: AgentAPI.AgentConfigSnapshot;

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
   * Whether a debug agent can currently be started inside this run's retained
   * setup-failure session. Only true for a run that failed during environment setup,
   * whose retained execution is still reachable, and whose debug window has not
   * closed. See `POST /agent/runs/{runId}/followups`.
   */
  debug_agent_available?: boolean;

  /**
   * Where the run executed:
   *
   * - LOCAL: Executed in the user's local Warp environment
   * - REMOTE: Executed by a remote/cloud worker
   */
  execution_location?: 'LOCAL' | 'REMOTE';

  executor?: AgentAPI.UserProfile;

  /**
   * UID of the factory whose agent executed the run. Absent for runs not executed by
   * a factory agent.
   */
  factory_uid?: string;

  /**
   * Whether the run's type is eligible for cancellation via the API.
   * State-independent: false for GitHub Action and local runs; true for all other
   * run types (including self-hosted). Clients should still gate the control on the
   * run's current state.
   */
  is_run_type_cancellable?: boolean;

  /**
   * Whether the sandbox environment is currently running
   */
  is_sandbox_running?: boolean;

  /**
   * Custom key/value metadata attached to a run at creation time and immutable
   * afterward; at most 20 keys, with keys 1-64 bytes matching [a-zA-Z0-9._-]+
   * (case-sensitive) and values 0-256 bytes of UTF-8 with no NUL characters.
   * Requests with invalid metadata are rejected. A run's effective metadata is
   * merged per key at creation: explicit request keys override keys inherited from
   * the parent run, which override automatic keys (ticket_id and ticket_source on
   * Linear- and Jira-triggered runs).
   */
  metadata?: { [key: string]: string };

  /**
   * UUID of the parent run that spawned this run
   */
  parent_run_id?: string;

  /**
   * Resource usage information for the run
   */
  request_usage?: RunItem.RequestUsage;

  /**
   * Total runtime as an ISO 8601 duration (e.g. "PT2M30S"), computed server-side
   * from run executions.
   */
  run_time?: string;

  /**
   * Information about the schedule that triggered this run (only present for
   * scheduled runs)
   */
  schedule?: RunItem.Schedule;

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
   * - TEAMS: Created from Microsoft Teams integration
   * - LOCAL: Created from local CLI/app
   * - SCHEDULED_AGENT: Created by a scheduled agent
   * - WEB_APP: Created from the Warp web app
   * - GITHUB_ACTION: Created from a GitHub action
   * - CLOUD_MODE: Created from a Cloud Mode
   * - CLI: Created from the CLI
   * - JIRA: Created from Jira integration
   * - SELF_IMPROVEMENT: Created by Warp's self-improvement pipeline
   * - GITHUB_WEBHOOK: Created from a GitHub webhook event
   * - GITLAB_WEBHOOK: Created from a GitLab webhook event
   * - AZURE_DEVOPS_WEBHOOK: Created from an Azure DevOps webhook event
   * - AUTOFIX: Created by Warp's autofix pipeline
   * - RUN_SCORER: Created by Warp's run-scoring judge
   * - ORCHESTRATION: Created as a child run by the orchestration layer
   *   (parent_run_id set)
   * - BENCHMARK_TRIAL: Created as a factory benchmark trial
   * - CREATE_BENCHMARK_TASK: Created by a Factory foreman authoring a benchmark task
   *   from a completed run
   * - CUSTOM_WEBHOOK: Created by a factory automation subscribed to a custom webhook
   *   source
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
  status_message?: RunItem.StatusMessage;

  /**
   * The prompt exactly as it was submitted, without any extra context added by Warp.
   * Includes any follow-up messages sent before the run started, separated by blank
   * lines.
   */
  submitted_prompt?: string;

  /**
   * URL to the run trigger (e.g. Slack thread, Linear issue, schedule)
   */
  trigger_url?: string;
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
     * Credits consumed by compute resources for the run
     */
    compute_cost?: number;

    /**
     * What the run's hosted compute was billed at, in US dollars. Runs that predate
     * billed-amount tracking fall back to an estimated cost.
     */
    compute_cost_usd?: number;

    /**
     * Credits consumed by LLM inference for the run
     */
    inference_cost?: number;

    /**
     * What the run's LLM inference was billed at, in US dollars. Runs that predate
     * billed-amount tracking fall back to an estimated cost.
     */
    inference_cost_usd?: number;

    /**
     * The models that actually served inference for the run, with the tokens each
     * consumed. Used to discover what an auto-routing model resolves to. If a run is
     * terminated before inference is complete, output a zero-token entry for that
     * model. Omits runs that use a third-party harness, whose per-model usage is not
     * tracked by Warp.
     */
    model_token_usage?: Array<RequestUsage.ModelTokenUsage>;

    /**
     * Credits consumed by platform usage for the run
     */
    platform_cost?: number;

    /**
     * What the run's platform usage was billed at, in US dollars. Runs that predate
     * billed-amount tracking fall back to an estimated cost.
     */
    platform_cost_usd?: number;

    /**
     * Total LLM token count (summed across every usage category and model) for the
     * run's conversation. Omitted when the data is not available.
     */
    total_tokens?: number;

    /**
     * Full-granularity token and charged-cost breakdown for the run's conversation,
     * keyed by usage category (for example, primary_agent or conversation_compaction)
     * and model id. Omitted when the data is not available.
     */
    usage_by_category?: { [key: string]: RequestUsage.UsageByCategory };
  }

  export namespace RequestUsage {
    /**
     * Tokens consumed by a single model over a run.
     */
    export interface ModelTokenUsage {
      /**
       * Identifier of the model that served the inference. For `warp` and `byok` usage
       * this is a model id drawn from the same set as `agent_config.model_id`. For
       * `custom_endpoint` usage this is the caller's own configuration key for the
       * endpoint.
       */
      model_id: string;

      /**
       * Total tokens this model consumed, across every usage category.
       */
      total_tokens: number;

      /**
       * How a model's inference was accessed:
       *
       * - warp: through Warp-provided model access
       * - byok: through the caller's own provider API key
       * - custom_endpoint: through a caller-configured model endpoint
       */
      usage_type: 'warp' | 'byok' | 'custom_endpoint';

      /**
       * total_tokens split by the kind of work the tokens were spent on, keyed by usage
       * category (e.g., primary_agent, tool_summarization, etc).
       */
      tokens_by_category?: { [key: string]: number };
    }

    /**
     * Usage charged for a single usage category, broken down by usage type (direct
     * API/BYOK/custom endpoint) and, within each, by model ID.
     */
    export interface UsageByCategory {
      /**
       * Platform usage charged for this category, in US cents.
       */
      platform_usage_in_cents: number;

      /**
       * Inference usage charged using a user's own API key, keyed by model ID.
       */
      byok_inference_usage?: { [key: string]: UsageByCategory.ByokInferenceUsage };

      /**
       * Inference usage charged using a custom endpoint, keyed by the custom model's
       * config key.
       */
      custom_endpoint_inference_usage?: { [key: string]: UsageByCategory.CustomEndpointInferenceUsage };

      /**
       * Inference usage incurred through Warp-provided model access, keyed by model ID.
       */
      direct_api_inference_usage?: { [key: string]: UsageByCategory.DirectAPIInferenceUsage };
    }

    export namespace UsageByCategory {
      /**
       * Full token count and charged-cost detail for inference usage. The counts and
       * cost describe the same usage (e.g. token_count.input tokens cost
       * cost_in_cents.input_cost_in_cents in total).
       */
      export interface ByokInferenceUsage {
        /**
         * Charged cost of LLM inference in US cents, split by token type. Omitted when the
         * data is not available.
         */
        cost_in_cents: ByokInferenceUsage.CostInCents;

        /**
         * A per-token-type token count.
         */
        token_count: ByokInferenceUsage.TokenCount;

        /**
         * Total cost of those web searches, in US cents.
         */
        web_search_cost_in_cents: number;

        /**
         * Number of web searches performed by this model.
         */
        web_search_count: number;
      }

      export namespace ByokInferenceUsage {
        /**
         * Charged cost of LLM inference in US cents, split by token type. Omitted when the
         * data is not available.
         */
        export interface CostInCents {
          /**
           * Cost of cache-read input tokens, in US cents.
           */
          input_cache_read_cost_in_cents: number;

          /**
           * Cost of cache-write input tokens, in US cents.
           */
          input_cache_write_cost_in_cents: number;

          /**
           * Cost of non-cached input tokens, in US cents.
           */
          input_cost_in_cents: number;

          /**
           * Cost of output tokens, in US cents.
           */
          output_cost_in_cents: number;
        }

        /**
         * A per-token-type token count.
         */
        export interface TokenCount {
          /**
           * Count of non-cached input tokens.
           */
          input: number;

          /**
           * Count of cache-read input tokens.
           */
          input_cache_read: number;

          /**
           * Count of cache-write input tokens.
           */
          input_cache_write: number;

          /**
           * Count of output tokens.
           */
          output: number;
        }
      }

      /**
       * Full token count and charged-cost detail for inference usage. The counts and
       * cost describe the same usage (e.g. token_count.input tokens cost
       * cost_in_cents.input_cost_in_cents in total).
       */
      export interface CustomEndpointInferenceUsage {
        /**
         * Charged cost of LLM inference in US cents, split by token type. Omitted when the
         * data is not available.
         */
        cost_in_cents: CustomEndpointInferenceUsage.CostInCents;

        /**
         * A per-token-type token count.
         */
        token_count: CustomEndpointInferenceUsage.TokenCount;

        /**
         * Total cost of those web searches, in US cents.
         */
        web_search_cost_in_cents: number;

        /**
         * Number of web searches performed by this model.
         */
        web_search_count: number;
      }

      export namespace CustomEndpointInferenceUsage {
        /**
         * Charged cost of LLM inference in US cents, split by token type. Omitted when the
         * data is not available.
         */
        export interface CostInCents {
          /**
           * Cost of cache-read input tokens, in US cents.
           */
          input_cache_read_cost_in_cents: number;

          /**
           * Cost of cache-write input tokens, in US cents.
           */
          input_cache_write_cost_in_cents: number;

          /**
           * Cost of non-cached input tokens, in US cents.
           */
          input_cost_in_cents: number;

          /**
           * Cost of output tokens, in US cents.
           */
          output_cost_in_cents: number;
        }

        /**
         * A per-token-type token count.
         */
        export interface TokenCount {
          /**
           * Count of non-cached input tokens.
           */
          input: number;

          /**
           * Count of cache-read input tokens.
           */
          input_cache_read: number;

          /**
           * Count of cache-write input tokens.
           */
          input_cache_write: number;

          /**
           * Count of output tokens.
           */
          output: number;
        }
      }

      /**
       * Full token count and charged-cost detail for inference usage. The counts and
       * cost describe the same usage (e.g. token_count.input tokens cost
       * cost_in_cents.input_cost_in_cents in total).
       */
      export interface DirectAPIInferenceUsage {
        /**
         * Charged cost of LLM inference in US cents, split by token type. Omitted when the
         * data is not available.
         */
        cost_in_cents: DirectAPIInferenceUsage.CostInCents;

        /**
         * A per-token-type token count.
         */
        token_count: DirectAPIInferenceUsage.TokenCount;

        /**
         * Total cost of those web searches, in US cents.
         */
        web_search_cost_in_cents: number;

        /**
         * Number of web searches performed by this model.
         */
        web_search_count: number;
      }

      export namespace DirectAPIInferenceUsage {
        /**
         * Charged cost of LLM inference in US cents, split by token type. Omitted when the
         * data is not available.
         */
        export interface CostInCents {
          /**
           * Cost of cache-read input tokens, in US cents.
           */
          input_cache_read_cost_in_cents: number;

          /**
           * Cost of cache-write input tokens, in US cents.
           */
          input_cache_write_cost_in_cents: number;

          /**
           * Cost of non-cached input tokens, in US cents.
           */
          input_cost_in_cents: number;

          /**
           * Cost of output tokens, in US cents.
           */
          output_cost_in_cents: number;
        }

        /**
         * A per-token-type token count.
         */
        export interface TokenCount {
          /**
           * Count of non-cached input tokens.
           */
          input: number;

          /**
           * Count of cache-read input tokens.
           */
          input_cache_read: number;

          /**
           * Count of cache-write input tokens.
           */
          input_cache_write: number;

          /**
           * Count of output tokens.
           */
          output: number;
        }
      }
    }
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
   * Status message for a run. For terminal error states, includes structured error
   * code and retryability info from the platform error catalog.
   */
  export interface StatusMessage {
    /**
     * Human-readable status message
     */
    message: string;

    /**
     * Whether a setup-failure debug turn is actively pinning the idle timer open right
     * now. While true, session_debug_until can lag behind the real deadline; clients
     * should show an active-debugging state instead of a countdown.
     */
    debug_agent_active?: boolean;

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
    error_code?: AgentAPI.ErrorCode;

    /**
     * Whether the error is transient and the client may retry by submitting a new run.
     * Only present on terminal error states. When false, retrying without addressing
     * the underlying cause will not succeed.
     */
    retryable?: boolean;

    /**
     * When a failed run's shared session stops being held open for debugging. Only
     * present while that window is open.
     *
     * The window is an idle window owned by the agent process: activity in the session
     * pushes this deadline out. The agent republishes it periodically rather than on
     * every keystroke, so the value can lag the true deadline by up to a throttle
     * interval, and always in the conservative direction.
     */
    session_debug_until?: string;
  }
}

/**
 * Source that created the run:
 *
 * - LINEAR: Created from Linear integration
 * - API: Created via the Warp API
 * - SLACK: Created from Slack integration
 * - TEAMS: Created from Microsoft Teams integration
 * - LOCAL: Created from local CLI/app
 * - SCHEDULED_AGENT: Created by a scheduled agent
 * - WEB_APP: Created from the Warp web app
 * - GITHUB_ACTION: Created from a GitHub action
 * - CLOUD_MODE: Created from a Cloud Mode
 * - CLI: Created from the CLI
 * - JIRA: Created from Jira integration
 * - SELF_IMPROVEMENT: Created by Warp's self-improvement pipeline
 * - GITHUB_WEBHOOK: Created from a GitHub webhook event
 * - GITLAB_WEBHOOK: Created from a GitLab webhook event
 * - AZURE_DEVOPS_WEBHOOK: Created from an Azure DevOps webhook event
 * - AUTOFIX: Created by Warp's autofix pipeline
 * - RUN_SCORER: Created by Warp's run-scoring judge
 * - ORCHESTRATION: Created as a child run by the orchestration layer
 *   (parent_run_id set)
 * - BENCHMARK_TRIAL: Created as a factory benchmark trial
 * - CREATE_BENCHMARK_TASK: Created by a Factory foreman authoring a benchmark task
 *   from a completed run
 * - CUSTOM_WEBHOOK: Created by a factory automation subscribed to a custom webhook
 *   source
 */
export type RunSourceType =
  | 'LINEAR'
  | 'API'
  | 'SLACK'
  | 'TEAMS'
  | 'LOCAL'
  | 'SCHEDULED_AGENT'
  | 'WEB_APP'
  | 'GITHUB_ACTION'
  | 'CLOUD_MODE'
  | 'CLI'
  | 'JIRA'
  | 'SELF_IMPROVEMENT'
  | 'GITHUB_WEBHOOK'
  | 'GITLAB_WEBHOOK'
  | 'AZURE_DEVOPS_WEBHOOK'
  | 'AUTOFIX'
  | 'RUN_SCORER'
  | 'ORCHESTRATION'
  | 'BENCHMARK_TRIAL'
  | 'CREATE_BENCHMARK_TASK'
  | 'CUSTOM_WEBHOOK';

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
 * The ID of the cancelled run
 */
export type RunCancelResponse = string;

export interface RunGetConversationResponse {
  /**
   * Unique identifier for the conversation
   */
  conversation_id: string;

  /**
   * Root steps in the conversation
   */
  steps: Array<ConversationStep>;
}

export interface RunGetHarnessUsageResponse {
  available: boolean;

  conversation_id: string;

  run_id: string;

  age_seconds?: number | null;

  usage?:
    | RunGetHarnessUsageResponse.ClaudeHarnessUsageEnvelope
    | RunGetHarnessUsageResponse.CodexHarnessUsageEnvelope;
}

export namespace RunGetHarnessUsageResponse {
  export interface ClaudeHarnessUsageEnvelope {
    capturedAt: string;

    captureSequence: number;

    executionId: number;

    harness: 'CLAUDE_CODE';

    /**
     * Server-owned storage format metadata, not the producer's parser version.
     */
    metricsVersion: 1;

    snapshot: ClaudeHarnessUsageEnvelope.Snapshot;
  }

  export namespace ClaudeHarnessUsageEnvelope {
    export interface Snapshot {
      coverage: Snapshot.Coverage;

      payload: Snapshot.Payload;
    }

    export namespace Snapshot {
      export interface Coverage {
        tokenStatus: 'known' | 'partial' | 'unavailable';

        toolStatus: 'known' | 'partial' | 'unavailable';
      }

      export interface Payload {
        attribution?: Array<Payload.Attribution> | null;

        /**
         * Native tool invocation counts. Total must equal the sum of byName; tool names
         * are arbitrary map keys.
         */
        toolCalls?: Payload.ToolCalls | null;

        /**
         * Native cumulative token categories; cache counters are not added to
         * input_tokens.
         */
        usage?: Payload.Usage | null;
      }

      export namespace Payload {
        export interface Attribution {
          /**
           * Native cumulative token categories; cache counters are not added to
           * input_tokens.
           */
          usage: Attribution.Usage | null;

          inference_geo?: string | null;

          model?: string | null;

          service_tier?: string | null;

          speed?: string | null;
        }

        export namespace Attribution {
          /**
           * Native cumulative token categories; cache counters are not added to
           * input_tokens.
           */
          export interface Usage {
            cache_creation?: Usage.CacheCreation | null;

            /**
             * A native count. Absent or null means unmeasured, not zero.
             */
            cache_creation_input_tokens?: number | null;

            /**
             * A native count. Absent or null means unmeasured, not zero.
             */
            cache_read_input_tokens?: number | null;

            /**
             * A native count. Absent or null means unmeasured, not zero.
             */
            input_tokens?: number | null;

            /**
             * A native count. Absent or null means unmeasured, not zero.
             */
            output_tokens?: number | null;
          }

          export namespace Usage {
            export interface CacheCreation {
              /**
               * A native count. Absent or null means unmeasured, not zero.
               */
              ephemeral_1h_input_tokens?: number | null;

              /**
               * A native count. Absent or null means unmeasured, not zero.
               */
              ephemeral_5m_input_tokens?: number | null;
            }
          }
        }

        /**
         * Native tool invocation counts. Total must equal the sum of byName; tool names
         * are arbitrary map keys.
         */
        export interface ToolCalls {
          byName: { [key: string]: number };

          total: number;
        }

        /**
         * Native cumulative token categories; cache counters are not added to
         * input_tokens.
         */
        export interface Usage {
          cache_creation?: Usage.CacheCreation | null;

          /**
           * A native count. Absent or null means unmeasured, not zero.
           */
          cache_creation_input_tokens?: number | null;

          /**
           * A native count. Absent or null means unmeasured, not zero.
           */
          cache_read_input_tokens?: number | null;

          /**
           * A native count. Absent or null means unmeasured, not zero.
           */
          input_tokens?: number | null;

          /**
           * A native count. Absent or null means unmeasured, not zero.
           */
          output_tokens?: number | null;
        }

        export namespace Usage {
          export interface CacheCreation {
            /**
             * A native count. Absent or null means unmeasured, not zero.
             */
            ephemeral_1h_input_tokens?: number | null;

            /**
             * A native count. Absent or null means unmeasured, not zero.
             */
            ephemeral_5m_input_tokens?: number | null;
          }
        }
      }
    }
  }

  export interface CodexHarnessUsageEnvelope {
    capturedAt: string;

    captureSequence: number;

    executionId: number;

    harness: 'CODEX';

    /**
     * Server-owned storage format metadata, not the producer's parser version.
     */
    metricsVersion: 1;

    snapshot: CodexHarnessUsageEnvelope.Snapshot;
  }

  export namespace CodexHarnessUsageEnvelope {
    export interface Snapshot {
      coverage: Snapshot.Coverage;

      payload: Snapshot.Payload;
    }

    export namespace Snapshot {
      export interface Coverage {
        tokenStatus: 'known' | 'partial' | 'unavailable';

        toolStatus: 'known' | 'partial' | 'unavailable';
      }

      export interface Payload {
        attribution?: Array<Payload.Attribution> | null;

        /**
         * Native tool invocation counts. Total must equal the sum of byName; tool names
         * are arbitrary map keys.
         */
        toolCalls?: Payload.ToolCalls | null;

        /**
         * Native checkpoint counters. Cached input and reasoning output may overlap other
         * categories; no derived total is inferred.
         */
        usage?: Payload.Usage | null;
      }

      export namespace Payload {
        export interface Attribution {
          /**
           * Native checkpoint counters. Cached input and reasoning output may overlap other
           * categories; no derived total is inferred.
           */
          usage: Attribution.Usage | null;

          inference_geo?: string | null;

          model?: string | null;

          service_tier?: string | null;

          speed?: string | null;
        }

        export namespace Attribution {
          /**
           * Native checkpoint counters. Cached input and reasoning output may overlap other
           * categories; no derived total is inferred.
           */
          export interface Usage {
            /**
             * A native count. Absent or null means unmeasured, not zero.
             */
            cache_write_input_tokens?: number | null;

            /**
             * A native count. Absent or null means unmeasured, not zero.
             */
            cached_input_tokens?: number | null;

            /**
             * A native count. Absent or null means unmeasured, not zero.
             */
            input_tokens?: number | null;

            /**
             * A native count. Absent or null means unmeasured, not zero.
             */
            output_tokens?: number | null;

            /**
             * A native count. Absent or null means unmeasured, not zero.
             */
            reasoning_output_tokens?: number | null;

            /**
             * A native count. Absent or null means unmeasured, not zero.
             */
            total_tokens?: number | null;
          }
        }

        /**
         * Native tool invocation counts. Total must equal the sum of byName; tool names
         * are arbitrary map keys.
         */
        export interface ToolCalls {
          byName: { [key: string]: number };

          total: number;
        }

        /**
         * Native checkpoint counters. Cached input and reasoning output may overlap other
         * categories; no derived total is inferred.
         */
        export interface Usage {
          /**
           * A native count. Absent or null means unmeasured, not zero.
           */
          cache_write_input_tokens?: number | null;

          /**
           * A native count. Absent or null means unmeasured, not zero.
           */
          cached_input_tokens?: number | null;

          /**
           * A native count. Absent or null means unmeasured, not zero.
           */
          input_tokens?: number | null;

          /**
           * A native count. Absent or null means unmeasured, not zero.
           */
          output_tokens?: number | null;

          /**
           * A native count. Absent or null means unmeasured, not zero.
           */
          reasoning_output_tokens?: number | null;

          /**
           * A native count. Absent or null means unmeasured, not zero.
           */
          total_tokens?: number | null;
        }
      }
    }
  }
}

/**
 * Response body for listing run timeline events.
 */
export interface RunGetTimelineResponse {
  events: Array<RunGetTimelineResponse.Event>;
}

export namespace RunGetTimelineResponse {
  /**
   * A setup or lifecycle event recorded for an agent run.
   */
  export interface Event {
    /**
     * Type of timeline event recorded for a run.
     */
    event_type:
      | 'oz_run_created'
      | 'oz_run_claimed'
      | 'worker_container_ready'
      | 'shared_session_started'
      | 'agent_started'
      | 'oz_run_done'
      | 'oz_run_blocked'
      | 'oz_run_cancelled'
      | 'oz_run_failed'
      | 'oz_run_errored'
      | 'vm_shutdown';

    /**
     * Unique client- or server-generated identifier for this event.
     */
    event_uuid: string;

    /**
     * Timestamp when the event occurred.
     */
    occurred_at: string;

    /**
     * Run that owns this event.
     */
    run_id: string;

    /**
     * Run execution associated with this event, when available.
     */
    execution_id?: number;

    /**
     * Optional event-specific JSON payload. Contents vary by event type.
     */
    payload?: { [key: string]: unknown };
  }
}

export type RunInterruptResponse = unknown;

/**
 * Response body for listing handoff snapshot attachments.
 */
export interface RunListHandoffAttachmentsResponse {
  /**
   * Handoff snapshot attachments exposed by the latest ended execution. Empty when
   * no ended execution exists or no files were uploaded.
   */
  attachments: Array<RunListHandoffAttachmentsResponse.Attachment>;
}

export namespace RunListHandoffAttachmentsResponse {
  /**
   * A handoff snapshot attachment exposed for download.
   */
  export interface Attachment {
    /**
     * Identifier for the snapshot attachment within the run.
     */
    attachment_id: string;

    /**
     * Time-limited signed URL to download the snapshot attachment.
     */
    download_url: string;

    /**
     * Original filename of the snapshot attachment.
     */
    filename: string;

    /**
     * MIME type of the snapshot attachment, if known.
     */
    mime_type?: string;
  }
}

/**
 * Acknowledgement of an accepted follow-up.
 */
export interface RunSubmitFollowupResponse {
  /**
   * Identifier of the durable follow-up record, or null when the outcome did not
   * create one (`queued_prompt`).
   */
  followup_id: string | null;

  /**
   * How an accepted follow-up was routed.
   *
   * - live_session: the message was handed to the running session. This means the
   *   session-sharing service accepted it, not that the agent has started on it;
   *   observe the session's event stream for the new request.
   * - queued_prompt: the run had not started yet, so the message was appended to its
   *   initial prompt.
   * - handoff_execution: the previous execution had ended, so a new execution of the
   *   same run was created to continue the conversation.
   * - queue_pending: the message is durably queued and will be delivered once the
   *   run can accept it.
   */
  outcome: 'live_session' | 'queued_prompt' | 'handoff_execution' | 'queue_pending';
}

export interface RunListParams extends RunsCursorPageParams {
  /**
   * Query param: Filter runs by ancestor run ID. The referenced run must exist and
   * be accessible to the caller.
   */
  ancestor_run_id?: string;

  /**
   * Query param: Filter runs by artifact type
   */
  artifact_type?: 'PLAN' | 'PULL_REQUEST' | 'SCREENSHOT' | 'FILE' | 'EXTERNAL_REFERENCE';

  /**
   * Query param: Filter runs by the factory automation that dispatched them. Matches
   * runs stamped with the automation_id metadata key at creation time.
   */
  automation_id?: string;

  /**
   * Query param: Filter runs created after this timestamp (RFC3339 format)
   */
  created_after?: string;

  /**
   * Query param: Filter runs created before this timestamp (RFC3339 format)
   */
  created_before?: string;

  /**
   * Query param: Filter by creator UID (user or service account)
   */
  creator?: string;

  /**
   * Query param: Filter runs by environment ID. Passing the literal value
   * `empty-environment` matches runs with no environment configured, rather than
   * omitting the parameter, which applies no environment filter at all.
   * `empty-environment` can never collide with a real environment ID: every
   * environment ID is exactly 22 characters drawn from `[A-Za-z0-9]`, while this
   * sentinel contains a hyphen and is a different length.
   */
  environment_id?: string;

  /**
   * Query param: Filter by where the run executed
   */
  execution_location?: 'LOCAL' | 'REMOTE';

  /**
   * Query param: Filter by the user or agent that executed the run. This will often
   * be the same as the creator, but not always: users may delegate tasks to agents.
   */
  executor?: string;

  /**
   * Query param: Filter runs to those executed by an agent associated with any
   * factory.
   */
  factory_only?: boolean;

  /**
   * Query param: Filter runs by one or more factories. Repeating this parameter
   * matches runs executed by an agent from any selected factory. A UID outside the
   * caller's accessible factories matches nothing.
   */
  factory_uid?: string | Array<string>;

  /**
   * Query param: Filter by exact metadata key/value pairs using object notation
   * (e.g. `metadata[ticket_id]=ACME-238`), combining multiple pairs with AND
   * semantics, up to 5 per request. Returns `feature_not_available` when metadata
   * filtering is not enabled.
   */
  metadata?: { [key: string]: string };

  /**
   * Query param: Filter by model ID
   */
  model_id?: string;

  /**
   * Query param: Filter by agent config name
   */
  name?: string;

  /**
   * Query param: Search by full run ID or run URL, or fuzzy match across run title,
   * prompt, and skill_spec
   */
  q?: string;

  /**
   * Query param: Filter runs by the scheduled agent ID that created them
   */
  schedule_id?: string;

  /**
   * Query param: Filter runs by skill spec (e.g., "owner/repo:path/to/SKILL.md").
   * Alias for skill_spec.
   */
  skill?: string;

  /**
   * Query param: Filter runs by skill spec (e.g., "owner/repo:path/to/SKILL.md")
   */
  skill_spec?: string;

  /**
   * Query param: Sort field for results.
   *
   * - `updated_at`: Sort by last update timestamp (default)
   * - `created_at`: Sort by creation timestamp
   * - `title`: Sort alphabetically by run title
   * - `agent`: Sort alphabetically by skill. Runs without a skill are grouped last.
   */
  sort_by?: 'updated_at' | 'created_at' | 'title' | 'agent';

  /**
   * Query param: Sort direction
   */
  sort_order?: 'asc' | 'desc';

  /**
   * Query param: Filter by run source type. Can be specified multiple times to match
   * any of the given sources.
   */
  source?: Array<RunSourceType>;

  /**
   * Query param: Filter by run state. Can be specified multiple times to match any
   * of the given states.
   */
  state?: Array<RunState>;

  /**
   * Query param: Filter by high-level task status. Can be specified multiple times
   * to match any value. `running` matches when the root or any descendant is queued,
   * pending, claimed, or in progress. `failed`, `blocked`, `cancelled`, and
   * `complete` match the root state only.
   */
  task_status?: Array<'running' | 'failed' | 'blocked' | 'cancelled' | 'complete'>;

  /**
   * Query param: Filter runs updated after this timestamp (RFC3339 format)
   */
  updated_after?: string;

  /**
   * Header param: UID of the team to use as the request's active team. Ignored for
   * service-account callers, which always act as their bound team.
   */
  team_uid?: string;
}

export interface RunSubmitFollowupParams {
  /**
   * Files to deliver with the message, at most 25. Each entry must name an
   * attachment previously prepared for this run through
   * `POST /agent/runs/{runId}/attachments/prepare` and uploaded to its upload
   * target; an unknown `attachment_id` is rejected with 422. Files are only
   * materialized for the agent on the Oz harness; other harnesses receive a notice
   * naming the files.
   */
  attachments?: Array<RunSubmitFollowupParams.Attachment>;

  /**
   * The follow-up message to send to the run. May be empty when `attachments` is
   * non-empty.
   */
  message?: string;

  /**
   * Optional query mode for the follow-up. Defaults to `normal` when omitted. The
   * server does not infer mode from prompt prefixes such as `/plan`. The mode only
   * takes effect when the follow-up is queued ahead of the run starting or starts a
   * new execution; a follow-up injected into a live session runs in the session's
   * current mode.
   */
  mode?: 'normal' | 'plan' | 'orchestrate';
}

export namespace RunSubmitFollowupParams {
  /**
   * A prepared attachment to deliver with a follow-up message.
   */
  export interface Attachment {
    /**
     * The `attachment_id` (a UUID) returned by the attachment prepare endpoint for
     * this run.
     */
    attachment_id: string;

    /**
     * Optional display name shown to the agent in place of the name recorded when the
     * attachment was prepared. The stored object is unaffected.
     */
    file_name?: string;
  }
}

export declare namespace Runs {
  export {
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
}
