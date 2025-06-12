import React from "react";
import { Filter, ArrowUpDown, Search } from "lucide-react";

const FilterSort = ({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  totalArticles,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-600" />
          <span className="text-gray-700 font-medium">
            {totalArticles} articles found
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Filter by keyword..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 w-full sm:w-64"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          <div className="flex items-center space-x-2">
            <ArrowUpDown className="h-4 w-4 text-gray-600" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="relevance">Sort by Relevance</option>
              <option value="date">Sort by Date</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSort;
