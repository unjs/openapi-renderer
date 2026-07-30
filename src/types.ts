import type { ApiReferenceConfiguration as ScalarConfig } from "@scalar/api-reference";
import type { SpecRendererNitroConfig as KongConfig } from "@kong/spec-renderer";
/**
 * OpenAPI render configuration
 */
export interface RenderHTMLOptions {
  /**
   * The renderer to use for the OpenAPI documentation.
   *
   * @default "swagger"
   */
  renderer?: "swagger" | "scalar" | "kong";

  /**
   * The route to the OpenAPI specification to render.
   *
   * Ignored by the corresponding renderer when `scalar.sources` or
   * `swagger.urls` is configured.
   *
   * @default "./openapi.json"
   */
  spec?: string;

  /**
   * Metadata for the OpenAPI documentation.
   */
  meta?: {
    /**
     * @default "OpenAPI Documentation"
     */
    title?: string;
    description?: string;
    version?: string;
  };

  /**
   * Additional HTML styles.
   */
  styles?: string;

  /**
   * Scalar UI configuration.
   */
  scalar?: Partial<ScalarConfig> & {
    cdnURL?: string;

    /**
     * Multiple OpenAPI documents to render.
     *
     * When set, the top-level `spec` option is ignored.
     *
     * @see https://scalar.com/products/api-references/configuration#multiple-configurations-with-sources-advanced
     */
    sources?: ScalarSource[];
  };

  /**
   * Swagger UI configuration.
   */
  swagger?: {
    cdnURL?: string;

    /**
     * Multiple OpenAPI documents to render, selectable via a dropdown.
     *
     * When set, the top-level `spec` option is ignored.
     */
    urls?: SwaggerUrl[];
  };

  /**
   * Kong Spec Renderer configuration.
   */
  kong?: Partial<KongConfig> & {
    cdnURL?: string;
  };
}

/**
 * An OpenAPI document source for the Scalar renderer.
 */
export interface ScalarSource {
  /** URL to an OpenAPI/Swagger document */
  url?: string;

  /** Directly embed the OpenAPI document (JSON string or object) */
  content?: string | Record<string, any>;

  /** Title of the OpenAPI document */
  title?: string;

  /** Slug used in the URL */
  slug?: string;

  /** Whether this is the default document */
  default?: boolean;
}

/**
 * An OpenAPI document source for the Swagger UI renderer.
 */
export interface SwaggerUrl {
  /** URL to an OpenAPI/Swagger document */
  url: string;

  /** Display name in the document selector dropdown */
  name?: string;

  /** Whether this is the default document (maps to `urls.primaryName`) */
  default?: boolean;
}

export interface RenderResponseOptions extends RenderHTMLOptions {
  allowCustomQuery?: {
    spec?: boolean;
    renderer?: boolean;
  };
}
