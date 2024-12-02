import React, { useState, useMemo, useEffect } from 'react';
import { 
  useReactTable, 
  getCoreRowModel, 
  getSortedRowModel, 
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { Accessibility, Package, Diamond, Plus, Loader, ChevronDown, ChevronUp } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {EditTradeHistoryModal } from './EditTradeHistoryModal';
import AddInputModal from './AddInputModal';

import { getTrades, getTradeCounts, updateTradeHistory, createTrade } from '../../../../services/api';


export function AdminDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrade, setEditingTrade] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const queryClient = useQueryClient();

  const { data: tradesData, error: tradesError, isLoading: tradesLoading } = useQuery({
    queryKey: ['getTrades'],
    queryFn: getTrades,
  });

  const { data: dashboardStatsData, error: dashboardStatsError, isLoading: dashboardStatsLoading } = useQuery({
    queryKey: ['getTradeCounts'],
    queryFn: getTradeCounts,
  });


  
 
  

  const updateTradeMutation = useMutation({
    mutationFn: ({ id, data }) => updateTradeHistory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries('getTrades');
      setIsEditModalOpen(false);
      setEditingTrade(null);
    },
  });

  const createTradeMutation = useMutation({
    mutationFn: createTrade,
    onSuccess: () => {
      queryClient.invalidateQueries('getTrades');
      setIsModalOpen(false);
    },
  });

  const columnHelper = createColumnHelper();

  const columns = useMemo(() => [
    columnHelper.accessor('stock_index', { header: 'Stock/Index', cell: info => info.getValue() }),
    columnHelper.accessor('company_name', { header: 'Company', cell: info => info.getValue() }),
    columnHelper.accessor('segment', { header: 'Segment', cell: info => info.getValue() }),
    columnHelper.accessor('trade_type', { header: 'Trade Type', cell: info => info.getValue() }),
    columnHelper.accessor('buy', { header: 'Buy Price', cell: info => info.getValue() }),
    columnHelper.accessor('target', { header: 'Target', cell: info => info.getValue() }),
    columnHelper.accessor('sl', { header: 'Stop Loss', cell: info => info.getValue() }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: info => {
        const status = info.getValue();
        return (
          <span className={`px-2 py-1 rounded-full text-xs ${
            status === 'BULLISH' ? 'bg-green-600 text-white' :
            status === 'BEARISH' ? 'bg-red-600 text-white' : 'bg-gray-600 text-white'
          }`}>
            {status}
          </span>
        );
      },
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: info => {
        const trade = info.row.original;
        return (
          <button 
            onClick={() => handleEdit(trade)} 
            className="text-yellow-500 hover:text-yellow-400 mr-2"
          >
            Edit
          </button>
        );
      },
    }),
  ], []);

  const table = useReactTable({
    data: tradesData?.data || [],
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleEdit = (trade) => {
    setEditingTrade(trade);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (id, updatedData) => {
    updateTradeMutation.mutate({ id, data: updatedData });
  };

  const handleAddInput = (formData) => {
    createTradeMutation.mutate(formData);
  };

  const metrics = [
    { icon: Accessibility, label: "Daily Calls", value: dashboardStatsData?.data?.daily_trade_count || "0" },
    { icon: Package, label: "Monthly Calls", value: dashboardStatsData?.data?.monthly_trade_count || "0" },
    { icon: Diamond, label: "Expired Calls", value: dashboardStatsData?.data?.expired_trades || "0" },
  ];

  return (
    <div className="p-2 sm:p-4 md:p-6 bg-gray-900 min-h-screen">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 md:mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-3 sm:p-4 md:p-6 text-center">
            <div className="flex justify-center mb-2 sm:mb-3 md:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full border-2 border-yellow-500 flex items-center justify-center">
                <metric.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-yellow-500" />
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-white mb-1 sm:mb-2 md:mb-3">{metric.value}</h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-400">{metric.label}</p>
          </div>
        ))}
      </div>

      <AddInputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddInput}
      />

      <input
        type="text"
        placeholder="Search..."
        className="w-full sm:w-1/2 lg:w-1/3 p-2 px-10 mb-4 rounded-lg bg-gray-800 text-white"
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />

      <button onClick={() => setIsModalOpen(true)} className="bg-green-500 text-white px-6 py-2 rounded-lg mb-4 ml-4">Add New Trade</button>

      {tradesLoading ? (
        <div className="flex justify-center items-center space-x-2">
          <Loader className="w-6 h-6 text-white animate-spin" />
          <span className="text-white">Loading...</span>
        </div>
      ) : tradesError ? (
        <p className="text-red-500">{tradesError.message}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className="px-4 py-2 text-left text-sm text-gray-400">
                      {header.isPlaceholder ? null : (
                        <div className="flex items-center space-x-2">
                          <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                          <button onClick={header.column.getToggleSortingHandler()}>
                            {header.column.getIsSorted() === 'asc' ? (
                              <ChevronUp className="w-4 h-4 text-gray-400" />
                            ) : header.column.getIsSorted() === 'desc' ? (
                              <ChevronDown className="w-4 h-4 text-gray-400" />
                            ) : null}
                          </button>
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="hover:bg-gray-800">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-4 py-2 text-sm text-white">{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-4">
            <div>
              <button
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                className="px-3 py-1 bg-gray-800 text-white rounded-md hover:bg-gray-700 disabled:opacity-50"
              >
                {'<<'}
              </button>
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="px-3 py-1 bg-gray-800 text-white rounded-md hover:bg-gray-700 disabled:opacity-50"
              >
                {'<'}
              </button>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="px-3 py-1 bg-gray-800 text-white rounded-md hover:bg-gray-700 disabled:opacity-50"
              >
                {'>'}
              </button>
              <button
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
                className="px-3 py-1 bg-gray-800 text-white rounded-md hover:bg-gray-700 disabled:opacity-50"
              >
                {'>>'}
              </button>
            </div>
            <div className="text-sm text-gray-400">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </div>
          </div>
        </div>
      )}

      {editingTrade && (
        <EditTradeHistoryModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveEdit}
          trade={editingTrade}
        />
      )}
    </div>
  );
}

