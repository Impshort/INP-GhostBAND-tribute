import { useState } from 'react';
import FavoriteButton from './FavoriteButton';

function LibrarySection({ favoriteSongs, onToggleFavorite, storageError }) {
  const [revealedSongId, setRevealedSongId] = useState(null);

  return (
    <section id="library">
      <h2>LIBRARY</h2>
      <p>Your favorite Ghost songs are saved here.</p>

      {storageError && <p className="lyrics-error" role="alert">{storageError}</p>}

      {favoriteSongs.length === 0 ? (
        <p>No favorite songs yet. Search for a Ghost song in Phases &amp; Lyrics and bookmark it to add it here.</p>
      ) : (
        <div className="library-list">
          {favoriteSongs.map((song) => {
            const lyricsVisible = revealedSongId === song.favoriteId;

            return (
              <article className="library-song" key={song.favoriteId}>
                <div className="library-song-header">
                  <button
                    className="library-song-title"
                    type="button"
                    aria-expanded={lyricsVisible}
                    onClick={() => {
                      setRevealedSongId(lyricsVisible ? null : song.favoriteId);
                    }}
                  >
                    <span>{song.trackName}</span>
                    <span className="library-song-hint">
                      {lyricsVisible ? 'Hide lyrics' : 'Show lyrics'}
                    </span>
                  </button>
                  <FavoriteButton
                    isFavorite
                    onClick={() => onToggleFavorite(song)}
                  />
                </div>
                <p className="lyrics-meta">
                  Album: {song.albumName || 'Unknown'} | Artist: {song.artistName}
                </p>
                {lyricsVisible && (
                  song.instrumental ? (
                    <p>This track is instrumental.</p>
                  ) : (
                    <pre className="lyrics-text">
                      {song.plainLyrics || 'Plain lyrics unavailable.'}
                    </pre>
                  )
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default LibrarySection;
