import React from "react";
import { FaUsers, FaStar, FaGlobe, FaQuoteLeft } from "react-icons/fa";

const stats = [
  {
    icon: <FaGlobe className="text-blue-600 w-8 h-8" />,
    label: "Countries",
    value: "190+",
  },
  {
    icon: <FaUsers className="text-green-600 w-8 h-8" />,
    label: "Teams",
    value: "2 Million+",
  },
  {
    icon: <FaStar className="text-yellow-400 w-8 h-8" />,
    label: "Positive Reviews",
    value: "4.8/5",
  }
];

const PriceSection = () => (
  <section className="w-full bg-gradient-to-br from-indigo-100 to-sky-100 py-20 px-6 md:px-16 lg:px-32">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-center">
      {/* Testimonial/Quote */}
      <div className="flex-1 flex flex-col justify-center items-start">
        <div className="flex items-center mb-6 gap-4">
          <FaQuoteLeft className="text-indigo-600 text-4xl" />
          <h3 className="text-2xl font-extrabold text-indigo-800">Happy Customers, Real Results</h3>
        </div>
        <blockquote className="text-gray-900 text-lg italic mb-6 leading-relaxed max-w-md">
          “StratoTask is great for simplifying complex processes. I can break projects into bite-sized pieces for my team, yet always keep the bird’s-eye view. Huge time-saver!”
        </blockquote>
        <div className="flex items-center gap-3 mt-3">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Customer"
            className="w-12 h-12 rounded-full border-4 border-indigo-300 shadow-lg"
          />
          <span className="font-semibold text-gray-800 text-lg">Joey Rosenberg, Team Lead</span>
        </div>
      </div>
      {/* Stats and CTA */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-10">
        <div className="flex flex-col gap-6">
          {stats.map(stat => (
            <div
              key={stat.label}
              className="flex items-center gap-5 bg-white rounded-2xl shadow-lg p-6 hover:shadow-indigo-400 transition-shadow cursor-default"
            >
              {stat.icon}
              <div>
                <p className="text-3xl font-extrabold text-gray-900">{stat.value}</p>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Pricing call-to-action */}
        <div className="rounded-2xl shadow-xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 flex flex-col items-start justify-center">
          <h4 className="text-white font-bold text-xl mb-2">Flexible Pricing for Teams of Any Size</h4>
          <p className="text-sky-100 mb-6 text-sm max-w-xs">
            Try StratoTask for free, upgrade anytime as you grow.
          </p>
          <button
            onClick={() => window.location.href = "/auth?mode=signup"}
            className="px-8 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow-md hover:bg-indigo-50 transition"
          >
            View Plans & Start Free
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default PriceSection;
