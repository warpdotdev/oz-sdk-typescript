// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AgentAPI from './agent';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Operations for creating and managing scheduled agents
 */
export class Schedules extends APIResource {
  /**
   * Create a new scheduled agent that runs on a cron schedule. The agent will be
   * triggered automatically based on the cron expression.
   *
   * @example
   * ```ts
   * const scheduledAgentItem =
   *   await client.agent.schedules.create({
   *     cron_schedule: '0 9 * * *',
   *     name: 'Daily Code Review',
   *     enabled: true,
   *     prompt:
   *       'Review open pull requests and provide feedback',
   *   });
   * ```
   */
  create(params: ScheduleCreateParams, options?: RequestOptions): APIPromise<ScheduledAgentItem> {
    const { team_uid, ...body } = params;
    return this._client.post('/agent/schedules', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(team_uid != null ? { 'X-Warp-Team-Uid': team_uid } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Retrieve detailed information about a specific scheduled agent, including its
   * configuration, history, and next scheduled run time.
   *
   * @example
   * ```ts
   * const scheduledAgentItem =
   *   await client.agent.schedules.retrieve('scheduleId');
   * ```
   */
  retrieve(scheduleID: string, options?: RequestOptions): APIPromise<ScheduledAgentItem> {
    return this._client.get(path`/agent/schedules/${scheduleID}`, options);
  }

  /**
   * Update an existing scheduled agent's configuration. All fields except
   * agent_config are required.
   *
   * @example
   * ```ts
   * const scheduledAgentItem =
   *   await client.agent.schedules.update('scheduleId', {
   *     cron_schedule: 'cron_schedule',
   *     enabled: true,
   *     name: 'name',
   *   });
   * ```
   */
  update(
    scheduleID: string,
    body: ScheduleUpdateParams,
    options?: RequestOptions,
  ): APIPromise<ScheduledAgentItem> {
    return this._client.put(path`/agent/schedules/${scheduleID}`, { body, ...options });
  }

  /**
   * Retrieve all scheduled agents accessible to the authenticated user. Results are
   * sorted alphabetically by name.
   *
   * @example
   * ```ts
   * const schedules = await client.agent.schedules.list();
   * ```
   */
  list(
    params: ScheduleListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ScheduleListResponse> {
    const { team_uid } = params ?? {};
    return this._client.get('/agent/schedules', {
      ...options,
      headers: buildHeaders([
        { ...(team_uid != null ? { 'X-Warp-Team-Uid': team_uid } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Delete a scheduled agent. This will stop all future scheduled runs.
   *
   * @example
   * ```ts
   * const schedule = await client.agent.schedules.delete(
   *   'scheduleId',
   * );
   * ```
   */
  delete(scheduleID: string, options?: RequestOptions): APIPromise<ScheduleDeleteResponse> {
    return this._client.delete(path`/agent/schedules/${scheduleID}`, options);
  }

  /**
   * Pause a scheduled agent. The agent will not run until resumed.
   *
   * @example
   * ```ts
   * const scheduledAgentItem =
   *   await client.agent.schedules.pause('scheduleId');
   * ```
   */
  pause(scheduleID: string, options?: RequestOptions): APIPromise<ScheduledAgentItem> {
    return this._client.post(path`/agent/schedules/${scheduleID}/pause`, options);
  }

  /**
   * Resume a paused scheduled agent. The agent will start running according to its
   * cron schedule.
   *
   * @example
   * ```ts
   * const scheduledAgentItem =
   *   await client.agent.schedules.resume('scheduleId');
   * ```
   */
  resume(scheduleID: string, options?: RequestOptions): APIPromise<ScheduledAgentItem> {
    return this._client.post(path`/agent/schedules/${scheduleID}/resume`, options);
  }
}

/**
 * Scheduler-derived history metadata for a scheduled agent
 */
export interface ScheduledAgentHistoryItem {
  /**
   * Timestamp of the last successful run (RFC3339)
   */
  last_ran?: string | null;

  /**
   * Timestamp of the next scheduled run (RFC3339)
   */
  next_run?: string | null;
}

export interface ScheduledAgentItem {
  /**
   * Unique identifier for the scheduled agent
   */
  id: string;

  /**
   * Timestamp when the schedule was created (RFC3339)
   */
  created_at: string;

  /**
   * Cron expression defining when the agent runs (e.g., "0 9 \* \* \*" for daily at
   * 9am UTC)
   */
  cron_schedule: string;

  /**
   * Whether the schedule is currently active
   */
  enabled: boolean;

  /**
   * Human-readable name for the schedule
   */
  name: string;

  /**
   * The prompt/instruction for the agent to execute
   */
  prompt: string;

  /**
   * Timestamp when the schedule was last updated (RFC3339)
   */
  updated_at: string;

  /**
   * Configuration for a cloud agent run
   */
  agent_config?: AgentAPI.AgentConfigSnapshot;

  /**
   * UID of the agent that this schedule runs as
   */
  agent_uid?: string;

  created_by?: AgentAPI.UserProfile;

  /**
   * Configuration for a cloud environment used by scheduled agents
   */
  environment?: AgentAPI.EnvironmentConfig;

  /**
   * Scheduler-derived history metadata for a scheduled agent
   */
  history?: ScheduledAgentHistoryItem;

  /**
   * Error message from the last failed spawn attempt, if any
   */
  last_spawn_error?: string | null;

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
   * Ownership scope for a resource (team or personal)
   */
  scope?: AgentAPI.Scope;

  updated_by?: AgentAPI.UserProfile;
}

export interface ScheduleListResponse {
  /**
   * List of scheduled agents
   */
  schedules: Array<ScheduledAgentItem>;
}

export interface ScheduleDeleteResponse {
  /**
   * Whether the deletion was successful
   */
  success: boolean;
}

export interface ScheduleCreateParams {
  /**
   * Body param: Cron expression defining when the agent runs (e.g., "0 9 \* \* \*"
   * for daily at 9am UTC)
   */
  cron_schedule: string;

  /**
   * Body param: Human-readable name for the schedule
   */
  name: string;

  /**
   * Body param: Configuration for a cloud agent run
   */
  agent_config?: AgentAPI.AgentConfigSnapshot;

  /**
   * Body param: Agent UID to use as the execution principal for this schedule. Only
   * valid for team-owned schedules.
   */
  agent_uid?: string;

  /**
   * Body param: Whether the schedule should be active immediately
   */
  enabled?: boolean;

  /**
   * Body param: Custom key/value metadata attached to a run at creation time and
   * immutable afterward; at most 20 keys, with keys 1-64 bytes matching
   * [a-zA-Z0-9._-]+ (case-sensitive) and values 0-256 bytes of UTF-8 with no NUL
   * characters. Requests with invalid metadata are rejected. A run's effective
   * metadata is merged per key at creation: explicit request keys override keys
   * inherited from the parent run, which override automatic keys (ticket_id and
   * ticket_source on Linear- and Jira-triggered runs).
   */
  metadata?: { [key: string]: string };

  /**
   * Body param: Optional query mode applied to every triggered run. Defaults to
   * `normal` when omitted. The server does not infer mode from prompt prefixes such
   * as `/plan`.
   */
  mode?: 'normal' | 'plan' | 'orchestrate';

  /**
   * Body param: The prompt/instruction for the agent to execute. Required unless
   * agent_config.skill_spec or agent_config.skills is provided.
   */
  prompt?: string;

  /**
   * Body param: Whether to create a team-owned schedule. Defaults to true for users
   * on a single team.
   */
  team?: boolean;

  /**
   * Header param: UID of the team to use as the request's active team. Ignored for
   * service-account callers, which always act as their bound team.
   */
  team_uid?: string;
}

export interface ScheduleUpdateParams {
  /**
   * Cron expression defining when the agent runs
   */
  cron_schedule: string;

  /**
   * Whether the schedule should be active
   */
  enabled: boolean;

  /**
   * Human-readable name for the schedule
   */
  name: string;

  /**
   * Configuration for a cloud agent run
   */
  agent_config?: AgentAPI.AgentConfigSnapshot;

  /**
   * Agent UID to use as the execution principal for this schedule. Only valid for
   * team-owned schedules.
   */
  agent_uid?: string;

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
   * Optional query mode applied to every triggered run. Defaults to `normal` when
   * omitted. The server does not infer mode from prompt prefixes such as `/plan`.
   */
  mode?: 'normal' | 'plan' | 'orchestrate';

  /**
   * The prompt/instruction for the agent to execute. Required unless
   * agent_config.skill_spec or agent_config.skills is provided.
   */
  prompt?: string;
}

export interface ScheduleListParams {
  /**
   * UID of the team to use as the request's active team. Ignored for service-account
   * callers, which always act as their bound team.
   */
  team_uid?: string;
}

export declare namespace Schedules {
  export {
    type ScheduledAgentHistoryItem as ScheduledAgentHistoryItem,
    type ScheduledAgentItem as ScheduledAgentItem,
    type ScheduleListResponse as ScheduleListResponse,
    type ScheduleDeleteResponse as ScheduleDeleteResponse,
    type ScheduleCreateParams as ScheduleCreateParams,
    type ScheduleUpdateParams as ScheduleUpdateParams,
    type ScheduleListParams as ScheduleListParams,
  };
}
