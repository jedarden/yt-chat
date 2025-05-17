## Prompt LS2_1

### Context
The initial test specs lack explicit, concrete test case examples, leading to ambiguity and inconsistent implementations. This was highlighted as a high-severity issue in both the critic's reflection and the low clarity score (68).

### Objective
Add explicit, descriptive test case examples with sample inputs and expected outputs for all major test categories.

### Focus Areas
- Unit/component rendering tests
- State management logic
- Backend API endpoints

### Code Reference
```markdown
- **Unit Tests:**  
  - Component rendering (search, browse, summary, chat).
  - State management logic.
```

### Requirements
- For each test type, provide at least two concrete test case examples with sample data.
- Use descriptive names and document expected outcomes.
- Ensure examples are included in both frontend and backend sections.

### Expected Improvements
- Clarity score ≥ 80
- Reduced ambiguity in test implementation
- Improved onboarding for new contributors

---

## Prompt LS2_2

### Context
Negative and security test scenarios are insufficiently detailed, lacking coverage of specific attack vectors and validation boundaries. Security score (80) and reflection both highlight this gap.

### Objective
Expand and detail negative and security test scenarios, specifying attack vectors, validation boundaries, and assertion strategies.

### Focus Areas
- XSS, CSRF, and injection attacks
- Input validation failures
- Unauthorized access attempts

### Code Reference
```markdown
- Simulate attack vectors (XSS, CSRF, injection).
```

### Requirements
- For each security risk, provide at least one negative test case with clear assertion criteria.
- Document how to simulate and verify each scenario.
- Integrate regular updates for new vulnerabilities.

### Expected Improvements
- Security score ≥ 90
- Comprehensive negative scenario coverage
- Reduced risk of untested vulnerabilities

---

## Prompt LS2_3

### Context
Coverage goals are stated but lack detail on measurement, tooling, and traceability. The coverage score (82) and rationale indicate a need for explicit guidance.

### Objective
Clarify coverage measurement strategies, required tools, and traceability mechanisms for test coverage.

### Focus Areas
- Coverage tools and configuration
- Exclusion of third-party/generated code
- Documentation of uncovered code

### Code Reference
```markdown
- >90% line and branch coverage for core logic.
- 100% function coverage for security/validation.
```

### Requirements
- Specify tools (e.g., nyc, coverage.py) and configuration.
- Define process for documenting and justifying uncovered code.
- Require mapping of tests to acceptance criteria.

### Expected Improvements
- Coverage score ≥ 90
- Transparent and reproducible coverage metrics
- Improved traceability for audits

---

## Prompt LS2_4

### Context
Dockerization tests lack automation strategy, reducing performance and maintainability. Performance score (75) and critic feedback both note this gap.

### Objective
Detail automation strategies for Dockerization tests, including CI integration and tooling.

### Focus Areas
- Automated container startup/shutdown tests
- Environment variable and port validation
- Dockerfile linting and best practices

### Code Reference
```markdown
- Automate Docker tests using Testcontainers in CI.
- Add scripts to verify port exposure and environment variable handling.
- Integrate Hadolint for Dockerfile linting in CI.
```

### Requirements
- Provide example CI pipeline steps/scripts for Docker tests.
- Integrate Dockerfile linting and container validation in automation.
- Ensure tests are reproducible and fail on misconfiguration.

### Expected Improvements
- Performance score ≥ 85
- Fully automated Dockerization test workflow
- Early detection of containerization issues

---

## Prompt LS2_5

### Context
Documentation and traceability of test cases are insufficiently specified, impacting clarity and maintainability. The critic and rationale both highlight the need for structured documentation and traceability.

### Objective
Enhance documentation and maintainability standards for test cases, specifying format, location, and traceability mechanisms.

### Focus Areas
- TEST_COVERAGE.md mapping tests to requirements
- Docstrings/comments referencing spec sections
- CI enforcement of traceability

### Code Reference
```markdown
- Maintain a TEST_COVERAGE.md mapping each test to acceptance criteria and user stories.
- Use docstrings or comments in test files referencing spec sections.
- Require traceability in CI (e.g., fail builds if new code lacks associated tests/spec links).
```

### Requirements
- Define required documentation format and location.
- Enforce traceability between tests and requirements.
- Integrate documentation checks into CI.

### Expected Improvements
- Clarity score ≥ 85
- Maintainable, auditable test documentation
- Reduced onboarding time for new developers