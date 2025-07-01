# openapi-renderer

<!-- automd:badges color=yellow -->

[![npm version](https://img.shields.io/npm/v/openapi-renderer?color=yellow)](https://npmjs.com/package/openapi-renderer)
[![npm downloads](https://img.shields.io/npm/dm/openapi-renderer?color=yellow)](https://npm.chart.dev/openapi-renderer)

<!-- /automd -->

Simple [OpenAPI](https://www.openapis.org/) spec renderer.

Supported UIs:

- [Swagger](https://github.com/swagger-api/swagger-ui)
- [Scalar](https://github.com/scalar/scalar)
- [Kong](https://github.com/Kong/spec-renderer)

## Usage Example

```js
import { serve } from "srvx";
import { renderToString } from "../src/render.ts";

serve({
  fetch(request) {
    const html = renderToString({
      renderer: "swagger", // or "scalar" or "kong"
      spec: "https://petstore.swagger.io/v2/swagger.json",
    });
    return new Response(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  },
});
```

## Options

- `renderer`: Renderer UI. Possible values: `"swagger"` | `"scalar"` | `"kong"`
- `spec`: URL to OpenAPI spec JSON to render
- `meta`: Metadata for the OpenAPI documentation.
- `styles`: Additional HTML styles.
- `scalar`: Scalar UI configuration.
- `swagger`: Swagger UI configuration.
- `kong`: Kong Spec Renderer UI configuration.

## Development

- Clone this repository
- Install latest LTS version of [Node.js](https://nodejs.org/en/)
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable`
- Install dependencies using `pnpm install`
- Run interactive tests using `pnpm dev`

## License

<!-- automd:contributors license=MIT -->

Published under the [MIT](https://github.com/unjs/openapi-renderer/blob/main/LICENSE) license.
Made by [community](https://github.com/unjs/openapi-renderer/graphs/contributors) 💛
<br><br>
<a href="https://github.com/unjs/openapi-renderer/graphs/contributors">
<img src="https://contrib.rocks/image?repo=unjs/openapi-renderer" />
</a>

<!-- /automd -->

<!-- automd:with-automd -->

---

_🤖 auto updated with [automd](https://automd.unjs.io)_

<!-- /automd -->
