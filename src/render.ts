import type { RenderHTMLOptions, RenderResponseOptions } from "./types.ts";

import swagger from "./renderers/swagger.ts";
import scalar from "./renderers/scalar.ts";
import kong from "./renderers/kong.ts";

const renderers = {
  swagger,
  scalar,
  kong,
} as const;

export function renderHTML(opts: RenderHTMLOptions = {}): string {
  const renderer = renderers[opts.renderer || "swagger"] || renderers.swagger;
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

export function renderResponse(
  req: Request,
  opts: RenderResponseOptions,
): Response | Promise<Response> {
  const query = new URL(req.url).searchParams;

  const spec =
    (opts.allowCustomQuery?.spec && (query.get("spec") as any)) || opts.spec;

  const renderer =
    (opts.allowCustomQuery?.renderer && (query.get("renderer") as any)) ||
    opts.renderer;

  let html: string;

  try {
    html = renderHTML({ ...opts, renderer, spec });
  } catch (error) {
    console.error("Error rendering OpenAPI:", error);
    return new Response(`<h1>Internal Error</h1>`, {
      status: 500,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  }

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
