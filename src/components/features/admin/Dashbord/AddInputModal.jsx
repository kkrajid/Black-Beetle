import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createTrade } from '../../../../services/api';

export const AddInputModal = ({ isOpen, onClose, onSubmit,refetchTrades,refetchTradeCounts }) => {
  const [formData, setFormData] = useState({
    stock_index: '',
    company_name: '',
    segment: '',
    trade_type: '',
    buy: '',
    target: '',
    sl: '',
    bull_scenario: '',
    bear_scenario: '',
    status: '',
    prediction: '',
    actual: '',
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  // Mutation for creating a trade
  const createTradeMutation = useMutation({
    mutationFn: (data) => createTrade(data),
    onSuccess: (response) => {
      if (onSubmit) onSubmit(response);
      onClose();
      refetchTrades();
      refetchTradeCounts();
    },
    onError: (error) => {
      setSubmitError(error.message || 'Failed to create trade. Please try again.');
    },
  });

  const { isLoading } = createTradeMutation;

  // Validate form fields before submission
  const validateForm = () => {
    const newErrors = {};
    if (!formData.stock_index) newErrors.stock_index = ['Stock Index is required'];
    if (!formData.company_name) newErrors.company_name = ['Company Name is required'];
    if (!formData.segment) newErrors.segment = ['Segment is required'];
    if (!formData.trade_type) newErrors.trade_type = ['Trade Type is required'];
    if (!formData.buy) newErrors.buy = ['Buy Price is required'];
    if (!formData.target) newErrors.target = ['Target is required'];
    if (!formData.sl) newErrors.sl = ['Stop Loss is required'];
    if (!formData.status) newErrors.status = ['Status is required'];

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitError('');

    if (validateForm()) {
      createTradeMutation.mutate(formData);
    }
  };

  // Close the modal if not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-slate-900 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-800">
      <h2 className="text-2xl font-bold mb-4 text-slate-100">Add New Trade</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Error message for submission */}
        {submitError && (
          <div
            className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded relative"
            role="alert"
          >
            {submitError}
          </div>
        )}

        {/* Stock Index and Company Name */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="stock_index" className="block text-sm font-medium text-slate-300">
              Stock Index
            </label>
            <input
              type="text"
              id="stock_index"
              name="stock_index"
              value={formData.stock_index}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-slate-700 bg-slate-800 text-slate-100 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-500/20"
            />
            {errors.stock_index && (
              <p className="text-red-400 text-xs mt-1">{errors.stock_index[0]}</p>
            )}
          </div>
          <div>
            <label htmlFor="company_name" className="block text-sm font-medium text-slate-300">
              Company Name
            </label>
            <input
              type="text"
              id="company_name"
              name="company_name"
              value={formData.company_name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-slate-700 bg-slate-800 text-slate-100 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-500/20"
            />
            {errors.company_name && (
              <p className="text-red-400 text-xs mt-1">{errors.company_name[0]}</p>
            )}
          </div>
        </div>

        {/* Segment and Trade Type */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="segment" className="block text-sm font-medium text-slate-300">
              Segment
            </label>
            <select
              id="segment"
              name="segment"
              value={formData.segment}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-slate-700 bg-slate-800 text-slate-100 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-500/20"
            >
              <option value="">Select Segment</option>
              <option value="EQUITY">EQUITY</option>
              <option value="FUTURES">FUTURES</option>
              <option value="OPTIONS">OPTIONS</option>
              <option value="COMMODITY">COMMODITY</option>
              <option value="FOREX">FOREX</option>
            </select>
            {errors.segment && (
              <p className="text-red-400 text-xs mt-1">{errors.segment[0]}</p>
            )}
          </div>
          <div>
            <label htmlFor="trade_type" className="block text-sm font-medium text-slate-300">
              Trade Type
            </label>
            <select
              id="trade_type"
              name="trade_type"
              value={formData.trade_type}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-slate-700 bg-slate-800 text-slate-100 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-500/20"
            >
              <option value="">Select Trade Type</option>
              <option value="INTRADAY">INTRADAY</option>
              <option value="SHORT_TERM">SHORT TERM</option>
              <option value="LONG_TERM">LONG TERM</option>
              <option value="BTST">BTST</option>
              <option value="POSITIONAL">POSITIONAL</option>
            </select>
            {errors.trade_type && (
              <p className="text-red-400 text-xs mt-1">{errors.trade_type[0]}</p>
            )}
          </div>
        </div>

        {/* Price Inputs */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="buy" className="block text-sm font-medium text-slate-300">
              Buy Price
            </label>
            <input
              type="number"
              id="buy"
              name="buy"
              value={formData.buy}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-slate-700 bg-slate-800 text-slate-100 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-500/20"
            />
            {errors.buy && (
              <p className="text-red-400 text-xs mt-1">{errors.buy[0]}</p>
            )}
          </div>
          <div>
            <label htmlFor="target" className="block text-sm font-medium text-slate-300">
              Target
            </label>
            <input
              type="number"
              id="target"
              name="target"
              value={formData.target}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-slate-700 bg-slate-800 text-slate-100 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-500/20"
            />
            {errors.target && (
              <p className="text-red-400 text-xs mt-1">{errors.target[0]}</p>
            )}
          </div>
          <div>
            <label htmlFor="sl" className="block text-sm font-medium text-slate-300">
              Stop Loss
            </label>
            <input
              type="number"
              id="sl"
              name="sl"
              value={formData.sl}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-slate-700 bg-slate-800 text-slate-100 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-500/20"
            />
            {errors.sl && (
              <p className="text-red-400 text-xs mt-1">{errors.sl[0]}</p>
            )}
          </div>
        </div>

        {/* Scenarios */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="bull_scenario" className="block text-sm font-medium text-slate-300">
              Bull Scenario
            </label>
            <textarea
              id="bull_scenario"
              name="bull_scenario"
              value={formData.bull_scenario}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-slate-700 bg-slate-800 text-slate-100 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-500/20"
            />
          </div>
          <div>
            <label htmlFor="bear_scenario" className="block text-sm font-medium text-slate-300">
              Bear Scenario
            </label>
            <textarea
              id="bear_scenario"
              name="bear_scenario"
              value={formData.bear_scenario}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-slate-700 bg-slate-800 text-slate-100 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-500/20"
            />
          </div>
        </div>

        {/* Status */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-slate-300">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-slate-700 bg-slate-800 text-slate-100 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-500/20"
          >
            <option value="">Select Status</option>
            <option value="NEUTRAL">NEUTRAL</option>
            <option value="BULLISH">BULLISH</option>
            <option value="BEARISH">BEARISH</option>
          </select>
          {errors.status && (
            <p className="text-red-400 text-xs mt-1">{errors.status[0]}</p>
          )}
        </div>

        {/* Prediction and Actual */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="prediction" className="block text-sm font-medium text-slate-300">
              Prediction
            </label>
            <input
              type="number"
              id="prediction"
              name="prediction"
              value={formData.prediction}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-slate-700 bg-slate-800 text-slate-100 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-500/20"
            />
          </div>
          <div>
            <label htmlFor="actual" className="block text-sm font-medium text-slate-300">
              Actual
            </label>
            <input
              type="number"
              id="actual"
              name="actual"
              value={formData.actual}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-slate-700 bg-slate-800 text-slate-100 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-500/20"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-slate-600 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-amber-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-slate-900 bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-amber-500"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default AddInputModal;
