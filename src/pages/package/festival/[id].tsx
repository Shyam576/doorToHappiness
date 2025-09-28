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
  FiMusic,
  FiCamera,
  FiHeart,
  FiShare2,
  FiChevronRight,
  FiPlay
} from 'react-icons/fi';
import { 
  HiOutlineColorSwatch
} from 'react-icons/hi';
import festivialTours from '../../../data/festivialTours.json';

interface DayItinerary {
  day: number;
  title: string;
  activities: string[];
}

interface FestivalTour {
  id: string;
  title: string;
  dates: string;
  duration: string;
  description: string;
  image: string;
  route: string;
  category: string;
  highlights: string[];
  detailed_itinerary: DayItinerary[];
  pricing?: {
    budget?: number;
    luxury?: number;
    premium?: number;
  };
}

const FestivalTourDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Find the tour with matching ID
  const tourData = festivialTours.find(tour => tour.id === id) as FestivalTour | undefined;

  if (!tourData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="text-center p-8">
          <FiMusic className="mx-auto text-6xl text-orange-400 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Festival Tour Not Found</h1>
          <p className="text-gray-600 mb-6">The festival tour you're looking for doesn't exist.</p>
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
    "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  ];

  return (
    <>
      <Head>
        <title>{tourData.title} | Door to Happiness Holiday</title>
        <meta name="description" content={tourData.description} />
        <meta name="keywords" content="Bhutan festival tour, Tsechu festival, Buddhist celebration, cultural festival" />
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
              
              {/* Festival Badge */}
              <div className="absolute top-4 left-4">
                <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  🎭 Festival Special
                </div>
              </div>
              
              <button className="absolute bottom-4 left-4 flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium hover:bg-white transition-colors">
                <FiPlay className="w-4 h-4" />
                <span>Festival Preview</span>
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
                    <FiMusic className="w-4 h-4" />
                    <span>Festival Experience</span>
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{tourData.title}</h1>
                  
                  {/* Festival Dates Banner */}
                  <div className="bg-gradient-to-r from-orange-100 to-yellow-100 p-4 rounded-xl mb-4">
                    <div className="flex items-center space-x-2 text-orange-800">
                      <FiCalendar className="w-5 h-5" />
                      <span className="font-semibold">Festival Dates: {tourData.dates}</span>
                    </div>
                  </div>
                  
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
                      <span>4.9 (32 festival reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Booking Card */}
                <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-6 rounded-xl shadow-lg min-w-[280px]">
                  <div className="text-center">
                    <p className="text-lg font-semibold mb-2">Festival Experience</p>
                    <p className="text-sm opacity-90 mb-2">Join this sacred celebration</p>
                    <p className="text-xs opacity-75 mb-4">Limited spots available!</p>
                    <button className="w-full bg-white text-orange-600 font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                      Reserve Festival Spot
                    </button>
                    <button className="w-full mt-2 border border-white/30 text-white font-semibold py-3 px-4 rounded-lg hover:bg-white/10 transition-colors duration-300">
                      Get Festival Info
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
                  { key: 'itinerary', label: 'Festival Schedule' },
                  { key: 'highlights', label: 'Festival Highlights' },
                  { key: 'inclusions', label: 'What\'s Included' }
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
                  
                  {/* Festival Experience Features */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose mb-8">
                    <div className="text-center p-6 bg-orange-50 rounded-xl">
                      <FiMusic className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                      <h3 className="font-semibold text-gray-900 mb-2">Sacred Performances</h3>
                      <p className="text-sm text-gray-600">Witness traditional Cham dances and sacred musical performances</p>
                    </div>
                    <div className="text-center p-6 bg-yellow-50 rounded-xl">
                      <HiOutlineColorSwatch className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
                      <h3 className="font-semibold text-gray-900 mb-2">Colorful Costumes</h3>
                      <p className="text-sm text-gray-600">Marvel at elaborate traditional costumes and ancient masks</p>
                    </div>
                    <div className="text-center p-6 bg-orange-50 rounded-xl">
                      <FiUsers className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                      <h3 className="font-semibold text-gray-900 mb-2">Local Celebration</h3>
                      <p className="text-sm text-gray-600">Join locals in authentic festival celebrations and rituals</p>
                    </div>
                  </div>

                  {/* Festival Facts */}
                  <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-xl not-prose mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Festival Facts</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">Ancient tradition dating back centuries</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">Sacred Thongdrel blessing ceremony</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">Mask dances by monastery monks</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">Limited access cultural experience</span>
                      </div>
                    </div>
                  </div>

                  {/* Festival Statistics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 not-prose">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">5-6</div>
                      <div className="text-sm text-gray-600">Festival Days</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">15+</div>
                      <div className="text-sm text-gray-600">Performances</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">3</div>
                      <div className="text-sm text-gray-600">Sacred Sites</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">4.9★</div>
                      <div className="text-sm text-gray-600">Rating</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'itinerary' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Festival Schedule & Daily Itinerary</h2>
                  <div className="space-y-4">
                    {tourData.detailed_itinerary?.map((day, index) => (
                      <div key={index} className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300">
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Festival Highlights</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tourData.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg hover:from-orange-100 hover:to-yellow-100 transition-colors duration-200">
                        <FiMusic className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
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
                      Festival Package Includes
                    </h3>
                    <ul className="space-y-3">
                      {[
                        "VIP festival viewing positions",
                        "Professional festival photography guide",
                        "All accommodation in premium hotels",
                        "Traditional Bhutanese breakfast & dinner",
                        "Private festival transportation",
                        "Festival permits and special access",
                        "Cultural costume rental (optional)",
                        "Expert festival commentary"
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
                      Not Included
                    </h3>
                    <ul className="space-y-3">
                      {[
                        "International flights to Bhutan",
                        "Personal travel insurance",
                        "Shopping and souvenirs",
                        "Lunch meals during festival days",
                        "Professional festival photography",
                        "Alcoholic beverages",
                        "Tips and gratuities"
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
          {/* <div className="mt-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Don't Miss This Sacred Festival Experience!</h2>
            <p className="text-lg opacity-90 mb-2">Join us for {tourData.dates}</p>
            <p className="text-sm opacity-80 mb-6">Secure your spot for this once-in-a-lifetime cultural celebration</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-orange-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                Book Festival Tour Now
              </button>
              <button className="border border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white/10 transition-colors duration-300">
                Download Festival Guide
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default FestivalTourDetails;
