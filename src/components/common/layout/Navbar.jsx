import BeetleLogo from "@/assets/images/screener-logo.png";
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Support', href: '/support' },
    { name: 'Dashboard', href: '/dashboard' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Change navbar style when scrolled more than 50 pixels
      setIsScrolled(window.scrollY > 50);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav 
      className={`fixed w-full text-white  transition-all duration-300 ease-in-out ${
        isScrolled 
          ? ' bg-transparent bg-opacity-90 backdrop-blur-sm shadow-md z-50 top-0' 
          : ''
      }`}
    >
      <div className={`max-w-7xl mx-auto text-white px-4 sm:px-6 lg:px-8 ${
        isScrolled 
          ? ' bg-transparent bg-opacity-90 backdrop-blur-sm shadow-md z-50 top-0' 
          : 'bg-[#2D2E2D] rounded-2xl '
      }`}>
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="/" className="block">
              <img
                src={BeetleLogo}
                alt="Black Beetle"
                className="w-auto h-16 sm:h-20"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`${
                  isScrolled 
                    ? 'text-white hover:text-yellow-500' 
                    : ' hover:text-black'
                } text-sm font-medium transition-colors`}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="/login" 
              className={`${
                isScrolled 
                  ? 'text-white hover:text-yellow-500' 
                  : 'text-white hover:text-black'
              } text-sm font-medium transition-colors`}
            >
              Login
            </a>
            <a 
              href="/signup" 
              className={`${
                isScrolled 
                  ? 'bg-black text-white hover:bg-gray-900' 
                  : 'bg-[#C4A137] text-black hover:bg-white border border-[#C4A137]'
              } px-6 py-2 rounded-md text-sm font-medium transition-colors`}
            >
              Signup
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${
                isScrolled 
                  ? 'text-white' 
                  : 'text-gray-700'
              } hover:text-black transition-colors`}
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-gray-900 transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <div className="pt-4 space-y-2">
            <a
              href="/login"
              className="text-white hover:bg-gray-800 block w-full px-3 py-2 rounded-md text-base font-medium text-center transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Login
            </a>
            <a
              href="/signup"
              className="bg-yellow-500 text-black hover:bg-yellow-400 block w-full px-3 py-2 rounded-md text-base font-medium text-center transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Signup
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}