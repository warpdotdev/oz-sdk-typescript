// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { OzAPI } from '../client';

export abstract class APIResource {
  protected _client: OzAPI;

  constructor(client: OzAPI) {
    this._client = client;
  }
}
