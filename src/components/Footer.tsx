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
            <div className="flex space-x-4 text-sm">
              <a href="#" className="hover:text-gray-400">
                Home
              </a>
              <a href="#" className="hover:text-gray-400">
                About
              </a>
              <a href="#" className="hover:text-gray-400">
                Services
              </a>
              <a href="#" className="hover:text-gray-400">
                Contact
              </a>
            </div>
          </div>
  
          {/* Divider */}
          <div className="my-4 border-t border-gray-700"></div>
  
          {/* Lower Section */}
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <p className="text-sm text-center lg:text-left">
              © 2022-2023 by PoProstuWitold. All rights reserved.
            </p>
  
            {/* Social Icons */}
            <div className="flex space-x-4 mt-4 lg:mt-0">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                <i className="fab fa-facebook"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  