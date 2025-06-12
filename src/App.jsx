import React from "react";
import Header from "./components/Header";
import UrlInput from "./components/UserInput";
import FilterSort from "./components/FilterSort";
import ArticleGrid from "./components/ArticleGrid";
import EthicsSection from "./components/EthicsSection";
import Footer from "./components/Footer";
import { UseScraper } from "./hooks/UseScraper";
import { AlertCircle, CheckCircle } from "lucide-react";

function App() {
  const {
    articles,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    ScrapeArticles,
    setError,
  } = UseScraper();

  const handleScrape = async (url) => {
    await ScrapeArticles(url);
  };

  const dismissError = () => {
    setError(null);
  };

  const filteredArticles = articles.filter((article) =>
    article.headline?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-red-800 font-semibold">Scraping Error</h3>
                <p className="text-red-700 text-sm mt-1">{error}</p>
                <p className="text-red-600 text-xs mt-2">
                  This could be due to CORS restrictions, website blocking, or
                  network issues. Try a different news website or check if the
                  site allows scraping.
                </p>
                <button
                  onClick={dismissError}
                  className="mt-3 text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {articles.length > 0 && !isLoading && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <h3 className="text-green-800 font-semibold">
                  Scraping Successful!
                </h3>
                <p className="text-green-700 text-sm">
                  Found {articles.length} articles. Use the filters below to
                  refine your search.
                </p>
              </div>
            </div>
          </div>
        )}

        <UrlInput onScrape={handleScrape} isLoading={isLoading} />

        <EthicsSection />

        {(articles.length > 0 || isLoading || searchTerm.trim()) && (
          <>
            <FilterSort
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              sortBy={sortBy}
              onSortChange={setSortBy}
              totalArticles={articles.length}
            />

            <ArticleGrid
              articles={filteredArticles}
              isLoading={isLoading}
              searchTerm={searchTerm}
              hasArticles={articles.length > 0}
            />
          </>
        )}

        {/* Initial State */}
        {articles.length === 0 && !isLoading && !error && (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-2xl mx-auto">
              <div className="bg-gradient-to-r from-orange-100 to-blue-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <div className="text-3xl">📰</div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Welcome to NewsHarvester
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Enter any news website URL above to extract and display article
                metadata. Our ethical scraping engine will analyze the page
                structure and present articles in a clean, organized format.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-500">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Fast Extraction</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Ethical Practices</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Clean Results</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
