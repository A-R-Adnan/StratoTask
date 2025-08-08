import React from "react";
import { FaPuzzlePiece, FaRobot, FaSearch } from "react-icons/fa";

const features = [
  {
    icon: <FaPuzzlePiece className="w-8 h-8 text-blue-600" />,
    title: "Integration",
    desc: "Connect the apps your team already uses into your StratoTask workflow or add a Power-Up to fine-tune your specific needs.",
    action: { text: "Browse Integration", link: "#" },
    bg: "bg-blue-50"
  },
  {
    icon: <FaRobot className="w-8 h-8 text-cyan-600" />,
    title: "Butler Automation",
    desc: "No-code automation is built into every StratoTask board. Focus on the work that matters most and let the robots do the rest.",
    action: { text: "Get to Know Automation", link: "#" },
    bg: "bg-cyan-50"
  },
  {
    icon: <FaSearch className="w-8 h-8 text-indigo-600" />,
    title: "StratoTask Enterprise",
    desc: "The productivity tool teams love, paired with the features and security needed for scale.",
    action: { text: "Explore Enterprise", link: "#" },
    bg: "bg-indigo-50"
  }
];

const PowerfulWays = () => (
  <section className="w-full py-16 px-4 md:px-12 lg:px-32 bg-white">
    <div className="max-w-6xl mx-auto">
      {/* Section Title */}
      <div className="mb-10 text-center">
        <p className="uppercase text-xs text-blue-500 font-semibold mb-1 tracking-widest">
          Powerful ways to grow
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Do more with StratoTask
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          StratoTask’s intuitive features give any team the ability to quickly set up and customize workflows for just about anything.
        </p>
      </div>
      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
        {features.map(({ icon, title, desc, action, bg }) => (
          <div
            className={`rounded-xl ${bg} shadow-md flex flex-col items-start p-8`}
            key={title}
          >
            <div className="mb-4">{icon}</div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">{title}</h3>
            <p className="text-gray-700 mb-6">{desc}</p>
            <a
              href={action.link}
              className="mt-auto inline-block px-5 py-2 border border-blue-600 text-blue-700 rounded-lg font-medium transition hover:bg-blue-50"
            >
              {action.text}
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PowerfulWays;
