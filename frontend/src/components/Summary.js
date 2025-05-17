/**
 * Output Escaping Rationale (LS7)
 *
 * - React escapes all output by default, which is sufficient for most use cases and prevents XSS.
 * - We do NOT use escapeHtml or dangerouslySetInnerHTML in this component.
 * - This approach avoids double-escaping and maintains defense-in-depth by relying on React's proven escaping.
 * - If requirements change to use dangerouslySetInnerHTML, escapeHtml or equivalent sanitization MUST be applied.
 * - See test_specs_LS7.md for rationale, security requirements, and test coverage.
 */
 // Summary.js - Summary Component for displaying item details
import React from "react";
import PropTypes from "prop-types";

function Summary({ item }) {
  if (!item) return <div>No item selected</div>;

  // Assume summary fields: name, description, date, status
  const { name, description, date, status } = item;

  return (
    <div>
      <div>
        {/* Output is escaped by React; see rationale at top of file. */}
        <strong>Name:</strong> {name || "N/A"}
      </div>
      <div>
        <strong>Description:</strong> {description || "N/A"}
      </div>
      <div>
        <strong>Date:</strong> {date || "N/A"}
      </div>
      <div>
        <strong>Status:</strong> {status || "N/A"}
      </div>
    </div>
  );
}

Summary.propTypes = {
  item: PropTypes.object,
};

export default Summary;