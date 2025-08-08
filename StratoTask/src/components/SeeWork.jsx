import React from "react";
import { FaCalendarAlt, FaStream } from "react-icons/fa";

const cards = [
  {
    title: "Hit Deadlines Every Time",
    icon: <FaStream className="text-indigo-500 w-6 h-6" />,
    text: (
      <>
        From weekly sprints to annual planning, <span className="font-semibold text-indigo-600">Timeline view</span> keeps all tasks on track.
        Get a quick glimpse of what's coming, spot bottlenecks, and ensure nothing falls through the cracks.
      </>
    ),
    button: {
      text: "Learn more about Timeline view",
      link: "#"
    },
    imageUrl: "https://i.ibb.co/8YtHv3K/timeline-fake.png",
    border: "border-t-4 border-indigo-400"
  },
  {
    title: "Stay on Top Tasks",
    icon: <FaCalendarAlt className="text-blue-500 w-6 h-6" />,
    text: (
      <>
        Begin every day prepared. Whether you're managing content or to-dos, <span className="font-semibold text-blue-600">Calendar view</span> gives you a bird's eye of what’s next.
      </>
    ),
    button: {
      text: "Learn more about Calendar view",
      link: "#"
    },
    imageUrl: "https://i.ibb.co/WB0Mr8m/calendar-fake.png",
    border: "border-t-4 border-blue-400"
  }
];

const SeeWork = () => (
  <section className="bg-gradient-to-br from-blue-500 via-blue-400 to-blue-300 py-16 px-4 md:px-12 lg:px-32">
    <div className="max-w-7xl mx-auto flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 text-center">See work in a whole new way</h2>
      <p className="text-lg text-blue-100 mb-7 text-center max-w-2xl">
        View your team’s projects from every angle and bring a fresh perspective to the task at hand.
      </p>

      <div className="flex flex-col gap-10 md:flex-row w-full">
        {cards.map((card, i) => (
          <div
            key={card.title}
            className={`flex flex-col md:flex-row ${i === 0 ? "md:pr-8" : "md:pl-8"} bg-white rounded-2xl shadow-lg ${card.border} w-full md:w-1/2`}
          >
            {/* Image */}
            <div className="md:w-2/5 w-full flex justify-center items-center p-4">
              <img
                src={card.imageUrl}
                alt={card.title}
                className="w-full h-auto rounded-xl border border-gray-100 shadow"
                style={{ background: "#fff" }}
              />
            </div>
            {/* Text */}
            <div className="flex flex-col justify-center p-6 md:w-3/5">
              <span>{card.icon}</span>
              <h3 className="text-xl font-semibold text-gray-900 my-2">{card.title}</h3>
              <p className="text-gray-700 mb-4">{card.text}</p>
              <a href={card.button.link} className="text-blue-600 font-medium hover:underline text-sm">
                {card.button.text}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SeeWork;
