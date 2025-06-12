import React from "react";
import { Search } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
          <div>
            <h1 className="text-2xl font-semibold"> Devv's News Harvester</h1>
            <p className="text-sm text-gray-300">
              Ethical Web Scraping Platform
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-300">
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">Discover news from any source</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
