'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trophy } from 'lucide-react';
import { Archivo } from 'next/font/google';
import gsap from 'gsap';

const archivo = Archivo({
  subsets: ['latin'],
  weight: '700',
});

const Slot = () => {
  const [showCard, setShowCard] = useState(false);
  const [horizontalCard, setHorizontalCard] = useState(false);
  const [showTransparentCard, setShowTransparentCard] = useState(false);
  const [hideOriginalCard, setHideOriginalCard] = useState(false);
  const [showWizardAndCard, setShowWizardAndCard] = useState(false);
  const [levitateCard, setLevitateCard] = useState(false); // New state for levitation

  const cardRef = useRef(null); // Ref for the card element

  useEffect(() => {
    setShowCard(true);
    const timer = setTimeout(() => {
      setHorizontalCard(true);
      setTimeout(() => {
        setLevitateCard(true); // Enable levitation after 1 second
      }, 1000);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (levitateCard && cardRef.current) {
      console.log('Levitation animation started'); 
      console.log(cardRef.current);

      gsap.fromTo(
        cardRef.current, 
        { top: 0 }, 
        {
          top: -30, 
          duration: 2, 
          repeat: -1, 
          yoyo: true, 
          ease: "power1.inOut",
        }
      );
    }
  }, [levitateCard]);

  const handleCardClick = () => {
    setHideOriginalCard(true);
    setTimeout(() => {
      setShowTransparentCard(true);
      setTimeout(() => {
        setShowWizardAndCard(true);
      }, 300);
    }, 300);
  };

  return (
    <div className="h-screen w-full bg-gradient-to-b from-[#321c4f] to-black flex items-center justify-center relative overflow-hidden">
      <Image
        src="/images/background_image.png"
        alt="Mystical night sky background"
        fill
        className="object-cover z-0"
        priority
      />

      {!hideOriginalCard && (
        <div
          className={`
            absolute top-0 transform
            ${showCard ? 'translate-y-[10vh]' : '-translate-y-[100vh]'}
            transition-all duration-1000 ease-in-out flex flex-col items-center justify-center
          `}
        >
          {levitateCard && (
            <Image
              src="/images/person.png"
              alt="Person"
              width={3000}
              height={2000}
              className="absolute z-10 transform -translate-y-10 transition-all ease-linear"
              style={{
                top: '125%',
                left: '50%',
                transform: 'translate(-50%, -50%) scale(2.5)',
              }}
            />
          )}

          <Card
            ref={cardRef} // Apply ref to the Card component
            onClick={handleCardClick}
            className={`
              w-40 h-56 bg-opacity-15
              flex flex-col items-center justify-center transform
              transition-all duration-100 cursor-pointer
              hover:scale-110
              animate-realistic-fall
              relative overflow-hidden z-20
            `}
            style={{ position: 'relative' }} // Ensure the card has a position property
          >
            <span className="text-8xl font-bold text-black z-10">?</span>
            <span className="mt-4 text-lg text-black z-10 font-bold">Tap to Reveal</span>
          </Card>
        </div>
      )}

      <div
        className={`
          absolute bottom-0 transform
          ${showTransparentCard ? 'translate-y-[-5vh]' : 'translate-y-[-160vh]'}
          transition-all duration-700 ease-in-out
          z-50 max-h-[90vh] overflow-hidden
        `}
      >
        <Image src="/images/wizard.png" alt="wizard picture" width={400} height={250} />
        <Card
          className={`
            w-[50rem] rounded-xl shadow-xl
            bg-white/20 backdrop-blur-lg
            transition-all duration-100
            relative border-none
          `}
        >
          <ScrollArea className="h-[90vh]">
            <div className="absolute top-0 right-0 w-32 h-32">
              <div className="absolute top-4 right-4 transform rotate-12">
                <Trophy size={48} className="text-yellow-300" />
              </div>
            </div>

            <div className="flex w-full p-8 items-center justify-between">
              <Image
                src="/images/first.png"
                alt="Hangman"
                width={180}
                height={300}
                className="object-contain"
              />
              <div className="text-center flex-1">
                <p className="text-yellow-200 text-6xl font-bold mb-[2rem]">Your Reveal Card</p>
                <h2 className="text-5xl font-bold mb-2 text-white font-serif">
                  The Hangedman
                </h2>
                <p className="text-xl text-white/80 italic">
                  Test your wit, save the stick figure!
                </p>
              </div>
            </div>

            <div className="px-8 pb-8">
              <div className="space-y-6 text-white/90">
                <div className="bg-white/10 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold mb-3">How to Play</h3>
                  <div className="space-y-3">
                    <p>🎯 Guess the hidden word one letter at a time</p>
                    <p>⏱️ Each wrong guess adds a piece to the hangman</p>
                    <p>🏆 Save the stick figure by completing the word in time</p>
                    <p>📚 Words range from easy to challenging levels</p>
                  </div>
                </div>

                <div className="bg-white/10 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold mb-3">Game Features</h3>
                  <div className="space-y-3">
                    <p>🎮 Multiple difficulty levels</p>
                    <p>🌟 Score tracking and achievements</p>
                    <p>🔄 Unlimited words to keep you challenged</p>
                    <p>📱 Mobile-friendly gameplay</p>
                  </div>
                </div>

                <div className="bg-white/10 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold mb-3">Difficulty Levels</h3>
                  <div className="space-y-3">
                    <p>🟢 Easy: Simple 4-6 letter words</p>
                    <p>🟡 Medium: 6-8 letter words with common letters</p>
                    <p>🔴 Hard: 8+ letter words with challenging combinations</p>
                    <p>⚫ Expert: Obscure words and limited hints</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
};

export default Slot;