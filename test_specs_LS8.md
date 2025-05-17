# LS8 Test Specifications

This document defines the comprehensive test specifications for LS8, addressing actionable issues from the previous reflection. Each section follows the Arrange-Act-Assert (AAA) pattern and includes documentation requirements for clarity and auditability.

---

## 1. Test Isolation & Redundancy in `XSS.test.js`

**Objective:**  
Ensure all XSS tests are isolated, non-redundant, and maintainable.

**Test Specification:**
- **Arrange:**  
  - Define `UserInputDisplay` once at the top of the file.
  - Before each test, reset all relevant global state (e.g., `window.__xss_executed`).
- **Act:**  
  - Render the component and perform the test action.
- **Assert:**  
  - Verify the test result is independent of any previous test.
  - Confirm no test relies on state set by another.
- **Documentation:**  
  - Add comments explaining the rationale for single component definition and state reset.
  - Document the setup/teardown logic.

**Example Test Case Structure:**
```js
// Arrange: UserInputDisplay defined once above
beforeEach(() => {
  window.__xss_executed = undefined;
});
// Act: render and interact
// Assert: check for expected output and state
```

---

## 2. Attribute-based XSS Edge Case Coverage

**Objective:**  
Explicitly test for attribute-based XSS injection vectors.

**Test Specification:**
- **Arrange:**  
  - Prepare payloads such as `<img src=x onerror=alert(1)>`.
  - Ensure global state is reset.
- **Act:**  
  - Render `UserInputDisplay` with the payload as input.
- **Assert:**  
  - The rendered output contains the payload as text, not as an active element.
  - `window.__xss_executed` remains `undefined`.
- **Documentation:**  
  - Comment on React's attribute escaping and the purpose of the test.
  - Reference the specific payloads tested.

**Example Test Case Structure:**
```js
const attrPayload = '<img src=x onerror=alert(1)>';
render(<UserInputDisplay value={attrPayload} />);
const el = screen.getByTestId("user-input");
expect(el).toHaveTextContent(attrPayload);
expect(window.__xss_executed).toBeUndefined();
```

---

## 3. CI Regex Precision

**Objective:**  
Ensure CI fallback pattern enforcement regex matches only actual fallback patterns and minimizes false positives.

**Test Specification:**
- **Arrange:**  
  - Prepare CI configuration content with various uses of `||`, including in comments, strings, and legitimate fallback patterns.
- **Act:**  
  - Apply the regex to the content.
- **Assert:**  
  - Regex matches only true fallback patterns (e.g., `command || echo ...`).
  - No matches in comments or string literals.
- **Documentation:**  
  - Comment on the rationale for regex refinement.
  - Document test cases for both positive and negative matches.

**Example Test Case Structure:**
```js
const ciContent = `
  # This is a comment with ||
  echo "string with ||"
  command || echo "fallback"
`;
expect(ciContent).not.toMatch(/* refined regex */);
```

---

## 4. Explicit Checks for `dangerouslySetInnerHTML` in Main Components

**Objective:**  
Assert that `dangerouslySetInnerHTML` is not used unsafely in main components.

**Test Specification:**
- **Arrange:**  
  - Import main components: `Browse.js`, `Summary.js`.
- **Act:**  
  - Convert component source to string.
- **Assert:**  
  - The string does not contain `dangerouslySetInnerHTML`, or if present, is accompanied by proper sanitization logic.
- **Documentation:**  
  - Comment on the security rationale for this check.
  - Document any exceptions and their justifications.

**Example Test Case Structure:**
```js
import Browse from '../components/Browse';
expect(Browse.toString()).not.toMatch(/dangerouslySetInnerHTML/);
```

---

## 5. Backend Error Handling Documentation Clarity

**Objective:**  
Improve documentation of backend error handling test coverage.

**Specification:**
- **Arrange:**  
  - Review all backend error handling tests, especially in `backend/tests/security.test.js`.
- **Act:**  
  - Summarize coverage as a bullet list, referencing each relevant test file.
  - Add a summary table distinguishing deterministic vs. randomized logic.
- **Assert:**  
  - Documentation is clear, structured, and references all relevant files.
- **Documentation:**  
  - Use bullet points and a summary table as shown below.

**Example Documentation Structure:**
```markdown
- Error handling logic is tested with deterministic status codes and error messages in the test environment for repeatability.
- In production, randomized status codes and generic messages prevent information leakage.
- `backend/tests/security.test.js` verifies no sensitive information is leaked and all error branches are exercised.

| Environment | Status Codes | Error Messages | Test File(s)                  |
|-------------|-------------|---------------|-------------------------------|
| Test        | Deterministic| Specific      | security.test.js, api_transcript.test.js |
| Production  | Randomized  | Generic       | N/A (runtime logic)           |