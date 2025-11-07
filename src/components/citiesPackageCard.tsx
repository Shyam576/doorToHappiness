import React from 'react';
import Link from 'next/link';

interface TourPackage {
  id: string;
  title: string;
  image: string;
  alt?: string;
  highlights: string[];
  duration: string;
  route: string;
  description: string;
  price?: string | number;
  category?: string;
  [key: string]: any; // Allow additional properties
}

const CityPackageCard: React.FC<{ tour: TourPackage }> = ({ tour }) => {
  // Determine the correct route based on the tour category
  const getRouteForTour = (tour: TourPackage) => {
    switch (tour.category) {
      case 'cultural':
        return `/package/cultural/${tour.id}`;
      case 'festival':
        return `/package/festival/${tour.id}`;
      case 'group':
        return `/package/group/${tour.id}`;
      case 'trekking':
      case 'adventure':  // Adventure tours also use trekking pages
        return `/package/trekking/${tour.id}`;
      case 'city':
      default:
        return `/package/majorcitytour/${tour.id}`;
    }
  };

  // Get category background image
  const getCategoryBackground = (category?: string) => {
    switch (category) {
      case 'city':
        return '/category1.svg';
      case 'festival':
        return '/category2.svg';
      case 'cultural':
        return '/category3.svg';
      case 'adventure':
      case 'trekking':
        return '/category4.svg';
      case 'group':
        return '/category5.svg';
      default:
        return null;
    }
  };

  // Get category badge color
  const getCategoryBadgeColor = (category?: string) => {
    switch (category) {
      case 'city':
        return 'bg-gradient-to-r from-yellow-400 to-orange-400';
      case 'festival':
        return 'bg-gradient-to-r from-orange-400 to-red-400';
      case 'cultural':
        return 'bg-gradient-to-r from-yellow-500 to-amber-500';
      case 'adventure':
      case 'trekking':
        return 'bg-gradient-to-r from-orange-600 to-yellow-400';
      case 'group':
        return 'bg-gradient-to-r from-amber-400 to-orange-500';
      default:
        return 'bg-gradient-to-r from-orange-500 to-yellow-500';
    }
  };

  const categoryBg = getCategoryBackground(tour.category);
  const badgeColor = getCategoryBadgeColor(tour.category);

  return (
    <div className="relative bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full group">
      {/* Category Background Pattern - Very Subtle */}
      {categoryBg && (
        <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-5 transition-opacity duration-500 overflow-hidden z-0">
          <img 
            src={categoryBg} 
            alt="" 
            className="w-full h-full object-cover transform rotate-12 scale-150"
          />
        </div>
      )}
      
      <div className="h-52 overflow-hidden relative">
        <img
          src={tour.image}
          alt={tour.alt || tour.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {/* Category Badge - Slightly transparent */}
        {tour.category && (
          <div className={`absolute top-4 left-4 ${badgeColor} bg-opacity-95 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide shadow-lg z-10 backdrop-blur-sm`}>
            {tour.category}
          </div>
        )}
      </div>

      <div className="p-4 sm:p-6 flex flex-col flex-grow relative z-10" style={{ minHeight: '280px' }}>
        <h3 className="text-lg sm:text-2xl font-bold text-gray-800 mb-2 line-clamp-2">
          {tour.title}
        </h3>

        <p className="text-xs sm:text-sm text-orange-500 mb-1 line-clamp-1">
          {tour.highlights.join(' | ')}
        </p>

        <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
          {tour.duration} {tour.route && `[${tour.route}]`}
        </p>

        <div className="mb-4 sm:mb-6 flex-grow">
          <p className="text-gray-700 leading-relaxed line-clamp-3 sm:line-clamp-4 text-sm">
            {tour.description}
          </p>
        </div>

        <div className="mt-auto pt-3 sm:pt-4 relative">
          {/* Very subtle background pattern on hover */}
          {categoryBg && (
            <div className="absolute -bottom-2 -right-2 w-24 h-24 opacity-0 group-hover:opacity-3 transition-opacity duration-500 overflow-hidden pointer-events-none">
              <img 
                src={categoryBg} 
                alt="" 
                className="w-full h-full object-cover transform -rotate-12"
              />
            </div>
          )}
          <Link href={getRouteForTour(tour)} passHref>
            <button className={`relative overflow-hidden w-full py-2 sm:py-3 ${badgeColor} text-white font-semibold rounded-lg shadow-md transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 text-sm sm:text-base group/btn`}>
              <span className="relative z-10">View Details</span>
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CityPackageCard;