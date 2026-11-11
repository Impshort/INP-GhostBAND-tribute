import React, { useState } from 'react';

function LyricsSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedLyrics, setSelectedLyrics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setSelectedLyrics(null);

    // LRCLIB API endpoint for lyrics search filtered by artist and song title
    fetch(`https://lrclib.net/api/search?artist_name=Ghost&track_name=${encodeURIComponent(query.trim())}`, {
      headers: {
        'Lrclib-Client': 'GhostTributeApp v1.0 (https://github.com/capstone)'
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch lyrics.');
        return res.json();
      })
      .then((data) => {
        setResults(data);
        if (data.length === 0) {
          setError('No lyrics found for this Ghost song. Try another title like "Square Hammer" or "Mary On A Cross".');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('LRCLIB Fetch Error:', err);
        setError('Error fetching lyrics. Please check your connection.');
        setLoading(false);
      });
  };

  return (
    <section id="lyrics-search" style={{ margin: '2.5rem 0', padding: '1.5rem', background: '#111', border: '1px solid #d4af37', borderRadius: '8px' }}>
      <h2 style={{ color: '#d4af37', marginTop: 0 }}>Ghost Lyrics Search (LRCLIB API)</h2>
      <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '1rem' }}>
        Search for any Ghost song title to display its lyrics live:
      </p>

      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <input 
          type="text" 
          placeholder="Enter song title (e.g., Square Hammer, Cirice)" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ flex: 1, padding: '0.6rem 0.8rem', borderRadius: '4px', border: '1px solid #444', background: '#222', color: '#fff' }}
        />
        <button 
          type="submit" 
          style={{ padding: '0.6rem 1.2rem', background: '#d4af37', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Search Lyrics
        </button>
      </form>

      {loading && <p style={{ color: '#d4af37' }}>Searching ritual archives...</p>}
      {error && <p style={{ color: '#ff6b6b' }}>{error}</p>}

      {/* SEARCH RESULTS SELECTION */}
      {results.length > 0 && !selectedLyrics && (
        <div>
          <h4 style={{ color: '#fff' }}>Select a match:</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {results.map((track) => (
              <button 
                key={track.id}
                onClick={() => setSelectedLyrics(track)}
                style={{ textAlign: 'left', padding: '0.6rem 1rem', background: '#1a1a1a', border: '1px solid #333', color: '#fff', borderRadius: '4px', cursor: 'pointer' }}
              >
                <strong>{track.trackName}</strong> — <em>{track.albumName}</em> ({Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')})
              </button>
            ))}
          </div>
        </div>
      )}

      {/* DISPLAY SELECTED LYRICS */}
      {selectedLyrics && (
        <div style={{ background: '#1a1a1a', padding: '1rem', borderRadius: '6px', border: '1px solid #444', marginTop: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ color: '#d4af37', margin: 0 }}>{selectedLyrics.trackName}</h3>
            <button 
              onClick={() => setSelectedLyrics(null)} 
              style={{ background: 'transparent', border: 'none', color: '#d4af37', cursor: 'pointer', fontWeight: 'bold' }}
            >
              ← Back to results
            </button>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '1rem' }}>
            Album: {selectedLyrics.albumName} | Artist: {selectedLyrics.artistName}
          </p>

          {selectedLyrics.instrumental ? (
            <p style={{ color: '#aaa', fontStyle: 'italic' }}>This track is instrumental.</p>
          ) : (
            <pre style={{ color: '#eee', whiteSpace: 'pre-wrap', fontFamily: 'inherit', lineHeight: '1.6', maxHeight: '350px', overflowY: 'auto' }}>
              {selectedLyrics.plainLyrics || 'Plain lyrics unavailable.'}
            </pre>
          )}
        </div>
      )}
    </section>
  );
}

export default LyricsSearch;