import React from 'react';
import { Moon, Sun } from 'lucide-react';

const Navbar = ({ isDark, toggleTheme }) => {
  return (
    <nav className="w-full glass sticky top-0 z-40 border-b border-white/20 dark:border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-red-500 to-red-400 rounded-full flex items-center justify-center shadow-lg shadow-red-500/30">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight font-outfit bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300">
              Pokédex
            </h1>
          </div>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-3 rounded-full glass-card hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors"
            aria-label="Toggle Dark Mode"
          >
            {isDark ? <Sun className="text-yellow-400" size={22} /> : <Moon className="text-slate-700" size={22} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
