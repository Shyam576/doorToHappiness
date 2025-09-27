import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { 
  FiMapPin, 
  FiCalendar, 
  FiStar, 
  FiCheck, 
  FiX, 
  FiClock,
  FiUsers,
  FiAward,
  FiCamera,
  FiHeart,
  FiShare2,
  FiChevronRight,
  FiPlay
} from 'react-icons/fi';
import { 
  HiOutlineColorSwatch
} from 'react-icons/hi';
import { 
  HiOutlineBuildingLibrary
} from 'react-icons/hi2';
import culturalTours from '../../../data/culturalTours.json';

interface DayItinerary {
  day: number;
  title: string;
  activities: string[];
}

interface CulturalTour {
  id: string;
  title: string;
  description: string;
  image: string;
  route: string;
  category: string;
  rating: number;
  duration: string;
  highlights: string[];
  detailed_itinerary: DayItinerary[];
  pricing?: {
    budget?: number;
    luxury?: number;
    premium?: number;
  };
  inclusions?: string[];
  exclusions?: string[];
  best_time?: string[];
  difficulty_level?: string;
}

const CulturalTourDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Find the tour with matching ID
  const tourData = culturalTours.find(tour => tour.id === id) as CulturalTour | undefined;

  if (!tourData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="text-center p-8">
          <HiOutlineBuildingLibrary className="mx-auto text-6xl text-orange-400 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Cultural Tour Not Found</h1>
          <p className="text-gray-600 mb-6">The cultural tour you're looking for doesn't exist.</p>
          <button 
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all duration-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const sampleImages = [
    tourData.image,
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  ];

  return (
    <>
      <Head>
        <title>{tourData.title} | Door to Happiness Holiday</title>
        <meta name="description" content={tourData.description} />
        <meta name="keywords" content="Bhutan cultural tour, Buddhist culture, monastery visit, cultural experience" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section with Image Gallery */}
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 h-96 lg:h-[500px]">
            {/* Main Image */}
            <div className="lg:col-span-3 relative group cursor-pointer overflow-hidden rounded-l-lg">
              <img
                src={sampleImages[selectedImageIndex]}
                alt={tourData.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <button className="absolute bottom-4 left-4 flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium hover:bg-white transition-colors">
                <FiPlay className="w-4 h-4" />
                <span>View Gallery</span>
              </button>
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="hidden lg:flex flex-col gap-2">
              {sampleImages.slice(1, 4).map((img, index) => (
                <div 
                  key={index + 1}
                  className={`relative h-full cursor-pointer overflow-hidden group ${
                    index === 2 ? 'rounded-tr-lg rounded-br-lg' : ''
                  }`}
                  onClick={() => setSelectedImageIndex(index + 1)}
                >
                  <img
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 transition-opacity duration-300 ${
                    selectedImageIndex === index + 1 ? 'bg-orange-500/20' : 'bg-black/20 group-hover:bg-black/10'
                  }`} />
                </div>
              ))}
            </div>
          </div>

          {/* Floating Action Buttons */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
              <FiHeart className="w-5 h-5 text-gray-700" />
            </button>
            <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
              <FiShare2 className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header Info */}
            <div className="p-6 lg:p-8 border-b border-gray-100">
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 text-sm text-orange-600 font-medium mb-2">
                    <HiOutlineBuildingLibrary className="w-4 h-4" />
                    <span>Cultural Experience</span>
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{tourData.title}</h1>
                  
                  {/* Quick Info */}
                  <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <FiMapPin className="w-4 h-4 text-orange-500" />
                      <span>{tourData.route}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FiClock className="w-4 h-4 text-orange-500" />
                      <span>{tourData.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FiStar className="w-4 h-4 text-yellow-500 fill-current" />
                      <span>{tourData.rating} (48 reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Pricing Card */}
                <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-6 rounded-xl shadow-lg min-w-[280px]">
                  <div className="text-center">
                    <p className="text-sm opacity-90 mb-1">Starting from</p>
                    <p className="text-3xl font-bold mb-1">$1,299</p>
                    <p className="text-sm opacity-90 mb-4">per person</p>
                    <button className="w-full bg-white text-orange-600 font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                      Book This Tour
                    </button>
                    <button className="w-full mt-2 border border-white/30 text-white font-semibold py-3 px-4 rounded-lg hover:bg-white/10 transition-colors duration-300">
                      Customize Tour
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-gray-100">
              <nav className="flex space-x-8 px-6 lg:px-8">
                {[
                  { key: 'overview', label: 'Overview' },
                  { key: 'itinerary', label: 'Itinerary' },
                  { key: 'highlights', label: 'Highlights' },
                  { key: 'inclusions', label: 'Inclusions' }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === tab.key
                        ? 'border-orange-500 text-orange-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6 lg:p-8">
              {activeTab === 'overview' && (
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">{tourData.description}</p>
                  
                  {/* Cultural Experience Features */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose mb-8">
                    <div className="text-center p-6 bg-orange-50 rounded-xl">
                      <HiOutlineBuildingLibrary className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                      <h3 className="font-semibold text-gray-900 mb-2">Ancient Monasteries</h3>
                      <p className="text-sm text-gray-600">Explore sacred Buddhist temples and monasteries with centuries of history</p>
                    </div>
                    <div className="text-center p-6 bg-yellow-50 rounded-xl">
                      <HiOutlineColorSwatch className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
                      <h3 className="font-semibold text-gray-900 mb-2">Traditional Arts</h3>
                      <p className="text-sm text-gray-600">Witness authentic Bhutanese crafts, painting, and traditional arts</p>
                    </div>
                    <div className="text-center p-6 bg-green-50 rounded-xl">
                      <FiUsers className="w-8 h-8 text-green-600 mx-auto mb-3" />
                      <h3 className="font-semibold text-gray-900 mb-2">Local Culture</h3>
                      <p className="text-sm text-gray-600">Immerse in authentic Bhutanese lifestyle and traditions</p>
                    </div>
                  </div>

                  {/* Tour Statistics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 not-prose">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">8-9</div>
                      <div className="text-sm text-gray-600">Days</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">12+</div>
                      <div className="text-sm text-gray-600">Attractions</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">5</div>
                      <div className="text-sm text-gray-600">Cities</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">4.8★</div>
                      <div className="text-sm text-gray-600">Rating</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'itinerary' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Day-by-Day Itinerary</h2>
                  <div className="space-y-4">
                    {tourData.detailed_itinerary?.map((day, index) => (
                      <div key={index} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300">
                        <div className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full flex items-center justify-center font-bold">
                                {day.day}
                              </div>
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">{day.title}</h3>
                              <ul className="space-y-2">
                                {day.activities.map((activity, idx) => (
                                  <li key={idx} className="flex items-start space-x-2 text-gray-700">
                                    <FiChevronRight className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0" />
                                    <span>{activity}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'highlights' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Tour Highlights</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tourData.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors duration-200">
                        <FiAward className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-800 font-medium">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'inclusions' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Inclusions */}
                  <div className="bg-green-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <FiCheck className="w-5 h-5 text-green-600 mr-2" />
                      What's Included
                    </h3>
                    <ul className="space-y-3">
                      {[
                        "Professional English-speaking guide",
                        "All accommodation in luxury hotels",
                        "Daily breakfast and dinner",
                        "Private transportation",
                        "All entrance fees and permits",
                        "Cultural performances and workshops",
                        "Airport transfers"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <FiCheck className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Exclusions */}
                  <div className="bg-red-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <FiX className="w-5 h-5 text-red-600 mr-2" />
                      What's Not Included
                    </h3>
                    <ul className="space-y-3">
                      {[
                        "International airfare",
                        "Travel insurance",
                        "Personal expenses",
                        "Lunch meals",
                        "Alcoholic beverages",
                        "Tips for guide and driver",
                        "Visa fees"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <FiX className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Ready to Experience Bhutan's Rich Culture?</h2>
            <p className="text-lg opacity-90 mb-6">Join us on this transformative journey through the Heart of the Himalayas</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-orange-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                Book This Cultural Tour
              </button>
              <button className="border border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white/10 transition-colors duration-300">
                Request Information
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CulturalTourDetails;
