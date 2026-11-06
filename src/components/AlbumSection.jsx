import React from 'react';

function AlbumSection() {
  return (
    <section id="albums">
      <h2>Favorite Albums</h2>
      <article>
        <h3>Seven Inches of Satanic Panic</h3>
        <p>This album contained two of the iconic song tracks as I think this is where they began
           to become more famous as their cover on Mary on a cross was a hit to many.
        </p>
        <a href="https://youtu.be/kC_bFsGUVyg?si=-gJ3LOQ2m5ci_jkF" target="_blank" rel="noreferrer">
            <img src="/images/seven.jpg" alt="Mary On A cross" className="pfp-img" />
        </a>

        <a href="https://www.youtube.com/watch?v=YOUR_YOUTUBE_LINK_HERE" target="_blank" rel="noreferrer">
            <img src="/images/seven.jpg" alt="Kiss the Go-Goat" className="pfp-img" />
        </a>
      </article>

      <article>
        <h3>Meliora (2015)</h3>
        <p>This album was mostly on repeat for me, especially their songs Mummy dust, He is, Cirice, From pinnacle to the pit</p>
        <a href="https://www.youtube.com/watch?v=YOUR_YOUTUBE_LINK_HERE" target="_blank" rel="noreferrer">
            <img src="/images/Meli.JPG" alt="Mummy Dust" className="pfp-img" />
        </a>
        <a href="https://youtu.be/kC_bFsGUVyg?si=-gJ3LOQ2m5ci_jkF" target="_blank" rel="noreferrer">
            <img src="/images/Meli.JPG" alt="He is" className="pfp-img" />
        </a>
        <a href="https://youtu.be/KOrXKiSy8ZY?si=a81UAKpUwxo4dA9E" target="_blank" rel="noreferrer">
            <img src="/images/Meli.JPG" alt="Cirice" className="pfp-img" />
        </a>
      </article>
    </section>
  );
}

export default AlbumSection;