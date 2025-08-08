import React from "react";
import { FaCalendarAlt, FaStream, FaCheckCircle, FaChartLine } from "react-icons/fa";

const cards = [
  {
    title: "Hit Deadlines Every Time",
    icon: <FaStream />,
    text: (
      <>
        From weekly sprints to annual planning, <span className="font-semibold text-indigo-700">Timeline view</span> keeps all tasks on track.
        Get a quick glimpse of what's coming, spot bottlenecks, and ensure nothing falls through the cracks.
      </>
    ),
    button: {
      text: "Learn more about Timeline view",
      link: "#"
    },
    border: "border-t-4 border-indigo-600",
    bgGradient: "bg-gradient-to-tr from-indigo-600 to-blue-700",
    iconColor: "text-white"
  },
  {
    title: "Stay on Top Tasks",
    icon: <FaCalendarAlt />,
    text: (
      <>
        Begin every day prepared. Whether you're managing content or to-dos, <span className="font-semibold text-blue-700">Calendar view</span> gives you a bird's eye of what’s next.
      </>
    ),
    button: {
      text: "Learn more about Calendar view",
      link: "#"
    },
    border: "border-t-4 border-blue-600",
    bgGradient: "bg-gradient-to-tr from-blue-600 to-indigo-700",
    iconColor: "text-white"
  },
  {
    title: "Superior Task Progress",
    icon: <FaCheckCircle />,
    text: (
      <>
        Visualize task progress easily and stay motivated with StratoTask’s <span className="font-semibold text-green-700">Progress Tracking</span> features.
      </>
    ),
    button: {
      text: "Learn more about Progress Tracking",
      link: "#"
    },
    border: "border-t-4 border-green-600",
    bgGradient: "bg-gradient-to-tr from-green-600 to-emerald-700",
    iconColor: "text-white"
  },
  {
    title: "Analytics & Reporting",
    icon: <FaChartLine />,
    text: (
      <>
        Make informed decisions with <span className="font-semibold text-yellow-700">detailed analytics</span> and reporting on your tasks and workflows.
      </>
    ),
    button: {
      text: "Learn more about Analytics",
      link: "#"
    },
    border: "border-t-4 border-yellow-600",
    bgGradient: "bg-gradient-to-tr from-yellow-500 to-yellow-600",
    iconColor: "text-white"
  }
];

const SeeWork = () => (
  <section className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 py-24 px-6 md:px-16 lg:px-32 overflow-hidden">
    {/* Decorative Background Circles */}
    <div className="absolute -left-16 top-20 w-72 h-72 rounded-full bg-indigo-700 opacity-30 blur-3xl animate-blob animation-delay-0 pointer-events-none" />
    <div className="absolute -right-16 bottom-24 w-96 h-96 rounded-full bg-blue-700 opacity-25 blur-3xl animate-blob animation-delay-4000 pointer-events-none" />

    <div className="max-w-7xl mx-auto relative z-10">
      <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-8 drop-shadow-lg">
        See work in a whole new way
      </h2>
      <p className="text-blue-200 text-center max-w-3xl mx-auto mb-16 text-lg leading-relaxed drop-shadow">
        View your team’s projects from every angle and bring a fresh perspective to the task at hand with powerful views and insightful metrics.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {cards.map(({ title, icon, text, button, border, bgGradient, iconColor }) => (
          <div
            key={title}
            className={`${border} rounded-3xl bg-white p-6 md:p-8 lg:p-10 shadow-2xl flex flex-col md:flex-row items-center gap-6 hover:shadow-indigo-900/60 hover:-translate-y-2 transition-transform duration-300 relative z-20`}
          >
            <div className={`${bgGradient} rounded-xl flex items-center justify-center 
              w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 shadow-lg flex-shrink-0`}>
              {React.cloneElement(icon, { className: `${iconColor} w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12` })}
            </div>
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 drop-shadow-sm">
                {title}
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed text-base md:text-lg">
                {text}
              </p>
              <a
                href={button.link}
                className="inline-block text-blue-700 font-semibold hover:underline text-sm md:text-base"
              >
                {button.text}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Animation styles */}
    <style jsx>{`
      @keyframes blob {
        0%, 100% {
          transform: translateY(0px) scale(1);
        }
        50% {
          transform: translateY(-15px) scale(1.1);
        }
      }
      .animate-blob {
        animation: blob 8s ease-in-out infinite;
      }
      .animation-delay-0 {
        animation-delay: 0s;
      }
      .animation-delay-4000 {
        animation-delay: 4s;
      }
    `}</style>
  </section>
);

export default SeeWork;
