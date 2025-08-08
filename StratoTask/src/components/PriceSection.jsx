
import React from "react";
import { FaUsers, FaStar, FaGlobe, FaQuoteLeft } from "react-icons/fa";

const stats = [
  {
    icon: <FaGlobe className="text-blue-600 w-7 h-7" />,
    label: "Countries",
    value: "190+",
  },
  {
    icon: <FaUsers className="text-green-600 w-7 h-7" />,
    label: "Teams",
    value: "2 Million+",
  },
  {
    icon: <FaStar className="text-yellow-400 w-7 h-7" />,
    label: "Positive Reviews",
    value: "4.8/5",
  }
];

const PriceSection = () => (
  <section className="w-full bg-gradient-to-br from-indigo-100 to-sky-100 py-16 px-4 md:px-12 lg:px-32">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center">
      {/* Testimonial/Quote */}
      <div className="flex-1 flex flex-col justify-center items-start">
        <div className="flex items-center mb-4 gap-3">
          <FaQuoteLeft className="text-indigo-500 text-3xl" />
          <span className="text-xl font-semibold text-indigo-700">Happy Customers, Real Results</span>
        </div>
        <blockquote className="text-gray-800 text-lg italic mb-3">
          “StratoTask is great for simplifying complex processes. I can break projects into bite-sized pieces for my team, yet always keep the bird’s-eye view. Huge time-saver!”
        </blockquote>
        <div className="flex items-center gap-2 mt-2">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Customer"
            className="w-10 h-10 rounded-full border-2 border-indigo-200"
          />
          <span className="font-medium text-gray-700">Joey Rosenberg, Team Lead</span>
        </div>
      </div>
      {/* Stats */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-7">
        <div className="flex flex-col gap-5">
          {stats.map(stat => (
            <div
              key={stat.label}
              className="flex items-center gap-4 bg-white/90 rounded-xl shadow p-5"
            >
              {stat.icon}
              <div>
                <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Pricing call-to-action */}
        <div className="rounded-xl shadow bg-gradient-to-r from-blue-500 to-indigo-600 p-6 flex flex-col items-start mt-4 md:mt-0">
          <div className="text-white font-semibold mb-1 text-lg">Flexible Pricing for Teams of Any Size</div>
          <div className="text-sky-50 mb-4 text-sm">Try StratoTask for free, upgrade anytime as you grow.</div>
          <button
            onClick={() => window.location.href="/auth?mode=signup"}
            className="px-6 py-2 bg-white text-blue-700 font-semibold rounded hover:bg-indigo-50 transition"
          >
            View Plans & Start Free
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default PriceSection;
