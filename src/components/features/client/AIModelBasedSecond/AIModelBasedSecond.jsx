import React from 'react';
import { ArrowRight, TrendingUp, DollarSign, BarChart3, LineChart } from 'lucide-react';

const CandlestickChart = () => (
  <svg className="w-full h-full" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="200" fill="#1a1a1a"/>
    <path d="M50,180 L50,20 M100,180 L100,20 M150,180 L150,20 M200,180 L200,20 M250,180 L250,20 M300,180 L300,20 M350,180 L350,20" stroke="#2a2a2a" strokeWidth="1"/>
    <path d="M20,50 L380,50 M20,100 L380,100 M20,150 L380,150" stroke="#2a2a2a" strokeWidth="1"/>
    <path d="M50,100 L100,80 L150,120 L200,90 L250,110 L300,70 L350,130" stroke="#D7B257" strokeWidth="2" fill="none"/>
    <rect x="70" y="60" width="10" height="40" fill="#4CAF50"/>
    <rect x="120" y="100" width="10" height="40" fill="#F44336"/>
    <rect x="170" y="70" width="10" height="40" fill="#4CAF50"/>
    <rect x="220" y="90" width="10" height="40" fill="#4CAF50"/>
    <rect x="270" y="50" width="10" height="40" fill="#4CAF50"/>
    <rect x="320" y="110" width="10" height="40" fill="#F44336"/>
  </svg>
);

export function AIModelBasedSecond() {
  const marketSegments = [
    { title: 'Commodities', description: 'Spot trends and key price levels', icon: TrendingUp },
    { title: 'Forex', description: 'Insights on 6 major currency pairs', icon: DollarSign },
    { title: 'Indices', description: 'NIFTY, BANKNIFTY, FINNIFTY analysis', icon: BarChart3 },
    { title: 'Stocks', description: 'Covers FNO and NSE-listed equities', icon: LineChart },
  ];

  return (
    <section className="bg-[#1a1a1a] text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-8 order-2 md:order-1">
            <div>
              <h2 className="text-lg font-semibold mb-4">
                Our AI-powered screener analyzes multiple market segments with precision:
              </h2>
              <ul className="space-y-4">
                {marketSegments.map((segment, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="mt-1">
                      <segment.icon className="h-5 w-5 text-[#D7B257]" />
                    </div>
                    <div>
                      <span className="font-bold text-[#D7B257]">{segment.title}: </span>
                      <span className="text-gray-300">{segment.description}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-gray-300">
              Benefit from AI-driven market insights to enhance your trading
              strategy across diverse asset classes.
            </p>

            <div>
              <a 
                href="#learn-more"
                className="inline-flex items-center text-[#D7B257] hover:text-[#c9a64f] transition-colors duration-300"
              >
                Learn more
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="relative order-1 md:order-2">
            <div className="text-center md:text-right mb-8">
              <h2 className="text-2xl sm:text-5xl font-bold text-[#D7B257] mb-2">
                Beetle's AI-Based Model
              </h2>
              <p className="text-xl text-gray-400">
                Advanced Market Intelligence
              </p>
            </div>
            <div className="aspect-w-16 aspect-h-9 bg-[#1f1f1f] rounded-lg overflow-hidden">
              <CandlestickChart />
              <div className="absolute bottom-4 right-4 space-y-2">
                <div className="bg-gray-800/80 backdrop-blur-sm p-3 rounded-lg shadow-lg">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">TATA STEEL</span>
                      <span className="text-green-500">+2.45%</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">TATA MOTORS</span>
                      <span className="text-red-500">-1.20%</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">NIFTY</span>
                      <span className="text-green-500">+0.87%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

