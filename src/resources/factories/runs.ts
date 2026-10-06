// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as RunsAPI from '../agent/runs';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Operations for creating and managing factories
 */
export class Runs extends APIResource {
  /**
   * Dispatch a run to a factory, using prompt as the run's prompt and an optional
   * title, ticket_ref, and ticket_url. Returns the created run; its factory task is
   * created asynchronously and can be resolved afterwards with GET
   * /factory/{uid}/task-by-run.
   */
  create(uid: string, body: RunCreateParams, options?: RequestOptions): APIPromise<RunCreateResponse> {
    return this._client.post(path`/factory/${uid}/runs`, { body, ...options });
  }
}

/**
 * Response body for a dispatched factory run.
 */
export interface RunCreateResponse {
  /**
   * Public UID of the factory the run was dispatched to.
   */
  factory_uid: string;

  /**
   * Name of the factory's foreman agent that received the run.
   */
  foreman_agent: string;

  /**
   * Unique identifier for the dispatched run.
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
  state: RunsAPI.RunState;

  /**
   * The canonical <source>:<id> ticket reference the run was stamped with, either
   * the caller-supplied ticket_ref or a minted adhoc reference.
   */
  ticket_ref: string;

  /**
   * URL to view the dispatched run in the Factory app. Empty when the Factory app
   * origin is not configured.
   */
  run_url?: string;
}

export interface RunCreateParams {
  /**
   * The prompt sent to the factory's foreman, not wrapped in any factory intake
   * envelope. Required and non-empty.
   */
  prompt: string;

  /**
   * Originating ticket reference in <source>:<id> form (for example,
   * linear:REMOTE-123); omit to mint an adhoc reference. Stamped onto the run as
   * ticket_id/ticket_source metadata.
   */
  ticket_ref?: string;

  /**
   * Optional URL of the ticket named by ticket_ref. Stamped onto the run as
   * ticket_url metadata when given.
   */
  ticket_url?: string;

  /**
   * Human-readable title for the dispatched run and its factory task. Omit to derive
   * one automatically from the prompt.
   */
  title?: string;
}

export declare namespace Runs {
  export { type RunCreateResponse as RunCreateResponse, type RunCreateParams as RunCreateParams };
}
