import React, { useState, useEffect } from 'react';

function BandApiInfo() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Lookup by Ghost's specific iTunes Artist ID (384709698) to get exact official albums
    fetch('https://itunes.apple.com/lookup?id=384709698&entity=album&limit=6')
      .then((res) => {
        if (!res.ok) throw new Error('API Response Error');
        return res.json();
      })
      .then((data) => {
        if (data && data.results && data.results.length > 1) {
          // The first result is artist metadata, remaining items are actual albums
          const officialAlbums = data.results.slice(1).filter(item => item.wrapperType === 'collection');
          setAlbums(officialAlbums);
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
        <p>Fetching official Ghost discography from iTunes API...</p>
      </section>
    );
  }

  if (error || albums.length === 0) {
    return (
      <section style={{ textAlign: 'center', padding: '1.5rem', color: '#888' }}>
        <p>Live music API metadata temporarily offline.</p>
      </section>
    );
  }

  return (
    <section id="api-info" style={{ margin: '2rem 0', padding: '1.5rem', background: '#111', border: '1px solid #d4af37', borderRadius: '8px' }}>
      <h2 style={{ color: '#d4af37', marginTop: 0 }}>Live Discography Catalog (iTunes API Integration)</h2>
      <p style={{ fontSize: '0.9rem', color: '#aaa', marginBottom: '1rem' }}>
        Official releases dynamically fetched via Apple Music API (Artist ID: 384709698):
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
        {albums.map((item) => (
          <div key={item.collectionId} style={{ background: '#1a1a1a', padding: '0.8rem', borderRadius: '6px', textAlign: 'center', border: '1px solid #333' }}>
            <img 
              src={item.artworkUrl100.replace('100x100bb', '300x300bb')} 
              alt={item.collectionName} 
              style={{ width: '100%', maxWidth: '150px', borderRadius: '4px', marginBottom: '0.5rem' }}
            />
            <h4 style={{ margin: '0.4rem 0 0.2rem 0', fontSize: '0.95rem', color: '#fff' }}>{item.collectionName}</h4>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#d4af37' }}>
              {item.primaryGenreName} • {new Date(item.releaseDate).getFullYear()}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BandApiInfo;