import React, { useState } from "react";
import { FiSearch, FiChevronDown, FiChevronUp } from "react-icons/fi";
import faqs from "../../data/faq.json";
import { getTheme } from "../../styles/themes";
import Seo from "../../components/Seo";

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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-amber-100 to-amber-100 py-12">
      <Seo
        title="Frequently Asked Questions - Door To Happiness"
        description="Answers to common questions about Bhutan tours: travel requirements, best time to visit, and booking procedures with Door to Happiness."
        path="/faq"
        keywords="Bhutan FAQ, travel questions, tour booking, visa requirements, best time visit Bhutan, Bhutan travel guide"
        ogTitle="Frequently Asked Questions | Door to Happiness Holiday"
        ogDescription="Find answers to commonly asked questions about Bhutan tours, travel requirements, best times to visit, and booking procedures."
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq: FAQItem) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
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
            <FiSearch className="h-5 w-5 text-amber-400" />
          </div>
          <input
            type="text"
            aria-label="Search FAQs"
            placeholder="Search FAQs..."
            className="block w-full pl-10 pr-3 py-3 border-2 border-amber-200 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-amber-300 focus:border-amber-400 text-base shadow-sm transition-all duration-200"
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
                className="bg-white rounded-xl shadow-lg border border-amber-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-amber-200"
              >
                <button
                  className="w-full px-6 py-5 text-left focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-inset bg-gradient-to-r from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200 transition-all duration-200"
                  onClick={() => toggleItem(index)}
                  aria-expanded={expandedItems.includes(index)}
                  aria-controls={`faq-answer-${index}`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800 pr-4">
                      {faq.question}
                    </h3>
                    {expandedItems.includes(index) ? (
                      <FiChevronUp className="h-5 w-5 text-amber-500" />
                    ) : (
                      <FiChevronDown className="h-5 w-5 text-amber-400" />
                    )}
                  </div>
                </button>
                <div
                  id={`faq-answer-${index}`}
                  aria-hidden={!expandedItems.includes(index)}
                  className={`px-6 pb-5 pt-2 bg-gradient-to-r from-amber-100 to-amber-100 ${
                    expandedItems.includes(index) ? '' : 'hidden'
                  }`}
                >
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            searchTerm && (
              <div className="text-center py-16 bg-white rounded-xl shadow-lg border border-amber-100">
                <h3 className="text-xl font-semibold text-gray-700 mb-6">
                  No FAQs found matching your search
                </h3>
                <button
                  onClick={() => setSearchTerm("")}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-700 text-white rounded-lg hover:from-amber-600 hover:to-amber-800 transition-all duration-200 shadow-md"
                >
                  Clear Search
                </button>
              </div>
            )
          )}
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl shadow-lg border border-amber-100 p-8">
          <h2 className="font-heading text-2xl font-bold bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-700 mb-8 text-lg">
            Can&apos;t find what you&apos;re looking for? We&apos;re here to help you plan your perfect Bhutan adventure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contactus"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 transition-all duration-200 shadow-md"
            >
              Contact Us
            </a>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_PHONE_NO}`}
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-amber-300 text-base font-medium rounded-lg text-amber-600 bg-white hover:bg-amber-50 hover:border-amber-400 transition-all duration-200"
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
