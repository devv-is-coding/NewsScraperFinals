import express from 'express';
import cors from 'cors';
import * as cheerio from 'cheerio';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Helper function to normalize URLs
const normalizeUrl = (url, baseUrl) => {
  try {
    return new URL(url, baseUrl).href;
  } catch {
    return url;
  }
};

// Helper function to extract domain from URL
const getDomain = (url) => {
  try {
    return new URL(url).hostname;
  } catch {
    return 'Unknown Source';
  }
};

// Helper function to clean text
const cleanText = (text) => {
  return text ? text.trim().replace(/\s+/g, ' ') : '';
};

// Enhanced scraping function
const scrapeArticles = async (url) => {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const articles = [];
    const domain = getDomain(url);

    // Common article selectors for major news sites
    const selectors = [
      'article',
      '.article',
      '.post',
      '.story',
      '.news-item',
      '[class*="article"]',
      '[class*="story"]',
      '[class*="post"]'
    ];

    let foundArticles = false;

    // Try each selector until we find articles
    for (const selector of selectors) {
      const elements = $(selector);
      if (elements.length > 0) {
        elements.each((i, element) => {
          if (articles.length >= 20) return false; // Limit to 20 articles

          const $article = $(element);
          
          // Extract headline
          const headline = cleanText(
            $article.find('h1, h2, h3, .headline, .title, [class*="title"], [class*="headline"]').first().text() ||
            $article.find('a').first().text()
          );

          // Extract link
          let link = $article.find('a').first().attr('href') || '';
          if (link) {
            link = normalizeUrl(link, url);
          }

          // Extract author
          const author = cleanText(
            $article.find('.author, .byline, [class*="author"], [class*="byline"]').first().text() ||
            $article.find('[rel="author"]').first().text()
          );

          // Extract date
          const dateElement = $article.find('time, .date, .published, [class*="date"], [class*="time"]').first();
          let date = cleanText(dateElement.text() || dateElement.attr('datetime') || '');

          // Extract summary/description
          const summary = cleanText(
            $article.find('p, .summary, .excerpt, [class*="summary"], [class*="excerpt"]').first().text()
          );

          if (headline && headline.length > 10) {
            articles.push({
              id: `${Date.now()}-${i}`,
              headline,
              author: author || 'Unknown Author',
              date: date || 'Date not available',
              source: domain,
              link: link || url,
              summary: summary.length > 200 ? summary.substring(0, 200) + '...' : summary,
              timestamp: new Date().toISOString()
            });
            foundArticles = true;
          }
        });
        
        if (foundArticles) break;
      }
    }

    // Fallback: try to extract headlines from any links that look like articles
    if (articles.length === 0) {
      $('a').each((i, element) => {
        if (articles.length >= 10) return false;

        const $link = $(element);
        const text = cleanText($link.text());
        const href = $link.attr('href');

        if (text && text.length > 20 && text.length < 200 && href) {
          articles.push({
            id: `${Date.now()}-${i}`,
            headline: text,
            author: 'Unknown Author',
            date: 'Date not available',
            source: domain,
            link: normalizeUrl(href, url),
            summary: '',
            timestamp: new Date().toISOString()
          });
        }
      });
    }

    return articles;
  } catch (error) {
    console.error('Scraping error:', error);
    throw error;
  }
};

// API endpoint to scrape articles
app.post('/api/scrape', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const articles = await scrapeArticles(url);
    res.json({ 
      success: true, 
      articles, 
      scrapedUrl: url,
      scrapedAt: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to scrape articles', 
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 News Scraper Server running on http://localhost:${PORT}`);
});