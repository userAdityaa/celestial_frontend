import { ScrollArea } from "@/components/ui/scroll-area";
import { Trophy } from "lucide-react";
import Image from "next/image";

export default function About() {
  return (
    <div className="flex justify-center items-center min-h-screen relative">
      {/* Background Image */}
      <Image
        src="/images/background_image.png"
        alt="Mystical night sky background"
        fill
        className="object-cover z-0"
        priority
      />

      <Image 
        src="/images/totoro.png" 
        alt="totoro" 
        width={150} 
        height={600} 
        className="absolute z-1 opacity-90 right-24 top-[2rem]" 
      />

      {/* Main Content Container */}
      <div
        className={`
          w-[86rem] rounded-xl shadow-xl
          bg-white/20 backdrop-blur-lg
          transition-all duration-100
          relative border-none
          max-h-[100vh]
          mb-[1rem]
          top-[6.5rem]
          z-10
        `}
      >
        <div className="flex w-full p-8">
          {/* Creator Image */}
          <div className="fixed top-[1.8rem] left-[3rem] w-[380px] h-[300px]">
            <Image
              src="/images/creator_image.jpg"
              alt="Creator"
              width={280}
              height={300}
              className="object-contain rounded-xl"
            />
          </div>

          {/* Scrollable Content */}
          <ScrollArea className="flex flex-col justify-end items-start pl-6 w-[80rem] ml-[20rem] max-h-[60vh] overflow-y-auto">
            <p className="text-yellow-200 text-2xl font-bold mb-[1rem] font-serif scrollbar-hide">About the Application</p>
            <h2 className="text-5xl font-bold mb-[1.5rem] text-white font-serif">
                Cosmic Twitter Tales
            </h2>

            <p className="text-xl text-white/80 italic mb-4 text-start">
              <strong>Welcome to Cosmic Twitter Tales!</strong> This application is designed to provide insightful tarot readings, helping you navigate life's challenges and opportunities with clarity and confidence.
            </p>

            <div className="w-full space-y-6 text-white/90 mb-[4rem]">
              <div className="bg-white/10 p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-3 text-yellow-200">About the Creator</h3>
                <p className="text-start">
                  Hi, I'm Aditya Chaudhary, the creator of Cosmic Twitter Tales. With a passion for both technology and spirituality, I developed this application to bridge the gap between ancient wisdom and modern convenience. My goal is to make tarot readings accessible and meaningful for everyone.
                </p>
              </div>

              <div className="bg-white/10 p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-3 text-yellow-200">Features</h3>
                <div className="space-y-3">
                  <div>
                    <strong>Interactive Readings:</strong> Engage with the cards in a dynamic and intuitive way.
                  </div>
                  <div>
                    <strong>Detailed Interpretations:</strong> Get in-depth explanations for the card drawn.
                  </div>
                  <div>
                    <strong>Personalized Insights:</strong> Receive readings tailored to your specific questions and concerns.
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}