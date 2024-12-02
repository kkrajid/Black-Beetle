import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTrade } from '../../../';

export const AddInputModal = ({ isOpen, onClose, onSubmit }) => {
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
    actual: ''
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createTrade,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['trades'] });
      onSubmit(data);
      onClose();
    },
    onError: (error) => {
      if (error.response?.data) {
        setErrors(error.response.data);
        setSubmitError('Please correct the errors before submitting.');
      } else {
        setSubmitError('An error occurred while submitting the form.');
      }
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));

    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError(null);
    mutation.mutate(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Add New Trade</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {submitError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              {submitError}
            </div>
          )}

          {/* Form fields */}
          {/* ... (keep the existing form fields) ... */}

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
