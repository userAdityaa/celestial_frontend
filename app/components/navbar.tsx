'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [value, setValue] = useState('About');
  const [href, setHref] = useState('/about');

  if (pathname === "/slot") {
    return null;
  }

  if (pathname === '/about') { 
    if(value != 'Go Back')
      setValue('Go Back')
    if(href != '/')
      setHref('/')
  }

  if(pathname === '/') { 
    if(value != 'About')
      setValue('About')
    if(href != '/about')
        setHref("/about")
  }


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
          <div>
            <Link
              href={href}
              className="bg-[#D1F366] text-black px-4 py-2 rounded-lg font-medium hover:bg-[#bde052] transition-colors"
            >
              {value}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}