import { useState } from 'react';
import './stylecherry.css';
import Navbar from './components/Navbar';
import GhoulCard from './components/GhoulCard';
import PapaFocus from './components/PapaFocus';
import LyricsSearch from './components/APIforLyrics';
import AlbumSection from './components/AlbumSection';



const ghoulsData = [
  { name: "Sodo / Dewdrop (Main Lead)", 
    role: "A feisty ghoul. Famous for playing the iconic solo ().", 
    image: "/images/sodobb.jpg", customClass: "Sodo" },

  { name: "Swiss (Multi-Ghoul)", 
    role: "Freakiest Ghoul, often seen to smiling at the audience, plays multiple intstrument.", 
    image: "/images/swiss.jpg", customClass: "Swiss" },

  { name: "Aether (Rhythm Guitar)", 
    role: "A ghoul who often duels with Sodo. REALLY likes bananas and one of the three that comes to the front of the stage to play with his two bandmates.", 
    image: "/images/banana.jpg", customClass: "Aether" },

  { name: "Rain / Water (Bassist)", 
    role: "A ghoul who fell off the stage during one of his earlier performances, known as grandmaster ass wobbler.", 
    image: "/images/rain.jpg", customClass: "Rain" },

  { name: "Mountain / Earth (Drummer)", 
    role: "Really tall like a mountain as he towers over his bandmates the most, would often throw his drum sticks to the crowd.", 
    image: "/images/mount.jpg", customClass: "Mountain" },

  { name: "Cumulus / Air (Keytar)", 
    role: "The Lioness, mainly does backup vocals and plays the keyboard.", 
    image: "/images/cumu.jpg", customClass: "Cumulus" },

  { name: "Cirrus / Air (Keytar)", 
    role: "A ghoul known for her keytar solo in Mummy Dust and for affectionately interacting with those around her.", 
    image: "/images/cirrus.jpg", customClass: "Cirrus" },

  { name: "Aurora / Light (Vocals)", 
    role: "Jolly little ghoul aint she. Dances around the stage but mostly near swiss.", 
    image: "/images/fly.jpg", customClass: "Aurora" },

  { name: "Sunshine / Light (Percussion)", 
    role: "A ghoul notably more chaotic and risqué, plays the tambourine and shaker, also likes to wear her jacket more than the other ghoulletes who wear capes.", 
    image: "/images/sun.jpg", customClass: "Sunshine" }
];

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
      <Navbar />

      {/* MAIN CONTENT */}
      <main>
        {/* LORE SECTION */}
        <section id="lore" className="LORE">
          <h2 id="BRILORE">Briefest Intro About Them</h2>
          <p id="FLore">
            Ghost is a swedish rock band known for their theatrical stage presence with a elaborate backstory.
             A satanic clergy with a frontman known as "Papa Emiritus". 
          </p>
          <blockquote id="LoreSum">
            "It's mostly the adventures of the Ministry, a politicized, gently corrupt, Satan-loving satire of the Catholic church. 
            The various 'papas', all played by Forge, change with every album cycle as various Ministry characters manipulate things and eventually kill them off, 
            just for the next Papa to arise." - cd:nixiedust
          </blockquote>
        </section>

        {/* PHASES SECTION */}
        <section id="phases" className="PHASES">
          <h2>Album & Lore Phases</h2>
          <table>
            <thead>
              <tr>
                <th><img src="/images/Oe.jpg" alt="Phase 1" /></th>
                <th><img src="/images/Infes.jpg" alt="Phase 2" /></th>
                <th><img src="/images/Meli.JPG" alt="Phase 3" /></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Opus Eponymous (2008–2012)</td>
                <td>Infestissumam (2013–2015)</td>
                <td>Meliora (2015–2018)</td>
              </tr>
            </tbody>
            <thead>
              <tr>
                <th><img src="/images/preq.jpg" alt="Phase 4" /></th>
                <th><img src="/images/imp.jpg" alt="Phase 5" /></th>
                <th><img src="/images/skele.png" alt="Phase 6" /></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Prequelle (2018–2020)</td>
                <td>Impera (2020–2025)</td>
                <td>Skeletá (2025–Present)</td>
              </tr>
            </tbody>
          </table>
        </section>

        <LyricsSearch />

        {/* GHOULS SECTION */}
        <section id="ghouls" className="NGHOULD">
          <h2>The Nameless Ghouls</h2>
          <p>This is mostly of the Ghouls that joined and ones that actually did leave a mark on the band:</p>

          <div className="ghouls-grid">
            {ghoulsData.map((ghoul, index) => (
              <GhoulCard 
                key={index}
                name={ghoul.name}
                role={ghoul.role}
                image={ghoul.image}
                customClass={ghoul.customClass}
              />
            ))}
          </div>
        </section>
        {/* PAPA FOCUS SECTION */}
        <PapaFocus />

        {/* FAVORITE ALBUMS SECTION */}
        <AlbumSection />
      </main>

      {/* FOOTER */}
      <footer>
        <p>&copy; 2026 Midterm Web Project | Created for Ghost Band Tribute, all credits go to the respective owners</p>
      </footer>
    </div>
  );
}

export default App;