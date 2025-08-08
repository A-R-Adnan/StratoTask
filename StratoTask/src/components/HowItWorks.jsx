import React from "react";

const HowItWorks = () => {
  return (
    <section className="w-full bg-blue-50 py-14 px-4 md:px-12 lg:px-32 flex flex-col md:flex-row items-center justify-between gap-12">
      {/* Left side: Text and Feature Cards */}
      <div className="flex-1">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">A productivity powerhouse</h2>
        <p className="text-gray-700 mb-6 max-w-xl">
          Simple, flexible, and powerful. All it takes are boards, lists, and cards to get a clear view of who’s doing what and what needs to get done. Discover the powerful workflow in StratoTask!
        </p>

        <div className="space-y-5">
          {/* Boards */}
          <div className="bg-white/95 rounded-lg shadow flex flex-row items-start p-5 gap-4">
            <div className="rounded-full bg-blue-100 p-2">
              {/* Board Icon */}
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <rect x="3" y="3" width="7" height="18" />
                <rect x="14" y="3" width="7" height="12" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-blue-700">Boards</div>
              <div className="text-gray-600 text-sm">
                StratoTask boards keep tasks organized and work moving forward. In a glance, see everything from “things to do” to “aww yeah, we did it!”
              </div>
            </div>
          </div>
          {/* Lists */}
          <div className="bg-white/95 rounded-lg shadow flex flex-row items-start p-5 gap-4">
            <div className="rounded-full bg-indigo-100 p-2">
              {/* List Icon */}
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 20 20">
                <rect x="3" y="4" width="14" height="3" rx="1.5" />
                <rect x="3" y="9" width="14" height="3" rx="1.5" />
                <rect x="3" y="14" width="10" height="3" rx="1.5" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-indigo-700">Lists</div>
              <div className="text-gray-600 text-sm">
                The different stages of a task: Start as simple as To Do, Doing, or Done—or build a custom workflow fit to your team’s needs. There’s no wrong way to use StratoTask!
              </div>
            </div>
          </div>
          {/* Cards */}
          <div className="bg-white/95 rounded-lg shadow flex flex-row items-start p-5 gap-4">
            <div className="rounded-full bg-pink-100 p-2">
              {/* Card Icon */}
              <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <rect x="4" y="5" width="16" height="14" rx="3" />
                <rect x="7" y="8" width="10" height="2" rx="1" fill="currentColor" />
                <rect x="7" y="12" width="6" height="2" rx="1" fill="currentColor" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-pink-700">Cards</div>
              <div className="text-gray-600 text-sm">
                Cards represent tasks and ideas and hold all the information to get the job done. As you make progress, move cards across lists to show their status!
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Screenshot/Preview */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-lg rounded-xl overflow-hidden shadow-xl border border-blue-100 bg-white">
          {/* Replace src below with your own StratoTask board screenshot! */}
          <img
            src="https://i.ibb.co/gjNDwqS/stratotask-sample-board.png"
            alt="StratoTask demo board"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
