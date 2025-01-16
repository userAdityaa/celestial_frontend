'use client'
import Image from "next/image";
import { Cinzel } from "next/font/google";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Container from "./components/container";

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: "700",
});

export default function Home() {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleRevealTarot = () => {
    setLoading(true); 
    setTimeout(() => {
      setLoading(false);
      router.push("/slot"); 
    }, 2800);
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const LoadingScreen = () => {
    return (
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
        <Container/>
      </div>
    );
  };

  return (
    <div className={`relative w-full min-h-screen ${cinzel.className}`}>
      <Image
        src="/images/background_image.png"
        alt="Mystical night sky background"
        fill
        className="object-cover z-0"
        priority
      />

      <audio
        ref={audioRef}
        src="/music/background-music.mp3"
        loop
      />

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

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white text-center px-4">
        <h1 className="text-5xl md:text-7xl mb-4 leading-tight">
          Cosmic Twitter Tales
        </h1>
        <p className="text-xl md:text-xl mb-8 text-purple-200">
          Discover Your Twitter Destiny Through Tarot
        </p>
        <div className="max-w-md w-full">
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 space-y-6">
            <input
              type="text"
              placeholder="Enter your X username"
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-purple-300/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 font-sans"
            />
            <button 
              onClick={handleRevealTarot}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300"
            >
              Reveal My Tarot Card
            </button>
          </div>
        </div>
        <div className="mt-8 text-[1rem] text-purple-200">
          ✨ Unveil the mystical connection between your tweets and the cards
        </div>
      </main>

      {loading && <LoadingScreen />}
    </div>
  );
}