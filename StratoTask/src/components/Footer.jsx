// src/components/Footer.jsx

import React from "react";
import {
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";

const Footer = () => (
  <footer className="w-full bg-[#1c2b40] text-white pt-10 pb-6 px-4 mt-12">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-10">
      {/* Left Branding & Log in */}
      <div>
        <div className="flex items-center space-x-2 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-7 h-7"
          >
            <rect x="3" y="3" width="7" height="18" />
            <rect x="14" y="3" width="7" height="12" />
          </svg>
          <span className="font-extrabold text-xl">StratoTask</span>
        </div>
        <a href="/auth?mode=login" className="text-sm text-sky-200 hover:underline font-medium">
          Log in
        </a>
      </div>

      {/* Footer Links */}
      <div className="flex flex-1 flex-wrap gap-10 md:justify-center">
        <div>
          <div className="font-semibold mb-2">About StratoTask</div>
          <div className="text-sky-200 text-sm">What’s behind the boards.</div>
        </div>
        <div>
          <div className="font-semibold mb-2">Jobs</div>
          <div className="text-sky-200 text-sm">Learn about open roles on the StratoTask team.</div>
        </div>
        <div>
          <div className="font-semibold mb-2">Apps</div>
          <div className="text-sky-200 text-sm">Download the StratoTask app for your desktop or mobile devices.</div>
        </div>
        <div>
          <div className="font-semibold mb-2">Contact us</div>
          <div className="text-sky-200 text-sm">Need anything? Get in touch and we can help</div>
        </div>
      </div>
    </div>

    <hr className="border-blue-900 my-6" />

    {/* Bottom row: Policy, Language, Copyright, Social */}
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-sky-200 text-xs">
      <div className="flex flex-wrap items-center gap-5">
        {/* Language selector */}
        <div className="flex items-center">
          <svg width="16" height="16" fill="currentColor" className="mr-1 text-sky-200" viewBox="0 0 20 20"><path d="M10,3 C13.866,3 17,6.134 17,10 C17,13.866 13.866,17 10,17 C6.134,17 3,13.866 3,10 C3,6.134 6.134,3 10,3 Z M10,4.5 C6.962,4.5 4.5,6.962 4.5,10 C4.5,13.038 6.962,15.5 10,15.5 C13.038,15.5 15.5,13.038 15.5,10 C15.5,6.962 13.038,4.5 10,4.5 Z"></path></svg>
          English
        </div>
        <span className="hidden sm:inline-block">|</span>
        <a href="#" className="hover:underline">Privacy Policy</a>
        <span>|</span>
        <a href="#" className="hover:underline">Terms</a>
        <span>|</span>
        <span>Copyright ©2025 StratoTask</span>
      </div>
      {/* Social icons */}
      <div className="flex gap-5 text-2xl">
        <a href="#" aria-label="Instagram" className="hover:text-sky-400"><FaInstagram /></a>
        <a href="#" aria-label="Twitter" className="hover:text-sky-400"><FaTwitter /></a>
        <a href="#" aria-label="TikTok" className="hover:text-sky-400"><FaTiktok /></a>
        <a href="#" aria-label="Facebook" className="hover:text-sky-400"><FaFacebookF /></a>
        <a href="#" aria-label="X (Twitter)" className="hover:text-sky-400"><FaXTwitter /></a>
      </div>
    </div>
  </footer>
);

export default Footer;
