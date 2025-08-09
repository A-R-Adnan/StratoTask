import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const { currentUser, logout, loading } = useAuth();

  useEffect(() => {
    if (!menuOpen) return;
    const focusable =
      menuRef.current?.querySelectorAll("button, [tabindex]:not([tabindex='-1'])");
    const first = focusable?.[0], last = focusable?.[focusable.length - 1];

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
      if (!focusable?.length) return;
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    first?.focus();

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const go = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  // Proper logout: use AuthContext logout and redirect
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth?mode=login");
      setMenuOpen(false);
    } catch (error) {
      alert("Logout failed: " + error.message);
    }
  };

  return (
    <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo and Brand */}
        <div
          className="flex items-center space-x-2 cursor-pointer select-none"
          aria-label="Navigate to home"
          onClick={() => go("/")}
        >
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
          <span className="font-extrabold text-blue-600 text-xl">StratoTask</span>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex space-x-8 text-gray-700 font-medium text-sm">
          <button onClick={() => go("/")} className="hover:text-blue-600 transition focus:outline-none">
            Home
          </button>
          {/* (Other nav links/features/solutions/etc.) */}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {!loading && !currentUser && (
            <>
              <button
                onClick={() => go("/auth?mode=login")}
                className="text-gray-600 hover:text-blue-600 transition font-medium focus:outline-none"
                aria-label="Navigate to Login page"
              >
                Log In
              </button>
              <button
                onClick={() => go("/auth?mode=signup")}
                className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition focus:outline-none"
                aria-label="Navigate to Sign Up page"
              >
                Get StratoTask for free
              </button>
            </>
          )}
          {!loading && currentUser && (
            <>
              <button
                onClick={() => go("/dashboard")}
                className="text-gray-600 hover:text-blue-600 transition font-medium focus:outline-none"
                aria-label="Go to Dashboard"
              >
                Dashboard
              </button>
              <span className="text-gray-900 font-semibold px-2">
                {currentUser.displayName || "User"}
              </span>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 transition font-medium focus:outline-none"
                aria-label="Logout"
                type="button"
              >
                Log Out
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40
          ${menuOpen ? "translate-x-0" : "translate-x-full"}
        `}
        ref={menuRef}
        tabIndex={-1}
        aria-modal={menuOpen}
        role="dialog"
      >
        <nav className="flex flex-col mt-16 p-6 space-y-4 text-gray-700 font-medium">
          <button onClick={() => go("/")} className="text-left hover:text-blue-600 focus:outline-none">
            Home
          </button>
          {/* ... Other nav section/feature links ... */}
          <hr className="my-4 border-gray-200" />
          {!loading && !currentUser && (
            <>
              <button
                onClick={() => go("/auth?mode=login")}
                className="text-left hover:text-blue-600 focus:outline-none"
              >
                Log In
              </button>
              <button
                onClick={() => go("/auth?mode=signup")}
                className="bg-blue-600 text-white font-semibold px-4 py-2 rounded shadow hover:bg-blue-700 transition"
              >
                Get StratoTask for free
              </button>
            </>
          )}
          {!loading && currentUser && (
            <>
              <button
                onClick={() => go("/dashboard")}
                className="text-left hover:text-blue-600 focus:outline-none"
              >
                Dashboard
              </button>
              <span className="text-gray-900 font-semibold px-2">
                {currentUser.displayName || "User"}
              </span>
              <button
                onClick={handleLogout}
                className="text-left text-red-600 hover:text-red-700 focus:outline-none"
                type="button"
              >
                Log Out
              </button>
            </>
          )}
        </nav>
      </div>
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-30"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </nav>
  );
};

export default Navbar;
