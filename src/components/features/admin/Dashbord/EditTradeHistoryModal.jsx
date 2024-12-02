import React, { useState } from 'react';

export function EditTradeHistoryModal({ isOpen, onClose, onSave, trade }) {
  const [buy, setBuy] = useState(trade.buy);
  const [target, setTarget] = useState(trade.target);
  const [sl, setSl] = useState(trade.sl);

  const handleSave = () => {
    onSave(trade.id, { buy, target, sl });
    onClose();
  };

  const handelCancel = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Trade History</h2>
        <div className="mb-4">
          <label htmlFor="buy" className="block text-sm font-medium text-gray-700 mb-1">
            Buy
          </label>
          <input
            id="buy"
            type="number"
            value={buy}
            onChange={(e) => setBuy(parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="target" className="block text-sm font-medium text-gray-700 mb-1">
            Target
          </label>
          <input
            id="target"
            type="number"
            value={target}
            onChange={(e) => setTarget(parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="sl" className="block text-sm font-medium text-gray-700 mb-1">
            Stop Loss
          </label>
          <input
            id="sl"
            type="number"
            value={sl}
            onChange={(e) => setSl(parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handelCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md mr-2 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}
