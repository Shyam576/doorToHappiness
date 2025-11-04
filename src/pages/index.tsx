import React, { useState, useEffect, useCallback, useRef } from "react";
import Head from "next/head";
import { Container } from "../components/Container";
import WhatsAppButton from "../components/whatsAppButton";
import majorCitiesPackage from "../data/majorCitiesPackage.json";
import popularDestination from "../data/popularDestination.json";
import {
  FaUmbrellaBeach,
  FaMountain,
  FaCity,
  FaTree,
  FaPager,
  FaCertificate,
  FaLeaf,
  FaHandHoldingUsd,
  FaShieldAlt,
  FaBuilding,
  FaPrayingHands,
  FaFortAwesome,
} from "react-icons/fa";
import { getTheme } from "../styles/themes";

import { FiSearch, FiArrowRight, FiChevronDown } from "react-icons/fi";
import festivalTours from "../data/festivialTours.json";
import culturalTours from "../data/culturalTours.json";
import trekkingAdventures from "../data/trekkingAdventure.json";
import groupTours from "../data/groupTours.json";
import beautifulMoutain from "../../public/beautifulMoutain.jpeg";
import Link from "next/link";

const SEO_KEYWORDS = [
  "Department Of Tourism",
  "DOT",
  "dot",
  "Door to Happiness Holiday",
  "Door to Happiness Holidays",
  "Door to Happiness",
  "Door to Happiness Bhutan",
  "Bhutan tours",
  "Bhutan travel packages",
  "Bhutan dzongkhags",
  "sacred places Bhutan",
  "dzongs Bhutan",
  "monasteries Bhutan",
  "Himalayan vacations",
  "Cultural tours Bhutan",
  "Bhutan trekking adventures",
  "Tiger's Nest Monastery",
  "Paro Taktsang",
  "Thimphu dzongkhag",
  "Punakha dzong",
  "Bhutan festival tours",
  "Buddhist temples Bhutan",
  "Bhutanese culture",
  "Thunder Dragon Kingdom",
  "Gross National Happiness",
  "Best Bhutan tour operator",
  "Sustainable tourism Bhutan",
  "Bhutan spiritual journey",
  "Lhakhangs Bhutan",
  "Chortens Bhutan",
  "traditional architecture Bhutan",
];

// Helper function to convert duration string to days
const getDurationInDays = (duration: any) => {
  if (!duration) return 0;
  const match = duration.match(/(\d+)/);
  return match ? parseInt(match[0]) : 0;
};

const Index: React.FC = () => {
  // Get unified theme
  const theme = getTheme();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [packageSearchTerm, setPackageSearchTerm] = useState("");
  const [showPackageResults, setShowPackageResults] = useState(false);
  const [sortOption, setSortOption] = useState("recommended");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Newsletter subscription state
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionMessage, setSubscriptionMessage] = useState("");
  const [subscriptionStatus, setSubscriptionStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // Refs for scrolling
  const toursRef = useRef<HTMLDivElement>(null);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Determine the correct route based on the tour category
  const getRouteForTour = (tour: any) => {
    switch (tour.category) {
      case "cultural":
        return `/package/cultural/${tour.id}`;
      case "festival":
        return `/package/festival/${tour.id}`;
      case "group":
        return `/package/group/${tour.id}`;
      case "trekking":
      case "adventure": // Adventure tours also use trekking pages
        return `/package/trekking/${tour.id}`;
      case "city":
      default:
        return `/package/majorcitytour/${tour.id}`;
    }
  };

  // Handle newsletter subscription
  const handleNewsletterSubscription = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.trim()) {
      setSubscriptionMessage("Please enter your email address.");
      setSubscriptionStatus("error");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubscriptionMessage("Please enter a valid email address.");
      setSubscriptionStatus("error");
      return;
    }

    setIsSubscribing(true);
    setSubscriptionStatus("idle");
    setSubscriptionMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setSubscriptionStatus("success");
        setSubscriptionMessage(data.message);
        setEmail(""); // Clear the email field on success
      } else {
        setSubscriptionStatus("error");
        setSubscriptionMessage(
          data.message || "Failed to subscribe. Please try again."
        );
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setSubscriptionStatus("error");
      setSubscriptionMessage("Something went wrong. Please try again later.");
    } finally {
      setIsSubscribing(false);

      // Clear message after 5 seconds
      setTimeout(() => {
        setSubscriptionMessage("");
        setSubscriptionStatus("idle");
      }, 5000);
    }
  };

  // Combine all packages
  const allPackages = [
    ...majorCitiesPackage,
    ...festivalTours,
    ...culturalTours,
    ...trekkingAdventures,
    ...groupTours,
  ];

  // Filter packages based on search
  const filteredPackages = allPackages.filter((pkg) => {
    // Search term matching
    const matchesSearch =
      pkg.title.toLowerCase().includes(packageSearchTerm.toLowerCase()) ||
      pkg.description.toLowerCase().includes(packageSearchTerm.toLowerCase()) ||
      (pkg.highlights &&
        pkg.highlights.some((highlight) =>
          highlight.toLowerCase().includes(packageSearchTerm.toLowerCase())
        ));

    return matchesSearch;
  });

  // Sort packages based on selected option
  const sortedPackages = [...filteredPackages].sort((a, b) => {
    switch (sortOption) {
      case "duration-short":
        return (
          getDurationInDays(a.duration || "0 days") -
          getDurationInDays(b.duration || "0 days")
        );
      case "duration-long":
        return (
          getDurationInDays(b.duration || "0 days") -
          getDurationInDays(a.duration || "0 days")
        );
      case "recommended":
      default:
        // Default sorting (could be based on popularity or other metrics)
        return 0;
    }
  });

  // Auto-rotate slides with better performance
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Handle clicking outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Debounced search handlers for better performance
  const handlePackageSearch = useCallback((value: string) => {
    setPackageSearchTerm(value);
    setShowPackageResults(value.length > 0);

    // Auto-scroll to tours if user is actively searching
    if (value.length > 2) {
      setTimeout(() => scrollToSection(toursRef), 500);
    }
  }, []);

  // Scroll to section function
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Handle search application with scroll
  const handleSearch = () => {
    setIsLoading(true);

    // Scroll to tours section
    setTimeout(() => scrollToSection(toursRef), 100);

    // Reset loading state
    setTimeout(() => setIsLoading(false), 1000);
  };

  // Clear search function
  const clearSearch = () => {
    setPackageSearchTerm("");
    setShowPackageResults(false);
    setSortOption("recommended");
  };

  const heroSlides = [
    {
      id: 1,
      src: "https://www.bhutanpeacefultour.com/wp-content/uploads/2018/11/Thimphu-City-Image-Main.jpg",
      alt: "Tiger's Nest Monastery Paro Bhutan",
      title: "Discover the Last Shangri-La",
      subtitle: "Experience Gross National Happiness",
    },
    {
      id: 2,
      src: beautifulMoutain.src,
      alt: "Traditional Bhutanese festival with masked dancers",
      title: "Vibrant Cultural Festivals",
      subtitle: "Witness ancient traditions come alive",
    },
    {
      id: 3,
      src: "https://img.global.news.samsung.com/in/wp-content/uploads/2020/03/20190909_152125-01.jpg",
      alt: "Himalayan mountain landscape in Bhutan",
      title: "Epic Himalayan Treks",
      subtitle: "Challenge yourself in pristine wilderness",
    },
  ];

  const categories = [
    { id: "all", name: "All", icon: null },
    {
      id: "cultural",
      name: "Cultural",
      icon: <FaPager className="inline mr-1" />,
    },
    {
      id: "adventure",
      name: "Adventure",
      icon: <FaMountain className="inline mr-1" />,
    },
    { id: "nature", name: "Nature", icon: <FaTree className="inline mr-1" /> },
    { id: "spiritual", name: "Spiritual", icon: "🕉️" },
    { id: "scenic", name: "Scenic", icon: "🏞️" },
  ];

  const sortOptions = [
    { value: "recommended", label: "Recommended" },
    { value: "duration-short", label: "Duration (Shortest)" },
    { value: "duration-long", label: "Duration (Longest)" },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white overflow-x-hidden">
      <Head>
        <title>
          Bhutan's #1 Tour Operator | Dzongkhag & Sacred Places Expert | Door To
          Happiness Holiday
        </title>
        <meta
          name="description"
          content="Discover Bhutan's 20 dzongkhags and sacred places with our expert tours. Visit ancient dzongs, monasteries, and lhakhangs across Thimphu, Paro, Punakha. Authentic cultural experiences with certified guides specializing in Bhutanese heritage and spiritual sites."
        />
        <meta name="keywords" content={SEO_KEYWORDS.join(", ")} />
        <meta property="og:site_name" content="Door to Happiness Holiday" />
        <meta
          property="og:title"
          content="Door To Happiness Holiday - Bhutan's Leading Tour Operator"
        />
        <meta
          property="og:description"
          content="Experience authentic Bhutan with Door to Happiness Holiday. Custom Bhutan tours featuring monasteries, festivals, and Himalayan adventures. Sustainable tourism with local experts."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.doortohappinessholidays.com"
        />
        <meta
          property="og:image"
          content="https://www.doortohappinessholidays.com/logowhitebg.png"
        />
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Door to Happiness Holiday - Bhutan Tours"
        />
        <meta
          name="twitter:description"
          content="Authentic Bhutan cultural tours and dzongkhag exploration with expert guides."
        />
        <meta
          name="twitter:image"
          content="https://www.doortohappinessholidays.com/logowhitebg.png"
        />

        {/* Brand and business info */}
        <meta name="author" content="Door to Happiness Holiday" />
        <meta name="publisher" content="Door to Happiness Holiday" />
        <meta name="copyright" content="Door to Happiness Holiday" />
        <link rel="canonical" href="https://www.doortohappinessholidays.com" />
        <link rel="icon" href="/logowhitebg.png" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        {/* Enhanced JSON-LD structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["TravelAgency", "Organization"],
            name: "Door to Happiness Holiday",
            alternateName: [
              "Door to Happiness Holidays",
              "Door to Happiness",
              "Door to Happiness Tours",
            ],
            description:
              "Premier tour operator specializing in authentic Bhutan cultural tours, dzongkhag exploration, and sacred place visits",
            url: "https://www.doortohappinessholidays.com",
            logo: "https://www.doortohappinessholidays.com/logowhitebg.png",
            image: "https://www.doortohappinessholidays.com/logowhitebg.png",
            address: {
              "@type": "PostalAddress",
              addressCountry: "Bhutan",
            },
            openingHours: "Mo,Tu,We,Th,Fr,Sa,Su 09:00-17:00",
            telephone: process.env.NEXT_PUBLIC_PHONE_NO,
            email: "info@doortohappinessholidays.com",
            foundingDate: "2020", // Update with actual founding year
            areaServed: {
              "@type": "Country",
              name: "Bhutan",
            },
            serviceType: [
              "Cultural Tours",
              "Adventure Tours",
              "Spiritual Tours",
              "Trekking Tours",
              "Festival Tours",
            ],
            priceRange: "$$",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "150",
            },
            sameAs: [
              // Add your social media URLs here
              "https://www.facebook.com/doortohappinessholiday",
              "https://www.instagram.com/doortohappinessholiday",
              "https://www.tripadvisor.com/doortohappinessholiday",
            ],
          })}
        </script>
      </Head>

      {/* Hero Section */}
      <div className="relative h-screen max-h-[800px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40" />
          </div>
        ))}

        <Container className="relative z-10 h-full flex flex-col justify-center px-4 sm:px-6">
          <div className="text-center text-white max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 drop-shadow-lg leading-tight">
              Discover Bhutan's Magic
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 drop-shadow-md px-4">
              Authentic Cultural Experiences • Sustainable Tourism •
              Award-Winning Guides
            </p>

            <div className="inline-flex items-center bg-white bg-opacity-90 rounded-full px-4 sm:px-6 py-2 mb-6 sm:mb-8 mx-4">
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              <span className="text-gray-800 font-semibold text-sm sm:text-base">
                Certified Excellence in Bhutan Tourism
              </span>
            </div>
          </div>

          {/* Enhanced Search Widget */}
          <div className="mt-6 sm:mt-8 bg-white rounded-2xl shadow-xl p-4 sm:p-6 transition-all duration-300 bg-opacity-30 mx-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              Plan Your Bhutan Adventure
            </h2>

            <div className="flex flex-col gap-4 mb-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="w-full pl-10 pr-12 py-3 bg-white border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-base"
                  placeholder="Search for tours or activities"
                  value={packageSearchTerm}
                  onChange={(e) => handlePackageSearch(e.target.value)}
                  onFocus={() =>
                    setShowPackageResults(packageSearchTerm.length > 0)
                  }
                  onBlur={() =>
                    setTimeout(() => setShowPackageResults(false), 200)
                  }
                />
                {packageSearchTerm && (
                  <button
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => {
                      setPackageSearchTerm("");
                      setShowPackageResults(false);
                    }}
                  >
                    <svg
                      className="h-5 w-5 text-gray-400 hover:text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
                {showPackageResults && (
                  <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-auto">
                    {filteredPackages.length > 0 ? (
                      filteredPackages.map((pkg) => (
                        <Link key={pkg.id} href={getRouteForTour(pkg)} passHref>
                          <div className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 flex items-center">
                            <img
                              src={pkg.image}
                              alt={pkg.title}
                              className="w-10 h-10 rounded-md object-cover mr-3"
                            />
                            <div>
                              <div className="font-medium">{pkg.title}</div>
                              <div className="text-sm text-gray-500">
                                {pkg.duration || "Multi-day tour"}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500">
                        No tours found
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {packageSearchTerm && (
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition flex items-center justify-center text-base"
                  onClick={clearSearch}
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Clear
                </button>
              )}
              <button
                className={`${
                  packageSearchTerm ? "col-span-1" : "col-span-2"
                } ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : `${theme.primary} ${theme.primaryHover}`
                } text-white font-bold py-3 px-4 rounded-lg transition flex items-center justify-center text-base`}
                onClick={() => {
                  if (!isLoading && packageSearchTerm) {
                    handleSearch();
                  }
                }}
                disabled={isLoading || !packageSearchTerm}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Searching...
                  </>
                ) : (
                  <>
                    <FiSearch className="mr-2" />
                    Search
                  </>
                )}
              </button>
            </div>
            {packageSearchTerm && (
              <p className="text-xs text-white text-center mt-2">
                Searching for "{packageSearchTerm}" in tours
              </p>
            )}
          </div>
        </Container>
      </div>

      {/* Trust Indicators */}
      <div className="w-full bg-gradient-to-r from-orange-50 to-yellow-50">
        <Container className="py-8 sm:py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center">
            {[
              {
                icon: <FaCertificate className="text-blue-600" />,
                title: "Best Local Guides",
                text: "Certified Bhutanese experts",
              },
              {
                icon: <FaLeaf className="text-green-600" />,
                title: "Sustainable Travel",
                text: "Carbon-neutral tours",
              },
              {
                icon: <FaHandHoldingUsd className="text-emerald-600" />,
                title: "Transparent Pricing",
                text: "Clear & fair costs",
              },
              {
                icon: <FaShieldAlt className="text-indigo-600" />,
                title: "Flexible Booking",
                text: "Free cancellations",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-4 sm:p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition"
              >
                <div className="text-3xl sm:text-4xl mb-2 sm:mb-3 flex justify-center">
                  {item.icon}
                </div>
                <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2 text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Featured Tours Section */}
      <Container className="py-8 sm:py-12" ref={toursRef}>
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6">
            <div className="text-left flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                Our Most Popular Bhutan Tours
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                {packageSearchTerm ? (
                  <>
                    Found {filteredPackages.length} tour
                    {filteredPackages.length !== 1 ? "s" : ""}
                    {packageSearchTerm && ` matching "${packageSearchTerm}"`}
                  </>
                ) : (
                  `${filteredPackages.length} tours available`
                )}
              </p>
            </div>

            <div
              className="flex items-center justify-end w-full sm:w-auto relative"
              ref={dropdownRef}
            >
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="px-3 sm:px-4 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base bg-white text-gray-700 hover:border-orange-300 transition-colors min-w-[140px] sm:min-w-[160px] flex items-center justify-between"
                >
                  <span>
                    {
                      sortOptions.find((option) => option.value === sortOption)
                        ?.label
                    }
                  </span>
                  <FiChevronDown
                    className={`ml-2 h-4 w-4 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-orange-200 rounded-lg shadow-lg z-50 overflow-hidden">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortOption(option.value);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 sm:px-4 py-2 text-sm sm:text-base hover:bg-orange-50 transition-colors ${
                          sortOption === option.value
                            ? "bg-orange-100 text-orange-700 font-medium"
                            : "text-gray-700"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {sortedPackages.length > 0 ? (
            sortedPackages.slice(0, 6).map((tour) => (
              <div
                key={tour.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1 flex flex-col h-full"
              >
                {/* Image section with fixed height */}
                <div className="relative h-40 sm:h-48 flex-shrink-0">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Content section with flex-grow and fixed min-height */}
                <div className="p-4 sm:p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm sm:text-lg text-gray-800 font-bold flex-1 pr-2">
                      {tour.title}
                    </h3>
                    <span className="bg-yellow-200 text-gray-800 px-2 py-1 rounded text-xs sm:text-sm whitespace-nowrap flex-shrink-0">
                      {tour.duration || tour.dates}
                    </span>
                  </div>
                  {/* Description with fixed height */}
                  <p className="text-gray-600 mb-3 sm:mb-4 line-clamp-2 min-h-[3rem] text-sm sm:text-base">
                    {tour.description}
                  </p>
                  {/* Highlights with fixed height */}
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4 min-h-[1.5rem]">
                    {tour.highlights?.slice(0, 3).map((highlight, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                  {/* Button at bottom with proper Link */}
                  <div className="mt-auto">
                    <Link href={getRouteForTour(tour)} passHref>
                      <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 sm:py-3 px-4 rounded-lg transition flex items-center justify-center text-sm sm:text-base">
                        View Details
                        <FiArrowRight className="ml-2" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : packageSearchTerm ? (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 mb-4">
                <FiSearch className="mx-auto h-12 w-12" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No tours found
              </h3>
              <p className="text-gray-500 mb-4">
                We couldn't find any tours matching "{packageSearchTerm}". Try
                adjusting your search or browse all tours.
              </p>
              <button
                onClick={clearSearch}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600"
              >
                Clear search and browse all
              </button>
            </div>
          ) : null}
        </div>

        {sortedPackages.length > 6 && !packageSearchTerm && (
          <div className="text-center mt-8 sm:mt-12">
            <Link href="/package" passHref>
              <button className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 transition">
                View All {sortedPackages.length} Tour Packages
                <FiArrowRight className="ml-2" />
              </button>
            </Link>
          </div>
        )}
      </Container>

      {/* Testimonials Section */}
      {/* <Container className="py-12 sm:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            What Travelers Say About Us
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto px-4 text-sm sm:text-base">
            Don't just take our word for it - hear from our happy travelers
            who've experienced Bhutan with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              quote:
                "The cultural insights we gained from our Bhutanese guide were incredible. This wasn't just a tour - it was a life-changing experience.",
              author: "Sarah K., Australia",
              rating: 5,
              avatar: "https://randomuser.me/api/portraits/women/44.jpg",
            },
            {
              quote:
                "Perfectly organized from start to finish. Every detail was taken care of, allowing us to fully immerse in Bhutan's beauty.",
              author: "Michael T., USA",
              rating: 5,
              avatar: "https://randomuser.me/api/portraits/men/32.jpg",
            },
            {
              quote:
                "As a solo female traveler, I felt completely safe and welcomed. The women-only group tour was empowering and unforgettable.",
              author: "Priya M., India",
              rating: 5,
              avatar: "https://randomuser.me/api/portraits/women/68.jpg",
            },
          ].map((testimonial, index) => (
            <div key={index} className="bg-white p-6 sm:p-8 rounded-xl shadow-md">
              <div className="flex mb-3 sm:mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      i < testimonial.rating
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-gray-700 italic mb-4 sm:mb-6 text-base sm:text-lg">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4"
                />
                <p className="font-medium text-gray-800 text-sm sm:text-base">
                  — {testimonial.author}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container> */}

      {/* Dzongkhags & Heritage Places Section */}
      <Container className="py-12 sm:py-16 bg-gradient-to-b from-blue-50 to-orange-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Explore Bhutan's Historic Dzongkhags
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Discover the cultural heart of Bhutan through its 20 dzongkhags,
            each home to ancient dzongs, monasteries, and timeless Buddhist
            traditions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center bg-white rounded-xl p-8 shadow-lg">
            <div className="text-5xl text-red-600 mb-4 flex justify-center">
              <FaFortAwesome />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800">
              Historic Dzongs
            </h3>
            <p className="text-gray-600 mb-6">
              Explore over 50 fortress-monasteries that serve as both
              administrative centers and spiritual sanctuaries across all 20
              dzongkhags.
            </p>
            <Link href="/dzongkhag">
              <button className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Explore Dzongkhags
              </button>
            </Link>
          </div>

          <div className="text-center bg-white rounded-xl p-8 shadow-lg">
            <div className="text-5xl text-orange-600 mb-4 flex justify-center">
              <FaBuilding />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800">
              Monasteries & Temples
            </h3>
            <p className="text-gray-600 mb-6">
              Visit ancient lhakhangs, gompas, and temples that preserve 1,000+
              years of Buddhist wisdom and serve as centers of cultural
              practice.
            </p>
            <Link href="/sacred-places">
              <button className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Heritage Places Guide
              </button>
            </Link>
          </div>

          <div className="text-center bg-white rounded-xl p-8 shadow-lg">
            <div className="text-5xl text-blue-600 mb-4 flex justify-center">
              <FaPrayingHands />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800">
              Cultural Heritage
            </h3>
            <p className="text-gray-600 mb-6">
              Experience living traditions through tsechu festivals, traditional
              architecture, and time-honored customs preserved in each
              dzongkhag.
            </p>
            <Link href="/guides/dzong-architecture">
              <button className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Architecture Guide
              </button>
            </Link>
          </div>
        </div>

        {/* Featured Dzongkhags */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
            Most Visited Dzongkhags
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDestination.slice(0, 4).map((dzongkhag: any) => (
              <Link key={dzongkhag.id} href={`/dzongkhag/${dzongkhag.slug}`}>
                <div className="group cursor-pointer">
                  <div className="relative h-32 rounded-lg overflow-hidden mb-3">
                    <img
                      src={
                        dzongkhag.media?.images?.[0] || "/backgroundbanner.png"
                      }
                      alt={`${dzongkhag.name} dzongkhag`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-opacity"></div>
                    <div className="absolute bottom-2 left-2 right-2">
                      <h4 className="font-bold text-white text-sm">
                        {dzongkhag.name}
                      </h4>
                      <p className="text-xs text-gray-200">
                        {dzongkhag.tagline}
                      </p>
                    </div>
                  </div>
                  {/* <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{dzongkhag.culture.dzongs.length} Historic Dzongs</span>
                  </div> */}
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/dzongkhag">
              <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 rounded-lg font-bold transition-all transform hover:scale-105">
                Explore All 20 Dzongkhags
              </button>
            </Link>
          </div>
        </div>
      </Container>

      {/* Newsletter Signup */}
      <Container className="py-12 sm:py-16 bg-gradient-to-r from-orange-50 to-yellow-50">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 bg-yellow-500 p-6 sm:p-8 flex flex-col justify-center">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                Get Bhutan Travel Inspiration
              </h2>
              <p className="text-yellow-100 text-sm sm:text-base">
                Sign up for exclusive offers, travel tips, and Bhutanese
                cultural insights.
              </p>
            </div>
            <div className="md:w-1/2 p-6 sm:p-8">
              <form
                onSubmit={handleNewsletterSubscription}
                className="space-y-4"
              >
                <div className="mb-4">
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubscribing}
                    className={`w-full px-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 text-base transition-colors ${
                      subscriptionStatus === "error"
                        ? "border-red-400 focus:ring-red-500"
                        : subscriptionStatus === "success"
                        ? "border-green-400 focus:ring-green-500"
                        : "border-orange-200 focus:ring-orange-500"
                    } ${isSubscribing ? "opacity-50 cursor-not-allowed" : ""}`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubscribing || !email.trim()}
                  className={`w-full font-bold py-3 px-4 rounded-lg transition text-base ${
                    isSubscribing
                      ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                      : subscriptionStatus === "success"
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-orange-500 hover:bg-orange-600 text-white"
                  }`}
                >
                  {isSubscribing ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Subscribing...
                    </span>
                  ) : subscriptionStatus === "success" ? (
                    "Subscribed!"
                  ) : (
                    "Subscribe"
                  )}
                </button>

                {subscriptionMessage && (
                  <div
                    className={`p-3 rounded-lg text-sm ${
                      subscriptionStatus === "success"
                        ? "bg-green-50 text-green-800 border border-green-200"
                        : "bg-red-50 text-red-800 border border-red-200"
                    }`}
                  >
                    {subscriptionMessage}
                  </div>
                )}

                <p className="text-xs text-gray-500 mt-3">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            </div>
          </div>
        </div>
      </Container>

      <WhatsAppButton
        phoneNumber={process.env.NEXT_PUBLIC_PHONE_NO as string}
        message="Hello! I have a question about your Bhutan tours"
      />
    </div>
  );
};

export default Index;
