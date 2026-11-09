import React, { useState, useEffect } from 'react';

function BandApiInfo() {
  const [bandData, setBandData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Fetch live metadata for Ghost from The AudioDB free public API
    fetch('https://www.theaudiodb.com/api/v1/json/2/search.php?s=Ghost')
      .then((res) => {
        if (!res.ok) throw new Error('API Response Error');
        return res.json();
      })
      .then((data) => {
        if (data && data.artists && data.artists[0]) {
          setBandData(data.artists[0]);
        } else {
          setError(true);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('API Fetch failed:', err);
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section style={{ textAlign: 'center', padding: '1.5rem', color: '#d4af37' }}>
        <p>Fetching live band metadata from AudioDB API...</p>
      </section>
    );
  }

  if (error || !bandData) {
    return (
      <section style={{ textAlign: 'center', padding: '1.5rem', color: '#888' }}>
        <p>Live AudioDB metadata temporarily unavailable. Using local lore archive.</p>
      </section>
    );
  }

  return (
    <section id="api-info" style={{ margin: '2rem 0', padding: '1.5rem', background: '#111', border: '1px solid #d4af37', borderRadius: '8px' }}>
      <h2 style={{ color: '#d4af37', marginTop: 0 }}>Live AudioDB Metadata (External API Integration)</h2>
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        {bandData.strArtistBadge && (
          <img 
            src={bandData.strArtistBadge} 
            alt="Ghost Official Badge" 
            style={{ maxWidth: '140px', borderRadius: '6px', border: '1px solid #333' }}
          />
        )}
        <div style={{ flex: 1, minWidth: '250px' }}>
          <p><strong>Official Genre:</strong> {bandData.strGenre || 'Heavy Metal / Hard Rock'}</p>
          <p><strong>Formed Year:</strong> {bandData.strFormedYear || '2008'}</p>
          <p><strong>Country of Origin:</strong> {bandData.strCountry || 'Sweden'}</p>
          {bandData.strStyle && <p><strong>Musical Style:</strong> {bandData.strStyle}</p>}
          {bandData.strBiographyEN && (
            <p style={{ fontSize: '0.9rem', color: '#ccc', lineHeight: 1.5 }}>
              <strong>Bio Overview:</strong> {bandData.strBiographyEN.slice(0, 220)}...
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default BandApiInfo;