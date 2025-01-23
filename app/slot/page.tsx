'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Suspense } from 'react';
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

export default function SlotPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Slot/>
    </Suspense>
  );
}

const formatPlainText = (text: string) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/#+\s*/g, '')
    .replace(/\*\s*/g, '• ')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/(\d\.)\s+/g, '\n$1 ')
    .replace(/for @\S+/g, '')
    .trim();
};


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
  'Ace of Wands': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737657270/1_xkylmy.png', 
  'Two of Wands': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737657246/2_uz14a9.png',
  'Three of Wands': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737657330/3_ocd8ix.png', 
  'Four of Wands': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737657333/4_bt2pei.png', 
  'Five of Wands': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737657336/5_ge9sv3.png', 
  'Six of Wands': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737657393/6_vhlejh.png',
  'Seven of Wands': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737657399/7_kll74l.png', 
  'Eight of Wands': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737657492/8_e4m1im.png', 
  'Nine of Wands': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737657497/9_n3mhiu.png', 
  'Ten of Wands': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737658106/10-2_xalhki.png',
  'King of Wands': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737657502/King_agtqtd.png', 
  'Knight of Wands': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737657558/Knight_eqibpl.png', 
  'Page of Wands': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737657562/Page_jgihey.png', 
  'Queen of Wands': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737657565/Queen_cv5jwl.png', 
  'Ace of Swords': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737657683/1_c0tyam.png', 
  'Two of Swords': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737657687/2_xnaqlr.png', 
  'Three of Swords': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737657690/3_hwrf07.png', 
  'Six of Swords': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737657697/6_h3rozy.png', 
  'Five of Swords': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737657740/5_tc3upd.png', 
  'Four of Swords': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737657736/4_bpbzeo.png', 
  'Seven of Swords': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737657745/7_lyrypr.png', 
  'Eight of Swords': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737657912/8_c7twef.png',
  'Nine of Swords': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737657921/9_qtukfw.png', 
  'Ten of Swords': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737657916/10_oirthj.png', 
  'Page of Swords': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737658062/Page_ncinlm.png', 
  'Knight of Swords': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737658060/Knight_ov2jgv.png', 
  'Queen of Swords': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737658066/Queen_x9vg2v.png', 
  'King of Swords': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737658059/King_ecbgfw.png', 
  'Ace of Cups': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737658200/1_sxtvqr.png', 
  'Two of Cups': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737658203/2_ykofkq.png', 
  'Three of Cups': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737658205/3_ebgxmc.png', 
  'Four of Cups': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737658245/4_vz2dyl.png', 
  'Five of Cups': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737658245/4_vz2dyl.png', 
  'Six of Cups': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737658248/6_sjqy8s.png', 
  'Seven of Cups': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737658259/7_gm701v.png', 
  'Eight of Cups': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737658289/8_ecqlfn.png', 
  'Nine of Cups': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737658292/9_gtnhbd.png', 
  'Ten of Cups': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737658407/10_bn5yda.png', 
  'Page of Cups': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737658394/Page_hzduiu.png', 
  'Knight of Cups': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737658301/Knight_gba1go.png', 
  'Queen of Cups': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737658313/Queen_sugqnc.png', 
  'King of Cups': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737658296/King_jo3tn6.png', 
  'Ace of Pentacles': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737658501/1_jwtjjf.png', 
  'Two of Pentacles': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737658506/2_d6fcvo.png', 
  'Three of Pentacles': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737658510/3_mgmymj.png', 
  'Four of Pentacles': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737658559/4_d3m5f1.png', 
  'Five of Pentacles': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737658568/5_ih3tvm.png', 
  'Six of Pentacles': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737658581/6_uqpzng.png', 
  'Seven of Pentacles': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737658520/7_owsyxo.png', 
  'Eight of Pentacles': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737658606/10_sosxyi.png', 
  'Nine of Pentacles': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737658613/9_c6kbwb.png', 
  'Ten of Pentacles': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737658606/10_sosxyi.png', 
  'Page of Pentacles': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737658619/Page_pqgpvc.png', 
  'Knight of Pentacles': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737658635/Knight_farejx.png', 
  'Queen of Pentacles': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737658647/Queen_bywjre.png', 
  'King of Pentacles': 'https://res.cloudinary.com/dhu2vsl1k/image/upload/v1737658640/King_bjm1lg.png'
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
        src="/images/background.png"
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
              <div className="w-full space-y-6 text-white/90 mb-[4rem]">
              <div className="bg-white/10 p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-3 text-yellow-200">Theme Distribution</h3>
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
            </div>
              <div className="bg-white/10 p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-3 text-yellow-200">Personalized Analysis</h3>
                <div className="text-start whitespace-pre-wrap">
                  {formatPlainText(tarotReadingData.reason)}
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