import React, { useState } from 'react';

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [id, setId] = useState('');

  const handleAnalytics = async () => {
    try {
      const response = await fetch(`http://localhost:8000/url/analytics/${id}`, {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        setAnalytics(data);
        setId('');
      } else {
        console.error(`Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Failed to fetch analytics data:', error);
    }
  };

  const handleCopy = () => {
    if (analytics && analytics.shortUrl) {
      navigator.clipboard.writeText(analytics.shortUrl);
    }
  };

  return (
    <div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
      <div className="note d-flex flex-column justify-content-center align-items-center w-50">
        <h2 className="mb-3">View Analytics of your Shortened URL</h2>
        <p>Where to get Id :- Last 9 characters of your URL is the id. Enter it to get the analytics of your URL.</p>
      </div>
      <div className="main d-flex mt-5">
        <input
          className="inp p-1"
          style={{ minWidth: '450px', borderRadius: '7px' }}
          type="text"
          placeholder="Enter your id here..."
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button className="btn btn-outline-success" style={{ marginLeft: '7px' }} onClick={handleAnalytics}>
          See Analytics
        </button>
      </div>
      {analytics && (
        <div className="mt-4 bg-dark p-2 text-white w-auto" style={{ minWidth: '450px', borderRadius: '7px' }}>
          <h4>Total Clicks: {analytics.totalClicks}</h4>
          Shortened URL: <a href={analytics.shortUrl} target="_blank" rel="noopener noreferrer">{analytics.shortUrl}</a>
          <button className="btn btn-outline-success text-white" onClick={handleCopy} style={{ marginLeft: '2rem' }}>
            Copy Short URL
          </button>
        </div>
      )}
    </div>
  );
};

export default Analytics;
