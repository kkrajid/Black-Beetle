import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50">
      <div className="relative w-32 h-32">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 border-t-4 border-b-4 border-amber-500 rounded-full animate-spin"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-0 h-0 border-l-[50px] border-l-transparent border-b-[80px] border-b-amber-500 border-r-[50px] border-r-transparent animate-bounce origin-top"></div>
        </div>
      </div>
      <p className="mt-8 text-2xl font-bold text-amber-700">Preparing your feast...</p>
      <div className="mt-4 flex space-x-2">
        <span className="w-3 h-3 bg-amber-500 rounded-full animate-bounce"></span>
        <span className="w-3 h-3 bg-amber-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
        <span className="w-3 h-3 bg-amber-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
      </div>
    </div>
  );
};

export default LoadingSpinner;