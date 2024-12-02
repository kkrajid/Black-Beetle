import React, { useState, useEffect, useMemo, useCallback } from "react";
import { MagnifyingGlassIcon, StarIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTrades } from "../../../../services/api";

// Star Component
const Star = ({ className, ...props }) => (
  <StarIcon className={`h-6 w-6 ${className}`} {...props} />
);

export function StockDashboard() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [trades, setTrades] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");
  const [websocketError, setWebsocketError] = useState(null);

  const navigate = useNavigate();

  // Fetch trades via API
  const {
    data: tradesData,
    isLoading,
    error: fetchError,refetch
  } = useQuery({
    queryKey: ["getTrades"],
    queryFn: getTrades,
    retry: 2,
    onError: (error) => {
      console.error("Comprehensive trade fetch error:", error);
    }
  });

  // WebSocket connection state and methods
  const [socket, setSocket] = useState(null);

  const connectWebSocket = useCallback(() => {
    // Close existing socket if open
    if (socket) {
      socket.close();
    }

    // Create new WebSocket connection
    const newSocket = new WebSocket("wss://13.51.169.229/ws/trades/");

    newSocket.onopen = () => {
      setConnectionStatus("Connected");
      setWebsocketError(null);
    };

    newSocket.onclose = (event) => {
      setConnectionStatus("Disconnected");
      if (!event.wasClean) {
        setWebsocketError("Connection lost unexpectedly. Reconnecting...");
        // Attempt reconnection after a delay
        setTimeout(connectWebSocket, 3000);
      }
    };
console.log(tradesData);

    newSocket.onerror = (error) => {
      setConnectionStatus("Error");
      setWebsocketError("WebSocket connection error");
      console.error("WebSocket Error:", error);
    };

    newSocket.onmessage = (event) => {
      try {
        refetch();
        const data = JSON.parse(event.data);

        if (data.trade) {
          // Handle new or updated trade
          setTrades(prevTrades => {
            // Check if trade already exists
            const existingTradeIndex = prevTrades.findIndex(t => t.id === data.trade.id);

            if (existingTradeIndex !== -1) {
              // Update existing trade
              const updatedTrades = [...prevTrades];
              updatedTrades[existingTradeIndex] = data.trade;
              return updatedTrades;
            } else {
              // Add new trade
              return [data.trade, ...prevTrades];
            }
          });
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    setSocket(newSocket);
  }, []);

  // Establish WebSocket connection on component mount
  useEffect(() => {
    connectWebSocket();

    // Cleanup function to close socket when component unmounts
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [connectWebSocket]);

  // Update trades from API fetch
  useEffect(() => {
    if (!isLoading && tradesData?.data) {
      setTrades(tradesData.data);
    }
  }, [tradesData, isLoading]);

  // Existing methods remain the same
  const tabs = ["All", "BTST", "Intraday", "Long Term", "Options", "short term"];

  const filteredTrades = useMemo(() => {
    return trades.filter((trade) => {
      const normalizedActiveTab = activeTab.toLowerCase();
      const normalizedTradeType = trade.trade_type.toLowerCase();

      // Mapping for more flexible tab matching
      const tabMappings = {
        "btst": ["btst"],
        "intraday": ["intraday"],
        "long term": ["LONG TERM", "LONG_TERM", "LONGTERM","long_term"],
        "options": ["options"],
        "short term": ["short_term"]
      };

      const matchesTab =
        activeTab === "All" ||
        (tabMappings[normalizedActiveTab] &&
          tabMappings[normalizedActiveTab].includes(normalizedTradeType));

      const matchesSearch =
        searchTerm.trim() === "" ||
        trade.stock_index.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trade.company_name.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [trades, activeTab, searchTerm]);

  const calculatePercentageChange = (trade) => {
    try {
      // Handle cases with zero or invalid buy price
      if (!trade.buy || trade.buy <= 0) return "N/A";

      // Check if target price is valid
      if (!trade.target) return "N/A";

      const percentageChange =
        ((trade.target - trade.buy) / trade.buy) * 100;

      // Format with sign and handle extreme cases
      const formattedChange = percentageChange.toFixed(1);
      return percentageChange >= 0
        ? `+${formattedChange}%`
        : `${formattedChange}%`;
    } catch (error) {
      console.error("Error calculating percentage for trade:", trade, error);
      return "N/A";
    }
  };

  const formatTradeDate = (dateString) => {
    try {
      const date = new Date(dateString);
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return "Date N/A";
      }
      return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch (error) {
      console.error("Error formatting date:", dateString, error);
      return "Date N/A";
    }
  };



  const handleStockClick = (symbol) => {
    navigate(`/stock/${symbol}`);
  };

  // Render error state
  if (fetchError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">
          Failed to load trades. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Connection Status Indicator */}
        {/* <div 
          className={`p-2 text-center ${
            connectionStatus === 'Connected' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}
        >
          Connection Status: {connectionStatus}
          {websocketError && (
            <div className="text-sm mt-1 text-red-600">
              {websocketError}
            </div>
          )}
        </div> */}

        <h1 className="text-2xl md:text-3xl font-medium">
          Welcome Back, <span className="text-[#D4AF37]">User!</span>
        </h1>

        {/* Search Input */}
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search Stocks..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg whitespace-nowrap transition-colors ${tab === activeTab
                  ? "bg-[#D4AF37] text-black"
                  : "bg-white hover:bg-gray-50 text-gray-600"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Trades Grid */}
        {isLoading ? (
          <div className="text-center text-xl">
            <div role="status" className="flex justify-center items-center">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[#D4AF37]"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C33.023 2.70293 25.0059 6.05422 17.9239 10.988C12.4038 15.0601 7.58167 20.2936 3.66683 25.9492C-0.983322 33.0457 -0.983322 41.5344 3.66683 48.6309C7.58167 54.2865 12.4038 59.52 17.9239 63.5921C25.0059 68.5262 33.023 71.8775 41.7345 73.3017C46.6976 74.1335 51.7666 74.2128 56.7698 73.5291C63.2754 72.64 69.5422 70.4783 75.2124 67.1674C80.8826 63.8564 85.8452 59.461 89.8167 54.2322C92.871 50.2111 95.2932 45.7576 97.0079 40.9264C97.8624 38.5687 96.393 36.0765 93.9676 35.4394L93.9676 39.0409Z"
                  fill="#D4AF37"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
            Loading trades...
          </div>
        ) : filteredTrades.length === 0 ? (
          <div className="text-center text-xl text-gray-500">
            No trades found
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredTrades.map((trade) => (
              <div
                key={trade.id}
                className="stock-card bg-gradient-to-br from-[#7b7729] to-black rounded-[30px] border-[#C58F0A] p-4 shadow-lg border-4 flex items-center relative cursor-pointer"
                onClick={() => handleStockClick(trade.id)}
              >

                
                <div className="stock-card__image-wrapper w-[100px] h-[100px] -ml-[50px] -mt-[100px] absolute p-5 bg-white rounded-[35px]">
                  <img
                    src={`https://logo.clearbit.com/${trade.stock_index.toLowerCase().replace(/[\d% ]/g, '')}.com`}
                    alt={`${trade.company_name} Logo`}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.src = '/default-logo.png';
                    }}
                  />
                </div>
                <div className="w-[100px] -ml-[40px]"></div>
                <div className="flex-1 flex flex-col">
                  <div className="flex-1 flex justify-end">
                    <Star className="text-[#D4AF37]" />
                  </div>
                  <span className="text-white font-bold text-2xl">
                    {trade.stock_index}
                  </span>
                  <span className="text-white text-lg opacity-[79%]">
                    {trade.company_name}
                  </span>
               
                  <span className="text-white text-sm opacity-[79%]">
                    {formatTradeDate(trade.expiry_date)}
                  </span>
                  <div className="flex justify-between mt-2">
                    <div className="flex items-center gap-2 text-[#FFB500]">
                      <span>{trade.trade_type}</span>
                      <span className="opacity-50">|</span>
                      <span>{trade.segment}</span>
                      <span className="opacity-50">|</span>
                      <span>{trade.status}</span>
                    </div>
                    <span
                      className={`flex-1 text-end ${trade.target > trade.buy
                          ? "text-green-400"
                          : "text-red-400"
                        } font-semibold text-lg`}
                    >
                      {calculatePercentageChange(trade)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}