// Summary.test.js - Tests for Summary component (LS4 requirements)
import React from "react";
import { render, screen, rerender } from "@testing-library/react";
import Summary from "../components/Summary";

describe("Summary Component", () => {
  it("displays summary for selected item", () => {
    const item = {
      name: "Alpha",
      description: "Test item",
      date: "2025-05-16",
      status: "active",
    };
    render(<Summary item={item} />);
    expect(screen.getByText(/alpha/i)).toBeInTheDocument();
    expect(screen.getByText(/test item/i)).toBeInTheDocument();
    expect(screen.getByText(/2025-05-16/i)).toBeInTheDocument();
    expect(screen.getByText(/active/i)).toBeInTheDocument();
  });

  it("handles null or missing item", () => {
    render(<Summary item={null} />);
    expect(screen.getByText(/no item selected/i)).toBeInTheDocument();
    render(<Summary />);
    expect(screen.getByText(/no item selected/i)).toBeInTheDocument();
  });

  it("updates on prop change", () => {
    const { rerender } = render(<Summary item={{ name: "A" }} />);
    expect(screen.getByText(/a/i)).toBeInTheDocument();
    rerender(<Summary item={{ name: "B" }} />);
    expect(screen.getByText(/b/i)).toBeInTheDocument();
  });

  it("handles malformed item data", () => {
    const item = { name: "Alpha" }; // missing description, date, status
    render(<Summary item={item} />);
    expect(screen.getByText(/alpha/i)).toBeInTheDocument();
    expect(screen.getAllByText("N/A").length).toBeGreaterThanOrEqual(1);
  });
it("renders potentially malicious item fields as plain text and does not execute scripts", () => {
    const item = {
      name: "<script>window.__xss_executed=2</script>",
      description: "&lt;img src=x onerror=alert(4)&gt;",
      date: "<scr\u0069pt>alert(5)</scr\u0069pt>",
      status: "<div>" + "B".repeat(1000) + "\0</div><img src=x onerror=alert(6)>"
    };
    render(<Summary item={item} />);
    // Should render as plain text, not as HTML
    expect(screen.getByText(item.name.replace("\0", ""))).toBeInTheDocument();
    expect(screen.getByText(item.description)).toBeInTheDocument();
    expect(screen.getByText(item.date)).toBeInTheDocument();
    expect(screen.getByText(item.status.replace("\0", ""))).toBeInTheDocument();
    // No script execution should occur
    expect(window.__xss_executed).toBeUndefined();
  });
it("does not use dangerouslySetInnerHTML unsafely in Summary component (LS8 security check)", () => {
    // Rationale: Using dangerouslySetInnerHTML can introduce XSS vulnerabilities if not properly sanitized.
    // This test asserts that Summary does not use dangerouslySetInnerHTML, or if present, is accompanied by explicit sanitization logic.
    expect(Summary.toString()).not.toMatch(/dangerouslySetInnerHTML/);
  });
});