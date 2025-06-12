import { useState, useMemo } from "react";

export const UseScraper = () => {
  const [rawArticles, setRawArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("relevance");

  const CalculateRelevanceScore = (article, term) => {
    if (!term.trim()) return Math.random();
    const termLower = term.toLowerCase();
    let score = 0;
    if (article.headline.toLowerCase().includes(termLower)) score += 10;
    if (article.summary.toLowerCase().includes(termLower)) score += 5;
    if (article.author.toLowerCase().includes(termLower)) score += 3;
    if (article.source.toLowerCase().includes(termLower)) score += 2;
    return score;
  };

  const ScrapeArticles = async (url) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Failed to scrape articles");
      setRawArticles(data.articles || []);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      setRawArticles([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredArticles = useMemo(() => {
    let filtered = rawArticles;

    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.headline.toLowerCase().includes(searchLower) ||
          a.author.toLowerCase().includes(searchLower) ||
          a.summary.toLowerCase().includes(searchLower) ||
          a.source.toLowerCase().includes(searchLower),
      );
    }

    if (sortBy === "date") {
      filtered = [...filtered].sort(
        (a, b) => new Date(b.date) - new Date(a.date),
      );
    } else {
      filtered = [...filtered].sort(
        (a, b) =>
          CalculateRelevanceScore(b, searchTerm) -
          CalculateRelevanceScore(a, searchTerm),
      );
    }

    return filtered;
  }, [rawArticles, searchTerm, sortBy]);

  return {
    articles: filteredArticles,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    ScrapeArticles,
    setError,
    hasArticles: rawArticles.length > 0,
    hasSearchResults: filteredArticles.length > 0,
  };
};
