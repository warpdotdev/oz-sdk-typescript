// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AgentAPI from './agent';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Operations for running and managing cloud agents
 */
export class Agent extends APIResource {
  /**
   * Create a new agent in the caller's active team. Agents act autonomously with
   * their own permissions, configuration, and identity.
   *
   * @example
   * ```ts
   * const agentResponse = await client.agent.agent.create({
   *   name: 'name',
   * });
   * ```
   */
  create(params: AgentCreateParams, options?: RequestOptions): APIPromise<AgentResponse> {
    const { team_uid, ...body } = params;
    return this._client.post('/agent/identities', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(team_uid != null ? { 'X-Warp-Team-Uid': team_uid } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Update an existing agent.
   *
   * @example
   * ```ts
   * const agentResponse = await client.agent.agent.update(
   *   'uid',
   * );
   * ```
   */
  update(uid: string, body: AgentUpdateParams, options?: RequestOptions): APIPromise<AgentResponse> {
    return this._client.put(path`/agent/identities/${uid}`, { body, ...options });
  }

  /**
   * List all agents on the caller's team.
   *
   * @example
   * ```ts
   * const listAgentIdentitiesResponse =
   *   await client.agent.agent.list();
   * ```
   */
  list(
    params: AgentListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ListAgentIdentitiesResponse> {
    const { team_uid, ...query } = params ?? {};
    return this._client.get('/agent/identities', {
      query,
      ...options,
      headers: buildHeaders([
        { ...(team_uid != null ? { 'X-Warp-Team-Uid': team_uid } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Delete an agent. All API keys associated with the agent are deleted atomically.
   *
   * @example
   * ```ts
   * await client.agent.agent.delete('uid');
   * ```
   */
  delete(uid: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/agent/identities/${uid}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Retrieve a single agent by its unique identifier.
   *
   * @example
   * ```ts
   * const agentResponse = await client.agent.agent.get('uid');
   * ```
   */
  get(uid: string, options?: RequestOptions): APIPromise<AgentResponse> {
    return this._client.get(path`/agent/identities/${uid}`, options);
  }
}

export interface AgentResponse {
  /**
   * Whether the agent is currently enabled. Defaults to true.
   */
  available: boolean;

  /**
   * When the agent was created (RFC3339)
   */
  created_at: string;

  /**
   * Default runner UID for runs executed by this agent; when set, it overrides the
   * selected environment's default runner for runs that do not specify their own
   * `runner_id`. The precedence order for runner resolution is:
   *
   * 1. The runner specified on the run itself
   * 2. The agent's default runner
   * 3. The selected environment's default runner
   * 4. The environment's legacy inline compute fields
   * 5. System defaults
   */
  default_runner_uid: string;

  /**
   * Memory settings for an agent.
   */
  memory: MemoryResponse;

  /**
   * Name of the agent
   */
  name: string;

  /**
   * Secrets that this agent may access by default.
   */
  secrets: Array<AgentAPI.SecretRef>;

  /**
   * Ordered list of normalized skill specs associated with this agent. Always
   * present; empty when no skills are attached.
   */
  skills: Array<string>;

  /**
   * Unique identifier for the agent
   */
  uid: string;

  /**
   * When the agent was last updated (RFC3339)
   */
  updated_at: string;

  /**
   * The well-known type of a named agent. The built-in factory agents use FOREMAN,
   * TRIAGE, SPEC, IMPLEMENT, REVIEW, or VERIFY; every other agent is CUSTOM.
   */
  agent_type?: 'FOREMAN' | 'TRIAGE' | 'SPEC' | 'IMPLEMENT' | 'REVIEW' | 'VERIFY' | 'CUSTOM' | null;

  /**
   * @deprecated Use harness instead.
   */
  base_harness?: string;

  /**
   * Base model for runs executed by this agent; the precedence order for model
   * resolution is:
   *
   * 1. The model specified on the run itself
   * 2. The agent's base model
   * 3. The team's default model
   */
  base_model?: string;

  /**
   * Default credential strategy for runs executed by a named agent; an agent may
   * leave this unset (see AgentResponse.credential_strategy for the full resolution
   * order).
   *
   * - EXECUTOR: runs authenticate with the named agent's own credentials (e.g. a
   *   GitHub App installation token for the agent's team).
   * - CREATOR: runs authenticate with the credentials of the principal that created
   *   the run.
   */
  credential_strategy?: 'CREATOR' | 'EXECUTOR';

  /**
   * Optional description of the agent
   */
  description?: string | null;

  /**
   * Default cloud environment ID for runs executed by this agent; the precedence
   * order for environment resolution is:
   *
   * 1. The environment specified on the run itself
   * 2. The agent's default environment
   * 3. An empty environment
   */
  environment_id?: string;

  /**
   * UID of the Factory this agent was seeded for. Null (or omitted) for agents that
   * do not belong to a factory.
   */
  factory_uid?: string | null;

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

  /**
   * Inference provider settings used for LLM calls.
   */
  inference_providers?: AgentAPI.InferenceProvidersConfig;

  /**
   * MCP server configurations attached to this agent by default. Run-level MCP
   * config takes precedence over this agent-level default.
   */
  mcp_servers?: { [key: string]: AgentAPI.McpServerConfig };

  /**
   * Whether runs created with this agent's API key may use the on_behalf_of field to
   * attribute runs to another team member.
   */
  on_behalf_of_enabled?: boolean;

  /**
   * Optional base prompt for this agent
   */
  prompt?: string | null;

  /**
   * Default worker host for runs executed by this agent, or empty when unset; the
   * precedence order for worker host resolution is:
   *
   * 1. The host specified on the run itself
   * 2. The agent's default host
   * 3. The workspace default host
   */
  worker_host?: string;
}

/**
 * Auto-memory state for an agent.
 */
export interface AutoMemoryResponse {
  /**
   * Whether this agent has an agent-owned memory store.
   */
  enabled: boolean;

  /**
   * Memory store attached to an agent.
   */
  store?: MemoryStoreAttachmentResponse;
}

export interface CreateAgentRequest {
  /**
   * A name for the agent
   */
  name: string;

  /**
   * The well-known type of a named agent. The built-in factory agents use FOREMAN,
   * TRIAGE, SPEC, IMPLEMENT, REVIEW, or VERIFY; every other agent is CUSTOM.
   */
  agent_type?: 'FOREMAN' | 'TRIAGE' | 'SPEC' | 'IMPLEMENT' | 'REVIEW' | 'VERIFY' | 'CUSTOM' | null;

  /**
   * @deprecated Use harness instead.
   */
  base_harness?: string | null;

  /**
   * Optional base model for runs executed by this agent.
   */
  base_model?: string | null;

  /**
   * Default credential strategy for runs executed by a named agent; an agent may
   * leave this unset (see AgentResponse.credential_strategy for the full resolution
   * order).
   *
   * - EXECUTOR: runs authenticate with the named agent's own credentials (e.g. a
   *   GitHub App installation token for the agent's team).
   * - CREATOR: runs authenticate with the credentials of the principal that created
   *   the run.
   */
  credential_strategy?: 'CREATOR' | 'EXECUTOR' | null;

  /**
   * Optional default runner UID for runs executed by this agent. When set, it
   * overrides the selected environment's default runner for runs that do not specify
   * their own `runner_id`. The editor must have View permission on the referenced
   * runner.
   */
  default_runner_uid?: string | null;

  /**
   * Optional description of the agent
   */
  description?: string | null;

  /**
   * Optional default cloud environment ID for runs executed by this agent. The
   * environment must be owned by the same team as the agent.
   */
  environment_id?: string | null;

  /**
   * Optional UID of the Factory to link this agent to. When omitted, the agent is
   * not linked to any factory.
   */
  factory_uid?: string | null;

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

  /**
   * Inference provider settings used for LLM calls.
   */
  inference_providers?: AgentAPI.InferenceProvidersConfig;

  /**
   * Optional map of MCP server configurations by name to attach to runs executed by
   * this agent. Run-level MCP config takes precedence over this agent-level default.
   */
  mcp_servers?: { [key: string]: AgentAPI.McpServerConfig };

  /**
   * Memory settings for creating an agent.
   */
  memory?: CreateAgentRequest.Memory;

  /**
   * Whether runs created with this agent's API key may use the on_behalf_of field to
   * attribute runs to another team member. Defaults to false. Only team admins may
   * set this field.
   */
  on_behalf_of_enabled?: boolean;

  /**
   * Optional base prompt for this agent
   */
  prompt?: string | null;

  /**
   * Optional list of secrets associated with the agent. Duplicate names within a
   * single request are rejected. Each entry is unioned into the run-time secret
   * scope when the agent executes.
   */
  secrets?: Array<AgentAPI.SecretRef>;

  /**
   * Optional list of skill specs to associate with the agent. Format:
   * "{owner}/{repo}:{skill_path}" (e.g.,
   * "warpdotdev/warp-server:.claude/skills/deploy/SKILL.md"). Each spec is validated
   * and normalized at attach time using the team's GitHub credentials; inaccessible
   * or malformed specs are rejected.
   */
  skills?: Array<string>;

  /**
   * Optional default worker host for runs executed by this agent; omission, null, or
   * an empty value stores no Agent default, in which case the workspace default
   * applies. A non-empty value is trimmed and stored (use "warp" to force
   * Warp-hosted execution over a self-hosted workspace default), and is resolved in
   * this order:
   *
   * 1. The host specified on the run itself
   * 2. The agent's default host
   * 3. The workspace default host
   */
  worker_host?: string | null;
}

export namespace CreateAgentRequest {
  /**
   * Memory settings for creating an agent.
   */
  export interface Memory {
    /**
     * Existing team memory stores to attach to the agent. Duplicate UIDs within a
     * single request are rejected.
     */
    attached_stores?: Array<AgentAPI.MemoryStoreRef>;

    /**
     * Auto-memory settings for creating an agent.
     */
    auto_memory?: Memory.AutoMemory;
  }

  export namespace Memory {
    /**
     * Auto-memory settings for creating an agent.
     */
    export interface AutoMemory {
      /**
       * Whether to create and attach a default service-account-owned memory store for
       * this agent. Defaults to true when omitted.
       */
      enabled?: boolean;
    }
  }
}

export interface ListAgentIdentitiesResponse {
  agents: Array<AgentResponse>;
}

/**
 * Memory settings for an agent.
 */
export interface MemoryResponse {
  /**
   * Team memory stores attached to the agent.
   */
  attached_stores: Array<AgentAPI.MemoryStoreRef>;

  /**
   * Auto-memory state for an agent.
   */
  auto_memory: AutoMemoryResponse;
}

/**
 * Memory store attached to an agent.
 */
export interface MemoryStoreAttachmentResponse {
  /**
   * Access level for the store.
   */
  access: 'read_write' | 'read_only';

  /**
   * Instructions for how the agent should use this memory store.
   */
  instructions: string;

  /**
   * Public owner type.
   */
  owner_type: 'user' | 'service_account' | 'team';

  /**
   * Public UID of the user, service account, or team that owns the memory store.
   */
  owner_uid: string;

  /**
   * UID of the memory store.
   */
  uid: string;

  /**
   * Optional description for the memory store.
   */
  description?: string;
}

/**
 * Partial update for an agent; each field is optional:
 *
 * - Omitted or `null`: leave the field unchanged.
 * - Empty value: clear the field.
 * - Non-empty: replace the field wholesale with the provided value.
 *   `secrets_append` is an exception: it appends secrets idempotently and must be
 *   the only supplied field, including fields supplied as `null`.
 */
export interface UpdateAgentRequest {
  /**
   * The well-known type of a named agent. The built-in factory agents use FOREMAN,
   * TRIAGE, SPEC, IMPLEMENT, REVIEW, or VERIFY; every other agent is CUSTOM.
   */
  agent_type?: 'FOREMAN' | 'TRIAGE' | 'SPEC' | 'IMPLEMENT' | 'REVIEW' | 'VERIFY' | 'CUSTOM' | null;

  /**
   * @deprecated Use harness instead.
   */
  base_harness?: string | null;

  /**
   * Replacement base model. Omit or pass `null` to leave unchanged, or pass an empty
   * string to clear.
   */
  base_model?: string | null;

  /**
   * Default credential strategy for runs executed by a named agent; an agent may
   * leave this unset (see AgentResponse.credential_strategy for the full resolution
   * order).
   *
   * - EXECUTOR: runs authenticate with the named agent's own credentials (e.g. a
   *   GitHub App installation token for the agent's team).
   * - CREATOR: runs authenticate with the credentials of the principal that created
   *   the run.
   */
  credential_strategy?: 'CREATOR' | 'EXECUTOR' | null;

  /**
   * Replacement default runner UID. Omit or pass `null` to leave unchanged, or pass
   * an empty string to clear. A non-empty value must reference a runner the editor
   * can View.
   */
  default_runner_uid?: string | null;

  /**
   * Replacement description. Omit or pass `null` to leave unchanged, or use an empty
   * value to clear.
   */
  description?: string | null;

  /**
   * Replacement default cloud environment ID. Omit or pass `null` to leave
   * unchanged, or pass an empty string to clear.
   */
  environment_id?: string | null;

  /**
   * Specifies which execution harness to use for the agent run. Default (nil/empty)
   * uses Warp's built-in harness. When stored as a named agent's default
   * (create/update agent identity), this field replaces the deprecated
   * base_harness/base_model pair: a harness other than `oz` here requires the
   * agent's base_model to be empty, since the two describe mutually exclusive
   * default models.
   */
  harness?: AgentAPI.Harness | null;

  /**
   * Authentication secrets for third-party harnesses. Only the secret for the
   * harness specified gets injected into the environment.
   */
  harness_auth_secrets?: AgentAPI.HarnessAuthSecrets | null;

  /**
   * Inference provider settings used for LLM calls.
   */
  inference_providers?: AgentAPI.InferenceProvidersConfig | null;

  /**
   * Replacement map of MCP server configurations by name. Omit to leave unchanged,
   * pass an empty object to clear, or pass a non-empty object to replace. Run-level
   * MCP config takes precedence over this agent-level default.
   */
  mcp_servers?: { [key: string]: AgentAPI.McpServerConfig };

  /**
   * Memory settings for updating an agent.
   */
  memory?: UpdateAgentRequest.Memory | null;

  /**
   * The new name for the agent
   */
  name?: string;

  /**
   * Whether runs created with this agent's API key may use the on_behalf_of field to
   * attribute runs to another team member. Omit or pass `null` to leave unchanged.
   * Only team admins may set this field.
   */
  on_behalf_of_enabled?: boolean | null;

  /**
   * Replacement prompt. Omit or pass `null` to leave unchanged, or use an empty
   * value to clear.
   */
  prompt?: string | null;

  /**
   * Replacement list of secrets. Omit to leave unchanged, pass an empty array to
   * clear, or pass a non-empty array to replace. Duplicate names are rejected.
   */
  secrets?: Array<AgentAPI.SecretRef> | null;

  /**
   * Adds team-owned raw-value secrets to this agent without removing or replacing
   * its existing ones. Secrets it already has and any duplicates are skipped, and an
   * empty array is a no-op. If any name is invalid, the whole request is rejected.
   * Send this field by itself. Including any other field returns 400, even if that
   * field is null, and null is not a valid value here. Appending requires edit and
   * privileged-config-edit access on the agent plus secret-attach access on its
   * Factory. Agents managed in external source files return 409.
   */
  secrets_append?: Array<AgentAPI.SecretRef>;

  /**
   * Replacement list of skill specs. Omit to leave unchanged, pass an empty array to
   * clear, or pass a non-empty array to replace.
   */
  skills?: Array<string> | null;

  /**
   * Replacement default worker host. Omit or pass `null` to leave unchanged, or pass
   * an empty string to clear (the workspace default then applies). A non-empty value
   * is trimmed and replaces the stored default; use "warp" to force Warp-hosted
   * execution over a self-hosted workspace default.
   */
  worker_host?: string | null;
}

export namespace UpdateAgentRequest {
  /**
   * Memory settings for updating an agent.
   */
  export interface Memory {
    /**
     * Replacement list of attached team memory stores. Omit to leave unchanged, pass
     * an empty array to clear, or pass a non-empty array to replace.
     */
    attached_stores?: Array<AgentAPI.MemoryStoreRef> | null;
  }
}

export interface AgentCreateParams {
  /**
   * Body param: A name for the agent
   */
  name: string;

  /**
   * Body param: The well-known type of a named agent. The built-in factory agents
   * use FOREMAN, TRIAGE, SPEC, IMPLEMENT, REVIEW, or VERIFY; every other agent is
   * CUSTOM.
   */
  agent_type?: 'FOREMAN' | 'TRIAGE' | 'SPEC' | 'IMPLEMENT' | 'REVIEW' | 'VERIFY' | 'CUSTOM' | null;

  /**
   * @deprecated Use harness instead.
   */
  base_harness?: string | null;

  /**
   * Body param: Optional base model for runs executed by this agent.
   */
  base_model?: string | null;

  /**
   * Body param: Default credential strategy for runs executed by a named agent; an
   * agent may leave this unset (see AgentResponse.credential_strategy for the full
   * resolution order).
   *
   * - EXECUTOR: runs authenticate with the named agent's own credentials (e.g. a
   *   GitHub App installation token for the agent's team).
   * - CREATOR: runs authenticate with the credentials of the principal that created
   *   the run.
   */
  credential_strategy?: 'CREATOR' | 'EXECUTOR' | null;

  /**
   * Body param: Optional default runner UID for runs executed by this agent. When
   * set, it overrides the selected environment's default runner for runs that do not
   * specify their own `runner_id`. The editor must have View permission on the
   * referenced runner.
   */
  default_runner_uid?: string | null;

  /**
   * Body param: Optional description of the agent
   */
  description?: string | null;

  /**
   * Body param: Optional default cloud environment ID for runs executed by this
   * agent. The environment must be owned by the same team as the agent.
   */
  environment_id?: string | null;

  /**
   * Body param: Optional UID of the Factory to link this agent to. When omitted, the
   * agent is not linked to any factory.
   */
  factory_uid?: string | null;

  /**
   * Body param: Specifies which execution harness to use for the agent run. Default
   * (nil/empty) uses Warp's built-in harness. When stored as a named agent's default
   * (create/update agent identity), this field replaces the deprecated
   * base_harness/base_model pair: a harness other than `oz` here requires the
   * agent's base_model to be empty, since the two describe mutually exclusive
   * default models.
   */
  harness?: AgentAPI.Harness;

  /**
   * Body param: Authentication secrets for third-party harnesses. Only the secret
   * for the harness specified gets injected into the environment.
   */
  harness_auth_secrets?: AgentAPI.HarnessAuthSecrets;

  /**
   * Body param: Inference provider settings used for LLM calls.
   */
  inference_providers?: AgentAPI.InferenceProvidersConfig;

  /**
   * Body param: Optional map of MCP server configurations by name to attach to runs
   * executed by this agent. Run-level MCP config takes precedence over this
   * agent-level default.
   */
  mcp_servers?: { [key: string]: AgentAPI.McpServerConfig };

  /**
   * Body param: Memory settings for creating an agent.
   */
  memory?: AgentCreateParams.Memory;

  /**
   * Body param: Whether runs created with this agent's API key may use the
   * on_behalf_of field to attribute runs to another team member. Defaults to false.
   * Only team admins may set this field.
   */
  on_behalf_of_enabled?: boolean;

  /**
   * Body param: Optional base prompt for this agent
   */
  prompt?: string | null;

  /**
   * Body param: Optional list of secrets associated with the agent. Duplicate names
   * within a single request are rejected. Each entry is unioned into the run-time
   * secret scope when the agent executes.
   */
  secrets?: Array<AgentAPI.SecretRef>;

  /**
   * Body param: Optional list of skill specs to associate with the agent. Format:
   * "{owner}/{repo}:{skill_path}" (e.g.,
   * "warpdotdev/warp-server:.claude/skills/deploy/SKILL.md"). Each spec is validated
   * and normalized at attach time using the team's GitHub credentials; inaccessible
   * or malformed specs are rejected.
   */
  skills?: Array<string>;

  /**
   * Body param: Optional default worker host for runs executed by this agent;
   * omission, null, or an empty value stores no Agent default, in which case the
   * workspace default applies. A non-empty value is trimmed and stored (use "warp"
   * to force Warp-hosted execution over a self-hosted workspace default), and is
   * resolved in this order:
   *
   * 1. The host specified on the run itself
   * 2. The agent's default host
   * 3. The workspace default host
   */
  worker_host?: string | null;

  /**
   * Header param: UID of the team to use as the request's active team. Ignored for
   * service-account callers, which always act as their bound team.
   */
  team_uid?: string;
}

export namespace AgentCreateParams {
  /**
   * Memory settings for creating an agent.
   */
  export interface Memory {
    /**
     * Existing team memory stores to attach to the agent. Duplicate UIDs within a
     * single request are rejected.
     */
    attached_stores?: Array<AgentAPI.MemoryStoreRef>;

    /**
     * Auto-memory settings for creating an agent.
     */
    auto_memory?: Memory.AutoMemory;
  }

  export namespace Memory {
    /**
     * Auto-memory settings for creating an agent.
     */
    export interface AutoMemory {
      /**
       * Whether to create and attach a default service-account-owned memory store for
       * this agent. Defaults to true when omitted.
       */
      enabled?: boolean;
    }
  }
}

export interface AgentUpdateParams {
  /**
   * The well-known type of a named agent. The built-in factory agents use FOREMAN,
   * TRIAGE, SPEC, IMPLEMENT, REVIEW, or VERIFY; every other agent is CUSTOM.
   */
  agent_type?: 'FOREMAN' | 'TRIAGE' | 'SPEC' | 'IMPLEMENT' | 'REVIEW' | 'VERIFY' | 'CUSTOM' | null;

  /**
   * @deprecated Use harness instead.
   */
  base_harness?: string | null;

  /**
   * Replacement base model. Omit or pass `null` to leave unchanged, or pass an empty
   * string to clear.
   */
  base_model?: string | null;

  /**
   * Default credential strategy for runs executed by a named agent; an agent may
   * leave this unset (see AgentResponse.credential_strategy for the full resolution
   * order).
   *
   * - EXECUTOR: runs authenticate with the named agent's own credentials (e.g. a
   *   GitHub App installation token for the agent's team).
   * - CREATOR: runs authenticate with the credentials of the principal that created
   *   the run.
   */
  credential_strategy?: 'CREATOR' | 'EXECUTOR' | null;

  /**
   * Replacement default runner UID. Omit or pass `null` to leave unchanged, or pass
   * an empty string to clear. A non-empty value must reference a runner the editor
   * can View.
   */
  default_runner_uid?: string | null;

  /**
   * Replacement description. Omit or pass `null` to leave unchanged, or use an empty
   * value to clear.
   */
  description?: string | null;

  /**
   * Replacement default cloud environment ID. Omit or pass `null` to leave
   * unchanged, or pass an empty string to clear.
   */
  environment_id?: string | null;

  /**
   * Specifies which execution harness to use for the agent run. Default (nil/empty)
   * uses Warp's built-in harness. When stored as a named agent's default
   * (create/update agent identity), this field replaces the deprecated
   * base_harness/base_model pair: a harness other than `oz` here requires the
   * agent's base_model to be empty, since the two describe mutually exclusive
   * default models.
   */
  harness?: AgentAPI.Harness | null;

  /**
   * Authentication secrets for third-party harnesses. Only the secret for the
   * harness specified gets injected into the environment.
   */
  harness_auth_secrets?: AgentAPI.HarnessAuthSecrets | null;

  /**
   * Inference provider settings used for LLM calls.
   */
  inference_providers?: AgentAPI.InferenceProvidersConfig | null;

  /**
   * Replacement map of MCP server configurations by name. Omit to leave unchanged,
   * pass an empty object to clear, or pass a non-empty object to replace. Run-level
   * MCP config takes precedence over this agent-level default.
   */
  mcp_servers?: { [key: string]: AgentAPI.McpServerConfig };

  /**
   * Memory settings for updating an agent.
   */
  memory?: AgentUpdateParams.Memory | null;

  /**
   * The new name for the agent
   */
  name?: string;

  /**
   * Whether runs created with this agent's API key may use the on_behalf_of field to
   * attribute runs to another team member. Omit or pass `null` to leave unchanged.
   * Only team admins may set this field.
   */
  on_behalf_of_enabled?: boolean | null;

  /**
   * Replacement prompt. Omit or pass `null` to leave unchanged, or use an empty
   * value to clear.
   */
  prompt?: string | null;

  /**
   * Replacement list of secrets. Omit to leave unchanged, pass an empty array to
   * clear, or pass a non-empty array to replace. Duplicate names are rejected.
   */
  secrets?: Array<AgentAPI.SecretRef> | null;

  /**
   * Adds team-owned raw-value secrets to this agent without removing or replacing
   * its existing ones. Secrets it already has and any duplicates are skipped, and an
   * empty array is a no-op. If any name is invalid, the whole request is rejected.
   * Send this field by itself. Including any other field returns 400, even if that
   * field is null, and null is not a valid value here. Appending requires edit and
   * privileged-config-edit access on the agent plus secret-attach access on its
   * Factory. Agents managed in external source files return 409.
   */
  secrets_append?: Array<AgentAPI.SecretRef>;

  /**
   * Replacement list of skill specs. Omit to leave unchanged, pass an empty array to
   * clear, or pass a non-empty array to replace.
   */
  skills?: Array<string> | null;

  /**
   * Replacement default worker host. Omit or pass `null` to leave unchanged, or pass
   * an empty string to clear (the workspace default then applies). A non-empty value
   * is trimmed and replaces the stored default; use "warp" to force Warp-hosted
   * execution over a self-hosted workspace default.
   */
  worker_host?: string | null;
}

export namespace AgentUpdateParams {
  /**
   * Memory settings for updating an agent.
   */
  export interface Memory {
    /**
     * Replacement list of attached team memory stores. Omit to leave unchanged, pass
     * an empty array to clear, or pass a non-empty array to replace.
     */
    attached_stores?: Array<AgentAPI.MemoryStoreRef> | null;
  }
}

export interface AgentListParams {
  /**
   * Query param: Optional UID of a Factory to filter by. When provided, only agents
   * linked to that factory are returned.
   */
  factory_uid?: string;

  /**
   * Header param: UID of the team to use as the request's active team. Ignored for
   * service-account callers, which always act as their bound team.
   */
  team_uid?: string;
}

export declare namespace Agent {
  export {
    type AgentResponse as AgentResponse,
    type AutoMemoryResponse as AutoMemoryResponse,
    type CreateAgentRequest as CreateAgentRequest,
    type ListAgentIdentitiesResponse as ListAgentIdentitiesResponse,
    type MemoryResponse as MemoryResponse,
    type MemoryStoreAttachmentResponse as MemoryStoreAttachmentResponse,
    type UpdateAgentRequest as UpdateAgentRequest,
    type AgentCreateParams as AgentCreateParams,
    type AgentUpdateParams as AgentUpdateParams,
    type AgentListParams as AgentListParams,
  };
}
