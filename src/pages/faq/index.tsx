import React, { useState } from "react";
import Head from "next/head";
import { FiSearch, FiChevronDown, FiChevronUp } from "react-icons/fi";
import faqs from "../../data/faq.json";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    if (expandedItems.includes(index)) {
      setExpandedItems(expandedItems.filter(item => item !== index));
    } else {
      setExpandedItems([...expandedItems, index]);
    }
  };

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Split FAQs into two columns
  const column1 = filteredFaqs.slice(0, Math.ceil(filteredFaqs.length / 2));
  const column2 = filteredFaqs.slice(Math.ceil(filteredFaqs.length / 2));

  return (
    <>
      <Head>
        <title>Frequently Asked Questions | Door to Happiness Holiday</title>
        <meta
          name="description"
          content="Find answers to common questions about traveling to Bhutan"
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-orange-500 to-yellow-400 py-20 px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Bhutan Travel FAQs
            </h1>
            <p className="text-xl text-white opacity-90">
              Everything you need to know before your Bhutan adventure
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Search Bar */}
          <div className="relative mb-12 max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Results Count */}
          {searchTerm && (
            <div className="mb-6 text-gray-600 text-center">
              Showing {filteredFaqs.length} results for "{searchTerm}"
            </div>
          )}

          {/* FAQ List - Two Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Column 1 */}
            <div className="space-y-4">
              {column1.length > 0 ? (
                column1.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg"
                  >
                    <button
                      className="w-full px-6 py-5 text-left focus:outline-none"
                      onClick={() => toggleItem(index)}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-800">
                          {faq.question}
                        </h3>
                        {expandedItems.includes(index) ? (
                          <FiChevronUp className="h-5 w-5 text-orange-500" />
                        ) : (
                          <FiChevronDown className="h-5 w-5 text-orange-500" />
                        )}
                      </div>
                    </button>
                    {expandedItems.includes(index) && (
                      <div className="px-6 pb-5">
                        <div className="prose prose-orange max-w-none text-gray-600">
                          <p>{faq.answer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                filteredFaqs.length === 0 && (
                  <div className="text-center py-12 lg:hidden">
                    <h3 className="text-xl font-medium text-gray-600 mb-4">
                      No FAQs found matching your search
                    </h3>
                    <button
                      onClick={() => setSearchTerm("")}
                      className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      Clear Search
                    </button>
                  </div>
                )
              )}
            </div>

            {/* Column 2 */}
            <div className="space-y-4">
              {column2.length > 0 ? (
                column2.map((faq, index) => {
                  const originalIndex = index + Math.ceil(filteredFaqs.length / 2);
                  return (
                    <div
                      key={originalIndex}
                      className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg"
                    >
                      <button
                        className="w-full px-6 py-5 text-left focus:outline-none"
                        onClick={() => toggleItem(originalIndex)}
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium text-gray-800">
                            {faq.question}
                          </h3>
                          {expandedItems.includes(originalIndex) ? (
                            <FiChevronUp className="h-5 w-5 text-orange-500" />
                          ) : (
                            <FiChevronDown className="h-5 w-5 text-orange-500" />
                          )}
                        </div>
                      </button>
                      {expandedItems.includes(originalIndex) && (
                        <div className="px-6 pb-5">
                          <div className="prose prose-orange max-w-none text-gray-600">
                            <p>{faq.answer}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                filteredFaqs.length === 0 && (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-medium text-gray-600 mb-4">
                      No FAQs found matching your search
                    </h3>
                    <button
                      onClick={() => setSearchTerm("")}
                      className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      Clear Search
                    </button>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Still have questions? */}
          <div className="mt-16 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Still have questions?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our travel experts are happy to help with any other questions you
              might have about traveling to Bhutan.
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-lg shadow-md hover:from-orange-600 hover:to-yellow-600 transition-all duration-200">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQPage;