# openapi-renderer

<!-- automd:badges color=yellow -->

[![npm version](https://img.shields.io/npm/v/openapi-renderer?color=yellow)](https://npmjs.com/package/openapi-renderer)
[![npm downloads](https://img.shields.io/npm/dm/openapi-renderer?color=yellow)](https://npm.chart.dev/openapi-renderer)

<!-- /automd -->

Simple [OpenAPI](https://www.openapis.org/) spec to HTML renderer.

> [!NOTE]
>  This is a new project, so feel free to share your ideas and contribute. **Contributions are more than welcome!**

## Supported Renderers

<div align="center">

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/e88beff0-9cf1-4265-9d24-264b61ba262c" alt="Swagger" />
      <br />
      <a href="https://github.com/swagger-api/swagger-ui">Swagger</a>
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/2f43f3f0-eb33-40ae-a26c-29a668242a26" alt="Scalar" />
      <br />
      <a href="https://github.com/scalar/scalar">Scalar</a>
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/11f9f386-ee95-437e-afcf-ced320a1284f" alt="Kong"  />
      <br />
      <a href="https://github.com/Kong/spec-renderer">Kong</a>
    </td>
  </tr>
</table>

</div>

## Usage

### `renderResponse`

Using `renderResponse(req, options)`, you can render UI into a standard [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object from an incoming [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request).

**Example:** Using [srvx](https://srvx.h3.dev) (same code works with Node.js, Deno, and Bun)

```js
import { serve } from "srvx";
import { renderResponse } from "openapi-renderer";

serve({
  fetch(req) {
    return renderResponse(req, {
      spec: "https://petstore.swagger.io/v2/swagger.json",
      allowCustomQuery: { spec: false, renderer: true },
    });
  },
});
```

### `renderHTML`

Using `renderHTML(options)`, you can render UI into an HTML string.

```js
import { renderHTML } from "openapi-renderer";

const html = renderHTML({
  spec: "https://petstore.swagger.io/v2/swagger.json",
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
- Install the latest LTS version of [Node.js](https://nodejs.org/en/)
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable`
- Install dependencies using `pnpm install`
- Run interactive tests using `pnpm dev`

## License

💛 Published under the [MIT](https://github.com/unjs/openapi-renderer/blob/main/LICENSE) license.
