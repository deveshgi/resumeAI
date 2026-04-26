// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import ResumePreview from '../components/ResumePreview'
// import { dummyResumeData } from '../assets/assets'
// import Loader from '../components/Loader'
// import { ArrowLeftIcon } from 'lucide-react'

// function Preview() {
//   const { resumeId } = useParams()

//   const [isLoading, setIsLoading] = useState(true)
//   const [resumeData, setResumeData] = useState(null)

//   // useEffect(() => {
//   //   let data = JSON.parse(localStorage.getItem("resumes"))

//   //   if (!data || data.length === 0) {
//   //     data = dummyResumeData
//   //     localStorage.setItem("resumes", JSON.stringify(data))
//   //   }

//   //   const resume = data.find(r => String(r._id) === String(resumeId))

//   //   if (resume) {
//   //     setResumeData(resume)
//   //   }
//   // }, [resumeId])

//   // if (!resumeData) {
//   //   return <div className='text-center mt-20'>Resume not found</div>
//   // }

//   const loadResume = async () => {
//     setResumeData(dummyResumeData.find(resume => resume._id === resumeId || null))
//     setIsLoading(false)
//   }
//   useEffect(() => {
//     loadResume()
//   }, [])

//   return resumeData ? (
//     // <div className='p-4'>
//     //   <ResumePreview
//     //     data={resumeData}
//     //     template={resumeData.template}
//     //     accentColor={resumeData?.accent_color || "#3B82F6"}
//     //   />
//     // </div>

//     <div className='bg-slate-100'>
//       <div className='max-w-3xl mx-auto py-10'>
//         <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accentColor} classes='py-4 bg-white' />
//       </div>
//     </div>
//   ) : (
//     <div>
//       {isLoading ? <Loader /> : (
//         <div
//           className='flex flex-col items-center justify-center h-screen'>
//           <p
//             className='text-center text-6xl text-slate-400 font-medium'>
//             Resume not found
//           </p>
//           <a
//             className='mt-6 bg-green-500 hover:bg-green-600 text-white rounded-full px-6 h-9 ring-offset-1 ring-1 ring-green-400 flex items-center transition-colors'
//             href="/">
//             <ArrowLeftIcon className='mr-2 size-4' />
//             go to home page
//           </a>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Preview

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ResumePreview from '../components/ResumePreview'
import Loader from '../components/Loader'
import api from '../configs/api'
import { ArrowLeftIcon } from 'lucide-react'

function Preview() {

  const { resumeId } = useParams()

  const [resumeData, setResumeData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // ✅ LOAD PUBLIC RESUME
  const loadResume = async () => {
    try {
      const { data } = await api.get(`/resume/public/${resumeId}`)

      setResumeData(data.data.resume)
      setIsLoading(false)

    } catch (error) {
      setIsLoading(false)
      console.log(error.message)
    }
  }

  useEffect(() => {
    loadResume()
  }, [resumeId])

  // ✅ LOADING
  if (isLoading) return <Loader />

  // ❌ NOT FOUND / NOT PUBLIC
  if (!resumeData) {
    return (
      <div className='flex flex-col items-center justify-center h-screen'>

        <p className='text-4xl text-gray-400 mb-6'>
          Resume not found
        </p>

        <a
          href="/"
          className='flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded'
        >
          <ArrowLeftIcon className='size-4' />
          Go Home
        </a>

      </div>
    )
  }

  return (
    <div className='bg-slate-100 min-h-screen py-10'>

      <div className='max-w-4xl mx-auto'>

        {/* Preview */}
        <ResumePreview
          data={resumeData}
          template={resumeData.template}
          accentColor={resumeData.accent_color}
          classes="bg-white shadow"
        />

      </div>

    </div>
  )
}

export default Preview