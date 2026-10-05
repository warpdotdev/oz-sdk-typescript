// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as RunsAPI from './runs';
import {
  RunGetParams,
  RunGetResponse,
  RunGetResultsParams,
  RunGetResultsResponse,
  RunListParams,
  RunListResponse,
  RunListResponsesRunsCursorPage,
  Runs,
} from './runs';
import * as SuitesAPI from './suites';
import {
  SuiteCreateParams,
  SuiteCreateResponse,
  SuiteGetParams,
  SuiteGetResponse,
  SuiteLaunchRunParams,
  SuiteLaunchRunResponse,
  SuiteListParams,
  SuiteListResponse,
  SuiteListResponsesBenchmarkSuitesCursorPage,
  Suites,
} from './suites';

export class Benchmarks extends APIResource {
  suites: SuitesAPI.Suites = new SuitesAPI.Suites(this._client);
  runs: RunsAPI.Runs = new RunsAPI.Runs(this._client);
}

Benchmarks.Suites = Suites;
Benchmarks.Runs = Runs;

export declare namespace Benchmarks {
  export {
    Suites as Suites,
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

  export {
    Runs as Runs,
    type RunListResponse as RunListResponse,
    type RunGetResponse as RunGetResponse,
    type RunGetResultsResponse as RunGetResultsResponse,
    type RunListResponsesRunsCursorPage as RunListResponsesRunsCursorPage,
    type RunListParams as RunListParams,
    type RunGetParams as RunGetParams,
    type RunGetResultsParams as RunGetResultsParams,
  };
}
