import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Home from './icons/Home';
import ArrowRight from './icons/ArrowRight';
import Circle from './Circle';
import Graph from './Graph';
import Curve from './icons/Curve';
import Section from './sections/Section';
import { Link } from 'react-router-dom';

const navs = ['Summary', 'Analysis', 'History', 'Prediction v/s Actual Analysis'];

export function StockDetails() {
    const { symbol } = useParams();
    const [selectedSection, setSelectedSection] = useState(navs[0]);
    const [stockData, setStockData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch(`https://13.51.169.229/admin-side/trade/${symbol}/`)
            .then(response => response.json())
            .then(data => {
                setStockData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching stock data:', error);
                setError('Failed to fetch data.');
                setLoading(false);
            });
    }, [symbol]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#1F1D1A] text-white p-8 animate-pulse">
                <div className="h-8 bg-gray-700 rounded w-1/4 mb-4"></div>
                <div className="h-32 bg-gray-700 rounded mb-4"></div>
                <div className="h-64 bg-gray-700 rounded"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#1F1D1A] text-white p-8">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="w-full mx-auto h-screen flex flex-col bg-[#1F1D1A]">
            <div className="flex-1 flex flex-col">
                <div className="bg-[#1F1D1A] px-10 xl:px-60 py-20">
                    <div className="fixed w-full h-screen overflow-hidden pointer-events-none top-0 pt-20">
                        <Curve />
                    </div>
                    <div className="w-full flex items-center">
                        <Link to="/"><Home /></Link>
                        <ArrowRight className="ml-3" />
                        <Link to={"/trades"} className="text-[#FFFFFFB2] ml-3">trades</Link>
                        <ArrowRight className="ml-3" />
                        <span className="text-[#FFFFFFB2] ml-3">{stockData.company_name}</span>
                    </div>
                    <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center mt-5">
                        <div className="flex-1 relative flex flex-col lg:flex-row justify-center items-center">
                            <div className="mt-10 lg:mt-0 bg-white rounded-xl items-center justify-center w-fit p-4">
                                <img src={`https://logo.clearbit.com/${stockData.stock_index.toLowerCase()}.com`} alt="logo" className="w-[60px] h-[60px] object-contain" />
                            </div>
                            <div className="flex flex-col lg:ml-4 mt-5 lg:mt-0">
                                <span className="text-[#D7B257C9] font-extrabold text-3xl">{stockData.stock_index}</span>
                                <span className="flex justify-center lg:justify-start items-center">
                                    <Circle radius={10} color={'#1DF81F'} />
                                    <span className="ml-1">Open</span>
                                </span>
                            </div>
                        </div>
                        <div className="w-full lg:flex-1 flex justify-between items-center mt-10 lg:mt-0">
                            <div className="flex-1 flex flex-col items-center mx-10">
                                <span className="font-extrabold text-white text-lg lg:text-2xl">{stockData.trade_type}</span>
                                <span className="text-xs text-[#FFFFFFA1]">Type</span>
                            </div>
                            <div className="flex-1 flex flex-col items-center  mx-10">
                                <span className="font-extrabold text-white text-lg lg:text-2xl">{stockData.segment}</span>
                                <span className="text-xs text-[#FFFFFFA1]">Asset</span>
                            </div>
                            <div className="flex-1 flex flex-col items-center  mx-10">
                                <span className="font-extrabold text-white text-lg lg:text-2xl">{new Date(stockData.created_at).toLocaleDateString()}</span>
                                <span className="text-xs text-[#FFFFFFA1]">Trigger Date</span>
                            </div>
                        </div>
                        <div className="flex-1 mt-5 lg:mt-0 flex justify-end items-center flex-col">
                            <div className="w-full lg:w-3/4">
                                <Graph data={stockData.history.map((h, index) => ({ price: parseFloat(h.buy), index }))} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex flex-col bg-white px-5 md:px-12 xl:px-60">
                    <div className="flex flex-col flex-1 bg-[#2F2F2F] -mt-20 border-t-2 border-l-2 border-r-2 border-[#D7B257C9] rounded-t-xl z-10">
                        <div className="w-full flex my-4 py-2 gap-x-5 px-10 overflow-x-auto custom-scrollbar">
                            {navs.map((nav, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedSection(nav)}
                                    className={`w-max px-3 py-0 lg:py-2 rounded-lg transition-all duration-200 ease-in-out whitespace-nowrap flex-shrink-0 ${
                                        nav === selectedSection
                                            ? "bg-gradient-to-r from-[#C5C5C521] to-[#5F5F5F21] hover:to-[#5F5F5F51]"
                                            : "hover:bg-[#5F5F5F51]"
                                    }`}
                                >
                                    {nav}
                                </button>
                            ))}
                        </div>

                        <div className="w-full h-[1px] bg-[#D7B257C9]"></div>
                        <div className="min-h-[70vh] flex flex-col px-10 py-5 overflow-y-auto">
                            <Section name={selectedSection} stockData={stockData} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
