import { useState } from 'react';
import FavoriteButton from './FavoriteButton';
import { getFavoriteSongId } from '../utils/favorites';

const songReferenceText = 'Add Ghost song titles here, one per line.';

function getSearchWords(value) {
  return value
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .match(/[\p{L}\p{N}]+/gu) || [];
}

function matchesSongTitle(title, queryWords) {
  const titleWords = getSearchWords(title);
  return queryWords.every((queryWord) =>
    titleWords.some((titleWord) => titleWord.startsWith(queryWord))
  );
}

function LyricsSearch({ favoriteSongs, onToggleFavorite }) {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLyrics, setSelectedLyrics] = useState(null);
  const [lyricsVisible, setLyricsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSearch(event) {
    event.preventDefault();
    const trackQuery = query.trim();

    if (!trackQuery) return;

    const queryWords = getSearchWords(trackQuery);
    if (queryWords.length === 0) {
      setError('Enter at least one letter or number in the song title.');
      return;
    }

    setLoading(true);
    setError(null);
    setSearchResults([]);
    setSelectedLyrics(null);
    setLyricsVisible(false);

    try {
      const response = await fetch(
        `https://lrclib.net/api/search?track_name=${encodeURIComponent(queryWords[0])}&artist_name=Ghost`,
        {
          headers: {
            'Lrclib-Client': 'GhostTributeApp v1.0 (https://github.com/capstone)',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Lyrics search failed (${response.status}). Please try again.`);
      }

      const tracks = await response.json();

      if (!Array.isArray(tracks)) {
        throw new Error('The lyrics service returned an unexpected response.');
      }

      const matchingTracks = tracks.filter(
        (track) =>
          track &&
          typeof track === 'object' &&
          typeof track.artistName === 'string' &&
          track.artistName.trim().toLowerCase() === 'ghost' &&
          typeof track.trackName === 'string' &&
          matchesSongTitle(track.trackName, queryWords)
      );

      if (matchingTracks.length === 0) {
        setError(`No Ghost song found matching "${trackQuery}". Try a different part of the title.`);
        return;
      }

      setSearchResults(matchingTracks);
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
        Search by part of a Ghost song title and choose a matching result.
      </p>

      <div className="song-reference">
        <p>Use this list as a guide when searching for a song.</p>
        <pre className="song-reference-text">{songReferenceText}</pre>
      </div>

      <form className="lyrics-search-form" onSubmit={handleSearch}>
        <input
          className="lyrics-search-input"
          type="text"
          aria-label="Song title"
          placeholder="Enter part of a Ghost song title (e.g., Dance)"
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

      {searchResults.length > 0 && (
        <ul className="lyrics-results" aria-label="Matching Ghost songs">
          {searchResults.map((track) => (
            <li key={getFavoriteSongId(track)}>
              <button
                className="lyrics-result-button"
                type="button"
                onClick={() => {
                  setSelectedLyrics(track);
                  setSearchResults([]);
                  setLyricsVisible(false);
                }}
              >
                <strong>{track.trackName}</strong>
                <span>{track.albumName || 'Album unknown'}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {selectedLyrics && (
        <div className="lyrics-selected">
          <div className="lyrics-selected-header">
            <h3>{selectedLyrics.trackName}</h3>
            <FavoriteButton
              isFavorite={favoriteSongs.some(
                (favorite) => favorite.favoriteId === getFavoriteSongId(selectedLyrics)
              )}
              onClick={() => onToggleFavorite(selectedLyrics)}
            />
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
