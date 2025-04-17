import React, { useState, useEffect } from "react";
import { Container } from "../../components/Container";
import WhatsAppButton from "../../components/whatsAppButton";
import majorCitiesPackage from "../../data/majorCitiesPackage.json";
import CityPackageCard from "../../components/citiesPackageCard";
import { FiArrowRight, FiSearch } from "react-icons/fi";


interface Tour {
  id: string;
  title: string;
  description: string;
  image: string;
  route: string;
  category: string;
  rating: number;
  duration: string;
  highlights: string[];
  dates: string | string[];
  price: string | number;
}

interface AllTours {
  cityTours: Tour[];
  festivalTours: Tour[];
  culturalTours: Tour[];
  adventureTours: Tour[];
  groupTours: Tour[];
}


function Index() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [allTours, setAllTours] = useState<AllTours>({
    cityTours: [],
    festivalTours: [],
    culturalTours: [],
    adventureTours: [],
    groupTours: []
  });

  useEffect(() => {
    // Simulate loading data from multiple JSON files
    const loadData = async () => {
      try {
        // In a real app, you would use fetch or axios to load these JSON files
        const festivalTours = await import("../../data/festivialTours.json");
        const culturalTours = await import("../../data/culturalTours.json");
        const trekkingAdventure = await import("../../data/trekkingAdventure.json");
        const groupTours = await import("../../data/groupTours.json");

        setAllTours({
          cityTours: majorCitiesPackage,
          festivalTours: festivalTours.default,
          culturalTours: culturalTours.default,
          adventureTours: trekkingAdventure.default,
          groupTours: groupTours.default
        });
      } catch (error) {
        console.error("Error loading tour data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const filterTours = (tours:any) => {
    if (!searchTerm) return tours;
    
    const searchLower = searchTerm.toLowerCase();
    return tours.filter((tour:any) => {
      return (
        (tour.title && tour.title.toLowerCase().includes(searchLower)) ||
        (tour.description && tour.description.toLowerCase().includes(searchLower)) ||
        (tour.route && tour.route.toLowerCase().includes(searchLower)) ||
        (tour.duration && tour.duration.toLowerCase().includes(searchLower))
      );
    });
  };

  const allFilteredTours = [
    ...filterTours(allTours.cityTours),
    ...filterTours(allTours.festivalTours),
    ...filterTours(allTours.culturalTours),
    ...filterTours(allTours.adventureTours),
    ...filterTours(allTours.groupTours)
  ];

  const renderTourCards = (tours:any, category:any) => {
    if (tours.length === 0 && !searchTerm) return null;
    
    return (
      <Container className="py-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl sm:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-l from-yellow-400 to-orange-400 inline-block py-2 px-4 rounded-lg shadow-md">
            {category}
          </h3>
          {searchTerm && tours.length > 0 && (
            <p className="text-lg text-gray-600 mt-2">
              Showing {tours.length} {category.toLowerCase()} matching "{searchTerm}"
            </p>
          )}
        </div>

        {tours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-10 lg:px-20">
            {tours.map((tour:any) => (
              <div key={tour.id} className="h-full">
                <CityPackageCard tour={tour} />
              </div>
            ))}
          </div>
        ) : searchTerm ? (
          <div className="text-center py-8">
            <h3 className="text-xl font-medium text-gray-600 mb-6">
              No {category.toLowerCase()} found matching your search
            </h3>
          </div>
        ) : null}
      </Container>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-orange-50 to-yellow-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg text-orange-600 font-medium">Loading amazing tours...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section with Search */}
      <div className="relative bg-gradient-to-r from-orange-500 to-yellow-400 py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Bhutan Tour Packages
          </h1>
          <p className="text-xl text-white opacity-90 mb-8">
            Discover curated travel experiences to the Land of the Thunder Dragon
          </p>
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search all packages..."
              className="w-full py-4 px-6 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 pr-12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Search Results View */}
      {searchTerm && (
        <Container className="py-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
              Search Results
            </h2>
            <p className="text-lg text-gray-600 mt-2">
              Found {allFilteredTours.length} packages matching "{searchTerm}"
            </p>
          </div>

          {allFilteredTours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-10 lg:px-20">
              {allFilteredTours.map((tour) => (
                <div key={`${tour.id}-${tour.category}`} className="h-full">
                  <CityPackageCard tour={tour} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium text-gray-600 mb-6">
                No packages found matching your search
              </h3>
              <button
                onClick={() => setSearchTerm("")}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg hover:from-orange-600 hover:to-yellow-600 transition-colors shadow-md"
              >
                Clear Search
              </button>
            </div>
          )}
        </Container>
      )}

      {/* Category Views (hidden when searching) */}
      {!searchTerm && (
        <>
          {/* Major Cities Packages */}
          {renderTourCards(allTours.cityTours, "Bhutan Tour Packages from Major Cities")}

          {/* Festival Tours */}
          {renderTourCards(allTours.festivalTours, "Bhutan Festivals Tours")}

          {/* Cultural Tours */}
          {renderTourCards(allTours.culturalTours, "Bhutan Cultural Tours")}

          {/* Adventure Tours */}
          {renderTourCards(allTours.adventureTours, "Bhutan Treks & Adventures")}

          {/* Group Tours */}
          {renderTourCards(allTours.groupTours, "Bhutan Group Tours")}
        </>
      )}

      {/* Call to Action */}
      {!searchTerm && (
        <div className="bg-gradient-to-r from-orange-500 to-yellow-400 py-12 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">Ready for Your Bhutan Adventure?</h2>
            <p className="text-xl text-white mb-8">Contact our travel experts to customize your perfect trip</p>
            <button className="bg-white text-orange-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-colors">
              Get a Custom Quote
            </button>
          </div>
        </div>
      )}

      <WhatsAppButton
        phoneNumber={process.env.NEXT_PUBLIC_PHONE_NO as string}
        message="Hello! I have a question about Bhutan tours"
      />
    </>
  );
}

export default Index;