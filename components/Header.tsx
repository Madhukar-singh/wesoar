import React, { useState } from "react";
import {
  Search,
  Moon,
  Star,
  Bell,
  ChevronDown,
  Menu as MenuIcon,
  ArrowLeft,
} from "lucide-react"; // Using lucide-react for icons

// Main App component
export default function App() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);

  // Dummy navigation items
  const navItems = [
    { name: "Programs", hasDropdown: true },
    { name: "Certificates", hasDropdown: true },
    { name: "Initiatives", hasDropdown: true },
    { name: "Events", hasDropdown: true },
  ];

  return (
    // Header container (replaces AppBar)
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <header className="bg-white my-4">
        <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Left Section: Logo */}
          <div className="flex items-center flex-shrink-0">
            {/* Placeholder for the logo icon */}
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-600 mr-2"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            <div className="text-gray-800 font-semibold text-lg">
              الأكاديمية المالية
              <br />
              <span className="text-sm font-normal text-gray-600">
                THE FINANCIAL ACADEMY
              </span>
            </div>
          </div>

          {/* Middle Section: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center flex-grow justify-center space-x-8 px-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href="#" // Use appropriate href for actual navigation
                className="flex items-center text-blue-900 hover:text-blue-900 text-base font-medium"
              >
                {item.name}
                {item.hasDropdown && <ChevronDown size={16} className="ml-1" />}
              </a>
            ))}
          </nav>

          {/* Right Section: Search, Language, Icons, User Profile */}
          <div className="flex items-center flex-shrink-0 space-x-2 md:space-x-4">
            {/* Search Bar */}
            <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 bg-gray-50 flex-grow max-w-[180px] sm:max-w-[250px] md:max-w-[300px]">
              <Search className="text-gray-500 mr-2" size={20} />
              <input
                type="text"
                placeholder="What do you want to learn?"
                aria-label="search"
                className="flex-grow text-gray-700 text-sm bg-transparent outline-none"
              />
            </div>

            {/* User Profile with Dropdown - Hidden on small screens */}
            <div className="hidden md:flex items-center relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center normal-case text-gray-800 hover:bg-gray-100 rounded-full pr-2 py-1 focus:outline-none"
              >
                <img
                  alt="Mohamed Ebrahim"
                  src="https://placehold.co/40x40/E0E0E0/333333?text=ME" // Placeholder image
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span className="text-sm font-medium">Mohamed Ebrahim</span>
                <ChevronDown size={16} className="ml-1 text-gray-600" />
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Account
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </a>
                </div>
              )}
            </div>

            {/* Mobile Menu Icon - Visible only on small screens */}
            <div className="md:hidden">
              <button
                onClick={() => setIsNavMenuOpen(!isNavMenuOpen)}
                className="text-gray-600 p-2 rounded-full hover:bg-gray-100 focus:outline-none"
                aria-label="open navigation menu"
              >
                <MenuIcon size={24} />
              </button>
              {isNavMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  {navItems.map((item) => (
                    <a
                      key={item.name}
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {item.name}
                    </a>
                  ))}
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    عربي
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Theme
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Notifications
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <div className="bg-white py-8 px-4 sm:px-6 lg:px-8 my-4">
        {/* Back to Programs Overview */}
        <div className="flex items-center text-blue-600 hover:text-blue-800 cursor-pointer mb-4">
          <ArrowLeft size={16} className="mr-2" />
          <span className="text-sm font-medium">Programs Overview</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-800 mb-2">
          <span className="text-blue-600">Explore</span> Programs
        </h1>

        {/* Subtitle/Description */}
        <p className="text-gray-600 text-lg sm:text-xl leading-relaxed">
          Collaboratively administrate empowered markets plug and play networks
          dynamically procrastinated
        </p>
      </div>
    </div>
  );
}
