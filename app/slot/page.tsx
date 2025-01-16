'use client'
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

const Slot = () => {
  const [showCard, setShowCard] = useState(false);
  const [horizontalCard, setHorizontalCard] = useState(false);

  useEffect(() => {
    setShowCard(true);
    const timer = setTimeout(() => {
      setHorizontalCard(true);
    }, 1000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen w-full bg-gradient-to-b from-[#321c4f] to-black flex items-center justify-center relative overflow-hidden">
      <div
        className={`
          absolute top-0 transform 
          ${showCard ? 'translate-y-[35vh]' : '-translate-y-full'}
          transition-all duration-1000 ease-in
        `}
      >
        <Card 
          className={`
            w-64 h-96 bg-white rounded-xl shadow-xl 
            flex items-center justify-center transform 
            transition-all duration-1000
            ${horizontalCard ? 'rotate-90' : 'rotate-12'}
            hover:scale-105
          `}
        >
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-500 rounded-full"></div>
            <h2 className="text-2xl font-bold mb-2">Hello World</h2>
            <p className="text-gray-600">Your lucky card</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Slot;