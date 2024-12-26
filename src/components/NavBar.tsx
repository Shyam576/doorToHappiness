import Link from "next/link";
import { useTheme } from "next-themes";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { AiOutlineMenu } from "react-icons/ai";

import { authRoutes, themes } from "../utils/constants";
import { Dispatch, RootState } from "../store/store";
import { useAuthenticatedSocket } from "../utils/useSocket";
import logo  from '../../public/logo.png';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = () => {
	useAuthenticatedSocket("ws://localhost:4000/chat");
	const { theme, setTheme } = useTheme();
	const router = useRouter();
	const dispatch = useDispatch<Dispatch>();
	const { user, authenticated } = useSelector(
		(state: RootState) => state.user
	);

	if (!theme) {
		setTheme("emerald");
	  }

	const thisRoute = authRoutes.includes(router.pathname);

	const logout = async () => {
		try {
			if (thisRoute) {
				router.back();
			}
			dispatch.user.logoutAsync();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<nav className=" bg-[url('../../public/dzonglight.png')] bg-cover bg-fixed bg-center sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200">
			<div className="container mx-auto flex justify-between items-center pl-4 pr-8">
				{/* Left Section */}
				<div className="flex items-center gap-4">
					<div className="lg:hidden">
						<label htmlFor="menu-toggle" className="cursor-pointer">
							<AiOutlineMenu size={24} />
						</label>
					</div>
					<Link
						href="/"
						className="text font-semibold text-gray-800"
					>
						<img
							src={logo.src}
							alt="Dummy Image"
							className="w-28 h-28 rounded-xl"
						/>
                        {/* Door To Happiness */}
					</Link>
				</div>

				{/* Middle Section */}
				<div className="hidden lg:flex items-center space-x-6">
					<Link
						href="/login"
						className="hover:text-blue-500 text-gray-700"
					>
						Home
					</Link>
					<Link
						href="/login"
						className="hover:text-blue-500 text-gray-700"
					>
						Packages
					</Link>
					<Link
						href="/login"
						className="hover:text-blue-500 text-gray-700"
					>
						Destinations
					</Link>
					<Link
						href="/login"
						className="hover:text-blue-500 text-gray-700"
					>
						Contact Us
					</Link>
					<Link
						href="/login"
						className="hover:text-blue-500 text-gray-700"
					>
						Register Now
					</Link>
				</div>

				{/* Right Section - Theme Dropdown */}
				{/* <div className="relative group">
					<div className="flex items-center gap-2 cursor-pointer">
						<svg
							className="w-6 h-6 text-gray-700"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
							></path>
						</svg>
						<p className="text-gray-700">Theme</p>
					</div>
					<ul className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg border border-gray-200 w-40 group-hover:block z-50 hidden peer-focus:block">
						{themes.map((theme, index) => (
							<li
								key={index}
								onClick={() =>
									setTheme(theme.name.toLowerCase())
								}
								className="p-2 hover:bg-gray-100 cursor-pointer text-gray-700"
							>
								{theme.name}
							</li>
						))}
					</ul>
				</div> */}
			</div>

			{/* Mobile Dropdown */}
			<input type="checkbox" id="menu-toggle" className="hidden peer" />
			<div
				className="lg:hidden peer-checked:block hidden bg-white shadow-md border-t border-gray-200"
				id="mobile-menu"
			>
				<ul className="flex flex-col space-y-2 p-4">
					<Link
						href="/login"
						className="hover:text-blue-500 text-gray-700"
					>
						Home
					</Link>
					<Link
						href="/login"
						className="hover:text-blue-500 text-gray-700"
					>
						Packages
					</Link>
					<Link
						href="/login"
						className="hover:text-blue-500 text-gray-700"
					>
						Destinations
					</Link>
					<Link
						href="/login"
						className="hover:text-blue-500 text-gray-700"
					>
						Contact Us
					</Link>
					<Link
						href="/login"
						className="hover:text-blue-500 text-gray-700"
					>
						Register Now
					</Link>
				</ul>
			</div>
		</nav>
	);
};
