import React, { useState, useRef, useEffect } from "react";
import { FaCog, FaPlus, FaUserCircle, FaSignOutAlt, FaEdit, FaTimesCircle } from "react-icons/fa";

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
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  // Close dropdown on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        if (searchInputRef.current) searchInputRef.current.focus();
      }
    };
    if (dropdownOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [dropdownOpen]);

  return (
    <header className="flex flex-wrap md:flex-nowrap items-center justify-between p-4 md:p-5 bg-white rounded-lg shadow-lg border border-gray-200 gap-4">
      {/* Board Title */}
      <h1
        className="text-2xl md:text-3xl font-extrabold text-gray-900 truncate"
        title={userName ? `${userName}'s Board` : "User's Board"}
      >
        {userName}'s Board
      </h1>

      {/* Search Input */}
      <div className="relative flex-grow min-w-[180px] max-w-full md:max-w-md w-full md:w-auto">
        <input
          ref={searchInputRef}
          type="search"
          value={searchValue}
          onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
          placeholder="Search tasks or lists..."
          className="w-full rounded-md border border-gray-300 px-4 py-2 pr-10 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {searchValue && (
          <button
            onClick={() => {
              if (onClearSearch) onClearSearch();
              else if (onSearchChange) onSearchChange("");
              if (searchInputRef.current) searchInputRef.current.focus();
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
        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        type="button"
      >
        <FaPlus className="w-5 h-5" />
        <span className="hidden sm:inline">Add List</span>
      </button>

      {/* Settings Dropdown */}
      <nav className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="text-gray-600 hover:text-gray-900 rounded-full p-2"
          type="button"
          aria-label="Open settings menu"
        >
          <FaCog className="w-6 h-6 md:w-7 md:h-7" />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-xl z-50">
            <button
              type="button"
              onClick={() => {
                setDropdownOpen(false);
                onProfileClick && onProfileClick();
              }}
              className="w-full px-4 py-2 text-gray-700 hover:bg-indigo-100 flex items-center gap-2"
            >
              <FaUserCircle className="w-5 h-5" />
              Profile
            </button>
            <button
              type="button"
              onClick={() => {
                setDropdownOpen(false);
                onChangeNameClick && onChangeNameClick();
              }}
              className="w-full px-4 py-2 text-gray-700 hover:bg-indigo-100 flex items-center gap-2"
            >
              <FaEdit className="w-5 h-5" />
              Change Name
            </button>
            <button
              type="button"
              onClick={() => {
                setDropdownOpen(false);
                onLogout && onLogout();
              }}
              disabled={isLoggingOut}
              className={`w-full px-4 py-2 flex items-center gap-2 ${
                isLoggingOut
                  ? "text-red-400 cursor-not-allowed"
                  : "text-red-600 hover:bg-red-100"
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
