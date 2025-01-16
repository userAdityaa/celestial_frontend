import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-transparent z-50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="Celestial Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="ml-2 text-white text-xl font-semibold">Celestial</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-gray-300">
              Home
            </Link>
            <Link href="/about" className="text-white hover:text-gray-300">
              About Us
            </Link>
            <Link href="/readers" className="text-white hover:text-gray-300">
              Readers
            </Link>
            <Link href="/services" className="text-white hover:text-gray-300">
              Services
            </Link>
            <Link href="/horoscope" className="text-white hover:text-gray-300">
              Horoscope
            </Link>
            <Link href="/blog" className="text-white hover:text-gray-300">
              Blog
            </Link>
          </div>

          <div>
            <Link 
              href="/reservation" 
              className="bg-[#D1F366] text-black px-4 py-2 rounded-lg font-medium hover:bg-[#bde052] transition-colors"
            >
              Reservation
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}