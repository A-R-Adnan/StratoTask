import React from "react";
import { useNavigate } from "react-router-dom";

const HeroContent = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/auth?mode=signup");
  };

  const handleLearnMoreClick = () => {
    const element = document.getElementById("how-it-works");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full min-h-[calc(100vh-4rem)] bg-gradient-to-tr from-indigo-700 via-purple-600 to-pink-500 flex flex-col md:flex-row items-center justify-between px-6 md:px-20 lg:px-36 py-16 relative overflow-hidden text-white">
      {/* Left Side */}
      <div className="max-w-2xl z-20 py-12">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-8 relative line-height-tight drop-shadow-lg">
          StratoTask brings&nbsp;
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
            all your tasks,
          </span>
          &nbsp;teammates, and tools together
          <span className="absolute left-0 bottom-0 w-full h-2 rounded bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 blur-sm opacity-70" />
        </h1>
        <p className="text-lg md:text-xl mb-12 opacity-90 drop-shadow-md max-w-lg">
          Keep everything in the same place—even if your team isn’t.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-5 items-center">
          <button
            onClick={handleSignUpClick}
            className="bg-white text-indigo-700 font-semibold px-9 py-4 rounded-lg shadow-lg hover:bg-indigo-100 transition shadow-indigo-300/70"
          >
            Sign up – it's free!
          </button>
          <button
            onClick={handleLearnMoreClick}
            className="text-white font-semibold underline underline-offset-4 hover:text-pink-300 transition"
          >
            Learn more
          </button>
        </div>
      </div>

      {/* Right Side Graphics */}
      <div className="flex-1 flex items-center justify-center relative my-12 md:my-0">
        <div className="relative w-[380px] md:w-[460px] h-[340px] rounded-3xl shadow-2xl bg-white/90 backdrop-blur-md p-8 flex flex-col space-y-5">
          <div className="flex flex-row space-x-5 mb-4">
            <div className="w-32 h-6 rounded-3xl bg-gray-300" />
            <div className="w-24 h-6 rounded-3xl bg-indigo-400" />
            <div className="w-16 h-6 rounded-3xl bg-pink-300" />
          </div>
          <div className="w-full h-16 bg-gray-200 rounded-3xl mb-4" />
          <div className="flex flex-row space-x-6 mb-4">
            <div className="w-3/5 h-10 bg-indigo-300 rounded-3xl" />
            <div className="w-1/3 h-10 bg-pink-300 rounded-3xl" />
          </div>
          <div className="w-full h-12 bg-gray-200 rounded-3xl mb-4" />
          <div className="w-4/5 h-12 bg-purple-400 rounded-3xl mb-4" />
          <div className="w-2/3 h-8 bg-blue-300 rounded-3xl" />
        </div>

        {/* Floating blobs */}
        <div className="absolute top-16 -right-20 w-56 h-56 rounded-full bg-pink-400 opacity-20 blur-3xl animate-blob animation-delay-4500 pointer-events-none" />
        <div className="absolute top-4 -right-10 w-36 h-36 rounded-full bg-purple-500 opacity-25 blur-2xl animate-blob animation-delay-7000 pointer-events-none" />
      </div>

      {/* Custom CSS animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.05);
          }
        }
        .animate-blob {
          animation: blob 8s ease-in-out infinite;
        }
        .animation-delay-4500 {
          animation-delay: 4.5s;
        }
        .animation-delay-7000 {
          animation-delay: 7s;
        }
        .line-height-tight {
          line-height: 1.1;
        }
      `}</style>
    </section>
  );
};

export default HeroContent;
