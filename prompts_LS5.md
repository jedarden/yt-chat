## Prompt LS5_1

### Context
LS4 review identified high-severity issues: lack of explicit output sanitization in user-facing components, incomplete backend authorization checks for IDOR, and CI not strictly enforcing threat documentation/integration tests. These issues persist despite high test coverage and partial security simulations.

### Objective
Eliminate XSS risk, ensure robust backend authorization for resource access, and enforce CI checks for security documentation and integration tests.

### Focus Areas
- Explicit output sanitization in all user-facing components
- Comprehensive backend authorization and resource ownership checks (IDOR)
- Strict CI failure on missing threat docs and integration tests

### Code Reference
```javascript
// Browse.js
<li ...>{item.name || "N/A"}</li>
// Summary.js
<strong>Description:</strong> {description || "N/A"}
// security.test.js
const res = await request(app)
  .get("/api/resource/2")
  .set("Authorization", `Bearer ${userA.token}`);
expect([403, 404]).toContain(res.status);
// ci.yml
- name: Check threat documentation
  run: ./scripts/check-threat-docs.sh || echo "Threat docs check script not implemented"
- name: Run integration tests
  run: npm run test:integration || echo "Integration tests not implemented"
```

### Requirements
- Add explicit output sanitization or escaping for all user-rendered content; document reliance on React escaping and prohibit dangerouslySetInnerHTML unless sanitized.
- Expand backend logic and tests to verify resource access is strictly tied to authenticated user identity; assert on error details, not just status.
- Remove fallback commands in CI for threat docs/integration tests; CI must fail if these checks/scripts are missing or fail.

### Expected Improvements
- No XSS risk from user content, even if React defaults are bypassed
- IDOR tests fully verify backend authorization/resource ownership
- CI fails on missing or failing threat documentation/integration test steps