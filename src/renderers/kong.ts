import type { SpecRendererNitroConfig as KongConfig } from "@kong/spec-renderer";
import type { RenderOptions } from "../types.ts";

// https://github.com/Kong/spec-renderer

export default function render(opts: RenderOptions): string {
  const CDN_URL =
    opts.kong?.cdnURL || "https://cdn.jsdelivr.net/npm/@kong/spec-renderer@^1";

  const kongConfig: KongConfig = {
    ...opts.kong,
    specUrl: opts.spec,
    navigationType: "hash", // Use hash-based navigation
    hideInsomniaTryIt: true, // Hide the "Try it in Insomnia" button
    showPoweredBy: opts.kong?.showPoweredBy === false ? undefined : true, // Pass `undefined` if showPoweredBy is false
  };

  const componentAttributes = objectToAttributes(kongConfig);

  return /* html */ `<!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="${opts.meta?.description || ""}" />
        <title>${opts?.meta?.title || ""}</title>
        <link rel="stylesheet" href="${CDN_URL}/dist/spec-renderer.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap" rel="stylesheet">
        <style>
          html, body { padding: 0; margin: 0; height: 100%;}
          body { font-family: 'Inter', Roboto, Helvetica, sans-serif; }
        </style>
        <style>${opts.styles}</style>
      </head>
      <body>
        <kong-spec-renderer spec="" ${componentAttributes} />
        <script type="module">
        import { registerKongSpecRenderer } from '${CDN_URL}/dist/kong-spec-renderer.web-component.es.js'
        const hash = window.location.hash;
        if (hash) {
          const path = hash.substring(1); // Remove the # character
          const renderer = document.querySelector('kong-spec-renderer');
          if (renderer) {
            renderer.setAttribute('current-path', path);
          }
        }
        registerKongSpecRenderer()
        </script>
      </body>
    </html>`;
}

// Helper function to convert object properties to HTML attributes
function objectToAttributes(obj: Record<string, any>): string {
  const result: string[] = [];

  for (const [key, value] of Object.entries(obj)) {
    if (value === null || value === undefined || String(value).trim() === "") {
      continue;
    }

    // Convert key to kebab-case more efficiently
    const kebabKey = key
      .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
      .replace(/_/g, "-")
      .toLowerCase();

    // Escape quotes in value
    const attrValue = String(value).replace(/"/g, "&quot;");

    result.push(`${kebabKey}="${attrValue}"`);
  }

  return result.join(" ");
}
