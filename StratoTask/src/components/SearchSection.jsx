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
  <section className="w-full py-20 px-6 md:px-16 lg:px-40 bg-gradient-to-br from-white to-blue-50 relative overflow-hidden">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
      {/* Left: Search content */}
      <div className="flex-1 max-w-md">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 drop-shadow-sm">
          Find anything, anytime in <span className="text-indigo-600">StratoTask</span>
        </h2>
        <p className="text-gray-700 mb-10 text-lg leading-relaxed">
          With universal search and powerful filters, you'll never lose track of tasks, files, or conversations. Locate teammates, due dates, and attachments across all boards—instantly.
        </p>

        {/* What you can search - icons list */}
        <ul className="space-y-5">
          {items.map(item => (
            <li key={item.text} className="flex items-center gap-5 text-gray-800 text-lg font-medium">
              <span className="bg-white shadow rounded-lg p-3 flex items-center justify-center drop-shadow">
                {item.icon}
              </span>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Right: Search feature visual */}
      <div className="flex-1 flex justify-center items-center relative w-full max-w-md">
        {/* Search UI mockup */}
        <div className="bg-white border border-gray-300 rounded-2xl shadow-2xl p-8 w-full">
          <div className="flex items-center border border-gray-300 rounded-lg px-5 py-3 mb-6 shadow-sm bg-gray-50 transition-shadow hover:shadow-md">
            <FaSearch className="mr-3 text-gray-400 w-6 h-6" />
            <input
              className="bg-transparent w-full outline-none text-gray-900 placeholder-gray-400 placeholder-opacity-80"
              placeholder="Search cards, lists, boards, teams..."
              disabled
              style={{ cursor: "not-allowed" }}
            />
          </div>
          {/* Example auto-suggestions */}
          <div className="space-y-4">
            <div className="bg-gray-100 rounded-lg px-5 py-3 flex gap-4 items-center text-gray-700 shadow">
              <FaClipboardList className="text-blue-600 w-6 h-6" />
              <span className="text-sm font-medium">"Upcoming Presentation" in Marketing Board</span>
            </div>
            <div className="bg-gray-100 rounded-lg px-5 py-3 flex gap-4 items-center text-gray-700 shadow">
              <FaUsers className="text-green-600 w-6 h-6" />
              <span className="text-sm font-medium">Teammate: Alex Williams</span>
            </div>
            <div className="bg-gray-100 rounded-lg px-5 py-3 flex gap-4 items-center text-gray-700 shadow">
              <FaRegCalendar className="text-pink-500 w-6 h-6" />
              <span className="text-sm font-medium">Due: Product Launch – Tomorrow</span>
            </div>
          </div>
        </div>
        {/* Decorative shadow or background */}
        <div
          className="pointer-events-none absolute -z-10 -right-12 top-16 w-56 h-56 bg-indigo-100 rounded-full blur-3xl opacity-60 animate-blob"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -z-10 -bottom-10 left-8 w-40 h-40 bg-blue-100 rounded-full blur-2xl opacity-40 animate-blob animation-delay-4000"
          aria-hidden="true"
        />
      </div>
    </div>

    {/* Animations */}
    <style jsx>{`
      @keyframes blob {
        0%, 100% {
          transform: translateY(0px) scale(1);
        }
        50% {
          transform: translateY(-20px) scale(1.1);
        }
      }
      .animate-blob {
        animation: blob 7s ease-in-out infinite;
      }
      .animation-delay-4000 {
        animation-delay: 4s;
      }
    `}</style>
  </section>
);

export default SearchSection;
