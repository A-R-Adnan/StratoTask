import React, { useState, useRef, useEffect } from "react";
import {
  FaCog,
  FaPlus,
  FaUserCircle,
  FaSignOutAlt,
  FaEdit,
  FaTimesCircle,
} from "react-icons/fa";

const BoardHeader = ({
  userName,
  onAddList,
  onSearchChange,
  searchValue = "",
  onClearSearch,
  onProfileClick,
  onChangeNameClick,
  onLogout,
  isLoggingOut = false,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  // Close dropdown on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        searchInputRef.current?.focus();
      }
    };
    if (dropdownOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [dropdownOpen]);

  return (
    <header className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4 p-4 md:p-5 
      rounded-2xl shadow-lg border border-indigo-100 bg-gradient-to-r from-white/60 to-white/40 
      backdrop-blur-lg sticky top-0 z-30 transition">
      
      {/* Board Title */}
      <h1
        className="text-2xl md:text-3xl font-extrabold text-gray-900 truncate"
        title={userName ? `${userName}'s Board` : "User's Board"}
      >
        {userName}'s Board
      </h1>

      {/* Search Input */}
      <div className="relative flex-grow min-w-[180px] max-w-full md:max-w-md">
        <input
          ref={searchInputRef}
          type="search"
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
          placeholder="Search tasks or lists..."
          className="w-full rounded-md border border-gray-300 pl-4 pr-10 py-2 text-gray-900 
            placeholder-gray-400 bg-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-500
            shadow-sm transition"
        />
        {searchValue && (
          <button
            onClick={() => {
              onClearSearch ? onClearSearch() : onSearchChange?.("");
              searchInputRef.current?.focus();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
            type="button"
            aria-label="Clear search"
          >
            <FaTimesCircle className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Add List */}
      <button
        onClick={onAddList}
        className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-4 py-2 
          rounded-lg shadow hover:from-indigo-600 hover:to-indigo-700 focus:outline-none focus:ring-2 
          focus:ring-offset-2 focus:ring-indigo-400 transition-transform transform hover:scale-[1.02]"
        type="button"
      >
        <FaPlus className="w-5 h-5" />
        <span className="hidden sm:inline">Add List</span>
      </button>

      {/* Settings Dropdown */}
      <nav className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="text-gray-600 hover:text-gray-900 rounded-full p-2 hover:bg-gray-100 
            focus:outline-none focus:ring-2 focus:ring-indigo-400"
          type="button"
          aria-label="Open settings menu"
        >
          <FaCog className="w-6 h-6 md:w-7 md:h-7" />
        </button>

        {dropdownOpen && (
          <div
            className="absolute right-0 mt-2 w-48 bg-white/90 backdrop-blur-md border border-gray-200 
              rounded-lg shadow-xl z-50 animate-fadeIn overflow-hidden"
          >
            <button
              type="button"
              onClick={() => {
                setDropdownOpen(false);
                onProfileClick?.();
              }}
              className="w-full px-4 py-2 text-gray-700 hover:bg-indigo-50 flex items-center gap-2"
            >
              <FaUserCircle className="w-5 h-5" /> Profile
            </button>
            <button
              type="button"
              onClick={() => {
                setDropdownOpen(false);
                onChangeNameClick?.();
              }}
              className="w-full px-4 py-2 text-gray-700 hover:bg-indigo-50 flex items-center gap-2"
            >
              <FaEdit className="w-5 h-5" /> Change Name
            </button>
            <button
              type="button"
              onClick={() => {
                setDropdownOpen(false);
                onLogout?.();
              }}
              disabled={isLoggingOut}
              className={`w-full px-4 py-2 flex items-center gap-2 ${
                isLoggingOut
                  ? "text-red-300 cursor-not-allowed"
                  : "text-red-600 hover:bg-red-50"
              }`}
            >
              <FaSignOutAlt className="w-5 h-5" />
              {isLoggingOut ? "Logging out..." : "Log out"}
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default BoardHeader;
