import type { RenderHTMLOptions } from "../types.ts";

// https://github.com/Redocly/redoc

export default function render(opts: RenderHTMLOptions): string {
  const CDN_URL =
    opts.redoc?.cdnURL ||
    "https://cdn.jsdelivr.net/npm/redoc/bundles/redoc.standalone.js";

  const redocOptions = opts.redoc || {};

  return /* html */ `<!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="${opts.meta?.description}" />
        <title>${opts.meta?.title}</title>
        <style>
          html, body { margin: 0; padding: 0; }
        </style>
        <style>${opts.styles}</style>
      </head>
      <body>
        <div id="redoc"></div>
        <script src="${CDN_URL}"></script>
        <script>
          const specUrl = ${JSON.stringify(opts.spec)};
          const options = ${JSON.stringify(redocOptions)};
          Redoc.init(specUrl, options, document.getElementById("redoc"));
        </script>
      </body>
    </html>`;
}
