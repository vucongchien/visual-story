// src/hooks/useSoundManager.ts

import { useState, useRef, useEffect, useCallback } from 'react';
import { SoundEffects, SoundEffect } from '../constants/sounds';

// Tạo AudioContext một lần duy nhất ở cấp module, nó sẽ được chia sẻ
// cho bất kỳ ai import hook này.
const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

export const useSoundManager = () => {
  const [isMuted, setIsMuted] = useState(true);
  const backgroundMusicRef = useRef<HTMLAudioElement>(null);
  const audioBuffers = useRef<Map<SoundEffect, AudioBuffer>>(new Map());

  // --- Logic quản lý trạng thái Mute ---
  useEffect(() => {
    const storedMuteState = localStorage.getItem('sound');
    setIsMuted(storedMuteState === 'muted');
  }, []);

  const toggleMute = () => {
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    localStorage.setItem('sound', newMuteState ? 'muted' : 'unmuted');
  };

  // --- Logic cho nhạc nền ---
  useEffect(() => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.muted = isMuted;
    }
  }, [isMuted]);
  
  useEffect(() => {
    const playMusic = () => {
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
      backgroundMusicRef.current?.play().catch(() => {});
      window.removeEventListener('click', playMusic);
    };
    window.addEventListener('click', playMusic);
    return () => window.removeEventListener('click', playMusic);
  }, []);

  // --- Logic cho Sound Effects (SFX) ---
  useEffect(() => {
    Object.entries(SoundEffects).forEach(async ([key, path]) => {
      const soundKey = key as SoundEffect;
      if (audioBuffers.current.has(soundKey)) return;

      try {
        const response = await fetch(path);
        const arrayBuffer = await response.arrayBuffer();
        const decodedAudio = await audioContext.decodeAudioData(arrayBuffer);
        audioBuffers.current.set(soundKey, decodedAudio);
      } catch (error) {
        console.error(`Failed to load sound effect: ${key}`, error);
      }
    });
  }, []);

  const playSoundEffect = useCallback((sound: SoundEffect) => {
    if (isMuted) return;

    const buffer = audioBuffers.current.get(sound);
    if (!buffer) {
      console.warn(`Sound effect "${sound}" not loaded or not found.`);
      return;
    }

    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start(0);
  }, [isMuted]);

  return {
    isMuted,
    toggleMute,
    playSoundEffect,
    backgroundMusicRef, 
  };
};