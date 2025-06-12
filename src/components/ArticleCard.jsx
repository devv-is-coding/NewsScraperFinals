import React from 'react';
import { ExternalLink, User, Calendar, Globe } from 'lucide-react';

const ArticleCard = ({ article }) => {
  const handleLinkClick = (e) => {
    e.preventDefault();
    window.open(article.link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Globe className="h-4 w-4" />
            <span className="font-medium text-blue-600">{article.source}</span>
          </div>
          <button
            onClick={handleLinkClick}
            className="text-gray-400 hover:text-blue-600 transition-colors duration-200 p-1 hover:bg-blue-50 rounded"
            title="Open article in new tab"
          >
            <ExternalLink className="h-4 w-4" />
          </button>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-3 leading-tight hover:text-blue-700 transition-colors duration-200">
          <a
            href={article.link}
            onClick={handleLinkClick}
            className="hover:underline"
          >
            {article.headline}
          </a>
        </h3>

        {article.summary && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
            {article.summary}
          </p>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <User className="h-3 w-3" />
            <span>{article.author}</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <Calendar className="h-3 w-3" />
            <span>{article.date}</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-50 to-blue-50 px-6 py-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Click to read full article</span>
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
