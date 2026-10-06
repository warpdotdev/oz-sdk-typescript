// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AgentAPI from '../agent/agent';
import * as RunsAPI from '../agent/runs';
import { APIPromise } from '../../core/api-promise';
import {
  FactoryTasksCursorPage,
  type FactoryTasksCursorPageParams,
  PagePromise,
} from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Operations for creating and managing factories
 */
export class Tasks extends APIResource {
  /**
   * Create a task in a factory, bound to an existing agent conversation. title and
   * conversation_id are required. The stage defaults to TRIAGE. The conversation's
   * most recent run must be owned by the factory's team, and a conversation may be
   * bound to at most one live task across all factories.
   */
  create(uid: string, body: TaskCreateParams, options?: RequestOptions): APIPromise<Task> {
    return this._client.post(path`/factory/${uid}/tasks`, { body, ...options });
  }

  /**
   * Partially update a task's title, description, and/or stage. Last write wins.
   * Stage writes are unrestricted: any stage-to-stage transition is allowed,
   * including moving backwards or to completion.
   */
  update(taskUid: string, params: TaskUpdateParams, options?: RequestOptions): APIPromise<Task> {
    const { uid, ...body } = params;
    return this._client.patch(path`/factory/${uid}/tasks/${taskUid}`, { body, ...options });
  }

  /**
   * List the factory's tasks with optional filtering and search. List responses are
   * lean by default; set full_list=true to include canonical ticket metadata and
   * derived outputs for the returned page.
   */
  list(
    uid: string,
    query: TaskListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<TasksFactoryTasksCursorPage, Task> {
    return this._client.getAPIList(path`/factory/${uid}/tasks`, FactoryTasksCursorPage<Task>, {
      query,
      ...options,
    });
  }

  /**
   * Soft-delete a task. The task disappears from list and get responses immediately,
   * and its conversation may be bound to a new task. Deleting a task never deletes
   * artifacts or the conversation.
   */
  delete(taskUid: string, params: TaskDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { uid } = params;
    return this._client.delete(path`/factory/${uid}/tasks/${taskUid}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Cancel the task's current top-level run and move the task to CANCELLED. Every
   * non-terminal descendant of the root run is cancelled as well.
   */
  cancel(taskUid: string, params: TaskCancelParams, options?: RequestOptions): APIPromise<Task> {
    const { uid } = params;
    return this._client.post(path`/factory/${uid}/tasks/${taskUid}/cancel`, options);
  }

  /**
   * Get a task with its derived outputs, newest-first.
   */
  get(taskUid: string, params: TaskGetParams, options?: RequestOptions): APIPromise<Task> {
    const { uid } = params;
    return this._client.get(path`/factory/${uid}/tasks/${taskUid}`, options);
  }

  /**
   * Get the factory task bound to an agent conversation. Conversation bindings are
   * unique across factories, but the lookup is factory-scoped: a task owned by a
   * different factory is 404.
   */
  getByConversation(
    uid: string,
    query: TaskGetByConversationParams,
    options?: RequestOptions,
  ): APIPromise<Task> {
    return this._client.get(path`/factory/${uid}/task-by-conversation`, { query, ...options });
  }

  /**
   * Get the factory task that owns a run: the task bound to the conversation of the
   * run's root ancestor. The lookup is factory-scoped: a task owned by a different
   * factory is 404.
   */
  getByRun(uid: string, query: TaskGetByRunParams, options?: RequestOptions): APIPromise<Task> {
    return this._client.get(path`/factory/${uid}/task-by-run`, { query, ...options });
  }
}

export type TasksFactoryTasksCursorPage = FactoryTasksCursorPage<Task>;

/**
 * A factory task: the unit of work in a factory, bound to the agent conversation
 * that owns it.
 */
export interface Task {
  /**
   * UUID of the agent conversation the task is bound to.
   */
  conversation_id: string;

  /**
   * Time the task was created.
   */
  created_at: string;

  /**
   * Public UID of the factory the task belongs to. Fixed at creation.
   */
  factory_uid: string;

  /**
   * ID of the bound conversation's most recent run at task creation. This is a
   * provenance snapshot and is not updated afterward; consumers needing the
   * conversation's live latest run should resolve it via the conversation.
   */
  run_id: string;

  /**
   * Lifecycle stage of a factory task, mirroring the seeded factory agent roles plus
   * the terminal COMPLETE and CANCELLED states. COMPLETE and CANCELLED are terminal
   * in intent but not enforced: any stage may be written explicitly at any time.
   * CANCELLED is set automatically when the task's current top-level run is
   * cancelled, regardless of that run's agent type.
   */
  stage: 'TRIAGE' | 'SPEC' | 'IMPLEMENT' | 'REVIEW' | 'COMPLETE' | 'CANCELLED';

  /**
   * Human-readable title of the task.
   */
  title: string;

  /**
   * Public UID of the task.
   */
  uid: string;

  /**
   * Time the task was last created, updated, or deleted. Artifact reporting does not
   * bump this; new outputs appear on the next detail read.
   */
  updated_at: string;

  /**
   * Creator of the run captured by run_id. Omitted when the creation run or its
   * creator principal can no longer be resolved.
   */
  author?: AgentAPI.UserProfile;

  /**
   * A factory task's current top-level run, resolved from the bound conversation at
   * read time. This differs from FactoryTask.run_id, which is a creation-time
   * provenance snapshot and is never updated.
   */
  current_run?: Task.CurrentRun;

  /**
   * Optional description of the task.
   */
  description?: string | null;

  /**
   * Derived outputs, newest-first: PULL_REQUEST, EXTERNAL_REFERENCE, SCREENSHOT, and
   * FILE artifacts (video recordings are FILE artifacts). Present on single-task
   * reads (by uid, by conversation, and by run), where outputs are derived from the
   * task's whole run tree (every run bound to the conversation plus the runs
   * dispatched under them). On list responses with full_list=true, outputs are
   * derived from the bound conversation only, not the wider run tree.
   */
  outputs?: Array<RunsAPI.ArtifactItem>;

  /**
   * Canonical ticket ID from the bound run. Present on list responses only when
   * full_list=true and ticket metadata exists.
   */
  ticket_id?: string;

  /**
   * Canonical ticket source from the bound run. Present on list responses only when
   * full_list=true and ticket metadata exists.
   */
  ticket_source?: string;
}

export namespace Task {
  /**
   * A factory task's current top-level run, resolved from the bound conversation at
   * read time. This differs from FactoryTask.run_id, which is a creation-time
   * provenance snapshot and is never updated.
   */
  export interface CurrentRun {
    /**
     * Whether the current run's type is eligible for cancellation via the API.
     * State-independent; clients should also gate on state.
     */
    is_run_type_cancellable: boolean;

    /**
     * ID of the task's current top-level (root) run.
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
  }
}

export interface TaskCreateParams {
  /**
   * UUID of the agent conversation to bind the task to. The conversation's most
   * recent run must be owned by the factory's team, and the conversation must not
   * already be bound to a live task.
   */
  conversation_id: string;

  /**
   * Human-readable title of the task. Required and non-empty.
   */
  title: string;

  /**
   * Optional description of the task.
   */
  description?: string | null;

  /**
   * Lifecycle stage of a factory task, mirroring the seeded factory agent roles plus
   * the terminal COMPLETE and CANCELLED states. COMPLETE and CANCELLED are terminal
   * in intent but not enforced: any stage may be written explicitly at any time.
   * CANCELLED is set automatically when the task's current top-level run is
   * cancelled, regardless of that run's agent type.
   */
  stage?: 'TRIAGE' | 'SPEC' | 'IMPLEMENT' | 'REVIEW' | 'COMPLETE' | 'CANCELLED';
}

export interface TaskUpdateParams {
  /**
   * Path param: The public UID of the factory.
   */
  uid: string;

  /**
   * Body param: Updated description. null or an empty string clears the description.
   */
  description?: string | null;

  /**
   * Body param: Lifecycle stage of a factory task, mirroring the seeded factory
   * agent roles plus the terminal COMPLETE and CANCELLED states. COMPLETE and
   * CANCELLED are terminal in intent but not enforced: any stage may be written
   * explicitly at any time. CANCELLED is set automatically when the task's current
   * top-level run is cancelled, regardless of that run's agent type.
   */
  stage?: 'TRIAGE' | 'SPEC' | 'IMPLEMENT' | 'REVIEW' | 'COMPLETE' | 'CANCELLED';

  /**
   * Body param: Updated title. Must be non-empty when provided.
   */
  title?: string;
}

export interface TaskListParams extends FactoryTasksCursorPageParams {
  /**
   * Filter to tasks created after this timestamp (RFC3339 format).
   */
  created_after?: string;

  /**
   * Filter to tasks created before this timestamp (RFC3339 format).
   */
  created_before?: string;

  /**
   * Filter to tasks whose seed run was started by any of these teammates, each given
   * as their email address. Can be specified multiple times to match any of the
   * given teammates.
   */
  created_by?: Array<string>;

  /**
   * Include canonical ticket_source and ticket_id metadata from each task's bound
   * run, plus its derived outputs. Defaults to false.
   */
  full_list?: boolean;

  /**
   * Include each task's current top-level run, resolved in one batch for the
   * returned page. Defaults to false.
   */
  include_current_run?: boolean;

  /**
   * Case-insensitive substring search over the task title.
   */
  q?: string;

  /**
   * Sort field for results.
   */
  sort_by?: 'created_at' | 'updated_at';

  /**
   * Sort direction.
   */
  sort_order?: 'asc' | 'desc';

  /**
   * Filter by task stage. Can be specified multiple times to match any of the given
   * stages.
   */
  stage?: Array<'TRIAGE' | 'SPEC' | 'IMPLEMENT' | 'REVIEW' | 'COMPLETE' | 'CANCELLED'>;

  /**
   * Filter to tasks updated after this timestamp (RFC3339 format).
   */
  updated_after?: string;
}

export interface TaskDeleteParams {
  /**
   * The public UID of the factory.
   */
  uid: string;
}

export interface TaskCancelParams {
  /**
   * The public UID of the factory.
   */
  uid: string;
}

export interface TaskGetParams {
  /**
   * The public UID of the factory.
   */
  uid: string;
}

export interface TaskGetByConversationParams {
  /**
   * The agent conversation ID the task is bound to.
   */
  conversation_id: string;
}

export interface TaskGetByRunParams {
  /**
   * Any run ID in the task's run tree.
   */
  run_id: string;
}

export declare namespace Tasks {
  export {
    type Task as Task,
    type TasksFactoryTasksCursorPage as TasksFactoryTasksCursorPage,
    type TaskCreateParams as TaskCreateParams,
    type TaskUpdateParams as TaskUpdateParams,
    type TaskListParams as TaskListParams,
    type TaskDeleteParams as TaskDeleteParams,
    type TaskCancelParams as TaskCancelParams,
    type TaskGetParams as TaskGetParams,
    type TaskGetByConversationParams as TaskGetByConversationParams,
    type TaskGetByRunParams as TaskGetByRunParams,
  };
}
