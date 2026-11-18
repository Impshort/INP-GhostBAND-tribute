import { useState } from 'react';
import FavoriteButton from './FavoriteButton';
import { getFavoriteSongId } from '../utils/favorites';

function LyricsSearch({ favoriteSongs, onToggleFavorite }) {
  const [query, setQuery] = useState('');
  const [selectedLyrics, setSelectedLyrics] = useState(null);
  const [lyricsVisible, setLyricsVisible] = useState(false);
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

      if (
        typeof track.artistName !== 'string' ||
        typeof track.trackName !== 'string' ||
        track.artistName.trim().toLowerCase() !== 'ghost'
      ) {
        setError(`No Ghost song found for "${trackQuery}". Try another title.`);
        return;
      }

      setSelectedLyrics(track);
      setLyricsVisible(false);
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
          placeholder="Enter a Ghost song title (e.g., Dance Macabre)"
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
            <div className="lyrics-actions">
              <FavoriteButton
                isFavorite={favoriteSongs.some(
                  (favorite) => favorite.favoriteId === getFavoriteSongId(selectedLyrics)
                )}
                onClick={() => onToggleFavorite(selectedLyrics)}
              />
              <button
                className="lyrics-back-button"
                type="button"
                onClick={() => {
                  setSelectedLyrics(null);
                  setLyricsVisible(false);
                }}
              >
                Back to search
              </button>
            </div>
          </div>
          <p className="lyrics-meta">
            Album: {selectedLyrics.albumName} | Artist: {selectedLyrics.artistName}
          </p>

          <button
            className="lyrics-toggle-button"
            type="button"
            aria-expanded={lyricsVisible}
            onClick={() => setLyricsVisible((visible) => !visible)}
          >
            {lyricsVisible ? 'Hide lyrics' : 'Show lyrics'}
          </button>
          {lyricsVisible && (
            selectedLyrics.instrumental ? (
              <p>This track is instrumental.</p>
            ) : (
              <pre className="lyrics-text">
                {selectedLyrics.plainLyrics || 'Plain lyrics unavailable.'}
              </pre>
            )
          )}
        </div>
      )}
    </section>
  );
}

export default LyricsSearch;
