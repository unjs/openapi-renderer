import type { RenderHTMLOptions } from "../types.ts";

// https://github.com/swagger-api/swagger-ui

export default function render(opts: RenderHTMLOptions) {
  const CDN_URL =
    opts.swagger?.cdnURL || "https://cdn.jsdelivr.net/npm/swagger-ui-dist@^5";

  // With `urls`, Swagger UI shows a document selector dropdown and the
  // top-level `spec` option is ignored
  const specConfig: Record<string, any> = opts.swagger?.urls?.length
    ? {
        urls: opts.swagger.urls.map(({ url, name }) => ({
          url,
          name: name || url,
        })),
      }
    : { url: opts.spec };

  const primary = opts.swagger?.urls?.find((entry) => entry.default);
  if (primary) {
    specConfig["urls.primaryName"] = primary.name || primary.url;
  }

  return /* html */ `<!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="${opts.meta?.description}" />
        <title>${opts.meta?.title}</title>
        <link rel="stylesheet" href="${CDN_URL}/swagger-ui.css" />
        <style>${opts.styles}</style>
      </head>
      <body>
        <div id="swagger-ui"></div>
        <script src="${CDN_URL}/swagger-ui-bundle.js" crossorigin></script>
        <script
          src="${CDN_URL}/swagger-ui-standalone-preset.js"
          crossorigin
        ></script>
        <script>
          window.onload = () => {
            window.ui = SwaggerUIBundle({
              ...${JSON.stringify(specConfig)},
              dom_id: "#swagger-ui",
              presets: [
                SwaggerUIBundle.presets.apis,
                SwaggerUIStandalonePreset,
              ],
              layout2: "StandaloneLayout",
            });
          };
        </script>
      </body>
    </html> `;
}
