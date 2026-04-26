// import React, { useEffect, useState } from 'react'
// import { Link, useParams } from 'react-router-dom'
// import { dummyResumeData } from '../assets/assets'
// import { FaArrowLeft } from 'react-icons/fa'
// import {
//   User,
//   FileText,
//   Briefcase,
//   GraduationCap,
//   FolderIcon,
//   Sparkles,
//   ChevronLeft,
//   ChevronRight,
//   Share2Icon,
//   EyeIcon,
//   EyeOffIcon,
//   DownloadIcon
// } from 'lucide-react'
// import PersonalInfoForm from '../components/PersonalInfoForm'
// import ResumePreview from '../components/ResumePreview'
// import TemplateSelector from '../components/TemplateSelector'
// import ColorPicker from '../components/ColorPicker'
// import SummaryForm from '../components/SummaryForm'
// import ExperienceForm from '../components/ExperienceForm'
// import EducationForm from '../components/EducationForm'
// import ProjectForm from '../components/ProjectForm'
// import SkillsForm from '../components/SkillsForm'

// function ResumeBuilder() {
//   const { resumeId } = useParams()
//   const [resumeData, setResumeData] = useState({
//     _id: '',
//     title: '',
//     personal_info: {
//       full_name: "",
//       email: "",
//       phone: "",
//       profession: "",
//       linkedin: "",
//       image: "",
//     },
//     summary: "",
//     experience: [],
//     education: [],
//     project: [],
//     skills: [],
//     template: "classic",
//     accent_color: "#3B82F6",
//     public: false,
//   })

//   const [activeSectionIndex, setActiveSectionIndex] = useState(0)
//   const [removeBackground, setRemoveBackground] = useState(false)

//   const sections = [
//     { id: "personal", name: "Personal Info", icon: User },
//     { id: "summary", name: "Summary", icon: FileText },
//     { id: "experience", name: "Experience", icon: Briefcase },
//     { id: "education", name: "Education", icon: GraduationCap },
//     { id: "projects", name: "Projects", icon: FolderIcon },
//     { id: "skills", name: "Skills", icon: Sparkles },
//   ]

//   const activeSection = sections[activeSectionIndex]

//   const loadExistingResume = async () => {
//     let data = JSON.parse(localStorage.getItem("resumes")) || [];

//     // if empty → use dummy
//     if (data.length === 0) {
//       data = dummyResumeData;
//       localStorage.setItem("resumes", JSON.stringify(data));
//     }

//     const resume = data.find((r) => String(r._id) === String(resumeId));

//     if (resume) {
//       setResumeData({
//         ...resume,
//         personal_info: resume.personal_info || {},
//       });
//     }
//   };

//   useEffect(() => {
//     loadExistingResume()
//   }, [resumeId])

//   useEffect(() => {
//     if (!resumeData._id) return;

//     const stored = JSON.parse(localStorage.getItem("resumes")) || [];

//     const updated = stored.map((r) =>
//       r._id === resumeData._id ? resumeData : r
//     );

//     localStorage.setItem("resumes", JSON.stringify(updated));
//   }, [resumeData]);

//   const changeResumeVisibility = async () => {
//     setResumeData({ ...resumeData, public: !resumeData.public })
//   }

//   // const handleShare = () => {
//   //   const frontendUrl = window.location.href.split('/app/')[0];
//   //   const resumeUrl = frontendUrl + '/view/' + resumeId;

//   //   if (navigation.share) {
//   //     navigator.share({ url: resumeUrl, text: "My Resume", })
//   //   } else {
//   //     alert('share not supported on this browser.')
//   //   }
//   // }

//   const handleShare = () => {
//     const frontendUrl = window.location.href.split('/app/')[0];
//     const resumeUrl = frontendUrl + '/view/' + resumeId;

//     // ✅ correct check
//     if (navigator.share) {
//       navigator.share({
//         title: "My Resume",
//         text: "Check out my resume",
//         url: resumeUrl,
//       }).catch((err) => console.log(err));
//     } else {
//       // ✅ fallback (important)
//       navigator.clipboard.writeText(resumeUrl);
//       alert("Link copied to clipboard ✅");
//     }
//   };

//   const downloadResume = () => {
//     setTimeout(() => {
//       window.print();
//     }, 300);
//   };

//   return (
//     <div>
//       {/* top */}
//       <div className='max-w-7xl mx-auto px-4 py-6'>
//         <Link to={'/app'} className='inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all'>
//           <FaArrowLeft className='size-4' />Back to Dashboard
//         </Link>
//       </div>

//       <div className='max-w-7x1 mx-auto px-4 pb-8'>
//         <div className='grid lg:grid-cols-12 gap-8'>

//           {/* Left Panel */}
//           <div className='relative lg:col-span-5 rounded-lg overflow-hidden'>
//             <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1'>

//               {/* progress bar */}
//               <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200" />

//               <hr className="absolute top-0 left-0 h-1 bg-linear-to-r from-green-500 to-green-600 border-none transition-all duration-300"
//                 style={{ width: `${(activeSectionIndex / (sections.length - 1)) * 100}%`, }}
//               />

//               {/* section navigation */}
//               <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">

//                 <div className='flex items-center gap-2'>
//                   <TemplateSelector selectedTemplate={resumeData.template} onChange={(template) => setResumeData(prev => ({ ...prev, template }))} />

//                   <ColorPicker selectedColor={resumeData.accent_color} onChange={(color) => setResumeData(prev => ({ ...prev, accent_color: color }))} />
//                 </div>

//                 <div className='flex items-center'>
//                   {activeSectionIndex !== 0 && (
//                     <button onClick={() => setActiveSectionIndex((prev) => Math.
//                       max(prev - 1, 0))} className='flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-all' disabled={activeSectionIndex === 0}>
//                       <ChevronLeft className="size-4" /> Prev
//                     </button>
//                   )}

//                   <button
//                     onClick={() => setActiveSectionIndex((prev) => Math.min(prev + 1, sections.length - 1))}
//                     className={
//                       `flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-all ${activeSectionIndex === sections.length - 1 && 'opacity-50'}`} disabled={activeSectionIndex === sections.length - 1}> Next
//                     <ChevronRight className="size-4" />
//                   </button>
//                 </div>
//               </div>

//               {/* form content */}
//               <div className='space-y-6'>
//                 {activeSection.id === 'personal' && (
//                   <PersonalInfoForm
//                     data={resumeData.personal_info}
//                     onChange={(data) => setResumeData(prev => ({ ...prev, personal_info: data }))
//                     }
//                     removeBackground={removeBackground} setRemoveBackground={setRemoveBackground}
//                   />
//                 )}

//                 {activeSection.id === 'summary' && (
//                   <SummaryForm
//                     data={resumeData.summary}
//                     onChange={(data) => setResumeData((prev) => ({ ...prev, summary: data }))
//                     }
//                     setResumeData={setResumeData}
//                   />
//                 )}

//                 {activeSection.id === 'experience' && (
//                   <ExperienceForm data={resumeData.experience} onChange={(data) => setResumeData((prev) => ({ ...prev, experience: data }))} />
//                 )}

//                 {activeSection.id === 'education' && (
//                   <EducationForm data={resumeData.education} onChange={(data) => setResumeData((prev) => ({ ...prev, education: data }))} />
//                 )}

//                 {activeSection.id === 'projects' && (
//                   <ProjectForm data={resumeData.project} onChange={(data) => setResumeData((prev) => ({ ...prev, project: data }))} />
//                 )}

//                 {activeSection.id === 'skills' && (
//                   <SkillsForm data={resumeData.skills} onChange={(data) => setResumeData((prev) => ({ ...prev, skills: data }))} />
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Right Panel Preview */}
//           <div className='lg:col-span-7 max-lg:mt-6'>
//             <div className='relative w-full'>
//               <div className='absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2'>
//                 {resumeData.public && (
//                   <button onClick={handleShare} className='flex items-center p-2 px-4 gap-2 text-xs bg-linear-to-br from-blue-100 hover:ring transition-colors'>
//                     <Share2Icon className='size-4' />  Share
//                   </button>
//                 )}
//                 <button
//                   onClick={changeResumeVisibility}
//                   className='flex items-center p-2 px-4 gap-2 text-xs bg-linear-to-br from-purple-100 to-purple-200 text-purple-600 ring-purple-300 rounded-lg hover:ring transition-colors'>
//                   {resumeData.public ? <EyeIcon className='size-4' /> : <EyeOffIcon className='size-4' />}

//                   {resumeData.public ? 'Public' : 'Private'}
//                 </button>

//                 <button
//                   onClick={downloadResume}
//                   className='flex items-center gap-2 px-6 py-2 text-xs bg-linear-to-br from-green-100 to-green-200 text-green-600 ring-green-300 rounded-lg hover:ring transition-colors'>
//                   <DownloadIcon className='size-4' />Download
//                 </button>
//               </div>
//             </div>

//             {/* resume preview */}
//             <ResumePreview
//               data={resumeData}
//               template={resumeData.template}
//               accentColor={resumeData?.accent_color || "#3B82F6"}
//             />
//           </div>
//         </div>
//       </div>
//     </div >
//   )
// }

// export default ResumeBuilder



import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  FolderIcon,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  EyeIcon,
  EyeOffIcon
} from 'lucide-react'

import api from '../configs/api'
import toast from 'react-hot-toast'

import PersonalInfoForm from '../components/PersonalInfoForm'
import ResumePreview from '../components/ResumePreview'
import TemplateSelector from '../components/TemplateSelector'
import ColorPicker from '../components/ColorPicker'
import SummaryForm from '../components/SummaryForm'
import ExperienceForm from '../components/ExperienceForm'
import EducationForm from '../components/EducationForm'
import ProjectForm from '../components/ProjectForm'
import SkillsForm from '../components/SkillsForm'

function ResumeBuilder() {

  const { resumeId } = useParams()

  const [resumeData, setResumeData] = useState(null)
  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [removeBackground, setRemoveBackground] = useState(false)

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ]

  const activeSection = sections[activeSectionIndex]

  // ✅ LOAD RESUME
  const loadResume = async () => {
    try {
      const { data } = await api.get(`/resume/${resumeId}`)
      setResumeData(data.data.resume)
    } catch (err) {
      toast.error("Failed to load resume")
    }
  }

  useEffect(() => {
    loadResume()
  }, [resumeId])

  // ✅ AUTO SAVE
  // useEffect(() => {
  //   if (!resumeData?._id) return

  //   const updateResume = async () => {
  //     try {
  //       await api.patch(`/resume/update/${resumeData._id}`, resumeData)
  //     } catch (err) {
  //       toast.error("Auto-save failed")
  //     }
  //   }

  //   const timeout = setTimeout(updateResume, 800)
  //   return () => clearTimeout(timeout)

  // }, [resumeData])
useEffect(() => {
  if (!resumeData?._id) return;

  const updateResume = async () => {
    try {

      // ❌ REMOVE IMAGE FROM AUTO SAVE
      const safeData = {
        ...resumeData,
        personal_info: {
          ...resumeData.personal_info,
          image: undefined
        }
      };

      await api.patch(
        `/resume/update/${resumeData._id}`,
        safeData
      );

    } catch (err) {
      console.log(err.message);
    }
  };

  const timeout = setTimeout(updateResume, 1500);

  return () => clearTimeout(timeout);

}, [resumeData]);
  // ✅ SHARE
  const handleShare = () => {
    if (!resumeData.public) {
      toast.error("Make resume public first 🔓")
      return
    }

    const url = `${window.location.origin}/view/${resumeId}`
    navigator.clipboard.writeText(url)
    toast.success("Link copied ✅")
  }

  // ✅ DOWNLOAD
  const downloadResume = () => {
    toast.success("Downloading...")
    setTimeout(() => window.print(), 300)
  }

  // ✅ TOGGLE PUBLIC
  const togglePublic = () => {
    setResumeData(prev => ({
      ...prev,
      public: !prev.public
    }))

    toast.success(
      resumeData.public ? "Set to Private 🔒" : "Set to Public 🌍"
    )
  }

  if (!resumeData) return <div className="p-10 text-center">Loading...</div>

  return (
    <div>

      {/* TOP */}
      <div className='max-w-7xl mx-auto px-4 py-6'>
        <Link to='/app' className='flex items-center gap-2 text-gray-500'>
          <FaArrowLeft /> Back
        </Link>
      </div>

      <div className='max-w-7xl mx-auto px-4 pb-8 grid lg:grid-cols-12 gap-8'>

        {/* LEFT PANEL */}
        <div className='lg:col-span-5 bg-white p-6 rounded shadow'>

          {/* CONTROLS */}
          <div className='flex justify-between mb-4'>

            <div className='flex gap-2'>
              <TemplateSelector
                selectedTemplate={resumeData.template}
                onChange={(template) =>
                  setResumeData(prev => ({ ...prev, template }))
                }
              />

              <ColorPicker
                selectedColor={resumeData.accent_color}
                onChange={(color) =>
                  setResumeData(prev => ({ ...prev, accent_color: color }))
                }
              />
            </div>

            {/* RIGHT CONTROLS */}
            <div className='flex items-center gap-2'>

              {/* PUBLIC TOGGLE */}
              <button
                onClick={togglePublic}
                className={`flex items-center gap-2 px-3 py-1 rounded text-sm ${
                  resumeData.public
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {resumeData.public ? (
                  <>
                    <EyeIcon className='size-4' /> Public
                  </>
                ) : (
                  <>
                    <EyeOffIcon className='size-4' /> Private
                  </>
                )}
              </button>

              {/* SHARE */}
              <button
                onClick={handleShare}
                disabled={!resumeData.public}
                className={`px-3 py-1 rounded text-sm ${
                  resumeData.public
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 text-gray-500"
                }`}
              >
                Share
              </button>

              {/* DOWNLOAD */}
              <button
                onClick={downloadResume}
                className='px-3 py-1 rounded text-sm bg-black text-white'
              >
                Download
              </button>

            </div>
          </div>

          {/* NAVIGATION */}
          <div className='flex justify-between mb-6'>
            <button
              onClick={() => setActiveSectionIndex(prev => Math.max(prev - 1, 0))}
              disabled={activeSectionIndex === 0}
            >
              <ChevronLeft />
            </button>

            <p>{activeSection.name}</p>

            <button
              onClick={() => setActiveSectionIndex(prev => Math.min(prev + 1, sections.length - 1))}
              disabled={activeSectionIndex === sections.length - 1}
            >
              <ChevronRight />
            </button>
          </div>

          {/* FORMS */}
          <div>

            {activeSection.id === 'personal' && (
              <PersonalInfoForm
                data={resumeData.personal_info}
                onChange={(data) =>
                  setResumeData(prev => ({ ...prev, personal_info: data }))
                }
                removeBackground={removeBackground}
                setRemoveBackground={setRemoveBackground}
              />
            )}

            {activeSection.id === 'summary' && (
              <SummaryForm
                data={resumeData.summary}
                onChange={(data) =>
                  setResumeData(prev => ({ ...prev, summary: data }))
                }
              />
            )}

            {activeSection.id === 'experience' && (
              <ExperienceForm
                data={resumeData.experience}
                onChange={(data) =>
                  setResumeData(prev => ({ ...prev, experience: data }))
                }
              />
            )}

            {activeSection.id === 'education' && (
              <EducationForm
                data={resumeData.education}
                onChange={(data) =>
                  setResumeData(prev => ({ ...prev, education: data }))
                }
              />
            )}

            {activeSection.id === 'projects' && (
              <ProjectForm
                data={resumeData.project}
                onChange={(data) =>
                  setResumeData(prev => ({ ...prev, project: data }))
                }
              />
            )}

            {activeSection.id === 'skills' && (
              <SkillsForm
                data={resumeData.skills}
                onChange={(data) =>
                  setResumeData(prev => ({ ...prev, skills: data }))
                }
              />
            )}

          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className='lg:col-span-7'>
          <ResumePreview
            data={resumeData}
            template={resumeData.template}
            accentColor={resumeData.accent_color}
          />
        </div>

      </div>
    </div>
  )
}

export default ResumeBuilder