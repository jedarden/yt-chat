# Test Specifications LS2

## 1. Explicit Test Case Examples

### 1.1 Frontend Unit/Component Rendering

#### Example: Search Component
- **Test Name:** renders search input and button
  - **Arrange:** Render Search component
  - **Act:** None
  - **Assert:** Input field and search button are present

- **Test Name:** triggers search callback on submit
  - **Arrange:** Render Search with mock onSearch
  - **Act:** Enter "test" and click search
  - **Assert:** onSearch called with "test"

#### Example: Chat Component
- **Test Name:** displays chat messages
  - **Arrange:** Render Chat with messages=[{user: "A", text: "Hello"}]
  - **Act:** None
  - **Assert:** "Hello" is visible

- **Test Name:** handles empty message list
  - **Arrange:** Render Chat with messages=[]
  - **Act:** None
  - **Assert:** Shows "No messages" placeholder

### 1.2 State Management Logic

#### Example: Transcript Store
- **Test Name:** adds transcript entry
  - **Arrange:** Initial state empty
  - **Act:** Dispatch addTranscript({id: 1, text: "foo"})
  - **Assert:** State contains entry with id 1 and text "foo"

- **Test Name:** clears all transcripts
  - **Arrange:** State with entries
  - **Act:** Dispatch clearTranscripts()
  - **Assert:** State is empty

### 1.3 Backend API Endpoints

#### Example: GET /api/transcript
- **Test Name:** returns transcript for valid videoId
  - **Arrange:** DB seeded with videoId=abc123
  - **Act:** GET /api/transcript?videoId=abc123
  - **Assert:** 200 OK, body contains transcript

- **Test Name:** returns 404 for missing videoId
  - **Arrange:** DB empty
  - **Act:** GET /api/transcript?videoId=notfound
  - **Assert:** 404 Not Found

---

## 2. Negative and Security Scenario Coverage

### 2.1 XSS, CSRF, Injection

- **Test Name:** blocks XSS in chat messages
  - **Arrange:** POST /api/chat with text: `<script>alert(1)</script>`
  - **Act:** Fetch chat messages
  - **Assert:** Response escapes or strips script tags

- **Test Name:** rejects SQL injection in search
  - **Arrange:** GET /api/search?q=`' OR 1=1--`
  - **Act:** Perform request
  - **Assert:** 400 Bad Request, no DB error

- **Test Name:** CSRF token required for POST
  - **Arrange:** POST /api/chat without CSRF token
  - **Act:** Send request
  - **Assert:** 403 Forbidden

### 2.2 Input Validation Failures

- **Test Name:** rejects empty search query
  - **Arrange:** GET /api/search?q=``
  - **Act:** Perform request
  - **Assert:** 400 Bad Request

- **Test Name:** rejects overly long chat message
  - **Arrange:** POST /api/chat with text: "a" * 5001
  - **Act:** Send request
  - **Assert:** 422 Unprocessable Entity

### 2.3 Unauthorized Access

- **Test Name:** denies access to admin endpoint for unauthenticated user
  - **Arrange:** No auth header
  - **Act:** GET /api/admin/stats
  - **Assert:** 401 Unauthorized

---

## 3. Coverage Measurement, Tooling, and Traceability

### 3.1 Coverage Tools and Configuration

- **Frontend:** Use `nyc` (Istanbul) with configuration for >90% line/branch coverage.
- **Backend:** Use `coverage.py` or `pytest-cov` for Python, or `nyc` for Node.js.
- **Security/Validation:** Require 100% function coverage.

### 3.2 Exclusions

- Exclude third-party and generated code from coverage metrics.
- Document all uncovered code in `TEST_COVERAGE.md` with justification.

### 3.3 Traceability

- Map each test to acceptance criteria/user stories in `TEST_COVERAGE.md`.
- Require test files to reference spec sections via docstrings/comments.
- CI must fail if new code lacks associated tests/spec links.

---

## 4. Dockerization Test Automation

### 4.1 Automated Container Tests

- Use [Testcontainers](https://testcontainers.com/) or similar to:
  - Start/stop containers in CI
  - Validate environment variables and port exposure
  - Assert app health endpoints respond as expected

#### Example CI Steps (GitHub Actions)
```yaml
- name: Build Docker image
  run: docker build -t yt-chat:ci .

- name: Lint Dockerfile
  run: hadolint Dockerfile

- name: Start container for tests
  run: docker run -d -p 8080:8080 --env-file .env yt-chat:ci

- name: Run integration tests
  run: npm run test:integration

- name: Stop container
  run: docker stop $(docker ps -q --filter ancestor=yt-chat:ci)
```

### 4.2 Linting and Best Practices

- Integrate [Hadolint](https://github.com/hadolint/hadolint) in CI for Dockerfile linting.
- Fail builds on Dockerfile misconfiguration or lint errors.

---

## 5. Documentation and Maintainability Standards

### 5.1 Documentation Format and Location

- Maintain `TEST_COVERAGE.md` at project root:
  - Table mapping each test to requirements/spec/user stories
  - Justification for any uncovered code
- Require docstrings/comments in test files referencing spec sections.

### 5.2 Traceability and CI Enforcement

- CI pipeline must:
  - Check for test-to-requirement mapping
  - Fail if new code lacks associated tests/spec links
  - Enforce documentation updates on test/spec changes

### 5.3 Onboarding and Auditability

- Documentation must be clear, up-to-date, and reviewed on each PR.
- All test cases must be discoverable and traceable via `TEST_COVERAGE.md`.

---

## 6. Regular Updates and Continuous Improvement

- Review and update negative/security scenarios quarterly or upon new vulnerability disclosures.
- Update coverage and documentation standards as tooling evolves.
- Reflect on test clarity, coverage, and maintainability after each release.