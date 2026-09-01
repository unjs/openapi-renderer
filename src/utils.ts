const HTML_ESCAPES: Record<string, string | undefined> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/**
 * Escape a value for interpolation into HTML text content or a quoted attribute.
 */
export function escapeHTML(value: unknown): string {
  if (value === null || value === undefined) {
    return "";
  }
  return String(value).replaceAll(/["&'<>]/g, (char) => HTML_ESCAPES[char]!);
}

/**
 * Serialize a value to JSON that is safe to embed inside an inline `<script>`.
 *
 * `<` and `>` are emitted as `\u003C` / `\u003E` so a string in the payload can
 * never close the surrounding script element, and the JSON stays equivalent.
 * U+2028 and U+2029 are escaped because they are valid in JSON strings but are
 * line terminators in JavaScript source.
 *
 * Values `JSON.stringify` cannot represent become the literal `undefined`, so
 * the embedded expression stays valid JavaScript.
 */
export function escapeScriptJSON(value: unknown): string {
  const json = JSON.stringify(value);
  if (json === undefined) {
    return "undefined";
  }
  return json
    .replaceAll("<", String.raw`\u003C`)
    .replaceAll(">", String.raw`\u003E`)
    .replaceAll("\u2028", String.raw`\u2028`)
    .replaceAll("\u2029", String.raw`\u2029`);
}
