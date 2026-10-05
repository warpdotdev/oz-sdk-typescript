// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AgentAPI from '../agent/agent';
import { APIPromise } from '../../core/api-promise';
import {
  PagePromise,
  ScorerResultsCursorPage,
  type ScorerResultsCursorPageParams,
} from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Scorers extends APIResource {
  /**
   * Create an active run scorer for a factory with either selected-agent or
   * all-agent scope. Creating a scorer does not start scoring. Pass
   * self_improvement_enabled to also turn on self-improvement for the new scorer in
   * the same request; the scorer and its self-improvement config are created
   * atomically.
   *
   * @example
   * ```ts
   * const scorer = await client.factories.scorers.create({
   *   allowed_classifications: [{ score: 0, value: 'x' }],
   *   factory_uid: 'x',
   *   model_id: 'x',
   *   name: 'x',
   *   scope_mode: 'all_agents',
   *   scoring_prompt: 'x',
   *   threshold: 0,
   * });
   * ```
   */
  create(body: ScorerCreateParams, options?: RequestOptions): APIPromise<ScorerCreateResponse> {
    return this._client.post('/factory/scorers', { body, ...options });
  }

  /**
   * List the scorers owned by the caller's team, including scope agents and
   * aggregate scoring stats. Pass factory_uid to narrow the result to a single
   * factory.
   *
   * @example
   * ```ts
   * const scorers = await client.factories.scorers.list();
   * ```
   */
  list(
    params: ScorerListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ScorerListResponse> {
    const { team_uid, ...query } = params ?? {};
    return this._client.get('/factory/scorers', {
      query,
      ...options,
      headers: buildHeaders([
        { ...(team_uid != null ? { 'X-Warp-Team-Uid': team_uid } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Read the judge's reasoning for the given runs. A run whose reason is missing or
   * unreadable is reported individually so one unavailable reason never fails the
   * request.
   *
   * @example
   * ```ts
   * const response =
   *   await client.factories.scorers.listResultReasons(0, {
   *     run_id: ['string'],
   *   });
   * ```
   */
  listResultReasons(
    scorerID: number,
    params: ScorerListResultReasonsParams,
    options?: RequestOptions,
  ): APIPromise<ScorerListResultReasonsResponse> {
    const { team_uid, ...query } = params;
    return this._client.get(path`/factory/scorers/${scorerID}/results/reasons`, {
      query,
      ...options,
      headers: buildHeaders([
        { ...(team_uid != null ? { 'X-Warp-Team-Uid': team_uid } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * List the scorer's most recent scoring attempts, newest first. A failed attempt
   * carries no classification. Pagination is a keyset cursor over attempted_at with
   * the attempt id as a stable tiebreak.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const scorerListResultsResponse of client.factories.scorers.listResults(
   *   0,
   * )) {
   *   // ...
   * }
   * ```
   */
  listResults(
    scorerID: number,
    params: ScorerListResultsParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ScorerListResultsResponsesScorerResultsCursorPage, ScorerListResultsResponse> {
    const { team_uid, ...query } = params ?? {};
    return this._client.getAPIList(
      path`/factory/scorers/${scorerID}/results`,
      ScorerResultsCursorPage<ScorerListResultsResponse>,
      {
        query,
        ...options,
        headers: buildHeaders([
          { ...(team_uid != null ? { 'X-Warp-Team-Uid': team_uid } : undefined) },
          options?.headers,
        ]),
      },
    );
  }
}

export type ScorerListResultsResponsesScorerResultsCursorPage =
  ScorerResultsCursorPage<ScorerListResultsResponse>;

export interface ScorerCreateResponse {
  /**
   * Scorer identifier
   */
  id: number;

  /**
   * Scorer-specific execution overrides for its hidden judge agent. An omitted or
   * null field inherits the corresponding Factory agent default. A non-empty value
   * replaces that default. Empty secrets and mcp_servers collections explicitly
   * clear the optional Factory defaults.
   */
  agent_config: ScorerCreateResponse.AgentConfig;

  /**
   * Agents attached to a selected_agents scorer; empty for all_agents
   */
  agent_uids: Array<string>;

  /**
   * Selected agents and whether each evaluation includes its run descendants
   */
  agents: Array<ScorerCreateResponse.Agent>;

  allowed_classifications: Array<ScorerCreateResponse.AllowedClassification>;

  /**
   * When the scorer was created
   */
  created_at: string;

  /**
   * Description of the scorer
   */
  description: string;

  /**
   * UID of the factory that owns the scorer
   */
  factory_uid: string;

  /**
   * LLM model dispatched judge runs use to evaluate this scorer's rubric.
   */
  model_id: string;

  /**
   * Display name for the scorer
   */
  name: string;

  /**
   * Percentage of the scorer's eligible runs that periodic scoring scores, to two
   * decimal places. 0 stops automatic scoring.
   */
  sampling_rate: number;

  /**
   * Whether the scorer applies to every factory agent or selected agents
   */
  scope_mode: 'all_agents' | 'selected_agents';

  /**
   * Whether the scorer is user-defined or a platform-owned managed scorer. Read-only
   * on responses; create input does not accept scorer_kind.
   */
  scorer_kind: 'user' | 'benchmark_task_correctness';

  /**
   * Instructions used to score matching runs
   */
  scoring_prompt: string;

  /**
   * Score a run's classified label must meet or exceed to pass, from 0 to 1
   */
  threshold: number;

  /**
   * When the scorer was updated
   */
  updated_at: string;

  /**
   * Scorer definition version
   */
  version: number;
}

export namespace ScorerCreateResponse {
  /**
   * Scorer-specific execution overrides for its hidden judge agent. An omitted or
   * null field inherits the corresponding Factory agent default. A non-empty value
   * replaces that default. Empty secrets and mcp_servers collections explicitly
   * clear the optional Factory defaults.
   */
  export interface AgentConfig {
    /**
     * Runner used by scorer judge runs. Omit or set null to inherit the Factory agent
     * default.
     */
    default_runner_uid?: string | null;

    /**
     * MCP servers attached to scorer judge runs. Omit or set null to inherit the
     * Factory agent defaults; an empty object attaches none.
     */
    mcp_servers?: { [key: string]: AgentAPI.McpServerConfig } | null;

    /**
     * Managed secrets attached to scorer judge runs. Omit or set null to inherit the
     * Factory agent defaults; an empty array attaches none.
     */
    secrets?: Array<AgentAPI.SecretRef> | null;
  }

  export interface Agent {
    /**
     * Unique identifier of the selected agent
     */
    uid: string;

    /**
     * Whether scoring this agent's run includes its descendant subtree
     */
    include_descendants?: boolean;
  }

  export interface AllowedClassification {
    /**
     * Score this classification carries, from 0 to 1. A run passes when its scored
     * label's score is greater than or equal to the scorer's threshold. A score of
     * exactly 0 is valid, so this is not enforced with a "required" binding (which
     * would reject the zero value); handlers validate its range explicitly instead.
     */
    score: number;

    /**
     * Classification value returned by the scorer
     */
    value: string;

    /**
     * Optional free-text meaning of this classification, surfaced to the judge
     * alongside the value. Omit or leave blank for a score-only label.
     */
    description?: string | null;
  }
}

export interface ScorerListResponse {
  scorers: Array<ScorerListResponse.Scorer>;
}

export namespace ScorerListResponse {
  export interface Scorer {
    /**
     * Scorer identifier
     */
    id: number;

    /**
     * Scorer-specific execution overrides for its hidden judge agent. An omitted or
     * null field inherits the corresponding Factory agent default. A non-empty value
     * replaces that default. Empty secrets and mcp_servers collections explicitly
     * clear the optional Factory defaults.
     */
    agent_config: Scorer.AgentConfig;

    /**
     * Named agents in scope; empty when the scorer covers all factory agents
     */
    agents: Array<Scorer.Agent>;

    allowed_classifications: Array<Scorer.AllowedClassification>;

    /**
     * When the scorer was created
     */
    created_at: string;

    /**
     * Description of the scorer
     */
    description: string;

    /**
     * Public UID of the factory that owns the scorer
     */
    factory_uid: string;

    /**
     * LLM model dispatched judge runs use to evaluate this scorer's rubric.
     */
    model_id: string;

    /**
     * Display name for the scorer
     */
    name: string;

    pass_rate_summary: Scorer.PassRateSummary;

    /**
     * Number of live scores recorded for the scorer
     */
    result_count: number;

    /**
     * Percentage of the scorer's eligible runs that periodic scoring scores, to two
     * decimal places. 0 stops automatic scoring.
     */
    sampling_rate: number;

    /**
     * all_agents (every agent in the scorer's factory) or selected_agents
     */
    scope_mode: 'all_agents' | 'selected_agents';

    /**
     * Whether the scorer is user-defined or a platform-owned managed scorer. Read-only
     * on responses; create input does not accept scorer_kind.
     */
    scorer_kind: 'user' | 'benchmark_task_correctness';

    /**
     * Instructions used to score the agent's runs
     */
    scoring_prompt: string;

    /**
     * Whether self-improvement is enabled for this scorer
     */
    self_improvement_enabled: boolean;

    /**
     * Score a run's classified label must meet or exceed to pass, from 0 to 1
     */
    threshold: number;

    /**
     * When the scorer was last updated
     */
    updated_at: string;

    /**
     * Scorer definition version
     */
    version: number;

    /**
     * When the scorer last recorded a score
     */
    last_scored_at?: string | null;
  }

  export namespace Scorer {
    /**
     * Scorer-specific execution overrides for its hidden judge agent. An omitted or
     * null field inherits the corresponding Factory agent default. A non-empty value
     * replaces that default. Empty secrets and mcp_servers collections explicitly
     * clear the optional Factory defaults.
     */
    export interface AgentConfig {
      /**
       * Runner used by scorer judge runs. Omit or set null to inherit the Factory agent
       * default.
       */
      default_runner_uid?: string | null;

      /**
       * MCP servers attached to scorer judge runs. Omit or set null to inherit the
       * Factory agent defaults; an empty object attaches none.
       */
      mcp_servers?: { [key: string]: AgentAPI.McpServerConfig } | null;

      /**
       * Managed secrets attached to scorer judge runs. Omit or set null to inherit the
       * Factory agent defaults; an empty array attaches none.
       */
      secrets?: Array<AgentAPI.SecretRef> | null;
    }

    export interface Agent {
      /**
       * Whether scoring this agent's run includes its descendant subtree
       */
      include_descendants: boolean;

      /**
       * Display name of the agent
       */
      name: string;

      /**
       * Unique identifier of the agent
       */
      uid: string;
    }

    export interface AllowedClassification {
      /**
       * Score this classification carries, from 0 to 1. A run passes when its scored
       * label's score is greater than or equal to the scorer's threshold. A score of
       * exactly 0 is valid, so this is not enforced with a "required" binding (which
       * would reject the zero value); handlers validate its range explicitly instead.
       */
      score: number;

      /**
       * Classification value returned by the scorer
       */
      value: string;

      /**
       * Optional free-text meaning of this classification, surfaced to the judge
       * alongside the value. Omit or leave blank for a score-only label.
       */
      description?: string | null;
    }

    export interface PassRateSummary {
      /**
       * Number of live scores whose derived outcome is fail, within the same
       * recent_outcomes_limit window as recent_outcomes (not the scorer's all-time
       * history).
       */
      fail_count: number;

      /**
       * Number of live scores whose derived outcome is pass, within the same
       * recent_outcomes_limit window as recent_outcomes (not the scorer's all-time
       * history).
       */
      pass_count: number;

      /**
       * The scorer's most recent live scores' outcomes, oldest first, for a compact
       * history strip; length is bounded by recent_outcomes_limit, and failed attempts
       * (no live score) are not included. pass_count and fail_count are computed over
       * this exact same windowed set, so the headline rate and the strip always describe
       * the same scores.
       */
      recent_outcomes: Array<'pass' | 'fail'>;

      /**
       * pass_count / (pass_count + fail_count), over the same recent window as
       * pass_count and fail_count. Null when there are no scoreable (pass or fail)
       * scores in that window. Clients must not use result_count as the denominator.
       */
      pass_rate?: number | null;
    }
  }
}

export interface ScorerListResultReasonsResponse {
  reasons: Array<ScorerListResultReasonsResponse.Reason>;
}

export namespace ScorerListResultReasonsResponse {
  export interface Reason {
    /**
     * The run this reason belongs to
     */
    run_id: string;

    /**
     * Availability of the run's judge reason: "available" when the reason was read,
     * "absent" when the judge recorded none, and "unavailable" when a recorded reason
     * could not be read back.
     */
    status: 'available' | 'absent' | 'unavailable';

    /**
     * The judge's reasoning, truncated beyond 8KB when it was recorded; absent unless
     * status is "available".
     */
    reason?: string | null;
  }
}

export interface ScorerListResultsResponse {
  /**
   * When the scorer last attempted this run
   */
  attempted_at: string;

  /**
   * True when a non-terminal judge run currently holds this pair. Independent of
   * status/classification: a previous live classification stays visible while a
   * replacement judge runs.
   */
  is_in_flight: boolean;

  /**
   * The selected agent run that anchors the scoring attempt
   */
  run_id: string;

  /**
   * Outcome of a scoring attempt: "scored", "failed", or "in_flight" (no live score
   * yet and a judge is currently running). A failed or in_flight attempt has no
   * classification. A scored attempt whose is_in_flight is also true has a live
   * classification while a replacement judge runs.
   */
  status: string;

  /**
   * The chosen classification; absent when the attempt failed
   */
  classification?: string | null;

  /**
   * Conversation whose transcript was judged
   */
  conversation_id?: string | null;

  /**
   * Title of the judged conversation
   */
  conversation_title?: string | null;

  /**
   * Pass/fail verdict of a recorded score, derived at read time against the
   * evaluation's current threshold rather than frozen at scoring time — editing the
   * threshold retroactively changes the outcome of already-scored runs. Today this
   * is "pass" or "fail"; clients should tolerate additional values so future
   * non-scoreable verdicts (for example, excluded from scoring) do not break them.
   * Do not use result_count as a pass-rate denominator: only pass and fail count.
   */
  outcome?: 'pass' | 'fail' | null;

  /**
   * Numeric score of the classified label, resolved from the attempt's config
   * snapshot at scoring time. Absent when the attempt failed.
   */
  score?: number | null;

  /**
   * When the live score was recorded; absent for failed attempts
   */
  scored_at?: string | null;

  /**
   * The Warp run that performed the judging; absent when scoring was never
   * dispatched for this attempt
   */
  scoring_run_id?: string | null;

  /**
   * Total runtime of the scoring run as an ISO 8601 duration. Absent when there is
   * no scoring run or its execution duration is not yet available.
   */
  scoring_run_time?: string | null;

  /**
   * Resource usage information for the run
   */
  scoring_run_usage?: ScorerListResultsResponse.ScoringRunUsage;
}

export namespace ScorerListResultsResponse {
  /**
   * Resource usage information for the run
   */
  export interface ScoringRunUsage {
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
    model_token_usage?: Array<ScoringRunUsage.ModelTokenUsage>;

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
    usage_by_category?: { [key: string]: ScoringRunUsage.UsageByCategory };
  }

  export namespace ScoringRunUsage {
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
}

export interface ScorerCreateParams {
  /**
   * Values the scorer may return; classification values must be unique
   */
  allowed_classifications: Array<ScorerCreateParams.AllowedClassification>;

  /**
   * UID of the factory that owns the scorer
   */
  factory_uid: string;

  /**
   * LLM model dispatched judge runs use to evaluate this scorer's rubric.
   */
  model_id: string;

  /**
   * Display name for the scorer
   */
  name: string;

  /**
   * Whether the scorer applies to every factory agent or selected agents
   */
  scope_mode: 'all_agents' | 'selected_agents';

  /**
   * Instructions used to score matching runs
   */
  scoring_prompt: string;

  /**
   * Score a run's classified label must meet or exceed to pass, from 0 to 1.
   */
  threshold: number;

  /**
   * Scorer-specific execution overrides for its hidden judge agent. An omitted or
   * null field inherits the corresponding Factory agent default. A non-empty value
   * replaces that default. Empty secrets and mcp_servers collections explicitly
   * clear the optional Factory defaults.
   */
  agent_config?: ScorerCreateParams.AgentConfig;

  /**
   * Legacy shorthand for selected agents with include_descendants=false. Required
   * and non-empty for selected_agents when agents is omitted; must be empty for
   * all_agents and cannot be combined with agents.
   */
  agent_uids?: Array<string>;

  /**
   * Selected agents and their evidence policy. Required and non-empty for
   * selected_agents when agent_uids is omitted; must be empty for all_agents and
   * cannot be combined with agent_uids.
   */
  agents?: Array<ScorerCreateParams.Agent>;

  /**
   * Optional description of the scorer
   */
  description?: string | null;

  /**
   * Percentage of the scorer's eligible runs to score, from 0 to 100; omit to score
   * every eligible run, and 0 stops automatic scoring (manual dispatch still works).
   * A value with more than two decimal places is rounded to two rather than
   * rejected, and the rounded value is what is stored. Sampling applies to periodic
   * scoring only, and runs are chosen deterministically per (scorer, run), so
   * lowering the rate reduces how many runs are scored rather than how often.
   */
  sampling_rate?: number | null;

  /**
   * Optionally enable self-improvement for the newly created scorer in the same
   * transactional request, instead of a separate call to PUT
   * /factory/scorers/{scorer_id}/self-improvement-config afterward; defaults to
   * false. The response does not echo this back — a successful (2xx) response means
   * the requested state was applied, confirmable at any time with GET
   * .../self-improvement-config. Setting this to true requires a human user
   * principal, matching the restriction on the PUT endpoint; a service-account
   * principal gets the same error as calling that endpoint directly.
   */
  self_improvement_enabled?: boolean;
}

export namespace ScorerCreateParams {
  export interface AllowedClassification {
    /**
     * Score this classification carries, from 0 to 1. A run passes when its scored
     * label's score is greater than or equal to the scorer's threshold. A score of
     * exactly 0 is valid, so this is not enforced with a "required" binding (which
     * would reject the zero value); handlers validate its range explicitly instead.
     */
    score: number;

    /**
     * Classification value returned by the scorer
     */
    value: string;

    /**
     * Optional free-text meaning of this classification, surfaced to the judge
     * alongside the value. Omit or leave blank for a score-only label.
     */
    description?: string | null;
  }

  /**
   * Scorer-specific execution overrides for its hidden judge agent. An omitted or
   * null field inherits the corresponding Factory agent default. A non-empty value
   * replaces that default. Empty secrets and mcp_servers collections explicitly
   * clear the optional Factory defaults.
   */
  export interface AgentConfig {
    /**
     * Runner used by scorer judge runs. Omit or set null to inherit the Factory agent
     * default.
     */
    default_runner_uid?: string | null;

    /**
     * MCP servers attached to scorer judge runs. Omit or set null to inherit the
     * Factory agent defaults; an empty object attaches none.
     */
    mcp_servers?: { [key: string]: AgentAPI.McpServerConfig } | null;

    /**
     * Managed secrets attached to scorer judge runs. Omit or set null to inherit the
     * Factory agent defaults; an empty array attaches none.
     */
    secrets?: Array<AgentAPI.SecretRef> | null;
  }

  export interface Agent {
    /**
     * Unique identifier of the selected agent
     */
    uid: string;

    /**
     * Whether scoring this agent's run includes its descendant subtree
     */
    include_descendants?: boolean;
  }
}

export interface ScorerListParams {
  /**
   * Query param: RFC3339 UTC timestamp, exclusive. See start_date.
   */
  end_date?: string;

  /**
   * Query param: Filter scorers by factory. Omit to list every scorer the team owns.
   */
  factory_uid?: string;

  /**
   * Query param: When true, include platform-owned managed scorers (for example the
   * benchmark correctness scorer) alongside user scorers. Defaults to false so
   * general scorer management only lists user-defined scorers.
   */
  include_managed?: boolean;

  /**
   * Query param: Maximum number of recent scored outcomes to include in each
   * scorer's pass_rate_summary.recent_outcomes (1-100, default 50). pass_count,
   * fail_count, and pass_rate are computed over that same windowed set so the
   * headline always agrees with the strip.
   */
  recent_outcomes_limit?: number;

  /**
   * Query param: RFC3339 UTC timestamp, inclusive; must be provided together with
   * end_date and be strictly before it, or both omitted to use the unscoped window
   * scorer detail pages use. Together with end_date, scopes pass_rate_summary
   * (pass_count, fail_count, pass_rate, and recent_outcomes) to live scores in
   * [start_date, end_date) instead of the flat recent_outcomes_limit-only window.
   * result_count and last_scored_at are never affected by this parameter.
   */
  start_date?: string;

  /**
   * Header param: UID of the team to use as the request's active team. Ignored for
   * service-account callers, which always act as their bound team.
   */
  team_uid?: string;
}

export interface ScorerListResultReasonsParams {
  /**
   * Query param: Runs to read reasons for. Repeat the parameter once per run; at
   * most 100 distinct runs (the results page maximum) per request.
   */
  run_id: Array<string>;

  /**
   * Header param: UID of the team to use as the request's active team. Ignored for
   * service-account callers, which always act as their bound team.
   */
  team_uid?: string;
}

export interface ScorerListResultsParams extends ScorerResultsCursorPageParams {
  /**
   * Header param: UID of the team to use as the request's active team. Ignored for
   * service-account callers, which always act as their bound team.
   */
  team_uid?: string;
}

export declare namespace Scorers {
  export {
    type ScorerCreateResponse as ScorerCreateResponse,
    type ScorerListResponse as ScorerListResponse,
    type ScorerListResultReasonsResponse as ScorerListResultReasonsResponse,
    type ScorerListResultsResponse as ScorerListResultsResponse,
    type ScorerListResultsResponsesScorerResultsCursorPage as ScorerListResultsResponsesScorerResultsCursorPage,
    type ScorerCreateParams as ScorerCreateParams,
    type ScorerListParams as ScorerListParams,
    type ScorerListResultReasonsParams as ScorerListResultReasonsParams,
    type ScorerListResultsParams as ScorerListResultsParams,
  };
}
