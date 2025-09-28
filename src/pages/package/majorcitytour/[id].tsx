import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  FiMapPin,
  FiCalendar,
  FiStar,
  FiCheck,
  FiX,
  FiImage,
  FiMap,
  FiInfo,
  FiUsers,
  FiClock,
  FiTrendingUp,
} from "react-icons/fi";
import {
  HiOutlineSparkles,
  HiOutlineLocationMarker,
  HiOutlineCalendar,
} from "react-icons/hi";
import majorCitiesPackage from "../../../data/majorCitiesPackage.json";
import ReactMarkdown from "react-markdown";
interface DayItinerary {
  title: string;
  description: string;
  details: string;
}

interface TourPackage {
  id: string;
  title: string;
  image: string;
  alt: string;
  category: string;
  highlights: string[];
  duration: string;
  route: string;
  dates: string[];
  images: string[];
  rating: number;
  description: string;
  full_description: string;
  itinerary: DayItinerary[];
  inclusions: string[];
  exclusions: string[];
  bestSeason: string[];
}

const PackageDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedImage, setSelectedImage] = useState(0); // Start with first image from images array

  // Find the package with matching ID
  const packageData = majorCitiesPackage.find(
    (pkg) => pkg.id && pkg.id.toString() === id
  );

  if (!packageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Package not found
          </h1>
          <button
            onClick={() => router.push("/")}
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
        <div className="relative bg-gradient-to-br from-orange-500 via-yellow-500 to-orange-600 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
          <div className="relative max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
              <HiOutlineSparkles className="w-4 h-4 mr-2" />
              Premium City Experience
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              {packageData.title}
            </h1>
            <p className="text-xl text-white opacity-90 max-w-3xl mx-auto mb-8">
              {packageData.description}
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-white">
              <div className="flex items-center bg-white bg-opacity-20 backdrop-blur-sm px-4 py-3 rounded-full">
                <HiOutlineLocationMarker className="w-5 h-5 mr-2" />
                <span className="font-medium">{packageData.route}</span>
              </div>
              <div className="flex items-center bg-white bg-opacity-20 backdrop-blur-sm px-4 py-3 rounded-full">
                <HiOutlineCalendar className="w-5 h-5 mr-2" />
                <span className="font-medium">{packageData.duration}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Statistics Section */}
        <div className="relative -mt-16 mx-4 sm:mx-6 lg:mx-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              <div className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiUsers className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-3xl font-bold text-orange-600 mb-2">
                  10,000+
                </h3>
                <p className="text-gray-600 font-medium">Happy Travelers</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiClock className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-3xl font-bold text-orange-600 mb-2">
                  {packageData.duration}
                </h3>
                <p className="text-gray-600 font-medium">Adventure Duration</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiStar className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-3xl font-bold text-orange-600 mb-2">
                  4.9/5
                </h3>
                <p className="text-gray-600 font-medium">Average Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Package Details */}
            <div className="lg:col-span-2">
              {/* Enhanced Image Gallery */}
              <div className="mb-12">
                <div className="rounded-2xl overflow-hidden shadow-2xl mb-6">
                  <img
                    src={
                      packageData.images && packageData.images.length > 0 && selectedImage >= 0 && selectedImage < packageData.images.length
                        ? packageData.images[selectedImage]
                        : packageData.image
                    }
                    alt={packageData.alt}
                    className="w-full h-96 sm:h-[500px] object-cover"
                    onError={(e) => {
                      // Fallback to main image if selected image fails to load
                      e.currentTarget.src = packageData.image;
                    }}
                  />
                </div>

                {/* Thumbnail Gallery - Only show first 4 images from images array */}
                {packageData.images && packageData.images.length > 0 && (
                  <div className={`grid gap-4 ${packageData.images.length > 4 ? 'grid-cols-5' : 'grid-cols-4'}`}>
                    {packageData.images.slice(0, 4).map((img, index) => (
                      <div
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                          selectedImage === index
                            ? "ring-4 ring-orange-500 transform scale-105"
                            : "opacity-70 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Gallery image ${index + 1}`}
                          className="w-full h-20 sm:h-24 object-cover"
                          onError={(e) => {
                            // Hide broken images
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    ))}
                    {/* Show indicator if there are more images */}
                    {packageData.images.length > 4 && (
                      <div 
                        onClick={() => setActiveTab("gallery")}
                        className="rounded-xl overflow-hidden cursor-pointer transition-all duration-300 opacity-70 hover:opacity-100 bg-gradient-to-br from-orange-100 to-yellow-100 flex flex-col items-center justify-center text-center p-2"
                      >
                        <span className="text-orange-600 text-xs font-medium">
                          +{packageData.images.length - 4} more
                        </span>
                        <span className="text-orange-500 text-xs">
                          View Gallery
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Enhanced Navigation Tabs */}
              <div className="mb-8">
                <div className="flex flex-wrap gap-2 p-2 bg-gray-100 rounded-xl">
                  {[
                    { id: "overview", label: "Overview", icon: FiInfo },
                    { id: "itinerary", label: "Itinerary", icon: FiMap },
                    { id: "highlights", label: "Highlights", icon: FiStar },
                    { id: "gallery", label: "Gallery", icon: FiImage },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg"
                          : "text-gray-600 hover:text-orange-600 hover:bg-white"
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              {activeTab === "overview" && (
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">
                    Package Overview
                  </h2>
                  <div className="prose prose-lg max-w-none text-gray-700">
                    {packageData.full_description ? (
                      packageData.full_description
                        .split("\n")
                        .map((paragraph, i) => (
                          <p key={i} className="mb-6 leading-relaxed">
                            {paragraph}
                          </p>
                        ))
                    ) : (
                      <p>Loading...</p>
                    )}
                  </div>
                </section>
              )}

              {activeTab === "itinerary" && (
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-800 mb-8">
                    Detailed Itinerary
                  </h2>
                  <div className="space-y-6">
                    {packageData.itinerary ? (
                      packageData.itinerary.map((day, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <div className="p-8">
                            <div className="flex items-center space-x-4 mb-6">
                              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                {index + 1}
                              </div>
                              <h3 className="text-2xl font-bold text-gray-800">
                                {day.title}: {day.description}
                              </h3>
                            </div>
                            <div className="prose prose-lg max-w-none text-gray-700 ml-16">
                              {day.details.split("\n").map((paragraph, i) => (
                                <ReactMarkdown key={i}>
                                  {paragraph}
                                </ReactMarkdown>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>Loading...</p>
                    )}
                  </div>
                </section>
              )}

              {activeTab === "highlights" && (
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-800 mb-8">
                    Package Highlights
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {packageData.highlights.map((highlight, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 p-6 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl hover:from-orange-100 hover:to-yellow-100 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        <FiTrendingUp className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-800 font-medium text-lg">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {activeTab === "gallery" && (
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-800 mb-8">
                    Photo Gallery ({packageData.images?.length || 0} images)
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {packageData.images && packageData.images.length > 0 ? (
                      packageData.images.map((img, index) => (
                        <div
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                        >
                          <img
                            src={img}
                            alt={`Gallery image ${index + 1}`}
                            className="w-full h-64 object-cover"
                            onError={(e) => {
                              // Use a placeholder image instead of hiding
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300';
                              console.log(`Image ${index + 1} failed to load: ${img}`);
                            }}
                          />
                        </div>
                      ))
                    ) : (
                      <div className="col-span-full text-center text-gray-500 py-12">
                        <p>No gallery images available</p>
                      </div>
                    )}
                  </div>
                </section>
              )}
            </div>

            {/* Right Column - Enhanced Booking & Info */}
            <div className="space-y-8">
              {/* Enhanced Booking Card */}
              <div className="bg-gradient-to-br from-white to-orange-50 rounded-2xl shadow-2xl p-8">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full text-sm font-medium mb-4">
                    <HiOutlineSparkles className="w-4 h-4 mr-2" />
                    Premium Experience
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Book This Journey
                  </h2>
                  <p className="text-gray-600">
                    Experience the magic of Bhutan
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <button className="w-full py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold rounded-xl shadow-lg transition duration-300 hover:from-orange-600 hover:to-yellow-600 transform hover:scale-105">
                    <span className="flex items-center justify-center">
                      <FiCalendar className="w-5 h-5 mr-2" />
                      Book Now
                    </span>
                  </button>
                  <button className="w-full py-4 border-2 border-orange-500 text-orange-600 font-bold rounded-xl transition duration-300 hover:bg-orange-50 transform hover:scale-105">
                    <span className="flex items-center justify-center">
                      <FiInfo className="w-5 h-5 mr-2" />
                      Enquire Now
                    </span>
                  </button>
                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl">
                    <FiClock className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 font-medium">
                      Duration
                    </p>
                    <p className="text-lg font-bold text-gray-800">
                      {packageData.duration}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl">
                    <FiStar className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 font-medium">Rating</p>
                    <p className="text-lg font-bold text-gray-800">
                      {packageData.rating}/5
                    </p>
                  </div>
                </div>
              </div>

              {/* Enhanced Highlights */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full flex items-center justify-center mr-3">
                    <FiStar className="w-4 h-4 text-orange-600" />
                  </div>
                  Key Highlights
                </h2>
                <div className="space-y-4">
                  {packageData.highlights
                    .slice(0, 5)
                    .map((highlight, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 transition-all duration-200"
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700 font-medium">
                          {highlight}
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Enhanced Best Season */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full flex items-center justify-center mr-3">
                    <FiCalendar className="w-4 h-4 text-orange-600" />
                  </div>
                  Best Travel Season
                </h2>
                <div className="flex flex-wrap gap-3">
                  {packageData.bestSeason.map((season, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-800 rounded-full text-sm font-medium border border-orange-200"
                    >
                      {season}
                    </span>
                  ))}
                </div>
              </div>

              {/* Enhanced Inclusions & Exclusions */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mr-3">
                    <FiCheck className="w-4 h-4 text-green-600" />
                  </div>
                  What&apos;s Included
                </h2>
                <div className="space-y-3 mb-8">
                  {packageData.inclusions.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FiCheck className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-gray-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center mr-3">
                    <FiX className="w-4 h-4 text-red-600" />
                  </div>
                  What&apos;s Not Included
                </h2>
                <div className="space-y-3">
                  {packageData.exclusions.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FiX className="w-3 h-3 text-red-600" />
                      </div>
                      <span className="text-gray-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PackageDetailsPage;
