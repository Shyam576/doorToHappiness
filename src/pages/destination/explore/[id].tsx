// src/pages/explore/[slug].tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import popularDestination from "../../../data/popularDestination.json";
import { 
  FiMapPin, 
  FiStar, 
  FiCalendar, 
  FiClock, 
  FiDollarSign, 
  FiUsers, 
  FiChevronRight,
  FiCompass,
  FiCamera,
  FiHeart,
  FiShare2,
  FiChevronDown,
  FiChevronUp
} from 'react-icons/fi';

interface Place {
  name: string;
  image: string;
  description: string;
  rating?: number | string;
  distance?: string;
}

interface SectionState {
  overview: boolean;
  places: boolean;
  experiences: boolean;
  culture: boolean;
  practical: boolean;
}

const DestinationPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [showAllPlaces, setShowAllPlaces] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [expandedSections, setExpandedSections] = useState<SectionState>({
    overview: true,
    places: true,
    experiences: true,
    culture: true,
    practical: false
  });

  // Find the destination data that matches the slug
  const destinationData = popularDestination.find(dest => dest.id === id);

  const toggleSection = (section: keyof SectionState) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleViewPlaceDetails = (place: Place) => {
    setSelectedPlace(place);
    const placesSection = document.getElementById('places-section');
    if (placesSection) {
      window.scrollTo({
        top: placesSection.offsetTop - 20,
        behavior: 'smooth'
      });
    }
  };

  // Return null or loading state if data isn't found yet
  if (!destinationData) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>{destinationData.name} Dzongkhag Travel Guide | Sacred Places & Cultural Heritage | Bhutan</title>
        <meta 
          name="description" 
          content={`Complete travel guide to ${destinationData.name} dzongkhag. Discover ${destinationData.culture.dzongs.join(', ')} and other sacred places in ${destinationData.location.region}. ${destinationData.description}`}
        />
        <meta 
          name="keywords" 
          content={`${destinationData.name} Bhutan, ${destinationData.name} dzongkhag, ${destinationData.culture.dzongs.join(', ')}, ${destinationData.highlights.join(', ')}, Bhutan travel guide, ${destinationData.location.region}`}
        />
        <meta property="og:title" content={`${destinationData.name} - ${destinationData.tagline} | Bhutan Travel Guide`} />
        <meta property="og:description" content={`${destinationData.description} Explore sacred dzongs, monasteries and cultural heritage sites.`} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={destinationData.media.images[0]} />
        <link rel="canonical" href={`https://www.doortohappinessholiday.com/destination/explore/${destinationData.slug}`} />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristDestination",
            "name": destinationData.name,
            "description": destinationData.description,
            "image": destinationData.media.images,
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": destinationData.location.coordinates.lat,
              "longitude": destinationData.location.coordinates.lng
            },
            "containedInPlace": {
              "@type": "Country",
              "name": "Bhutan"
            },
            "touristType": ["Cultural Tourism", "Religious Tourism"],
            "aggregateRating": {
              "@type": "AggregateRating", 
              "ratingValue": destinationData.rating,
              "bestRating": "5"
            }
          })}
        </script>
      </Head>

      {/* Hero Section with Image Gallery */}
      <div className="relative h-96 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-70 z-10"></div>
        <img 
          src={destinationData.media.images[0]} 
          alt={destinationData.name}
          className="w-full h-full object-cover absolute"
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-end pb-8">
          <div className="max-w-3xl">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{destinationData.name}</h1>
                <p className="text-xl text-white mb-4">{destinationData.tagline}</p>
              </div>
              <button className="bg-yellow-600 bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full text-white transition-all">
                <FiShare2 size={20} />
              </button>
            </div>
            <div className="flex items-center text-white">
              <FiMapPin className="mr-1" />
              <span className="mr-4">{destinationData.location.region}</span>
              <FiStar className="text-yellow-400 mr-1" />
              <span>{destinationData.rating} ({destinationData.meta.popularity} reviews)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Image Gallery */}
      <div className="container mx-auto px-4 -mt-8 relative z-30">
        <div className="grid grid-cols-4 gap-2">
          {destinationData.media.images.slice(1,5).map((image, index) => (
            <div key={index} className="h-32 md:h-48 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <img 
                src={image} 
                alt={destinationData.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Overview Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => toggleSection('overview')}>
            <h2 className="text-2xl font-bold text-gray-800">About {destinationData.name}</h2>
            {expandedSections.overview ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
          </div>
          
          {expandedSections.overview && (
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-2/3">
                <div className="prose max-w-none">
                  <p className="text-gray-700 mb-6">{destinationData.description}</p>
                </div>
                
                <div className="bg-yellow-50 p-6 rounded-lg mb-6 border border-yellow-100">
                  <h3 className="font-bold text-lg mb-3 text-yellow-800 flex items-center">
                    <FiStar className="mr-2 text-yellow-600" />
                    Why Visit {destinationData.name}?
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {destinationData.usps.map((usp, index) => (
                      <li key={index} className="flex items-start bg-white p-3 rounded-lg">
                        <span className="text-yellow-500 mr-2">•</span>
                        <span className="text-gray-700">{usp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Highlights Section */}
                <div className="mb-6">
                  <h3 className="font-bold text-lg mb-3 text-gray-800">Highlights</h3>
                  <div className="flex flex-wrap gap-2">
                    {destinationData.highlights.map((highlight, index) => (
                      <span 
                        key={index} 
                        className="bg-white border border-yellow-100 text-yellow-600 px-4 py-2 rounded-full text-sm font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/3">
                <div className="bg-white p-6 rounded-lg shadow-sm sticky top-4 border border-gray-200">
                  <h3 className="font-bold text-lg mb-4 text-gray-800 flex items-center">
                    <FiMapPin className="mr-2 text-yellow-600" />
                    Quick Facts
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-yellow-100 p-2 rounded-full mr-3">
                        <FiCalendar className="text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Best Time to Visit</p>
                        <p className="font-medium text-gray-700">{destinationData.practicalInfo.bestTimeToVisit.join(', ')}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-orange-100 p-2 rounded-full mr-3">
                        <FiCompass className="text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Nearby Dzongkhags</p>
                        <p className="font-medium text-gray-700">{destinationData.location.nearbyDzongkhags.join(', ')}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-yellow-100 p-2 rounded-full mr-3">
                        <FiUsers className="text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Popular For</p>
                        <p className="font-medium text-gray-700">Culture, History, Nature</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-orange-100 p-2 rounded-full mr-3">
                        <FiDollarSign className="text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Average Cost</p>
                        <p className="font-medium text-gray-700">$$ (Moderate)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Places to Visit Section */}
        <section id="places-section" className="mb-12">
          <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => toggleSection('places')}>
            <h2 className="text-2xl font-bold text-gray-800">Top Places to Visit in {destinationData.name}</h2>
            {expandedSections.places ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
          </div>
          
          {expandedSections.places && (
            <>
              {selectedPlace && (
                <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/2 h-64 md:h-auto">
                      <img 
                        src={selectedPlace.image} 
                        alt={selectedPlace.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 md:w-1/2">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-2xl font-bold text-gray-800">{selectedPlace.name}</h3>
                        <button 
                          onClick={() => setSelectedPlace(null)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          ×
                        </button>
                      </div>
                      <div className="flex items-center mb-4">
                        {selectedPlace.rating && (
                          <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full mr-3">
                            <FiStar className="text-yellow-400 mr-1" />
                            <span className="font-medium">{selectedPlace.rating}</span>
                          </div>
                        )}
                        {selectedPlace.distance && (
                          <div className="flex items-center text-gray-600">
                            <FiMapPin className="mr-1" />
                            <span>{selectedPlace.distance}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-700 mb-4">{selectedPlace.description}</p>
                      <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                        View on Map
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(showAllPlaces ? destinationData.placesToVisit : destinationData.placesToVisit.slice(0,6)).map((place, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => handleViewPlaceDetails(place)}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={place.image} 
                        alt={place.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                        <h3 className="text-white font-bold text-lg">{place.name}</h3>
                      </div>
                      <button className="absolute top-3 right-3 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all">
                        <FiHeart className="text-gray-700" />
                      </button>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        {place.rating && (
                          <span className="flex items-center bg-yellow-50 px-2 py-1 rounded-full text-yellow-600 text-sm">
                            <FiStar className="mr-1" />
                            {place.rating}
                          </span>
                        )}
                        {place.distance && (
                          <span className="text-gray-500 text-sm flex items-center">
                            <FiMapPin className="mr-1" />
                            {place.distance}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-3 line-clamp-2">{place.description}</p>
                      <button 
                        className="text-yellow-600 font-medium flex items-center text-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewPlaceDetails(place);
                        }}
                      >
                        View details <FiChevronRight className="ml-1" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* View More Button */}
              {destinationData.placesToVisit.length > 6 && !showAllPlaces && (
                <div className="mt-8 text-center">
                  <button 
                    className="bg-white border border-yellow-600 text-yellow-600 px-6 py-3 rounded-lg font-medium hover:bg-yellow-50 transition-colors"
                    onClick={() => setShowAllPlaces(true)}
                  >
                    View More Places ({destinationData.placesToVisit.length - 6}+)
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        {/* Experiences Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => toggleSection('experiences')}>
            <h2 className="text-2xl font-bold text-gray-800">Experiences in {destinationData.name}</h2>
            {expandedSections.experiences ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
          </div>
          
          {expandedSections.experiences && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {destinationData.experiences.map((experience, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <FiCompass className="mr-2 text-yellow-600" />
                    {experience.type} Experiences
                  </h3>
                  <ul className="space-y-3">
                    {experience.activities.map((activity, idx) => (
                      <li key={idx} className="flex items-start bg-yellow-50 p-3 rounded-lg">
                        <span className="text-orange-500 mr-2">•</span>
                        <span className="text-gray-700">{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Culture & Nature Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => toggleSection('culture')}>
            <h2 className="text-2xl font-bold text-gray-800">Culture & Nature</h2>
            {expandedSections.culture ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
          </div>
          
          {expandedSections.culture && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <FiUsers className="mr-2 text-yellow-600" />
                  Cultural Highlights
                </h3>
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-3">Dzongs & Monasteries:</h4>
                  <div className="flex flex-wrap gap-2">
                    {destinationData.culture.dzongs.map((dzong, idx) => (
                      <span key={idx} className="bg-yellow-50 text-yellow-700 px-4 py-2 rounded-full text-sm font-medium">
                        {dzong}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-3">Festivals:</h4>
                  <div className="flex flex-wrap gap-2">
                    {destinationData.culture.festivals.map((festival, idx) => (
                      <span key={idx} className="bg-orange-50 text-orange-700 px-4 py-2 rounded-full text-sm font-medium">
                        {festival}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Local Cuisine:</h4>
                  <p className="text-gray-600 bg-yellow-50 p-4 rounded-lg">
                    Don't miss trying <span className="font-bold text-yellow-700">{destinationData.culture.localDish}</span>, a local specialty.
                  </p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <FiCompass className="mr-2 text-orange-500" />
                  Natural Wonders
                </h3>
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-3">Scenic Spots:</h4>
                  <div className="flex flex-wrap gap-2">
                    {destinationData.nature.scenicSpots.map((spot, idx) => (
                      <span key={idx} className="bg-yellow-50 text-yellow-700 px-4 py-2 rounded-full text-sm font-medium">
                        {spot}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-3">Trekking Routes:</h4>
                  <div className="flex flex-wrap gap-2">
                    {destinationData.nature.trekkingRoutes.map((route, idx) => (
                      <span key={idx} className="bg-orange-50 text-orange-700 px-4 py-2 rounded-full text-sm font-medium">
                        {route}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Wildlife:</h4>
                  <p className="text-gray-600 bg-yellow-50 p-4 rounded-lg">
                    Look out for <span className="font-bold text-yellow-700">{destinationData.nature.wildlife}</span> in their natural habitat.
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Practical Information Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => toggleSection('practical')}>
            <h2 className="text-2xl font-bold text-gray-800">Practical Information</h2>
            {expandedSections.practical ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
          </div>
          
          {expandedSections.practical && (
            <div className="bg-yellow-50 p-8 rounded-xl border border-yellow-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="font-bold text-lg mb-4 text-yellow-800 flex items-center">
                    <FiCompass className="mr-2" />
                    Getting There
                  </h3>
                  <ul className="space-y-3">
                    {destinationData.practicalInfo.transportation.map((item, idx) => (
                      <li key={idx} className="flex items-start bg-white p-3 rounded-lg">
                        <span className="text-yellow-500 mr-2">•</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-4 text-yellow-800 flex items-center">
                    <FiMapPin className="mr-2" />
                    Where to Stay
                  </h3>
                  <ul className="space-y-3">
                    {destinationData.practicalInfo.accommodation.map((item, idx) => (
                      <li key={idx} className="flex items-start bg-white p-3 rounded-lg">
                        <span className="text-yellow-500 mr-2">•</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-4 text-yellow-800 flex items-center">
                    <FiClock className="mr-2" />
                    Travel Tips
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start bg-white p-3 rounded-lg">
                      <span className="text-yellow-500 mr-2">•</span>
                      <span className="text-gray-700">Carry warm clothing as evenings can be chilly</span>
                    </li>
                    <li className="flex items-start bg-white p-3 rounded-lg">
                      <span className="text-yellow-500 mr-2">•</span>
                      <span className="text-gray-700">Respect local customs at religious sites</span>
                    </li>
                    <li className="flex items-start bg-white p-3 rounded-lg">
                      <span className="text-yellow-500 mr-2">•</span>
                      <span className="text-gray-700">Book accommodations in advance during festival seasons</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default DestinationPage;