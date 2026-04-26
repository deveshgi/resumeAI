import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';

function CallToAction() {
  return (
    <div id='contact' className='w-full max-w-5xl mx-auto py-20 sm:px-16'>
      <div className="flex flex-col md:flex-row text-center md:text-left items-center justify-between gap-8 px-6 md:px-10 py-16 sm:py-20 -mt-10 -mb-10 w-full">
        <p className="text-xl font-medium max-w-md text-slate-800">Build your Professional Resume That Helps You Stand Out and Get Hired{" "}.</p>
        <Link to='/app?state=signup' className="flex items-center gap-2 rounded py-3 px-8 bg-green-600 hover:bg-green-700 transition text-white">Get started
          <FaArrowRight />
        </Link>
      </div>
    </div>
  )
}

export default CallToAction