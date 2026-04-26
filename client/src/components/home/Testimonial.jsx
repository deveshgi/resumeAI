import React from "react";
import Title from "./Title";
import { BookUserIcon } from "lucide-react";

function Testimonial() {
  const testimonials = [
    {
      id: 1,
      text: "ResumeAi helped me build a professional resume in minutes.",
      name: "Aman Kumar",
      role: "Frontend Developer",
      img: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      text: "The AI suggestions are incredibly accurate and helpful.",
      name: "Priya Sharma",
      role: "UI Designer",
      img: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: 3,
      text: "Best resume builder for freshers. Clean and simple UI.",
      name: "Rahul Verma",
      role: "Student",
      img: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    // {
    //   id: 4,
    //   text: "Loved the templates and AI features. Highly recommended!",
    //   name: "Neha Singh",
    //   role: "Software Engineer",
    //   img: "https://randomuser.me/api/portraits/women/4.jpg",
    // },
    // {
    //   id: 5,
    //   text: "ResumeAi made my job application process so easy.",
    //   name: "Rohit Patel",
    //   role: "Backend Developer",
    //   img: "https://randomuser.me/api/portraits/men/5.jpg",
    // },
    // {
    //   id: 6,
    //   text: "Super fast and easy to use. Great experience!",
    //   name: "Sneha Gupta",
    //   role: "HR Manager",
    //   img: "https://randomuser.me/api/portraits/women/6.jpg",
    // },
  ];

  return (
    <div id="testimonials" className="py-20 bg-black text-white">

      {/* Badge */}
      <div className="flex justify-center mb-4">
        <div className="flex items-center gap-2 text-sm text-green-400 bg-green-900/20 px-4 py-2 rounded-full">
          <BookUserIcon size={16} />
          Testimonials
        </div>
      </div>

      {/* Title */}
      <Title
        title="Loved by ResumeAi Users"
        description="Thousands of job seekers trust ResumeAi to create professional resumes with AI."
      />

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-12 px-4">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="bg-gray-900 border border-gray-800 p-6 rounded-xl hover:scale-105 transition duration-300"
          >
            <p className="text-gray-300 text-sm leading-relaxed">
              {item.text}
            </p>

            <div className="flex items-center gap-3 mt-6">
              <img
                src={item.img}
                alt={item.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold">{item.name}</p>
                <p className="text-xs text-gray-400">{item.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonial;