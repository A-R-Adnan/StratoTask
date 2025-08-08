import React from "react";
import { useNavigate } from "react-router-dom";

const HeroContent = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/auth?mode=signup");
  };

  return (
    <section className="w-full min-h-[calc(100vh-4rem)] bg-gradient-to-tr from-indigo-500 via-purple-400 to-pink-400 flex flex-col md:flex-row items-center justify-between px-4 md:px-12 lg:px-32 py-8 relative overflow-hidden">
      {/* Left Side: Content */}
      <div className="max-w-2xl z-10 text-white py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow mb-4">
          StratoTask brings all your tasks, teammates, and tools together
        </h1>
        <p className="text-lg md:text-xl mb-8 drop-shadow">
          Keep everything in the same place—even if your team isn’t.
        </p>

        {/* Removed email input form */}

        {/* Sign Up Button */}
        <button
          onClick={handleSignUpClick}
          className="bg-white text-indigo-700 font-semibold px-7 py-3 rounded-md shadow hover:bg-indigo-100 transition"
        >
          Sign up – it's free!
        </button>

        {/* (Optional) Watch Video link */}
        <div className="mt-6">
          <a
            href="#"
            className="underline font-medium text-white/80 hover:text-white transition"
          >
            Watch video
          </a>
        </div>
      </div>

      {/* Right Side Graphics */}
      <div className="flex-1 flex items-center justify-center relative my-8 md:my-0">
        {/* Demo card preview */}
        <div className="relative w-[340px] md:w-[400px] h-[310px] rounded-xl shadow-2xl bg-white/90 backdrop-blur-md p-4 flex flex-col space-y-2">
          <div className="flex flex-row space-x-2 mb-2">
            <div className="w-24 h-4 rounded bg-gray-200" />
            <div className="w-16 h-4 rounded bg-indigo-300" />
            <div className="w-10 h-4 rounded bg-pink-200" />
          </div>
          <div className="w-full h-12 bg-gray-100 rounded-md mb-2" />
          <div className="flex flex-row space-x-3 mb-2">
            <div className="w-3/5 h-6 bg-indigo-200 rounded" />
            <div className="w-1/4 h-6 bg-pink-200 rounded" />
          </div>
          <div className="w-full h-8 bg-gray-100 rounded-md mb-2" />
          <div className="w-5/6 h-8 bg-purple-300 rounded-md mb-2" />
          <div className="w-1/2 h-5 bg-blue-200 rounded-md" />
        </div>
        <div className="absolute top-12 -right-10 w-44 h-44 bg-white/20 rounded-full blur-2xl pointer-events-none" />
      </div>
    </section>
  );
};

export default HeroContent;
