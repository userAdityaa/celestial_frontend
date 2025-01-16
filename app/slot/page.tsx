'use client';
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

const Slot = () => {
  const [showCard, setShowCard] = useState(false);
  const [horizontalCard, setHorizontalCard] = useState(false);
  const [showTransparentCard, setShowTransparentCard] = useState(false);
  const [hideOriginalCard, setHideOriginalCard] = useState(false);
  const [showWizardAndCard, setShowWizardAndCard] = useState(false);

  useEffect(() => {
    setShowCard(true);
    const timer = setTimeout(() => {
      setHorizontalCard(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = () => {
    setHideOriginalCard(true);
    setTimeout(() => {
      setShowTransparentCard(true);
      setTimeout(() => {
        setShowWizardAndCard(true);
      }, 500);
    }, 500);
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
            ${showCard ? 'translate-y-[35vh]' : '-translate-y-full'}
            transition-all duration-1000 ease-in-out
          `}
        >
          <Card
            onClick={handleCardClick}
            className={`
              w-48 h-72 bg-white rounded-xl shadow-xl
              flex items-center justify-center transform
              transition-all duration-1000 cursor-pointer
              ${horizontalCard ? 'rotate-90' : 'rotate-12'}
              hover:scale-105
              animate-realistic-fall /* Custom animation for realistic falling effect */
            `}
          >
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-500 rounded-full"></div>
              <h2 className="text-2xl font-bold mb-2">Hello World</h2>
              <p className="text-gray-600">Your lucky card</p>
            </div>
          </Card>
        </div>
      )}

      <div
        className={`
          absolute bottom-0 transform
          ${showTransparentCard ? 'translate-y-[-0vh]' : 'translate-y-[-120vh]'}
          transition-all duration-1000 ease-in-out
          z-50 
        `}
      >
        <Card
          className={`
            w-[50rem] h-[25rem] rounded-xl shadow-xl
            flex items-center justify-center
            bg-white/20 backdrop-blur-lg
            transition-all duration-1000
            relative
            border-none
          `}
        >
          <img
            src="/images/wizard.png"
            alt="Wizard"
            className={`
              absolute right-8 -top-72
              w-96 h-auto
              transform
              transition-all duration-1000 ease-out delay-500
              z-[-1]
            `}
          />
          <div className="text-center p-8">
            <h2 className="text-3xl font-bold mb-4 text-white">Surprise!</h2>
            <p className="text-xl text-white/80">Your transparent card</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Slot;