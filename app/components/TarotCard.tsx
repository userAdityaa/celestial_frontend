'use client'
import React from 'react';
import { Trophy } from 'lucide-react';
import Image from 'next/image';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';

const TarotCardMobile = ({ imageUrl, tarotReadingData, cardDetails, formatPlainText }: any) => {
  return (
    <Card
      className={`
        w-[92vw] rounded-xl shadow-xl
        bg-white/20 backdrop-blur-lg
        transition-all duration-100
        relative border-none
        max-h-[72vh]
        mb-[1rem]
        top-[6.5rem]
      `}
    >
      <div className="absolute top-4 right-4 transform rotate-12">
        <Trophy size={40} className="text-yellow-300" />
      </div>

      <div className="flex flex-col items-center p-4">
        <div className="w-full flex justify-center">
          <Image
            src={imageUrl}
            alt={tarotReadingData.card_name}
            width={300}
            height={300}
            className="object-contain w-[85%]"
          />
        </div>

        <ScrollArea className="w-full max-h-[60vh] overflow-y-auto">
          <p className="text-yellow-200 text-2xl font-bold mb-[1rem] font-serif text-center">Your Reveal Card</p>
          <h2 className="text-5xl font-bold mb-[1.5rem] text-white font-serif text-center">
            {tarotReadingData.card_name}
          </h2>
          {cardDetails && (
            <p className="text-xl text-white/80 italic mb-4 text-center">
              <strong>Meaning:</strong> {cardDetails.meaning_rev}
            </p>
          )}

          <div className="w-full space-y-6 text-white/90 mb-[4rem]">
            {cardDetails && (
              <div className="bg-white/10 p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-3 text-yellow-200 text-center">Description</h3>
                <p className="text-center">{cardDetails.desc}</p>
              </div>
            )}
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-3 text-yellow-200 text-center">Theme Distribution</h3>
              <div className="space-y-3">
                {Object.entries(tarotReadingData.theme_distribution).map(([theme, value]) => {
                  const percentage = Number(value) * 100;
                  let scaledWidth = percentage;

                  if (percentage >= 30 && percentage <= 40) {
                    scaledWidth = percentage;
                  } else if (percentage >= 20 && percentage < 30) {
                    scaledWidth = percentage + 10;
                  } else if (percentage >= 10 && percentage < 20) {
                    scaledWidth = percentage + 20;
                  }

                  return (
                    <div key={theme}>
                      <strong>{theme.replace(/_/g, ' ')}:</strong> {percentage.toFixed(1)}%
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div
                          className="bg-yellow-200 h-2.5 rounded-full"
                          style={{ width: `${scaledWidth}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-3 text-yellow-200 text-center">Personalized Analysis</h3>
              <div className="text-center whitespace-pre-wrap">
                {formatPlainText(tarotReadingData.reason)}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </Card>
  );
};

export default TarotCardMobile;