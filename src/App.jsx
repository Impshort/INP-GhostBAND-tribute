import { useState } from 'react';
import './stylecherry.css';
import Navbar from './components/Navbar';
import Ghoul from './Ghoul';
import Phase from './phase';
import PapaFocus from './components/PapaFocus';
import LyricsSearch from './components/APIforLyrics';
import LibrarySection from './components/LibrarySection';
import { getFavoriteSongId, loadFavoriteSongs } from './utils/favorites';


function App() {
  const [visitorName, setVisitorName] = useState(
    () => localStorage.getItem('ghostVisitorName') || 'Fellow Ghoul'
  );
  const [bandSuggestion, setBandSuggestion] = useState(
    () => localStorage.getItem('ghostBandSuggestion') || ''
  );
  const [nameInput, setNameInput] = useState('');
  const [suggestionInput, setSuggestionInput] = useState('');
  const [hasVisited, setHasVisited] = useState(
    () => localStorage.getItem('ghostRitualVisited') === 'true'
  );
  const [showModal, setShowModal] = useState(
    () => localStorage.getItem('ghostRitualVisited') !== 'true'
  );
  const [activeTab, setActiveTab] = useState('lore');
  const [favoriteSongs, setFavoriteSongs] = useState(loadFavoriteSongs);
  const [favoritesError, setFavoritesError] = useState('');

  function handleToggleFavorite(song) {
    const favoriteId = getFavoriteSongId(song);
    const isFavorite = favoriteSongs.some((favorite) => favorite.favoriteId === favoriteId);
    const nextFavorites = isFavorite
      ? favoriteSongs.filter((favorite) => favorite.favoriteId !== favoriteId)
      : [...favoriteSongs, { ...song, favoriteId }];

    setFavoriteSongs(nextFavorites);
    try {
      localStorage.setItem('ghostFavoriteSongs', JSON.stringify(nextFavorites));
      setFavoritesError('');
    } catch (storageError) {
      console.error('Unable to save favorite songs.', storageError);
      setFavoritesError('Your favorites could not be saved on this device.');
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const finalName = nameInput.trim() || 'Fellow Ghoul';
    const finalSuggestion = suggestionInput.trim();

    setVisitorName(finalName);
    setBandSuggestion(finalSuggestion);

    localStorage.setItem('ghostRitualVisited', 'true');
    localStorage.setItem('ghostVisitorName', finalName);
    localStorage.setItem('ghostBandSuggestion', finalSuggestion);

    setShowModal(false);
    setHasVisited(true);
  };

  const handleClose = () => {
    localStorage.setItem('ghostRitualVisited', 'true');
    setShowModal(false);
    setHasVisited(true);
  };

  return (
    <div>
      {/* HEADER */}
      <header className="Ht" id="tribut">
        <h1>GHOST TRIBUTE</h1>
        <p>Just wanted to introduce the amazing world of Ghost!</p>
        
        {hasVisited && (
          <div className="visitor-welcome">
            <p><strong>Welcome, {visitorName}! 🤘</strong></p>
            {bandSuggestion && (
              <p className="visitor-suggestion">
                Your recommendation: {bandSuggestion}
              </p>
            )}
          </div>
        )}
      </header>

      {/* POP-UP MODAL CARD */}
      {showModal && (
        <div className="modal-overlay">
          <div
            className="modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <button
              className="modal-close-btn"
              type="button"
              aria-label="Close dialog"
              onClick={handleClose}
            >
              &times;
            </button>
            <h2 id="modal-title">Join the Ritual! 🤘</h2>
            <p className="modal-description">
              Tell us your name & favorite band recommendation before entering:
            </p>
            <form className="modal-form" onSubmit={handleSubmit}>
              <input
                className="modal-input"
                type="text"
                aria-label="Your name"
                placeholder="Your Name (e.g. Little Ghoul)"
                required
                value={nameInput}
                onChange={(e) => {
                  e.target.setCustomValidity(
                    e.target.value.trim() ? '' : 'Please enter your name.'
                  );
                  setNameInput(e.target.value);
                }}
              />
              <input
                className="modal-input"
                type="text"
                aria-label="Band recommendation"
                placeholder="Other band suggestion"
                required
                value={suggestionInput}
                onChange={(e) => {
                  e.target.setCustomValidity(
                    e.target.value.trim() ? '' : 'Please enter a band recommendation.'
                  );
                  setSuggestionInput(e.target.value);
                }}
              />
              <button className="modal-submit" type="submit">
                Enter Ritual
              </button>
            </form>
          </div>
        </div>
      )}

      {/* NAVIGATION */}
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* MAIN CONTENT */}
      <main>
        <div
          id={`panel-${activeTab}`}
          className="tab-panel"
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          tabIndex={0}
        >
          {activeTab === 'lore' && (
            <section id="lore" className="LORE">
              <h2 id="BRILORE">A brief introduction about</h2>
              <p id="FLore">
                Ghost is a swedish rock band known for their theatrical stage presence with a elaborate backstory.
                A satanic clergy with a frontman known as "Papa Emiritus".
              </p>
              <blockquote id="LoreSum">
                "It's mostly the adventures of the Ministry, a politicized, gently corrupt, Satan-loving satire of the Catholic church.
                The various 'papas', all played by Forge, change with every 
                album cycle as various Ministry characters manipulate things and 
                eventually kill them off, just for the next Papa to arise." - cd:nixiedust
              </blockquote>

              <figure className="lore-band-card">
                <img
                  className="lore-band-image"
                  src="/images/DBAND.jpg"
                  alt="Group photo of Ghost"
                />
              </figure>

              <article className="leader-card">
                <img
                  className="leader-image"
                  src="/images/tobias.jpg"
                  alt="Tobias Forge"
                />
                <div className="leader-content">
                  <h3>Band Leader: Tobias Forge</h3>
                  <div className="leader-info-slot">
                    Add information about Tobias Forge here.
                  </div>
                </div>
              </article>
            </section>
          )}
          {activeTab === 'phases' && (
            <>
              <Phase />
              <LyricsSearch
                favoriteSongs={favoriteSongs}
                onToggleFavorite={handleToggleFavorite}
              />
            </>
          )}
          {activeTab === 'ghouls' && <Ghoul />}
          {activeTab === 'papas' && <PapaFocus />}
          {activeTab === 'library' && (
            <LibrarySection
              favoriteSongs={favoriteSongs}
              onToggleFavorite={handleToggleFavorite}
              storageError={favoritesError}
            />
          )}
        </div>
      </main>

      {/* FOOTER */}
      <footer>
        <p>&copy; 2026 Midterm Web Project 
          | Created for Ghost Band Tribute, all credits go to the respective owners. This is for the purpose of fulfilling my Final Project in school</p>
      </footer>
    </div>
  );
}

export default App;