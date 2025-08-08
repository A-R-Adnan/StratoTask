import React from "react";
import { FaFolderOpen, FaUsers, FaLeaf, FaTasks } from "react-icons/fa";

const workflows = [
  {
    icon: <FaFolderOpen className="text-2xl text-white" />,
    title: "Project management",
    color: "bg-red-400",
    desc: "Keep tasks in order, deadline on track, and team members aligned with StratoTask.",
  },
  {
    icon: <FaUsers className="text-2xl text-white" />,
    title: "Meetings",
    color: "bg-blue-500",
    desc: "Empower your team meetings to be more productive, empowering, and, dare we say, fun.",
  },
  {
    icon: <FaLeaf className="text-2xl text-white" />,
    title: "Onboarding",
    color: "bg-green-400",
    desc: "Onboarding to a new company or project is a snap with StratoTask’s visual layout of to-do’s, resources, and progress tracking.",
  },
  {
    icon: <FaTasks className="text-2xl text-white" />,
    title: "Task manager",
    color: "bg-yellow-400",
    desc: "Manage every task in one place, track progress, and stay organized from start to finish with StratoTask.",
  },
];

const Workflows = () => (
  <section className="bg-white py-16 px-4 md:px-12 lg:px-32">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Workflows for any project, big or small
      </h2>
      <p className="text-gray-600 mb-10 max-w-2xl">
        No need to start from scratch. Jump-start your workflow with proven playbooks designed for different teams. Customize it to make it yours.
      </p>
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {workflows.map(({ icon, title, desc, color }, idx) => (
          <div
            key={title}
            className={`rounded-xl shadow group hover:shadow-lg p-6 transition bg-white flex flex-col items-start h-full border-t-4 ${color}`}
            style={{ borderTopColor: '' }}
          >
            <div
              className={`w-12 h-12 rounded-md flex items-center justify-center mb-4 ${color} shadow-md group-hover:scale-110 transition`}
            >
              {icon}
            </div>
            <h3 className="text-lg font-semibold mb-1 text-gray-900">{title}</h3>
            <p className="text-gray-600 text-sm">{desc}</p>
          </div>
        ))}
      </div>
      {/* Explore Button */}
      <div className="mt-10 flex justify-start">
        <button
          className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
          type="button"
        >
          Explore all use Cases
        </button>
      </div>
    </div>
  </section>
);

export default Workflows;
