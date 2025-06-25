import React, { createContext, useContext } from "react";
import { SoundEffect } from "../constants/sounds";
import { useSoundManager } from "../hooks/useSoundManager"; 

type SoundContextType = {
  isMuted: boolean;
  toggleMute: () => void;
  playSoundEffect: (sound: SoundEffect) => void;
};

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isMuted, toggleMute, playSoundEffect, backgroundMusicRef } = useSoundManager();
  const value = { isMuted, toggleMute, playSoundEffect };

  return (
    <SoundContext.Provider value={value}>
      <audio 
        ref={backgroundMusicRef} 
        src="/sounds/background-music.mp3" 
        loop 
      />
      {children}
    </SoundContext.Provider>
  );
};
export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSound must be used within a SoundProvider");
  }
  return context;
};