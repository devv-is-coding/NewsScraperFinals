import React, { useState } from "react";
import {
  Shield,
  AlertTriangle,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const EthicsSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gradient-to-r from-orange-50 to-blue-50 rounded-xl border border-orange-200 mb-8">
      <div
        className="p-6 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="h-6 w-6 text-orange-600" />
            <h2 className="text-xl font-semibold text-gray-800">
              Ethical Scraping Guidelines
            </h2>
          </div>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-600" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-600" />
          )}
        </div>
        {!isExpanded && (
          <p className="text-gray-600 mt-2">
            Learn about responsible and legal web scraping practices
          </p>
        )}
      </div>

      {isExpanded && (
        <div className="px-6 pb-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-5 shadow-sm">
              <div className="flex items-center space-x-2 mb-3">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-gray-800">
                  Legal Considerations
                </h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Always check robots.txt files before scraping</li>
                <li>• Respect website terms of service</li>
                <li>• Consider copyright and data protection laws</li>
                <li>• Use publicly available data only</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-5 shadow-sm">
              <div className="flex items-center space-x-2 mb-3">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <h3 className="font-semibold text-gray-800">Best Practices</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Implement rate limiting to avoid overloading servers</li>
                <li>• Use appropriate User-Agent headers</li>
                <li>• Cache responses to minimize requests</li>
                <li>• Consider using official APIs when available</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-800 mb-1">
                  Important Notice
                </h4>
                <p className="text-sm text-yellow-700">
                  This tool is for educational and research purposes. Always
                  ensure you have permission to scrape content and comply with
                  applicable laws and website policies. Consider using RSS
                  feeds, APIs, or other official data sources when available.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-5 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-3">
              Recommended Alternatives
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                • <strong>RSS Feeds:</strong> Most news sites provide RSS feeds
                for their content
              </p>
              <p>
                • <strong>News APIs:</strong> Services like NewsAPI, Guardian
                API, or NYTimes API
              </p>
              <p>
                • <strong>Data Partnerships:</strong> Contact websites directly
                for data access
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EthicsSection;
