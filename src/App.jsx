import React, { useState } from 'react';
import './stylecherry.css';
import Navbar from './components/Navbar';
import GhoulCard from './components/GhoulCard';
import PapaFocus from './components/PapaFocus';
import AlbumSection from './components/AlbumSection';

const ghoulsData = [
  { name: "Sodo / Dewdrop", role: "A feisty ghoul, and their lead guitarist.", image: "/images/sodobb.jpg", customClass: "Sodo" },
  { name: "Swiss / Multi-Ghoul", role: "A freaky ghoul often seen to smile really wide to scare fans, that knows how to play multiple instruments, that's why he's called multi-ghoul.", image: "/images/swiss.jpg", customClass: "Swiss" },
  { name: "Aether (Rhythm Guitarist)", role: "A ghoul who often duels with Sodo, and their rhythm guitarist.", image: "/images/banana.jpg", customClass: "Aether" },
  { name: "Rain / Water (Bassist)", role: "A ghoul who fell off the stage during one of his earlier performances, known as grandmaster ass wobbler. ", image: "/images/rain.jpg", customClass: "Rain" },
  { name: "Mountain / Earth(Drummer)", role: "A ghoul that's really tall when with the other members he towers over them, would often throw his drum sticks to the crowd.", image: "/images/mount.jpg", customClass: "Mountain" },
  { name: "Cumulus / Air (Keyboardist)", role: "The Lioness, mainly does backup vocals and plays the keyboard.", image: "/images/cumu.jpg", customClass: "Cumulus" },
  { name: "Cirrus / Air(Keyboardist)", role: "A ghoul known for her keytar solo in Mummy Dust and for affectionately interacting with those around her.", image: "/images/cirrus.jpg", customClass: "Cirrus" },
  { name: "Aurora / Light", role: "A ghoul that likes to dance around with Swiss/Multi-Ghoul. Maintained the secondary keyboards.", image: "/images/fly.jpg", customClass: "Aurora" },
  { name: "Sunshine / Light(tambourine and shaker)", role: "A ghoul notably more chaotic and risqué, also likes to wear her jacket more than the other ghoulletes who wear capes.", image: "/images/sun.jpg", customClass: "Sunshine" }
];

function App() {
  const [visitorName, setVisitorName] = useState('Fellow Ghoul');
  const [bandSuggestion, setBandSuggestion] = useState('');
  
  const [nameInput, setNameInput] = useState('');
  const [suggestionInput, setSuggestionInput] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nameInput.trim() !== '') {
      setVisitorName(nameInput.trim());
    }
    if (suggestionInput.trim() !== '') {
      setBandSuggestion(suggestionInput.trim());
    }
    setIsSubmitted(true);
  };

  return (
    <div>
      {/* HEADER */}
      <header className="Ht" id="tribut">
        <h1>GHOST TRIBUTE</h1>
        <p>Just wanted to introduce the amazing world of Ghost!</p>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} style={{ marginTop: '1.2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}>
            <p style={{ color: '#d4af37', fontSize: '0.95rem', margin: 0 }}>Join the ritual! Tell us your name & favorite band recommendation:</p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <input 
                type="text" 
                placeholder="Your Name (e.g. Little Ghoul)" 
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                style={{ padding: '0.4rem 0.8rem', borderRadius: '4px', border: '1px solid #444', background: '#222', color: '#fff' }}
              />
              <input 
                type="text" 
                placeholder="Other band suggestion" 
                value={suggestionInput}
                onChange={(e) => setSuggestionInput(e.target.value)}
                style={{ padding: '0.4rem 0.8rem', borderRadius: '4px', border: '1px solid #444', background: '#222', color: '#fff' }}
              />
              <button type="submit" style={{ padding: '0.4rem 1rem', borderRadius: '4px', background: '#d4af37', color: '#000', fontWeight: 'bold', cursor: 'pointer', border: 'none' }}>
                Enter
              </button>
            </div>
          </form>
        ) : (
          <div style={{ marginTop: '1.0rem', color: '#d4af37' }}>
            <p><strong>Welcome, {visitorName}!</strong></p>
            {bandSuggestion && (
              <p><em>Thanks for suggesting: <strong>{bandSuggestion}</strong>! We'll check them out! 🤘</em></p>
            )}
          </div>
        )}
      </header>

      {/* NAVIGATION */}
      <Navbar />

      {/* MAIN CONTENT */}
      <main>
        {/* LORE SECTION */}
        <section id="lore" className="LORE">
          <h2 id="BRILORE">Briefest Intro About Them</h2>
          <p id="FLore">
            Ghost is a Swedish heavy metal band known for their theatrical stage presence and elaborate backstory, 
            often referred to as "lore." The band portrays themselves as a satanic clergy 
            with a frontman known as the "Papa Emeritus," who is essentially the leader of the band.
            <br />
            <strong>Papa Emeritus/ Copia:</strong> The character of Papa Emeritus/copia serves as the lead singer and mostly the one who interacts with the fans.
            <br />
            <strong>Nameless Ghouls:</strong> The other members of the band are known as Nameless Ghouls, who wear identical masks and costumes, 
            in which changes per ERA of the Ghost band. They are mainly the ones who play the instruments and provide backing vocals.
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