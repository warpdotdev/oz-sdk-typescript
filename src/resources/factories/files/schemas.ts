// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Operations for creating and managing factories
 */
export class Schemas extends APIResource {
  /**
   * Returns every JSON Schema 2020-12 document describing one Factory file schema
   * version, as a single bundle so the relative `$id` and `$ref` identities between
   * the documents keep resolving.
   */
  retrieve(
    schemaVersion: string,
    params: SchemaRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SchemaRetrieveResponse> {
    const { 'If-None-Match': ifNoneMatch } = params ?? {};
    return this._client.get(path`/factory-files/schemas/${schemaVersion}`, {
      ...options,
      headers: buildHeaders([
        { ...(ifNoneMatch != null ? { 'If-None-Match': ifNoneMatch } : undefined) },
        options?.headers,
      ]),
      __security: {},
    });
  }

  /**
   * Returns every Factory file schema version this server can describe, with a link
   * to each version's schema bundle.
   */
  list(
    params: SchemaListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SchemaListResponse> {
    const { 'If-None-Match': ifNoneMatch } = params ?? {};
    return this._client.get('/factory-files/schemas', {
      ...options,
      headers: buildHeaders([
        { ...(ifNoneMatch != null ? { 'If-None-Match': ifNoneMatch } : undefined) },
        options?.headers,
      ]),
      __security: {},
    });
  }

  /**
   * Returns a single generated JSON Schema document on its own, rather than inside
   * the bundle envelope, so it can be used directly as a schema reference. A
   * document served here resolves its relative `$ref`s against its siblings at this
   * same path, which is what each document's `$id` assumes, making the URL usable
   * directly from an editor or YAML language server, for example:
   *
   * ```yaml
   * # yaml-language-server: $schema=/api/v1/factory-files/schemas/v1alpha1/factory.schema.json
   * ```
   */
  getDocument(
    document: string,
    params: SchemaGetDocumentParams,
    options?: RequestOptions,
  ): APIPromise<SchemaGetDocumentResponse> {
    const { schema_version } = params;
    return this._client.get(path`/factory-files/schemas/${schema_version}/${document}`, {
      ...options,
      __security: {},
    });
  }
}

/**
 * Every JSON Schema document describing one Factory file schema version. The
 * envelope is plain JSON; each value in `documents` is a JSON Schema 2020-12
 * document keyed by its `$id`.
 */
export interface SchemaRetrieveResponse {
  /**
   * Schema documents keyed by file name, which is also each document's $id.
   */
  documents: { [key: string]: unknown };

  schema_version: string;
}

/**
 * The Factory file schema versions a server can describe.
 */
export interface SchemaListResponse {
  /**
   * The version a new Factory tree should declare.
   */
  current_version: string;

  /**
   * Every supported version, sorted by schema version.
   */
  versions: Array<SchemaListResponse.Version>;
}

export namespace SchemaListResponse {
  export interface Version {
    /**
     * Root-relative path of this version's schema bundle.
     */
    schema_url: string;

    schema_version: string;
  }
}

export type SchemaGetDocumentResponse = { [key: string]: unknown };

export interface SchemaRetrieveParams {
  /**
   * A previously returned ETag. A match returns 304 with no body.
   */
  'If-None-Match'?: string;
}

export interface SchemaListParams {
  /**
   * A previously returned ETag. A match returns 304 with no body.
   */
  'If-None-Match'?: string;
}

export interface SchemaGetDocumentParams {
  /**
   * Factory file schema version, such as v1alpha1
   */
  schema_version: string;
}

export declare namespace Schemas {
  export {
    type SchemaRetrieveResponse as SchemaRetrieveResponse,
    type SchemaListResponse as SchemaListResponse,
    type SchemaGetDocumentResponse as SchemaGetDocumentResponse,
    type SchemaRetrieveParams as SchemaRetrieveParams,
    type SchemaListParams as SchemaListParams,
    type SchemaGetDocumentParams as SchemaGetDocumentParams,
  };
}
