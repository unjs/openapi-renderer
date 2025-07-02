import { getHtmlDocument, type HtmlRenderingConfiguration as ScalarConfig } from '@scalar/core/libs/html-rendering'
import type { RenderHTMLOptions } from "../types.ts";

// https://github.com/scalar/scalar

export default function render(opts: RenderHTMLOptions): string {
  const CDN_URL =
    opts.scalar?.cdnURL ||
    "https://cdn.jsdelivr.net/npm/@scalar/api-reference@^1";

  const scalarConfig: ScalarConfig = {
    ...opts.scalar,
    pageTitle: opts.meta?.title || "OpenAPI Documentation",
    cdn: CDN_URL,
    url: opts.spec,
  };

  return /* html */ getHtmlDocument(scalarConfig, opts.styles);
}
