import React, { useState, useEffect } from 'react';
import { User, Package, Diamond, Loader, ChevronDown, ChevronUp, Check, X } from 'lucide-react';
import { getOrderStats, getOrders } from './ordersApi';

export function AdminOrders() {
  const [orderStats, setOrderStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [statsResponse, ordersResponse] = await Promise.all([
          getOrderStats(),
          getOrders()
        ]);
        setOrderStats(statsResponse.data);
        setOrders(ordersResponse.data);
      } catch (err) {
        setError('Failed to fetch orders data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleRowExpansion = (id) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <Loader className="w-12 h-12 text-yellow-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  const metrics = [
    {
      icon: User,
      label: "Users",
      value: orderStats?.totalUsers || 0,
    },
    {
      icon: Package,
      label: "Orders",
      value: orderStats?.totalOrders || 0,
    },
    {
      icon: Diamond,
      label: "Premium users",
      value: orderStats?.premiumUsers || 0,
    },
  ];

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Orders</h1>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-6">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full border-2 border-yellow-500 flex items-center justify-center">
                  <metric.icon className="w-8 h-8 text-yellow-500" />
                </div>
              </div>
              <h2 className="text-4xl font-bold text-white text-center mb-2">{metric.value}</h2>
              <p className="text-gray-400 text-center">{metric.label}</p>
            </div>
          ))}
        </div>

        {/* Orders Table */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">User</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
                  <th className="hidden md:table-cell px-6 py-4 text-left text-sm font-semibold text-white">Payment ID</th>
                  <th className="hidden lg:table-cell px-6 py-4 text-left text-sm font-semibold text-white">Timestamp</th>
                  <th className="hidden xl:table-cell px-6 py-4 text-left text-sm font-semibold text-white">Premium Selected</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {orders.map((order) => (
                  <React.Fragment key={order.id}>
                    <tr className="hover:bg-gray-700">
                      <td className="px-6 py-4 text-sm text-white">
                        <button
                          onClick={() => toggleRowExpansion(order.id)}
                          className="md:hidden mr-2 focus:outline-none"
                        >
                          {expandedRows[order.id] ? (
                            <ChevronUp className="w-4 h-4 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                        {order.user}
                      </td>
                      <td className="px-6 py-4 text-sm text-white">₹{order.amount.toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm">
                        {order.payment_status ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <Check className="w-4 h-4 mr-1" />
                            Paid
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            <X className="w-4 h-4 mr-1" />
                            Unpaid
                          </span>
                        )}
                      </td>
                      <td className="hidden md:table-cell px-6 py-4 text-sm text-white">{order.payment_id}</td>
                      <td className="hidden lg:table-cell px-6 py-4 text-sm text-white">
                        {new Date(order.timestamp).toLocaleString()}
                      </td>
                      <td className="hidden xl:table-cell px-6 py-4 text-sm text-white">{order.premium_selected}</td>
                    </tr>
                    {expandedRows[order.id] && (
                      <tr className="md:hidden bg-gray-700">
                        <td colSpan="6" className="px-6 py-4">
                          <div className="grid grid-cols-2 gap-4 text-sm text-white">
                            <div>
                              <span className="font-medium">Payment ID:</span>
                              <p className="text-gray-300">{order.payment_id}</p>
                            </div>
                            <div>
                              <span className="font-medium">Timestamp:</span>
                              <p className="text-gray-300">{new Date(order.timestamp).toLocaleString()}</p>
                            </div>
                            <div>
                              <span className="font-medium">Premium Selected:</span>
                              <p className="text-gray-300">{order.premium_selected}</p>
                            </div>
                            <div>
                              <span className="font-medium">Signature:</span>
                              <p className="text-gray-300">{order.signature || 'N/A'}</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

