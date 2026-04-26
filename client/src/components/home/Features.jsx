import React from "react";
import { FiZap, FiFileText, FiEdit, FiDownload } from "react-icons/fi";
import Title from "./Title";

function Features() {
  const features = [
    {
      icon: <FiFileText />,
      title: "AI Resume Generation",
      desc: "Generate professional resumes instantly using AI-powered suggestions.",
    },
    {
      icon: <FiEdit />,
      title: "Easy Customization",
      desc: "Edit and customize your resume with real-time preview and smart tools.",
    },
    {
      icon: <FiDownload />,
      title: "Export as PDF",
      desc: "Download your resume in high-quality PDF format with one click.",
    },
  ];

  return (
    <div id="features" className="flex flex-col items-center py-20 px-4">

      {/* Badge */}
      <div className="flex items-center gap-2 text-sm text-green-400 bg-green-900/20 px-5 py-2 rounded-full">
        <FiZap />
        <span>Simple Process</span>
      </div>

      {/* Title */}
      <Title
        title="Build Your Resume with AI"
        description="Create a professional resume in minutes using AI-powered tools, customizable templates, and real-time preview."
      />

      {/* Content */}
      <div className="flex flex-col lg:flex-row items-center gap-10 mt-12 max-w-6xl w-full">

        {/* Image */}
        <img
          className="w-full max-w-lg"
          src="/group-image.png"
          alt="resume preview"
        />

        {/* Features List */}
        <div className="flex flex-col gap-6 w-full max-w-md">

          {features.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-5 rounded-xl border border-gray-800 bg-gray-900 hover:border-green-500 hover:bg-gray-800 transition duration-300"
            >
              <div className="text-green-400 text-xl">
                {item.icon}
              </div>

              <div>
                <h3 className="text-white font-semibold text-base">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default Features;