// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
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
  list(options?: RequestOptions): APIPromise<ListAgentIdentitiesResponse> {
    return this._client.get('/agent/identities', options);
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
   * Optional description of the agent
   */
  description?: string | null;
}

export namespace AgentResponse {
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

export interface CreateAgentRequest {
  /**
   * A name for the agent
   */
  name: string;

  /**
   * Optional description of the agent
   */
  description?: string | null;

  /**
   * Optional list of secrets associated with the agent. Duplicate names within a
   * single request are rejected.
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
   * Replacement description. Omit or pass `null` to leave unchanged, or use an empty
   * value to clear.
   */
  description?: string | null;

  /**
   * The new name for the agent
   */
  name?: string;

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
   * Optional description of the agent
   */
  description?: string | null;

  /**
   * Optional list of secrets associated with the agent. Duplicate names within a
   * single request are rejected.
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
   * Replacement description. Omit or pass `null` to leave unchanged, or use an empty
   * value to clear.
   */
  description?: string | null;

  /**
   * The new name for the agent
   */
  name?: string;

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
   * Reference to a managed secret by name.
   */
  export interface Secret {
    /**
     * Name of the managed secret.
     */
    name: string;
  }
}

export declare namespace Agent {
  export {
    type AgentResponse as AgentResponse,
    type CreateAgentRequest as CreateAgentRequest,
    type ListAgentIdentitiesResponse as ListAgentIdentitiesResponse,
    type UpdateAgentRequest as UpdateAgentRequest,
    type AgentCreateParams as AgentCreateParams,
    type AgentUpdateParams as AgentUpdateParams,
  };
}
