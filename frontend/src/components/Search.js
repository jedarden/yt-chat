import React, { useState } from 'react';

/**
 * Search component
 * Spec Reference: Section 1.1 - test_specs_LS2.md
 */
function Search({ onResults }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState(null);

  // Basic SQL injection pattern (very simple, not foolproof)
  const sqlInjectionPattern = /('|--|;|\/\*|\*\/|drop|select|insert|delete|update|union|or\s+1=1)/i;

  const validateQuery = (q) => {
    if (!q.trim()) return 'Query cannot be empty.';
    if (q.length > 200) return 'Query too long.';
    if (sqlInjectionPattern.test(q)) return 'Invalid characters in query.';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResults(null);

    const validationError = validateQuery(query);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}`);
      if (!res.ok) {
        if (res.status === 400) {
          setError('Invalid search query.');
        } else {
          setError('Search failed. Please try again.');
        }
        setLoading(false);
        return;
      }
      const data = await res.json();
      setResults(data);
      if (onResults) onResults(data);
    } catch (err) {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={e => setQuery(e.target.value)}
        aria-label="search"
        disabled={loading}
      />
      <button type="submit" disabled={loading}>Search</button>
      {loading && <span aria-live="polite">Loading...</span>}
      {error && <div role="alert" style={{ color: 'red' }}>{error}</div>}
      {results && (
        <div>
          <pre aria-label="search-results">{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </form>
  );
}

export default Search;