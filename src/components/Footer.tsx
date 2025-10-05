import Link from 'next/link';

export const Footer = () => {
    return (
      <footer className="bg-neutral text-neutral-content">
        <div className="container mx-auto px-4 py-6">
          {/* Upper Section */}
          <div className="flex flex-col lg:flex-row justify-between items-center">
            {/* Branding */}
            <div className="text-center lg:text-left mb-4 lg:mb-0">
              <h2 className="text-xl font-bold">Door To Happiness</h2>
              <p className="text-sm">Creating seamless experiences since 2022</p>
            </div>
  
            {/* Links */}
            <div className="flex flex-wrap justify-center lg:justify-end space-x-4 text-sm">
              <Link href="/" className="hover:text-gray-400 transition-colors">
                Home
              </Link>
              <Link href="/package" className="hover:text-gray-400 transition-colors">
                Packages
              </Link>
              <Link href="/dzongkhag" className="hover:text-gray-400 transition-colors">
                Dzongkhags
              </Link>
              <Link href="/sacred-places" className="hover:text-gray-400 transition-colors">
                Heritage Places
              </Link>
              <Link href="/faq" className="hover:text-gray-400 transition-colors">
                FAQ
              </Link>
              <Link href="/contactus" className="hover:text-gray-400 transition-colors">
                Contact
              </Link>
            </div>
          </div>
  
          {/* Divider */}
          <div className="my-4 border-t border-gray-700"></div>
  
          {/* Lower Section */}
          <div className="flex flex-col lg:flex-row justify-between items-center">
            {/* Social Icons */}
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 transition-colors"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 transition-colors"
              >
                <i className="fab fa-facebook"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 transition-colors"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  