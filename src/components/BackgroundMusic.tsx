import React, { use, useEffect } from "react";

export const BackgroundMusic = () => {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.2; 
      audio.loop = true; 
      const playMusic = () => {
        audio.play().catch(() => {});
      };
      window.addEventListener("click", playMusic, { once: true });
    }
    return () => {
      window.removeEventListener("click", () => {});
    };
  }, []);
  return <audio ref={audioRef} src="/sounds/background-music.mp3" />;
};
