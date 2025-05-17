## Prompt LS1_1

### Context
Design a web application that allows users to browse YouTube videos, select one, extract its transcript, summarize the content, and provide a chat interface for Q&A based on the transcript. The UI should mimic YouTube, but with a chat interface instead of a video player.

### Task
Design the frontend architecture for a YouTube-like browsing experience with integrated chat UI for transcript-based Q&A.

### Requirements
- Implement a responsive UI resembling YouTube’s layout.
- Allow users to search and browse YouTube videos.
- Enable video selection and display transcript summary.
- Integrate a chat interface for Q&A based on the transcript.
- Ensure clear separation between browsing, summary, and chat components.
- Use modular, maintainable frontend code.

### Previous Issues
N/A (initial layer)

### Expected Output
A detailed frontend architecture plan, including component breakdown, state management approach, and UI flow diagrams or descriptions.

---

## Prompt LS1_2

### Context
The backend must handle YouTube API integration, transcript extraction, OpenAI API usage, and chat logic. The OpenAI API key must remain server-side.

### Task
Design the backend architecture to support YouTube video search, transcript extraction, summarization, and chat-based Q&A, ensuring secure handling of the OpenAI API key.

### Requirements
- Integrate with YouTube Data API for video search and metadata.
- Extract video transcripts (using YouTube or third-party services).
- Summarize transcripts and handle chat Q&A using OpenAI API.
- Keep the OpenAI API key server-side; never expose it to the client.
- Structure backend code for modularity and testability.
- Provide REST or WebSocket endpoints for frontend communication.

### Previous Issues
N/A (initial layer)

### Expected Output
A backend architecture plan detailing service structure, API endpoints, security considerations, and data flow.

---

## Prompt LS1_3

### Context
The application must be dockerized, running on a single port, with secure API key handling.

### Task
Define a Docker-based deployment strategy for the full-stack application, ensuring all services run on a single port and sensitive keys are protected.

### Requirements
- Create a Dockerfile for the application.
- Use environment variables for sensitive data (e.g., OpenAI API key).
- Expose only one port for both frontend and backend.
- Ensure production-ready configuration (e.g., non-root user, minimal image).
- Document the build and run process.

### Previous Issues
N/A (initial layer)

### Expected Output
A Docker deployment plan, including Dockerfile structure, environment variable usage, and security best practices.

---

## Prompt LS1_4

### Context
Security and privacy are critical, especially regarding API key handling and user data.

### Task
Specify security and privacy measures for both frontend and backend, focusing on API key protection and user data handling.

### Requirements
- Ensure OpenAI API key is never sent to the client.
- Validate and sanitize all user inputs.
- Implement CORS and CSRF protections.
- Avoid storing unnecessary user data; document any data retention.
- Follow best practices for secrets management and secure communication (HTTPS).

### Previous Issues
N/A (initial layer)

### Expected Output
A security and privacy checklist with implementation guidelines for both frontend and backend.

---

## Prompt LS1_5

### Context
Testing and modularity are essential for maintainability and reliability.

### Task
Define a testing and modularity strategy for the application, covering both frontend and backend.

### Requirements
- Propose a test suite structure (unit, integration, end-to-end).
- Recommend tools and frameworks for testing.
- Outline strategies for modular code organization.
- Ensure tests cover critical paths (API integration, chat logic, security).
- Include guidelines for continuous integration.

### Previous Issues
N/A (initial layer)

### Expected Output
A testing and modularity plan, including recommended tools, test coverage goals, and CI integration steps.