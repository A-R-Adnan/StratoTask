
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  // Navigation handlers
  const handleHomeClick = () => {
    navigate("/");
    closeMenu();
  };

  const handleLoginClick = () => {
    navigate("/auth?mode=login");
    closeMenu();
  };

  const handleSignupClick = () => {
    navigate("/auth?mode=signup");
    closeMenu();
  };

  return (
    <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Left side: Logo */}
        <div
          className="flex items-center space-x-2 cursor-pointer select-none"
          onClick={() => {
            navigate("/");
            closeMenu();
          }}
          aria-label="Navigate to home"
        >
          {/* Logo Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8"
          >
            <rect x="3" y="3" width="7" height="18" />
            <rect x="14" y="3" width="7" height="12" />
          </svg>
          {/* Brand Name */}
          <span className="font-extrabold text-blue-600 text-xl select-none">
            StratoTask
          </span>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex space-x-8 text-gray-700 font-medium text-sm">
          {/* Home Button */}
          <button
            onClick={handleHomeClick}
            className="hover:text-blue-600 transition focus:outline-none"
            aria-label="Go to Home page"
          >
            Home
          </button>

          {/* Other Nav Links */}
          <button className="hover:text-blue-600 transition flex items-center space-x-1 focus:outline-none">
            <span>Features</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button className="hover:text-blue-600 transition flex items-center space-x-1 focus:outline-none">
            <span>Solutions</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button className="hover:text-blue-600 transition focus:outline-none">Plans</button>
          <button className="hover:text-blue-600 transition focus:outline-none">Pricing</button>
          <button className="hover:text-blue-600 transition flex items-center space-x-1 focus:outline-none">
            <span>Resources</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={handleLoginClick}
            className="text-gray-600 hover:text-blue-600 transition font-medium focus:outline-none"
            aria-label="Navigate to Login page"
          >
            Log In
          </button>
          <button
            onClick={handleSignupClick}
            className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition focus:outline-none"
            aria-label="Navigate to Sign Up page"
          >
            Get StratoTask for free
          </button>
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu: sliding drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40
          ${menuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <nav className="flex flex-col mt-16 p-6 space-y-4 text-gray-700 font-medium">
          <button
            onClick={handleHomeClick}
            className="text-left hover:text-blue-600 focus:outline-none"
          >
            Home
          </button>
          <button onClick={closeMenu} className="text-left hover:text-blue-600 focus:outline-none">
            Features
          </button>
          <button onClick={closeMenu} className="text-left hover:text-blue-600 focus:outline-none">
            Solutions
          </button>
          <button onClick={closeMenu} className="text-left hover:text-blue-600 focus:outline-none">
            Plans
          </button>
          <button onClick={closeMenu} className="text-left hover:text-blue-600 focus:outline-none">
            Pricing
          </button>
          <button onClick={closeMenu} className="text-left hover:text-blue-600 focus:outline-none">
            Resources
          </button>

          <hr className="my-4 border-gray-200" />

          <button
            onClick={handleLoginClick}
            className="text-left hover:text-blue-600 focus:outline-none"
          >
            Log In
          </button>
          <button
            onClick={handleSignupClick}
            className="bg-blue-600 text-white font-semibold px-4 py-2 rounded shadow hover:bg-blue-700 transition"
          >
            Get StratoTask for free
          </button>
        </nav>
      </div>

      {/* Overlay when menu is open */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-30"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </nav>
  );
};

export default Navbar;
