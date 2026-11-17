import { useState } from 'react';
import './stylecherry.css';
import Navbar from './components/Navbar';
import Ghoul from './Ghoul';
import Phase from './phase';
import PapaFocus from './components/PapaFocus';
import LyricsSearch from './components/APIforLyrics';
import AlbumSection from './components/AlbumSection';


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
            <p><strong>Welcome back, {visitorName}! 🤘</strong></p>
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
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
              />
              <input
                className="modal-input"
                type="text"
                aria-label="Band recommendation"
                placeholder="Other band suggestion"
                value={suggestionInput}
                onChange={(e) => setSuggestionInput(e.target.value)}
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
            </section>
          )}
          {activeTab === 'phases' && (
            <>
              <Phase />
              <LyricsSearch />
            </>
          )}
          {activeTab === 'ghouls' && <Ghoul />}
          {activeTab === 'papas' && <PapaFocus />}
          {activeTab === 'albums' && <AlbumSection />}
        </div>
      </main>

      {/* FOOTER */}
      <footer>
        <p>&copy; 2026 Midterm Web Project 
          | Created for Ghost Band Tribute, all credits go to the respective owners. This is for the purpose of fulfilling my Project</p>
      </footer>
    </div>
  );
}

export default App;