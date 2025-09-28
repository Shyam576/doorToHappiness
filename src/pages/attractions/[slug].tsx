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
  FiChevronRight,
  FiHome,
  FiShare2,
  FiHeart,
  FiCamera,
  FiInfo,
  FiNavigation
} from 'react-icons/fi';
import { FaMountain, FaTree, FaPrayingHands, FaBuilding } from 'react-icons/fa';
import { getTheme } from '../../styles/themes';

interface AttractionPageProps {
  place: any;
  dzongkhag: any;
  relatedPlaces: any[];
}

const AttractionPage: React.FC<AttractionPageProps> = ({ place, dzongkhag, relatedPlaces }) => {
  const theme = getTheme();
  const [selectedImage, setSelectedImage] = useState(0);

  // Determine attraction type and icon
  const getAttractionType = (place: any) => {
    const name = place.name.toLowerCase();
    if (name.includes('dzong')) return { type: 'Dzong', icon: <FaBuilding className="text-orange-600" /> };
    if (name.includes('monastery') || name.includes('lhakhang')) return { type: 'Monastery', icon: <FaPrayingHands className="text-orange-600" /> };
    if (name.includes('temple')) return { type: 'Temple', icon: <FaPrayingHands className="text-orange-600" /> };
    if (name.includes('valley') || name.includes('lake')) return { type: 'Natural Attraction', icon: <FaTree className="text-orange-600" /> };
    if (name.includes('village') || name.includes('town')) return { type: 'Village/Town', icon: <FiHome className="text-orange-600" /> };
    if (name.includes('trail') || name.includes('hike')) return { type: 'Trail', icon: <FaMountain className="text-orange-600" /> };
    if (name.includes('viewpoint') || name.includes('view')) return { type: 'Viewpoint', icon: <FiCamera className="text-orange-600" /> };
    return { type: 'Attraction', icon: <FiNavigation className="text-orange-600" /> };
  };

  const attractionInfo = getAttractionType(place);
  const images = place.images || [place.image].filter(Boolean);

  return (
    <>
      <Head>
        <title>{place.name} - {dzongkhag.name} Attraction | Door to Happiness</title>
        <meta name="description" content={place.description} />
        <meta property="og:title" content={`${place.name} - ${dzongkhag.name} Attraction`} />
        <meta property="og:description" content={place.description} />
        <meta property="og:image" content={place.image || '/backgroundbanner.png'} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={`https://www.doortohappinessholiday.com/attractions/${place.slug}`} />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
        {/* Breadcrumb Navigation */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-orange-600 flex items-center">
                <FiHome className="mr-1" /> Home
              </Link>
              <FiChevronRight className="text-gray-400" />
              <Link href={`/dzongkhag/${dzongkhag.slug}`} className="hover:text-orange-600">
                {dzongkhag.name}
              </Link>
              <FiChevronRight className="text-gray-400" />
              <span className="text-gray-900 font-medium">{place.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative h-96 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={place.image || '/backgroundbanner.png'}
              alt={`${place.name} attraction`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30" />
          </div>
          
          <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">
            <div>
              <div className="flex items-center justify-center mb-4">
                {attractionInfo.icon}
                <span className="ml-2 text-lg font-medium bg-orange-600 bg-opacity-80 px-3 py-1 rounded-full">
                  {attractionInfo.type}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{place.name}</h1>
              <p className="text-xl md:text-2xl mb-6">{dzongkhag.name} Dzongkhag</p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <div className="bg-orange-600 bg-opacity-80 px-4 py-2 rounded-full flex items-center">
                  <FiMapPin className="mr-2" />
                  <span>{dzongkhag.location.region}</span>
                </div>
                {place.rating && (
                  <div className="bg-yellow-600 bg-opacity-80 px-4 py-2 rounded-full flex items-center">
                    <FiStar className="mr-2" />
                    <span>{place.rating} Rating</span>
                  </div>
                )}
                {place.distance && (
                  <div className="bg-orange-500 bg-opacity-80 px-4 py-2 rounded-full flex items-center">
                    <FiMapPin className="mr-2" />
                    <span>{place.distance}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About Section */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">About {place.name}</h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {place.description}
                  </p>
                  
                  {place.history && (
                    <>
                      <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Historical Background</h3>
                      <p className="text-gray-700 leading-relaxed">
                        {place.history}
                      </p>
                    </>
                  )}
                  
                  {place.significance && (
                    <>
                      <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Significance</h3>
                      <p className="text-gray-700 leading-relaxed">
                        {place.significance}
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* What to Expect */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  {attractionInfo.icon}
                  <span className="ml-3">What to Expect</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-3">Experience:</h4>
                    <ul className="space-y-2 text-gray-600">
                      {attractionInfo.type === 'Natural Attraction' && (
                        <>
                          <li>• Scenic natural beauty</li>
                          <li>• Photography opportunities</li>
                          <li>• Wildlife spotting</li>
                          <li>• Nature walks and hiking</li>
                        </>
                      )}
                      {attractionInfo.type === 'Village/Town' && (
                        <>
                          <li>• Traditional Bhutanese culture</li>
                          <li>• Local community interaction</li>
                          <li>• Traditional architecture</li>
                          <li>• Local handicrafts and food</li>
                        </>
                      )}
                      {(attractionInfo.type === 'Dzong' || attractionInfo.type === 'Monastery' || attractionInfo.type === 'Temple') && (
                        <>
                          <li>• Sacred architecture</li>
                          <li>• Buddhist art and sculptures</li>
                          <li>• Spiritual atmosphere</li>
                          <li>• Cultural ceremonies</li>
                        </>
                      )}
                      {attractionInfo.type === 'Trail' && (
                        <>
                          <li>• Hiking and trekking</li>
                          <li>• Mountain views</li>
                          <li>• Physical challenge</li>
                          <li>• Connection with nature</li>
                        </>
                      )}
                      {attractionInfo.type === 'Viewpoint' && (
                        <>
                          <li>• Panoramic views</li>
                          <li>• Photography paradise</li>
                          <li>• Sunrise/sunset viewing</li>
                          <li>• Peaceful meditation spot</li>
                        </>
                      )}
                      {attractionInfo.type === 'Attraction' && (
                        <>
                          <li>• Unique local experience</li>
                          <li>• Cultural insights</li>
                          <li>• Educational opportunity</li>
                          <li>• Memorable adventure</li>
                        </>
                      )}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700 mb-3">Tips for Visitors:</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Respect local customs and traditions</li>
                      <li>• Dress modestly and appropriately</li>
                      <li>• Bring appropriate gear for weather</li>
                      <li>• Follow designated paths and guidelines</li>
                      <li>• Support local communities</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold mb-4">Quick Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 font-medium">Type</span>
                    <span className="text-sm font-medium text-gray-700">{attractionInfo.type}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 font-medium">Location</span>
                    <span className="text-sm font-medium text-gray-700">{dzongkhag.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 font-medium">Region</span>
                    <span className="text-sm font-medium text-gray-700">{dzongkhag.location.region}</span>
                  </div>
                  {place.rating && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 font-medium">Rating</span>
                      <div className="flex items-center">
                        <FiStar className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium text-gray-700">{place.rating}/5</span>
                      </div>
                    </div>
                  )}
                  {place.distance && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 font-medium">Distance</span>
                      <span className="text-sm font-medium text-gray-700">{place.distance}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Visit Dzongkhag */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold mb-4">Explore More in {dzongkhag.name}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Discover other attractions and places to visit in {dzongkhag.name} Dzongkhag.
                </p>
                <Link href={`/dzongkhag/${dzongkhag.slug}`}>
                  <button className={`w-full ${theme.primary} ${theme.primaryHover} text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200`}>
                    Explore {dzongkhag.name}
                  </button>
                </Link>
              </div>

              {/* Related Places */}
              {relatedPlaces.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-bold mb-4">Nearby Attractions</h3>
                  <div className="space-y-4">
                    {relatedPlaces.map((relatedPlace: any) => (
                      <Link key={relatedPlace.slug} href={`/attractions/${relatedPlace.slug}`}>
                        <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                          {relatedPlace.image && (
                            <img 
                              src={relatedPlace.image} 
                              alt={relatedPlace.name}
                              className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                            />
                          )}
                          <div className="flex-grow min-w-0">
                            <h4 className="font-medium text-gray-900 text-sm line-clamp-1">{relatedPlace.name}</h4>
                            <p className="text-gray-500 text-xs">{getAttractionType(relatedPlace).type}</p>
                            {relatedPlace.distance && (
                              <p className="text-gray-500 text-xs">{relatedPlace.distance}</p>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Back to Dzongkhag */}
        <div className="bg-gradient-to-r from-orange-500 to-yellow-400 py-12 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">
              Explore More of {dzongkhag.name}
            </h2>
            <p className="text-xl text-white mb-8">
              Discover more attractions, heritage sites, and experiences in this beautiful dzongkhag
            </p>
            <Link href={`/dzongkhag/${dzongkhag.slug}`}>
              <button className="bg-white text-orange-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-colors">
                View All Attractions
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPlaces: any[] = [];
  
  // Extract all places from all dzongkhags
  popularDestination.forEach((dzongkhag: any) => {
    if (dzongkhag.placesToVisit) {
      dzongkhag.placesToVisit.forEach((place: any) => {
        // Create a slug for the place
        const slug = place.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        
        allPlaces.push({
          ...place,
          slug,
          dzongkhagSlug: dzongkhag.slug,
          dzongkhag: dzongkhag.name,
          region: dzongkhag.location.region
        });
      });
    }
  });

  const paths = allPlaces.map((place: any) => ({
    params: { slug: place.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  
  let foundPlace: any = null;
  let foundDzongkhag: any = null;

  // Find the place and its dzongkhag
  for (const dzongkhag of popularDestination) {
    if (dzongkhag.placesToVisit) {
      for (const place of dzongkhag.placesToVisit) {
        const placeSlug = place.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        if (placeSlug === slug) {
          foundPlace = {
            ...place,
            slug: placeSlug,
            dzongkhagSlug: dzongkhag.slug,
            dzongkhag: dzongkhag.name,
            region: dzongkhag.location.region
          };
          foundDzongkhag = dzongkhag;
          break;
        }
      }
      if (foundPlace) break;
    }
  }

  if (!foundPlace || !foundDzongkhag) {
    return {
      notFound: true,
    };
  }

  // Find related places (other attractions in the same dzongkhag)
  const relatedPlaces: any[] = [];
  if (foundDzongkhag.placesToVisit) {
    foundDzongkhag.placesToVisit.forEach((place: any) => {
      if (place.name !== foundPlace.name) {
        const relatedSlug = place.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        relatedPlaces.push({
          ...place,
          slug: relatedSlug,
          dzongkhagSlug: foundDzongkhag.slug,
          dzongkhag: foundDzongkhag.name,
        });
      }
    });
  }

  return {
    props: {
      place: foundPlace,
      dzongkhag: foundDzongkhag,
      relatedPlaces: relatedPlaces.slice(0, 5), // Limit to 5 related places
    },
  };
};

export default AttractionPage;
