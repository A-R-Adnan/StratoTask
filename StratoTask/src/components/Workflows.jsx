import React from "react";
import { FaFolderOpen, FaUsers, FaLeaf, FaTasks } from "react-icons/fa";

const workflows = [
  {
    icon: <FaFolderOpen className="text-3xl text-white" />,
    title: "Project management",
    color: "bg-gradient-to-tr from-red-400 to-red-500",
    desc: "Keep tasks in order, deadline on track, and team members aligned with StratoTask.",
  },
  {
    icon: <FaUsers className="text-3xl text-white" />,
    title: "Meetings",
    color: "bg-gradient-to-tr from-blue-500 to-indigo-500",
    desc: "Empower your team meetings to be more productive, empowering, and, dare we say, fun.",
  },
  {
    icon: <FaLeaf className="text-3xl text-white" />,
    title: "Onboarding",
    color: "bg-gradient-to-tr from-green-400 to-emerald-500",
    desc: "Onboarding to a new company or project is a snap with StratoTask’s visual layout of to-do’s, resources, and progress tracking.",
  },
  {
    icon: <FaTasks className="text-3xl text-white" />,
    title: "Task manager",
    color: "bg-gradient-to-tr from-yellow-400 to-orange-400",
    desc: "Manage every task in one place, track progress, and stay organized from start to finish with StratoTask.",
  },
];

const Workflows = () => (
  <section className="bg-gradient-to-br from-white to-blue-50 py-20 px-4 md:px-12 lg:px-32">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          Workflows for any project, big or small
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          No need to start from scratch. Jump-start your workflow with proven playbooks designed 
          for different teams. Customize it to make it yours.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {workflows.map(({ icon, title, desc, color }, idx) => (
          <div
            key={title}
            className="rounded-2xl shadow-md hover:shadow-xl transition-all duration-300
                       hover:-translate-y-1 bg-white p-6 flex flex-col items-start border border-transparent hover:border-blue-200"
          >
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${color} shadow-lg 
                         transform group-hover:scale-110 transition-transform duration-300`}
            >
              {icon}
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">{title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* Explore Button */}
      <div className="mt-12 flex justify-center">
        <button
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md 
                     hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all duration-300 flex items-center gap-2"
          type="button"
        >
          Explore all use cases
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </div>
  </section>
);

export default Workflows;
