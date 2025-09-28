import React, { useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import popularDestination from '../../data/popularDestination.json';
import { 
  FiMapPin, 
  FiStar, 
  FiCalendar, 
  FiClock, 
  FiUsers, 
  FiChevronRight,
  FiCompass,
  FiCamera,
  FiHeart,
  FiShare2,
  FiChevronDown,
  FiChevronUp,
  FiHome
} from 'react-icons/fi';
import { FaMountain, FaTree, FaPrayingHands } from 'react-icons/fa';

interface DzongkhagPageProps {
  dzongkhag: any;
  relatedDzongkhags: any[];
}

const DzongkhagPage: React.FC<DzongkhagPageProps> = ({ dzongkhag, relatedDzongkhags }) => {
  const [showAllPlaces, setShowAllPlaces] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [expandedSections, setExpandedSections] = useState({
    overview: true,
    places: true,
    culture: true,
    nature: true,
    practical: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }));
  };

  const sacredPlaces = dzongkhag.placesToVisit?.filter((place: any) => 
    place.name.toLowerCase().includes('dzong') || 
    place.name.toLowerCase().includes('lhakhang') ||
    place.name.toLowerCase().includes('monastery') ||
    place.name.toLowerCase().includes('temple') ||
    place.name.toLowerCase().includes('chorten') ||
    place.name.toLowerCase().includes('goenpa') ||
    place.name.toLowerCase().includes('stupa') ||
    place.name.toLowerCase().includes('palace') ||
    place.name.toLowerCase().includes('fortress') ||
    (place.type && ['dzong', 'monastery', 'temple', 'lhakhang', 'chorten', 'stupa', 'palace', 'fortress'].includes(place.type.toLowerCase()))
  ) || [];

  const culturalPlaces = dzongkhag.placesToVisit?.filter((place: any) => 
    !sacredPlaces.includes(place)
  ) || [];

  const displayedPlaces = showAllPlaces ? dzongkhag.placesToVisit : dzongkhag.placesToVisit?.slice(0, 6);

  return (
    <>
      <Head>
        <title>{dzongkhag.name} Dzongkhag Guide | Places to Visit, Dzongs & Monasteries in {dzongkhag.name}</title>
        <meta 
          name="description" 
          content={`Complete travel guide to ${dzongkhag.name} dzongkhag in ${dzongkhag.location.region}. Discover dzongs, monasteries, cultural sites, and experiences in ${dzongkhag.name}, Bhutan.`}
        />
        <meta 
          name="keywords" 
          content={`${dzongkhag.name} dzongkhag, ${dzongkhag.name} Bhutan, ${dzongkhag.culture.dzongs.join(', ')}, ${dzongkhag.highlights.join(', ')}, ${dzongkhag.location.region}, sacred places ${dzongkhag.name}, monasteries ${dzongkhag.name}`}
        />
        <meta property="og:title" content={`${dzongkhag.name} Dzongkhag - Sacred Places & Cultural Heritage | Bhutan`} />
        <meta property="og:description" content={`Explore ${dzongkhag.name} dzongkhag's sacred sites, ancient dzongs, and monasteries. ${dzongkhag.description}`} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={dzongkhag.images?.[0] || '/logo.png'} />
        <link rel="canonical" href={`https://www.doortohappinessholiday.com/dzongkhag/${dzongkhag.slug}`} />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristDestination",
            "name": `${dzongkhag.name} Dzongkhag`,
            "description": dzongkhag.description,
            "image": dzongkhag.images || ['/logo.png'],
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": dzongkhag.location.coordinates.lat,
              "longitude": dzongkhag.location.coordinates.lng
            },
            "containedInPlace": {
              "@type": "Country",
              "name": "Bhutan"
            },
            "touristType": ["Cultural Tourism", "Religious Tourism", "Adventure Tourism"],
            "hasMap": `https://www.google.com/maps?q=${dzongkhag.location.coordinates.lat},${dzongkhag.location.coordinates.lng}`,
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": dzongkhag.rating,
              "bestRating": "5"
            }
          })}
        </script>
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb Navigation */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-orange-600 flex items-center">
                <FiHome className="mr-1" /> Home
              </Link>
              <FiChevronRight className="text-gray-400" />
              <Link href="/dzongkhag" className="hover:text-orange-600">
                Dzongkhags
              </Link>
              <FiChevronRight className="text-gray-400" />
              <Link href={`/dzongkhag/${dzongkhag.slug}`} className="hover:text-orange-600">
                {dzongkhag.location.region}
              </Link>
              <FiChevronRight className="text-gray-400" />
              <span className="text-gray-900 font-medium">{dzongkhag.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative h-96 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={dzongkhag.images?.[0] || '/backgroundbanner.png'}
              alt={`${dzongkhag.name} dzongkhag landscape`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40" />
          </div>
          
          <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {dzongkhag.name} Dzongkhag
              </h1>
              <p className="text-xl md:text-2xl mb-2">{dzongkhag.tagline}</p>
              <p className="text-lg mb-6 max-w-3xl mx-auto">{dzongkhag.description}</p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <div className="bg-orange-600 bg-opacity-80 px-4 py-2 rounded-full flex items-center">
                  <FiMapPin className="mr-2" />
                  <span>{dzongkhag.location.region}</span>
                </div>
                <div className="bg-yellow-600 bg-opacity-80 px-4 py-2 rounded-full flex items-center">
                  <FiStar className="mr-2" />
                  <span>{dzongkhag.rating} Rating</span>
                </div>
                <div className="bg-orange-500 bg-opacity-80 px-4 py-2 rounded-full flex items-center">
                  <FaPrayingHands className="mr-2" />
                  <span>{sacredPlaces.length} Heritage Sites</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Quick Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="text-3xl font-bold text-orange-600">{dzongkhag.culture.dzongs.length}</div>
              <div className="text-gray-600">Historic Dzongs</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="text-3xl font-bold text-yellow-600">{sacredPlaces.length}</div>
              <div className="text-gray-600">Heritage Sites</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="text-3xl font-bold text-orange-500">{dzongkhag.highlights.length}</div>
              <div className="text-gray-600">Key Highlights</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="text-3xl font-bold text-orange-600">{dzongkhag.placesToVisit?.length || 0}</div>
              <div className="text-gray-600">Places to Visit</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview Section */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">About {dzongkhag.name} Dzongkhag</h2>
                  <button 
                    onClick={() => toggleSection('overview')}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {expandedSections.overview ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                </div>
                
                {expandedSections.overview && (
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">{dzongkhag.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Location:</h4>
                        <p className="text-gray-600">{dzongkhag.location.region}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Nearby Dzongkhags:</h4>
                        <p className="text-gray-600">{dzongkhag.location.nearbyDzongkhags.join(', ')}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Heritage Places Section */}
              {/* Heritage Places & Dzongs Section - Show all places temporarily */}
              {dzongkhag.placesToVisit && dzongkhag.placesToVisit.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                      <FaPrayingHands className="mr-3 text-orange-500" />
                      Heritage Places & Attractions ({dzongkhag.placesToVisit.length})
                    </h2>
                    <button 
                      onClick={() => toggleSection('places')}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {expandedSections.places ? <FiChevronUp /> : <FiChevronDown />}
                    </button>
                  </div>
                  
                  {expandedSections.places && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {dzongkhag.placesToVisit.map((place: any, index: number) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow flex flex-col h-full">
                            <div className="flex items-start justify-between mb-3">
                              <h3 className="font-semibold text-gray-900 text-lg">{place.name}</h3>
                              {place.rating && (
                                <div className="flex items-center text-yellow-500 flex-shrink-0 ml-2">
                                  <FiStar className="w-4 h-4 mr-1 fill-current" />
                                  <span className="text-sm text-gray-600">{place.rating}</span>
                                </div>
                              )}
                            </div>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{place.description}</p>
                            {place.image && (
                              <img 
                                src={place.image} 
                                alt={place.name}
                                className="w-full h-32 object-cover rounded-md mb-3"
                                loading="lazy"
                              />
                            )}
                            {place.distance && (
                              <p className="text-orange-600 text-sm font-medium mb-3">📍 {place.distance} from center</p>
                            )}
                            <Link href={`/attractions/${place.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`} className="mt-auto">
                              <button className="w-full bg-gradient-to-br from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200">
                                View Details
                              </button>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Cultural Heritage Section */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Cultural Heritage</h2>
                  <button 
                    onClick={() => toggleSection('culture')}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {expandedSections.culture ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                </div>
                
                {expandedSections.culture && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                          <FaMountain className="mr-2 text-orange-500" />
                          Dzongs & Monasteries:
                        </h4>
                        <ul className="space-y-2">
                          {dzongkhag.culture.dzongs.map((dzong: string, idx: number) => (
                            <li key={idx} className="text-gray-600 flex items-center">
                              <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                              {dzong}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 mb-3">Festivals:</h4>
                        <ul className="space-y-2">
                          {dzongkhag.culture.festivals.map((festival: string, idx: number) => (
                            <li key={idx} className="text-gray-600 flex items-center">
                              <FiCalendar className="w-4 h-4 mr-2 text-yellow-500" />
                              {festival}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 mb-3">Local Specialty:</h4>
                        <p className="text-gray-600">{dzongkhag.culture.localDish}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Natural Attractions */}
              {dzongkhag.nature && (
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                      <FaTree className="mr-3 text-orange-500" />
                      Natural Wonders
                    </h2>
                    <button 
                      onClick={() => toggleSection('nature')}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {expandedSections.nature ? <FiChevronUp /> : <FiChevronDown />}
                    </button>
                  </div>
                  
                  {expandedSections.nature && dzongkhag.nature && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {dzongkhag.nature.trekkingRoutes && (
                        <div>
                          <h4 className="font-medium text-gray-700 mb-3">Trekking Routes:</h4>
                          <ul className="space-y-2">
                            {dzongkhag.nature.trekkingRoutes.map((route: string, idx: number) => (
                              <li key={idx} className="text-gray-600 flex items-center">
                                <FaMountain className="w-4 h-4 mr-2 text-orange-500" />
                                {route}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <div>
                        <h4 className="font-medium text-gray-700 mb-3">Wildlife & Scenery:</h4>
                        {dzongkhag.nature.wildlife && (
                          <p className="text-gray-600 mb-2">🐾 {dzongkhag.nature.wildlife}</p>
                        )}
                        {dzongkhag.nature.scenicSpots && (
                          <ul className="space-y-1">
                            {dzongkhag.nature.scenicSpots.map((spot: string, idx: number) => (
                              <li key={idx} className="text-gray-600">🏞️ {spot}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Location Info */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold mb-4">Location Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 font-medium">Region</span>
                    <span className="text-sm font-medium text-gray-700">{dzongkhag.location.region}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 font-medium">Rating</span>
                    <div className="flex items-center">
                      <FiStar className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium text-gray-700">{dzongkhag.rating}/5</span>
                    </div>
                  </div>
                  <div className="pt-3 border-t">
                    <p className="text-sm text-gray-500 font-medium mb-2">Coordinates</p>
                    <p className="text-xs text-gray-600">
                      {dzongkhag.location.coordinates.lat}°N, {dzongkhag.location.coordinates.lng}°E
                    </p>
                  </div>
                </div>
                
                <Link href={`https://www.google.com/maps?q=${dzongkhag.location.coordinates.lat},${dzongkhag.location.coordinates.lng}`}>
                  <button className="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                    View on Map
                  </button>
                </Link>
              </div>

              {/* Key Highlights */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold mb-4">Key Highlights</h3>
                <div className="space-y-2">
                  {dzongkhag.highlights.map((highlight: string, index: number) => (
                    <div key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                      <span className="text-sm text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Dzongkhags */}
              {relatedDzongkhags.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-bold mb-4">Nearby Dzongkhags</h3>
                  <div className="space-y-3">
                    {relatedDzongkhags.map((related: any) => (
                      <Link key={related.id} href={`/dzongkhag/${related.slug}`}>
                        <div className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900">{related.name}</h4>
                            <p className="text-xs text-gray-500">{related.tagline}</p>
                          </div>
                          <FiChevronRight className="text-gray-400" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = popularDestination.map((dzongkhag: any) => ({
    params: { slug: dzongkhag.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const dzongkhag = popularDestination.find((d: any) => d.slug === slug);

  if (!dzongkhag) {
    return {
      notFound: true,
    };
  }

  // Find related dzongkhags in the same region
  const relatedDzongkhags = popularDestination
    .filter((d: any) => 
      d.location.region === dzongkhag.location.region && 
      d.id !== dzongkhag.id
    )
    .slice(0, 3);

  return {
    props: {
      dzongkhag,
      relatedDzongkhags,
    },
  };
};

export default DzongkhagPage;
