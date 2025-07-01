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
  };

  /**
   * Swagger UI configuration.
   */
  swagger?: {
    cdnURL?: string;
  };

  /**
   * Kong Spec Renderer configuration.
   */
  kong?: Partial<KongConfig> & {
    cdnURL?: string;
  };
}

export interface RenderResponseOptions extends RenderHTMLOptions {
  allowCustomQuery?: {
    spec?: boolean;
    renderer?: boolean;
  };
}
