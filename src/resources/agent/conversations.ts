// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as RunsAPI from './runs';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Operations for running and managing cloud agents
 */
export class Conversations extends APIResource {
  /**
   * Retrieve a conversation directly by conversation ID in Warp's normalized
   * task/message format.
   *
   * @example
   * ```ts
   * const conversation =
   *   await client.agent.conversations.retrieve(
   *     'conversation_id',
   *   );
   * ```
   */
  retrieve(conversationID: string, options?: RequestOptions): APIPromise<ConversationRetrieveResponse> {
    return this._client.get(path`/agent/conversations/${conversationID}`, options);
  }

  /**
   * Check whether a conversation should redirect to a live shared session, returning
   * a session_id if the underlying ambient agent task still has one (or an empty
   * object if no redirect is needed). Public and unauthenticated, so anonymous
   * viewers can resolve a shared conversation link before signing in; access to the
   * underlying live session is still gated by the session-sharing service ACLs.
   *
   * @example
   * ```ts
   * const response =
   *   await client.agent.conversations.checkRedirect(
   *     'conversationId',
   *   );
   * ```
   */
  checkRedirect(
    conversationID: string,
    options?: RequestOptions,
  ): APIPromise<ConversationCheckRedirectResponse> {
    return this._client.get(path`/agent/conversations/${conversationID}/redirect`, {
      ...options,
      __security: {},
    });
  }

  /**
   * Download a computer-use screenshot that was offloaded from the conversation's
   * task history into object storage. The response is a redirect to a short-lived
   * signed URL, so clients must follow redirects to receive the image. Requires view
   * access to the conversation named in the path; a fork's history may reference
   * screenshots stored under its source conversation's ID.
   *
   * @example
   * ```ts
   * const response =
   *   await client.agent.conversations.downloadScreenshot(
   *     'screenshot_uid',
   *     { conversation_id: 'conversation_id' },
   *   );
   *
   * const content = await response.blob();
   * console.log(content);
   * ```
   */
  downloadScreenshot(
    screenshotUid: string,
    params: ConversationDownloadScreenshotParams,
    options?: RequestOptions,
  ): APIPromise<Response> {
    const { conversation_id } = params;
    return this._client.get(
      path`/agent/conversations/${conversation_id}/screenshots/${screenshotUid}/download`,
      {
        ...options,
        headers: buildHeaders([{ Accept: 'application/octet-stream' }, options?.headers]),
        __binaryResponse: true,
      },
    );
  }

  /**
   * Retrieve the raw conversation transcript for a conversation. Returns a 302
   * redirect to a time-limited download URL for the transcript. Supported for
   * third-party harness conversations (Claude Code, Codex, Gemini).
   *
   * @example
   * ```ts
   * const response =
   *   await client.agent.conversations.getTranscript(
   *     'conversation_id',
   *   );
   *
   * const content = await response.blob();
   * console.log(content);
   * ```
   */
  getTranscript(conversationID: string, options?: RequestOptions): APIPromise<Response> {
    return this._client.get(path`/agent/conversations/${conversationID}/transcript`, {
      ...options,
      headers: buildHeaders([{ Accept: 'application/octet-stream' }, options?.headers]),
      __binaryResponse: true,
    });
  }

  /**
   * The same operation as `POST /agent/runs/{runId}/interrupt`, addressed by the
   * conversation the run is serving. The run is picked with the same policy as the
   * conversation follow-up route, and the caller must be able to view the
   * conversation and the resolved run.
   *
   * @example
   * ```ts
   * const response = await client.agent.conversations.interrupt(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  interrupt(conversationID: string, options?: RequestOptions): APIPromise<ConversationInterruptResponse> {
    return this._client.post(path`/agent/conversations/${conversationID}/interrupt`, options);
  }

  /**
   * The same operation as `POST /agent/runs/{runId}/followups`, targeted by the
   * conversation the run is serving rather than the run itself.
   *
   * `attachments` must name ids prepared through
   * `POST /agent/conversations/{conversation_id}/attachments/prepare` (or the
   * run-keyed prepare) for the run that is newest at that time. If a new run appears
   * for the conversation between prepare and follow-up, the follow-up resolves to
   * the new run and answers 422 `unknown_attachment`; prepare again. A handoff is a
   * new execution of the same run and does not have this problem.
   *
   * `mode` only takes effect when the follow-up is queued ahead of the run starting
   * or starts a new execution; a follow-up injected into a live session runs in the
   * session's current mode.
   *
   * @example
   * ```ts
   * const response =
   *   await client.agent.conversations.submitFollowup(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   );
   * ```
   */
  submitFollowup(
    conversationID: string,
    body: ConversationSubmitFollowupParams,
    options?: RequestOptions,
  ): APIPromise<ConversationSubmitFollowupResponse> {
    return this._client.post(path`/agent/conversations/${conversationID}/followups`, { body, ...options });
  }
}

export interface ConversationRetrieveResponse {
  /**
   * Unique identifier for the conversation
   */
  conversation_id: string;

  /**
   * Root steps in the conversation
   */
  steps: Array<RunsAPI.ConversationStep>;
}

export interface ConversationCheckRedirectResponse {
  /**
   * The shared session UUID to redirect to (only present when redirect is needed)
   */
  session_id?: string;
}

/**
 * Acknowledgement of an interrupt accepted through a conversation-keyed route.
 */
export interface ConversationInterruptResponse {
  /**
   * The run whose turn is being interrupted.
   */
  run_id: string;
}

/**
 * Acknowledgement of a follow-up accepted through a conversation-keyed route: the
 * run-keyed acknowledgement plus the run it was delivered to.
 */
export interface ConversationSubmitFollowupResponse {
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

  /**
   * The run the conversation resolved to.
   */
  run_id: string;
}

export interface ConversationDownloadScreenshotParams {
  /**
   * The unique identifier of the conversation that owns the screenshot
   */
  conversation_id: string;
}

export interface ConversationSubmitFollowupParams {
  /**
   * Files to deliver with the message, at most 25. Each entry must name an
   * attachment previously prepared for this run through
   * `POST /agent/runs/{runId}/attachments/prepare` and uploaded to its upload
   * target; an unknown `attachment_id` is rejected with 422. Files are only
   * materialized for the agent on the Oz harness; other harnesses receive a notice
   * naming the files.
   */
  attachments?: Array<ConversationSubmitFollowupParams.Attachment>;

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

export namespace ConversationSubmitFollowupParams {
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

export declare namespace Conversations {
  export {
    type ConversationRetrieveResponse as ConversationRetrieveResponse,
    type ConversationCheckRedirectResponse as ConversationCheckRedirectResponse,
    type ConversationInterruptResponse as ConversationInterruptResponse,
    type ConversationSubmitFollowupResponse as ConversationSubmitFollowupResponse,
    type ConversationDownloadScreenshotParams as ConversationDownloadScreenshotParams,
    type ConversationSubmitFollowupParams as ConversationSubmitFollowupParams,
  };
}
