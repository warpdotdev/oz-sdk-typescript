// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

/**
 * Networking information for Warp-hosted agents
 */
export class Networking extends APIResource {
  /**
   * Return the canonical IP network ranges used by outbound requests from
   * Warp-hosted agents.
   */
  getEgressRanges(
    params: NetworkingGetEgressRangesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<NetworkingGetEgressRangesResponse> {
    const { team_uid } = params ?? {};
    return this._client.get('/networking/egress-ranges', {
      ...options,
      headers: buildHeaders([
        { ...(team_uid != null ? { 'X-Warp-Team-Uid': team_uid } : undefined) },
        options?.headers,
      ]),
    });
  }
}

export interface NetworkingGetEgressRangesResponse {
  /**
   * Canonical, deduplicated IPv4 and IPv6 network ranges.
   */
  cidrs: Array<string>;
}

export interface NetworkingGetEgressRangesParams {
  /**
   * UID of the team to use as the request's active team. Ignored for service-account
   * callers, which always act as their bound team.
   */
  team_uid?: string;
}

export declare namespace Networking {
  export {
    type NetworkingGetEgressRangesResponse as NetworkingGetEgressRangesResponse,
    type NetworkingGetEgressRangesParams as NetworkingGetEgressRangesParams,
  };
}
