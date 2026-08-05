import { describe, expect, it } from "vitest";
import { renderHTML } from "../src/render.ts";

const rendererNames = ["kong", "scalar", "swagger"] as const;

describe("renderHTML", () => {
  for (const name of rendererNames) {
    it(`renders with ${name}`, () => {
      const result = renderHTML({ renderer: name });
      expect(result).toContain("./openapi.json");
    });

    it(`escapes metadata with ${name}`, () => {
      const result = renderHTML({
        renderer: name,
        meta: {
          title: `API </title><script>alert("title")</script>`,
          description: `Docs & more"><script>alert('description')</script>`,
        },
      });

      expect(result).toContain(
        `<title>API &lt;/title&gt;&lt;script&gt;alert(&quot;title&quot;)&lt;/script&gt;</title>`,
      );
      expect(result).toContain(
        `content="Docs &amp; more&quot;&gt;&lt;script&gt;alert(&#39;description&#39;)&lt;/script&gt;"`,
      );
      expect(result).not.toContain(`<script>alert("title")</script>`);
      expect(result).not.toContain(`<script>alert('description')</script>`);
    });
  }
});
