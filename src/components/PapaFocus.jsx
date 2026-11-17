import { useState } from 'react';

const papasData = [

  {

    name: "Papa Nihil",
    years: "2008–2012",
    description: "The original elderly frontman who started it all with dark, classical Gregorian chant-infused metal vibes.",
    images: [
      "/images/pap/NIHIL.jpg",
      "/images/pap/NI_F.jpg",
      "/images/pap/NI_shda.jpg",
      "/images/pap/NI_poopi.jpg",
      "/images/pap/NI_trum.jpg"
    ]
  },
  {
    name: "PRIMO",
    years: "2012–2015",
    description: "A more charismatic and sinister figure with an iconic painted face mask, papal robes, and casual secular attire.",
    images: [
      "/images/pap/primo.jpg",
      "/images/pap/PR_FIRE.jpg"
    ]
  },
  {
    name: "SECONDO",
    years: "2015–2020",
    description: "The suave, younger brother who introduced theatricality, black tuxedos, and acoustic performances.",
    images: [
      "/images/pap/SECONDO.jpg",
      "/images/pap/SE_DOG.jpg",
      "/images/pap/SE_shade.jpg"
    ]
  },
  {
    name: "TERZO",
    years: "2020–Present",
    description: "The former Cardinal who earned his papal title through hard work, driving Ghost into stadium rock royalty.",
    images: [
      "/images/pap/TERZO.jpg",
      "/images/pap/TE_=p.jpg",
      "/images/pap/TE_CROSSLEGGED.jpg",
      "/images/pap/TE_TITANIC.jpg",
      "/images/pap/TE_BUG.jpg"
    ]
  },

  {
    name: "COPIA",
    years: "2020–Present",
    description: "The former Cardinal who earned his papal title through hard work, driving Ghost into stadium rock royalty.",
    images: [
      "/images/pap/COPIA.jpg",
      "/images/pap/CO_THRUST.jpg",
      "/images/pap/CO_GAY.jpg",
      "/images/pap/CO_LEG.jpg",
      "/images/pap/CO_HAIR.jpg"
      
    ]
  },

  {
    name: "PERPETUA",
    years: "2020–Present",
    description: "The former Cardinal who earned his papal title through hard work, driving Ghost into stadium rock royalty.",
    images: [
      "/images/pap/PERPETUA.jpg",
      "/images/pap/PE_EYE.jpg",
      "/images/pap/PE_RUN.jpg"
    ]
  }
];

function PapaCard({ papa }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div 
      style={{ 
        background: '#111', 
        border: '1px solid #333', 
        borderRadius: '8px', 
        padding: '1.2rem', 
        textAlign: 'center',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)' 
      }}
    >
      {/* PAPA PORTRAIT */}
      <div style={{ width: '100%', height: '300px', marginBottom: '1rem' }}>
        <button
          type="button"
          aria-label={`Show another photo of ${papa.name}`}
          onClick={() => setCurrentIndex((index) => (index + 1) % papa.images.length)}
          style={{
            width: '100%',
            height: '100%',
            padding: 0,
            border: 0,
            background: 'transparent',
            cursor: 'pointer'
          }}
        >
          <img
            src={papa.images[currentIndex]}
            alt={`${papa.name} look ${currentIndex + 1}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '6px',
              border: '1px solid #d4af37'
            }}
          />
        </button>
      </div>

      {/* PAPA DETAILS */}
      <h3 style={{ color: '#d4af37', fontSize: '1.05rem', margin: '0.4rem 0' }}>{papa.name}</h3>
      <span style={{ display: 'block', color: '#888', fontSize: '0.8rem', marginBottom: '0.6rem' }}>
        {papa.years}
      </span>
      <p style={{ color: '#ccc', fontSize: '0.85rem', lineHeight: '1.4', margin: 0 }}>
        {papa.description}
      </p>
    </div>
  );
}

function PapaFocus() {
  return (
    <section id="papas" className="PAPA-SECTION" style={{ margin: '2.5rem 0' }}>
      <h2 style={{ color: '#d4af37', borderBottom: '1px solid #444', paddingBottom: '0.5rem' }}>
        The Papas Era Focus
      </h2>
      <p style={{ color: '#ccc', marginBottom: '1.5rem' }}>
        Click a portrait to view another look:
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.5rem' }}>
        {papasData.map((papa, index) => (
          <PapaCard key={index} papa={papa} />
        ))}
      </div>
    </section>
  );
}

export default PapaFocus;