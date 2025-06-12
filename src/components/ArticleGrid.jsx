import React from "react";
import ArticleCard from "./ArticleCard";
import { FileX } from "lucide-react";

const ArticleGrid = ({ articles, isLoading, searchTerm, hasArticles }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse"
          >
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
                <div className="w-20 h-4 bg-gray-300 rounded"></div>
              </div>
              <div className="space-y-3">
                <div className="w-full h-4 bg-gray-300 rounded"></div>
                <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
                <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between">
                  <div className="w-16 h-3 bg-gray-300 rounded"></div>
                  <div className="w-20 h-3 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
          <FileX className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          {searchTerm && hasArticles
            ? `No articles matched "${searchTerm}"`
            : "No Articles Found"}
        </h3>
        <p className="text-gray-500 max-w-md mx-auto">
          {searchTerm && hasArticles
            ? "Try refining your search or checking for typos."
            : "Try entering a different news website URL or adjust your search filters."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <ArticleCard key={article.id || article.link} article={article} />
      ))}
    </div>
  );
};

export default ArticleGrid;
