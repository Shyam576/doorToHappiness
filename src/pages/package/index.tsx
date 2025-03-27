import React, { useState } from "react";
import { Container } from "../../components/Container";
import WhatsAppButton from "../../components/whatsAppButton";
import majorCitiesPackage from "../../data/majorCitiesPackage.json";
import CityPackageCard from "../../components/citiesPackageCard";
import { FiArrowRight } from "react-icons/fi";

function index() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPackages = majorCitiesPackage.filter((pkg) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      pkg.title.toLowerCase().includes(searchLower) ||
      pkg.description.toLowerCase().includes(searchLower) ||
      pkg.route.toLowerCase().includes(searchLower)
    );
  });

  return (
    <>
      {/* Hero Section with Search */}
      <div className="relative bg-gradient-to-r from-orange-500 to-yellow-400 py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Bhutan Tour Packages
          </h1>
          <p className="text-xl text-white opacity-90 mb-8">
            Discover curated travel experiences to the Land of the Thunder
            Dragon
          </p>
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search packages..."
              className="w-full py-4 px-6 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="absolute right-2 top-2 bg-yellow-400 text-gray-800 p-2 rounded-full hover:bg-yellow-500 transition-colors">
              <FiArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Major Cities Packages */}
      <Container className="py-12">
        <div className="text-center mb-12">
          <h3 className="text-2xl sm:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-l from-yellow-400 to-orange-400 inline-block py-2 px-4 rounded-lg shadow-md">
            Bhutan Tour Packages from Major Cities
          </h3>
          {searchTerm && (
            <p className="text-lg text-gray-600">
              Showing {filteredPackages.length} packages matching "{searchTerm}"
            </p>
          )}
        </div>

        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-10 lg:px-20">
            {filteredPackages.map((tour) => (
              <div key={tour.id} className="h-full">
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
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}
      </Container>

      <Container>
        {/* Header Section */}
        <div className="text-center py-10">
          <h3 className="text-2xl sm:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-l from-yellow-400 to-orange-400 inline-block py-2 px-4 rounded-lg shadow-md">
            Bhutan Festivals Tours
          </h3>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-10 lg:px-20">
          {/* Card 1 */}
          <div className="relative bg-white  rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <img
              src="https://www.asiaodysseytravel.com/images/asia-tours/bhutan-tours/bhutan-tshechu-festivel-700-51.jpg"
              alt="Mumbai Package"
              className="w-full h-52 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Paro Tsechu Festival Tour
              </h3>
              <p className="text-sm text-orange-500 mb-1">
                24th - 29th March 2024
              </p>
              <p className="text-sm text-gray-500 mb-4">5N/6D Trip</p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Set off on an enthralling six-day expedition to the mystical
                realm of Bhutan, climaxing with the lively and spiritually
                enriching Paro Festival. This experience assures a fusion of
                cultural...
              </p>
              <button className="w-full py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-lg shadow-md transition duration-200 active:scale-95 active:bg-orange-700">
                Book Now
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <img
              src="https://a.storyblok.com/f/171618/3936x2624/ec6a07dce9/lll05083.jpg"
              alt="Bagdogra Package"
              className="w-full h-52 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Royal Highland Festival Tour
              </h3>
              <p className="text-sm text-orange-500 mb-1">
                20th - 29th October 2024
              </p>
              <p className="text-sm text-gray-500 mb-4">9N/10D Trip</p>
              <p className="text-gray-700 leading-relaxed mb-6">
                The Royal Highlander Festival unveils the splendor and marvels
                of Gasa Dzongkhang, showcasing its natural beauty, historical
                significance, and timeless traditions. By embodying Gasa's
                vision..
              </p>
              <button className="w-full py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-lg shadow-md transition duration-200 active:scale-95 active:bg-orange-700">
                Book Now
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <img
              src="https://cdn.drukasia.com/content/images/media/drukasia_021617_dsc05249-1070x713.jpg"
              alt="Kolkata Package"
              className="w-full h-52 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Thimphu Tsechu Festival Tour
              </h3>
              <p className="text-sm text-orange-500 mb-1">
                12th - 18th Septemeber 2024
              </p>
              <p className="text-sm text-gray-500 mb-4">6N/7D Trip</p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Experience the vibrancy of Bhutan's culture at Thimphu Tsechu
                festival 2024, happening EditProfileForm Septemeber 12th to
                18th. Delve into a week-long celebration featuring traditional
                masked dances...
              </p>
              <button className="w-full py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-lg shadow-md transition duration-200 active:scale-95 active:bg-orange-700">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </Container>
      <Container>
        {/* Header Section */}
        <div className="text-center py-10">
          <h3 className="text-2xl sm:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-l from-yellow-400 to-orange-400 inline-block py-2 px-4 rounded-lg shadow-md">
            Bhutan Cultural Tours
          </h3>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-10 lg:px-20">
          {/* Card 1 */}
          <div className="relative bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <img
              src="https://bhutanoldmonktravels.com/wp-content/uploads/2018/02/Bhutan-East-West-Tours-1024x576.jpg"
              alt="Classical Cultural Tour"
              className="w-full h-52 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Classical Cultural Tour
              </h3>
              <p className="text-sm text-orange-500 mb-1">
                6 Nights / 7 Days Trip
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Experience Bhutan through a fresh lens with the Bhutan Classic
                Cultural Tour. Immerse yourself in the vibrant local culture as
                you journey through Thimphu, Paro, Punakha, and Gangtey.
                Beginning in Paro.
              </p>
              <button className="w-full py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-lg shadow-md transition duration-200 active:scale-95 active:bg-orange-700">
                Book Now
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <img
              src="https://www.bhutanpeacefultour.com/wp-content/uploads/2019/02/Trekking-1.jpg"
              alt="Bhutan Cultural Tour with Bumdrak Trek"
              className="w-full h-52 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Bhutan Cultural Tour with Bumdrak Trek
              </h3>
              <p className="text-sm text-orange-500 mb-1">
                7 Nights / 8 Days Trip
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Embark on an enlightening 8-day journey delving into Bhutan's
                ancient cultural treasures and its bountiful natural wonders
                across four western districts. Engage in nature hikes, marvel at
                the untouched wilderness.
              </p>
              <button className="w-full py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-lg shadow-md transition duration-200 active:scale-95 active:bg-orange-700">
                Book Now
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <img
              src="https://www.asiaodysseytravel.com/images/asia-tours/bhutan-tours/gangtey-nature-trail-700-2.jpg"
              alt="Bhutan Cultural & Nature Travel"
              className="w-full h-52 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Bhutan Cultural & Nature Travel
              </h3>
              <p className="text-sm text-orange-500 mb-1">
                9 Nights / 10 Days Trip
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Embark on a responsible and sustainable journey that directly
                supports local communities, promising authentic experiences
                while preserving the environment. Immerse yourself in Bhutan's
                remarkable cultural heritage.
              </p>
              <button className="w-full py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-lg shadow-md transition duration-200 active:scale-95 active:bg-orange-700">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </Container>
      <Container>
        {/* Header Section */}
        <div className="text-center py-10">
          <h3 className="text-2xl sm:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-l from-yellow-400 to-orange-400 inline-block py-2 px-4 rounded-lg shadow-md">
            Bhutan Treks & Adventures
          </h3>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-10 lg:px-20">
          {/* Card 1 */}
          <div className="relative bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <img
              src="https://cdn.kimkim.com/files/a/content_articles/featured_photos/7cf1c8b6cedee7818de86db9512dda2ca3e52511/big-a797fcf55155849db0bce38693a3fbec.jpg"
              alt="Jomolhari Trek"
              className="w-full h-52 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Jomolhari Trek
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                The Jomolhari Trek stands as one of Bhutan's most challenging
                and esteemed treks, often regarded as among the finest globally.
                Mount Jomolhari, towering at 7,326 meters, straddles the border
                between the Tibet Autonomous Region.
              </p>
              <button className="w-full py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-lg shadow-md transition duration-200 active:scale-95 active:bg-orange-700">
                Book Now
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <img
              src="https://bhutanrides.com/wp-content/uploads/2018/06/Slider1-e1536816083795.jpg"
              alt="Bhutan Biking Adventures"
              className="w-full h-52 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Bhutan Biking Adventures
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Experience Bhutan's majestic landscapes on thrilling biking
                adventures. Traverse rugged terrain, winding through picturesque
                valleys and ancient villages. Discover the kingdom's natural
                wonders and vibrant culture from...
              </p>
              <button className="w-full py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-lg shadow-md transition duration-200 active:scale-95 active:bg-orange-700">
                Book Now
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <img
              src="https://pictures.altai-travel.com/1920x0/snowman-trek-in-bhutan-1595.jpg"
              alt="Snowman Trek"
              className="w-full h-52 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Snowman Trek
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Bhutan's Snowman Trek ranks among the toughest Himalayan treks
                and is renowned as one of the most challenging treks globally.
                It's often noted that more individuals have reached the summit
                of Everest than have successfully...
              </p>
              <button className="w-full py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-lg shadow-md transition duration-200 active:scale-95 active:bg-orange-700">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </Container>
      <Container>
        {/* Header Section */}
        <div className="text-center py-10">
          <h3 className="text-2xl sm:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-l from-yellow-400 to-orange-400 inline-block py-2 px-4 rounded-lg shadow-md">
            Bhutan Group Tours
          </h3>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-10 lg:px-20">
          {/* Card 1 */}
          <div className="relative bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <img
              src="https://www.doortohappinessholiday.com/assets/images/bhutan-group-tours-from-india.webp"
              alt="Jomolhari Trek"
              className="w-full h-52 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Bhutan Group Tours Form India
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Dicover the word;s happiest country with our Bhutan Group Tour
                Packages and experience the joyful vacation you've been yearning
                for. From scenic landsacpes to serence monastries, Bhutan group
                toursfrom India offer and ideal blend of relaxation families...
              </p>
              <button className="w-full py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-lg shadow-md transition duration-200 active:scale-95 active:bg-orange-700">
                Book Now
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <img
              src="https://www.doortohappinessholiday.com/assets/images/women-only-bhutan-group-tour.webp"
              alt="Bhutan Biking Adventures"
              className="w-full h-52 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Women Only Bhutan Group Tour
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Discoer Bhutan's beauty and culture on our exclusive Women's
                Tour. Dive into local traditions, explore breathtaking
                landsacpes, and connect with fellow travelers in a supportive,
                empowering environment. Join us for an unforgettable adventure..
              </p>
              <button className="w-full py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-lg shadow-md transition duration-200 active:scale-95 active:bg-orange-700">
                Book Now
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <img
              src="https://www.doortohappinessholiday.com/assets/images/nepal-bhutan-combined-tour-packages.webp"
              alt="Snowman Trek"
              className="w-full h-52 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Nepal and Bhutan Group Tour Packages
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Don't miss the chance to explore both Nepal and Bhutan in a
                single trip. Combine the enchanting beauty of these Himalayan
                Kingdoms into one unforgettable tour. Immerse yourself in the
                serenity and spirituality of Nepal and Bhutan with our combined
                tour packages.
              </p>
              <button className="w-full py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-lg shadow-md transition duration-200 active:scale-95 active:bg-orange-700">
                Book Now
              </button>
            </div>
          </div>
        </div>
        <WhatsAppButton
          phoneNumber={process.env.NEXT_PUBLIC_PHONE_NO as string}
          message="Hello! I have a question about"
        />
      </Container>
    </>
  );
}

export default index;
