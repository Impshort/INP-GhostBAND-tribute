import GhoulCard from './components/GhoulCard';

const ghoulsData = [
  {
    name: "Sodo / Dewdrop (Main Lead)",
    role: "A feisty ghoul. Famous for playing the iconic solo ().",
    image: "/images/sodobb.jpg",
    customClass: "Sodo"
  },
  {
    name: "Swiss (Multi-Ghoul)",
    role: "Freakiest Ghoul, often seen to smiling at the audience, plays multiple intstrument.",
    image: "/images/swiss.jpg",
    customClass: "Swiss"
  },
  {
    name: "Aether (Rhythm Guitar)",
    role: "A ghoul who often duels with Sodo. REALLY likes bananas and one of the three that comes to the front of the stage to play with his two bandmates.",
    image: "/images/banana.jpg",
    customClass: "Aether"
  },
  {
    name: "Rain / Water (Bassist)",
    role: "A ghoul who fell off the stage during one of his earlier performances, known as grandmaster ass wobbler.",
    image: "/images/rain.jpg",
    customClass: "Rain"
  },
  {
    name: "Mountain / Earth (Drummer)",
    role: "Really tall like a mountain as he towers over his bandmates the most, would often throw his drum sticks to the crowd.",
    image: "/images/mount.jpg",
    customClass: "Mountain"
  },
  {
    name: "Cumulus / Air (Keytar)",
    role: "The Lioness, mainly does backup vocals and plays the keyboard.",
    image: "/images/cumu.jpg",
    customClass: "Cumulus"
  },
  {
    name: "Cirrus / Air (Keytar)",
    role: "A ghoul known for her keytar solo in Mummy Dust and for affectionately interacting with those around her.",
    image: "/images/cirrus.jpg",
    customClass: "Cirrus"
  },
  {
    name: "Aurora / Light (Vocals)",
    role: "Jolly little ghoul aint she. Dances around the stage but mostly near swiss.",
    image: "/images/fly.jpg",
    customClass: "Aurora"
  },
  {
    name: "Sunshine / Light (Percussion)",
    role: "A ghoul notably more chaotic and risqué, plays the tambourine and shaker, also likes to wear her jacket more than the other ghoulletes who wear capes.",
    image: "/images/sun.jpg",
    customClass: "Sunshine"
  }
];

function Ghoul() {
  return (
    <section id="ghouls" className="NGHOULD">
      <h2>The Nameless Ghouls</h2>
      <p>This is mostly of the Ghouls that joined and ones that actually did leave a mark on the band:</p>

      <div className="ghouls-grid">
        {ghoulsData.map((ghoul) => (
          <GhoulCard
            key={ghoul.name}
            name={ghoul.name}
            role={ghoul.role}
            image={ghoul.image}
            customClass={ghoul.customClass}
          />
        ))}
      </div>
    </section>
  );
}

export default Ghoul;
