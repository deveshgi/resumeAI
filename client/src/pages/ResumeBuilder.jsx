<<<<<<< HEAD
=======

>>>>>>> 417972b (updated code)
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

  // LOAD RESUME
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

useEffect(() => {
  if (!resumeData?._id) return;

  const updateResume = async () => {
    try {

      // REMOVE IMAGE FROM AUTO SAVE
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
  // SHARE
  const handleShare = () => {
    if (!resumeData.public) {
      toast.error("Make resume public first 🔓")
      return
    }

    const url = `${window.location.origin}/view/${resumeId}`
    navigator.clipboard.writeText(url)
    toast.success("Link copied ")
  }

  // DOWNLOAD
  const downloadResume = () => {
    toast.success("Downloading...")
    setTimeout(() => window.print(), 300)
  }

  // TOGGLE PUBLIC
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
