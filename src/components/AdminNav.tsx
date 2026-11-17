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
        <nav className="bg-[url('../../public/dzonglight.jpg')] bg-cover bg-center sticky top-0 z-50 bg-white shadow-lg border-b border-stone-200">
            <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 py-1">
                {/* Left Section (Logo/Name/Hamburger) */}
                <div className="flex items-center">
                    {/* Hamburger Menu Icon */}
                    <div className="lg:hidden mr-3">
                        <label htmlFor="menu-toggle" className="cursor-pointer">
                            <AiOutlineMenu size={24} className="text-stone-700" />
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
                            className="w-24 h-12 rounded-lg transition-transform duration-300 group-hover:scale-105 flex-shrink-0"
                        />
                        <div className="hidden sm:flex flex-col">
                            <span className="font-bold text-base text-stone-800 group-hover:text-amber-800 transition-colors duration-300 leading-tight">
                                Admin Dashboard
                            </span>
                            <span className="text-xs font-medium text-amber-800 group-hover:text-amber-800 transition-colors duration-300 leading-tight">
                                Management Portal
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Right Section (Nav Links) */}
                <div className="hidden lg:flex items-center space-x-6 font-medium">
                    <Link
                        href="/admin/majorCityPackage"
                        className={`hover:text-amber-800 transition-colors duration-200 ${router.pathname === '/admin/majorCityPackage' ? 'text-amber-800 font-semibold' : 'text-stone-700'}`}
                    >
                        Packages
                    </Link>
                    <Link
                        href="/admin/destination"
                        className={`hover:text-amber-800 transition-colors duration-200 ${router.pathname === '/admin/destination' ? 'text-amber-800 font-semibold' : 'text-stone-700'}`}
                    >
                        Destinations
                    </Link>
                    <Link
                        href="/invoice/generator"
                        className={`hover:text-amber-800 transition-colors duration-200 ${router.pathname === '/invoice/generator' ? 'text-amber-800 font-semibold' : 'text-stone-700'}`}
                    >
                        Invoice Generator
                    </Link>
                    <Link
                        href="/admin/contactus"
                        className={`hover:text-amber-800 transition-colors duration-200 ${router.pathname === '/admin/contactus' ? 'text-amber-800 font-semibold' : 'text-stone-700'}`}
                    >
                        Messages
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="hover:text-amber-800 text-stone-700 transition-colors duration-200"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            <input type="checkbox" id="menu-toggle" className="hidden peer" />
            <div
                className="lg:hidden peer-checked:block hidden bg-white shadow-md border-t border-stone-200"
                id="mobile-menu"
            >
                <ul className="flex flex-col space-y-1 p-4">
                    <Link 
                        href="/admin/majorCityPackage" 
                        className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-stone-100 hover:text-amber-800 ${router.pathname === '/admin/majorCityPackage' ? 'text-amber-800 font-semibold' : 'text-stone-700'}`}
                    >
                        Packages
                    </Link>
                    <Link 
                        href="/admin/destination" 
                        className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-stone-100 hover:text-amber-800 ${router.pathname === '/admin/destination' ? 'text-amber-800 font-semibold' : 'text-stone-700'}`}
                    >
                        Destinations
                    </Link>
                    <Link 
                        href="/invoice/generator" 
                        className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-stone-100 hover:text-amber-800 ${router.pathname === '/invoice/generator' ? 'text-amber-800 font-semibold' : 'text-stone-700'}`}
                    >
                        Invoice Generator
                    </Link>
                    <Link 
                        href="/admin/contactus" 
                        className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-stone-100 hover:text-amber-800 ${router.pathname === '/admin/contactus' ? 'text-amber-800 font-semibold' : 'text-stone-700'}`}
                    >
                        Messages
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:bg-stone-100 hover:text-amber-800"
                    >
                        Logout
                    </button>
                </ul>
            </div>
        </nav>
    );
};