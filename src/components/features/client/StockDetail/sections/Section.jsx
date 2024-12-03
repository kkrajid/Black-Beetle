import React, { useState, useEffect } from 'react';
import TradeHistoryGraph from '../TradeHistoryGraph';
import { AlertCircle } from 'lucide-react'

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
                <span className="text-white text-xl">{parseFloat(price).toFixed(2)}</span>
            </div>
            <div className={`${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {change >= 0 ? '+' : ''}{change.toFixed(2)} {((change / price) * 100).toFixed(2)}%
            </div>
        </div>
    );

    const renderSummary = () => {
        if (!stockData) return <div className="text-white">Loading stock data...</div>;
        const latestTrade = stockData.history[stockData.history.length - 1];
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
                            price={latestTrade.buy}
                            change={0}
                        />
                        <TradeCard 
                            label="Target" 
                            price={latestTrade.target}
                            change={parseFloat(latestTrade.target) - parseFloat(latestTrade.buy)}
                        />
                        <TradeCard 
                            label="Stop Loss" 
                            price={latestTrade.sl}
                            change={parseFloat(latestTrade.sl) - parseFloat(latestTrade.buy)}
                        />
                    </div>
                </div>

                <div>
                    <h2 className="text-[#D7B257C9] text-xl mb-4">Performance:</h2>
                    <div className="relative h-[200px] bg-[#1F1F1F] rounded-lg p-6">
                        <div className="absolute top-4 left-8 bg-red-500/20 text-red-500 px-4 py-1 rounded-full">
                            SL {latestTrade.sl}
                        </div>
                        <div className="absolute top-1/2 left-8 right-8 h-2 bg-gradient-to-r from-red-500 via-blue-500 to-green-500 rounded-full"></div>
                        <div className="absolute bottom-4 right-8 bg-green-500/20 text-green-500 px-4 py-1 rounded-full">
                            Target {latestTrade.target}
                        </div>
                        <div className="absolute bottom-4 right-1/2 transform translate-x-1/2 bg-blue-500/20 text-blue-500 px-4 py-1 rounded-full">
                            Buy {latestTrade.buy}
                        </div>
                    </div>
                </div>

                {/* <div className="mt-8">
                    <h2 className="text-[#D7B257C9] text-xl mb-4">Trade History:</h2>
                    {selectedOption === 'Current' ? (
                        <div className="bg-[#1F1F1F] rounded-lg p-6">
                            <p>Current trade details for {stockData.stock_index}</p>
                            <TradeCard 
                                label="Current" 
                                price={latestTrade.buy}
                                change={0}
                            />
                        </div>
                    ) : (
                        <div className="bg-[#1F1F1F] rounded-lg p-6">
                            <TradeHistoryGraph data={stockData.history} />
                        </div>
                    )}
                </div> */}
            </div>
        );
    };

    const renderAnalysis = () => (
        <div className="text-white">
            <h2 className="text-[#D7B257C9] text-xl mb-4">Analysis</h2>
            {stockData.analysis.map((analysis, index) => (
                <div key={index} className="bg-[#1F1F1F] rounded-lg p-6 mb-4">
                    <p>Bull Scenario: <span className={analysis.bull_scenario === 'positive' ? 'text-green-500' : 'text-red-500'}>{analysis.bull_scenario}</span></p>
                    <p>Bear Scenario: <span className={analysis.bear_scenario === 'positive' ? 'text-green-500' : 'text-red-500'}>{analysis.bear_scenario}</span></p>
                    <p>Status: <span className={analysis.status === 'BULLISH' ? 'text-green-500' : 'text-red-500'}>{analysis.status}</span></p>
                </div>
            ))}
        </div>
    );

    const renderHistory = () => (
        <div className="text-white">
            <h2 className="text-[#D7B257C9] text-xl mb-4">History</h2>
            <div className="bg-[#1F1F1F] rounded-lg p-6">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="text-left">Date</th>
                            <th className="text-left">Buy</th>
                            <th className="text-left">Target</th>
                            <th className="text-left">Stop Loss</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stockData.history.map((trade, index) => (
                            <tr key={index}>
                                <td>{new Date(trade.changed_at).toLocaleDateString()}</td>
                                <td>{trade.buy}</td>
                                <td>{trade.target}</td>
                                <td>{trade.sl}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    // const renderPredictionVsActual = () => (
    //     <div className="text-white">
    //         <h2 className="text-[#D7B257C9] text-xl mb-4">Prediction v/s Actual Analysis</h2>
    //         {/* {stockData.insights.map((insight, index) => (
    //             <div key={index} className="bg-[#1F1F1F] rounded-lg p-6 mb-4">
    //                 <p>Prediction: {insight.prediction}</p>
    //                 <p>Actual: {insight.actual}</p>
    //                 <p>Difference: {Math.abs(insight.actual - insight.prediction)}</p>
    //             </div>
    //         ))} */}
    //         <div>
    //             <h1>Will only get update ones trade has expired </h1>
    //         </div>

    //     </div>
    // );

    const renderPredictionVsActual = () => (
        <div className="space-y-4">
          <h2 className="text-[#D7B257C9] text-xl">Prediction v/s Actual Analysis</h2>
          <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded" role="alert">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              <p className="font-bold">Analysis Pending</p>
            </div>
            <p className="text-sm mt-2">
              The Prediction vs Actual analysis will be updated once the trade has expired.
            </p>
          </div>
          {/* Uncomment and modify this section when you have actual data
          {stockData.insights.map((insight, index) => (
            <div 
              key={index} 
              className={`border-l-4 p-4 rounded ${
                insight.actual >= insight.prediction 
                  ? "bg-green-100 border-green-500 text-green-700" 
                  : "bg-red-100 border-red-500 text-red-700"
              }`} 
              role="alert"
            >
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                <p className="font-bold">Trade {index + 1}</p>
              </div>
              <div className="text-sm mt-2">
                <p>Prediction: {insight.prediction}</p>
                <p>Actual: {insight.actual}</p>
                <p>Difference: {Math.abs(insight.actual - insight.prediction)}</p>
              </div>
            </div>
          ))}
          */}
        </div>
      )
      

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

