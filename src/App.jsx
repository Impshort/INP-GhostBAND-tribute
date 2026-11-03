import React, { useState, useEffect } from 'react';
import './stylecherry.css';

function App() {
  const [visitorName, setVisitorName] = useState('Fellow Ghoul');
  const [bandSuggestion, setBandSuggestion] = useState('');

  useEffect(() => {
    // Dynamic greeting from your script.js
    const name = prompt("Welcome to the Ghost Fanpage! What is your name?", "Little Ghoul");
    if (name && name.trim() !== "") {
      setVisitorName(name);
    }
    const suggestion = prompt(`Hi ${name || 'Little Ghoul'}! Do you have any other band suggestions you think a Ghost fan would like?`);
    if (suggestion && suggestion.trim() !== "") {
      setBandSuggestion(suggestion);
    }
  }, []);

  return (
    <div>
      {/* HEADER */}
      <header className="Ht" id="tribut">
        <h1>GHOST TRIBUTE</h1>
        <p>Just wanted to introduce the amazing world of Ghost!</p>
        <div style={{ marginTop: '1rem', color: '#d4af37' }}>
          <p><strong>Welcome, {visitorName}!</strong></p>
          {bandSuggestion && (
            <p><em>Thanks for suggesting: <strong>{bandSuggestion}</strong>! We'll check them out! 🤘</em></p>
          )}
        </div>
      </header>

      {/* NAVIGATION */}
      <nav>
        <ul>
          <li><a href="#lore">Brief Story</a></li>
          <li><a href="#phases">Phases</a></li>
          <li><a href="#ghouls">Nameless Ghouls</a></li>
          <li><a href="#vocalist">Papa Focus</a></li>
          <li><a href="#albums">Favorite Albums</a></li>
        </ul>
      </nav>

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
            <div className="ghoul-card Sodo">
              <img src="/images/sodobb.jpg" alt="Sodo/Dewdrop" className="card-image" />
              <div className="card-content">
                <h3>Sodo / Dewdrop</h3>
                <p>A feisty ghoul, and their lead guitarist.</p>
              </div>
            </div>

            <div className="ghoul-card Swiss">
              <img src="/images/swiss.jpg" alt="Swiss/Multi-Ghoul" className="card-image" />
              <div className="card-content">
                <h3>Swiss / Multi-Ghoul</h3>
                <p>A freaky ghoul often seen to smile really wide to scare fans, that knows how to play multiple instruments, that's why he's called multi-ghoul.</p>
              </div>
            </div>

            <div className="ghoul-card Aether">
              <img src="/images/banana.jpg" alt="Aether" className="card-image" />
              <div className="card-content">
                <h3>Aether</h3>
                <p>A ghoul who often duels with Sodo, and their rhythm guitarist.</p>
              </div>
            </div>

            <div className="ghoul-card Rain">
              <img src="/images/rain.jpg" alt="Rain/Water" className="card-image" />
              <div className="card-content">
                <h3>Rain / Water</h3>
                <p>A ghoul who fell off the stage during one of his earlier performances, known as grandmaster ass wobbler. Played as the bassist.</p>
              </div>
            </div>

            <div className="ghoul-card Mountain">
              <img src="/images/mount.jpg" alt="Mountain" className="card-image" />
              <div className="card-content">
                <h3>Mountain / Earth</h3>
                <p>A ghoul that's really tall, he plays drums, would often throw his drum sticks to the crowd.</p>
              </div>
            </div>

            <div className="ghoul-card Cumulus">
              <img src="/images/cumu.jpg" alt="Cumulus/Air" className="card-image" />
              <div className="card-content">
                <h3>Cumulus / Air</h3>
                <p>The Lioness, mainly does backup vocals and plays the keyboard.</p>
              </div>
            </div>

            <div className="ghoul-card Cirrus">
              <img src="/images/cirrus.jpg" alt="Cirrus/Air" className="card-image" />
              <div className="card-content">
                <h3>Cirrus / Air</h3>
                <p>A ghoul known for her keytar solo in Mummy Dust and for affectionately interacting with those around her.</p>
              </div>
            </div>

            <div className="ghoul-card Aurora">
              <img src="/images/fly.jpg" alt="Aurora/Light" className="card-image" />
              <div className="card-content">
                <h3>Aurora / Light</h3>
                <p>A ghoul that likes to dance around with Swiss/Multi-Ghoul. Maintained the secondary keyboards.</p>
              </div>
            </div>

            <div className="ghoul-card Sunshine">
              <img src="/images/sun.jpg" alt="Sunshine/Light" className="card-image" />
              <div className="card-content">
                <h3>Sunshine / Light</h3>
                <p>A ghoul notably more chaotic and risqué, plays the tambourine and shaker, also likes to wear her jacket more than the other ghoulletes who wear capes.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer>
        <p>&copy; 2026 FINAL WEB PROJECT | Created for Ghost Band Tribute, all credits go to the respective owners</p>
      </footer>
    </div>
  );
}

export default App;