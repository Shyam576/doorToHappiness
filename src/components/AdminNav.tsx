import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineMenu } from "react-icons/ai";
import logo from '../../public/logo.png';

interface NavBarProps {}

export const AdminNav: React.FC<NavBarProps> = () => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Redirect to login page after successful logout
                router.push('/login');
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <nav className="bg-[url('../../public/dzonglight.png')] bg-cover bg-center sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200">
            <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 py-1">
                {/* Left Section (Logo/Name/Hamburger) */}
                <div className="flex items-center">
                    {/* Hamburger Menu Icon */}
                    <div className="lg:hidden mr-3">
                        <label htmlFor="menu-toggle" className="cursor-pointer">
                            <AiOutlineMenu size={24} className="text-gray-700" />
                        </label>
                    </div>

                    {/* Logo and Company Name Link */}
                    <Link
                        href="/admin"
                        className="flex items-center gap-2 group"
                    >
                        <img
                            src={logo.src}
                            alt="Door To Happiness Holidays Logo"
                            className="w-30 h-16 rounded-lg transition-transform duration-300 group-hover:scale-105 flex-shrink-0"
                        />
                        <div className="hidden sm:flex flex-col">
                            <span className="font-bold text-lg text-gray-800 group-hover:text-yellow-600 transition-colors duration-300 leading-tight">
                                Admin Dashboard
                            </span>
                            <span className="text-sm font-medium text-yellow-700 group-hover:text-yellow-600 transition-colors duration-300 leading-tight">
                                Management Portal
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Right Section (Nav Links) */}
                <div className="hidden lg:flex items-center space-x-6 font-medium">
                    <Link
                        href="/admin/majorCityPackage"
                        className={`hover:text-yellow-600 transition-colors duration-200 ${router.pathname === '/admin/majorCityPackage' ? 'text-yellow-600 font-semibold' : 'text-gray-700'}`}
                    >
                        Packages
                    </Link>
                    <Link
                        href="/admin/destination"
                        className={`hover:text-yellow-600 transition-colors duration-200 ${router.pathname === '/admin/destination' ? 'text-yellow-600 font-semibold' : 'text-gray-700'}`}
                    >
                        Destinations
                    </Link>
                    <Link
                        href="/admin/contactus"
                        className={`hover:text-yellow-600 transition-colors duration-200 ${router.pathname === '/admin/contactus' ? 'text-yellow-600 font-semibold' : 'text-gray-700'}`}
                    >
                        Messages
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="hover:text-yellow-600 text-gray-700 transition-colors duration-200"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            <input type="checkbox" id="menu-toggle" className="hidden peer" />
            <div
                className="lg:hidden peer-checked:block hidden bg-white shadow-md border-t border-gray-200"
                id="mobile-menu"
            >
                <ul className="flex flex-col space-y-1 p-4">
                    <Link 
                        href="/admin/majorCityPackage" 
                        className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 hover:text-yellow-600 ${router.pathname === '/admin/majorCityPackage' ? 'text-yellow-600 font-semibold' : 'text-gray-700'}`}
                    >
                        Packages
                    </Link>
                    <Link 
                        href="/admin/destination" 
                        className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 hover:text-yellow-600 ${router.pathname === '/admin/destination' ? 'text-yellow-600 font-semibold' : 'text-gray-700'}`}
                    >
                        Destinations
                    </Link>
                    <Link 
                        href="/admin/contactus" 
                        className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 hover:text-yellow-600 ${router.pathname === '/admin/contactus' ? 'text-yellow-600 font-semibold' : 'text-gray-700'}`}
                    >
                        Messages
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-yellow-600"
                    >
                        Logout
                    </button>
                </ul>
            </div>
        </nav>
    );
};