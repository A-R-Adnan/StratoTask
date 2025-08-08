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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);
    return () => { document.removeEventListener("mousedown", handleClickOutside); };
  }, [dropdownOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        if (searchInputRef.current) searchInputRef.current.focus();
      }
    };
    if (dropdownOpen) document.addEventListener("keydown", handleKeyDown);
    return () => { document.removeEventListener("keydown", handleKeyDown); };
  }, [dropdownOpen]);

  return (
    <header className="flex flex-wrap md:flex-nowrap items-center justify-between p-4 md:p-5 bg-white rounded-lg shadow-lg border border-gray-200 gap-4">
      {/* Board Title */}
      <h1
        className="text-2xl md:text-3xl font-extrabold text-gray-900 select-text cursor-default truncate max-w-full md:max-w-none flex-shrink-0"
        title={userName ? `${userName}'s Board `: "User's Board"}
        aria-label="Board title"
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
          className="w-full rounded-md border border-gray-300 px-4 py-2 pr-10 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
          aria-label="Search tasks or lists"
        />
        {searchValue && (
          <button
            onClick={() => {
              if (onClearSearch) onClearSearch();
              else if (onSearchChange) onSearchChange("");
              if (searchInputRef.current) searchInputRef.current.focus();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded"
            aria-label="Clear search input"
            title="Clear search"
            type="button"
          >
            <FaTimesCircle className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Add List Button */}
      <button
        onClick={onAddList}
        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition select-none flex-shrink-0"
        aria-label="Add new list"
        type="button"
      >
        <FaPlus className="w-5 h-5" />
        <span className="hidden sm:inline">Add List</span>
      </button>

      {/* Settings Dropdown */}
      <nav className="relative flex-shrink-0" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          aria-haspopup="true"
          aria-expanded={dropdownOpen}
          aria-controls="settings-menu"
          aria-label="Open settings menu"
          className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded-full p-2 transition select-none"
          type="button"
        >
          <FaCog className="w-6 h-6 md:w-7 md:h-7" />
        </button>

        {dropdownOpen && (
          <div
            id="settings-menu"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="settings-menu-button"
            className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-xl ring-1 ring-black ring-opacity-5 z-50 animate-fade-in"
            tabIndex={-1}
          >
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setDropdownOpen(false);
                onProfileClick && onProfileClick();
              }}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-100 flex items-center gap-2 transition select-none"
            >
              <FaUserCircle className="w-5 h-5" />
              Profile
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setDropdownOpen(false);
                onChangeNameClick && onChangeNameClick();
              }}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-100 flex items-center gap-2 transition select-none"
            >
              <FaEdit className="w-5 h-5" />
              Change Name
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setDropdownOpen(false);
                onLogout && onLogout();
              }}
              disabled={isLoggingOut}
              className={`w-full text-left px-4 py-2 flex items-center gap-2 transition select-none ${
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

      {/* Animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease forwards;
        }
      `}</style>
    </header>
  );
};

export default BoardHeader;