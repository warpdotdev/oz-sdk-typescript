// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as SchemasAPI from './schemas';
import {
  SchemaGetDocumentParams,
  SchemaGetDocumentResponse,
  SchemaListParams,
  SchemaListResponse,
  SchemaRetrieveParams,
  SchemaRetrieveResponse,
  Schemas,
} from './schemas';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';

/**
 * Operations for creating and managing factories
 */
export class Files extends APIResource {
  schemas: SchemasAPI.Schemas = new SchemasAPI.Schemas(this._client);

  /**
   * Parses a Factory tree supplied as paths and content, then applies the checks the
   * apply path performs without consulting tenant state; nothing is persisted, no
   * Factory is loaded, and no repository is read. Validation is unauthenticated,
   * like the schema endpoints beside it, since it reads no tenant state and local
   * authoring agents reach the server from a shell with no access to the client's
   * session.
   *
   * @example
   * ```ts
   * const response = await client.factories.files.validate({
   *   files: [{ content: 'content', path: 'factory.yaml' }],
   * });
   * ```
   */
  validate(body: FileValidateParams, options?: RequestOptions): APIPromise<FileValidateResponse> {
    return this._client.post('/factory-files/validate', { body, ...options, __security: {} });
  }
}

/**
 * The outcome of validating a Factory tree. `valid` covers the parser and the
 * state-independent checks only.
 */
export interface FileValidateResponse {
  /**
   * Authored values whose existence was deliberately not proven. A deferred value is
   * not invalid.
   */
  deferred_resolutions: Array<FileValidateResponse.DeferredResolution>;

  diagnostics: Array<FileValidateResponse.Diagnostic>;

  /**
   * The version factory.yaml declares, or the parser's default when the field is
   * omitted.
   */
  schema_version: string;

  /**
   * The checks this endpoint never performs, listed even when the tree is clean, so
   * a caller cannot read a pass as an apply guarantee.
   */
  state_dependent_checks_not_run: Array<string>;

  /**
   * True when no parser or state-independent diagnostic was found. It does not mean
   * the tree will apply.
   */
  valid: boolean;

  /**
   * What each validation tier did for this request.
   */
  validation_scope: FileValidateResponse.ValidationScope;
}

export namespace FileValidateResponse {
  /**
   * One authored value the validator did not resolve.
   */
  export interface DeferredResolution {
    /**
     * The authored field, for example triggers[0].filter.teams.
     */
    field: string;

    /**
     * The resolution that was skipped, for example linear_name_alias.
     */
    kind: string;

    path: string;
  }

  /**
   * A source-located validation problem.
   */
  export interface Diagnostic {
    /**
     * Stable diagnostic code, for example FF_UNKNOWN_FIELD.
     */
    code: string;

    /**
     * 1-based column. A problem with no source position uses 1.
     */
    column: number;

    /**
     * 1-based line. A problem with no source position uses 1.
     */
    line: number;

    message: string;

    /**
     * Repository-relative path of the file the problem is in.
     */
    path: string;
  }

  /**
   * What each validation tier did for this request.
   */
  export interface ValidationScope {
    parser: 'checked' | 'not_run';

    state_dependent: 'not_checked';

    state_independent: 'checked' | 'not_run';
  }
}

export interface FileValidateParams {
  /**
   * The Factory tree's resource files. Send factory.yaml and the candidate Agent,
   * Automation, Runner, and Scorer paths; skill files are not parser inputs.
   * Symlinks must not be followed.
   */
  files: Array<FileValidateParams.File>;
}

export namespace FileValidateParams {
  export interface File {
    /**
     * UTF-8 file content, at most 2 MiB.
     */
    content: string;

    /**
     * Repository-relative path, for example agents/triage/agent.md.
     */
    path: string;
  }
}

Files.Schemas = Schemas;

export declare namespace Files {
  export { type FileValidateResponse as FileValidateResponse, type FileValidateParams as FileValidateParams };

  export {
    Schemas as Schemas,
    type SchemaRetrieveResponse as SchemaRetrieveResponse,
    type SchemaListResponse as SchemaListResponse,
    type SchemaGetDocumentResponse as SchemaGetDocumentResponse,
    type SchemaRetrieveParams as SchemaRetrieveParams,
    type SchemaListParams as SchemaListParams,
    type SchemaGetDocumentParams as SchemaGetDocumentParams,
  };
}
