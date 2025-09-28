import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import popularDestination from '../../data/popularDestination.json';
import { FiMapPin, FiSearch, FiFilter, FiStar } from 'react-icons/fi';
import { FaPrayingHands, FaMountain, FaBuilding } from 'react-icons/fa';
import { getTheme } from '../../styles/themes';

const SacredPlacesIndex = () => {
  // Get unified theme
  const theme = getTheme();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');

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
        dzongkhag: dzongkhag.name,
        dzongkhagSlug: dzongkhag.slug,
        region: dzongkhag.location.region,
        type: getPlaceType(place.name)
      }))
    );
  }, []);

  function getPlaceType(name: string): string {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('dzong')) return 'dzong';
    if (lowerName.includes('lhakhang') || lowerName.includes('temple')) return 'temple';
    if (lowerName.includes('monastery') || lowerName.includes('goenpa')) return 'monastery';
    if (lowerName.includes('chorten')) return 'chorten';
    return 'other';
  }

  const filteredPlaces = allSacredPlaces.filter((place: any) => {
    const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         place.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         place.dzongkhag.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || place.type === selectedType;
    const matchesRegion = selectedRegion === 'all' || place.region === selectedRegion;
    
    return matchesSearch && matchesType && matchesRegion;
  });

  const regions = Array.from(new Set(popularDestination.map((d: any) => d.location.region)));
  const types = Array.from(new Set(allSacredPlaces.map((p: any) => p.type)));

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
          <div className="absolute inset-0 bg-black opacity-20"></div>
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
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search sacred places, dzongs, monasteries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Type Filter */}
              <div className="relative">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="dzong">Dzongs</option>
                  <option value="monastery">Monasteries</option>
                  <option value="temple">Temples/Lhakhangs</option>
                  <option value="chorten">Chortens</option>
                  <option value="other">Other Sacred Sites</option>
                </select>
                <FiFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              {/* Region Filter */}
              <div className="relative">
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="all">All Regions</option>
                  {regions.map((region: string) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
                <FiMapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Results count */}
            <div className="mt-4 text-gray-600">
              Showing {filteredPlaces.length} sacred places
              {searchTerm && ` matching "${searchTerm}"`}
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
                        {typeIcons[place.type]}
                        <span className="ml-2 text-sm font-medium text-gray-600 capitalize">{place.type}</span>
                      </div>
                      {place.rating && (
                        <div className="flex items-center">
                          <FiStar className="text-yellow-400 w-4 h-4 mr-1" />
                          <span className="text-sm text-gray-600">{place.rating}</span>
                        </div>
                      )}
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
                    
                    <Link href={`/dzongkhag/${place.dzongkhagSlug}`} className="mt-auto">
                      <button className="w-full bg-gradient-to-br from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200">
                        Explore {place.dzongkhag}
                      </button>
                    </Link>
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
