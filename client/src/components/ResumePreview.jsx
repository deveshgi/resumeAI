import React from 'react'
import ClassicTemplate from './templates/ClassicTemplate'
import MinimalImageTemplate from './templates/MinimalImageTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
import ModernTemplate from './templates/ModernTemplate'

function ResumePreview({ data, template, accentColor = "#3B82F6", classes = "" }) {

  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />
      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} />
      case "minimal-image":
        return <MinimalImageTemplate data={data} accentColor={accentColor} />
      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />
    }
  }

  return (
    <div className='w-full bg-gray-100'>
      <div
        id='resume-preview'
        className={"bg-white shadow-md " + classes}
      >
        {renderTemplate()}
      </div>

      {/* ✅ FIXED PRINT CSS */}
      <style>
        {`
        @page {
          size: A4;
          margin: 0;
        }

        @media print {
          body * {
            visibility: hidden !important;
          }

          #resume-preview, #resume-preview * {
            visibility: visible !important;
          }

          #resume-preview {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            box-shadow: none !important;
            border: none !important;
          }
        }
        `}
      </style>
    </div>
  )
}

export default ResumePreview