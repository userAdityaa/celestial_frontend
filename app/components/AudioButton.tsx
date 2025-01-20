'use client';
import { useAudio } from '../context/AudioContext';

export default function AudioButton() {
  const { isPlaying, togglePlay } = useAudio();

  return (
    <button 
      onClick={togglePlay}
      className="fixed bottom-6 right-6 z-20 bg-black/30 hover:bg-purple-600/50 text-white w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-300 border border-purple-300/30"
      aria-label={isPlaying ? "Pause background music" : "Play background music"}
    >
      {isPlaying ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="6" y="4" width="4" height="16"></rect>
          <rect x="14" y="4" width="4" height="16"></rect>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
      )}
    </button>
  );
}