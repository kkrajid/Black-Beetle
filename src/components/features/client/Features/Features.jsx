import React from 'react'
import { Line, LineChart, ResponsiveContainer } from "recharts"
import { X, Search, BarChart3, RefreshCcw, Home, Settings } from 'lucide-react'
import { Card } from './Card'
import { Button } from './Button'
import { Link } from 'react-router-dom'


import InterBeteels from "@/assets/svg/InterBeteels";


// Sample data for charts
const chartData = [
    { time: "01:00PM", value: 30, comparison: 25 },
    { time: "02:00PM", value: 45, comparison: 35 },
    { time: "03:00PM", value: 35, comparison: 28 },
    { time: "04:00PM", value: 50, comparison: 40 },
    { time: "05:00PM", value: 45, comparison: 35 },
]

const performanceData = [
    { time: "1", value: 20 },
    { time: "2", value: 35 },
    { time: "3", value: 45 },
    { time: "4", value: 40 },
    { time: "5", value: 50 },
    { time: "6", value: 55 },
    { time: "7", value: 60 },
]

export function Features() {
    return (
        <div className="w-full min-h-screen  p-6 relative">


            <div className="max-w-7xl mx-auto space-y-8">
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold text-white">
                        Introducing <span className="text-[#F4B740]">Beetle Screener</span>,
                    </h1>
                    <h2 className="text-3xl font-bold text-white">Your Investment Buddy</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Ahead of the curve card */}
                    <Card>
                        <h3 className="text-xl font-semibold text-[#F4B740] mb-4">Ahead of the curve</h3>
                        <p className="text-zinc-400 mb-4">
                            Your tool for spotting stocks in motion, identifying uptrends and downtrends to stay ahead with ease.
                        </p>
                        <div className="h-40 relative">
                            <div className="absolute top-2 left-2 bg-green-500/20 px-2 py-1 rounded text-green-400 text-sm">
                                14.12%
                            </div>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={performanceData}>
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#22c55e"
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    {/* Advanced Insights card */}
                    <Card>
                        <h3 className="text-xl font-semibold text-[#F4B740] mb-4">Advanced Insights</h3>
                        <p className="text-zinc-400 mb-4">
                            Harnessing advanced Time-Price Cycle Theory delivers unparalleled accuracy and predictive precision.
                        </p>
                        <div className="h-40">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData}>
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#22c55e"
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="comparison"
                                        stroke="#ffffff"
                                        strokeWidth={2}
                                        strokeDasharray="5 5"
                                        dot={false}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    {/* Features card */}
                    <Card>
                        <h3 className="text-xl font-semibold text-[#F4B740] mb-4">Advanced Insights</h3>
                        <p className="text-zinc-400 mb-4">
                            Harnessing advanced Time-Price Cycle Theory delivers unparalleled accuracy and predictive precision.
                        </p>
                        <div className="grid grid-cols-3 gap-4 mt-8">
                            <div className="flex flex-col items-center gap-2">
                                <div className="p-2 rounded-full bg-zinc-800">
                                    <Search className="h-5 w-5 text-[#F4B740]" />
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="p-2 rounded-full bg-zinc-800">
                                    <RefreshCcw className="h-5 w-5 text-[#F4B740]" />
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="p-2 rounded-full bg-zinc-800">
                                    <BarChart3 className="h-5 w-5 text-[#F4B740]" />
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="p-2 rounded-full bg-zinc-800">
                                    <Home className="h-5 w-5 text-[#F4B740]" />
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="p-2 rounded-full bg-zinc-800">
                                    <Settings className="h-5 w-5 text-[#F4B740]" />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Two Powerful Models card */}
                    <Card>
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                            {/* Left Content */}
                            <div className="mb-4 md:mb-0">
                                <h3 className="text-xl font-semibold text-[#F4B740] mb-4">Two Powerful Models</h3>
                                <p className="text-zinc-400 mb-4">
                                    Beetle Screener combines AI-driven analysis with advanced market cycle theory to give you a complete trading advantage
                                </p>
                                <div className="space-y-2 mt-4">
                                    <p className="text-zinc-400">Beetle's AI Based Model</p>
                                    <p className="text-zinc-400">Beetle's Time-Price Cycle Model</p>
                                </div>
                            </div>

                            {/* Right Content */}
                            <div className="relative mt-4 md:mt-0">
                                {/* Uncomment the following lines if needed */}
                                {/* 
                                <div className="absolute right-0 space-y-2">
                                    <div className="bg-zinc-800 rounded px-3 py-1 text-sm text-[#F4B740]">AI</div>
                                    <div className="bg-zinc-800 rounded p-2">
                                    <RefreshCcw className="h-5 w-5 text-[#F4B740]" />
                                    </div>
                                    <div className="bg-zinc-800 rounded p-2">
                                    <BarChart3 className="h-5 w-5 text-[#F4B740]" />
                                    </div>
                                </div>
                                */}
                                <InterBeteels className="ml-4" />
                            </div>
                        </div>
                    </Card>


                    {/* AI-Based Model card */}
                    <Card>
                        <h3 className="text-xl font-semibold text-[#F4B740] mb-4">Beetle's AI-Based Model</h3>
                        <p className="text-zinc-400 mb-4">
                            Trading NIFTY, FNO, or stocks? Our model delivers tailored insights to support your decisions. Harness AI for smart analysis and precise insights across assets for informed trading
                        </p>
                        <div className="h-40">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={performanceData}>
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#22c55e"
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <Button variant="link" className="text-[#F4B740] hover:text-[#F4B740]/80 p-0 mt-4">
                            <Link to="/trades">Learn More</Link>
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    )
}

