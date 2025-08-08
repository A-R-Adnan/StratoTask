import React from "react";
import { FaSearch, FaClipboardList, FaUsers, FaLink, FaRegCalendar, FaListAlt } from "react-icons/fa";

const items = [
  { icon: <FaClipboardList className="text-blue-600" />, text: "Cards & Tasks" },
  { icon: <FaListAlt className="text-indigo-600" />, text: "Lists & Boards" },
  { icon: <FaUsers className="text-green-600" />, text: "Members" },
  { icon: <FaRegCalendar className="text-pink-500" />, text: "Due Dates" },
  { icon: <FaLink className="text-yellow-500" />, text: "Attachments" },
];

const SearchSection = () => (
  <section className="w-full py-16 px-4 md:px-12 lg:px-32 bg-white">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
      {/* Left: Search content */}
      <div className="flex-1">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Find anything, anytime in StratoTask
        </h2>
        <p className="text-gray-700 mb-8 max-w-lg">
          With universal search and powerful filters, you'll never lose track of tasks, files, or conversations. Locate teammates, due dates, and attachments across all boards—instantly.
        </p>

        {/* What you can search - icons list */}
        <ul className="space-y-4 mb-6">
          {items.map(item => (
            <li key={item.text} className="flex items-center gap-4 text-gray-800 text-base">
              <span className="bg-gray-100 rounded-md p-2 flex items-center justify-center shadow-sm">
                {item.icon}
              </span>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Right: Search feature visual */}
      <div className="flex-1 flex justify-center items-center relative w-full max-w-lg">
        {/* Search UI mockup */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 w-full max-w-md">
          <div className="flex items-center border border-gray-300 rounded px-4 py-2 mb-4 shadow-sm bg-gray-50">
            <FaSearch className="mr-2 text-gray-400" />
            <input
              className="bg-transparent w-full outline-none text-gray-900 placeholder-gray-400"
              placeholder="Search cards, lists, boards, teams..."
              disabled
              style={{ cursor: "not-allowed" }}
            />
          </div>
          {/* Example auto-suggestions */}
          <div className="space-y-3">
            <div className="bg-gray-100 rounded px-3 py-2 flex gap-3 items-center text-gray-700">
              <FaClipboardList className="text-blue-600" />
              <span className="text-sm">"Upcoming Presentation" in Marketing Board</span>
            </div>
            <div className="bg-gray-100 rounded px-3 py-2 flex gap-3 items-center text-gray-700">
              <FaUsers className="text-green-600" />
              <span className="text-sm">Teammate: Alex Williams</span>
            </div>
            <div className="bg-gray-100 rounded px-3 py-2 flex gap-3 items-center text-gray-700">
              <FaRegCalendar className="text-pink-500" />
              <span className="text-sm">Due: Product Launch – Tomorrow</span>
            </div>
          </div>
        </div>
        {/* Decorative shadow or background */}
        <div
          className="absolute -z-10 -right-10 top-14 w-48 h-48 bg-blue-100 rounded-full blur-3xl opacity-50"
          aria-hidden="true"
        />
      </div>
    </div>
  </section>
);

export default SearchSection;
