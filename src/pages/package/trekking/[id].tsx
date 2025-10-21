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
  FiTrendingUp,
  FiCamera,
  FiShare2,
  FiChevronRight,
  FiPlay,
  FiAward,
  FiAlertTriangle
} from 'react-icons/fi';
import trekkingAdventure from '../../../data/trekkingAdventure.json';

interface DayItinerary {
  day: number;
  title: string;
  activities: string[];
}

interface TrekkingTour {
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
  difficulty_level?: string;
  max_altitude?: string;
  best_season?: string[];
  fitness_required?: string;
}

const TrekkingTourDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Share function
  const handleShare = async () => {
    const shareData = {
      title: tourData?.title || 'Trekking Adventure',
      text: tourData?.description || 'Check out this amazing trekking adventure in Bhutan!',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
        // Fallback to copying URL
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Find the tour with matching ID
  const tourData = trekkingAdventure.find(tour => tour.id === id) as TrekkingTour | undefined;

  if (!tourData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="text-center p-8">
          <FiTrendingUp className="mx-auto text-6xl text-orange-400 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Trekking Adventure Not Found</h1>
          <p className="text-gray-600 mb-6">The trekking adventure you're looking for doesn't exist.</p>
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
    "https://images.unsplash.com/photo-1464822759844-d150ad6fbbc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  ];

  const getDifficultyColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'moderate': return 'text-yellow-600 bg-yellow-100';
      case 'challenging': case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  return (
    <>
      <Head>
        <title>{tourData.title} | Door to Happiness Holiday</title>
        <meta name="description" content={tourData.description} />
        <meta name="keywords" content="Bhutan trekking, Himalaya trek, mountain adventure, hiking Bhutan" />
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
              
              {/* Adventure Badge */}
              <div className="absolute top-4 left-4">
                <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2">
                  <FiTrendingUp className="w-4 h-4" />
                  <span>Mountain Adventure</span>
                </div>
              </div>
              
              {/* Difficulty Level */}
              <div className="absolute top-4 left-44">
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor('moderate')}`}>
                  Moderate Difficulty
                </div>
              </div>
              
              <button className="absolute bottom-4 left-4 flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium hover:bg-white transition-colors">
                <FiPlay className="w-4 h-4" />
                <span>Trek Preview</span>
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
          <div className="absolute top-4 right-4">
            <button 
              onClick={handleShare}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
            >
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
                    <FiTrendingUp className="w-4 h-4" />
                    <span>Trekking Adventure</span>
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{tourData.title}</h1>
                  
                  {/* Trek Essentials */}
                  <div className="bg-gradient-to-r from-orange-100 to-yellow-100 p-4 rounded-xl mb-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-orange-800">
                      <div className="flex items-center space-x-2">
                        <FiTrendingUp className="w-4 h-4" />
                        <span>Moderate Level</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FiTrendingUp className="w-4 h-4" />
                        <span>4,050m Max Alt.</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FiCalendar className="w-4 h-4" />
                        <span>Oct-May Best</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FiUsers className="w-4 h-4" />
                        <span>Good Fitness Required</span>
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
                      <span>{tourData.rating} (15 trekker reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Booking Card */}
                <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-6 rounded-xl shadow-lg min-w-[280px]">
                  <div className="text-center">
                    <p className="text-lg font-semibold mb-2">Mountain Adventure</p>
                    <p className="text-sm opacity-90 mb-2">Conquer the Himalayas</p>
                    <p className="text-xs opacity-75 mb-4">All gear & support included</p>
                    <button className="w-full bg-white text-orange-600 font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                      Book Trek Adventure
                    </button>
                    <button className="w-full mt-2 border border-white/30 text-white font-semibold py-3 px-4 rounded-lg hover:bg-white/10 transition-colors duration-300">
                      Trek Preparation Guide
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
                  { key: 'itinerary', label: 'Trek Itinerary' },
                  { key: 'highlights', label: 'Trek Highlights' },
                  { key: 'preparation', label: 'Preparation' }
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
                  
                  {/* Trek Features */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose mb-8">
                    <div className="text-center p-6 bg-orange-50 rounded-xl">
                      <FiTrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                      <h3 className="font-semibold text-gray-900 mb-2">Himalayan Views</h3>
                      <p className="text-sm text-gray-600">Spectacular mountain vistas and pristine landscapes</p>
                    </div>
                    <div className="text-center p-6 bg-yellow-50 rounded-xl">
                      <FiAward className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
                      <h3 className="font-semibold text-gray-900 mb-2">Personal Achievement</h3>
                      <p className="text-sm text-gray-600">Challenge yourself and reach new heights</p>
                    </div>
                    <div className="text-center p-6 bg-orange-50 rounded-xl">
                      <FiCamera className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                      <h3 className="font-semibold text-gray-900 mb-2">Photography</h3>
                      <p className="text-sm text-gray-600">Capture breathtaking alpine scenery and wildlife</p>
                    </div>
                  </div>

                  {/* Trek Information Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose mb-8">
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Trek Specifications</h3>
                      <ul className="space-y-3">
                        <li className="flex justify-between">
                          <span className="text-gray-600">Maximum Altitude:</span>
                          <span className="font-medium">4,050m (13,287ft)</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600">Difficulty Level:</span>
                          <span className="font-medium">Moderate</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600">Trek Distance:</span>
                          <span className="font-medium">~45km</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600">Accommodation:</span>
                          <span className="font-medium">Camping & Lodges</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Best Season</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                          <span className="text-sm">October - December (Clear views)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <span className="text-sm">March - May (Spring flowers)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                          <span className="text-sm">June - September (Monsoon)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Trek Statistics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 not-prose">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">11-12</div>
                      <div className="text-sm text-gray-600">Days</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">4,050m</div>
                      <div className="text-sm text-gray-600">Max Altitude</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">45km</div>
                      <div className="text-sm text-gray-600">Trek Distance</div>
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Daily Trek Itinerary</h2>
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Trek Highlights</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tourData.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg hover:from-orange-100 hover:to-yellow-100 transition-colors duration-200">
                        <FiTrendingUp className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-800 font-medium">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'preparation' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Fitness & Preparation */}
                  <div className="bg-yellow-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <FiAlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
                      Fitness & Preparation
                    </h3>
                    <ul className="space-y-3">
                      {[
                        "Good physical fitness required",
                        "Regular cardio training recommended",
                        "Previous hiking experience helpful",
                        "Altitude acclimatization important",
                        "Mental preparation for challenges",
                        "Medical clearance recommended"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <FiCheck className="w-4 h-4 text-yellow-600 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Gear & Equipment */}
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <FiAward className="w-5 h-5 text-blue-600 mr-2" />
                      Essential Gear Provided
                    </h3>
                    <ul className="space-y-3">
                      {[
                        "High-quality camping equipment",
                        "Professional trekking poles",
                        "First aid and safety equipment",
                        "Portable oxygen for emergencies",
                        "Satellite communication device",
                        "Professional mountain guide",
                        "Porter services included"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <FiCheck className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Safety Notice */}
          <div className="mt-6 bg-gradient-to-r from-yellow-100 to-orange-100 border-l-4 border-yellow-500 p-6 rounded-r-xl mb-2">
            <div className="flex items-start space-x-3">
              <FiAlertTriangle className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Important Safety Information</h3>
                <p className="text-gray-700 text-sm">
                  This trek involves high-altitude hiking and requires good physical fitness. We recommend consulting 
                  your doctor before booking, especially if you have any medical conditions. All treks are led by 
                  experienced guides with wilderness first aid certification.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          {/* <div className="mt-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Ready for the Adventure of a Lifetime?</h2>
            <p className="text-lg opacity-90 mb-2">Conquer the Himalayas and create unforgettable memories</p>
            <p className="text-sm opacity-80 mb-6">Professional guides • Safety equipment • Unforgettable experience</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-green-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                Book Trek Adventure
              </button>
              <button className="border border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white/10 transition-colors duration-300">
                Download Trek Guide
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default TrekkingTourDetails;
