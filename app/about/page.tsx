import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { Cinzel } from "next/font/google";


const cinzel = Cinzel({
  subsets: ['latin'],
  weight: "700",
});

export default function About() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen relative">
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/background.png"
          alt="Mystical night sky background"
          fill
          className="object-cover z-0"
          priority
        />
      </div>

      <div className="relative z-10 flex flex-col justify-center items-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-4xl mx-auto">
          <div className="flex flex-col space-y-4 sm:space-y-6">
            <h1 className={`text-[2.10rem]  sm:text-3xl font-bold text-white text-center sm:text-left max-phone:mt-[2.5rem] ${cinzel.className}`}>
              Cosmic Twitter Tales
            </h1>
            <p className="text-white/80 text-lg sm:text-xl text-center sm:text-left">
              Cosmic Twitter Tales is designed to provide insightful tarot readings, helping you navigate life's challenges and opportunities with clarity and confidence.
            </p>
          </div>
        </div>

        <ScrollArea className="w-full max-w-4xl mx-auto mt-6 sm:mt-8">
          <div className="bg-white/10 p-4 sm:p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-3 text-yellow-200">About the Application</h3>
            <p className="text-white/80 text-lg sm:text-xl">
              This application is designed to provide insightful tarot readings, helping you navigate life's challenges and opportunities with clarity and confidence.
            </p>
          </div>
        </ScrollArea>

        <div className="w-full max-w-4xl sm:space-y-4 mt-6 sm:mt-8">
          <div className="bg-white/10 p-4 sm:p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-3 text-yellow-200">Features</h3>
            <div className="space-y-3">
              <div className="text-gray-200 text-opacity-70">
                <strong>Interactive Readings:</strong> Engage with the cards in a dynamic and intuitive way.
              </div>
              <div className="text-white/80 text-lg sm:text-xl">
                Cosmic Twitter Tales is designed to provide insightful tarot readings, helping you navigate life's challenges and opportunities with clarity and confidence.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}