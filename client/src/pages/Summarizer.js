import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Summarizer = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:5000/api/summary', {
        headers: { Authorization: token },
      });
      setHistory(res.data);
    } catch (err) {
      console.error('❌ Error fetching history:', err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    } else {
      fetchHistory();
    }
  }, []);

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const aiRes = await axios.post('http://localhost:5001/summarize', { text });
      const generated = aiRes.data.summary;
      setSummary(generated);

      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/summary',
        { original_text: text, summary: generated },
        { headers: { Authorization: token } }
      );

      fetchHistory();
    } catch (err) {
      console.error('❌ Error fetching or saving summary:', err);
      setSummary('❌ Error fetching or saving summary.');
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h2>Note Summarizer</h2>

      <textarea
        placeholder="Paste your long note or paragraph here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="8"
      />

      <button onClick={handleSummarize} disabled={!text || loading}>
        {loading ? 'Summarizing...' : 'Summarize'}
      </button>

      {loading && <div className="spinner"></div>}

      {summary && (
        <div className="summary-box animate-fade">
          <h4>Summary:</h4>
          <p>{summary}</p>
        </div>
      )}

      {history.length > 0 && (
        <div className="summary-box">
          <h4>🕘 Summary History:</h4>
          {history.map((item) => (
            <div key={item.id} style={{ marginBottom: '10px' }}>
              <strong>Original:</strong>
              <p>{item.original_text}</p>
              <strong>Summary:</strong>
              <p>{item.summary}</p>
              <hr />
            </div>
          ))}
          <button
            onClick={async () => {
              const token = localStorage.getItem('token');
              await axios.delete('http://localhost:5000/api/summary', {
                headers: { Authorization: token },
              });
              fetchHistory();
            }}
            style={{ marginTop: '10px', backgroundColor: '#cc0000' }}
          >
            🗑️ Clear All History
          </button>
        </div>
      )}
    </div>
  );
};

export default Summarizer;
