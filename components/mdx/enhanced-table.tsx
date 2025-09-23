"use client";

import { ChevronDown, ChevronUp, Search } from "lucide-react";

import { useState } from "react";

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

export function EnhancedTable({
  children,
  sortable = false,
  searchable = false,
  striped = true,
}: TableProps) {
  const [sortColumn, setSortColumn] = useState<number | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");

  // Extract table data from children (simplified - in real use you'd parse the JSX)
  const parseTableData = (): TableData => {
    // This is a simplified parser - in practice you'd need more robust JSX parsing
    return {
      headers: ["Column 1", "Column 2", "Column 3"],
      rows: [
        ["Data 1", "Data 2", "Data 3"],
        ["Data 4", "Data 5", "Data 6"],
      ],
    };
  };

  const data = parseTableData();

  const handleSort = (columnIndex: number) => {
    if (sortColumn === columnIndex) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnIndex);
      setSortDirection("asc");
    }
  };

  const filteredRows = data.rows.filter(
    (row) =>
      searchTerm === "" ||
      row.some((cell) => cell.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedRows =
    sortable && sortColumn !== null
      ? [...filteredRows].sort((a, b) => {
          const aVal = a[sortColumn];
          const bVal = b[sortColumn];
          const comparison = aVal.localeCompare(bVal);
          return sortDirection === "asc" ? comparison : -comparison;
        })
      : filteredRows;

  return (
    <div className="enhanced-table my-8">
      {searchable && (
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
            <input
              type="text"
              placeholder="Search table..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple/20 focus:border-purple/50 transition-all"
            />
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
        <table className="w-full">
          <thead className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            <tr>
              {data.headers.map((header, index) => (
                <th
                  key={index}
                  className={`px-6 py-4 text-left font-switzer font-bold text-gray-900 dark:text-white ${
                    sortable
                      ? "cursor-pointer hover:bg-purple/5 transition-colors"
                      : ""
                  }`}
                  onClick={sortable ? () => handleSort(index) : undefined}
                >
                  <div className="flex items-center gap-2">
                    {header}
                    {sortable && (
                      <div className="flex flex-col">
                        <ChevronUp
                          className={`w-3 h-3 ${
                            sortColumn === index && sortDirection === "asc"
                              ? "text-purple"
                              : "text-dark/30 dark:text-light/30"
                          }`}
                        />
                        <ChevronDown
                          className={`w-3 h-3 -mt-1 ${
                            sortColumn === index && sortDirection === "desc"
                              ? "text-purple"
                              : "text-dark/30 dark:text-light/30"
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
                className={`border-b border-gray-200 dark:border-gray-700 last:border-b-0 hover:bg-purple/5 transition-colors ${
                  striped && rowIndex % 2 === 1
                    ? "bg-light/50 dark:bg-dark/50"
                    : ""
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
          No results found for &quot;{searchTerm}&quot;
        </div>
      )}
    </div>
  );
}

// Simple table for regular markdown tables
export function SimpleTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="simple-table my-6 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-900">
      <div className="w-full">
        <table className="w-full border-collapse">{children}</table>
      </div>
      <style jsx global>{`
        .simple-table table thead tr th {
          padding: 1rem 1.5rem;
          text-align: left;
          font-family: var(--font-switzer);
          font-weight: 700;
          color: #1d1d1f;
          background: linear-gradient(
            135deg,
            rgba(163, 116, 255, 0.1) 0%,
            transparent 100%
          );
          border-bottom: 1px solid rgba(163, 116, 255, 0.2);
          font-size: 0.875rem;
          letter-spacing: 0.025em;
        }

        .dark .simple-table table thead tr th {
          color: #fafaf6;
          border-bottom: 1px solid rgba(163, 116, 255, 0.3);
        }

        .simple-table table tbody tr td {
          padding: 0.875rem 1.5rem;
          font-family: var(--font-switzer);
          border-bottom: 1px solid rgba(163, 116, 255, 0.1);
          color: rgba(29, 29, 31, 0.9);
          transition: background-color 0.2s ease;
          font-size: 0.875rem;
        }

        .dark .simple-table table tbody tr td {
          color: rgba(250, 250, 246, 0.9);
          border-bottom: 1px solid rgba(163, 116, 255, 0.15);
        }

        .simple-table table tbody tr:hover td {
          background-color: rgba(163, 116, 255, 0.05);
        }

        .dark .simple-table table tbody tr:hover td {
          background-color: rgba(163, 116, 255, 0.1);
        }

        .simple-table table tbody tr:nth-child(even) td {
          background-color: rgba(163, 116, 255, 0.02);
        }

        .dark .simple-table table tbody tr:nth-child(even) td {
          background-color: rgba(163, 116, 255, 0.05);
        }

        .simple-table table tbody tr:last-child td {
          border-bottom: none;
        }

        .simple-table table td:first-child,
        .simple-table table th:first-child {
          border-top-left-radius: 0.75rem;
          border-bottom-left-radius: 0.75rem;
        }

        .simple-table table td:last-child,
        .simple-table table th:last-child {
          border-top-right-radius: 0.75rem;
          border-bottom-right-radius: 0.75rem;
        }
      `}</style>
    </div>
  );
}
