/**
 * Output Escaping Rationale (LS7)
 *
 * - React escapes all output by default, which is sufficient for most use cases and prevents XSS.
 * - We do NOT use escapeHtml or dangerouslySetInnerHTML in this component.
 * - This approach avoids double-escaping and maintains defense-in-depth by relying on React's proven escaping.
 * - If requirements change to use dangerouslySetInnerHTML, escapeHtml or equivalent sanitization MUST be applied.
 * - See test_specs_LS7.md for rationale, security requirements, and test coverage.
 */
 // Browse.js - Browse Component for listing items
import React from "react";
import PropTypes from "prop-types";

function Browse({ items = [], onSelect, error, loading }) {
  if (loading) return <div>Loading...</div>;
  if (error) return <div role="alert">Error: {error}</div>;
  if (!items || items.length === 0) return <div>No items found</div>;

  return (
    <ul>
      {items.map((item, idx) => (
        <li
          key={item.id || idx}
          tabIndex={0}
          onClick={() => onSelect && onSelect(item)}
          data-testid={`browse-item-${idx}`}
        >
          {/* Output is escaped by React; see rationale at top of file. */}
          {item.name || "N/A"}
        </li>
      ))}
    </ul>
  );
}

Browse.propTypes = {
  items: PropTypes.array,
  onSelect: PropTypes.func,
  error: PropTypes.string,
  loading: PropTypes.bool,
};

export default Browse;