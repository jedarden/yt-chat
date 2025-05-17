import React from 'react';

/**
 * Chat component
 * Spec Reference: Section 1.1 - test_specs_LS2.md
 */
function Chat({ messages: initialMessages = [], user = "User" }) {
  const [messages, setMessages] = React.useState(initialMessages);
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  // Escape HTML to prevent XSS
  function escapeHTML(str) {
    const map = {
      '&': '&',
      '<': '<',
      '>': '>',
      '"': '"',
      "'": '\''
    };
    return str.replace(/[&<>"']/g, m => map[m]);
  }

  const validateMessage = (msg) => {
    if (!msg.trim()) return 'Message cannot be empty.';
    if (msg.length > 5000) return 'Message too long (max 5000 chars).';
    return '';
  };

  const handleSend = async (e) => {
    e.preventDefault();
    setError('');
    const validationError = validateMessage(input);
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, text: input.trim() })
      });
      if (!res.ok) {
        if (res.status === 422) {
          setError('Message too long.');
        } else if (res.status === 400) {
          setError('Invalid message.');
        } else {
          setError('Failed to send message.');
        }
        setLoading(false);
        return;
      }
      const data = await res.json();
      setMessages([...messages, { user, text: input.trim() }]);
      setInput('');
    } catch (err) {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div>
      {(!messages || messages.length === 0) ? (
        <div>No messages</div>
      ) : (
        <ul>
          {messages.map((msg, idx) => (
            <li key={idx}>
              <strong>{escapeHTML(msg.user)}:</strong> <span dangerouslySetInnerHTML={{ __html: escapeHTML(msg.text) }} />
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSend} style={{ marginTop: 10 }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message"
          maxLength={5000}
          disabled={loading}
          aria-label="chat-input"
        />
        <button type="submit" disabled={loading}>Send</button>
      </form>
      {loading && <span aria-live="polite">Sending...</span>}
      {error && <div role="alert" style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}

export default Chat;