// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AgentAPI from '../agent/agent';
import * as RunsAPI from './runs';
import { RunCreateParams, RunCreateResponse, Runs } from './runs';
import * as TasksAPI from './tasks';
import {
  Task,
  TaskCancelParams,
  TaskCreateParams,
  TaskDeleteParams,
  TaskGetByConversationParams,
  TaskGetByRunParams,
  TaskGetParams,
  TaskListParams,
  TaskUpdateParams,
  Tasks,
  TasksFactoryTasksCursorPage,
} from './tasks';
import * as FilesAPI from './files/files';
import { FileValidateParams, FileValidateResponse, Files } from './files/files';
import { APIPromise } from '../../core/api-promise';
import { FactoriesCursorPage, type FactoriesCursorPageParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Operations for creating and managing factories
 */
export class Factories extends APIResource {
  runs: RunsAPI.Runs = new RunsAPI.Runs(this._client);
  tasks: TasksAPI.Tasks = new TasksAPI.Tasks(this._client);
  files: FilesAPI.Files = new FilesAPI.Files(this._client);

  /**
   * List factories accessible to the authenticated principal, restricted to the
   * request's active team when one is set. An optional team_uid query parameter
   * overrides the active team and restricts results to a single team, and an
   * optional search query parameter filters by a case-insensitive substring match on
   * the factory name or alias.
   */
  list(
    params: FactoryListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<FactoriesFactoriesCursorPage, Factory> {
    const { team_uid, ...query } = params ?? {};
    return this._client.getAPIList('/factory', FactoriesCursorPage<Factory>, {
      query,
      ...options,
      headers: buildHeaders([
        { ...(team_uid != null ? { 'X-Warp-Team-Uid': team_uid } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Get a factory by its UID.
   */
  get(uid: string, options?: RequestOptions): APIPromise<Factory> {
    return this._client.get(path`/factory/${uid}`, options);
  }
}

export type FactoriesFactoriesCursorPage = FactoriesCursorPage<Factory>;

/**
 * Public representation of a factory.
 */
export interface Factory {
  /**
   * Default execution settings inherited by the factory's named agents when they
   * declare no override of their own.
   */
  agent_defaults: Factory.AgentDefaults;

  /**
   * Optional display handle for the factory, unique across the team's Warp workspace
   * when set.
   */
  alias: string | null;

  /**
   * Short-lived signed URL for displaying the factory's avatar. The URL may change
   * between reads.
   */
  avatar_url: string | null;

  /**
   * Primary source-control provider for the factory. GITHUB and GITLAB identify the
   * compatibility primary when repositories span one or more forges. AZURE_DEVOPS
   * identifies Azure Repos. NONE declares a repo-less factory with no native
   * repositories; its environment relies on setup_commands to clone from any host.
   */
  code_forge: 'GITHUB' | 'GITLAB' | 'AZURE_DEVOPS' | 'NONE';

  /**
   * Effective source-control providers for the factory. When the effective set is
   * empty, this contains the primary code_forge.
   */
  code_forges: Array<'GITHUB' | 'GITLAB' | 'AZURE_DEVOPS' | 'NONE'>;

  /**
   * Time the factory was created.
   */
  created_at: string;

  /**
   * Default credential strategy for runs executed by the factory's named agents.
   *
   * - EXECUTOR (default): runs authenticate with the named agent's own credentials
   *   (e.g. a GitHub App installation token for the factory's team).
   * - CREATOR: runs authenticate with the credentials of the principal that created
   *   the run.
   */
  credential_strategy: 'CREATOR' | 'EXECUTOR';

  /**
   * Public UID of the factory's default environment. File-managed factories may omit
   * this default.
   */
  default_environment: string | null;

  /**
   * The default model ID for the factory's runs. File-managed factories may omit
   * this default. Live-managed create and PATCH requests still capture a concrete
   * validated model ID.
   */
  default_model: string | null;

  /**
   * Optional description of the factory.
   */
  description: string | null;

  /**
   * Integration providers attached to the factory, independent of the automation
   * triggers configured for it. null means the factory has not declared anything
   * yet; an empty array means no providers are attached.
   */
  integrations: Array<Factory.Integration> | null;

  /**
   * Display name of the factory.
   */
  name: string;

  /**
   * Repositories scoped to the factory, independent of its default environment.
   */
  repositories: Array<Factory.Repository>;

  /**
   * Sparse execution defaults for scorers. An omitted field inherits the
   * corresponding agent default; an explicit empty collection overrides the agent
   * default with no values.
   */
  scorer_defaults: Factory.ScorerDefaults;

  scoring: Factory.Scoring;

  /**
   * Public UID of the team that owns the factory.
   */
  team_uid: string;

  /**
   * Public UID of the factory.
   */
  uid: string;

  /**
   * Time the factory was last updated.
   */
  updated_at: string;

  /**
   * The user who created a factory, when resolvable.
   */
  creator?: Factory.Creator;

  /**
   * Self-improvement settings from GitHub-managed Factory YAML. Omitted when none
   * are declared, in which case team admins are the reviewer pool.
   */
  self_improvement?: Factory.SelfImprovement;
}

export namespace Factory {
  /**
   * Default execution settings inherited by the factory's named agents when they
   * declare no override of their own.
   */
  export interface AgentDefaults {
    /**
     * Default runner UID for the factory's named agents. Empty when unset, in which
     * case the environment's default runner applies.
     */
    default_runner_uid: string;

    /**
     * MCP server configurations attached to the factory's named agents by default.
     * Only warp_id (managed MCP) entries are representable for a Warp-managed factory.
     */
    mcp_servers: { [key: string]: AgentAPI.McpServerConfig };

    /**
     * Secrets attached to the factory's named agents by default.
     */
    secrets: Array<AgentAPI.SecretRef>;

    /**
     * Default worker host for the factory's named agents. Empty when unset, in which
     * case the workspace default applies.
     */
    worker_host: string;

    /**
     * Specifies which execution harness to use for the agent run. Default (nil/empty)
     * uses Warp's built-in harness. When stored as a named agent's default
     * (create/update agent identity), this field replaces the deprecated
     * base_harness/base_model pair: a harness other than `oz` here requires the
     * agent's base_model to be empty, since the two describe mutually exclusive
     * default models.
     */
    harness?: AgentAPI.Harness;

    /**
     * Authentication secrets for third-party harnesses. Only the secret for the
     * harness specified gets injected into the environment.
     */
    harness_auth_secrets?: AgentAPI.HarnessAuthSecrets;
  }

  /**
   * An integration provider attached to a factory.
   */
  export interface Integration {
    /**
     * Integration provider that can be attached to a factory. github is not accepted
     * here; repository access comes from the factory's code forge.
     */
    type: 'jira' | 'linear' | 'microsoft-teams' | 'slack';

    /**
     * Jira project keys from earlier integration selections, when present. Issue
     * discovery follows enabled agent-session automations instead.
     */
    jira?: Integration.Jira | null;

    /**
     * Linear team IDs from earlier integration selections, when present. Issue
     * discovery follows enabled agent-session automations instead.
     */
    linear?: Integration.Linear | null;

    /**
     * Plain channel-thread reply settings. These apply when the shared per-Factory
     * reply-setting rollout is enabled.
     */
    'microsoft-teams'?: Integration.MicrosoftTeams | null;

    /**
     * Plain channel-thread reply settings. These apply when the shared per-Factory
     * reply-setting rollout is enabled.
     */
    slack?: Integration.Slack | null;
  }

  export namespace Integration {
    /**
     * Jira project keys from earlier integration selections, when present. Issue
     * discovery follows enabled agent-session automations instead.
     */
    export interface Jira {
      /**
       * Jira project keys (for example APP, not the numeric project ID) for the one-time
       * agent-session automation seed. Discovery follows enabled seated automation
       * filters afterward.
       */
      project_keys: Array<string>;
    }

    /**
     * Linear team IDs from earlier integration selections, when present. Issue
     * discovery follows enabled agent-session automations instead.
     */
    export interface Linear {
      /**
       * Linear team IDs for the one-time agent-session automation seed. Discovery
       * follows enabled seated automation filters afterward.
       */
      team_ids: Array<string>;
    }

    /**
     * Plain channel-thread reply settings. These apply when the shared per-Factory
     * reply-setting rollout is enabled.
     */
    export interface MicrosoftTeams {
      /**
       * When true, eligible plain channel thread replies still reach the reply-intent
       * classifier. When false, those replies are ignored unless they @-mention the
       * Factory. Each provider defines the omitted default. Direct messages are
       * unchanged.
       */
      auto_respond_to_thread_replies?: boolean | null;
    }

    /**
     * Plain channel-thread reply settings. These apply when the shared per-Factory
     * reply-setting rollout is enabled.
     */
    export interface Slack {
      /**
       * When true, eligible plain channel thread replies still reach the reply-intent
       * classifier. When false, those replies are ignored unless they @-mention the
       * Factory. Each provider defines the omitted default. Direct messages are
       * unchanged.
       */
      auto_respond_to_thread_replies?: boolean | null;
    }
  }

  /**
   * A repository scoped to a factory.
   */
  export interface Repository {
    /**
     * Repository owner (or full namespace for GitLab).
     */
    owner: string;

    /**
     * Repository name.
     */
    repo: string;

    /**
     * The concrete source-control provider hosting a repository.
     */
    code_forge?: 'GITHUB' | 'GITLAB' | 'AZURE_DEVOPS';

    /**
     * Provider-specific repository identity and settings, such as the Azure DevOps
     * organization, project ID, and repository ID.
     */
    provider_metadata?: { [key: string]: string };
  }

  /**
   * Sparse execution defaults for scorers. An omitted field inherits the
   * corresponding agent default; an explicit empty collection overrides the agent
   * default with no values.
   */
  export interface ScorerDefaults {
    /**
     * Default runner UID for scorers. Omitted to inherit the agent default.
     */
    default_runner_uid?: string;

    /**
     * Scorer-default MCP servers. Omitted to inherit the agent defaults; an empty
     * object explicitly clears them.
     */
    mcp_servers?: { [key: string]: AgentAPI.McpServerConfig };

    /**
     * Scorer-default secrets. Omitted to inherit the agent defaults; an empty array
     * explicitly clears them.
     */
    secrets?: Array<AgentAPI.SecretRef>;
  }

  export interface Scoring {
    /**
     * Optional factory override for the model used by managed scorers and
     * scorer-creation prefills. null or absent resolves to the platform judge default.
     * User-created scorers still require an explicit model_id on create.
     */
    default_model: string | null;
  }

  /**
   * The user who created a factory, when resolvable.
   */
  export interface Creator {
    /**
     * Firebase UID of the user who created the factory.
     */
    uid: string;

    /**
     * Creator's email, when available.
     */
    email?: string | null;
  }

  /**
   * Self-improvement settings from GitHub-managed Factory YAML. Omitted when none
   * are declared, in which case team admins are the reviewer pool.
   */
  export interface SelfImprovement {
    /**
     * Owning-team pool one eligible reviewer is randomly requested from for
     * self-improvement pull requests. `admins` requests a team admin or owner and is
     * the default when the Factory declares no self-improvement settings. `team`
     * requests any team member. `custom` requests a member listed in
     * `reviewer_emails`. `none` explicitly disables reviewer assignment.
     */
    reviewer_type: 'none' | 'admins' | 'team' | 'custom';

    /**
     * Per-agent count of distinct scored-failing source runs required for scheduled
     * self-improvement. Must be between 1 and 50: one self-improvement run can triage
     * at most 50 failure findings. Omitted to use the server default. The age-based
     * flush and manual dispatch are unchanged.
     */
    failed_run_threshold?: number;

    /**
     * Owning-team member emails reviewers are chosen from. Only allowed when
     * `reviewer_type` is `custom`: a Factory YAML change that sets emails with any
     * other reviewer type fails validation, including the pull request check.
     */
    reviewer_emails?: Array<string>;
  }
}

export interface FactoryListParams extends FactoriesCursorPageParams {
  /**
   * Query param: Case-insensitive substring search over the factory name and alias.
   */
  search?: string;

  /**
   * Query param: Optional team UID to filter factories by ownership. Takes
   * precedence over the X-Warp-Team-Uid header.
   */
  filter_team_uid?: string;

  /**
   * Header param: UID of the team to use as the request's active team. Ignored for
   * service-account callers, which always act as their bound team.
   */
  team_uid?: string;
}

Factories.Runs = Runs;
Factories.Tasks = Tasks;
Factories.Files = Files;

export declare namespace Factories {
  export {
    type Factory as Factory,
    type FactoriesFactoriesCursorPage as FactoriesFactoriesCursorPage,
    type FactoryListParams as FactoryListParams,
  };

  export {
    Runs as Runs,
    type RunCreateResponse as RunCreateResponse,
    type RunCreateParams as RunCreateParams,
  };

  export {
    Tasks as Tasks,
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

  export {
    Files as Files,
    type FileValidateResponse as FileValidateResponse,
    type FileValidateParams as FileValidateParams,
  };
}
