# Test Specifications for LS5

## 1. Output Sanitization in User-Facing Components

### 1.1 General Output Escaping
- All user-rendered content in React components must be explicitly escaped or sanitized.
- Reliance on React's default escaping must be documented; any use of `dangerouslySetInnerHTML` must be accompanied by explicit sanitization.
- Prohibit unsanitized HTML injection in all components.

### 1.2 Edge Case and Bypass Testing
- Test rendering of user content containing:
  - Standard XSS payloads (e.g., `<img src=x onerror=alert(1)>`)
  - Encoded/bypassed payloads (e.g., `<script>alert(1)</script>`, unicode obfuscation)
  - Long strings, null bytes, and malformed HTML
  - Content with React escape edge cases (e.g., curly braces, template literals)
- Assert that no script execution or DOM injection occurs in any case.

### 1.3 Component Coverage
- Tests must cover all user-facing components, including but not limited to:
  - [`frontend/src/components/Browse.js`](frontend/src/components/Browse.js)
  - [`frontend/src/components/Summary.js`](frontend/src/components/Summary.js)
  - Any component rendering user-supplied data

## 2. Backend Authorization and Resource Ownership (IDOR)

### 2.1 Authorization Enforcement
- For every resource access endpoint, verify:
  - Only the resource owner or authorized user can access/modify the resource
  - Unauthorized access attempts (including valid tokens for other users) are denied

### 2.2 Error Detail Assertions
- Tests must assert on:
  - HTTP status (e.g., 403, 404)
  - Error message/body content (e.g., "Access denied", "Resource not found")
  - No information leakage about resource existence or ownership

### 2.3 Edge Cases
- Attempt access with:
  - No token
  - Expired/invalid token
  - Valid token for a different user
  - Resource IDs that do not exist or are not owned by the user

## 3. CI Enforcement: Threat Documentation & Integration Tests

### 3.1 Threat Documentation Check
- CI must fail if threat documentation (e.g., `THREAT_MODEL.md`, `threats/`) is missing or incomplete.
- Tests must simulate removal/absence of threat docs and assert CI failure.

### 3.2 Integration Test Check
- CI must fail if integration tests are missing, skipped, or fail.
- Tests must simulate missing or failing integration tests and assert CI failure.

### 3.3 No Fallbacks Allowed
- CI scripts must not contain fallback commands (e.g., `|| echo ...`).
- Tests must assert that CI fails hard on missing scripts or test failures.

---

## Test Coverage Notes

- All tests must be written before implementation (TDD).
- Each test must be self-contained and independent.
- Document any reliance on framework-level protections (e.g., React escaping).
- Maintain parity between test specs and actual test files.