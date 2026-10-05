// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as AgentAPI from '../../agent/agent';
import { APIPromise } from '../../../core/api-promise';
import { PagePromise, RunsCursorPage, type RunsCursorPageParams } from '../../../core/pagination';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Operations for creating and managing factories
 */
export class Runs extends APIResource {
  /**
   * List benchmark runs
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const runListResponse of client.factories.benchmarks.runs.list(
   *   'uid',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    uid: string,
    query: RunListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<RunListResponsesRunsCursorPage, RunListResponse> {
    return this._client.getAPIList(path`/factory/${uid}/benchmarks/runs`, RunsCursorPage<RunListResponse>, {
      query,
      ...options,
    });
  }

  /**
   * Get benchmark run detail
   *
   * @example
   * ```ts
   * const run = await client.factories.benchmarks.runs.get(
   *   'run_uid',
   *   { uid: 'uid' },
   * );
   * ```
   */
  get(runUid: string, params: RunGetParams, options?: RequestOptions): APIPromise<RunGetResponse> {
    const { uid } = params;
    return this._client.get(path`/factory/${uid}/benchmarks/runs/${runUid}`, options);
  }

  /**
   * Get benchmark run results
   *
   * @example
   * ```ts
   * const response =
   *   await client.factories.benchmarks.runs.getResults(
   *     'run_uid',
   *     { uid: 'uid' },
   *   );
   * ```
   */
  getResults(
    runUid: string,
    params: RunGetResultsParams,
    options?: RequestOptions,
  ): APIPromise<RunGetResultsResponse> {
    const { uid } = params;
    return this._client.get(path`/factory/${uid}/benchmarks/runs/${runUid}/results`, options);
  }
}

export type RunListResponsesRunsCursorPage = RunsCursorPage<RunListResponse>;

export interface RunListResponse {
  created_at: string;

  factory_uid: string;

  /**
   * Lifecycle state of a benchmark run.
   */
  state: 'pending' | 'running' | 'scoring' | 'completed' | 'failed' | 'cancelled';

  suite_name: string;

  suite_uid: string;

  uid: string;

  updated_at: string;

  /**
   * Display name of the Factory agent frozen onto this run at launch. Absent on
   * legacy runs.
   */
  agent_name?: string;

  /**
   * UID of the Factory agent frozen onto this run at launch.
   */
  agent_uid?: string;

  completed_at?: string | null;

  /**
   * Per-configuration top-line stats, one entry per configuration frozen at launch
   * (including a configuration with no trials dispatched yet). Null until the run
   * has produced at least one trial, same as the other top-line stat fields above.
   */
  configuration_stats?: Array<RunListResponse.ConfigurationStat> | null;

  /**
   * Combined trial and scoring cost in US dollars: run_metrics.cost_usd plus
   * run_metrics.scoring_cost_usd, converted at the owning team's current credit
   * price. Matches the run detail page's Total cost. Not a billed amount. Null until
   * the run has produced at least one trial.
   */
  cost_usd?: number | null;

  /**
   * The principal (user or service account) that launched this run, when known.
   * Absent when creator identity is unknown or no longer retained.
   */
  creator?: AgentAPI.UserProfile;

  /**
   * The run's elapsed wall-clock time in seconds so far, matching
   * BenchmarkResultsResponse's run_metrics.elapsed_s. Null when the run has not
   * started or elapsed time is otherwise unavailable.
   */
  elapsed_s?: number | null;

  repetition_count?: number;

  /**
   * Number of scorers applied to the run. Null until the run has produced at least
   * one trial.
   */
  scorer_count?: number | null;

  started_at?: string | null;

  /**
   * Distinct suite tasks covered by the run's trials so far. Null until the run has
   * produced at least one trial.
   */
  task_count?: number | null;

  /**
   * Total cost across the run's trials so far, in credits, matching
   * BenchmarkResultsResponse's run_metrics.total_credits. Null until the run has
   * produced at least one trial.
   */
  total_credits?: string | null;

  /**
   * Number of trials dispatched so far. Null until the run has produced at least one
   * trial.
   */
  trial_count?: number | null;
}

export namespace RunListResponse {
  export interface ConfigurationStat {
    id: number;

    /**
     * Optional name given to this configuration at launch. Empty when none was given.
     */
    display_name: string;

    fail_count: number;

    pass_count: number;

    role: 'baseline' | 'candidate';

    /**
     * Trials dispatched so far for this configuration specifically.
     */
    trial_count: number;

    /**
     * Average credits per dispatched trial for this configuration so far. Null until
     * this configuration has at least one dispatched trial; a real "0" once one has,
     * even before any cost is measured.
     */
    avg_total_credits_per_trial?: string | null;

    /**
     * Average wall-clock time per dispatched trial for this configuration so far. Null
     * until this configuration has at least one dispatched trial; a real 0 once one
     * has, even before any duration is measured.
     */
    avg_wall_time_s?: number | null;

    /**
     * The configuration's frozen harness. Empty means the agent's default.
     */
    harness?: string;

    /**
     * The configuration's frozen model. Empty means the agent's default.
     */
    model?: string;

    /**
     * pass_count / (pass_count + fail_count). Null until this configuration has at
     * least one scored trial.
     */
    pass_rate?: number | null;

    /**
     * The configuration's frozen runner id. Empty means the platform default runner.
     */
    runner_id?: string;
  }
}

export interface RunGetResponse {
  created_at: string;

  factory_uid: string;

  /**
   * Lifecycle state of a benchmark run.
   */
  state: 'pending' | 'running' | 'scoring' | 'completed' | 'failed' | 'cancelled';

  suite_name: string;

  suite_uid: string;

  uid: string;

  updated_at: string;

  /**
   * Display name of the Factory agent frozen onto this run at launch. Absent on
   * legacy runs.
   */
  agent_name?: string;

  /**
   * UID of the Factory agent frozen onto this run at launch.
   */
  agent_uid?: string;

  completed_at?: string | null;

  /**
   * Per-configuration top-line stats, one entry per configuration frozen at launch
   * (including a configuration with no trials dispatched yet). Null until the run
   * has produced at least one trial, same as the other top-line stat fields above.
   */
  configuration_stats?: Array<RunGetResponse.ConfigurationStat> | null;

  /**
   * The suite's configurations, frozen at launch, for grouping trials before results
   * are available.
   */
  configurations?: Array<RunGetResponse.Configuration>;

  /**
   * Combined trial and scoring cost in US dollars: run_metrics.cost_usd plus
   * run_metrics.scoring_cost_usd, converted at the owning team's current credit
   * price. Matches the run detail page's Total cost. Not a billed amount. Null until
   * the run has produced at least one trial.
   */
  cost_usd?: number | null;

  /**
   * The principal (user or service account) that launched this run, when known.
   * Absent when creator identity is unknown or no longer retained.
   */
  creator?: AgentAPI.UserProfile;

  /**
   * The run's elapsed wall-clock time in seconds so far, matching
   * BenchmarkResultsResponse's run_metrics.elapsed_s. Null when the run has not
   * started or elapsed time is otherwise unavailable.
   */
  elapsed_s?: number | null;

  repetition_count?: number;

  /**
   * Number of scorers applied to the run. Null until the run has produced at least
   * one trial.
   */
  scorer_count?: number | null;

  /**
   * The launch payload's scorer allowlist, frozen at launch. Empty or absent means
   * all applicable scorers.
   */
  scorer_selection?: Array<number>;

  started_at?: string | null;

  /**
   * Distinct suite tasks covered by the run's trials so far. Null until the run has
   * produced at least one trial.
   */
  task_count?: number | null;

  /**
   * Total cost across the run's trials so far, in credits, matching
   * BenchmarkResultsResponse's run_metrics.total_credits. Null until the run has
   * produced at least one trial.
   */
  total_credits?: string | null;

  /**
   * Number of trials dispatched so far. Null until the run has produced at least one
   * trial.
   */
  trial_count?: number | null;

  trials?: Array<RunGetResponse.Trial>;
}

export namespace RunGetResponse {
  export interface ConfigurationStat {
    id: number;

    /**
     * Optional name given to this configuration at launch. Empty when none was given.
     */
    display_name: string;

    fail_count: number;

    pass_count: number;

    role: 'baseline' | 'candidate';

    /**
     * Trials dispatched so far for this configuration specifically.
     */
    trial_count: number;

    /**
     * Average credits per dispatched trial for this configuration so far. Null until
     * this configuration has at least one dispatched trial; a real "0" once one has,
     * even before any cost is measured.
     */
    avg_total_credits_per_trial?: string | null;

    /**
     * Average wall-clock time per dispatched trial for this configuration so far. Null
     * until this configuration has at least one dispatched trial; a real 0 once one
     * has, even before any duration is measured.
     */
    avg_wall_time_s?: number | null;

    /**
     * The configuration's frozen harness. Empty means the agent's default.
     */
    harness?: string;

    /**
     * The configuration's frozen model. Empty means the agent's default.
     */
    model?: string;

    /**
     * pass_count / (pass_count + fail_count). Null until this configuration has at
     * least one scored trial.
     */
    pass_rate?: number | null;

    /**
     * The configuration's frozen runner id. Empty means the platform default runner.
     */
    runner_id?: string;
  }

  export interface Configuration {
    id: number;

    /**
     * Optional name given to this configuration at launch. Empty when none was given.
     */
    display_name: string;

    role: 'baseline' | 'candidate';

    /**
     * Complete launch-time model/harness matrix keyed by stable Agent UID.
     */
    agent_configs?: Array<Configuration.AgentConfig>;

    /**
     * The configuration's frozen harness. Empty means the agent's default.
     */
    harness?: string;

    /**
     * Optional managed-secret name this configuration's third-party harness
     * authenticates with. Empty or omitted is valid for Oz. For a third-party harness
     * that requires auth, empty or omitted means from the worker environment on a
     * self-hosted host, or a launch violation on Warp-hosted.
     */
    harness_auth_secret_name?: string | null;

    /**
     * The configuration's frozen model. Empty means the agent's default.
     */
    model?: string;

    /**
     * Optional runner UID this configuration was launched with. Absent means the
     * agent's or environment's default runner applied.
     */
    runner_id?: string;
  }

  export namespace Configuration {
    export interface AgentConfig {
      agent_uid: string;

      harness: string;

      model: string;

      agent_name?: string;

      harness_auth_secret_name?: string | null;
    }
  }

  export interface Trial {
    id: number;

    configuration_id: number;

    rep_index: number;

    state: string;

    suite_task_id: number;

    /**
     * How many attempts (the first dispatch plus every retry) this trial has used. 1
     * for a trial that never retried, or for a run predating the retry mechanism.
     */
    attempt_count?: number;

    /**
     * This trial's attempt chain, oldest first, ending with its current run. Empty for
     * a trial with no dispatched run, or for a run predating the retry mechanism.
     */
    attempts?: Array<Trial.Attempt>;

    run_id?: string | null;

    /**
     * The suite task's title, frozen at launch, for labeling trials by name instead of
     * id.
     */
    task_title?: string;

    /**
     * The immutable suite task UID frozen at launch. Absent on legacy runs.
     */
    task_uid?: string;
  }

  export namespace Trial {
    export interface Attempt {
      /**
       * This run's 1-indexed position in the trial's attempt chain.
       */
      attempt_number: number;

      run_id: string;

      /**
       * The underlying agent run's terminal state (or its current state, for the chain's
       * newest attempt).
       */
      state: string;
    }
  }
}

/**
 * The progressive results/comparison payload, returned for every run state; before
 * the first score lands, aggregates are empty and only the progress fields are
 * meaningful. provisional is true for pending, running, and scoring, while a
 * completed run's aggregates are final; cancelled/failed runs are terminal, but
 * incomplete_reason explains why their aggregates only reflect work that landed
 * before cleanup began.
 */
export interface RunGetResultsResponse {
  /**
   * Generation state of the completed-run summary. Pending past the two-minute
   * deadline is returned as unavailable. Failed and cancelled runs are unavailable
   * with no narrative.
   */
  summary_status: 'pending' | 'available' | 'unavailable';

  benchmark_run_uid?: string;

  configurations?: Array<RunGetResultsResponse.Configuration>;

  cost_latency?: unknown;

  /**
   * Set only for a cancelled or failed run, explaining why its aggregates are
   * terminal but incomplete.
   */
  incomplete_reason?: string | null;

  /**
   * True while the run is pending, running, or scoring; every aggregate may still
   * change.
   */
  provisional?: boolean;

  repetition_count?: number;

  run_metrics?: RunGetResultsResponse.RunMetrics;

  /**
   * Lifecycle state of a benchmark run.
   */
  run_state?: 'pending' | 'running' | 'scoring' | 'completed' | 'failed' | 'cancelled';

  /**
   * Score-work ledger row counts by lifecycle state, plus the derived received =
   * scored and expected = pending + judging + scored + finished_unscored (excludes
   * awaiting_trial and not_scoreable).
   */
  score_progress?: unknown;

  scorers?: Array<unknown>;

  suite_name?: string;

  /**
   * The stored summary paragraph. Present only when summary_status is available.
   */
  summary_narrative?: string;

  /**
   * Logical (task, configuration, repetition) trial counts by lifecycle state. A
   * retry remains part of its original trial. completed is succeeded + failed +
   * cancelled.
   */
  trial_progress?: RunGetResultsResponse.TrialProgress;

  trials?: Array<RunGetResultsResponse.Trial>;

  /**
   * Succeeded trials with at least one pending or judging score-work row.
   */
  trials_being_judged?: number;

  /**
   * Succeeded trials whose applicable score-work rows are all scored or
   * finished_unscored.
   */
  trials_scoring_finished?: number;
}

export namespace RunGetResultsResponse {
  export interface Configuration {
    id: number;

    /**
     * Optional name given to this configuration at launch. Empty when none was given.
     */
    display_name: string;

    /**
     * Objective credit and wall-time measurements for this configuration.
     */
    metrics: unknown;

    /**
     * This configuration's trial count with at least one retry (attempt_count > 1).
     */
    retried_trial_count: number;

    /**
     * Total number of retries (attempt_count - 1, summed) across this configuration's
     * trials.
     */
    retry_count: number;

    role: 'baseline' | 'candidate';

    /**
     * Pass/fail tally with the derived pass rate across all applicable scorers.
     */
    scoring: unknown;

    /**
     * Complete launch-time model/harness matrix keyed by stable Agent UID.
     */
    agent_configs?: Array<Configuration.AgentConfig>;

    /**
     * The configuration's frozen harness. Empty means the agent's default.
     */
    harness?: string;

    /**
     * Optional managed-secret name this configuration's third-party harness
     * authenticated with. Frozen from the launch payload.
     */
    harness_auth_secret_name?: string | null;

    /**
     * The configuration's frozen model. Empty means the agent's default.
     */
    model?: string;
  }

  export namespace Configuration {
    export interface AgentConfig {
      agent_uid: string;

      harness: string;

      model: string;

      agent_name?: string;

      harness_auth_secret_name?: string | null;
    }
  }

  export interface RunMetrics {
    compute_credits: string;

    /**
     * Estimated trial-run spend at the owning team's current credit price. Not a
     * billed amount.
     */
    cost_usd: number;

    elapsed_s: number;

    platform_credits: string;

    /**
     * Estimated scoring and judge spend at the owning team's current credit price. Not
     * a billed amount.
     */
    scoring_cost_usd: number;

    /**
     * Credits consumed by benchmark trial runs.
     */
    total_credits: string;

    /**
     * Credits consumed by distinct dispatched scoring and judge runs. Present only
     * when the benchmark in-progress UI feature is enabled.
     */
    scoring_credits?: string;
  }

  /**
   * Logical (task, configuration, repetition) trial counts by lifecycle state. A
   * retry remains part of its original trial. completed is succeeded + failed +
   * cancelled.
   */
  export interface TrialProgress {
    cancelled: number;

    completed: number;

    failed: number;

    pending: number;

    running: number;

    succeeded: number;

    total: number;
  }

  export interface Trial {
    configuration_id: number;

    metrics: unknown;

    rep_index: number;

    scores: Array<unknown>;

    state: string;

    /**
     * Frozen internal storage coordinate retained for compatibility.
     */
    suite_task_id: number;

    attempt_count?: number;

    attempts?: Array<Trial.Attempt>;

    judge_runs?: Array<unknown>;

    run_id?: string;

    task_title?: string;

    /**
     * The immutable suite task UID frozen at launch. Absent on legacy runs.
     */
    task_uid?: string;

    /**
     * Normalized terminal reason for a failed trial. timeout means its newest
     * dispatched run ended with an authoritative infrastructure timeout; every other
     * failed trial reports failure. Omitted for queued, running, succeeded, and
     * cancelled trials, and when the benchmark in-progress UI feature is disabled.
     */
    terminal_reason?: 'timeout' | 'failure';
  }

  export namespace Trial {
    export interface Attempt {
      /**
       * This run's 1-indexed position in the trial's attempt chain.
       */
      attempt_number: number;

      run_id: string;

      /**
       * The underlying agent run's terminal state (or its current state, for the chain's
       * newest attempt).
       */
      state: string;
    }
  }
}

export interface RunListParams extends RunsCursorPageParams {
  state?: Array<'pending' | 'running' | 'scoring' | 'completed' | 'failed' | 'cancelled'>;

  suite_uid?: string;
}

export interface RunGetParams {
  uid: string;
}

export interface RunGetResultsParams {
  uid: string;
}

export declare namespace Runs {
  export {
    type RunListResponse as RunListResponse,
    type RunGetResponse as RunGetResponse,
    type RunGetResultsResponse as RunGetResultsResponse,
    type RunListResponsesRunsCursorPage as RunListResponsesRunsCursorPage,
    type RunListParams as RunListParams,
    type RunGetParams as RunGetParams,
    type RunGetResultsParams as RunGetResultsParams,
  };
}
