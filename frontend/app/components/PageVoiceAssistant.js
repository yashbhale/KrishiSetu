'use client';
import { useEffect, useRef } from 'react';

export default function PageVoiceAssistant({ audioFile }) {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const playAudio = async () => {
      try {
        if (!audio.paused) {
          audio.pause();
          audio.currentTime = 0;
        }
        await audio.play();
      } catch (err) {
        // ✅ Suppress autoplay-related error
        if (
          err.name === 'NotAllowedError' ||
          err.message?.includes("user didn't interact")
        ) {
          // Silently ignore autoplay restriction
        } else {
          console.error("Audio failed to play:", err);
        }
      }
    };

    const timeout = setTimeout(() => {
      playAudio();
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return <audio ref={audioRef} src={`/audio/${audioFile}`} preload="auto" />;
}
