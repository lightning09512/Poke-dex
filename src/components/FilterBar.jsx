import React from 'react';
import { Search } from 'lucide-react';
import { capitalize, TYPE_COLORS } from '../utils/typeHelpers';

const FilterBar = ({ searchQuery, onSearchChange, selectedType, onTypeChange }) => {
  const types = ['all', ...Object.keys(TYPE_COLORS)];

  return (
    <div className="w-full max-w-5xl mx-auto my-8 px-4 flex flex-col md:flex-row gap-6 items-center justify-between">
      
      {/* Search Input */}
      <div className="relative w-full md:w-1/2 group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
          <Search size={20} />
        </div>
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search Pokemon by name or ID..."
          className="w-full pl-12 pr-4 py-4 rounded-2xl glass-card focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 shadow-lg transition-all"
        />
      </div>

      {/* Type Filter Carousel */}
      <div className="w-full md:w-1/2 flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x">
        {types.map(type => (
          <button
            key={type}
            onClick={() => onTypeChange(type)}
            className={`snap-center shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
              selectedType === type 
                ? 'bg-slate-800 text-white dark:bg-white dark:text-slate-900 shadow-lg scale-105' 
                : 'glass-card text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            {capitalize(type)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
