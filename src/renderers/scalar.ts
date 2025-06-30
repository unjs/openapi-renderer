import type { ApiReferenceConfiguration as ScalarConfig } from "@scalar/api-reference";
import type { RenderOptions } from "../types.ts";

// https://github.com/scalar/scalar

export default function render(opts: RenderOptions): string {
  const CDN_URL =
    opts.scalar?.cdnURL ||
    "https://cdn.jsdelivr.net/npm/@scalar/api-reference@^1";

  const scalarConfig: ScalarConfig = {
    ...opts.scalar,
    url: opts.spec,
    // @ts-expect-error (missing types?)
    spec: { url: opts.specURL, ...opts.scalar?.spec },
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
        <script
          id="api-reference"
          data-configuration="${JSON.stringify(scalarConfig)
            .split('"')
            .join("&quot;")}"
        ></script>
        <script src="${CDN_URL}"></script>
      </body>
    </html>`;
}
