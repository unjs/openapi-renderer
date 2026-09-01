import type { RenderHTMLOptions } from "../types.ts";
import { escapeHTML, escapeScriptJSON } from "../utils.ts";

// https://github.com/swagger-api/swagger-ui

export default function render(opts: RenderHTMLOptions) {
  const CDN_URL =
    opts.swagger?.cdnURL || "https://cdn.jsdelivr.net/npm/swagger-ui-dist@^5";

  return /* html */ `<!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="${escapeHTML(opts.meta?.description)}" />
        <title>${escapeHTML(opts.meta?.title)}</title>
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
              url: ${escapeScriptJSON(opts.spec)},
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
