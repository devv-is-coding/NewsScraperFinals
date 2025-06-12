import { useState, useMemo } from 'react';

export const UseScraper = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('relevance'); // 'date' or 'relevance'

  // Relevance scoring function
  const CalculateRelevanceScore = (article, term) => {
    if (!term.trim()) return Math.random(); // Random order if no search term

    const termLower = term.toLowerCase();
    let score = 0;

    if (article.headline.toLowerCase().includes(termLower)) {
      score += 10;
    }
    if (article.summary.toLowerCase().includes(termLower)) {
      score += 5;
    }
    if (article.author.toLowerCase().includes(termLower)) {
      score += 3;
    }
    if (article.source.toLowerCase().includes(termLower)) {
      score += 2;
    }

    return score;
  };

  const ScrapeArticles = async (url) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to scrape articles');
      }

      setArticles(data.articles || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      setArticles([]);
    } finally {
      setIsLoading(false);
    }
  };

  const FilteredAndSortedArticles = useMemo(() => {
    let filtered = articles;

    // Filter by search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = articles.filter(
        (article) =>
          article.headline.toLowerCase().includes(searchLower) ||
          article.author.toLowerCase().includes(searchLower) ||
          article.summary.toLowerCase().includes(searchLower) ||
          article.source.toLowerCase().includes(searchLower)
      );
    }

    // Sort articles
    if (sortBy === 'date') {
      filtered = [...filtered].sort((a, b) => {
        const dateA = new Date(a.timestamp || a.date);
        const dateB = new Date(b.timestamp || b.date);
        return dateB - dateA;
      });
    } else {
      filtered = [...filtered].sort((a, b) => {
        const scoreA = CalculateRelevanceScore(a, searchTerm);
        const scoreB = CalculateRelevanceScore(b, searchTerm);
        return scoreB - scoreA;
      });
    }

    return filtered;
  }, [articles, searchTerm, sortBy]);

  return {
    articles: FilteredAndSortedArticles,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    ScrapeArticles,
    setError,
  };
};
