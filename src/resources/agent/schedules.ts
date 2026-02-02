// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AgentAPI from './agent';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

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
   *     prompt:
   *       'Review open pull requests and provide feedback',
   *     enabled: true,
   *   });
   * ```
   */
  create(body: ScheduleCreateParams, options?: RequestOptions): APIPromise<ScheduledAgentItem> {
    return this._client.post('/agent/schedules', { body, ...options });
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
   *     prompt: 'prompt',
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
  list(options?: RequestOptions): APIPromise<ScheduleListResponse> {
    return this._client.get('/agent/schedules', options);
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
   * Pause a scheduled agent. The agent will not run until resumed. This sets the
   * enabled flag to false.
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
   * cron schedule. This sets the enabled flag to true.
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
   * Configuration for an ambient agent run
   */
  agent_config?: AgentAPI.AmbientAgentConfig;

  created_by?: AgentAPI.RunCreatorInfo;

  /**
   * Configuration for a cloud environment used by scheduled agents
   */
  environment?: AgentAPI.CloudEnvironmentConfig;

  /**
   * Scheduler-derived history metadata for a scheduled agent
   */
  history?: ScheduledAgentItem.History;

  /**
   * Error message from the last failed spawn attempt, if any
   */
  last_spawn_error?: string | null;

  updated_by?: AgentAPI.RunCreatorInfo;
}

export namespace ScheduledAgentItem {
  /**
   * Scheduler-derived history metadata for a scheduled agent
   */
  export interface History {
    /**
     * Timestamp of the last successful run (RFC3339)
     */
    last_ran?: string | null;

    /**
     * Timestamp of the next scheduled run (RFC3339)
     */
    next_run?: string | null;
  }
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
   * Cron expression defining when the agent runs (e.g., "0 9 \* \* \*" for daily at
   * 9am UTC)
   */
  cron_schedule: string;

  /**
   * Human-readable name for the schedule
   */
  name: string;

  /**
   * The prompt/instruction for the agent to execute
   */
  prompt: string;

  /**
   * Configuration for an ambient agent run
   */
  agent_config?: AgentAPI.AmbientAgentConfig;

  /**
   * Whether the schedule should be active immediately
   */
  enabled?: boolean;

  /**
   * Whether to create a team-owned schedule. Defaults to true for users on a single
   * team.
   */
  team?: boolean;
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
   * The prompt/instruction for the agent to execute
   */
  prompt: string;

  /**
   * Configuration for an ambient agent run
   */
  agent_config?: AgentAPI.AmbientAgentConfig;
}

export declare namespace Schedules {
  export {
    type ScheduledAgentItem as ScheduledAgentItem,
    type ScheduleListResponse as ScheduleListResponse,
    type ScheduleDeleteResponse as ScheduleDeleteResponse,
    type ScheduleCreateParams as ScheduleCreateParams,
    type ScheduleUpdateParams as ScheduleUpdateParams,
  };
}
