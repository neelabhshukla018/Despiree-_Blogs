import React from "react";

import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaFacebookF,
} from "react-icons/fa";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#020617] border-t border-white/10 px-6 py-10">

      {/* ANIMATED GLOW */}
      <div className="absolute top-0 left-1/4 w-52 h-52 bg-cyan-500/10 blur-[100px] rounded-full animate-pulse"></div>

      <div className="absolute bottom-0 right-1/4 w-52 h-52 bg-blue-500/10 blur-[100px] rounded-full animate-pulse"></div>

      {/* MAIN CONTENT */}
      <div className="relative max-w-6xl mx-auto flex flex-col items-center text-center">

        {/* LOGO */}
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-wide hover:scale-105 transition duration-300">

          De<span className="text-cyan-300">Spire</span>

        </h1>

        {/* SHORT DESCRIPTION */}
        <p className="text-gray-400 mt-4 max-w-2xl text-sm sm:text-base leading-relaxed">

          Read. Learn. Get Inspired.
          A premium blogging platform for technology,
          startups, cricket and modern trends.

        </p>

        {/* NAV LINKS */}
        <div className="flex flex-wrap justify-center gap-5 sm:gap-8 mt-7 text-sm sm:text-base">

                    <Link
          to="/"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
          className="text-gray-400 hover:text-cyan-300 transition-all duration-300 hover:-translate-y-1"
        >
          Home
        </Link>

        <Link
          to="/blog"
          className="text-gray-400 hover:text-cyan-300 transition-all duration-300 hover:-translate-y-1"
        >
          Blogs
        </Link>
          <Link
            to="/about"
            className="text-gray-400 hover:text-cyan-300 transition-all duration-300 hover:-translate-y-1"
          >
            About
          </Link>

          <Link
            to="/contact"
            className="text-gray-400 hover:text-cyan-300 transition-all duration-300 hover:-translate-y-1"
          >
            Contact
          </Link>

        </div>

        {/* SOCIAL ICONS */}
        <div className="flex items-center gap-4 mt-8 flex-wrap justify-center">

          <a
            href="https://github.com/neelabhshukla018"
            target="_blank"
            rel="noreferrer"
            className="group w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-cyan-300 hover:text-black hover:scale-110 transition-all duration-300"
          >
            <FaGithub className="group-hover:rotate-12 transition duration-300" />
          </a>

          <a
            href="https://www.linkedin.com/in/neelabh-shukla-45b88a2a5"
            target="_blank"
            rel="noreferrer"
            className="group w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-blue-500 hover:text-white hover:scale-110 transition-all duration-300"
          >
            <FaLinkedinIn className="group-hover:rotate-12 transition duration-300" />
          </a>

          <a
            href="https://www.instagram.com/arjun_dream_1845/"
            target="_blank"
            rel="noreferrer"
            className="group w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-pink-500 hover:text-white hover:scale-110 transition-all duration-300"
          >
            <FaInstagram className="group-hover:rotate-12 transition duration-300" />
          </a>

          <a
            href="https://x.com/Neelabh01845"
            target="_blank"
            rel="noreferrer"
            className="group w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-sky-500 hover:text-white hover:scale-110 transition-all duration-300"
          >
            <FaTwitter className="group-hover:rotate-12 transition duration-300" />
          </a>

          <a
            href="https://www.facebook.com/profile.php?id=61575832483919"
            target="_blank"
            rel="noreferrer"
            className="group w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-blue-700 hover:text-white hover:scale-110 transition-all duration-300"
          >
            <FaFacebookF className="group-hover:rotate-12 transition duration-300" />
          </a>

        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-white/10 w-full mt-8 pt-5 text-center text-gray-100 text-sm">

          © {new Date().getFullYear()} DeSpire • Made with ❤️ by Neelabh Shukla

        </div>

      </div>

    </footer>
  );
};

export default Footer;