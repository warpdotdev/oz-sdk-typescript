// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as AgentAPI from '../../agent/agent';
import { APIPromise } from '../../../core/api-promise';
import {
  BenchmarkSuitesCursorPage,
  type BenchmarkSuitesCursorPageParams,
  PagePromise,
} from '../../../core/pagination';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Operations for creating and managing factories
 */
export class Suites extends APIResource {
  /**
   * Create a benchmark suite
   *
   * @example
   * ```ts
   * const suite =
   *   await client.factories.benchmarks.suites.create('uid', {
   *     agent_uid: 'agent_uid',
   *     factory_agent_type: 'factory_agent_type',
   *     name: 'name',
   *     suite_uid: 'uid',
   *   });
   * ```
   */
  create(uid: string, params: SuiteCreateParams, options?: RequestOptions): APIPromise<SuiteCreateResponse> {
    const { suite_uid, ...body } = params;
    return this._client.post(path`/factory/${uid}/benchmarks/suites`, {
      body: { uid: suite_uid, ...body },
      ...options,
    });
  }

  /**
   * List benchmark suites
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const suiteListResponse of client.factories.benchmarks.suites.list(
   *   'uid',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    uid: string,
    query: SuiteListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<SuiteListResponsesBenchmarkSuitesCursorPage, SuiteListResponse> {
    return this._client.getAPIList(
      path`/factory/${uid}/benchmarks/suites`,
      BenchmarkSuitesCursorPage<SuiteListResponse>,
      { query, ...options },
    );
  }

  /**
   * Get a benchmark suite with its tasks and configurations
   *
   * @example
   * ```ts
   * const suite = await client.factories.benchmarks.suites.get(
   *   'suite_uid',
   *   { uid: 'uid' },
   * );
   * ```
   */
  get(suiteUid: string, params: SuiteGetParams, options?: RequestOptions): APIPromise<SuiteGetResponse> {
    const { uid } = params;
    return this._client.get(path`/factory/${uid}/benchmarks/suites/${suiteUid}`, options);
  }

  /**
   * Launch a benchmark run from the current suite version
   *
   * @example
   * ```ts
   * const response =
   *   await client.factories.benchmarks.suites.launchRun(
   *     'suite_uid',
   *     { uid: 'uid', repetition_count: 1 },
   *   );
   * ```
   */
  launchRun(
    suiteUid: string,
    params: SuiteLaunchRunParams,
    options?: RequestOptions,
  ): APIPromise<SuiteLaunchRunResponse> {
    const { uid, ...body } = params;
    return this._client.post(path`/factory/${uid}/benchmarks/suites/${suiteUid}/runs`, { body, ...options });
  }
}

export type SuiteListResponsesBenchmarkSuitesCursorPage = BenchmarkSuitesCursorPage<SuiteListResponse>;

export interface SuiteCreateResponse {
  /**
   * UID of the concrete Factory agent every task in this suite dispatches as. Must
   * resolve to a live, available agent linked to this Factory whose agent_type
   * equals factory_agent_type.
   */
  agent_uid: string;

  created_at: string;

  /**
   * Coarse Factory agent type of the selected agent_uid, kept in sync with it at
   * save time.
   */
  factory_agent_type: string;

  factory_uid: string;

  name: string;

  uid: string;

  updated_at: string;

  /**
   * File-authored launch defaults. Omitted on suites without persistent
   * configurations.
   */
  configurations?: Array<SuiteCreateResponse.Configuration>;

  /**
   * The suite's creator, when known. Absent when creator identity is unknown or no
   * longer retained.
   */
  creator?: AgentAPI.UserProfile;

  description?: string;
}

export namespace SuiteCreateResponse {
  export interface Configuration {
    /**
     * Optional per-named-Agent overrides keyed by stable Agent UID.
     */
    agent_configs?: Array<Configuration.AgentConfig>;

    /**
     * Optional name for this configuration.
     */
    display_name?: string;

    harness?: string;

    /**
     * Optional managed-secret name this configuration's third-party harness
     * authenticates with. Empty or omitted is valid for Oz. For a third-party harness
     * that requires auth, empty or omitted means from the worker environment on a
     * self-hosted host, or a launch violation on Warp-hosted.
     */
    harness_auth_secret_name?: string | null;

    model?: string;

    /**
     * Optional runner UID, constrained to the Factory's existing runner roster.
     * Omitted or empty uses the agent's or environment's default.
     */
    runner_id?: string | null;
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
}

export interface SuiteListResponse {
  /**
   * UID of the concrete Factory agent every task in this suite dispatches as. Must
   * resolve to a live, available agent linked to this Factory whose agent_type
   * equals factory_agent_type.
   */
  agent_uid: string;

  created_at: string;

  /**
   * Coarse Factory agent type of the selected agent_uid, kept in sync with it at
   * save time.
   */
  factory_agent_type: string;

  factory_uid: string;

  name: string;

  uid: string;

  updated_at: string;

  /**
   * File-authored launch defaults. Omitted on suites without persistent
   * configurations.
   */
  configurations?: Array<SuiteListResponse.Configuration>;

  /**
   * The suite's creator, when known. Absent when creator identity is unknown or no
   * longer retained.
   */
  creator?: AgentAPI.UserProfile;

  description?: string;
}

export namespace SuiteListResponse {
  export interface Configuration {
    /**
     * Optional per-named-Agent overrides keyed by stable Agent UID.
     */
    agent_configs?: Array<Configuration.AgentConfig>;

    /**
     * Optional name for this configuration.
     */
    display_name?: string;

    harness?: string;

    /**
     * Optional managed-secret name this configuration's third-party harness
     * authenticates with. Empty or omitted is valid for Oz. For a third-party harness
     * that requires auth, empty or omitted means from the worker environment on a
     * self-hosted host, or a launch violation on Warp-hosted.
     */
    harness_auth_secret_name?: string | null;

    model?: string;

    /**
     * Optional runner UID, constrained to the Factory's existing runner roster.
     * Omitted or empty uses the agent's or environment's default.
     */
    runner_id?: string | null;
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
}

export interface SuiteGetResponse {
  /**
   * UID of the concrete Factory agent every task in this suite dispatches as. Must
   * resolve to a live, available agent linked to this Factory whose agent_type
   * equals factory_agent_type.
   */
  agent_uid: string;

  created_at: string;

  /**
   * Coarse Factory agent type of the selected agent_uid, kept in sync with it at
   * save time.
   */
  factory_agent_type: string;

  factory_uid: string;

  name: string;

  /**
   * Stable UID-sorted list of live, non-system Factory agents transitively reachable
   * from this suite's selected root under the server's effective delegation policy.
   */
  spawnable_descendant_agent_uids: Array<string>;

  uid: string;

  updated_at: string;

  /**
   * File-authored launch defaults. Omitted on suites without persistent
   * configurations.
   */
  configurations?: Array<SuiteGetResponse.Configuration>;

  /**
   * The suite's creator, when known. Absent when creator identity is unknown or no
   * longer retained.
   */
  creator?: AgentAPI.UserProfile;

  description?: string;

  tasks?: Array<SuiteGetResponse.Task>;
}

export namespace SuiteGetResponse {
  export interface Configuration {
    /**
     * Optional per-named-Agent overrides keyed by stable Agent UID.
     */
    agent_configs?: Array<Configuration.AgentConfig>;

    /**
     * Optional name for this configuration.
     */
    display_name?: string;

    harness?: string;

    /**
     * Optional managed-secret name this configuration's third-party harness
     * authenticates with. Empty or omitted is valid for Oz. For a third-party harness
     * that requires auth, empty or omitted means from the worker environment on a
     * self-hosted host, or a launch violation on Warp-hosted.
     */
    harness_auth_secret_name?: string | null;

    model?: string;

    /**
     * Optional runner UID, constrained to the Factory's existing runner roster.
     * Omitted or empty uses the agent's or environment's default.
     */
    runner_id?: string | null;
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

  export interface Task {
    /**
     * @deprecated Deprecated internal storage identifier retained for compatibility.
     */
    id: number;

    prompt: string;

    /**
     * Plain-text criteria the built-in Correctness scorer grades each trial against,
     * as the authoritative requirements. The task prompt provides context only.
     */
    success_criteria: string;

    title: string;

    /**
     * Immutable public task identifier.
     */
    uid: string;

    labels?: { [key: string]: string };

    source_run_id?: string | null;

    starting_repo_refs?: Array<Task.StartingRepoRef>;

    tags?: Array<string>;
  }

  export namespace Task {
    /**
     * A repository location and optional starting ref for a suite task.
     */
    export interface StartingRepoRef {
      code_forge: string;

      owner: string;

      repo: string;

      ref?: string;
    }
  }
}

export interface SuiteLaunchRunResponse {
  /**
   * Lifecycle state of a benchmark run.
   */
  state: 'pending' | 'running' | 'scoring' | 'completed' | 'failed' | 'cancelled';

  uid: string;
}

export interface SuiteCreateParams {
  agent_uid: string;

  factory_agent_type: string;

  name: string;

  suite_uid: string;

  description?: string;

  tasks?: Array<SuiteCreateParams.Task>;
}

export namespace SuiteCreateParams {
  export interface Task {
    prompt: string;

    /**
     * Plain-text criteria the built-in Correctness scorer grades each trial against,
     * as the authoritative requirements. The task prompt provides context only.
     */
    success_criteria: string;

    title: string;

    labels?: { [key: string]: string };

    source_run_id?: string | null;

    starting_repo_refs?: Array<Task.StartingRepoRef>;

    tags?: Array<string>;

    /**
     * Existing task UID. Accepted only when editing its current suite.
     */
    uid?: string;
  }

  export namespace Task {
    /**
     * A repository location and optional starting ref for a suite task.
     */
    export interface StartingRepoRef {
      code_forge: string;

      owner: string;

      repo: string;

      ref?: string;
    }
  }
}

export interface SuiteListParams extends BenchmarkSuitesCursorPageParams {}

export interface SuiteGetParams {
  uid: string;
}

export interface SuiteLaunchRunParams {
  /**
   * Path param
   */
  uid: string;

  /**
   * Body param: Number of repetitions per (task, configuration) pair, frozen onto
   * the run. Like configurations and scorer_selection, this is chosen fresh at each
   * launch rather than persisted on the suite.
   */
  repetition_count: number;

  /**
   * Body param: Optional launch-time configurations. When omitted, the suite's
   * persistent configurations are used. An explicit empty list, or a suite with
   * neither launch-time nor persistent configurations, is rejected.
   */
  configurations?: Array<SuiteLaunchRunParams.Configuration>;

  /**
   * Body param: Internal provenance for a prior-run replay. The server accepts
   * historical agent entries only when they exactly match frozen entries from this
   * run and the run belongs to the same suite.
   */
  historical_replay_run_uid?: string;

  /**
   * Body param: Allowlist of live scorer IDs for this factory, applied to every
   * trial in the run. Empty or absent means all applicable scorers. IDs must belong
   * to the suite's factory and team (any status except deleted).
   */
  scorer_selection?: Array<number>;

  /**
   * Body param: Optional allowlist of immutable UIDs for current tasks in the
   * addressed suite. Omitted runs all current suite tasks. Explicit empty, invalid,
   * unknown, stale, cross-suite, and duplicate selections are rejected.
   */
  tasks?: Array<string>;
}

export namespace SuiteLaunchRunParams {
  export interface Configuration {
    /**
     * Optional per-named-Agent overrides keyed by stable Agent UID.
     */
    agent_configs?: Array<Configuration.AgentConfig>;

    /**
     * Optional name for this configuration.
     */
    display_name?: string;

    harness?: string;

    /**
     * Optional managed-secret name this configuration's third-party harness
     * authenticates with. Empty or omitted is valid for Oz. For a third-party harness
     * that requires auth, empty or omitted means from the worker environment on a
     * self-hosted host, or a launch violation on Warp-hosted.
     */
    harness_auth_secret_name?: string | null;

    model?: string;

    /**
     * Optional runner UID, constrained to the Factory's existing runner roster.
     * Omitted or empty uses the agent's or environment's default.
     */
    runner_id?: string | null;
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
}

export declare namespace Suites {
  export {
    type SuiteCreateResponse as SuiteCreateResponse,
    type SuiteListResponse as SuiteListResponse,
    type SuiteGetResponse as SuiteGetResponse,
    type SuiteLaunchRunResponse as SuiteLaunchRunResponse,
    type SuiteListResponsesBenchmarkSuitesCursorPage as SuiteListResponsesBenchmarkSuitesCursorPage,
    type SuiteCreateParams as SuiteCreateParams,
    type SuiteListParams as SuiteListParams,
    type SuiteGetParams as SuiteGetParams,
    type SuiteLaunchRunParams as SuiteLaunchRunParams,
  };
}
