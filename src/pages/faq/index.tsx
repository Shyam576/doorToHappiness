import React, { useState } from "react";
import Head from "next/head";
import { FiSearch, FiChevronDown, FiChevronUp } from "react-icons/fi";
import faqs from "../../data/faq.json";
import { getTheme } from "../../styles/themes";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQPage = () => {
  // Get unified theme
  const theme = getTheme();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    if (expandedItems.includes(index)) {
      setExpandedItems(expandedItems.filter((item) => item !== index));
    } else {
      setExpandedItems([...expandedItems, index]);
    }
  };

  const filteredFAQs = faqs.filter((faq: FAQItem) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Head>
        <title>Frequently Asked Questions - Door To Happiness</title>
        <meta
          name="description"
          content="Find answers to commonly asked questions about Bhutan tours, travel requirements, best times to visit, and booking procedures with Door To Happiness."
        />
        <meta
          name="keywords"
          content="Bhutan FAQ, travel questions, tour booking, visa requirements, best time visit Bhutan, Bhutan travel guide"
        />
      </Head>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about traveling to Bhutan and booking your perfect tour
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search FAQs..."
            className={`block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 ${theme.primaryRing} focus:border-orange-500 text-base`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq: FAQItem, index: number) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                <button
                  className={`w-full px-6 py-4 text-left focus:outline-none focus:ring-2 ${theme.primaryRing} focus:ring-inset`}
                  onClick={() => toggleItem(index)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    {expandedItems.includes(index) ? (
                      <FiChevronUp className={`h-5 w-5 ${theme.primaryText}`} />
                    ) : (
                      <FiChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </button>
                {expandedItems.includes(index) && (
                  <div className="px-6 pb-4">
                    <div className="prose prose-gray max-w-none">
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            searchTerm && (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium text-gray-600 mb-6">
                  No FAQs found matching your search
                </h3>
                <button
                  onClick={() => setSearchTerm("")}
                  className={`px-6 py-2 ${theme.primary} text-white rounded-lg ${theme.primaryHover} transition-colors`}
                >
                  Clear Search
                </button>
              </div>
            )
          )}
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for? We're here to help you plan your perfect Bhutan adventure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contactus"
              className={`inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white ${theme.primary} ${theme.primaryHover} transition-colors`}
            >
              Contact Us
            </a>
            <a
              href="https://wa.me/97577123456"
              className={`inline-flex items-center justify-center px-6 py-3 border ${theme.primaryBorder} text-base font-medium rounded-lg ${theme.primaryText} bg-white hover:bg-orange-50 transition-colors`}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
