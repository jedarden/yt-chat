# Test Specifications for LS6

---

## 1. Frontend XSS Edge Case Coverage

### 1.1 Unicode-Obfuscated Payloads
- **Arrange:** Prepare user input containing XSS payloads obfuscated with unicode (e.g., homoglyphs, zero-width spaces, unicode-encoded tags).
- **Act:** Render the input in all user-facing components (especially those using `escapeHtml` and React escaping).
- **Assert:** 
  - The rendered output does not execute scripts or alter the DOM.
  - The output is displayed as inert text.
  - No XSS alert or side effect occurs.

### 1.2 Malformed HTML
- **Arrange:** Prepare inputs with broken or incomplete HTML tags (e.g., `<img src=x onerror=alert(1)`, `<scr<script>ipt>alert(1)</scr<script>ipt>`).
- **Act:** Render the input in relevant components.
- **Assert:** 
  - No script execution or DOM injection.
  - Output is safely escaped and visible as text.

### 1.3 Curly Braces and Template Literals
- **Arrange:** Prepare inputs with curly braces (`{}`), template literals (`` `${...}` ``), and React expression edge cases.
- **Act:** Render in components.
- **Assert:** 
  - No code execution or template interpolation.
  - Output is displayed as literal text.

### 1.4 Long Strings and Null Bytes
- **Arrange:** Prepare very long strings and strings containing null bytes (`\0`), including XSS payloads.
- **Act:** Render in components.
- **Assert:** 
  - No truncation, injection, or execution.
  - Output is displayed as inert text.

### 1.5 Documentation and Rationale
- **Requirement:** All new tests must include comments explaining the rationale, coverage, and any relevant edge case details.

---

## 2. CI Enforcement: Threat Documentation

### 2.1 Threat Documentation Presence
- **Arrange:** Simulate the presence and absence of required threat documentation files (e.g., `THREAT_MODEL.md`).
- **Act:** Run the CI workflow or the threat doc check script.
- **Assert:** 
  - CI fails if threat documentation is missing or incomplete.
  - CI passes if documentation is present and complete.

### 2.2 Required Sections
- **Arrange:** Prepare threat docs with and without required sections (e.g., threat model, mitigations).
- **Act:** Run the check script.
- **Assert:** 
  - CI fails if any required section is missing.
  - CI passes if all sections are present.

### 2.3 Documentation
- **Requirement:** Document the required threat doc structure and the enforcement mechanism in the repository.

---

## 3. Backend Error Handling: Deterministic Status Codes in Test Environments

### 3.1 Test Environment: Fixed Status
- **Arrange:** Set `process.env.NODE_ENV = "test"`. Attempt unauthorized resource access.
- **Act:** Make API requests as an unauthorized user.
- **Assert:** 
  - Backend always returns a fixed status code (e.g., 403).
  - Error message is generic and does not leak resource existence.

### 3.2 Production Environment: Randomized Status
- **Arrange:** Set `process.env.NODE_ENV = "production"`. Attempt unauthorized access.
- **Act:** Make API requests as an unauthorized user.
- **Assert:** 
  - Backend randomly returns 403 or 404.
  - Error message remains generic.

### 3.3 Documentation
- **Requirement:** Code and tests must include comments explaining the rationale for environment-based logic.

---

## 4. CI Enforcement: Integration Test Presence and Failure

### 4.1 Integration Test Absence
- **Arrange:** Simulate the absence of integration tests (e.g., remove or skip them).
- **Act:** Run the CI workflow.
- **Assert:** 
  - CI fails if integration tests are missing.

### 4.2 Integration Test Failure
- **Arrange:** Simulate a failing integration test.
- **Act:** Run the CI workflow.
- **Assert:** 
  - CI fails if any integration test fails.

### 4.3 No Fallbacks
- **Requirement:** CI scripts must not contain fallback commands (e.g., `|| echo ...`). Tests must assert that CI fails hard.

### 4.4 Documentation
- **Requirement:** Document this enforcement in test coverage notes.

---

## 5. Frontend Output Escaping: Redundancy and Double-Escaping

### 5.1 Double-Escaping Detection
- **Arrange:** Prepare inputs that would be double-escaped if both `escapeHtml` and React escaping are applied (e.g., `<script>`).
- **Act:** Render in components using both mechanisms.
- **Assert:** 
  - Output is not double-escaped (e.g., `&lt;script&gt;`).
  - If double-escaping is present, document rationale or refactor to use a single mechanism.

### 5.2 Defense-in-Depth Rationale
- **Requirement:** If both mechanisms are retained, add comments explaining the defense-in-depth approach and any edge cases.

---

## 6. Documentation, Style, and Security Rationale

### 6.1 Descriptive Comments
- **Requirement:** All new and updated test and implementation files must include comments explaining security decisions, especially for escaping, error handling, and CI enforcement.

### 6.2 Self-Documenting Variables
- **Requirement:** Use clear, descriptive variable names in all new and updated code and tests.

### 6.3 Coverage Notes
- **Requirement:** Each test file must include a section or comment block summarizing coverage, rationale for test scenarios, and any known limitations.

---

## Test Coverage Notes

- All tests must be written before implementation (TDD).
- Each test must be self-contained and independent.
- Document any reliance on framework-level protections (e.g., React escaping).
- Maintain parity between test specs and actual test files.
- Update documentation and comments as requirements evolve.