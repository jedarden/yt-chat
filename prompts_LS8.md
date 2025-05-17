## Prompt [LS8_1]

### Context
The LS7 critic reflection identified medium-severity issues in test isolation and redundancy within [`frontend/src/__tests__/XSS.test.js`](frontend/src/__tests__/XSS.test.js), where multiple test suites define their own `UserInputDisplay` component and some tests rely on global state without proper reset. This can lead to confusion and unreliable test results.

### Objective
Refactor `XSS.test.js` to ensure test isolation and eliminate redundant component definitions.

### Focus Areas
- Define `UserInputDisplay` once at the top-level and reuse it across all tests.
- Add setup/teardown logic to reset any global state (e.g., `window.__xss_executed`) before each test.
- Remove redundant code and ensure all tests are independent.

### Code Reference
```js
function UserInputDisplay({ value }) {
  return <div data-testid="user-input">{value}</div>;
}
```

### Requirements
- Only one definition of `UserInputDisplay` in the file.
- All global state is reset before each test.
- No test relies on state from previous tests.

### Expected Improvements
- Improved test reliability and maintainability.
- Elimination of false positives/negatives due to state leakage.
- Cleaner, more understandable test code.

---

## Prompt [LS8_2]

### Context
The LS7 reflection notes incomplete edge case coverage for attribute-based XSS injection in `XSS.test.js`. While React escapes attributes by default, explicit tests for payloads like `<img src=x onerror=alert(1)>` are missing.

### Objective
Add explicit test cases for attribute-based XSS injection vectors.

### Focus Areas
- Test payloads that attempt attribute injection.
- Verify React's escaping and document this coverage.

### Code Reference
```js
const attrPayload = '<img src=x onerror=alert(1)>';
render(<UserInputDisplay value={attrPayload} />);
const el = screen.getByTestId("user-input");
expect(el).toHaveTextContent(attrPayload);
expect(window.__xss_executed).toBeUndefined();
```

### Requirements
- At least one test for attribute-based injection.
- Assert that no script execution or attribute-based XSS occurs.
- Document the rationale for this test.

### Expected Improvements
- Increased test coverage for XSS vectors.
- Explicit documentation of React's attribute escaping.

---

## Prompt [LS8_3]

### Context
The CI fallback pattern enforcement in [`ci_enforcement.test.js`](ci_enforcement.test.js) uses a regex that may cause false positives by matching legitimate uses of keywords outside fallback patterns.

### Objective
Refine the regex to reduce false positives and improve accuracy.

### Focus Areas
- Update the regex to match only fallback patterns as shell command suffixes.
- Consider ignoring matches inside comments or strings.

### Code Reference
```js
expect(ciContent).not.toMatch(/\|\| *(echo|true|:|printf)/);
```

### Requirements
- Regex matches only actual fallback patterns.
- False positives in comments/strings are minimized.
- Add or update tests to verify correct enforcement.

### Expected Improvements
- More accurate CI enforcement.
- Fewer false positives in legitimate code.

---

## Prompt [LS8_4]

### Context
The test suite currently checks for `dangerouslySetInnerHTML` in test components but not in main application components like Browse and Summary.

### Objective
Add explicit tests to assert that `dangerouslySetInnerHTML` is not used unsafely in main components.

### Focus Areas
- Check for `dangerouslySetInnerHTML` usage in [`frontend/src/components/Browse.js`](frontend/src/components/Browse.js) and [`frontend/src/components/Summary.js`](frontend/src/components/Summary.js).
- Ensure any usage is properly sanitized.

### Code Reference
```js
expect(UserInputDisplay.toString()).not.toMatch(/dangerouslySetInnerHTML/);
```

### Requirements
- Tests assert absence (or safe usage) of `dangerouslySetInnerHTML` in main components.
- Document rationale for these checks.

### Expected Improvements
- Reduced risk of XSS via unsafe HTML rendering.
- Improved auditability of security posture.

---

## Prompt [LS8_5]

### Context
The backend error handling coverage note in [`TEST_COVERAGE.md`](TEST_COVERAGE.md) could be clearer and more structured, with explicit references to test files and a summary of deterministic vs. randomized logic.

### Objective
Improve documentation clarity and auditability for backend error handling coverage.

### Focus Areas
- Reformat the note as a bullet list with explicit test file references.
- Add a summary table if possible.

### Code Reference
```markdown
- The backend's error handling logic is tested using deterministic status codes and error messages in the test environment to ensure predictable, repeatable results. In production, randomized status codes and generic error messages are used to prevent attackers from inferring resource existence or authorization state.
- Tests in `backend/tests/security.test.js` verify that error responses do not leak sensitive information and that all error handling branches are exercised.
```

### Requirements
- Clear, structured documentation.
- Explicit references to relevant test files.
- Summary table of error handling strategies.

### Expected Improvements
- Easier audit and review of test coverage.
- Improved clarity for future maintainers.