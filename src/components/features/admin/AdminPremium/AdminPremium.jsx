import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Diamond, Plus, Loader, ChevronLeft, ChevronRight } from 'lucide-react';
import { getPremiumStats, getPremiumPlans, addPremiumPlan } from './premiumApi';
import { AddPremiumModal } from './AddPremiumModal';

export function AdminPremium() {
  const [premiumStats, setPremiumStats] = useState(null);
  const [premiumPlans, setPremiumPlans] = useState([]);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async (page = 1) => {
    try {
      setIsLoading(true);
      const [statsResponse, plansResponse] = await Promise.all([
        getPremiumStats(),
        getPremiumPlans(page)
      ]);
      setPremiumStats(statsResponse.data);
      setPremiumPlans(plansResponse.data);
      setPagination(plansResponse.pagination);
    } catch (err) {
      setError('Failed to fetch premium data');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddPremium = async (formData) => {
    try {
      await addPremiumPlan(formData);
      setIsModalOpen(false);
      fetchData(1); // Refresh data after adding new plan
    } catch (err) {
      console.error('Failed to add premium plan', err);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.totalPages) {
      fetchData(page);
    }
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
      icon: TrendingUp,
      label: "New users",
      value: premiumStats?.newUsers || 0,
    },
    {
      icon: TrendingDown,
      label: "Declined users",
      value: premiumStats?.declinedUsers || 0,
    },
    {
      icon: Diamond,
      label: "Total premium users",
      value: premiumStats?.totalPremiumUsers || 0,
    },
  ];

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Premium</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add Premium</span>
          </button>
        </div>

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

        {/* Premium Plans Table */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Premium Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Premium Period</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Created At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {premiumPlans.map((plan) => (
                  <tr key={plan.id} className="hover:bg-gray-700">
                    <td className="px-6 py-4 text-sm text-white">₹{plan.amount}</td>
                    <td className="px-6 py-4 text-sm text-white">{plan.period}</td>
                    <td className="px-6 py-4 text-sm text-white">
                      {new Date(plan.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 bg-gray-900">
            <div className="text-sm text-gray-400">
              Page {pagination.currentPage}/{pagination.totalPages}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className="p-2 rounded-md bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              {[...Array(pagination.totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`w-8 h-8 rounded-md text-sm ${
                    pagination.currentPage === i + 1
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                className="p-2 rounded-md bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Add Premium Modal */}
        <AddPremiumModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddPremium}
        />
      </div>
    </div>
  );
}

