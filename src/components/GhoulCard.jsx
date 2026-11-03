import React from 'react';

function GhoulCard({ name, role, image, customClass }) {
  return (
    <div className={`ghoul-card ${customClass || ''}`}>
      <img src={image} alt={name} className="card-image" />
      <div className="card-content">
        <h3>{name}</h3>
        <p>{role}</p>
      </div>
    </div>
  );
}

export default GhoulCard;