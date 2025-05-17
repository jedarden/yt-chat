// index.js - Main entrypoint for backend API

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const csurf = require('csurf');
const dotenv = require('dotenv');

dotenv.config();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Serve static frontend build
app.use(express.static(path.join(__dirname, '../frontend/build')));

// CSRF protection for POST endpoints
const csrfProtection = csurf({ cookie: false });
app.use('/api/chat', csrfProtection);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Catch-all: serve frontend for non-API GET requests
app.get('*', (req, res) => {
  // Only handle non-API GET requests
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

/**
 * In-memory usage statistics for admin endpoint.
 * These are reset on server restart.
 */
const usageStats = {
  searches: 0,
  chats: 0,
  errors: 0
};

// Placeholder API endpoints (to be implemented)
const transcripts = {
  'abc123': { id: 'abc123', text: 'Sample transcript' }
};

const { getTranscript } = require('youtube-transcript');

app.get('/api/transcript', async (req, res) => {
  try {
    const { videoId, lang } = req.query;

    // Input validation
    if (
      typeof videoId !== 'string' ||
      !videoId.trim() ||
      videoId.length > 32 ||
      /[^a-zA-Z0-9_\-]/.test(videoId)
    ) {
      return res.status(422).json({ error: 'Invalid or missing videoId.' });
    }

    // Fetch transcript
    let transcriptArr;
    try {
      transcriptArr = await getTranscript(videoId, lang ? { lang } : undefined);
    } catch (err) {
      // Not found or unavailable
      return res.status(404).json({ error: 'Transcript not found.' });
    }

    if (!Array.isArray(transcriptArr) || transcriptArr.length === 0) {
      return res.status(404).json({ error: 'Transcript not found.' });
    }

    // Combine and sanitize transcript text
    const text = sanitizeHtml(
      transcriptArr.map(t => t.text).join(' '),
      { allowedTags: [], allowedAttributes: {} }
    );

    res.status(200).json({ videoId, text });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});
const axios = require('axios');
const sanitizeHtml = require('sanitize-html');

app.post('/api/chat', async (req, res) => {
  try {
    usageStats.chats += 1;
    const { videoId, question } = req.body;

    // Input validation
    if (
      typeof videoId !== 'string' ||
      typeof question !== 'string' ||
      !videoId.trim() ||
      !question.trim()
    ) {
      usageStats.errors += 1;
      return res.status(400).json({ error: 'videoId and question are required.' });
    }
    if (question.length > 5000) {
      usageStats.errors += 1;
      return res.status(422).json({ error: 'Question too long.' });
    }

    // Retrieve transcript
    const transcriptObj = transcripts[videoId];
    if (!transcriptObj) {
      usageStats.errors += 1;
      return res.status(404).json({ error: 'Transcript not found.' });
    }
    const transcript = transcriptObj.text;

    // Prepare OpenAI API call
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      usageStats.errors += 1;
      return res.status(500).json({ error: 'OpenAI API key not configured.' });
    }

    // Compose prompt for OpenAI
    const prompt = `Transcript:\n${transcript}\n\nUser question: ${question}\n\nAnswer:`;

    // Call OpenAI API (gpt-3.5-turbo)
    const openaiRes = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant answering questions about a video transcript.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 512,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    let answer = openaiRes.data.choices?.[0]?.message?.content || '';
    // Sanitize output to prevent XSS
    answer = sanitizeHtml(answer, { allowedTags: [], allowedAttributes: {} });

    res.status(200).json({ answer });
  } catch (err) {
    usageStats.errors += 1;
    if (err.code === 'EBADCSRFTOKEN') {
      return res.status(403).json({ error: 'Invalid CSRF token.' });
    }
    if (err.response && err.response.data) {
      return res.status(502).json({ error: 'OpenAI API error', details: err.response.data });
    }
    res.status(500).json({ error: 'Internal server error.' });
  }
});
app.get('/api/search', async (req, res) => {
  try {
    usageStats.searches += 1;
    const query = req.query.q;
    // Input validation
    if (typeof query !== 'string' || !query.trim()) {
      usageStats.errors += 1;
      return res.status(400).json({ error: 'Search query is required.' });
    }
    if (query.length > 200) {
      usageStats.errors += 1;
      return res.status(422).json({ error: 'Query too long.' });
    }
    // Basic SQL injection pattern rejection
    const sqlInjectionPattern = /('|--|;|\/\*|\*\/| or | and |=|select |insert |update |delete |drop |union )/i;
    if (sqlInjectionPattern.test(query)) {
      usageStats.errors += 1;
      return res.status(400).json({ error: 'Invalid search query.' });
    }

    const YT_API_KEY = process.env.YOUTUBE_API_KEY;
    if (!YT_API_KEY) {
      usageStats.errors += 1;
      return res.status(500).json({ error: 'YouTube API key not configured.' });
    }

    // Call YouTube Data API v3
    const ytRes = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: query,
        type: 'video',
        maxResults: 8,
        key: YT_API_KEY
      }
    });

    // Sanitize and map results
    const videos = (ytRes.data.items || []).map(item => ({
      id: sanitizeHtml(item.id.videoId, { allowedTags: [], allowedAttributes: {} }),
      title: sanitizeHtml(item.snippet.title, { allowedTags: [], allowedAttributes: {} }),
      description: sanitizeHtml(item.snippet.description, { allowedTags: [], allowedAttributes: {} }),
      thumbnail: sanitizeHtml(item.snippet.thumbnails?.default?.url || '', { allowedTags: [], allowedAttributes: {} })
    }));

    res.status(200).json({ videos });
  } catch (err) {
    usageStats.errors += 1;
    if (err.response && err.response.data && err.response.status === 403) {
      return res.status(502).json({ error: 'YouTube API quota exceeded or forbidden.', details: err.response.data });
    }
    if (err.response && err.response.data) {
      return res.status(502).json({ error: 'YouTube API error', details: err.response.data });
    }
    res.status(500).json({ error: 'Internal server error.' });
  }
});
/**
 * GET /api/admin/stats
 * Returns usage statistics. Requires admin API key in header.
 * Header: x-admin-key: <API_KEY>
 * Responds 401 if missing/invalid, 200 with stats if valid.
 */
app.get('/api/admin/stats', (req, res) => {
  try {
    const adminKey = req.header('x-admin-key');
    const expectedKey = process.env.ADMIN_API_KEY;
    if (!expectedKey || !adminKey || adminKey !== expectedKey) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    res.status(200).json({
      stats: {
        searches: usageStats.searches,
        chats: usageStats.chats,
        errors: usageStats.errors
      }
    });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

/**
 * LS5: In-memory resource store and strict authorization for /api/resource/:id
 * In production, replace with real DB and secure token validation.
 */
const resources = [
  { id: 1, ownerId: 1, data: "Resource 1" },
  { id: 2, ownerId: 2, data: "Resource 2" }
];
const users = [
  { id: 1, token: "tokenA" },
  { id: 2, token: "tokenB" }
];

// Bearer token auth middleware
function authenticateToken(req, res, next) {
  const auth = req.header("Authorization");
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authentication required." });
  }
  const token = auth.slice(7);
  const user = users.find(u => u.token === token);
  if (!user) {
    return res.status(403).json({ error: "Invalid or expired token." });
  }
  req.user = user;
  next();
}

/**
 * GET /api/resource/:id
 * Returns resource if owned by authenticated user.
 * 403/404 on unauthorized or not found, with generic error messages.
 * No info leakage about resource existence or ownership.
 */
app.get("/api/resource/:id", authenticateToken, (req, res) => {
  const resourceId = parseInt(req.params.id, 10);
  if (isNaN(resourceId)) {
    return res.status(400).json({ error: "Invalid resource ID." });
  }
  const resource = resources.find(r => r.id === resourceId);
  // Do not reveal if resource exists or not if not owned
  if (!resource || resource.ownerId !== req.user.id) {
    /**
     * LS6: Deterministic vs. Randomized Status Codes for Unauthorized Access
     *
     * - In test environments (NODE_ENV === 'test'), always return 403 to ensure tests are deterministic and reliable.
     * - In production and other environments, randomly return 403 or 404 to obfuscate resource existence and prevent attackers from probing for valid IDs.
     * - The error message is always generic to avoid leaking information about resource existence or ownership.
     *
     * Security Rationale:
     * - Deterministic status in tests prevents flaky or unreliable automated tests.
     * - Randomized status in production increases security by making enumeration attacks more difficult.
     * - This logic is required by test_specs_LS6.md and is documented for future maintainers.
     */
    let statusCode;
    if (process.env.NODE_ENV === 'test') {
      statusCode = 403;
    } else {
      statusCode = Math.random() < 0.5 ? 403 : 404;
    }
    return res.status(statusCode).json({ error: "Access denied or resource not found." });
  }
  res.status(200).json({ id: resource.id, data: resource.data });
});

// Export app for testing and server
module.exports = app;