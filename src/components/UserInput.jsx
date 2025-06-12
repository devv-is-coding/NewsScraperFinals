import React, { useState } from 'react';
import { Search, Globe, AlertCircle } from 'lucide-react';

const UrlInput = ({ onScrape, isLoading }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const popularSites = [
    { name: 'BBC News', url: 'https://www.bbc.com/news' },
    { name: 'CNN', url: 'https://www.cnn.com' },
    { name: 'Reuters', url: 'https://www.reuters.com' },
    { name: 'The Guardian', url: 'https://www.theguardian.com' }
  ];

  const validateUrl = (inputUrl) => {
    try {
      new URL(inputUrl);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    const formattedUrl = url.startsWith('http') ? url : `https://${url}`;

    if (!validateUrl(formattedUrl)) {
      setError('Please enter a valid URL');
      return;
    }

    onScrape(formattedUrl);
  };

  const handleQuickScrape = (siteUrl) => {
    setUrl(siteUrl);
    setError('');
    onScrape(siteUrl);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex items-center space-x-3 mb-4">
        <Globe className="h-6 w-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-800">Enter News Website URL</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="https://example-news-site.com"
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            disabled={isLoading}
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>

        {error && (
          <div className="flex items-center space-x-2 text-red-600 text-sm">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <span className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              <span>Scraping Articles...</span>
            </span>
          ) : (
            'Scrape Articles'
          )}
        </button>
      </form>

      <div className="mt-6">
        <p className="text-sm text-gray-600 mb-3">Quick start with popular news sites:</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {popularSites.map(site => (
            <button
              key={site.name}
              onClick={() => handleQuickScrape(site.url)}
              disabled={isLoading}
              className="text-xs bg-gray-100 hover:bg-orange-100 text-gray-700 hover:text-orange-700 py-2 px-3 rounded-lg transition-colors duration-200 disabled:opacity-50"
            >
              {site.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UrlInput;
