import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FiMapPin, FiCalendar, FiDollarSign, FiStar, FiCheck, FiX } from 'react-icons/fi';
import majorCitiesPackage from '../../../data/majorCitiesPackage.json'
import ReactMarkdown from 'react-markdown';
interface DayItinerary {
  title: string;
  description: string;
  details: string;
}

interface Attraction {
  title: string;
  description: string;
}

interface TourPackage {
  id: number;
  title: string;
  image: string;
  alt: string;
  highlights: string[];
  duration: string;
  route: string;
  description: string;
  full_description: string;
  itenary: DayItinerary[];
  price: number;
  inclusions: string[];
  exclusions: string[];
  bestSeason: string[];
  topAttractionToVisit: Attraction[];
}

const PackageDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // Find the package with matching ID
  const packageData = majorCitiesPackage.find(pkg => pkg.id.toString() === id);

  if (!packageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Package not found</h1>
          <button 
            onClick={() => router.push('/')}
            className="mt-4 px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{packageData.title} | Door to Happiness Holiday</title>
        <meta name="description" content={packageData.description} />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-yellow-400 to-orange-500 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
              {packageData.title}
            </h1>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <div className="flex items-center text-white">
                <FiMapPin className="mr-2" />
                <span>{packageData.route}</span>
              </div>
              <div className="flex items-center text-white">
                <FiCalendar className="mr-2" />
                <span>{packageData.duration}</span>
              </div>
              {/* <div className="flex items-center text-white">
                <FiDollarSign className="mr-2" />
                <span>₹{packageData.price.toLocaleString()}</span>
              </div> */}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Package Details */}
            <div className="lg:col-span-2">
              {/* Package Image */}
              <div className="rounded-xl overflow-hidden mb-8">
                <img
                  src={packageData.image}
                  alt={packageData.alt}
                  className="w-full h-96 object-cover"
                />
              </div>

              {/* Package Description */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Package Overview</h2>
                <div className="prose max-w-none text-gray-700">
                  {(packageData.full_description)?packageData.full_description.split('\n').map((paragraph, i) => (
                    <p key={i} className="mb-4">{paragraph}</p>
                  )):<p>Loading ...</p>}
                </div>
              </section>

              {/* Itinerary */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Detailed Itinerary</h2>
                <div className="space-y-6">
                  {(packageData.itenary)?packageData.itenary.map((day, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                          {day.title}: {day.description}
                        </h3>
                        <div className="prose max-w-none text-gray-700">
                          {day.details.split('\n').map((paragraph, i) => (
                            <ReactMarkdown key={i}>{paragraph}</ReactMarkdown>
                          ))}
                        </div>
                      </div>
                    </div>
                  )):<p>Loading ...</p>}
                </div>
              </section>

              {/* Top Attractions */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Top Attractions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(packageData.topAttractionToVisit)?packageData.topAttractionToVisit.map((attraction, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          {attraction.title}
                        </h3>
                        <p className="text-gray-700">{attraction.description}</p>
                      </div>
                    </div>
                  )):<p>Loading ...</p>}
                </div>
              </section>
            </div>

            {/* Right Column - Booking & Info */}
            <div className="space-y-6">
              {/* Booking Card */}
              <div className="bg-white rounded-xl shadow-xl p-6 top-6">
                <h2 className="text-xl font-bold text-center text-gray-800 mb-2">Book This Package</h2>
                <div className="space-y-4">
                  <div>
                    {/* <p className="text-3xl font-bold text-orange-500 mb-2">
                      ₹{packageData.price.toLocaleString()}
                    </p>
                    <p className="text-gray-600">per person</p> */}
                  </div>
                  <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-lg shadow-md transition duration-200 hover:from-orange-600 hover:to-yellow-600">
                    Book Now
                  </button>
                  <button className="w-full py-3 border border-orange-500 text-orange-500 font-semibold rounded-lg transition duration-200 hover:bg-orange-50">
                    Enquire Now
                  </button>
                </div>
              </div>

              {/* Highlights */}
              <div className="bg-white rounded-xl shadow-xl p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Package Highlights</h2>
                <ul className="space-y-2">
                  {packageData.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <FiStar className="text-orange-500 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Best Season */}
              <div className="bg-white rounded-xl shadow-xl p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Best Season</h2>
                <div className="flex flex-wrap gap-2">
                  {packageData.bestSeason.map((season, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm"
                    >
                      {season}
                    </span>
                  ))}
                </div>
              </div>

              {/* Inclusions & Exclusions */}
              <div className="bg-white rounded-xl shadow-xl p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">What's Included</h2>
                <ul className="space-y-2 mb-6">
                  {packageData.inclusions.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>

                <h2 className="text-xl font-bold text-gray-800 mb-4">What's Not Included</h2>
                <ul className="space-y-2">
                  {packageData.exclusions.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <FiX className="text-red-500 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PackageDetailsPage;