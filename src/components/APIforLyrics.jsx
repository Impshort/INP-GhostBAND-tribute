import { useState } from 'react';

function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = String(seconds % 60).padStart(2, '0');

  return `${minutes}:${remainingSeconds}`;
}

function LyricsSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedLyrics, setSelectedLyrics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSearch(event) {
    event.preventDefault();
    const trackQuery = query.trim();

    if (!trackQuery) return;

    setLoading(true);
    setError(null);
    setResults([]);
    setSelectedLyrics(null);

    try {
      const response = await fetch(
        `https://lrclib.net/api/search?artist_name=Ghost&track_name=${encodeURIComponent(trackQuery)}`,
        {
          headers: {
            'Lrclib-Client': 'GhostTributeApp v1.0 (https://github.com/capstone)',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch lyrics.');
      }

      const tracks = await response.json();

      if (!Array.isArray(tracks)) {
        throw new Error('The lyrics service returned an unexpected response.');
      }

      const ghostTracks = tracks.filter(
        (track) => track?.artistName?.toLowerCase() === 'ghost'
      );

      setResults(ghostTracks);

      if (ghostTracks.length === 0) {
        setError('No official Ghost band lyrics found for this song title.');
      }
    } catch (searchError) {
      setError(
        searchError instanceof Error
          ? searchError.message
          : 'Unable to search lyrics. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="lyrics-search" className="lyrics-search">
      <h2>LYRICA</h2>
      <p>
        Search for Ghost lyrics. Other bands may have songs with the same title.
      </p>

      <form className="lyrics-search-form" onSubmit={handleSearch}>
        <input
          className="lyrics-search-input"
          type="text"
          aria-label="Song title"
          placeholder="Enter song title (e.g., Square Hammer, Cirice)"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button
          className="lyrics-search-button"
          type="submit"
          disabled={loading || !query.trim()}
        >
          Search Lyrics
        </button>
      </form>

      {loading && <p role="status">Searching ritual archives...</p>}
      {error && <p className="lyrics-error" role="alert">{error}</p>}

      {results.length > 0 && !selectedLyrics && (
        <div>
          <h3>Select a match:</h3>
          <div className="lyrics-results">
            {results.map((track) => (
              <button
                className="lyrics-result-button"
                key={track.id}
                type="button"
                onClick={() => setSelectedLyrics(track)}
              >
                <strong>{track.trackName}</strong> — <em>{track.albumName}</em>{' '}
                ({formatDuration(track.duration)})
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedLyrics && (
        <div className="lyrics-selected">
          <div className="lyrics-selected-header">
            <h3>{selectedLyrics.trackName}</h3>
            <button
              className="lyrics-back-button"
              type="button"
              onClick={() => setSelectedLyrics(null)}
            >
              Back to results
            </button>
          </div>
          <p className="lyrics-meta">
            Album: {selectedLyrics.albumName} | Artist: {selectedLyrics.artistName}
          </p>

          {selectedLyrics.instrumental ? (
            <p>This track is instrumental.</p>
          ) : (
            <pre className="lyrics-text">
              {selectedLyrics.plainLyrics || 'Plain lyrics unavailable.'}
            </pre>
          )}
        </div>
      )}
    </section>
  );
}

export default LyricsSearch;
