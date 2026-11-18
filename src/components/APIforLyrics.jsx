import { useCallback, useEffect, useRef, useState } from 'react';
import FavoriteButton from './FavoriteButton';
import { getFavoriteSongId } from '../utils/favorites';

const songReferenceAlbums = [
  {
    title: 'Opus Eponymous (2010)',
    songs: [
      'Deus Culpa',
      'Con Clavi Con Dio',
      'Ritual',
      'Elizabeth',
      'Stand by Him',
      'Satan Prayer',
      'Death Knell',
      'Prime Mover',
      'Genesis'
    ]
  },
  {
    title: 'Infestissumam (2013)',
    songs: [
      'Infestissumam',
      'Per Aspera ad Inferi',
      'Secular Haze',
      'Jigolo Har Megiddo',
      'Ghuleh / Zombie Queen',
      'Year Zero',
      'Body and Blood',
      'Idolatrine',
      "Depth of Satan's Eyes",
      'Monstrance Clock'
    ]
  },
  {
    title: 'Meliora (2015)',
    songs: [
      'Spirit',
      'From the Pinnacle to the Pit',
      'Cirice',
      'Spöksonat',
      'He Is',
      'Mummy Dust',
      'Majesty',
      'Devil Church',
      'Absolution',
      'Deus in Absentia'
    ]
  },
  {
    title: 'Popestar EP (2016)',
    songs: ['Square Hammer', 'Nocturnal Me', 'I Believe', 'Missionary Man', 'Bible']
  },
  {
    title: 'Prequelle (2018)',
    songs: [
      'Ashes',
      'Rats',
      'Faith',
      'See the Light',
      'Miasma',
      'Dance Macabre',
      'Pro Memoria',
      'Witch Image',
      'Helvetesfönster',
      'Life Eternal'
    ]
  },
  {
    title: 'Seven Inches of Satanic Panic EP (2019)',
    songs: ['Kiss the Go-Goat', 'Mary On A Cross']
  },
  {
    title: 'Impera (2022)',
    songs: [
      'Imperium',
      'Kaisarion',
      'Spillways',
      'Call Me Little Sunshine',
      "Hunter's Moon",
      'Watcher in the Sky',
      'Dominion',
      'Twenties',
      'Darkness at the Heart of My Love',
      'Griftwood',
      'Bite of Passage',
      'Respite on the Spitalfields'
    ]
  },
  {
    title: 'Phantomime EP (2023)',
    songs: [
      'See No Evil',
      'Jesus He Knows Me',
      'Hanging Around',
      'Phantom of the Opera',
      "We Don't Need Another Hero"
    ]
  },
  {
    title: 'Skeletá (2025)',
    songs: [
      'Peacefield',
      'Lachryma',
      'Satanized',
      'Guiding Lights',
      'De Profundis Borealis',
      'Cenotaph',
      'Missilia Amori',
      'Marks of the Evil One',
      'Umbra',
      'Excelsis'
    ]
  }
];

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
  const songReferenceRef = useRef(null);
  const [canScrollToPreviousAlbums, setCanScrollToPreviousAlbums] = useState(false);
  const [canScrollToNextAlbums, setCanScrollToNextAlbums] = useState(true);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLyrics, setSelectedLyrics] = useState(null);
  const [lyricsVisible, setLyricsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateSongReferenceControls = useCallback(() => {
    const scrollElement = songReferenceRef.current;
    if (!scrollElement) return;

    setCanScrollToPreviousAlbums(scrollElement.scrollLeft > 1);
    setCanScrollToNextAlbums(
      scrollElement.scrollLeft + scrollElement.clientWidth < scrollElement.scrollWidth - 1
    );
  }, []);

  useEffect(() => {
    const scrollElement = songReferenceRef.current;
    const albumList = scrollElement?.firstElementChild;
    if (!scrollElement) return undefined;

    updateSongReferenceControls();
    scrollElement.addEventListener('scroll', updateSongReferenceControls, { passive: true });

    const resizeObserver = new ResizeObserver(updateSongReferenceControls);
    resizeObserver.observe(scrollElement);
    if (albumList) resizeObserver.observe(albumList);

    return () => {
      scrollElement.removeEventListener('scroll', updateSongReferenceControls);
      resizeObserver.disconnect();
    };
  }, [updateSongReferenceControls]);

  function scrollSongReference(direction) {
    const scrollElement = songReferenceRef.current;
    const albumList = scrollElement?.firstElementChild;
    const firstAlbum = albumList?.firstElementChild;
    if (!scrollElement || !albumList || !firstAlbum) return;

    const gap = Number.parseFloat(getComputedStyle(albumList).columnGap) || 0;
    scrollElement.scrollBy({
      left: direction * (firstAlbum.getBoundingClientRect().width + gap),
      behavior: 'smooth'
    });
  }

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
        <div className="song-reference-toolbar">
          <p>Use this list as a guide when searching for a song.</p>
          <div className="song-reference-controls">
            <button
              className="song-reference-arrow"
              type="button"
              aria-label="Scroll to previous albums"
              disabled={!canScrollToPreviousAlbums}
              onClick={() => scrollSongReference(-1)}
            >
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              className="song-reference-arrow"
              type="button"
              aria-label="Scroll to next albums"
              disabled={!canScrollToNextAlbums}
              onClick={() => scrollSongReference(1)}
            >
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
        <div
          ref={songReferenceRef}
          className="song-reference-scroll"
          role="region"
          aria-label="Ghost songs by album"
          tabIndex={0}
        >
          <div className="song-reference-albums">
            {songReferenceAlbums.map((album) => (
              <article className="song-reference-album" key={album.title}>
                <h3>{album.title}</h3>
                <ul>
                  {album.songs.map((song) => <li key={song}>{song}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
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
