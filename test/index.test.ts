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
