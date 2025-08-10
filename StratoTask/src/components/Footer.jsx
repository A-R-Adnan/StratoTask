import React from "react";
import {
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";

const Footer = () => (
  <footer className="w-full bg-gradient-to-tr from-[#162238] via-[#1c2b40] to-[#1f324f] text-white pt-16 pb-8 px-6 md:px-12 lg:px-32 mt-16">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-14 md:gap-0 items-center md:items-start">
      {/* Left Branding & Log in */}
      <div className="flex flex-col items-center md:items-start space-y-4 md:w-1/4">
        <div className="flex items-center space-x-3 mb-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-10 h-10"
          >
            <rect x="3" y="3" width="7" height="18" />
            <rect x="14" y="3" width="7" height="12" />
          </svg>
          <span className="font-extrabold text-3xl tracking-tight select-text">StratoTask</span>
        </div>
        <a
          href="/auth?mode=login"
          className="text-sm text-sky-300 hover:text-sky-400 hover:underline font-semibold transition"
        >
          Log in
        </a>
        <p className="text-sky-400 text-xs max-w-xs text-center md:text-left leading-relaxed">
          Simplify task management with StratoTask. Bringing your team and projects together in one place.
        </p>
      </div>

      {/* Footer Links */}
      <div className="flex flex-1 flex-wrap justify-center gap-x-24 gap-y-6 md:gap-y-4 text-center md:text-left md:w-2/4">
        <div>
          <h4 className="font-semibold mb-4 text-sky-300 tracking-wide uppercase text-sm">About StratoTask</h4>
          <p className="text-sky-200 text-sm max-w-xs">
            Dive into what makes StratoTask your ideal task management solution.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-sky-300 tracking-wide uppercase text-sm">Jobs</h4>
          <p className="text-sky-200 text-sm max-w-xs">
            Explore opportunities to join the StratoTask team and grow your career.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-sky-300 tracking-wide uppercase text-sm">Apps</h4>
          <p className="text-sky-200 text-sm max-w-xs">
            Download StratoTask apps to stay productive anywhere, anytime.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-sky-300 tracking-wide uppercase text-sm">Contact us</h4>
          <p className="text-sky-200 text-sm max-w-xs">
            Need assistance? We're here to help with any questions or feedback.
          </p>
        </div>
      </div>
    </div>

    <hr className="border-blue-900 my-10" />

    {/* Bottom row: Policy, Language, Copyright, Social */}
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-sky-300 text-xs md:text-sm">
      <div className="flex flex-wrap items-center gap-6 justify-center md:justify-start">
        {/* Language selector */}
        <div className="flex items-center gap-1 cursor-pointer hover:text-sky-400 transition select-none" tabIndex={0} role="button" aria-label="Select Language">
          <svg
            width="16"
            height="16"
            fill="currentColor"
            className="text-sky-300"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M10,3 C13.866,3 17,6.134 17,10 C17,13.866 13.866,17 10,17 C6.134,17 3,13.866 3,10 C3,6.134 6.134,3 10,3 Z M10,4.5 C6.962,4.5 4.5,6.962 4.5,10 C4.5,13.038 6.962,15.5 10,15.5 C13.038,15.5 15.5,13.038 15.5,10 C15.5,6.962 13.038,4.5 10,4.5 Z" />
          </svg>
          <span>English</span>
        </div>
        <span className="hidden sm:inline-block">|</span>
        <a href="#" className="hover:underline hover:text-sky-400 transition">
          Privacy Policy
        </a>
        <span>|</span>
        <a href="#" className="hover:underline hover:text-sky-400 transition">
          Terms
        </a>
        <span>|</span>
        <span>© 2025 StratoTask</span>
      </div>
      {/* Social icons */}
      <div className="flex gap-7 text-3xl justify-center md:justify-start">
        <a href="#" aria-label="Instagram" className="hover:text-sky-400 transition" tabIndex={0}>
          <FaInstagram />
        </a>
        <a href="#" aria-label="Twitter" className="hover:text-sky-400 transition" tabIndex={0}>
          <FaTwitter />
        </a>
        <a href="#" aria-label="TikTok" className="hover:text-sky-400 transition" tabIndex={0}>
          <FaTiktok />
        </a>
        <a href="#" aria-label="Facebook" className="hover:text-sky-400 transition" tabIndex={0}>
          <FaFacebookF />
        </a>
        <a href="#" aria-label="X (Twitter)" className="hover:text-sky-400 transition" tabIndex={0}>
          <FaXTwitter />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
