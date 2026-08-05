export function escapeHTML(value: string): string {
  return value.replaceAll(/[&<>"']/g, (character) => {
    switch (character) {
      case "&": {
        return "&amp;";
      }
      case "<": {
        return "&lt;";
      }
      case ">": {
        return "&gt;";
      }
      case '"': {
        return "&quot;";
      }
      default: {
        return "&#39;";
      }
    }
  });
}
