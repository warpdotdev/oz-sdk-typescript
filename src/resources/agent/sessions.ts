// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Operations for running and managing cloud agents
 */
export class Sessions extends APIResource {
  /**
   * Check whether a shared session should redirect to a conversation transcript.
   * Returns a conversation_id if the agent sandbox has finished and conversation
   * data is available, or an empty object if no redirect is needed.
   *
   * This endpoint is public (no authentication required) so that anonymous viewers
   * can resolve a publicly-shared session link before signing in. Access to the
   * underlying conversation transcript is still gated by conversation link-sharing.
   *
   * @example
   * ```ts
   * const response = await client.agent.sessions.checkRedirect(
   *   'sessionUuid',
   * );
   * ```
   */
  checkRedirect(sessionUuid: string, options?: RequestOptions): APIPromise<SessionCheckRedirectResponse> {
    return this._client.get(path`/agent/sessions/${sessionUuid}/redirect`, { ...options, __security: {} });
  }
}

export interface SessionCheckRedirectResponse {
  /**
   * The conversation ID to redirect to (only present when redirect is needed)
   */
  conversation_id?: string;
}

export declare namespace Sessions {
  export { type SessionCheckRedirectResponse as SessionCheckRedirectResponse };
}
