## Prompt LS7_1

### Context
The LS6 critic reflection identified that the test-to-requirement mapping in [`TEST_COVERAGE.md`](TEST_COVERAGE.md) is outdated and does not reference new or changed tests (e.g., XSS edge cases, CI enforcement, backend error handling). This reduces traceability and may hinder future audits.

### Objective
Update the test-to-requirement mapping table in [`TEST_COVERAGE.md`](TEST_COVERAGE.md) to include all new and changed tests from LS6.

### Focus Areas
- Add entries for XSS edge case tests
- Add entries for CI enforcement tests
- Add entries for backend error handling tests

### Code Reference
```markdown
| Test File / Name                | Spec Section(s)         | Requirement/User Story | Notes |
|---------------------------------|------------------------|-----------------------|-------|
| frontend/src/__tests__/Search.test.js ...                | ...                    | ...                   |      |
```

### Requirements
- Ensure all new/changed tests are referenced
- Provide clear notes for each entry
- Maintain table formatting

### Expected Improvements
- Complete traceability between tests and requirements
- Improved auditability
- Reduced documentation gaps

---

## Prompt LS7_2

### Context
Redundant rationale comments for output escaping are present in multiple frontend components. Consolidating these comments will improve readability and maintainability.

### Objective
Consolidate detailed output escaping rationale into a single top-level comment per file in [`frontend/src/components/Browse.js`](frontend/src/components/Browse.js) and [`frontend/src/components/Summary.js`](frontend/src/components/Summary.js), using concise inline comments elsewhere.

### Focus Areas
- Remove repeated rationale comments
- Add a single detailed block comment at the top of each file
- Use brief inline comments as needed

### Code Reference
```jsx
{/* Explicitly escape user-supplied content for defense-in-depth.
    React escapes by default, but we use escapeHtml for clarity and security.
    Do NOT use dangerouslySetInnerHTML unless content is sanitized. */}
/**
 * LS6: Output Escaping Rationale
 * ...
 */
```

### Requirements
- One detailed rationale comment per file
- Brief inline comments only where necessary
- No redundant explanations

### Expected Improvements
- Improved code readability
- Easier maintenance of security rationale
- Reduced comment clutter

---

## Prompt LS7_3

### Context
There is no automated test to detect double-escaping in frontend components, which could allow regressions if output is accidentally double-escaped in the future.

### Objective
Add an automated test to [`frontend/src/__tests__/XSS.test.js`](frontend/src/__tests__/XSS.test.js) that fails if output is double-escaped (e.g., checks for `<script>` instead of `<script>`).

### Focus Areas
- Test for double-escaping in rendered output
- Cover relevant components (Browse, Summary)

### Code Reference
```js
// No current test for double-escaping
```

### Requirements
- Add a test that would fail if double-escaping occurs
- Ensure test covers all relevant components
- Document the rationale for the test

### Expected Improvements
- Early detection of double-escaping regressions
- Improved output correctness
- Stronger defense-in-depth

---

## Prompt LS7_4

### Context
The CI enforcement test only checks for `|| echo` as a fallback pattern, missing other possible patterns like `|| true`, `|| :`, or `|| printf`.

### Objective
Expand the CI enforcement test in [`ci_enforcement.test.js`](ci_enforcement.test.js) to catch all common fallback patterns.

### Focus Areas
- Regex for fallback patterns in CI scripts
- Comprehensive pattern coverage

### Code Reference
```js
expect(ciContent).not.toMatch(/\|\| *echo/);
```

### Requirements
- Update regex to include `echo`, `true`, `:`, `printf`
- Ensure test fails for any of these patterns
- Document the rationale for expanded coverage

### Expected Improvements
- More robust CI enforcement
- Reduced risk of untracked vulnerabilities
- Improved test coverage

---

## Prompt LS7_5

### Context
There is no explicit coverage note in [`TEST_COVERAGE.md`](TEST_COVERAGE.md) for the backend's deterministic/randomized status code logic in test/production environments.

### Objective
Add a note in [`TEST_COVERAGE.md`](TEST_COVERAGE.md) explaining how backend error handling is tested and why the approach was chosen.

### Focus Areas
- Documentation of backend error handling tests
- Rationale for deterministic/randomized logic

### Code Reference
```markdown
// No current note for backend error handling coverage
```

### Requirements
- Add a clear note on backend error handling test coverage
- Explain rationale for approach
- Place note in appropriate section of TEST_COVERAGE.md

### Expected Improvements
- Improved documentation completeness
- Easier future audits
- Clearer rationale for test strategies