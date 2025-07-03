import type { ApiReferenceConfiguration as ScalarConfig } from "@scalar/api-reference";
import type { RenderHTMLOptions } from "../types.ts";

// https://github.com/scalar/scalar

export default function render(opts: RenderHTMLOptions): string {
  const CDN_URL =
    opts.scalar?.cdnURL ||
    "https://cdn.jsdelivr.net/npm/@scalar/api-reference@^1";

  const scalarConfig: ScalarConfig = {
    ...opts.scalar,
    url: opts.spec,
  };

  return /* html */ `<!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="${opts.meta?.description}" />
        <title>${opts.meta?.title}</title>
        <style>${opts.styles}</style>
      </head>
      <body>
        <div id="app"></div>

        <script src="${CDN_URL}"></script>

        <script>
          Scalar.createApiReference('#app', ${JSON.stringify(scalarConfig)})
        </script>
      </body>
    </html>`;
}
