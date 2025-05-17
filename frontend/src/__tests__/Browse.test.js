// Browse.test.js - Tests for Browse component (LS4 requirements)
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Browse from "../components/Browse";

describe("Browse Component", () => {
  it("renders a list of items", () => {
    const items = [
      { id: 1, name: "Alpha" },
      { id: 2, name: "Beta" },
      { id: 3, name: "Gamma" },
      { id: 4, name: "Delta" },
      { id: 5, name: "Epsilon" },
    ];
    render(<Browse items={items} />);
    items.forEach((item, idx) => {
      expect(screen.getByTestId(`browse-item-${idx}`)).toHaveTextContent(item.name);
    });
  });

  it("handles empty state gracefully", () => {
    render(<Browse items={[]} />);
    expect(screen.getByText(/no items found/i)).toBeInTheDocument();
  });

  it("calls selection handler with correct item", () => {
    const items = [
      { id: 1, name: "Alpha" },
      { id: 2, name: "Beta" },
    ];
    const onSelect = jest.fn();
    render(<Browse items={items} onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId("browse-item-1"));
    expect(onSelect).toHaveBeenCalledWith(items[1]);
  });

  it("shows error message on data fetch failure", () => {
    render(<Browse error="Failed to fetch" />);
    expect(screen.getByRole("alert")).toHaveTextContent(/failed to fetch/i);
  });
it("renders potentially malicious item names as plain text and does not execute scripts", () => {
    const items = [
      { id: 1, name: "<script>window.__xss_executed=1</script>" },
      { id: 2, name: "&lt;img src=x onerror=alert(1)&gt;" },
      { id: 3, name: "<scr\u0069pt>alert(2)</scr\u0069pt>" },
      { id: 4, name: "<div>" + "A".repeat(1000) + "\0</div><img src=x onerror=alert(3)>" },
      { id: 5, name: "{dangerous}" },
    ];
    render(<Browse items={items} />);
    items.forEach((item, idx) => {
      const el = screen.getByTestId(`browse-item-${idx}`);
      // Should render as plain text, not as HTML
      expect(el).toHaveTextContent(item.name.replace("\0", ""));
    });
    // No script execution should occur
    expect(window.__xss_executed).toBeUndefined();
  });
it("does not use dangerouslySetInnerHTML unsafely in Browse component (LS8 security check)", () => {
    // Rationale: Using dangerouslySetInnerHTML can introduce XSS vulnerabilities if not properly sanitized.
    // This test asserts that Browse does not use dangerouslySetInnerHTML, or if present, is accompanied by explicit sanitization logic.
    expect(Browse.toString()).not.toMatch(/dangerouslySetInnerHTML/);
  });
});