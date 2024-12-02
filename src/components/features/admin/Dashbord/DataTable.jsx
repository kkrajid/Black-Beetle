import React, { useState, useMemo } from 'react';
import { useTable, usePagination } from 'react-table';

const DataTable = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter data based on search query
  const filteredData = useMemo(() => {
    return data.filter(item => 
      Object.values(item).some(value => 
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [data, searchQuery]);

  // Table columns definition
  const columns = useMemo(() => [
    {
      Header: 'Stock Index',
      accessor: 'stock_index', // Change these to your data keys
    },
    {
      Header: 'Company Name',
      accessor: 'company_name',
    },
    {
      Header: 'Segment',
      accessor: 'segment',
    },
    {
      Header: 'Trade Type',
      accessor: 'trade_type',
    },
    {
      Header: 'Buy Price',
      accessor: 'buy',
    },
    // Add other columns as needed
  ], []);

  // Use the table hook
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: {
        pageSize: 10, // Set page size to 10
      },
    },
    usePagination // Hook for pagination
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="overflow-x-auto bg-slate-800 text-slate-100 rounded-lg shadow-lg">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 rounded-md border border-slate-700 bg-slate-800 text-slate-100 focus:ring-amber-500 focus:border-amber-500"
        />
      </div>
      <table {...getTableProps()} className="min-w-full table-auto">
        <thead className="bg-slate-900 text-sm font-medium">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps()}
                  className="px-6 py-3 text-left text-slate-400"
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="border-b border-slate-700">
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} className="px-6 py-4">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        {/* Pagination Controls */}
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="px-4 py-2 bg-amber-500 text-slate-100 rounded-md hover:bg-amber-600"
        >
          Previous
        </button>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="px-4 py-2 bg-amber-500 text-slate-100 rounded-md hover:bg-amber-600"
        >
          Next
        </button>
        <span className="text-slate-400">
          Page {pageIndex + 1} of {pageCount}
        </span>
      </div>
    </div>
  );
};

export default DataTable;
