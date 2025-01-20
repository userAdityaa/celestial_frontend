'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { Trophy } from 'lucide-react';
import { Archivo } from 'next/font/google';
import gsap from 'gsap';
import { useSearchParams } from 'next/navigation';
import { ScrollArea } from '@/components/ui/scroll-area';
import AudioButton from '../components/AudioButton';

const archivo = Archivo({
  subsets: ['latin'],
  weight: '700',
});

const cardImageMap: Record<string, string> = {
  'The Fool': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737191086/kzto9yndm6t1lxkkfgx6.png',
  'The Magician': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737210575/xj91441wjkqw4fegnwuu.png',
  'The High Priestess': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737191137/eglrvdme6zexadhklxze.png',
  'The Emperor': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737191152/u7qfbou6tca4n3ev8qcn.png',
  'The Empress': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737190639/oic07eaxhbgejrovf7mm.png',
  'The Hierophant': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737210650/esr6fd2oepo6gd0lnuwo.png',
  'The Lovers': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737191301/sln3gcjtu6qumrwacpjk.png',
  'The Chariot': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737191310/fsb00gqody2slsd4bj75.png',
  'Strength': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737191314/spvdlgcvtbbptgrnbffq.png',
  'The Hermit': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737191316/nqrhndwwd6wk7pxgvqu0.png',
  'Wheel of Fortune': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737210512/ymmllxrhdosbsuwkzpvw.png',
  'Justice': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737191536/hm3bq850sip4tgswncmi.png',
  'The Hanged Man': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737191541/pzxid8ccicznhrnkvqkz.png',
  'Death': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737191543/qqxber6usgw24dewxrzj.png',
  'Temperance': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737191550/zavmcgauuyojdurkdkxb.png',
  'The Devil': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737191553/t4d5gdnzmbh7ho1pjx7h.png',
  'The Tower': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737191558/izc25waf51syoppmpdlg.png',
  'The Star': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737191561/h9mezocp493636zjuvc2.png',
  'The Moon': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737191563/vlapsfjl57z4s7rdf8ia.png',
  'The Sun': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737191566/s1dojphmmsgs25hvcp8a.png',
  'Judgement': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737191779/lxinppcmkhhgbvgowcgx.png',
  'The World': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737191813/hv9ah8vcd33hcl6xr9w9.png',
};

const Slot = () => {
  const [showCard, setShowCard] = useState(false);
  const [horizontalCard, setHorizontalCard] = useState(false);
  const [showTransparentCard, setShowTransparentCard] = useState(false);
  const [hideOriginalCard, setHideOriginalCard] = useState(false);
  const [showWizardAndCard, setShowWizardAndCard] = useState(false);
  const [levitateCard, setLevitateCard] = useState(false);
  const [tarotReadingData, setTarotReadingData] = useState<any>(null);
  const [cardDetails, setCardDetails] = useState<{ meaning_rev: string; desc: string } | null>(null);

  const searchParams = useSearchParams();
  const cardRef = useRef(null);
  const username = searchParams.get('username');

  useEffect(() => {
    setShowCard(true);
    const timer = setTimeout(() => {
      setHorizontalCard(true);
      setTimeout(() => {
        setLevitateCard(true);
      }, 1000);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (username) {
      const fetchData = () => {
        const data = localStorage.getItem(username);
        if (data) {
          try {
            const parsedData = JSON.parse(data);
            setTarotReadingData(parsedData.reading);
          } catch (error) {
            console.error('Error parsing tarot reading data:', error);
          }
        }
      };

      fetchData();
    }
  }, [username]);

  useEffect(() => {
    if (tarotReadingData?.card_name) {
      const fetchCardDetails = async () => {
        try {
          const response = await fetch(
            `https://tarotapi.dev/api/v1/cards/search?q=${encodeURIComponent(tarotReadingData.card_name)}`
          );
          const data = await response.json();
          if (data.nhits > 0) {
            const card = data.cards[0];
            setCardDetails({
              meaning_rev: card.meaning_up,
              desc: card.desc,
            });
          }
        } catch (error) {
          console.error('Error fetching card details:', error);
        }
      };

      fetchCardDetails();
    }
  }, [tarotReadingData]);

  useEffect(() => {
    if (levitateCard && cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { top: 0 },
        {
          top: -30,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
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

  if (!tarotReadingData) {
    return <div>Loading...</div>; 
  }

  const imageUrl = cardImageMap[tarotReadingData.card_name] || '';

  return (
    <div className="h-screen w-full bg-gradient-to-b from-[#321c4f] to-black flex items-center justify-center relative overflow-hidden">
      <AudioButton />
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
            ref={cardRef}
            onClick={handleCardClick}
            className={`
              w-40 h-56 bg-opacity-15
              flex flex-col items-center justify-center transform
              transition-all duration-100 cursor-pointer
              hover:scale-110
              animate-realistic-fall
              relative overflow-hidden z-20
            `}
            style={{ position: 'relative' }}
          >
            <span className="text-8xl font-bold text-black z-10">?</span>
            <span className="mt-4 text-lg text-black z-10 font-bold">Tap to Reveal</span>
          </Card>
        </div>
      )}

    <div
      className={`
        absolute bottom-0 transform
        ${showTransparentCard ? 'translate-y-[-9vh]' : 'translate-y-[-248vh]'}
        transition-all duration-700 ease-in-out
        z-50 max-h-[90vh]
      `}
    >
      <div className="absolute right-0 -top-[8rem] transform scale-x-[-1]"> 
        <Image src="/images/wizard.png" alt="wizard picture" width={330} height={250} />
      </div>

      <Card
        className={`
          w-[80rem] rounded-xl shadow-xl
          bg-white/20 backdrop-blur-lg
          transition-all duration-100
          relative border-none
          max-h-[72vh]
          mb-[1rem]
          top-[6.5rem]
        `}
      >
        <div className="absolute top-0 right-0 w-32 h-32">
          <div className="absolute top-4 right-4 transform rotate-12">
            <Trophy size={40} className="text-yellow-300" />
          </div>
        </div>

        <div className="flex w-full p-8">
          <div className="fixed top-[1.8rem] left-[3rem] w-[380px] h-[300px]">
            <Image
              src={imageUrl}
              alt={tarotReadingData.card_name}
              width={300}
              height={300}
              className="object-contain"
            />
          </div>

          <ScrollArea className="flex flex-col justify-end items-start pl-6 w-[80rem] ml-[20rem] max-h-[60vh] overflow-y-auto"> 
            <p className="text-yellow-200 text-2xl font-bold mb-[1rem] font-serif scrollbar-hide">Your Reveal Card</p>
            <h2 className="text-5xl font-bold mb-[1.5rem] text-white font-serif">
              {tarotReadingData.card_name}
            </h2>
            {cardDetails && (
              <p className="text-xl text-white/80 italic mb-4 text-start">
                <strong>Meaning:</strong> {cardDetails.meaning_rev}
              </p>
            )}

            <div className="w-full space-y-6 text-white/90 mb-[4rem]">
              {cardDetails && (
                <div className="bg-white/10 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold mb-3 text-yellow-200">Description</h3>
                  <p className="text-start">{cardDetails.desc}</p>
                </div>
              )}
              <div className="bg-white/10 p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-3 text-yellow-200">Theme Distribution</h3>
                <div className="space-y-3">
                  {Object.entries(tarotReadingData.analysis_summary.theme_distribution).map(([theme, frequency]) => {
                    let adjustedFrequency = frequency * 100;
                    if (adjustedFrequency < 10) {
                      adjustedFrequency += 50; // Increase smaller percentages by 30%
                    }
                    if (adjustedFrequency < 30) {
                      adjustedFrequency += 60; // Increase smaller percentages by 30%
                    }
                    return (
                      <div key={theme}>
                        <strong>{theme}:</strong> {adjustedFrequency.toFixed(1)}%
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                          <div
                            className="bg-yellow-200 h-2.5 rounded-full"
                            style={{ width: `${adjustedFrequency}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </Card>
    </div>
    </div>
  );
};

export default Slot;