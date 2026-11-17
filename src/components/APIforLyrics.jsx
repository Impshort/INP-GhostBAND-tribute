import { useState } from 'react';

function LyricsSearch() {
  const [query, setQuery] = useState('');
  const [selectedLyrics, setSelectedLyrics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSearch(event) {
    event.preventDefault();
    const trackQuery = query.trim();

    if (!trackQuery) return;

    setLoading(true);
    setError(null);
    setSelectedLyrics(null);

    try {
      const response = await fetch(
        `https://lrclib.net/api/get?artist_name=Ghost&track_name=${encodeURIComponent(trackQuery)}`,
        {
          headers: {
            'Lrclib-Client': 'GhostTributeApp v1.0 (https://github.com/capstone)',
          },
        }
      );

      if (response.status === 404) {
        setError(`No Ghost song found for "${trackQuery}". Try another title.`);
        return;
      }

      if (!response.ok) {
        throw new Error(`Lyrics search failed (${response.status}). Please try again.`);
      }

      const track = await response.json();

      if (!track || typeof track !== 'object' || Array.isArray(track)) {
        throw new Error('The lyrics service returned an unexpected response.');
      }

      if (track.artistName?.trim().toLowerCase() !== 'ghost') {
        setError(`No Ghost song found for "${trackQuery}". Try another title.`);
        return;
      }

      setSelectedLyrics(track);
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
        Search for a Ghost song by title.
      </p>

      <form className="lyrics-search-form" onSubmit={handleSearch}>
        <input
          className="lyrics-search-input"
          type="text"
          aria-label="Song title"
          placeholder="Enter a Ghost song title (e.g., Mary on a Cross)"
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

      {selectedLyrics && (
        <div className="lyrics-selected">
          <div className="lyrics-selected-header">
            <h3>{selectedLyrics.trackName}</h3>
            <button
              className="lyrics-back-button"
              type="button"
              onClick={() => setSelectedLyrics(null)}
            >
              Back to search
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
