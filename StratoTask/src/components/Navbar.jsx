import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const { currentUser, logout, loading } = useAuth();

  useEffect(() => {
    if (!menuOpen) return;
    const focusable = menuRef.current?.querySelectorAll(
      "button, [tabindex]:not([tabindex='-1'])"
    );
    const first = focusable?.[0], last = focusable?.[focusable.length - 1];

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
      if (!focusable?.length) return;
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
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

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      setMenuOpen(false);
    } catch (error) {
      alert("Logout failed: " + error.message);
    }
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-50">
      {/* Top bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="
            h-16 flex justify-between items-center
            bg-white/40 backdrop-blur-md
            border-b border-indigo-200
            rounded-b-2xl shadow-md
            px-3 md:px-6
          "
        >
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer select-none"
            onClick={() => go("/")}
            aria-label="Navigate to home"
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
            <span className="font-extrabold text-blue-600 text-xl tracking-tight">
              StratoTask
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <button
              onClick={() => go("/")}
              className="text-gray-700 hover:text-blue-600 transition font-medium focus:outline-none"
            >
              Home
            </button>
          </div>

          {/* Desktop Auth Area */}
          <div className="hidden md:flex items-center space-x-4">
            {!loading && !currentUser && (
              <>
                <button
                  onClick={() => go("/auth?mode=login")}
                  className="text-gray-700 hover:text-blue-600 transition font-medium focus:outline-none"
                >
                  Log In
                </button>
                <button
                  onClick={() => go("/auth?mode=signup")}
                  className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Get StratoTask for free
                </button>
              </>
            )}
            {!loading && currentUser && (
              <>
                <button
                  onClick={() => go("/dashboard")}
                  className="text-gray-700 hover:text-blue-600 font-medium focus:outline-none transition"
                >
                  Dashboard
                </button>
                <span className="text-gray-900 font-semibold px-2">
                  {currentUser.displayName || "User"}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 font-medium focus:outline-none transition"
                >
                  Log Out
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
            >
              {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white/95 backdrop-blur-lg shadow-xl transform transition-transform duration-300 ease-in-out z-40
          ${menuOpen ? "translate-x-0" : "translate-x-full"}
        `}
        ref={menuRef}
        role="dialog"
        aria-modal={menuOpen}
        tabIndex={-1}
      >
        <nav className="flex flex-col mt-16 p-6 space-y-4 text-gray-700 font-medium">
          <button
            onClick={() => go("/")}
            className="text-left hover:text-blue-600 transition focus:outline-none"
          >
            Home
          </button>
          <hr className="my-2 border-gray-200" />
          {!loading && !currentUser && (
            <>
              <button
                onClick={() => go("/auth?mode=login")}
                className="text-left hover:text-blue-600 transition"
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
                className="text-left hover:text-blue-600 transition"
              >
                Dashboard
              </button>
              <span className="text-gray-900 font-semibold px-2">
                {currentUser.displayName || "User"}
              </span>
              <button
                onClick={handleLogout}
                className="text-left text-red-600 hover:text-red-700 transition"
              >
                Log Out
              </button>
            </>
          )}
        </nav>
      </div>

      {/* Overlay for mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </nav>
  );
};

export default Navbar;
