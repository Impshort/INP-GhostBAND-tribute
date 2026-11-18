function FavoriteButton({ isFavorite, onClick }) {
  return (
    <button
      className={`favorite-button${isFavorite ? ' is-favorite' : ''}`}
      type="button"
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      aria-pressed={isFavorite}
      onClick={onClick}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path
          d="M7 3.75h10a1 1 0 0 1 1 1v15l-6-4-6 4v-15a1 1 0 0 1 1-1z"
          fill={isFavorite ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default FavoriteButton;
