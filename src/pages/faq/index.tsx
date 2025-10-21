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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 py-12">
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
          <div className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
          </div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about traveling to Bhutan and booking your perfect tour
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8 max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-orange-400" />
          </div>
          <input
            type="text"
            placeholder="Search FAQs..."
            className="block w-full pl-10 pr-3 py-3 border-2 border-orange-200 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-orange-300 focus:border-orange-400 text-base shadow-sm transition-all duration-200"
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
                className="bg-white rounded-xl shadow-lg border border-orange-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-orange-200"
              >
                <button
                  className="w-full px-6 py-5 text-left focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-inset bg-gradient-to-r from-orange-50 to-yellow-50 hover:from-orange-100 hover:to-yellow-100 transition-all duration-200"
                  onClick={() => toggleItem(index)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800 pr-4">
                      {faq.question}
                    </h3>
                    {expandedItems.includes(index) ? (
                      <FiChevronUp className="h-5 w-5 text-orange-500" />
                    ) : (
                      <FiChevronDown className="h-5 w-5 text-orange-400" />
                    )}
                  </div>
                </button>
                {expandedItems.includes(index) && (
                  <div className="px-6 pb-5 pt-2 bg-gradient-to-r from-orange-25 to-yellow-25">
                    <div className="prose prose-gray max-w-none">
                      <p className="text-gray-700 leading-relaxed text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            searchTerm && (
              <div className="text-center py-16 bg-white rounded-xl shadow-lg border border-orange-100">
                <h3 className="text-xl font-semibold text-gray-700 mb-6">
                  No FAQs found matching your search
                </h3>
                <button
                  onClick={() => setSearchTerm("")}
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg hover:from-orange-600 hover:to-yellow-600 transition-all duration-200 shadow-md"
                >
                  Clear Search
                </button>
              </div>
            )
          )}
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl shadow-lg border border-orange-100 p-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-700 mb-8 text-lg">
            Can&apos;t find what you&apos;re looking for? We&apos;re here to help you plan your perfect Bhutan adventure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contactus"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 transition-all duration-200 shadow-md"
            >
              Contact Us
            </a>
            <a
              href="https://wa.me/97577123456"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-orange-300 text-base font-medium rounded-lg text-orange-600 bg-white hover:bg-orange-50 hover:border-orange-400 transition-all duration-200"
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
