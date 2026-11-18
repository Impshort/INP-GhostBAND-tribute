export function getFavoriteSongId(song) {
  if (song.id !== null && song.id !== undefined) {
    return String(song.id);
  }

  return [song.artistName, song.trackName, song.albumName]
    .map((part) => (typeof part === 'string' ? part.trim().toLowerCase() : ''))
    .join('::');
}

export function loadFavoriteSongs() {
  try {
    const savedFavorites = localStorage.getItem('ghostFavoriteSongs');
    if (!savedFavorites) return [];

    const favorites = JSON.parse(savedFavorites);
    if (
      !Array.isArray(favorites) ||
      favorites.some(
        (song) =>
          !song ||
          typeof song.favoriteId !== 'string' ||
          typeof song.trackName !== 'string' ||
          typeof song.artistName !== 'string'
      )
    ) {
      throw new Error('Saved favorites have an invalid format.');
    }

    return favorites;
  } catch (error) {
    console.error('Unable to load favorite songs.', error);
    return [];
  }
}
