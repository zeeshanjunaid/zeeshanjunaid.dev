"use client";

import { useState } from 'react';
import { ChevronUp, ChevronDown, Search } from 'lucide-react';

interface TableProps {
  children: React.ReactNode;
  sortable?: boolean;
  searchable?: boolean;
  striped?: boolean;
}

interface TableData {
  headers: string[];
  rows: string[][];
}

export function EnhancedTable({ children, sortable = false, searchable = false, striped = true }: TableProps) {
  const [sortColumn, setSortColumn] = useState<number | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');

  // Extract table data from children (simplified - in real use you'd parse the JSX)
  const parseTableData = (): TableData => {
    // This is a simplified parser - in practice you'd need more robust JSX parsing
    return {
      headers: ['Column 1', 'Column 2', 'Column 3'],
      rows: [
        ['Data 1', 'Data 2', 'Data 3'],
        ['Data 4', 'Data 5', 'Data 6'],
      ]
    };
  };

  const data = parseTableData();

  const handleSort = (columnIndex: number) => {
    if (sortColumn === columnIndex) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnIndex);
      setSortDirection('asc');
    }
  };

  const filteredRows = data.rows.filter(row =>
    searchTerm === '' || row.some(cell => 
      cell.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedRows = sortable && sortColumn !== null
    ? [...filteredRows].sort((a, b) => {
        const aVal = a[sortColumn];
        const bVal = b[sortColumn];
        const comparison = aVal.localeCompare(bVal);
        return sortDirection === 'asc' ? comparison : -comparison;
      })
    : filteredRows;

  return (
    <div className="enhanced-table my-8">
      {searchable && (
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-dark/50 dark:text-light/50" />
            <input
              type="text"
              placeholder="Search table..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-light dark:bg-dark border border-lightBorderColor dark:border-darkBorderColor rounded-xl text-dark dark:text-light placeholder-dark/50 dark:placeholder-light/50 focus:outline-none focus:ring-2 focus:ring-purple/20 focus:border-purple/50 transition-all"
            />
          </div>
        </div>
      )}
      
      <div className="overflow-x-auto rounded-xl border border-lightBorderColor dark:border-darkBorderColor">
        <table className="w-full">
          <thead className="bg-light dark:bg-dark border-b border-lightBorderColor dark:border-darkBorderColor">
            <tr>
              {data.headers.map((header, index) => (
                <th
                  key={index}
                  className={`px-6 py-4 text-left font-switzer font-bold text-dark dark:text-light ${
                    sortable ? 'cursor-pointer hover:bg-purple/5 transition-colors' : ''
                  }`}
                  onClick={sortable ? () => handleSort(index) : undefined}
                >
                  <div className="flex items-center gap-2">
                    {header}
                    {sortable && (
                      <div className="flex flex-col">
                        <ChevronUp 
                          className={`w-3 h-3 ${
                            sortColumn === index && sortDirection === 'asc' 
                              ? 'text-purple' 
                              : 'text-dark/30 dark:text-light/30'
                          }`} 
                        />
                        <ChevronDown 
                          className={`w-3 h-3 -mt-1 ${
                            sortColumn === index && sortDirection === 'desc' 
                              ? 'text-purple' 
                              : 'text-dark/30 dark:text-light/30'
                          }`} 
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`border-b border-lightBorderColor dark:border-darkBorderColor last:border-b-0 hover:bg-purple/5 transition-colors ${
                  striped && rowIndex % 2 === 1 ? 'bg-light/50 dark:bg-dark/50' : ''
                }`}
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-6 py-4 text-dark/90 dark:text-light/90 font-switzer"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {searchable && sortedRows.length === 0 && (
        <div className="text-center py-8 text-dark/60 dark:text-light/60 font-switzer">
          No results found for "{searchTerm}"
        </div>
      )}
    </div>
  );
}

// Simple table for regular markdown tables
export function SimpleTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="simple-table my-4 sm:my-6 overflow-x-auto rounded-xl border border-lightBorderColor dark:border-darkBorderColor shadow-sm">
      <div className="min-w-full">
        <table className="w-full bg-light dark:bg-dark">
          {children}
        </table>
      </div>
    </div>
  );
}