import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import popularDestination from '../../data/popularDestination.json';
import { FiMapPin, FiUsers, FiCompass, FiChevronRight } from 'react-icons/fi';
import { FaMountain } from 'react-icons/fa';

const DzongkhagIndex = () => {
  const dzongkhags = popularDestination;

  const regions = {
    'Western Bhutan': dzongkhags.filter(d => d.location.region === 'Western Bhutan'),
    'Central Bhutan': dzongkhags.filter(d => d.location.region === 'Central Bhutan'),
    'Eastern Bhutan': dzongkhags.filter(d => d.location.region === 'Eastern Bhutan'),
    'Southern Bhutan': dzongkhags.filter(d => d.location.region === 'Southern Bhutan')
  };

  return (
    <>
      <Head>
        <title>Complete Guide to Bhutan's 20 Dzongkhags (Districts) | Cultural Heritage & Travel</title>
        <meta 
          name="description" 
          content="Comprehensive guide to all 20 dzongkhags of Bhutan. Explore dzongs, monasteries, and cultural heritage sites in each district. Plan your journey through the Land of the Thunder Dragon."
        />
        <meta 
          name="keywords" 
          content="Bhutan dzongkhags, Bhutan districts, dzong Bhutan, sacred places Bhutan, monasteries Bhutan, Bhutan cultural heritage, Thimphu dzongkhag, Paro dzongkhag, Punakha dzongkhag, traditional architecture Bhutan"
        />
        <meta property="og:title" content="Complete Guide to Bhutan's 20 Dzongkhags - Sacred Places & Cultural Heritage" />
        <meta property="og:description" content="Discover the sacred places, dzongs, and monasteries in all 20 dzongkhags of Bhutan. Your ultimate guide to Bhutan's cultural and spiritual heritage." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.doortohappinessholiday.com/dzongkhag" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelGuide",
            "name": "Bhutan Dzongkhags Guide",
            "description": "Complete guide to Bhutan's 20 administrative districts (dzongkhags) and their sacred places",
            "about": {
              "@type": "Place",
              "name": "Bhutan",
              "description": "The Kingdom of Bhutan and its 20 dzongkhags"
            },
            "author": {
              "@type": "Organization",
              "name": "Door To Happiness Holiday"
            }
          })}
        </script>
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-24">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Bhutan's 20 Dzongkhags
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
              Discover the cultural heart of the Thunder Dragon Kingdom through its 20 administrative districts, each home to ancient dzongs, monasteries, and timeless traditions.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
              <span className="bg-blue-500 bg-opacity-50 px-4 py-2 rounded-full">20 Dzongkhags</span>
              <span className="bg-blue-500 bg-opacity-50 px-4 py-2 rounded-full">200+ Heritage Sites</span>
              <span className="bg-blue-500 bg-opacity-50 px-4 py-2 rounded-full">Traditional Architecture</span>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Bhutan's Dzongkhags</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Bhutan is divided into 20 <strong>dzongkhags</strong> (districts), each serving as both administrative and spiritual centers. The word "dzongkhag" literally means "dzong district," highlighting the central role these fortress-monasteries play in Bhutanese governance and religious life.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Each dzongkhag contains numerous heritage sites including <strong>dzongs</strong>, <strong>lhakhangs</strong> (temples), <strong>gompas</strong> (monasteries), and <strong>chortens</strong> (stupas) that represent centuries of Buddhist tradition and architectural mastery.
            </p>
          </div>
        </div>

        {/* Regional Breakdown */}
        {Object.entries(regions).map(([regionName, dzongkhagList]) => (
          <div key={regionName} className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              {regionName}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {dzongkhagList.map((dzongkhag: any) => (
                <div key={dzongkhag.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                  <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 relative overflow-hidden flex-shrink-0">
                    {dzongkhag.images && dzongkhag.images[0] && (
                      <img 
                        src={dzongkhag.images[0]} 
                        alt={`${dzongkhag.name} dzongkhag`}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {dzongkhag.tagline}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center bg-white bg-opacity-90 px-2 py-1 rounded-full">
                        <span className="text-yellow-500 mr-1">⭐</span>
                        <span className="text-sm font-semibold">{dzongkhag.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-3 text-gray-900">{dzongkhag.name} Dzongkhag</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3 flex-grow min-h-[4.5rem]">{dzongkhag.description}</p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-sm text-gray-600">
                        <FiMapPin className="mr-2 text-blue-500 flex-shrink-0" />
                        <span>{dzongkhag.location.region}</span>
                      </div>
                      
                      {dzongkhag.culture.dzongs.length > 0 && (
                        <div className="flex items-center text-sm text-gray-600">
                          <FaMountain className="mr-2 text-green-500 flex-shrink-0" />
                          <span>{dzongkhag.culture.dzongs.length} Historic Dzongs</span>
                        </div>
                      )}
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <FiCompass className="mr-2 text-purple-500 flex-shrink-0" />
                        <span>{dzongkhag.highlights.length} Key Highlights</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Top Highlights:</h4>
                      <div className="flex flex-wrap gap-1">
                        {dzongkhag.highlights.slice(0, 3).map((highlight: string) => (
                          <span key={highlight} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                            {highlight}
                          </span>
                        ))}
                        {dzongkhag.highlights.length > 3 && (
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                            +{dzongkhag.highlights.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    <Link href={`/dzongkhag/${dzongkhag.slug}`} className="mt-auto">
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center">
                        Explore District
                        <FiChevronRight className="ml-2" />
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* SEO Rich Content Section */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">20</div>
                <div className="text-gray-700">Dzongkhags (Districts)</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">200+</div>
                <div className="text-gray-700">Heritage Sites</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
                <div className="text-gray-700">Ancient Dzongs</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">1000+</div>
                <div className="text-gray-700">Years of History</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DzongkhagIndex;
