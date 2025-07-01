import type { RenderOptions } from "./types.ts";

import swagger from "./renderers/swagger.ts";
import scalar from "./renderers/scalar.ts";
import kong from "./renderers/kong.ts";

const renderers = {
  swagger,
  scalar,
  kong,
} as const;

export function renderHTML(opts: RenderOptions): string {
  const renderer = renderers[opts.renderer || "swagger"];
  if (!renderer) {
    throw new Error(
      `Invalid Renderer "${opts.renderer}" (Supported: ${Object.keys(renderers).join(", ")}).`,
    );
  }

  return renderer({
    renderer: opts.renderer || "swagger",
    spec: opts.spec || "./openapi.json",
    meta: {
      title: opts.meta?.title || "OpenAPI Documentation",
      description: opts.meta?.description || "",
      version: opts.meta?.version || "",
    },
    styles: opts.styles || "",
    scalar: opts.scalar,
    swagger: opts.swagger,
    kong: opts.kong,
  });
}
