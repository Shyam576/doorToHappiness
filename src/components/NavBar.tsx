import Link from "next/link";
// Removed unused imports: useTheme, useDispatch, useSelector, themes, authRoutes, Dispatch, RootState, useAuthenticatedSocket
import { useRouter } from "next/router";
import { AiOutlineMenu } from "react-icons/ai";

import logo from '../../public/logo.png'; // Assuming logo is correctly imported

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = () => {
	const router = useRouter(); // Keep router if needed for active link styling later

	// Removed Redux/Auth/Theme logic as it wasn't used in the provided snippet for layout
	// const { theme, setTheme } = useTheme();
	// const dispatch = useDispatch<Dispatch>();
	// const { user, authenticated } = useSelector(
	// 	(state: RootState) => state.user
	// );
	// const thisRoute = authRoutes.includes(router.pathname);
	// const logout = async () => { ... };

	return (
		<nav className="bg-[url('../../public/dzonglight.png')] bg-cover bg-center sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200">
			{/* Main container uses justify-between to push Logo/Name left and Nav links right */}
			<div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 py-1">
				{/* --- Left Section (Logo/Name/Hamburger) --- */}
				<div className="flex items-center">
					{/* Hamburger Menu Icon */}
					<div className="lg:hidden mr-3">
						<label htmlFor="menu-toggle" className="cursor-pointer">
							<AiOutlineMenu size={24} className="text-gray-700" />
						</label>
					</div>

					{/* Logo and Company Name Link */}
					<Link
						href="/"
						className="flex items-center gap-2 group"
					>
						<img
							src={logo.src}
							alt="Door To Happiness Holidays Logo"
							className="w-30 h-16 rounded-lg transition-transform duration-300 group-hover:scale-105 flex-shrink-0"
						/>
						<div className="hidden sm:flex flex-col">
                            <span className="font-bold text-lg text-gray-800 group-hover:text-yellow-600 transition-colors duration-300 leading-tight">
                                Your Happiness is our 
                            </span>
                            <span className="text-sm font-medium text-yellow-700 group-hover:text-yellow-600 transition-colors duration-300 leading-tight">
								Priority
                            </span>
                        </div>
					</Link>
				</div>

				{/* --- Right Section (Nav Links - Pushed Right by justify-between) --- */}
				{/* This div is the second direct child of the main flex container */}
				<div className="hidden lg:flex items-center space-x-6 font-medium">
					<Link
						href="/home"
						className="hover:text-yellow-600 text-gray-700 transition-colors duration-200"
					>
						Home
					</Link>
					<Link
						href="/package"
						className="hover:text-yellow-600 text-gray-700 transition-colors duration-200"
					>
						Packages
					</Link>
					<Link
						href="/destination"
						className="hover:text-yellow-600 text-gray-700 transition-colors duration-200"
					>
						Destinations
					</Link>
					<Link
						href="/contactus"
						className="hover:text-yellow-600 text-gray-700 transition-colors duration-200"
					>
						Contact Us
					</Link>
					<Link
						href="/faq"
						className="hover:text-yellow-600 text-gray-700 transition-colors duration-200"
					>
						FAQ
					</Link>
					{/* Optional: Add Login/Account buttons here if they should be aligned right with nav links */}
					{/* <button className="ml-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Login</button> */}
				</div>

				{/* The empty placeholder div that was here is REMOVED */}

			</div>

			{/* --- Mobile Dropdown Menu --- */}
			{/* Input needs to be outside the main flex container but ideally right before the dropdown div */}
			<input type="checkbox" id="menu-toggle" className="hidden peer" />
			<div
				className="lg:hidden peer-checked:block hidden bg-white shadow-md border-t border-gray-200"
				id="mobile-menu"
			>
				<ul className="flex flex-col space-y-1 p-4">
					{/* Mobile links remain the same */}
					<Link href="/home" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-yellow-600">Home</Link>
					<Link href="/package" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-yellow-600">Packages</Link>
					<Link href="/destination" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-yellow-600">Destinations</Link>
					<Link href="/contactus" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-yellow-600">Contact Us</Link>
					<Link href="/faq" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-yellow-600">FAQ</Link>
				</ul>
			</div>
		</nav>
	);
};