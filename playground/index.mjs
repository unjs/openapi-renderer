import { serve } from "srvx";
import { renderResponse } from "openapi-renderer";

const DEMO_SPEC = "https://petstore.swagger.io/v2/swagger.json";
const DEMO_SPEC_V3 = "https://petstore3.swagger.io/api/v3/openapi.json";

serve({
  fetch(req) {
    const { searchParams: query } = new URL(req.url);

    if (query.get("multi") === "scalar") {
      return renderResponse(req, {
        renderer: "scalar",
        scalar: {
          sources: [
            { url: DEMO_SPEC, title: "Petstore v2" },
            { url: DEMO_SPEC_V3, title: "Petstore v3", default: true },
          ],
        },
      });
    }

    if (query.get("multi") === "swagger") {
      return renderResponse(req, {
        renderer: "swagger",
        swagger: {
          urls: [
            { url: DEMO_SPEC, name: "Petstore v2" },
            { url: DEMO_SPEC_V3, name: "Petstore v3", default: true },
          ],
        },
      });
    }

    if (query.get("renderer")) {
      return renderResponse(req, {
        allowCustomQuery: { spec: true, renderer: true },
      });
    }

    return new Response(
      /* html */ `<html>
          <head>
            <title>OpenAPI Renderer Playground</title>
          </head>
          <body>
            <h1>OpenAPI Renderer Playground</h1>
            <p>
              <ul>
                <li>
                  <a href="/?renderer=swagger&spec=${DEMO_SPEC}">Swagger UI</a>
                </li>
                <li>
                  <a href="/?renderer=scalar&spec=${DEMO_SPEC}">Scalar UI</a>
                </li>
                <li>
                  <a href="/?renderer=kong&spec=${DEMO_SPEC}">Kong UI</a>
                </li>
                <li>
                  <a href="/?multi=scalar">Scalar UI (multiple sources)</a>
                </li>
                <li>
                  <a href="/?multi=swagger">Swagger UI (multiple sources)</a>
                </li>
            </p>
          </body>
        </html>`,
      {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
        },
      },
    );
  },
});
