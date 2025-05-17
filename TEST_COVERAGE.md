# TEST_COVERAGE.md

This document maps each test to its corresponding requirement/spec/user story as per [`test_specs_LS2.md`](test_specs_LS2.md:1). All test files must reference spec sections via docstrings or comments.

## Test-to-Requirement Mapping

| Test File / Name                | Spec Section(s)         | Requirement/User Story | Notes |
|---------------------------------|------------------------|-----------------------|-------|
| frontend/src/__tests__/Search.test.js - renders search input and button | 1.1, 1.3              | Search UI             |      |
| frontend/src/__tests__/Chat.test.js - displays chat messages            | 1.1, 1.3              | Chat UI               |      |
| backend/tests/api_transcript.test.js - returns transcript for valid videoId | 1.3, 2                | Transcript API        |      |
| frontend/src/__tests__/XSS.test.js - XSS Attack Simulation (LS6/LS7) | LS4, LS5, LS6, LS7    | Output Escaping, XSS Defense | Covers unicode, malformed HTML, curly braces, template literals, React escaping reliance, and double-escaping detection. |
| ci_enforcement.test.js - CI fallback pattern enforcement (LS6/LS7) | LS6, LS7              | CI Security, Threat Docs | Ensures CI scripts do not contain fallback patterns (`|| echo`, `|| true`, `|| :`, `|| printf`). Fails CI if found. |
| backend/tests/security.test.js - Security simulations & error handling | LS4, LS5, LS6, LS7    | Backend Security, Error Handling | Tests CSRF, injection, IDOR, error message handling, and verifies error responses do not leak sensitive info. Includes rationale for deterministic/randomized error logic. |
| ...                             | ...                    | ...                   |      |

*Update this table as new tests are added.*

## Uncovered Code Justification

All uncovered code must be documented here with justification.

| File/Function | Reason for No Test Coverage | Spec Reference |
|---------------|----------------------------|---------------|
|               |                            |               |

## Notes

### Backend Error Handling Coverage (LS8)

- Error handling logic is tested with deterministic status codes and error messages in the test environment for repeatability.
- In production, randomized status codes and generic messages prevent information leakage.
- `backend/tests/security.test.js` verifies no sensitive information is leaked and all error branches are exercised.
- `backend/tests/api_transcript.test.js` covers transcript API error handling, including invalid input and authorization failures.
- All test cases must be discoverable and traceable via this document.
- Update this file on every PR that adds or changes tests/specs.

| Environment | Status Codes   | Error Messages | Test File(s)                                 |
|-------------|---------------|---------------|----------------------------------------------|
| Test        | Deterministic  | Specific      | security.test.js, api_transcript.test.js     |
| Production  | Randomized     | Generic       | N/A (runtime logic)                          |
## Threat Documentation and CI Enforcement (LS6)

- The repository must include an up-to-date `THREAT_MODEL.md` file with the following required sections:
  - Threat Model
  - Mitigations
  - Attack Surface

- The CI workflow strictly enforces the presence and completeness of this documentation using [`scripts/check-threat-docs.sh`](scripts/check-threat-docs.sh).
  - The script fails CI if the file is missing or any required section is absent.
  - No fallback or bypass is permitted; compliance is mandatory.

- **Security Rationale:** This enforcement ensures that all security decisions, mitigations, and attack surfaces are documented and reviewed before code is merged, reducing the risk of untracked vulnerabilities.

- See [`test_specs_LS6.md`](test_specs_LS6.md) for full requirements and rationale.