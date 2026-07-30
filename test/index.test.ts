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

describe("multiple sources", () => {
  it("renders scalar with sources", () => {
    const result = renderHTML({
      renderer: "scalar",
      scalar: {
        sources: [
          { url: "./a.json" },
          { url: "./b.json", title: "Auth", default: true },
        ],
      },
    });
    expect(result).toContain('"sources"');
    expect(result).toContain('"url":"./a.json"');
    expect(result).toContain('"url":"./b.json"');
    expect(result).toContain('"default":true');
    expect(result).not.toContain("./openapi.json");
  });

  it("renders scalar with embedded content source", () => {
    const result = renderHTML({
      renderer: "scalar",
      scalar: {
        sources: [{ content: { openapi: "3.1.1" } }],
      },
    });
    expect(result).toContain('"content":{"openapi":"3.1.1"}');
  });

  it("renders swagger with urls", () => {
    const result = renderHTML({
      renderer: "swagger",
      swagger: {
        urls: [
          { url: "./a.json" },
          { url: "./b.json", name: "Auth", default: true },
        ],
      },
    });
    expect(result).toContain('"urls"');
    expect(result).toContain('{"url":"./a.json","name":"./a.json"}');
    expect(result).toContain('{"url":"./b.json","name":"Auth"}');
    expect(result).toContain('"urls.primaryName":"Auth"');
    expect(result).not.toContain("./openapi.json");
  });
});
