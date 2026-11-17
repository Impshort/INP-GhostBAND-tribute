import { useEffect, useRef, useState } from 'react';

const phases = [
  {
    id: 'opus-eponymous',
    album: 'Opus Eponymous',
    years: '2008–2012',
    cover: '/images/Oe.jpg',
    track: 'Ritual',
    audio: '/audio/phases/Ritual.mp3'
  },
  {
    id: 'infestissumam',
    album: 'Infestissumam',
    years: '2013–2015',
    cover: '/images/Infes.jpg',
    track: 'Year Zero',
    audio: '/audio/phases/yearzero.mp3'
  },
  {
    id: 'meliora',
    album: 'Meliora',
    years: '2015–2018',
    cover: '/images/Meli.JPG',
    track: 'Mummy Dust',
    audio: '/audio/phases/mummydust.mp3'
  },
  {
    id: 'prequelle',
    album: 'Prequelle',
    years: '2018–2020',
    cover: '/images/preq.jpg',
    track: 'Dance Macabre',
    audio: '/audio/phases/dance_macabre.mp3'
  },
  {
    id: 'impera',
    album: 'Impera',
    years: '2020–2025',
    cover: '/images/imp.jpg',
    track: 'Call Me Little Sunshine',
    audio: '/audio/phases/callme-littlesunshine.mp3'
  },
  {
    id: 'skeleta',
    album: 'Skeletá',
    years: '2025–Present',
    cover: '/images/skele.png',
    track: 'Satanized',
    audio: '/audio/phases/satanized.mp3'
  }
];

function Phase() {
  const audioRef = useRef(null);
  const stopTimerRef = useRef(null);
  const playingPhaseRef = useRef(null);
  const [playingPhase, setPlayingPhase] = useState(null);
  const [audioError, setAudioError] = useState(null);

  function clearStopTimer() {
    if (stopTimerRef.current !== null) {
      window.clearTimeout(stopTimerRef.current);
      stopTimerRef.current = null;
    }
  }

  function stopPreview() {
    clearStopTimer();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    playingPhaseRef.current = null;
    setPlayingPhase(null);
  }

  function playPreview(phase) {
    const audio = audioRef.current;
    if (!audio) return;

    if (playingPhaseRef.current === phase.id && !audio.paused) {
      stopPreview();
      return;
    }

    clearStopTimer();
    audio.pause();
    audio.currentTime = 0;
    audio.src = phase.audio;
    audio.load();
    playingPhaseRef.current = phase.id;
    setPlayingPhase(phase.id);
    setAudioError(null);

    audio.play()
      .then(() => {
        if (playingPhaseRef.current !== phase.id) return;

        stopTimerRef.current = window.setTimeout(() => {
          if (playingPhaseRef.current === phase.id) {
            stopPreview();
          }
        }, 15000);
      })
      .catch(() => {
        if (playingPhaseRef.current === phase.id) {
          playingPhaseRef.current = null;
          setPlayingPhase(null);
          setAudioError({
            phaseId: phase.id,
            message: `Sample not found. Add the file at public${phase.audio}.`
          });
        }
      });
  }

  function handleAudioEnded() {
    clearStopTimer();
    playingPhaseRef.current = null;
    setPlayingPhase(null);
  }

  function handleAudioTimeUpdate() {
    if (audioRef.current && audioRef.current.currentTime >= 15) {
      stopPreview();
    }
  }

  useEffect(() => () => {
    clearStopTimer();
    audioRef.current?.pause();
  }, []);

  return (
    <section id="phases" className="PHASES">
      <h2>Album & Lore Phases</h2>
      <p>
        Choose an album to play a 15-second sample of a featured track.
        Add the matching audio files to <code>public/audio/phases/</code>.
      </p>

      <div className="phase-grid">
        {phases.map((phase) => (
          <article className="phase-card" key={phase.id}>
            <img className="phase-cover" src={phase.cover} alt={`${phase.album} album cover`} />
            <div className="phase-card-content">
              <p className="phase-years">{phase.years}</p>
              <h3>{phase.album}</h3>
              <p className="phase-track">Featured track: <strong>{phase.track}</strong></p>
              <p className="phase-file-name">
                File: {phase.audio.split('/').pop()}
              </p>
              <button
                className="phase-play-button"
                type="button"
                aria-label={`${playingPhase === phase.id ? 'Stop' : 'Play'} 15-second ${phase.track} sample`}
                aria-pressed={playingPhase === phase.id}
                onClick={() => playPreview(phase)}
              >
                {playingPhase === phase.id ? 'Stop' : 'Song sample'}
              </button>
              {audioError?.phaseId === phase.id && (
                <p className="phase-audio-error" role="alert">{audioError.message}</p>
              )}
            </div>
          </article>
        ))}
      </div>

      <audio
        ref={audioRef}
        preload="none"
        onEnded={handleAudioEnded}
        onTimeUpdate={handleAudioTimeUpdate}
      />
    </section>
  );
}

export default Phase;
