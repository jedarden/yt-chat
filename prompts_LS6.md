## Prompt LS6_1

### Context
The LS5 reflection identified incomplete test coverage for XSS edge cases in the frontend. While `escapeHtml` and React's default escaping are used, tests do not cover unicode obfuscation, malformed HTML, curly braces, template literals, long strings, or null bytes.

### Task
Expand the frontend XSS test suite to comprehensively cover all edge cases and payload variants that could bypass or challenge output escaping.

### Requirements
- Add tests in [`frontend/src/__tests__/XSS.test.js`](frontend/src/__tests__/XSS.test.js) for:
  - Unicode-obfuscated payloads
  - Malformed HTML
  - Curly braces and template literals
  - Long strings and null bytes
- Ensure tests assert on rendered output and absence of XSS execution.
- Document rationale and coverage in test file comments.

### Previous Issues
- Missing tests for advanced XSS payloads and obfuscation techniques.

### Expected Output
A fully updated XSS test suite with comprehensive coverage and clear documentation of test scenarios.

---

## Prompt LS6_2

### Context
The CI workflow references a threat documentation check script (`scripts/check-threat-docs.sh`), but the script is missing from the repository, causing the check to fail or be skipped.

### Task
Implement the missing threat documentation check script and ensure CI strictly enforces its presence and correct execution.

### Requirements
- Create [`scripts/check-threat-docs.sh`](scripts/check-threat-docs.sh) to verify the presence and completeness of threat documentation (e.g., `THREAT_MODEL.md`).
- Script should check for required sections and exit nonzero if incomplete.
- Update CI workflow to remove any fallback or bypass for this check.
- Add or update documentation to describe the threat doc requirements and CI enforcement.

### Previous Issues
- CI step for threat docs was non-functional due to missing script.

### Expected Output
A working threat documentation check script, strict CI enforcement, and updated documentation.

---

## Prompt LS6_3

### Context
The backend randomly returns 403 or 404 for unauthorized resource access to obfuscate resource existence. This improves security but causes automated tests to be flaky and unreliable.

### Task
Refactor backend error handling to use deterministic status codes in test environments, while preserving randomized behavior in production.

### Requirements
- Update backend logic (e.g., in [`backend/index.js`](backend/index.js)) to return a fixed status (e.g., 403) when `process.env.NODE_ENV === "test"`.
- Ensure tests assert on the fixed status in test environments.
- Maintain randomized status in production for security.
- Add comments explaining the rationale and environment-based logic.

### Previous Issues
- Automated tests unreliable due to random status codes.

### Expected Output
Backend code and tests that are deterministic in test environments and secure in production, with clear documentation.

---

## Prompt LS6_4

### Context
The CI workflow runs integration tests but does not verify that CI fails if integration tests are missing or fail. There is no test or simulation for this requirement.

### Task
Add a test or script that simulates the absence or failure of integration tests and asserts that CI fails as required.

### Requirements
- Implement a test or script (e.g., in [`ci_enforcement.test.js`](ci_enforcement.test.js)) that simulates missing or failing integration tests.
- Ensure CI fails in these scenarios.
- Document this behavior in test coverage notes.

### Previous Issues
- No verification that CI fails on missing or failing integration tests.

### Expected Output
A test or script that enforces CI failure on missing/failing integration tests, with documentation.

---

## Prompt LS6_5

### Context
Both `escapeHtml` and React's default escaping are used in frontend components, which may be redundant and could cause double-escaping.

### Task
Review and refactor output escaping logic in frontend components to avoid redundancy and potential double-escaping, or document the rationale for using both.

### Requirements
- Audit [`frontend/src/components/Browse.js`](frontend/src/components/Browse.js) and [`frontend/src/components/Summary.js`](frontend/src/components/Summary.js) for double-escaping.
- Refactor to use a single escaping mechanism if safe, or document the defense-in-depth rationale.
- Add comments explaining the chosen approach and any edge cases.

### Previous Issues
- Potential redundancy and risk of double-escaping in output rendering.

### Expected Output
Frontend components with clear, justified output escaping logic and documentation.

---

## Prompt LS6_6

### Context
LS5 reflection recommends improved documentation, style, and security practices across the codebase.

### Task
Update code and test files to maintain consistent, descriptive comments, clear variable names, and comprehensive coverage notes, especially regarding security decisions.

### Requirements
- Review all test and implementation files for:
  - Descriptive comments explaining security decisions
  - Self-documenting variable names
  - Coverage notes and rationale for test scenarios
- Update documentation as needed to reflect current security and testing practices.

### Previous Issues
- Inconsistent comments and documentation of security/test rationale.

### Expected Output
A codebase with improved documentation, style, and clarity, especially in security-related areas.