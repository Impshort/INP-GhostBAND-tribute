import React, { useState } from 'react';

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
      "/images/primo.jpg",
      "/images/PR_FIRE.jpg", ]
  },
  {
    name: "SECONDO",
    years: "2015–2020",
    description: "The suave, younger brother who introduced theatricality, black tuxedos, and acoustic performances.",
    images: [
      "/images/SECONDO",
      "/images/SE_DOG.jpg",
      "/images/SE_shade.jpg"
    ]
  },
  {
    name: "TERZO",
    years: "2020–Present",
    description: "The former Cardinal who earned his papal title through hard work, driving Ghost into stadium rock royalty.",
    images: [
      "/images/TERZO.jpg",
      "/images/TE_=p.jpg",
      "/images/TE_CROSSLEGGED.jpg",
      "/images/TE_TITANIC.jpg",
      "/images/TE_BUG.jpg"
    ]
  },

  {
    name: "COPIA",
    years: "2020–Present",
    description: "The former Cardinal who earned his papal title through hard work, driving Ghost into stadium rock royalty.",
    images: [
      "/images/COPIA.jpg",
      "/images/CO_THRUST.jpg",
      "/images/CO_GAY.jpg",
      "/images/CO_LEG.jpg",
      "/images/CO_HAIR.jpg"
    ]
  },

  {
    name: "PERPETUA",
    years: "2020–Present",
    description: "The former Cardinal who earned his papal title through hard work, driving Ghost into stadium rock royalty.",
    images: [
      "/images/PERPETUA.jpg",
      "/images/PE_EYE.jpg",
      "/images/PE_RUN.jpg"
    ]
  }
];

// Individual Card Component so each Papa has their own independent arrows
function PapaCard({ papa }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? papa.images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === papa.images.length - 1 ? 0 : prev + 1));
  };

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
      {/* IMAGE CAROUSEL CONTAINER */}
      <div style={{ position: 'relative', width: '100%', height: '250px', marginBottom: '1rem' }}>
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

        {/* LEFT ARROW */}
        {papa.images.length > 1 && (
          <button 
            onClick={prevImage}
            aria-label="Previous image"
            style={{
              position: 'absolute',
              top: '50%',
              left: '8px',
              transform: 'translateY(-50%)',
              background: 'rgba(0, 0, 0, 0.75)',
              color: '#d4af37',
              border: '1px solid #d4af37',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            ‹
          </button>
        )}

        {/* RIGHT ARROW */}
        {papa.images.length > 1 && (
          <button 
            onClick={nextImage}
            aria-label="Next image"
            style={{
              position: 'absolute',
              top: '50%',
              right: '8px',
              transform: 'translateY(-50%)',
              background: 'rgba(0, 0, 0, 0.75)',
              color: '#d4af37',
              border: '1px solid #d4af37',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            ›
          </button>
        )}

        {/* IMAGE COUNTER BADGE (e.g. 1 / 2) */}
        {papa.images.length > 1 && (
          <span style={{
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            background: 'rgba(0, 0, 0, 0.75)',
            color: '#fff',
            fontSize: '0.75rem',
            padding: '2px 8px',
            borderRadius: '10px'
          }}>
            {currentIndex + 1} / {papa.images.length}
          </span>
        )}
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
        Use the arrows on each frontman's portrait to switch between their iconic looks:
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