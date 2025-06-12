import React from 'react';
import { Newspaper, Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-orange-400 p-2 rounded-lg">
              <Newspaper className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">NewsHarvester</h1>
              <p className="text-sm text-gray-300">Ethical Web Scraping Platform</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-2 text-sm text-gray-300">
            <Search className="h-4 w-4" />
            <span>Discover news from any source</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
