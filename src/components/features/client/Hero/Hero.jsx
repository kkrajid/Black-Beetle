import React from 'react';
import { TrendingUp, Lightbulb } from 'lucide-react';
import Logo from "@/assets/images/black-beetles-logo.png";
import Illustration from "@/assets/svg/Illustration";

export function Hero() {
  return (
    <div className="pt-10 sm:pt-16 md:pt-24 lg:pt-32 xl:pt-40 2xl:pt-48">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 xl:gap-20 items-center pb-12 md:pb-16 lg:pb-20 xl:pb-24">
          <div className="text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
              Discover<br className="hidden sm:inline" />
              Winning <span className="text-[#D4AF37]">Stock.</span>
            </h1>
            <div className="mt-4 sm:mt-6 lg:mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-2 sm:space-y-0 sm:space-x-2">
              <span className="text-white text-sm sm:text-base lg:text-lg xl:text-xl">Beetle Screener a product of</span>
              <img 
                src={Logo} 
                alt="Black Beetle" 
                className="h-5 sm:h-6 lg:h-8 xl:h-10"
              />
            </div>
            <p className="mt-4 sm:mt-6 lg:mt-8 text-gray-300 text-sm sm:text-base lg:text-lg xl:text-xl max-w-xl mx-auto md:mx-0">
              Identify stocks completing corrections or starting new trends with our AI-powered screening tool.
            </p>
            <button className="mt-6 sm:mt-8 lg:mt-10 bg-[#D4AF37] text-black px-6 sm:px-8 lg:px-10 py-2 sm:py-3 lg:py-4 rounded-md text-sm sm:text-base lg:text-lg xl:text-xl font-medium hover:bg-[#C4A137] transition-colors">
              Get Started
            </button>
          </div>
          
          <div className="relative mt-8 md:mt-0">
            <Illustration className="w-full h-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}

