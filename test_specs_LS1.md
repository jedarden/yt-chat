# Test Specifications for YouTube Transcript/Chat Web Application (LS1)

## 1. Frontend (UI/UX, Chat, Video Browsing)

### 1.1 Acceptance Criteria
- Responsive UI closely mimics YouTube layout.
- Users can search and browse YouTube videos.
- Selecting a video displays its transcript summary.
- Chat interface enables Q&A based on transcript.
- Browsing, summary, and chat components are clearly separated.
- Frontend code is modular and maintainable.

### 1.2 Edge Cases
- No search results returned.
- Video without transcript.
- Transcript summary fails to load.
- Chat API returns error or times out.
- User submits empty or malicious input in chat.
- Rapid switching between videos.

### 1.3 Test Scaffolding
- **Unit Tests:**  
  - Component rendering (search, browse, summary, chat).
  - State management logic.
  - Input validation for chat and search.
- **Integration Tests:**  
  - Search-to-browse-to-summary flow.
  - Chat interaction with backend mock.
- **E2E Tests:**  
  - Full user journey: search → select → summary → chat.
  - Responsiveness across devices.

---

## 2. Backend (YouTube API, Transcript Extraction, OpenAI API, Chat Logic)

### 2.1 Acceptance Criteria
- Integrates with YouTube Data API for search/metadata.
- Extracts transcripts (YouTube or fallback).
- Summarizes transcripts and handles chat Q&A via OpenAI API.
- OpenAI API key is never exposed to client.
- Modular, testable backend code.
- REST/WebSocket endpoints for frontend.

### 2.2 Edge Cases
- YouTube API quota exceeded or unavailable.
- Video has no transcript or is private.
- OpenAI API returns error or is rate-limited.
- Malformed or malicious requests.
- Large transcripts (performance/memory).
- Concurrent chat sessions.

### 2.3 Test Scaffolding
- **Unit Tests:**  
  - API integration mocks (YouTube, OpenAI).
  - Transcript extraction logic.
  - Chat logic and prompt formatting.
  - Input validation and sanitization.
- **Integration Tests:**  
  - End-to-end flow: search → transcript → summary → chat.
  - Security: ensure API keys are not leaked.
- **E2E Tests:**  
  - Simulate frontend-backend interaction.
  - Error propagation and handling.

---

## 3. Dockerization (Single-Port, Containerization)

### 3.1 Acceptance Criteria
- Application runs in Docker, exposing a single port.
- Sensitive keys (OpenAI, YouTube) are passed via environment variables.
- Production-ready Dockerfile (non-root, minimal image).
- Build and run process is documented.

### 3.2 Edge Cases
- Missing or malformed environment variables.
- Port conflicts.
- Dockerfile misconfiguration (permissions, image size).
- Secrets accidentally baked into image.

### 3.3 Test Scaffolding
- **Unit Tests:**  
  - N/A (focus on integration/system).
- **Integration/System Tests:**  
  - Container starts with/without required env vars.
  - Only one port is exposed.
  - Secrets are not present in built image.
  - Healthcheck endpoint responds.
- **Documentation Tests:**  
  - Build/run instructions are accurate.

---

## 4. Security & Privacy (API Key Handling, User Data)

### 4.1 Acceptance Criteria
- OpenAI API key is never sent to client.
- All user inputs are validated and sanitized.
- CORS and CSRF protections are enforced.
- No unnecessary user data is stored; retention is documented.
- HTTPS enforced in production.
- Secrets managed via environment variables.

### 4.2 Edge Cases
- Attempted API key access from client.
- XSS, CSRF, and injection attacks.
- Invalid or oversized user input.
- Unintended data retention or logging.

### 4.3 Test Scaffolding
- **Unit Tests:**  
  - Input validation/sanitization functions.
  - CORS/CSRF middleware.
- **Integration Tests:**  
  - Attempt to access secrets from client.
  - Simulate attack vectors (XSS, CSRF, injection).
  - Data retention policy enforcement.
- **E2E Tests:**  
  - HTTPS enforced in production build.

---

## 5. Modularity, Maintainability, and Testing

### 5.1 Acceptance Criteria
- Codebase is organized into clear, reusable modules.
- Test suite covers critical paths (API, chat, security).
- Continuous Integration (CI) runs all tests on commit.
- Recommended tools/frameworks are used.

### 5.2 Edge Cases
- Uncovered code paths.
- Flaky or non-deterministic tests.
- Module dependency cycles.

### 5.3 Test Scaffolding
- **Test Suite Structure:**  
  - Unit, integration, and E2E test directories.
  - Mocking/stubbing for external APIs.
- **Tools/Frameworks:**  
  - Frontend: Jest, React Testing Library, Cypress.
  - Backend: Jest/Mocha, Supertest, nock.
  - Docker: Testcontainers, Hadolint.
  - CI: GitHub Actions, GitLab CI, or similar.
- **Coverage Goals:**  
  - >90% line and branch coverage for core logic.
  - 100% function coverage for security/validation.
- **CI Steps:**  
  - Lint, build, run all tests, report coverage, fail on regressions.

---

## 6. General Test Patterns

- Arrange-Act-Assert structure for all tests.
- Descriptive test names and comments.
- Tests for both positive and negative scenarios.
- Edge case and boundary value analysis.
- Regression tests for all bug fixes.

---

## 7. Documentation

- All test cases and coverage documented.
- Data retention and security policies documented.
- Build, run, and test instructions included.