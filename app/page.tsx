'use client';
import Image from "next/image";
import { Cinzel } from "next/font/google";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAudio } from "./context/AudioContext";
import Container from "./components/container";
import axios from 'axios';
import AudioButton from "./components/AudioButton";

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: "700",
});

export default function Home() {
  const router = useRouter();
  const { isPlaying, togglePlay, initializeAudio } = useAudio();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleWelcomeInteraction = () => {
    initializeAudio();
    setShowWelcomeModal(false);
  };

  const handleRevealTarot = async () => {
    if (!username.trim()) {
      setError("Please enter a valid username.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `http://localhost:5000/user/tarot-reading?username=${encodeURIComponent(username)}`
      );

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = response.data;

      if (!data.reading.card_name || !data.reading.analysis_summary?.dominant_theme) {
        throw new Error("Invalid response from the server.");
      }

      const sanitizedUsername = username.trim().replace(/[^a-zA-Z0-9-_]/g, "");

      const userData = { username: sanitizedUsername, ...data };
      localStorage.setItem(sanitizedUsername, JSON.stringify(userData));
      console.log(localStorage.getItem(sanitizedUsername));

      try {
        router.push(`/slot?username=${sanitizedUsername}`);
      } catch (error) {
        console.error("Error navigating to the next page:", error);
        setError("An error occurred while navigating. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching tarot reading:", error);
      setError(
        "An error occurred while fetching your tarot reading. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleRevealTarot();
    }
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
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <Container />
      </div>
    );
  };

  return (
    <div className={`relative w-full min-h-screen ${cinzel.className}`}>
      {showWelcomeModal && (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
          <div className="bg-black rounded-lg p-8 text-center">
            <h1 className="text-4xl md:text-5xl mb-4 text-white">
              Welcome to Cosmic Twitter Tales
            </h1>
            <p className="text-lg md:text-xl mb-8 text-purple-200">
              Click below to enter and unveil your destiny
            </p>
            <button
              onClick={handleWelcomeInteraction}
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300"
            >
              Enter Site
            </button>
          </div>
        </div>
      )}

      <Image
        src="/images/background.png"
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

      <AudioButton/>

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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDown} 
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-purple-300/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 font-sans"
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button 
              onClick={handleRevealTarot}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300"
              disabled={loading}
            >
              {loading ? "Loading..." : "Reveal My Tarot Card"}
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