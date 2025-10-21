import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import popularDestination from '../../data/popularDestination.json';
import { FiMapPin, FiSearch } from 'react-icons/fi';
import { FaPrayingHands, FaMountain, FaBuilding } from 'react-icons/fa';
import { getTheme } from '../../styles/themes';

const SacredPlacesIndex = () => {
  // Get unified theme
  const theme = getTheme();
  
  const [searchTerm, setSearchTerm] = useState('');

  // Extract all sacred places from all dzongkhags
  const allSacredPlaces = popularDestination.reduce((acc: any[], dzongkhag: any) => {
    const sacredPlacesInDzongkhag = dzongkhag.placesToVisit?.filter((place: any) => 
      place.name.toLowerCase().includes('dzong') || 
      place.name.toLowerCase().includes('lhakhang') ||
      place.name.toLowerCase().includes('monastery') ||
      place.name.toLowerCase().includes('temple') ||
      place.name.toLowerCase().includes('chorten') ||
      place.name.toLowerCase().includes('goenpa')
    ) || [];

    return acc.concat(
      sacredPlacesInDzongkhag.map((place: any) => ({
        ...place,
        slug: place.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        dzongkhag: dzongkhag.name,
        dzongkhagSlug: dzongkhag.slug,
        region: dzongkhag.location.region
      }))
    );
  }, []);

  const filteredPlaces = allSacredPlaces.filter((place: any) => {
    const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         place.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         place.dzongkhag.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const typeIcons = {
    dzong: <FaBuilding className="text-lg text-gray-600" />,
    monastery: <FaPrayingHands className="text-lg text-gray-600" />,
    temple: <FaPrayingHands className="text-lg text-gray-600" />,
    lhakhang: <FaPrayingHands className="text-lg text-gray-600" />,
    chorten: <div className="w-4 h-4 bg-orange-500 rounded-full"></div>,
    stupa: <div className="w-4 h-4 bg-orange-500 rounded-full"></div>,
    palace: <FaBuilding className="text-lg text-gray-600" />,
    fortress: <FaBuilding className="text-lg text-gray-600" />,
  };  return (
    <>
      <Head>
        <title>Heritage Places in Bhutan | Complete Guide to Dzongs, Monasteries & Temples</title>
        <meta 
          name="description" 
          content="Discover Bhutan's most significant heritage places including ancient dzongs, monasteries, lhakhangs, and chortens. Comprehensive guide to cultural sites across all 20 dzongkhags with detailed descriptions and travel information."
        />
        <meta 
          name="keywords" 
          content="Bhutan sacred places, dzongs Bhutan, monasteries Bhutan, lhakhangs Bhutan, Buddhist temples Bhutan, chortens Bhutan, spiritual sites Bhutan, religious tourism Bhutan, Tiger's Nest Monastery, Paro Taktsang"
        />
        <meta property="og:title" content="Sacred Places in Bhutan - Complete Guide to Spiritual Sites" />
        <meta property="og:description" content="Explore Bhutan's sacred dzongs, monasteries, and temples. Your complete guide to spiritual sites across the Kingdom of Bhutan." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.doortohappinessholiday.com/sacred-places" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelGuide",
            "name": "Sacred Places of Bhutan Guide",
            "description": "Complete guide to sacred places in Bhutan including dzongs, monasteries, and temples",
            "about": {
              "@type": "Place",
              "name": "Bhutan Sacred Sites"
            },
            "author": {
              "@type": "Organization",
              "name": "Door To Happiness Holiday"
            }
          })}
        </script>
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-orange-500 to-yellow-400 py-24">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
             <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Heritage Places of Bhutan
            </h1>
            <p className="text-xl text-white opacity-90 mb-8">
              Journey through the cultural landscape of the Thunder Dragon Kingdom. Discover ancient dzongs, monasteries, and temples that have guided Bhutanese Buddhism for centuries.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
              <span className="bg-orange-500 bg-opacity-50 px-4 py-2 rounded-full">{allSacredPlaces.length}+ Heritage Sites</span>
              <span className="bg-orange-500 bg-opacity-50 px-4 py-2 rounded-full">20 Dzongkhags</span>
              <span className="bg-orange-500 bg-opacity-50 px-4 py-2 rounded-full">1000+ Years of History</span>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white shadow-md sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
            <div className="flex justify-center">
              {/* Search */}
              <div className="relative w-full max-w-2xl">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400" />
                <input
                  type="text"
                  placeholder="Search sacred places, dzongs, monasteries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-300 text-base bg-white hover:border-orange-300 transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sacred Places Grid */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {filteredPlaces.length === 0 ? (
            <div className="text-center py-16">
              <FaPrayingHands className="text-6xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No sacred places found</h3>
              <p className="text-gray-500">Try adjusting your search terms or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPlaces.map((place: any, index: number) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                  {place.image && (
                    <div className="h-48 overflow-hidden flex-shrink-0">
                      <img 
                        src={place.image} 
                        alt={place.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  )}
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        {typeIcons[place.type as keyof typeof typeIcons] || typeIcons.temple}
                        <span className="ml-2 text-sm font-medium text-gray-600 capitalize">{place.type}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{place.name}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3 flex-grow min-h-[4.5rem]">{place.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <FiMapPin className="mr-2 flex-shrink-0" />
                        <span>{place.dzongkhag} Dzongkhag, {place.region}</span>
                      </div>
                      {place.distance && (
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="mr-2">📍</span>
                          <span>{place.distance} from district center</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <Link href={`/sacred-places/${place.slug}`} className="flex-1">
                        <button className="w-full bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-2 px-3 sm:px-4 rounded-lg transition-all duration-200 min-h-[40px] flex items-center justify-center text-sm shadow-md hover:shadow-lg">
                          Read More
                        </button>
                      </Link>
                      <Link href={`/dzongkhag/${place.dzongkhagSlug}`} className="flex-1">
                        <button className="w-full bg-gradient-to-br from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-semibold py-2 px-3 sm:px-4 rounded-lg transition-all duration-200 min-h-[40px] flex items-center justify-center text-center leading-tight text-sm overflow-hidden shadow-md hover:shadow-lg">
                          <span className="truncate whitespace-nowrap max-w-full">
                            {place.dzongkhag.length > 15 ? `${place.dzongkhag.substring(0, 12)}...` : `Explore ${place.dzongkhag}`}
                          </span>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SEO Content Section */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Sacred Architecture of Bhutan</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <FaMountain className="mr-2 text-orange-500" />
                    Dzongs - Fortress Monasteries
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Bhutan's dzongs are architectural masterpieces that serve as both administrative centers and monasteries. These massive fortified structures, built without a single nail, represent the pinnacle of traditional Bhutanese architecture and house both government offices and monastic communities.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <FaBuilding className="mr-2 text-blue-500" />
                    Lhakhangs - Sacred Temples
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Lhakhangs are the sacred temples of Bhutan, often housing precious statues, ancient scriptures, and religious artifacts. These temples serve as centers for daily prayers, religious festivals, and spiritual guidance for local communities across all dzongkhags.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <FaPrayingHands className="mr-2 text-orange-500" />
                    Gompas - Monasteries
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Monasteries or gompas are the spiritual heart of Buddhist practice in Bhutan. These institutions preserve ancient teachings, train monks, and serve as centers for meditation and religious study. Each dzongkhag has several important gompas that contribute to the spiritual landscape.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <div className="w-5 h-5 bg-orange-500 rounded-full mr-2"></div>
                    Chortens - Sacred Stupas
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Chortens are Buddhist stupas found throughout Bhutan's landscape. These sacred structures contain relics and serve as focal points for circumambulation and prayers. They mark sacred spaces and provide spiritual protection for communities in every dzongkhag.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SacredPlacesIndex;
