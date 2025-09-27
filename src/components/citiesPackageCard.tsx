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
  price?: number;
  category?: string;
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
  return (
    <div className="relative bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full">
      <div className="h-52 overflow-hidden">
        <img
          src={tour.image}
          alt={tour.alt || tour.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6 flex flex-col flex-grow" style={{ minHeight: '300px' }}>
        <h3 className="text-2xl font-bold text-gray-800 mb-2 line-clamp-2">
          {tour.title}
        </h3>

        <p className="text-sm text-orange-500 mb-1 line-clamp-1">
          {tour.highlights.join(' | ')}
        </p>

        <p className="text-sm text-gray-500 mb-4">
          {tour.duration} {tour.route && `[${tour.route}]`}
        </p>

        <div className="mb-6 flex-grow overflow-y-auto" style={{ maxHeight: '100px' }}>
          <p className="text-gray-700 leading-relaxed">
            {tour.description}
          </p>
        </div>

        <div className="mt-auto pt-4">
          <Link href={getRouteForTour(tour)} passHref>
            <button className="w-full py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-lg shadow-md transition duration-200 active:scale-95 active:bg-orange-700">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CityPackageCard;