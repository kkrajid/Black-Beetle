import React, { useState, useEffect } from 'react';
import TradeHistoryGraph from '../TradeHistoryGraph';

export default function Section({ name, stockData }) {
    const [clickTime, setClickTime] = useState(null);
    const [selectedOption, setSelectedOption] = useState('Current');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        setClickTime(new Date().toLocaleTimeString());
    }, [name]);

    const TradeCard = ({ label, price = 0, change = 0 }) => (
        <div className="bg-[#1F1F1F] rounded-lg p-6">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-4 bg-[#D7B257C9]"></div>
                    <span className="text-white">{label}:</span>
                </div>
                <span className="text-white text-xl">{price.toFixed(2)}</span>
            </div>
            <div className={`${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {change >= 0 ? '+' : ''}{change.toFixed(2)} {((change / price) * 100).toFixed(2)}%
            </div>
        </div>
    );

    const renderSummary = () => {
        if (!stockData) return <div className="text-white">Loading stock data...</div>;
        return (
            <div className="text-white">
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-[#D7B257C9] text-xl">Trade</h2>
                        <div className="relative">
                            <button 
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="bg-[#2A3341] px-4 py-2 rounded flex items-center"
                            >
                                {selectedOption}
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-[#2A3341] rounded-md shadow-lg z-10">
                                    <button 
                                        className="block px-4 py-2 text-sm text-white hover:bg-[#3A4351] w-full text-left"
                                        onClick={() => {
                                            setSelectedOption('Current');
                                            setIsDropdownOpen(false);
                                        }}
                                    >
                                        Current
                                    </button>
                                    <button 
                                        className="block px-4 py-2 text-sm text-white hover:bg-[#3A4351] w-full text-left"
                                        onClick={() => {
                                            setSelectedOption('Compare');
                                            setIsDropdownOpen(false);
                                        }}
                                    >
                                        Compare
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <TradeCard 
                            label="Buy" 
                            price={stockData.price}
                            change={stockData.change}
                        />
                        <TradeCard 
                            label="Target" 
                            price={stockData.price * 1.1}
                            change={stockData.price * 0.1}
                        />
                        <TradeCard 
                            label="Stop Loss" 
                            price={stockData.price * 0.9}
                            change={stockData.price * -0.1}
                        />
                    </div>
                </div>

                <div>
                    <h2 className="text-[#D7B257C9] text-xl mb-4">Performance:</h2>
                    <div className="relative h-[200px] bg-[#1F1F1F] rounded-lg p-6">
                        <div className="absolute top-4 left-8 bg-red-500/20 text-red-500 px-4 py-1 rounded-full">
                            SL (-10%) {(stockData.price * 0.9).toFixed(2)}
                        </div>
                        <div className="absolute top-1/2 left-8 right-8 h-2 bg-gradient-to-r from-red-500 via-blue-500 to-green-500 rounded-full"></div>
                        <div className="absolute bottom-4 right-8 bg-green-500/20 text-green-500 px-4 py-1 rounded-full">
                            Target (+10%) {(stockData.price * 1.1).toFixed(2)}
                        </div>
                        <div className="absolute bottom-4 right-1/2 transform translate-x-1/2 bg-blue-500/20 text-blue-500 px-4 py-1 rounded-full">
                            Buy (0%) {stockData.price.toFixed(2)}
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-[#D7B257C9] text-xl mb-4">Trade History:</h2>
                    {selectedOption === 'Current' ? (
                        <div className="bg-[#1F1F1F] rounded-lg p-6">
                            <p>Current trade details for {stockData.symbol}</p>
                            <TradeCard 
                                label="Current" 
                                price={stockData.price}
                                change={stockData.change}
                            />
                        </div>
                    ) : (
                        <div className="bg-[#1F1F1F] rounded-lg p-6">
                            <TradeHistoryGraph data={stockData.tradeHistory} />
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const renderAnalysis = () => (
        <div className="text-white">
            <h2 className="text-[#D7B257C9] text-xl mb-4">Analysis</h2>
            <p>Detailed analysis of {stockData?.symbol} performance and market trends would be displayed here.</p>
        </div>
    );

    const renderHistory = () => (
        <div className="text-white">
            <h2 className="text-[#D7B257C9] text-xl mb-4">History</h2>
            <p>Historical data and past performance metrics of {stockData?.symbol} would be shown in this section.</p>
        </div>
    );

    const renderPredictionVsActual = () => (
        <div className="text-white">
            <h2 className="text-[#D7B257C9] text-xl mb-4">Prediction v/s Actual Analysis</h2>
            <p>Comparison between predicted stock performance and actual results for {stockData?.symbol} would be presented here.</p>
        </div>
    );

    const renderContent = () => {
        switch (name) {
            case 'Summary':
                return renderSummary();
            case 'Analysis':
                return renderAnalysis();
            case 'History':
                return renderHistory();
            case 'Prediction v/s Actual Analysis':
                return renderPredictionVsActual();
            default:
                return <div>Select a section</div>;
        }
    };

    return (
        <div>
            <div className="text-white mb-4">
                Section clicked at: {clickTime}
            </div>
            {renderContent()}
        </div>
    );
}
