import { describe, expect, it } from "vitest";
import { renderHTML } from "../src/render.ts";

const rendererNames = ["kong", "scalar", "swagger"] as const;

describe("renderHTML", () => {
  for (const name of rendererNames) {
    it(`renders with ${name}`, () => {
      const result = renderHTML({ renderer: name });
      expect(result).toContain("./openapi.json");
    });
  }
});

describe("renderHTML escaping", () => {
  const meta = {
    title: `</title><script>alert("title")</script>`,
    description: `" onload="alert('desc')`,
  };

  for (const name of rendererNames) {
    describe(name, () => {
      it("escapes meta title and description", () => {
        const result = renderHTML({ renderer: name, meta });

        expect(result).not.toContain(meta.title);
        expect(result).not.toContain(meta.description);
        expect(result).toContain(
          "<title>&lt;/title&gt;&lt;script&gt;alert(&quot;title&quot;)&lt;/script&gt;</title>",
        );
        expect(result).toContain(
          `content="&quot; onload=&quot;alert(&#39;desc&#39;)"`,
        );
      });

      it("escapes the spec path", () => {
        const spec = `</script><script>alert("spec")</script>`;
        const result = renderHTML({ renderer: name, spec });

        expect(result).not.toContain("</script><script>");
      });
    });
  }

  it("escapes scalar configuration embedded in the inline script", () => {
    const result = renderHTML({
      renderer: "scalar",

      scalar: { theme: `</script><script>alert(1)</script>` as any },
    });

    expect(result).not.toContain("</script><script>");
    expect(result).toContain(String.raw`\u003C/script\u003E`);
  });

  it("escapes kong configuration rendered as component attributes", () => {
    const result = renderHTML({
      renderer: "kong",

      kong: { basePath: `" onfocus="alert(1)` as any },
    });

    expect(result).not.toContain(`onfocus="alert(1)"`);
    expect(result).toContain(`base-path="&quot; onfocus=&quot;alert(1)"`);
  });

  it("escapes an ampersand so an entity in a kong attribute is not decoded", () => {
    const result = renderHTML({
      renderer: "kong",

      kong: { basePath: `&quot; onfocus=&quot;alert(1)` as any },
    });

    // Escaping only `"` would leave the literal entities intact, and the parser
    // would decode them back into the quotes that break out of the attribute.
    expect(result).toContain(
      `base-path="&amp;quot; onfocus=&amp;quot;alert(1)"`,
    );
  });
});
