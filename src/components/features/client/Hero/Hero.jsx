import React from 'react';
import { TrendingUp, Lightbulb } from 'lucide-react';
import Logo from "@/assets/images/black-beetles-logo.png";
import Illustration from "@/assets/svg/Illustration";
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section className="relative overflow-hidden py-8 sm:py-16 md:py-20 lg:py-24 xl:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between ">
          <div className="w-full lg:w-1/2 text-center lg:text-left order-last lg:order-first">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
              Discover
              <br className="hidden sm:inline" />
              Winning <span className="text-[#D4AF37]">Stock.</span>
            </h1>
            <div className="mt-3 sm:mt-6 flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-2 sm:space-y-0 sm:space-x-2">
              <span className="text-white text-xs sm:text-base lg:text-lg">Beetle Screener a product of</span>
              <img 
                src={Logo} 
                alt="Black Beetle" 
                className="h-4 sm:h-6 lg:h-8"
              />
            </div>
            <p className="mt-3 sm:mt-6 text-gray-300 text-xs sm:text-base lg:text-lg max-w-xl mx-auto lg:mx-0">
              Identify stocks completing corrections or starting new trends with our AI-powered screening tool.
            </p>
            <Link 
              to="/trades" 
              className="mt-4 sm:mt-8 inline-block bg-[#D4AF37] text-black px-4 sm:px-8 py-2 sm:py-3 rounded-md text-xs sm:text-base lg:text-lg font-medium hover:bg-[#C4A137] transition-colors"
            >
              Start Trading
            </Link>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end order-first lg:order-last md:mb-8 lg:mb-0 ">
            <div className="relative w-full max-w-xs sm:max-w-md lg:max-w-full flex items-center justify-center  md:pl-20">
              <Illustration className="w-full h-auto bg-white" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br  opacity-50"></div>
    </section>
  );
}

