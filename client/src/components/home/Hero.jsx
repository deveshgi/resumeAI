import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMenu } from 'react-icons/fi'
import { RxCross2 } from "react-icons/rx";
import { FaAngleRight } from "react-icons/fa";
import { IoVideocamOutline } from "react-icons/io5";


function Hero() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <section className="relative flex flex-col items-center bg-black text-white text-sm pb-16 bg-[url(/hero-bg.png)] bg-top bg-no-repeat">

      {/* NAVBAR */}
      <nav className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 backdrop-blur">
        <Link to='/' className="flex items-center gap-2">
          <h1 className="text-xl font-bold">
            Resume
            <span className="text-green-500">Ai</span>
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 transition duration-500 border border-green-900 bg-green-950 px-10 py-3 rounded-full">
          <a href="#home" className="text-sm text-slate-50 hover:text-slate-300 transition">Home</a>
          <a href="#features" className="text-sm text-slate-50 hover:text-slate-300 transition">Features</a>
          <a href="#testimonials" className="text-sm text-slate-50 hover:text-slate-300 transition">Testimonials</a>
          <a href="#contact" className="text-sm text-slate-50 hover:text-slate-300 transition">Contact</a>
        </div>

        <div className="hidden min-[900px]:flex items-center gap-3 py-2 rounded-full">

          {/* Get Started */}
          <Link
            to="/app?state=signup"
            className="px-4 py-2 text-sm font-medium text-white rounded-full bg-green-600 hover:bg-green-700 transition-all duration-300"
          >
            Get Started
          </Link>

          {/* Login */}
          <Link
            to="/app?state=login"
            className="px-4 py-2 text-sm font-medium text-green-400 hover:text-white border border-green-700 hover:bg-green-700 rounded-full transition-all duration-300"
          >
            Login
          </Link>

        </div>

        {/* Mobile Menu */}
        <button id="open-menu" onClick={() => setMobileOpen(true)} className="md:hidden active:scale-90 transition" aria-label='Open menu'>
          <FiMenu size={26} />
        </button>
      </nav>

      {/* Mobile Navbar*/}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-all duration-300 
        ${mobileOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`
        }>
        <a href="#home" className=' text-slate-50 hover:text-slate-300 transition' onClick={() => setMobileOpen(false)}>Home</a>
        <a href="#features" className='text-slate-50 hover:text-slate-300 transition' onClick={() => setMobileOpen(false)}>Features</a>
        <a href="#testimonials" className='text-slate-50 hover:text-slate-300 transition' onClick={() => setMobileOpen(false)}>Testimonials</a>
        <a href="#contact" className='text-slate-50 hover:text-slate-300 transition' onClick={() => setMobileOpen(false)}>Contact</a>

        <button id="close-menu" onClick={() => setMobileOpen(false)} className="active:scale-90 transition" aria-label="Close menu">
          <RxCross2 size={26} />
        </button>
      </div>

      {/* BADGE */}
      <a className="flex items-center gap-2 rounded-full bg-green-950 p-2 mt-32">
        <span className="bg-green-600 text-xs px-3 py-1 rounded-full">
          NEW
        </span>
        <div className="flex items-center text-green-600 text-sm">
          <span>Try 30 days free trial option</span>
          <FaAngleRight size={16} />
        </div>
      </a>

      {/* HEADING */}
      <h1 className="text-center text-4xl md:text-6xl font-bold mt-6 max-w-3xl leading-tight">
        Build Your Resume in Seconds with{" "}
        <span className="bg-linear-to-r from-green-500 to-blue-500 bg-clip-text text-transparent inline-block">
          AI Power
        </span>
      </h1>

      {/* SUB HEADING */}
      <p className="text-center text-gray-300 max-w-xl mt-4">
        Create professional resumes instantly with AI suggestions, smart templates, and real-time preview.
      </p>

      {/* BUTTONS */}
      <div className="flex gap-4 mt-8">
        <Link to='/app?state=signup' className='bg-green-600 hover:bg-green-700 text-slate-50 rounded-full px-7 py-3'>
          Get Started
        </Link>
        <button className="flex items-center gap-2 border border-green-900 hover:bg-green-950 transition rounded-full px-6 py-3 text-slate-200">
          <IoVideocamOutline size={18} />
          <span>Watch demo</span>
        </button>
      </div>

      {/* TRUST TEXT */}
      {/* <p className="text-gray-400 mt-20">
        Trusted by developers & job seekers worldwide
      </p> */}
    </section>
  )
}

export default Hero