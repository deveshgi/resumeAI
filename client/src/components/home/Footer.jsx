import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-20 px-6 md:px-16 lg:px-24">

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

        {/* Logo + Brand */}
        <div className="text-center sm:text-left">
          <Link to="/" className="flex items-center justify-center sm:justify-start gap-2">
            <h1 className="text-xl font-bold text-white">
              Resume
              <span className="bg-linear-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                Ai
              </span>
            </h1>
          </Link>

          <p className="mt-4 max-w-xs mx-auto sm:mx-0">
            Build professional resumes instantly with AI-powered suggestions and modern templates.
          </p>
        </div>

        {/* Links */}
        <div className="text-center sm:text-left">
          <p className="text-white font-semibold mb-3">Product</p>
          <ul className="space-y-2">
            <li><a href="#home" className="hover:text-green-400 transition">
              Home
            </a></li>
            <li><a href="#features" className="hover:text-green-400 transition">
              Features
            </a></li>
            <li><a href="#testimonials" className="hover:text-green-400 transition">
              Testimonials
            </a></li>
            <li><a href="#contact" className="hover:text-green-400 transition">
              Contact
            </a></li>
          </ul>
        </div>

        {/* Social + Info */}
        <div className="text-center sm:text-left flex flex-col items-center sm:items-start gap-4">
          <p className="max-w-xs">
            Helping job seekers create better resumes faster with AI.
          </p>

          {/* Social Icons */}
          <div className="flex gap-5 text-lg">
            <a href="" className="hover:text-green-400 transition">
              <FaGithub />
            </a>
            <a href="" className="hover:text-green-400 transition">
              <FaLinkedin />
            </a>
            <a href="" className="hover:text-green-400 transition">
              <FaTwitter />
            </a>
            <a href="" className="hover:text-green-400 transition">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center mt-12 text-gray-500 text-sm">
        © {new Date().getFullYear()} ResumeAi. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;