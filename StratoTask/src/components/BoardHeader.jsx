import React, { useState, useRef, useEffect } from "react";
import { FaCog, FaUserCircle, FaSignOutAlt, FaEdit } from "react-icons/fa";

export default function BoardHeader({
  userName,
  userPhoto, // Pass currentUser.photoURL from parent
  onProfileClick,
  onChangeNameClick,
  onLogout,
  isLoggingOut,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setDropdownOpen(false);
    };
    if (dropdownOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [dropdownOpen]);

  return (
    <header
      className="
        flex flex-wrap justify-between items-center 
        w-full p-4 md:p-6 
        bg-white/40 backdrop-blur-md 
        border border-indigo-200 
        rounded-2xl shadow-lg 
        sticky top-0 z-50
      "
    >
      {/* Board Title */}
      <h1
        className="
          text-2xl md:text-3xl font-extrabold tracking-tight 
          text-indigo-900 truncate
        "
        title={userName ? `${userName}'s Board` : "Board"}
      >
        {userName}&apos;s Board
      </h1>

      {/* Avatar + Settings */}
      <div className="flex items-center gap-3" ref={dropdownRef}>
        {/* User Avatar */}
        {userPhoto ? (
          <img
            src={userPhoto}
            alt="User avatar"
            className="w-10 h-10 rounded-full border-2 border-indigo-300 shadow-sm object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-indigo-100 border-2 border-indigo-300 flex items-center justify-center shadow-sm">
            <FaUserCircle className="text-indigo-500 w-8 h-8" aria-hidden="true" />
          </div>
        )}

        {/* Settings Button */}
        <button
          onClick={() => setDropdownOpen((o) => !o)}
          aria-expanded={dropdownOpen}
          aria-haspopup="true"
          aria-label="Open settings menu"
          className="
            p-2 rounded-full 
            text-indigo-700 
            bg-indigo-100 hover:bg-indigo-200
            shadow-lg
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
            transition
          "
        >
          <FaCog className="w-6 h-6" />
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div
            className="
              absolute right-0 mt-14 w-48 rounded-xl shadow-xl
              bg-white/90 backdrop-blur-md 
              border border-gray-200 
              divide-y divide-gray-100 
              z-50 animate-fadeIn
            "
          >
            <button
              onClick={() => {
                setDropdownOpen(false);
                onProfileClick?.();
              }}
              className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-50 w-full transition"
            >
              <FaUserCircle className="w-5 h-5 text-indigo-700" />
              Profile
            </button>
            <button
              onClick={() => {
                setDropdownOpen(false);
                onChangeNameClick?.();
              }}
              className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-50 w-full transition"
            >
              <FaEdit className="w-5 h-5 text-indigo-700" />
              Change Name
            </button>
            <button
              onClick={() => {
                setDropdownOpen(false);
                onLogout?.();
              }}
              disabled={isLoggingOut}
              className={`flex items-center gap-3 px-4 py-3 w-full transition ${
                isLoggingOut
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-red-600 hover:bg-red-50"
              }`}
            >
              <FaSignOutAlt className="w-5 h-5" />
              {isLoggingOut ? "Logging out…" : "Log out"}
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
