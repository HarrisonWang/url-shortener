"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HeaderNav() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed items-center w-full z-50 ${isScrolled ? 'bg-factory' : ''}`}>
      <nav className="flex justify-between text-center max-w-7xl mx-auto p-4">
        <Link href="/" className="flex items-center">
          <img src="/logo.svg" alt="URL Shortener Logo" className="w-8 h-8 sm:w-10 sm:h-10 mr-2 sm:mr-4" />
          <span className="text-xl sm:text-3xl font-bold text-neutral-800">URL Shortener</span>
        </Link>
        <div className="flex gap-2">
          <Link href="https://x.com/voywang" target="_blank" rel="noopener noreferrer" className="text-neutral-800 flex items-center h-full p-1 hover:text-neutral-950 rounded-full transition duration-300">
            <img src="/x.svg" className="w-6 h-6" />
          </Link>
          <Link href="https://github.com/harrisonwang/url-shortener" target="_blank" rel="noopener noreferrer" className="text-neutral-800 flex items-center h-full p-1 hover:text-neutral-950 rounded-full transition duration-300">
            <img src="/github.svg" className="w-6 h-6" />
          </Link>
          <Link href="/about" className="text-neutral-800 flex items-center h-full p-3 hover:text-neutral-950 rounded-full transition duration-300">
            About
          </Link>
        </div>
      </nav>
    </header>
  );
}