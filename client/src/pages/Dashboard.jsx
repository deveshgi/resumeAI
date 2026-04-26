// import React, { useEffect, useState } from "react";

// import { useNavigate } from 'react-router-dom'
// import { HiOutlinePlusCircle } from "react-icons/hi2";
// import { TbCloudUpload } from "react-icons/tb";
// import { dummyResumeData } from "../assets/assets";
// import { FaRegEdit, FaEdit } from "react-icons/fa";
// import { MdDeleteForever } from "react-icons/md";
// import { IoMdClose } from "react-icons/io";


// function Dashboard() {
//   const colors = ["#9333ea", "#d97706", "#0284c7", "#16a34a"]

//   const [allResumes, setAllResumes] = useState([])

//   const [showCreateResume, setShowCreateResume] = useState(false)
//   const [showUploadResume, setShowUploadResume] = useState(false)

//   const [title, setTitle] = useState('')
//   const [resume, setResume] = useState(null)

//   const [editResumeId, setEditResumeId] = useState('')

//   const navigate = useNavigate()

//   // Load data
//   useEffect(() => {
//     let data = JSON.parse(localStorage.getItem("resumes"));

//     if (!data || data.length === 0) {
//       data = dummyResumeData;
//       localStorage.setItem("resumes", JSON.stringify(data));
//     }

//     setAllResumes(data);
//   }, []);

//   // Save data
//   useEffect(() => {
//     localStorage.setItem("resumes", JSON.stringify(allResumes));
//   }, [allResumes]);

//   // create resume
//   const createResume = (e) => {
//     e.preventDefault();

//     const newResume = {
//       _id: Date.now().toString(),
//       title: title || "Untitled Resume",
//       userId: "user123",
//       personal_info: {},
//       summary: "",
//       skills: [],
//       experience: [],
//       education: [],
//       project: [],
//       createdAt: new Date().toISOString(),
//       template: "classic",
//       accent_color: "#3B82F6",
//     };

//     setAllResumes((prev) => [...prev, newResume]);

//     setShowCreateResume(false);
//     setTitle("");

//     navigate(`/app/builder/${newResume._id}`);
//   };

//   // upload resume
//   const uploadResume = (e) => {
//     e.preventDefault();

//     if (!resume) {
//       alert("Please upload a file");
//       return;
//     }

//     const newResume = {
//       _id: Date.now().toString(),
//       title: title || resume.name,
//       userId: "user123",
//       personal_info: {},
//       summary: "",
//       skills: [],
//       experience: [],
//       education: [],
//       project: [],
//       createdAt: new Date().toISOString(),
//       template: "classic",
//       accent_color: "#3B82F6",
//     };

//     setAllResumes((prev) => [...prev, newResume]);

//     setShowUploadResume(false);
//     setTitle("");
//     setResume(null);

//     navigate(`/app/builder/${newResume._id}`);
//   };

//   //edit resume
//   const editTitle = async (e) => {
//     e.preventDefault();

//     setAllResumes((prev) =>
//       prev.map((r) =>
//         r._id === editResumeId ? { ...r, title } : r
//       )
//     );

//     setEditResumeId("");
//     setTitle("");
//   }

//   // delete resume
//   const deleteResume = async (resumeId) => {
//     const confirm = window.confirm('Are you sure you want to delete this resume?')
//     if (confirm) {
//       setAllResumes(prev => prev.filter(r => r._id !== resumeId)
//       )
//     }
//   }


//   return (
//     <div className="bg-black min-h-screen text-white">
//       <div className="max-w-7xl mx-auto px-6 py-10">

//         {/* Welcome */}
//         <p className="text-2xl font-semibold mb-8 bg-linear-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent">
//           Welcome, John Doe
//         </p>

//         {/* Cards */}
//         <div className="flex flex-col sm:flex-row gap-6">

//           {/* Create Resume */}
//           <button onClick={() => setShowCreateResume(true)} className="w-full sm:max-w-xs h-48 flex flex-col items-center justify-center rounded-xl gap-3 border border-dashed border-gray-700 bg-gray-900 hover:border-green-500 hover:shadow-lg transition duration-300 group">
//             <HiOutlinePlusCircle className="text-4xl p-2 rounded-full bg-linear-to-r from-green-500 to-blue-500 text-white group-hover:scale-110 transition" />
//             <p className="text-sm text-gray-300 group-hover:text-green-400">
//               Create Resume
//             </p>
//           </button>

//           {/* Upload Resume */}
//           <button onClick={() => setShowUploadResume(true)} className="w-full sm:max-w-xs h-48 flex flex-col items-center justify-center rounded-xl gap-3 border border-dashed border-gray-700 bg-gray-900 hover:border-green-500 hover:shadow-lg transition duration-300 group">
//             <TbCloudUpload className="text-4xl p-2 rounded-full bg-linear-to-r from-green-500 to-blue-500 text-white group-hover:scale-110 transition" />
//             <p className="text-sm text-gray-300 group-hover:text-green-400">
//               Upload Existing
//             </p>
//           </button>
//         </div>

//         {/* Divider */}
//         <hr className="border-gray-800 my-10" />

//         {/* Resume List */}
//         <div className="grid grid-cols-2 sm:flex flex-wrap gap-12">
//           {allResumes.map((resume, index) => {
//             const baseColor = colors[index % colors.length];

//             return (
//               <button onClick={() => navigate(`/app/builder/${resume._id}`)}
//                 key={index}
//                 className="relative w-full sm:max-w-36 h-48 flex flex-col items-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer"
//                 style={{
//                   background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
//                   borderColor: baseColor + "40",
//                 }}
//               >
//                 <div className="mt-6">
//                   {resume.personal_info?.image ? (
//                     <img
//                       src={resume.personal_info.image}
//                       alt="profile"
//                       className="w-12 h-12 rounded-full object-cover mx-auto border"
//                     />
//                   ) : (
//                     <FaRegEdit
//                       className="size-7 mx-auto"
//                       style={{ color: baseColor }}
//                     />
//                   )}
//                 </div>

//                 <p
//                   className="text-sm group-hover:scale-105 transition-all px-2 text-center"
//                   style={{ color: baseColor }}
//                 >
//                   {resume.title}
//                 </p>

//                 <p className="absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center">
//                   Updated on{" "}
//                   {new Date(resume.createdAt).toLocaleDateString()}
//                 </p>

//                 <div
//                   onClick={(e) => e.stopPropagation()} className="absolute top-1 right-1 group-hover:flex items-center hidden">

//                   <MdDeleteForever onClick={() => deleteResume(resume._id)}
//                     className="size-7 p-1.5 hover:bg-white/30 rounded text-slate-700 transition-colors" />

//                   <FaEdit
//                     onClick={() => {
//                       setEditResumeId(resume._id);
//                       setTitle(resume.title)
//                     }}
//                     className="size-7 p-1.5 hover:bg-white/30 rounded text-slate-700 transition-colors" />
//                 </div>
//               </button>
//             );
//           })}
//         </div>

//         {showCreateResume && (
//           <form onSubmit={createResume} onClick={() => setShowCreateResume(false)} className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center">

//             <div onClick={(e) => e.stopPropagation()} className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6">
//               <h2 className="text-black">Create a Resume</h2>
//               <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder='Enter resume title' className='w-full px-4 py-2 mb-4 border-green-800 ring-green-600 text-black' required />

//               <button className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors'>
//                 Create Resume
//               </button>
//               <IoMdClose className='absolute top-4 right-4 text-slate-400 cursor-pointer transition-colors'
//                 onClick={() => { setShowCreateResume(false); setTitle('') }} />
//             </div>
//           </form>
//         )}

//         {showUploadResume && (
//           <form onSubmit={uploadResume} onClick={() => setShowUploadResume(false)} className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center">

//             <div onClick={(e) => e.stopPropagation()} className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6">

//               <h2 className="text-black">Upload Resume</h2>

//               <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder='Enter resume title' className='w-full px-4 py-2 mb-4 border-green-800 ring-green-600 text-black'
//                 required />
//               <div>
//                 <label htmlFor="resume-input" className="block text-sm text-slate-700">Select resume file
//                   <div className="flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors">
//                     {resume ? (
//                       <p className="text-green-700">{resume.name}</p>
//                     ) : (
//                       <>
//                         <TbCloudUpload className='size-14 stroke-1' />
//                         <p>Upload resume</p>
//                       </>
//                     )}
//                   </div>
//                 </label>

//                 <input type="file" name="" id="resume-input" accept=".pdf" hidden onChange={(e) => setResume(e.target.files[0])} />
//               </div>

//               <button className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors'>
//                 Upload Resume
//               </button>

//               <IoMdClose className='absolute top-4 right-4 text-slate-400 cursor-pointer transition-colors'
//                 onClick={() => { setShowUploadResume(false); setTitle('') }} />
//             </div>
//           </form>
//         )}

//         {editResumeId && (
//           <form onSubmit={editTitle} onClick={() => setEditResumeId('')} className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center">

//             <div onClick={(e) => e.stopPropagation()} className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6">
//               <h2 className="text-black">Update a Resume</h2>
//               <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder='Enter resume title' className='w-full px-4 py-2 mb-4 border-green-800 ring-green-600 text-black' required />

//               <button className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors'>
//                 Update
//               </button>

//               <IoMdClose className='absolute top-4 right-4 text-slate-400 cursor-pointer transition-colors'
//                 onClick={() => { setEditResumeId(''); setTitle('') }} />
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Dashboard;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlinePlusCircle } from "react-icons/hi2";
import { TbCloudUpload } from "react-icons/tb";
import { FaRegEdit, FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import api from "../configs/api";

function Dashboard() {

  const colors = ["#9333ea", "#d97706", "#0284c7", "#16a34a"]

  const [allResumes, setAllResumes] = useState([])
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [title, setTitle] = useState("")
  const [editResumeId, setEditResumeId] = useState("")

  const navigate = useNavigate()

  // ✅ LOAD FROM BACKEND
  const fetchResumes = async () => {
    try {
      const { data } = await api.get("/resume/all")
      setAllResumes(data.data.resumes)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchResumes()
  }, [])

  // ✅ CREATE RESUME
  const createResume = async (e) => {
    e.preventDefault()

    try {
      const { data } = await api.post("/resume", {
        title: title || "Untitled Resume"
      })

      setShowCreateResume(false)
      setTitle("")

      navigate(`/app/builder/${data.data.resume._id}`)

    } catch (err) {
      console.log(err.message)
    }
  }

  // ✅ DELETE RESUME
  const deleteResume = async (resumeId) => {
    const confirmDelete = window.confirm("Delete this resume?")
    if (!confirmDelete) return

    try {
      await api.delete(`/resume/delete/${resumeId}`)
      setAllResumes(prev => prev.filter(r => r._id !== resumeId))
    } catch (err) {
      console.log(err.message)
    }
  }

  // ✅ UPDATE TITLE
  const editTitle = async (e) => {
    e.preventDefault()

    try {
      await api.patch(`/resume/update/${editResumeId}`, {
        title
      })

      setAllResumes(prev =>
        prev.map(r =>
          r._id === editResumeId ? { ...r, title } : r
        )
      )

      setEditResumeId("")
      setTitle("")

    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Heading */}
        <h2 className="text-2xl font-semibold mb-8">
          Your Resumes
        </h2>

        {/* Create */}
        <div className="flex gap-6 flex-wrap">

          <button
            onClick={() => setShowCreateResume(true)}
            className="w-full sm:max-w-xs h-48 flex flex-col items-center justify-center rounded-xl gap-3 border border-dashed border-gray-700 bg-gray-900 hover:border-green-500 transition"
          >
            <HiOutlinePlusCircle className="text-4xl text-green-400" />
            <p>Create Resume</p>
          </button>

        </div>

        <hr className="border-gray-800 my-10" />

        {/* Resume List */}
        <div className="grid grid-cols-2 sm:flex flex-wrap gap-12">

          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];

            return (
              <div
                key={resume._id}
                className="relative w-full sm:max-w-36 h-48 flex flex-col items-center rounded-lg gap-2 border cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${baseColor}20, ${baseColor}50)`
                }}
                onClick={() => navigate(`/app/builder/${resume._id}`)}
              >

                {/* Title */}
                <p className="mt-6 text-sm text-center px-2">
                  {resume.title}
                </p>

                {/* Date */}
                <p className="absolute bottom-1 text-[11px] text-gray-400">
                  {new Date(resume.createdAt).toLocaleDateString()}
                </p>

                {/* Actions */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-1 right-1 flex gap-1"
                >

                  <MdDeleteForever
                    onClick={() => deleteResume(resume._id)}
                    className="size-6 cursor-pointer hover:text-red-400"
                  />

                  <FaEdit
                    onClick={() => {
                      setEditResumeId(resume._id)
                      setTitle(resume.title)
                    }}
                    className="size-5 cursor-pointer hover:text-yellow-400"
                  />
                </div>

              </div>
            )
          })}
        </div>

        {/* CREATE MODAL */}
        {showCreateResume && (
          <form
            onSubmit={createResume}
            className="fixed inset-0 bg-black/70 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white text-black p-6 rounded-lg w-full max-w-sm"
            >
              <h2 className="mb-4">Create Resume</h2>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
                className="w-full px-3 py-2 border mb-4"
                required
              />

              <button className="w-full py-2 bg-green-600 text-white rounded">
                Create
              </button>

              <IoMdClose
                onClick={() => setShowCreateResume(false)}
                className="absolute top-4 right-4 cursor-pointer"
              />
            </div>
          </form>
        )}

        {/* EDIT MODAL */}
        {editResumeId && (
          <form
            onSubmit={editTitle}
            className="fixed inset-0 bg-black/70 flex items-center justify-center"
          >
            <div className="bg-white text-black p-6 rounded-lg w-full max-w-sm">

              <h2 className="mb-4">Edit Title</h2>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border mb-4"
              />

              <button className="w-full py-2 bg-blue-600 text-white rounded">
                Update
              </button>

              <IoMdClose
                onClick={() => setEditResumeId("")}
                className="absolute top-4 right-4 cursor-pointer"
              />
            </div>
          </form>
        )}

      </div>
    </div>
  )
}

export default Dashboard