import React, { useState } from "react";
import Head from "next/head";
import { Container } from "../../components/Container";
import WhatsAppButton from "../../components/whatsAppButton";
import popularDestination from "../../data/popularDestination.json";
import {
  FiSearch,
  FiArrowRight,
  FiStar,
  FiHeart,
  FiFilter,
} from "react-icons/fi";
import { FaUmbrellaBeach, FaMountain, FaCity, FaTree } from "react-icons/fa";
import Link from "next/link";

interface Destination {
  id: number;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  highlights: string[];
  location: {
    region: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    nearbyDzongkhags: string[];
  };
  culture: {
    dzongs: string[];
    festivals: string[];
    localDish: string;
  };
  nature: {
    trekkingRoutes: string[];
    wildlife: string;
    scenicSpots: string[];
  };
  experiences: {
    type: string;
    activities: string[];
  }[];
  practicalInfo: {
    bestTimeToVisit: string[];
    accommodation: string[];
    transportation: string[];
  };
  media: {
    images: string[];
    video: string;
  };
  usps: string[];
  meta: {
    lastUpdated: string;
    popularity: number;
  };
}

const Index: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOption, setSortOption] = useState("popularity");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    region: "",
    bestTime: "",
    experienceType: "",
  });

  // Get unique categories from experiences
  const categories = [
    "All",
    ...Array.from(
      new Set(
        popularDestination.flatMap((dest) =>
          dest.experiences.map((exp) => exp.type)
        )
      )
    ),
  ];

  // Get unique regions
  const regions = Array.from(
    new Set(popularDestination.map((dest) => dest.location.region))
  );

  // Get unique experience types
  const experienceTypes = Array.from(
    new Set(
      popularDestination.flatMap((dest) =>
        dest.experiences.map((exp) => exp.type)
      )
    )
  );

  // Get unique best times to visit
  const bestTimes = Array.from(
    new Set(
      popularDestination.flatMap((dest) => 
        dest.practicalInfo.bestTimeToVisit
      )
    )
  );

  // Filter and sort destinations
  const filteredDestinations = popularDestination
    .filter((dest) => {
      // Search term matching
      const matchesSearch =
        searchTerm === "" ||
        dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.highlights.some((h) =>
          h.toLowerCase().includes(searchTerm.toLowerCase())
        );

      // Category filtering
      const matchesCategory =
        activeCategory === "All" ||
        dest.experiences.some((exp) => exp.type === activeCategory);

      // Region filter
      const matchesRegion =
        filters.region === "" ||
        dest.location.region === filters.region;

      // Best time filter
      const matchesBestTime =
        filters.bestTime === "" ||
        dest.practicalInfo.bestTimeToVisit.includes(filters.bestTime);

      // Experience type filter
      const matchesExperienceType =
        filters.experienceType === "" ||
        dest.experiences.some(exp => exp.type === filters.experienceType);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesRegion &&
        matchesBestTime &&
        matchesExperienceType
      );
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "popularity":
        default:
          return b.meta.popularity - a.meta.popularity;
      }
    });

  // Toggle favorite
  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      region: "",
      bestTime: "",
      experienceType: "",
    });
    setSortOption("popularity");
    setActiveCategory("All");
    setSearchTerm("");
  };

  return (
    <>
      <Head>
        <title>Bhutan Travel Guide | Explore All 20 Dzongkhags</title>
        <meta
          name="description"
          content="Discover Bhutan's 20 unique districts (Dzongkhags) with our comprehensive travel guide. Find cultural highlights, trekking routes, and local experiences."
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-orange-500 to-yellow-400 py-20 px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Discover Bhutan's Hidden Gems
            </h1>
            <p className="text-xl text-white opacity-90 mb-8">
              Explore the Land of the Thunder Dragon through its most
              breathtaking destinations, rich culture, and unforgettable
              experiences.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search destinations..."
                className="w-full py-4 px-6 pl-10 bg-white rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Container className="py-16">
          {/* Filters and Sorting */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                Explore Bhutan's Dzongkhags
              </h2>
              <p className="text-gray-600">
                {filteredDestinations.length} destinations found
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <FiFilter />
                Filters
              </button>

              <select
                className="bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="popularity">Sort by: Popularity</option>
                <option value="name-asc">Sort by: Name (A-Z)</option>
                <option value="name-desc">Sort by: Name (Z-A)</option>
              </select>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="bg-white p-6 rounded-xl shadow-md mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Region
                  </label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={filters.region}
                    onChange={(e) =>
                      setFilters({ ...filters, region: e.target.value })
                    }
                  >
                    <option value="">All Regions</option>
                    {regions.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Best Time to Visit
                  </label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={filters.bestTime}
                    onChange={(e) =>
                      setFilters({ ...filters, bestTime: e.target.value })
                    }
                  >
                    <option value="">Any Time</option>
                    {bestTimes.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Experience Type
                  </label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={filters.experienceType}
                    onChange={(e) =>
                      setFilters({ ...filters, experienceType: e.target.value })
                    }
                  >
                    <option value="">All Experiences</option>
                    {experienceTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-between mt-4">
                <button
                  className="text-sm text-gray-600 hover:text-gray-800"
                  onClick={resetFilters}
                >
                  Reset all filters
                </button>
                <button
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                  onClick={() => setShowFilters(false)}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  activeCategory === category
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category === "All" ? (
                  "All Destinations"
                ) : (
                  <>
                    {category === "Cultural" && <FaCity className="inline mr-1" />}
                    {category === "Adventure" && (
                      <FaMountain className="inline mr-1" />
                    )}
                    {category === "Nature" && <FaTree className="inline mr-1" />}
                    {category}
                  </>
                )}
              </button>
            ))}
          </div>

          {/* Destinations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination) => (
              <div
                key={destination.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                <div className="relative h-64">
                  <img
                    src={destination.media.images[0]}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* <button
                    className="absolute top-4 right-4 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition"
                    onClick={() => toggleFavorite(destination.id)}
                  >
                    <FiHeart
                      className={`w-5 h-5 ${
                        favorites.includes(destination.id)
                          ? "text-red-500 fill-red-500"
                          : "text-gray-600"
                      }`}
                    />
                  </button> */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <h3 className="text-xl font-bold text-white">
                      {destination.name}
                    </h3>
                    <div className="flex items-center text-yellow-300">
                      <FiStar className="fill-current" />
                      <span className="ml-1">
                        {destination.meta.popularity}/5 Popularity
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {destination.tagline}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {destination.experiences.slice(0, 3).map((exp, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full"
                      >
                        {exp.type}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">
                        Best time: {destination.practicalInfo.bestTimeToVisit[0]}
                      </p>
                    </div>
                    <Link href={`/destination/explore/${destination.id}`}>
                    <button className="text-yellow-500 hover:text-yellow-600 font-medium flex items-center">
                      Explore <FiArrowRight className="ml-1" />
                    </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredDestinations.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-700">
                No destinations found matching your criteria
              </h3>
              <button
                className="mt-4 text-yellow-500 hover:text-yellow-600"
                onClick={resetFilters}
              >
                Clear all filters
              </button>
            </div>
          )}
        </Container>

        {/* Regions Section */}
        <div className="bg-gray-50 py-16">
          <Container>
            <h2 className="text-3xl font-bold text-center mb-12">
              Explore by Region
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {regions.map((region) => (
                <div
                  key={region}
                  className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition cursor-pointer"
                  onClick={() => {
                    setFilters({ ...filters, region });
                    setActiveCategory("All");
                  }}
                >
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {region.includes("Western") && <FaCity className="text-yellow-500 text-xl" />}
                    {region.includes("Central") && <FaTree className="text-yellow-500 text-xl" />}
                    {region.includes("Eastern") && <FaMountain className="text-yellow-500 text-xl" />}
                    {region.includes("Southern") && <FaUmbrellaBeach className="text-yellow-500 text-xl" />}
                  </div>
                  <h3 className="font-medium">{region}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {popularDestination.filter(d => d.location.region === region).length} destinations
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </div>

        {/* Top Experiences Section */}
        <Container className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Unique Bhutanese Experiences
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Dzong Architecture",
                description: "Explore ancient fortress monasteries",
                icon: "🏯",
                count: popularDestination.filter(d => d.culture.dzongs.length > 0).length,
              },
              {
                title: "Festivals",
                description: "Witness vibrant Tshechus",
                icon: "🎪",
                count: popularDestination.filter(d => d.culture.festivals.length > 0).length,
              },
              {
                title: "Himalayan Treks",
                description: "Journey through pristine landscapes",
                icon: "🥾",
                count: popularDestination.filter(d => d.nature.trekkingRoutes.length > 0).length,
              },
            ].map((exp, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                <div className="text-4xl mb-4">{exp.icon}</div>
                <h3 className="text-xl font-bold mb-2">{exp.title}</h3>
                <p className="text-gray-600 mb-4">{exp.description}</p>
                <p className="text-sm text-gray-500">{exp.count} destinations offer this</p>
              </div>
            ))}
          </div>
        </Container>

        <WhatsAppButton
          phoneNumber={process.env.NEXT_PUBLIC_PHONE_NO as string}
          message="Hello! I need help planning my Bhutan trip"
        />
      </div>
    </>
  );
};

export default Index;