import React from "react";
import { FaPuzzlePiece, FaRobot, FaSearch } from "react-icons/fa";

const features = [
  {
    icon: <FaPuzzlePiece className="w-10 h-10 text-gradient-primary group-hover:scale-110 transition-transform duration-300" />,
    title: "Integration",
    desc: "Connect the apps your team already uses into your StratoTask workflow or add a Power-Up to fine-tune your specific needs.",
    action: { text: "Browse Integration", link: "#" },
    bg: "bg-blue-50"
  },
  {
    icon: <FaRobot className="w-10 h-10 text-gradient-cyan group-hover:scale-110 transition-transform duration-300" />,
    title: "Butler Automation",
    desc: "No-code automation is built into every StratoTask board. Focus on the work that matters most and let the robots do the rest.",
    action: { text: "Get to Know Automation", link: "#" },
    bg: "bg-cyan-50"
  },
  {
    icon: <FaSearch className="w-10 h-10 text-gradient-indigo group-hover:scale-110 transition-transform duration-300" />,
    title: "StratoTask Enterprise",
    desc: "The productivity tool teams love, paired with the features and security needed for scale.",
    action: { text: "Explore Enterprise", link: "#" },
    bg: "bg-indigo-50"
  }
];

// Define gradient text colors as Tailwind utilities using 'before:' or custom classes or you can add them as utilities in your Tailwind config.
// Here we use inline style for simplicity below.

const PowerfulWays = () => (
  <section className="w-full py-20 px-6 md:px-12 lg:px-32 bg-white">
    <div className="max-w-7xl mx-auto">
      {/* Section Title */}
      <div className="mb-12 text-center relative">
        <p className="uppercase text-sm font-semibold mb-3 tracking-widest text-blue-600 relative inline-block">
          Powerful ways to grow
          <span
            aria-hidden="true"
            className="absolute left-1/2 -bottom-2 w-24 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 rounded-full -translate-x-1/2 animate-underline"
            style={{ filter: "drop-shadow(0 0 6px rgba(131, 58, 180, 0.7))" }}
          />
        </p>
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight md:leading-snug">
          Do more with <span className="text-indigo-600">StratoTask</span>
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
          StratoTask’s intuitive features give any team the ability to quickly set up and customize workflows for just about anything.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {features.map(({ icon, title, desc, action, bg }) => (
          <div
            key={title}
            className={`group rounded-2xl ${bg} p-8 flex flex-col h-full shadow-md hover:shadow-xl transition-shadow duration-300`}
          >
            <div className="mb-6">
              {/* Icon container with subtle shadow and rounded bg */}
              <div className="inline-flex p-4 rounded-lg bg-white shadow-md">
                {icon}
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
            <p className="text-gray-700 flex-grow">{desc}</p>
            <a
              href={action.link}
              className="mt-8 inline-block self-start px-6 py-3 rounded-lg border-2 border-indigo-600 font-semibold text-indigo-700 hover:bg-indigo-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 transition"
            >
              {action.text}
            </a>
          </div>
        ))}
      </div>

      {/* Styles for gradients and animations */}
      <style jsx>{`
        .text-gradient-primary {
          background: linear-gradient(90deg, #3b82f6, #9333ea);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .text-gradient-cyan {
          background: linear-gradient(90deg, #06b6d4, #0891b2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .text-gradient-indigo {
          background: linear-gradient(90deg, #6366f1, #4f46e5);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        @keyframes underline {
          0%, 100% {
            transform: translateX(-50%) scaleX(1);
          }
          50% {
            transform: translateX(-50%) scaleX(1.1);
          }
        }
        .animate-underline {
          animation: underline 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  </section>
);

export default PowerfulWays;
