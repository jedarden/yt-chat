// escapeHtml.js
// Utility for explicit HTML escaping of user-supplied content in React components.
// This function replaces &, <, >, ", and ' with their HTML entity equivalents.

export function escapeHtml(str) {
  if (typeof str !== "string") return str;
  return str.replace(/[&<>"']/g, function (char) {
    switch (char) {
      case "&":
        return "\u0026amp;";
      case "<":
        return "\u0026lt;";
      case ">":
        return "\u0026gt;";
      case '"':
        return "\u0026quot;";
      case "'":
        return "\u0026#39;";
      default:
        return char;
    }
  });
}

// END OF FILE