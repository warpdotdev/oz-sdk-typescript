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
   * Create a new agent for the caller's team. Agents can be used as the execution
   * principal for team-owned runs.
   *
   * @example
   * ```ts
   * const agentResponse = await client.agent.agent.create({
   *   name: 'name',
   * });
   * ```
   */
  create(body: AgentCreateParams, options?: RequestOptions): APIPromise<AgentResponse> {
    return this._client.post('/agent/identities', { body, ...options });
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
   * List all agents for the caller's team. Each agent includes an `available` flag
   * indicating whether it is within the team's plan limit and may be used for runs.
   *
   * @example
   * ```ts
   * const listAgentIdentitiesResponse =
   *   await client.agent.agent.list();
   * ```
   */
  list(
    query: AgentListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ListAgentIdentitiesResponse> {
    return this._client.get('/agent/identities', { query, ...options });
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
   * Retrieve a single agent by its unique identifier. The response includes an
   * `available` flag indicating whether the agent is within the team's plan limit
   * and may be used for runs.
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
   * Whether this agent is within the team's plan limit and can be used for runs
   */
  available: boolean;

  /**
   * When the agent was created (RFC3339)
   */
  created_at: string;

  /**
   * Default runner UID for runs executed by this agent. When set, it overrides the
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
  memory: AgentResponse.Memory;

  /**
   * Name of the agent
   */
  name: string;

  /**
   * Secrets that this agent may access by default.
   */
  secrets: Array<AgentResponse.Secret>;

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
   * Default harness for runs executed by this agent. The precedence order for
   * harness resolution is:
   *
   * 1. The harness specified on the run itself
   * 2. The agent's base harness
   * 3. Oz
   */
  base_harness?: string;

  /**
   * Base model for runs executed by this agent. The precedence order for model
   * resolution is:
   *
   * 1. The model specified on the run itself
   * 2. The agent's base model
   * 3. The team's default model
   */
  base_model?: string;

  /**
   * Optional description of the agent
   */
  description?: string | null;

  /**
   * Default cloud environment ID for runs executed by this agent. The precedence
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
   * Authentication secrets for third-party harnesses. Only the secret for the
   * harness specified gets injected into the environment.
   */
  harness_auth_secrets?: AgentResponse.HarnessAuthSecrets;

  /**
   * Inference provider settings used for LLM calls.
   */
  inference_providers?: AgentResponse.InferenceProviders;

  /**
   * MCP server configurations attached to this agent by default. Run-level MCP
   * config takes precedence over this agent-level default.
   */
  mcp_servers?: { [key: string]: AgentAPI.McpServerConfig };

  /**
   * Optional base prompt for this agent
   */
  prompt?: string | null;
}

export namespace AgentResponse {
  /**
   * Memory settings for an agent.
   */
  export interface Memory {
    /**
     * Team memory stores attached to the agent.
     */
    attached_stores: Array<Memory.AttachedStore>;

    /**
     * Auto-memory state for an agent.
     */
    auto_memory: Memory.AutoMemory;
  }

  export namespace Memory {
    /**
     * Reference to a memory store to attach to an agent.
     */
    export interface AttachedStore {
      /**
       * Access level for the store.
       */
      access: 'read_write' | 'read_only';

      /**
       * Instructions for how the agent should use this memory store. Must not be empty.
       */
      instructions: string;

      /**
       * UID of the memory store.
       */
      uid: string;
    }

    /**
     * Auto-memory state for an agent.
     */
    export interface AutoMemory {
      /**
       * Whether this agent has an agent-owned memory store.
       */
      enabled: boolean;

      /**
       * Memory store attached to an agent.
       */
      store?: AutoMemory.Store;
    }

    export namespace AutoMemory {
      /**
       * Memory store attached to an agent.
       */
      export interface Store {
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
    }
  }

  /**
   * Reference to a managed secret by name.
   */
  export interface Secret {
    /**
     * Name of the managed secret.
     */
    name: string;
  }

  /**
   * Authentication secrets for third-party harnesses. Only the secret for the
   * harness specified gets injected into the environment.
   */
  export interface HarnessAuthSecrets {
    /**
     * Name of a managed secret for Claude Code harness authentication. The secret must
     * exist within the caller's personal or team scope. Only applicable when harness
     * type is "claude".
     */
    claude_auth_secret_name?: string;

    /**
     * Name of a managed secret for Codex harness authentication. The secret must exist
     * within the caller's personal or team scope. Only applicable when harness type is
     * "codex".
     */
    codex_auth_secret_name?: string;
  }

  /**
   * Inference provider settings used for LLM calls.
   */
  export interface InferenceProviders {
    /**
     * Configures AWS Bedrock as the LLM inference provider for this agent or run.
     */
    aws?: InferenceProviders.Aws;
  }

  export namespace InferenceProviders {
    /**
     * Configures AWS Bedrock as the LLM inference provider for this agent or run.
     */
    export interface Aws {
      /**
       * If true, opt out of Bedrock at this layer.
       */
      disabled?: boolean;

      /**
       * AWS region used for STS when assuming the Bedrock inference role.
       */
      region?: string;

      /**
       * IAM role ARN to assume when calling Bedrock.
       */
      role_arn?: string;
    }
  }
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
   * Optional default harness for runs executed by this agent.
   */
  base_harness?: string | null;

  /**
   * Optional base model for runs executed by this agent.
   */
  base_model?: string | null;

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
   * Authentication secrets for third-party harnesses. Only the secret for the
   * harness specified gets injected into the environment.
   */
  harness_auth_secrets?: CreateAgentRequest.HarnessAuthSecrets;

  /**
   * Inference provider settings used for LLM calls.
   */
  inference_providers?: CreateAgentRequest.InferenceProviders;

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
   * Optional base prompt for this agent
   */
  prompt?: string | null;

  /**
   * Optional list of secrets associated with the agent. Duplicate names within a
   * single request are rejected. Each entry is unioned into the run-time secret
   * scope when the agent executes.
   */
  secrets?: Array<CreateAgentRequest.Secret>;

  /**
   * Optional list of skill specs to associate with the agent. Format:
   * "{owner}/{repo}:{skill_path}" (e.g.,
   * "warpdotdev/warp-server:.claude/skills/deploy/SKILL.md"). Each spec is validated
   * and normalized at attach time using the team's GitHub credentials; inaccessible
   * or malformed specs are rejected.
   */
  skills?: Array<string>;
}

export namespace CreateAgentRequest {
  /**
   * Authentication secrets for third-party harnesses. Only the secret for the
   * harness specified gets injected into the environment.
   */
  export interface HarnessAuthSecrets {
    /**
     * Name of a managed secret for Claude Code harness authentication. The secret must
     * exist within the caller's personal or team scope. Only applicable when harness
     * type is "claude".
     */
    claude_auth_secret_name?: string;

    /**
     * Name of a managed secret for Codex harness authentication. The secret must exist
     * within the caller's personal or team scope. Only applicable when harness type is
     * "codex".
     */
    codex_auth_secret_name?: string;
  }

  /**
   * Inference provider settings used for LLM calls.
   */
  export interface InferenceProviders {
    /**
     * Configures AWS Bedrock as the LLM inference provider for this agent or run.
     */
    aws?: InferenceProviders.Aws;
  }

  export namespace InferenceProviders {
    /**
     * Configures AWS Bedrock as the LLM inference provider for this agent or run.
     */
    export interface Aws {
      /**
       * If true, opt out of Bedrock at this layer.
       */
      disabled?: boolean;

      /**
       * AWS region used for STS when assuming the Bedrock inference role.
       */
      region?: string;

      /**
       * IAM role ARN to assume when calling Bedrock.
       */
      role_arn?: string;
    }
  }

  /**
   * Memory settings for creating an agent.
   */
  export interface Memory {
    /**
     * Existing team memory stores to attach to the agent. Duplicate UIDs within a
     * single request are rejected.
     */
    attached_stores?: Array<Memory.AttachedStore>;

    /**
     * Auto-memory settings for creating an agent.
     */
    auto_memory?: Memory.AutoMemory;
  }

  export namespace Memory {
    /**
     * Reference to a memory store to attach to an agent.
     */
    export interface AttachedStore {
      /**
       * Access level for the store.
       */
      access: 'read_write' | 'read_only';

      /**
       * Instructions for how the agent should use this memory store. Must not be empty.
       */
      instructions: string;

      /**
       * UID of the memory store.
       */
      uid: string;
    }

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

  /**
   * Reference to a managed secret by name.
   */
  export interface Secret {
    /**
     * Name of the managed secret.
     */
    name: string;
  }
}

export interface ListAgentIdentitiesResponse {
  agents: Array<AgentResponse>;
}

/**
 * Partial update for an agent. Each field is optional:
 *
 * - Omitted or `null`: leave the field unchanged.
 * - Empty value: clear the field.
 * - Non-empty: replace the field wholesale with the provided value.
 */
export interface UpdateAgentRequest {
  /**
   * The well-known type of a named agent. The built-in factory agents use FOREMAN,
   * TRIAGE, SPEC, IMPLEMENT, REVIEW, or VERIFY; every other agent is CUSTOM.
   */
  agent_type?: 'FOREMAN' | 'TRIAGE' | 'SPEC' | 'IMPLEMENT' | 'REVIEW' | 'VERIFY' | 'CUSTOM' | null;

  /**
   * Replacement default harness. Omit or pass `null` to leave unchanged, or pass an
   * empty string to clear.
   */
  base_harness?: string | null;

  /**
   * Replacement base model. Omit or pass `null` to leave unchanged, or pass an empty
   * string to clear.
   */
  base_model?: string | null;

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
   * Authentication secrets for third-party harnesses. Only the secret for the
   * harness specified gets injected into the environment.
   */
  harness_auth_secrets?: UpdateAgentRequest.HarnessAuthSecrets | null;

  /**
   * Inference provider settings used for LLM calls.
   */
  inference_providers?: UpdateAgentRequest.InferenceProviders | null;

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
   * Replacement prompt. Omit or pass `null` to leave unchanged, or use an empty
   * value to clear.
   */
  prompt?: string | null;

  /**
   * Replacement list of secrets. Omit to leave unchanged, pass an empty array to
   * clear, or pass a non-empty array to replace. Duplicate names are rejected.
   */
  secrets?: Array<UpdateAgentRequest.Secret> | null;

  /**
   * Replacement list of skill specs. Omit to leave unchanged, pass an empty array to
   * clear, or pass a non-empty array to replace.
   */
  skills?: Array<string> | null;
}

export namespace UpdateAgentRequest {
  /**
   * Authentication secrets for third-party harnesses. Only the secret for the
   * harness specified gets injected into the environment.
   */
  export interface HarnessAuthSecrets {
    /**
     * Name of a managed secret for Claude Code harness authentication. The secret must
     * exist within the caller's personal or team scope. Only applicable when harness
     * type is "claude".
     */
    claude_auth_secret_name?: string;

    /**
     * Name of a managed secret for Codex harness authentication. The secret must exist
     * within the caller's personal or team scope. Only applicable when harness type is
     * "codex".
     */
    codex_auth_secret_name?: string;
  }

  /**
   * Inference provider settings used for LLM calls.
   */
  export interface InferenceProviders {
    /**
     * Configures AWS Bedrock as the LLM inference provider for this agent or run.
     */
    aws?: InferenceProviders.Aws;
  }

  export namespace InferenceProviders {
    /**
     * Configures AWS Bedrock as the LLM inference provider for this agent or run.
     */
    export interface Aws {
      /**
       * If true, opt out of Bedrock at this layer.
       */
      disabled?: boolean;

      /**
       * AWS region used for STS when assuming the Bedrock inference role.
       */
      region?: string;

      /**
       * IAM role ARN to assume when calling Bedrock.
       */
      role_arn?: string;
    }
  }

  /**
   * Memory settings for updating an agent.
   */
  export interface Memory {
    /**
     * Replacement list of attached team memory stores. Omit to leave unchanged, pass
     * an empty array to clear, or pass a non-empty array to replace.
     */
    attached_stores?: Array<Memory.AttachedStore> | null;
  }

  export namespace Memory {
    /**
     * Reference to a memory store to attach to an agent.
     */
    export interface AttachedStore {
      /**
       * Access level for the store.
       */
      access: 'read_write' | 'read_only';

      /**
       * Instructions for how the agent should use this memory store. Must not be empty.
       */
      instructions: string;

      /**
       * UID of the memory store.
       */
      uid: string;
    }
  }

  /**
   * Reference to a managed secret by name.
   */
  export interface Secret {
    /**
     * Name of the managed secret.
     */
    name: string;
  }
}

export interface AgentCreateParams {
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
   * Optional default harness for runs executed by this agent.
   */
  base_harness?: string | null;

  /**
   * Optional base model for runs executed by this agent.
   */
  base_model?: string | null;

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
   * Authentication secrets for third-party harnesses. Only the secret for the
   * harness specified gets injected into the environment.
   */
  harness_auth_secrets?: AgentCreateParams.HarnessAuthSecrets;

  /**
   * Inference provider settings used for LLM calls.
   */
  inference_providers?: AgentCreateParams.InferenceProviders;

  /**
   * Optional map of MCP server configurations by name to attach to runs executed by
   * this agent. Run-level MCP config takes precedence over this agent-level default.
   */
  mcp_servers?: { [key: string]: AgentAPI.McpServerConfig };

  /**
   * Memory settings for creating an agent.
   */
  memory?: AgentCreateParams.Memory;

  /**
   * Optional base prompt for this agent
   */
  prompt?: string | null;

  /**
   * Optional list of secrets associated with the agent. Duplicate names within a
   * single request are rejected. Each entry is unioned into the run-time secret
   * scope when the agent executes.
   */
  secrets?: Array<AgentCreateParams.Secret>;

  /**
   * Optional list of skill specs to associate with the agent. Format:
   * "{owner}/{repo}:{skill_path}" (e.g.,
   * "warpdotdev/warp-server:.claude/skills/deploy/SKILL.md"). Each spec is validated
   * and normalized at attach time using the team's GitHub credentials; inaccessible
   * or malformed specs are rejected.
   */
  skills?: Array<string>;
}

export namespace AgentCreateParams {
  /**
   * Authentication secrets for third-party harnesses. Only the secret for the
   * harness specified gets injected into the environment.
   */
  export interface HarnessAuthSecrets {
    /**
     * Name of a managed secret for Claude Code harness authentication. The secret must
     * exist within the caller's personal or team scope. Only applicable when harness
     * type is "claude".
     */
    claude_auth_secret_name?: string;

    /**
     * Name of a managed secret for Codex harness authentication. The secret must exist
     * within the caller's personal or team scope. Only applicable when harness type is
     * "codex".
     */
    codex_auth_secret_name?: string;
  }

  /**
   * Inference provider settings used for LLM calls.
   */
  export interface InferenceProviders {
    /**
     * Configures AWS Bedrock as the LLM inference provider for this agent or run.
     */
    aws?: InferenceProviders.Aws;
  }

  export namespace InferenceProviders {
    /**
     * Configures AWS Bedrock as the LLM inference provider for this agent or run.
     */
    export interface Aws {
      /**
       * If true, opt out of Bedrock at this layer.
       */
      disabled?: boolean;

      /**
       * AWS region used for STS when assuming the Bedrock inference role.
       */
      region?: string;

      /**
       * IAM role ARN to assume when calling Bedrock.
       */
      role_arn?: string;
    }
  }

  /**
   * Memory settings for creating an agent.
   */
  export interface Memory {
    /**
     * Existing team memory stores to attach to the agent. Duplicate UIDs within a
     * single request are rejected.
     */
    attached_stores?: Array<Memory.AttachedStore>;

    /**
     * Auto-memory settings for creating an agent.
     */
    auto_memory?: Memory.AutoMemory;
  }

  export namespace Memory {
    /**
     * Reference to a memory store to attach to an agent.
     */
    export interface AttachedStore {
      /**
       * Access level for the store.
       */
      access: 'read_write' | 'read_only';

      /**
       * Instructions for how the agent should use this memory store. Must not be empty.
       */
      instructions: string;

      /**
       * UID of the memory store.
       */
      uid: string;
    }

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

  /**
   * Reference to a managed secret by name.
   */
  export interface Secret {
    /**
     * Name of the managed secret.
     */
    name: string;
  }
}

export interface AgentUpdateParams {
  /**
   * The well-known type of a named agent. The built-in factory agents use FOREMAN,
   * TRIAGE, SPEC, IMPLEMENT, REVIEW, or VERIFY; every other agent is CUSTOM.
   */
  agent_type?: 'FOREMAN' | 'TRIAGE' | 'SPEC' | 'IMPLEMENT' | 'REVIEW' | 'VERIFY' | 'CUSTOM' | null;

  /**
   * Replacement default harness. Omit or pass `null` to leave unchanged, or pass an
   * empty string to clear.
   */
  base_harness?: string | null;

  /**
   * Replacement base model. Omit or pass `null` to leave unchanged, or pass an empty
   * string to clear.
   */
  base_model?: string | null;

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
   * Authentication secrets for third-party harnesses. Only the secret for the
   * harness specified gets injected into the environment.
   */
  harness_auth_secrets?: AgentUpdateParams.HarnessAuthSecrets | null;

  /**
   * Inference provider settings used for LLM calls.
   */
  inference_providers?: AgentUpdateParams.InferenceProviders | null;

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
   * Replacement prompt. Omit or pass `null` to leave unchanged, or use an empty
   * value to clear.
   */
  prompt?: string | null;

  /**
   * Replacement list of secrets. Omit to leave unchanged, pass an empty array to
   * clear, or pass a non-empty array to replace. Duplicate names are rejected.
   */
  secrets?: Array<AgentUpdateParams.Secret> | null;

  /**
   * Replacement list of skill specs. Omit to leave unchanged, pass an empty array to
   * clear, or pass a non-empty array to replace.
   */
  skills?: Array<string> | null;
}

export namespace AgentUpdateParams {
  /**
   * Authentication secrets for third-party harnesses. Only the secret for the
   * harness specified gets injected into the environment.
   */
  export interface HarnessAuthSecrets {
    /**
     * Name of a managed secret for Claude Code harness authentication. The secret must
     * exist within the caller's personal or team scope. Only applicable when harness
     * type is "claude".
     */
    claude_auth_secret_name?: string;

    /**
     * Name of a managed secret for Codex harness authentication. The secret must exist
     * within the caller's personal or team scope. Only applicable when harness type is
     * "codex".
     */
    codex_auth_secret_name?: string;
  }

  /**
   * Inference provider settings used for LLM calls.
   */
  export interface InferenceProviders {
    /**
     * Configures AWS Bedrock as the LLM inference provider for this agent or run.
     */
    aws?: InferenceProviders.Aws;
  }

  export namespace InferenceProviders {
    /**
     * Configures AWS Bedrock as the LLM inference provider for this agent or run.
     */
    export interface Aws {
      /**
       * If true, opt out of Bedrock at this layer.
       */
      disabled?: boolean;

      /**
       * AWS region used for STS when assuming the Bedrock inference role.
       */
      region?: string;

      /**
       * IAM role ARN to assume when calling Bedrock.
       */
      role_arn?: string;
    }
  }

  /**
   * Memory settings for updating an agent.
   */
  export interface Memory {
    /**
     * Replacement list of attached team memory stores. Omit to leave unchanged, pass
     * an empty array to clear, or pass a non-empty array to replace.
     */
    attached_stores?: Array<Memory.AttachedStore> | null;
  }

  export namespace Memory {
    /**
     * Reference to a memory store to attach to an agent.
     */
    export interface AttachedStore {
      /**
       * Access level for the store.
       */
      access: 'read_write' | 'read_only';

      /**
       * Instructions for how the agent should use this memory store. Must not be empty.
       */
      instructions: string;

      /**
       * UID of the memory store.
       */
      uid: string;
    }
  }

  /**
   * Reference to a managed secret by name.
   */
  export interface Secret {
    /**
     * Name of the managed secret.
     */
    name: string;
  }
}

export interface AgentListParams {
  /**
   * Optional UID of a Factory to filter by. When provided, only agents linked to
   * that factory (and owned by the caller's team) are returned. Ignored unless the
   * factory API is enabled.
   */
  factory_uid?: string;
}

export declare namespace Agent {
  export {
    type AgentResponse as AgentResponse,
    type CreateAgentRequest as CreateAgentRequest,
    type ListAgentIdentitiesResponse as ListAgentIdentitiesResponse,
    type UpdateAgentRequest as UpdateAgentRequest,
    type AgentCreateParams as AgentCreateParams,
    type AgentUpdateParams as AgentUpdateParams,
    type AgentListParams as AgentListParams,
  };
}
