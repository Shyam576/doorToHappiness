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
  FiDollarSign,
  FiCamera,
  FiHeart,
  FiShare2,
  FiChevronRight,
  FiPlay,
  FiShield
} from 'react-icons/fi';
import { 
  HiOutlineUserGroup
} from 'react-icons/hi2';
import groupTours from '../../../data/groupTours.json';

interface DayItinerary {
  day: number;
  title: string;
  activities: string[];
}

interface GroupTour {
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
  group_size?: {
    min: number;
    max: number;
  };
  pricing?: {
    budget?: number;
    luxury?: number;
    premium?: number;
  };
}

const GroupTourDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Find the tour with matching ID
  const tourData = groupTours.find(tour => tour.id === id) as GroupTour | undefined;

  if (!tourData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="text-center p-8">
          <HiOutlineUserGroup className="mx-auto text-6xl text-orange-400 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Group Tour Not Found</h1>
          <p className="text-gray-600 mb-6">The group tour you're looking for doesn't exist.</p>
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
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  ];

  return (
    <>
      <Head>
        <title>{tourData.title} | Door to Happiness Holiday</title>
        <meta name="description" content={tourData.description} />
        <meta name="keywords" content="Bhutan group tour, group travel, affordable Bhutan tour, shared tour" />
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
              
              {/* Group Tour Badge */}
              <div className="absolute top-4 left-4">
                <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2">
                  <FiUsers className="w-4 h-4" />
                  <span>Group Adventure</span>
                </div>
              </div>
              
              <button className="absolute bottom-4 left-4 flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium hover:bg-white transition-colors">
                <FiPlay className="w-4 h-4" />
                <span>Group Experience</span>
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
                    <HiOutlineUserGroup className="w-4 h-4" />
                    <span>Group Adventure</span>
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{tourData.title}</h1>
                  
                  {/* Group Benefits */}
                  <div className="bg-gradient-to-r from-orange-100 to-yellow-100 p-4 rounded-xl mb-4">
                    <div className="flex flex-wrap items-center gap-4 text-sm text-orange-800">
                      <div className="flex items-center space-x-2">
                        <FiDollarSign className="w-4 h-4" />
                        <span>Cost-Effective Pricing</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FiUsers className="w-4 h-4" />
                        <span>Meet Fellow Travelers</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FiShield className="w-4 h-4" />
                        <span>Safe & Guided</span>
                      </div>
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
                      <span>{tourData.rating} (28 group reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Booking Card */}
                <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-6 rounded-xl shadow-lg min-w-[280px]">
                  <div className="text-center">
                    <p className="text-lg font-semibold mb-2">Join Group Adventure</p>
                    <p className="text-sm opacity-90 mb-2">Share the experience with fellow travelers</p>
                    <p className="text-xs opacity-75 mb-4">Minimum 6 people required</p>
                    <button className="w-full bg-white text-orange-600 font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                      Join Group Tour
                    </button>
                    <button className="w-full mt-2 border border-white/30 text-white font-semibold py-3 px-4 rounded-lg hover:bg-white/10 transition-colors duration-300">
                      Check Availability
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
                  { key: 'itinerary', label: 'Group Itinerary' },
                  { key: 'highlights', label: 'Group Benefits' },
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
                  
                  {/* Group Tour Features */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose mb-8">
                    <div className="text-center p-6 bg-orange-50 rounded-xl">
                      <FiDollarSign className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                      <h3 className="font-semibold text-gray-900 mb-2">Cost-Effective</h3>
                      <p className="text-sm text-gray-600">Share costs with fellow travelers for better value</p>
                    </div>
                    <div className="text-center p-6 bg-yellow-50 rounded-xl">
                      <FiUsers className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
                      <h3 className="font-semibold text-gray-900 mb-2">Social Experience</h3>
                      <p className="text-sm text-gray-600">Make new friends and share unforgettable memories</p>
                    </div>
                    <div className="text-center p-6 bg-orange-50 rounded-xl">
                      <FiShield className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                      <h3 className="font-semibold text-gray-900 mb-2">Safe & Secure</h3>
                      <p className="text-sm text-gray-600">Professional guides ensure safety and smooth travel</p>
                    </div>
                  </div>

                  {/* Group Size & Requirements */}
                  <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-xl not-prose mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Group Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-orange-600 mb-1">6-12</div>
                        <div className="text-sm text-gray-600">Group Size</div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-orange-600 mb-1">All Ages</div>
                        <div className="text-sm text-gray-600">Welcome</div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-orange-600 mb-1">English</div>
                        <div className="text-sm text-gray-600">Guide Language</div>
                      </div>
                    </div>
                  </div>

                  {/* Tour Statistics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 not-prose">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">6-7</div>
                      <div className="text-sm text-gray-600">Days</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">10+</div>
                      <div className="text-sm text-gray-600">Attractions</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">4</div>
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Group Tour Daily Itinerary</h2>
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Group Tour Benefits & Highlights</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tourData.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg hover:from-orange-100 hover:to-yellow-100 transition-colors duration-200">
                        <FiUsers className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-800 font-medium">{highlight}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Additional Group Benefits */}
                  <div className="mt-8 bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Choose Group Tours?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "Shared experiences create lasting memories",
                        "Professional group coordination",
                        "Enhanced safety in numbers",
                        "Cost-effective travel solution",
                        "Built-in social networking",
                        "Professional photography opportunities"
                      ].map((benefit, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="text-sm text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'inclusions' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Inclusions */}
                  <div className="bg-green-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <FiCheck className="w-5 h-5 text-green-600 mr-2" />
                      Group Package Includes
                    </h3>
                    <ul className="space-y-3">
                      {[
                        "Professional English-speaking group guide",
                        "Twin-sharing accommodation in quality hotels",
                        "Daily breakfast and traditional dinners",
                        "Comfortable group transportation",
                        "All entrance fees and permits",
                        "Group activities and experiences",
                        "24/7 group coordinator support",
                        "Travel insurance assistance"
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
                        "International flights to/from Bhutan",
                        "Single room supplement (if required)",
                        "Lunch meals during tour days",
                        "Personal expenses and shopping",
                        "Alcoholic drinks and beverages",
                        "Tips for guide and driver",
                        "Optional activities not mentioned"
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
            <h2 className="text-2xl font-bold mb-4">Join Fellow Travelers on This Amazing Journey!</h2>
            <p className="text-lg opacity-90 mb-2">Share the adventure, split the costs, multiply the memories</p>
            <p className="text-sm opacity-80 mb-6">Groups forming now - secure your spot today!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-orange-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                Join This Group Tour
              </button>
              <button className="border border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white/10 transition-colors duration-300">
                Create Private Group
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupTourDetails;
