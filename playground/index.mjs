import { serve } from "srvx";
import { renderResponse } from "openapi-renderer";

const DEMO_SPEC = "https://petstore.swagger.io/v2/swagger.json";

serve({
  fetch(req) {
    const { searchParams: query } = new URL(req.url);

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
