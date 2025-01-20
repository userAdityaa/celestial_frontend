// contexts/AudioContext.tsx
'use client';
import React, { createContext, useContext, useRef, useState, useEffect } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  togglePlay: () => void;
  initializeAudio: () => void;
}

// Create a singleton audio instance
let globalAudio: HTMLAudioElement | null = null;

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Use the global audio instance if it exists, otherwise create it
      if (!globalAudio) {
        globalAudio = new Audio('/music/background-music.mp3');
        globalAudio.loop = true;
      }
      audioRef.current = globalAudio;

      // Check if audio was playing before and resume it
      const wasPlaying = localStorage.getItem('audioPlaying') === 'true';
      if (wasPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(console.error);
      }

      // Update isPlaying state based on actual audio state
      const updatePlayingState = () => {
        setIsPlaying(!audioRef.current?.paused);
      };

      audioRef.current.addEventListener('play', updatePlayingState);
      audioRef.current.addEventListener('pause', updatePlayingState);

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('play', updatePlayingState);
          audioRef.current.removeEventListener('pause', updatePlayingState);
        }
      };
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        localStorage.setItem('audioPlaying', 'false');
      } else {
        audioRef.current.play().catch(console.error);
        localStorage.setItem('audioPlaying', 'true');
      }
      setIsPlaying(!isPlaying);
    }
  };

  const initializeAudio = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          localStorage.setItem('audioPlaying', 'true');
        })
        .catch(console.error);
    }
  };

  // Save audio state when component unmounts or page changes
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem('audioPlaying', isPlaying.toString());
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isPlaying]);

  return (
    <AudioContext.Provider value={{ isPlaying, togglePlay, initializeAudio }}>
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};