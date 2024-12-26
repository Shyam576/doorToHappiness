import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Container } from "../components/Container"; // Adjust the import based on your project setup

const keywords = [
	"Bhutan",
	"The Last Shangri-La",
	"Himalayas",
	"The Land of Happiness",
];

const Index: React.FC = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [randomWord, setRandomWord] = useState(keywords[0]);
	const [fadeOut, setFadeOut] = useState(false);

	const slides = [
		{
			id: 1,
			src: "https://johnryle.com/wp-content/uploads/2016/06/RC-This-year-in-Bhutan-1.jpg",
			title: "Welcome to Slide 1",
			description: "Experience the beauty of stunning landscapes.",
		},
		{
			id: 2,
			src: "https://www.andbeyond.com/wp-content/uploads/sites/5/padd-field-thimpu-bhutan.jpg",
			title: "Welcome to Slide 2",
			description: "Discover breathtaking views and experiences.",
		},
		{
			id: 3,
			src: "https://www.olgafinearts.com/wp-content/gallery/bhutan-landscape/BTN-OL-850_1800.jpg",
			title: "Welcome to Slide 3",
			description: "Let your adventures begin here.",
		},
		{
			id: 4,
			src: "https://cms.travelnoire.com/wp-content/uploads/2024/04/GettyImages-157282251-1568x1045.jpg",
			title: "Welcome to Slide 4",
			description: "Explore the wonders of the world with us.",
		},
	];

	// Auto-slide and animated keyword change
	useEffect(() => {
		const interval = setInterval(() => {
			setFadeOut(true); // Trigger fade-out animation
			setTimeout(() => {
				setCurrentSlide((prev) => (prev + 1) % slides.length);
				setRandomWord(
					keywords[Math.floor(Math.random() * keywords.length)]
				);
				setFadeOut(false); // Trigger fade-in animation
			}, 500); // Ensure fade-out completes before changing the word
		}, 5000);

		return () => clearInterval(interval);
	}, [slides.length]);

	return (
		<div className="bg-[url('../../public/backgroundbanner.jpeg')] bg-cover bg-fixed bg-center">
			<Head>
				<title>Door To Happiness</title>
				<meta name="description" content="Welcome to Bhutan" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Container>
				<div className="relative w-full h-[80vh] overflow-hidden mb-10 mt-10">
					{/* Image Carousel */}
					<div
						className="flex w-full h-full transition-transform duration-700 ease-in-out"
						style={{
							transform: `translateX(${-100 * currentSlide}%)`,
						}}
					>
						{slides.map((slide) => (
							<div
								key={slide.id}
								className="w-full flex-shrink-0 relative h-full"
							>
								<img
									src={slide.src}
									alt={`Slide ${slide.id}`}
									className="w-full h-full object-cover rounded-2xl"
								/>
							</div>
						))}
					</div>

					{/* Text Content */}
					<div className="absolute inset-0 flex justify-center items-center z-10">
						<div className="text-white text-center">
							<h2 className="text-3xl sm:text-7xl font-bold">
								Welcome to{" "}
								<span
									className={`text-yellow-400 transition-opacity duration-500 ${
										fadeOut ? "opacity-0" : "opacity-100"
									}`}
								>
									{randomWord}
								</span>
							</h2>
							<p className="mt-4 text-lg">
								Experience the beauty of stunning landscapes.
							</p>
							{/* CTA Button */}
							<div className="mt-6">
								<button className="px-6 py-2 bg-yellow-500 text-white font-bold rounded-full shadow-md hover:bg-orange-400 transition">
									Connect Now
								</button>
							</div>
						</div>
					</div>

					{/* Navigation Buttons */}
					{/* Navigation Buttons */}
					<div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between z-10">
						<button
							className="btn btn-circle hidden sm:block"
							onClick={() => {
								setFadeOut(true);
								setTimeout(() => {
									setCurrentSlide(
										(currentSlide - 1 + slides.length) %
											slides.length
									);
									setRandomWord(
										keywords[
											Math.floor(
												Math.random() * keywords.length
											)
										]
									);
									setFadeOut(false);
								}, 500);
							}}
						>
							❮
						</button>
						<button
							className="btn btn-circle hidden sm:block"
							onClick={() => {
								setFadeOut(true);
								setTimeout(() => {
									setCurrentSlide(
										(currentSlide + 1) % slides.length
									);
									setRandomWord(
										keywords[
											Math.floor(
												Math.random() * keywords.length
											)
										]
									);
									setFadeOut(false);
								}, 500);
							}}
						>
							❯
						</button>
					</div>
				</div>
				<h2 className="text-4xl font-bold text-center my-6">
					Destinations
				</h2>
				{/* Responsive Grid Section */}
				<div className="grid py-10 grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Row 1 */}
					<div className="flex flex-col lg:flex-row items-center">
						<img
							src="https://media.istockphoto.com/id/940114158/photo/bhutan.jpg?s=612x612&w=0&k=20&c=IGCji0usEyzwppKyXjMVTXapcU8XXDI9XLKSQkZ5o0M="
							alt="Dummy Image"
							className="w-full lg:w-1/2 rounded-xl shadow-lg"
						/>
						<div className="mt-4 lg:mt-0 lg:ml-8">
							<h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-l from-yellow-400 to-orange-400">
								Explore Stunning Destinations
							</h3>
							<p className="text-lg text-gray-500">
								Discover a world of adventure, breathtaking
								landscapes, and unique cultures. Your journey
								starts here!
							</p>
						</div>
					</div>

					{/* Row 2 */}
					<div className="flex flex-col lg:flex-row items-center">
						<img
							src="https://media.istockphoto.com/id/1266380165/photo/village-under-the-mountain-with-trees-in-gangtey-in-bhutan.jpg?s=612x612&w=0&k=20&c=wlRRG86EwpG9Gs5-41GIYvvNmhMeDtp5lZBYSaLjtBo="
							alt="Dummy Image"
							className="w-full lg:w-1/2 rounded-xl shadow-lg"
						/>
						<div className="mt-4 lg:mt-0 lg:ml-8">
							<h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-l from-yellow-400 to-orange-400">
								Unleash Your Inner Explorer
							</h3>
							<p className="text-lg text-gray-500">
								Whether you're seeking thrills or tranquility,
								we offer experiences tailored to your desires.
							</p>
						</div>
					</div>

					{/* Row 3 */}
					<div className="flex flex-col lg:flex-row items-center">
						<img
							src="https://johnryle.com/wp-content/uploads/2016/06/RC-This-year-in-Bhutan-1.jpg"
							alt="Dummy Image"
							className="w-full lg:w-1/2 rounded-xl shadow-lg"
						/>
						<div className="mt-4 lg:mt-0 lg:ml-8">
							<h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-l from-yellow-400 to-orange-400">
								Capture Memories That Last
							</h3>
							<p className="text-lg text-gray-500">
								Let us guide you to unforgettable moments and
								breathtaking scenes.
							</p>
						</div>
					</div>
					<div className="flex flex-col lg:flex-row items-center">
						<img
							src="https://thatwildidea.co.uk/wp-content/uploads/2019/02/Bhutan-Photo-Essay-8-1024x683.jpg"
							alt="Dummy Image"
							className="w-full lg:w-1/2 rounded-xl shadow-lg"
						/>
						<div className="mt-4 lg:mt-0 lg:ml-8">
							<h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-l from-yellow-400 to-orange-400">
								Explore Stunning Destinations
							</h3>
							<p className="text-lg text-gray-500">
								Let us guide you to unforgettable moments and
								breathtaking scenes.
							</p>
						</div>
					</div>
				</div>
			</Container>
			<Container>
				{/* Header Section */}
				<div className="text-center py-10">
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
						Bhutan Packages by Themes
					</h2>
					<h3 className="text-2xl sm:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-l from-yellow-400 to-orange-400 inline-block py-2 px-4 rounded-lg shadow-md">
						Explore Bhutan Tour from Major Cities
					</h3>
				</div>

				{/* Cards Section */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-10 lg:px-20">
					{/* Card 1 */}
					<div className="relative bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
						<img
							src="https://www.heavenlybhutan.com/wp-content/uploads/2020/08/Dochula-Pass.jpg"
							alt="Mumbai Package"
							className="w-full h-52 object-cover"
						/>
						<div className="p-6">
							<h3 className="text-2xl font-bold text-gray-800 mb-2">
								Bhutan Tour Packages from Mumbai
							</h3>
							<p className="text-sm text-orange-500 mb-1">
								Thimphu | Punakha | Paro | Taktsang Monastery
							</p>
							<p className="text-sm text-gray-500 mb-4">
								7N/8D Trip [Paro to Paro]
							</p>
							<p className="text-gray-700 leading-relaxed mb-6">
								Embark on an extraordinary journey from the
								bustling streets of Mumbai to the serene
								landscapes of Bhutan with our exclusive Bhutan
								package.
							</p>
							<button className="w-full py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-lg shadow-md transition duration-200 active:scale-95 active:bg-orange-700">
								Book Now
							</button>
						</div>
					</div>

					{/* Card 2 */}
					<div className="relative bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
						<img
							src="https://ucarecdn.com/0cd90602-b4ec-45a4-813c-f31eb4bab65a/"
							alt="Bagdogra Package"
							className="w-full h-52 object-cover"
						/>
						<div className="p-6">
							<h3 className="text-2xl font-bold text-gray-800 mb-2">
								Bhutan Tour Packages from Bagdogra
							</h3>
							<p className="text-sm text-orange-500 mb-1">
								Phuentsholing | Thimphu | Punakha | Paro |
								Lataguri
							</p>
							<p className="text-sm text-gray-500 mb-4">
								7N/8D Trip [IXB to IXB]
							</p>
							<p className="text-gray-700 leading-relaxed mb-6">
								Seek happiness and peace of mind with a Bhutan
								package tour from Bagdogra, featuring scenic
								views and cultural experiences.
							</p>
							<button className="w-full py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-lg shadow-md transition duration-200 active:scale-95 active:bg-orange-700">
								Book Now
							</button>
						</div>
					</div>

					{/* Card 3 */}
					<div className="relative bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
						<img
							src="https://www.exoticmiles.com/bhutan/the-memorial-chorten/"
							alt="Kolkata Package"
							className="w-full h-52 object-cover"
						/>
						<div className="p-6">
							<h3 className="text-2xl font-bold text-gray-800 mb-2">
								Bhutan Tour Packages from Kolkata
							</h3>
							<p className="text-sm text-orange-500 mb-1">
								Thimphu | Punakha | Phobjikha | Paro | Chele-La
								Pass
							</p>
							<p className="text-sm text-gray-500 mb-4">
								7N/8D Trip [Paro to Paro]
							</p>
							<p className="text-gray-700 leading-relaxed mb-6">
								Experience a journey of a lifetime from Kolkata
								to Bhutan, soaking in the rich culture and
								breathtaking vistas along the way.
							</p>
							<button className="w-full py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-lg shadow-md transition duration-200 active:scale-95 active:bg-orange-700">
								Book Now
							</button>
						</div>
					</div>
				</div>

				{/* View All Section */}
				<div className="flex justify-center py-8">
					<button className="flex items-center py-2 px-6 text-white font-semibold bg-gradient-to-r from-yellow-500 to-orange-400 rounded-lg shadow-md hover:bg-orange-600 transition duration-300">
						View All
						<svg
							className="w-5 h-5 ml-2"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M9 5l7 7-7 7"
							></path>
						</svg>
					</button>
				</div>
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
							<p className="text-sm text-gray-500 mb-4">
								5N/6D Trip
							</p>
							<p className="text-gray-700 leading-relaxed mb-6">
								Set off on an enthralling six-day expedition to
								the mystical realm of Bhutan, climaxing with the
								lively and spiritually enriching Paro Festival.
								This experience assures a fusion of cultural...
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
							<p className="text-sm text-gray-500 mb-4">
								9N/10D Trip
							</p>
							<p className="text-gray-700 leading-relaxed mb-6">
								The Royal Highlander Festival unveils the
								splendor and marvels of Gasa Dzongkhang,
								showcasing its natural beauty, historical
								significance, and timeless traditions. By
								embodying Gasa's vision..
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
							<p className="text-sm text-gray-500 mb-4">
								6N/7D Trip
							</p>
							<p className="text-gray-700 leading-relaxed mb-6">
								Experience the vibrancy of Bhutan's culture at
								Thimphu Tsechu festival 2024, happening
								EditProfileForm Septemeber 12th to 18th. Delve
								into a week-long celebration featuring
								traditional masked dances...
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
								Experience Bhutan through a fresh lens with the
								Bhutan Classic Cultural Tour. Immerse yourself
								in the vibrant local culture as you journey
								through Thimphu, Paro, Punakha, and Gangtey.
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
								Embark on an enlightening 8-day journey delving
								into Bhutan's ancient cultural treasures and its
								bountiful natural wonders across four western
								districts. Engage in nature hikes, marvel at the
								untouched wilderness.
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
								Embark on a responsible and sustainable journey
								that directly supports local communities,
								promising authentic experiences while preserving
								the environment. Immerse yourself in Bhutan's
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
								The Jomolhari Trek stands as one of Bhutan's
								most challenging and esteemed treks, often
								regarded as among the finest globally. Mount
								Jomolhari, towering at 7,326 meters, straddles
								the border between the Tibet Autonomous Region.
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
								Experience Bhutan's majestic landscapes on
								thrilling biking adventures. Traverse rugged
								terrain, winding through picturesque valleys and
								ancient villages. Discover the kingdom's natural
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
								Bhutan's Snowman Trek ranks among the toughest
								Himalayan treks and is renowned as one of the
								most challenging treks globally. It's often
								noted that more individuals have reached the
								summit of Everest than have successfully...
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
								Dicover the word;s happiest country with our
								Bhutan Group Tour Packages and experience the
								joyful vacation you've been yearning for. From
								scenic landsacpes to serence monastries, Bhutan
								group toursfrom India offer and ideal blend of
								relaxation families...
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
								Discoer Bhutan's beauty and culture on our
								exclusive Women's Tour. Dive into local
								traditions, explore breathtaking landsacpes, and
								connect with fellow travelers in a supportive,
								empowering environment. Join us for an
								unforgettable adventure..
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
								Don't miss the chance to explore both Nepal and
								Bhutan in a single trip. Combine the enchanting
								beauty of these Himalayan Kingdoms into one
								unforgettable tour. Immerse yourself in the
								serenity and spirituality of Nepal and Bhutan
								with our combined tour packages.
							</p>
							<button className="w-full py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-lg shadow-md transition duration-200 active:scale-95 active:bg-orange-700">
								Book Now
							</button>
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default Index;
