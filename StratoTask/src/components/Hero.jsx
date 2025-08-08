import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-400 to-indigo-600 text-white px-4 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to StratoTask</h1>
      <p className="max-w-xl text-lg md:text-xl mb-8">
        Organize your tasks like never before with StratoTask’s intuitive kanban boards.
      </p>
      <div className="space-x-4">
        <button
          onClick={() => navigate("/auth?mode=login")}
          className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-indigo-100 transition"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/auth?mode=signup")}
          className="bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-indigo-800 transition"
        >
          Sign Up
        </button>
      </div>
    </section>
  );
};

export default Hero;
