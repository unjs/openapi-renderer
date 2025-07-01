import { serve } from "srvx";
import { renderHTML } from "../src/renderer.ts";

const DEMO_SPEC = "https://petstore.swagger.io/v2/swagger.json";

serve({
  fetch(request) {
    const { searchParams: query } = new URL(request.url);

    const renderer = query.get("renderer");

    if (!renderer) {
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
    }

    const html = renderHTML({
      renderer,
      spec: query.get("spec") || DEMO_SPEC,
    });
    return new Response(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  },
});
