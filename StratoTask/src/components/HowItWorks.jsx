import React from "react";
import boardImage from "../assets/stratotask-workspace-sample.png";

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="w-full bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-6 md:px-20 lg:px-36 flex flex-col md:flex-row items-center justify-between gap-20"
    >
      {/* Left side: Text and Feature Cards */}
      <div className="flex-1 max-w-xl">
        <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-8 drop-shadow-sm">
          A <span className="text-indigo-700">productivity powerhouse</span>
        </h2>
        <p className="text-gray-700 text-lg mb-12 leading-relaxed">
          Simple, flexible, and powerful. All it takes are boards, lists, and cards to get a clear view of who’s doing what and what needs to get done. Discover the powerful workflow in <span className="font-semibold text-indigo-700">StratoTask</span>!
        </p>

        <div className="space-y-8">
          {/* Boards */}
          <div className="bg-white rounded-xl shadow-xl p-8 flex items-start gap-6 transition-transform transform hover:scale-[1.03] cursor-default">
            <div className="rounded-full bg-blue-100 p-4 flex items-center justify-center shadow-lg">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="7" height="18" />
                <rect x="14" y="3" width="7" height="12" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-blue-700 text-xl mb-2">Boards</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                StratoTask boards keep tasks organized and work moving forward. In a glance, see everything from “things to do” to “aww yeah, we did it!”
              </p>
            </div>
          </div>

          {/* Lists */}
          <div className="bg-white rounded-xl shadow-xl p-8 flex items-start gap-6 transition-transform transform hover:scale-[1.03] cursor-default">
            <div className="rounded-full bg-indigo-100 p-4 flex items-center justify-center shadow-lg">
              <svg
                className="w-8 h-8 text-indigo-600"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <rect x="3" y="4" width="14" height="3" rx="1.5" />
                <rect x="3" y="9" width="14" height="3" rx="1.5" />
                <rect x="3" y="14" width="10" height="3" rx="1.5" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-indigo-700 text-xl mb-2">Lists</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                The different stages of a task: Start as simple as To Do, Doing, or Done—or build a custom workflow fit to your team’s needs. There’s no wrong way to use <span className="font-semibold text-indigo-700">StratoTask</span>!
              </p>
            </div>
          </div>

          {/* Cards */}
          <div className="bg-white rounded-xl shadow-xl p-8 flex items-start gap-6 transition-transform transform hover:scale-[1.03] cursor-default">
            <div className="rounded-full bg-pink-100 p-4 flex items-center justify-center shadow-lg">
              <svg
                className="w-8 h-8 text-pink-600"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <rect x="4" y="5" width="16" height="14" rx="3" />
                <rect x="7" y="8" width="10" height="2" rx="1" fill="currentColor" />
                <rect x="7" y="12" width="6" height="2" rx="1" fill="currentColor" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-pink-700 text-xl mb-2">Cards</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Cards represent tasks and ideas and hold all the information to get the job done. As you make progress, move cards across lists to show their status!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Screenshot/Preview */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-blue-300 bg-white">
          <img
            src={boardImage}
            alt="StratoTask workspace sample"
            className="w-full h-auto object-cover"
            loading="lazy"
            draggable={false}
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
