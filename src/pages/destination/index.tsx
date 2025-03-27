import React, { useState } from 'react';
import Head from 'next/head';
import { FiMapPin, FiStar, FiCompass, FiHeart, FiArrowRight } from 'react-icons/fi';
import destinations from '../../data/destinations.json';
import WhatsAppButton from '../../components/whatsAppButton';

interface Destination {
  title: string;
  image: string;
  description: string;
}

const DestinationCard = ({ destination }: { destination: Destination }) => {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
        <div className="h-48 bg-gray-200 relative overflow-hidden">
          {destination.image ? (
            <img
              src={destination.image}
              alt={destination.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center">
              <FiCompass className="text-white text-4xl" />
            </div>
          )}
        </div>
        <div className="p-6 flex-grow flex flex-col">
          <div className="flex items-center mb-2">
            <FiMapPin className="text-green-500 mr-2" />
            <span className="text-sm text-gray-600">Bhutan</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">{destination.title}</h3>
          <p className="text-gray-600 mb-4 flex-grow">{destination.description}</p>
          <div className="flex justify-end items-center mt-auto">
            <button className="flex items-center text-orange-500 font-medium hover:text-yellow-400 transition-colors">
              Explore <FiArrowRight className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    );
  };

const DestinationsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDestinations = destinations.filter(destination => {
    const searchLower = searchTerm.toLowerCase();
    return (
      destination.title.toLowerCase().includes(searchLower) ||
      destination.description.toLowerCase().includes(searchLower)
    );
  });

  return (
    <>
      <Head>
        <title>Bhutan Tourism Destinations | Discover the Land of Happiness</title>
        <meta name="description" content="Explore the most beautiful destinations in Bhutan - from ancient monasteries to breathtaking valleys and thrilling adventures." />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-orange-500 to-yellow-400 py-20 px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Discover Bhutan's Hidden Gems</h1>
            <p className="text-xl text-white opacity-90 mb-8">
              Explore the Land of the Thunder Dragon through its most breathtaking destinations, rich culture, and unforgettable experiences.
            </p>
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search destinations..."
                className="w-full py-4 px-6 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="absolute right-2 top-2 bg-yellow-400 text-gray-800 p-2 rounded-full hover:bg-yellow-500 transition-colors">
                <FiArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Results Count */}
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            {filteredDestinations.length} Amazing Destinations in Bhutan
            {searchTerm && (
              <span className="text-lg font-normal ml-2">
                matching "{searchTerm}"
              </span>
            )}
          </h2>

          {/* Destinations Grid */}
          {filteredDestinations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDestinations.map((destination, index) => (
                <DestinationCard key={index} destination={destination} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-600 mb-4">
                No destinations found matching your search
              </h3>
              <button 
                onClick={() => setSearchTerm('')}
                className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <nav className="inline-flex rounded-md shadow">
              <button className="px-4 py-2 rounded-l-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
                Previous
              </button>
              <button className="px-4 py-2 border-t border-b border-gray-300 bg-white text-gray-700 hover:bg-gray-50 font-medium">
                1
              </button>
              <button className="px-4 py-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
                2
              </button>
              <button className="px-4 py-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
                3
              </button>
              <button className="px-4 py-2 rounded-r-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-orange-500 to-yellow-400 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready for Your Bhutan Adventure?</h2>
            <p className="text-xl text-white mb-8">
              Let our travel experts craft the perfect Bhutanese experience just for you.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-4 bg-white text-orange-600 font-bold rounded-lg shadow-lg hover:bg-gray-100 transition-colors">
                Book a Custom Tour
              </button>
              <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors">
                Contact Our Experts
              </button>
            </div>
          </div>
        </div>
        <WhatsAppButton
          phoneNumber={process.env.NEXT_PUBLIC_PHONE_NO as string}
          message="Hello! I have a question about"
        />
      </div>
    </>
  );
};

export default DestinationsPage;