import { Sparkles } from 'lucide-react'
import React from 'react'
import api from '../configs/api'
import toast from 'react-hot-toast'

function SummaryForm({ data, onChange, setResumeData }) {

  const handleChange = (e) => {
    onChange(e.target.value)
  }
const enhanceSummary = async () => {
  // ✅ SAFE VALUE
  const text = (data || "").trim();

  if (!text) {
    toast.error("Write summary first");
    return;
  }

  try {
    const res = await api.post("/ai/enhance-summary", {
      text: text   // ✅ guaranteed string
    });

    onChange(res.data.data.enhancedText);

    toast.success("Summary enhanced ✨");

  } catch (err) {
    console.log("ERROR:", err.response?.data);
    toast.error(err.response?.data?.message || "AI failed");
  }
};

  return (
    <div className='space-y-4'>

      {/* header */}
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>
            Summary
          </h3>
          <p className='text-sm text-gray-500'>
            Add summary for your resume here
          </p>
        </div>

        {/* ai button */}
        <button
        onClick={enhanceSummary}
          type='button'
          className='flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors rounded'>
          <Sparkles className='size-4'
          />
          AI Enhance
        </button>
      </div>

      {/* textarea */}
      <div>
        <textarea
          value={data || ""}
          onChange={handleChange}
          rows={7}
          className='w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none'
          placeholder='Write a compelling summary that highlights your key strengths and carrer objectives...' />

        <p className='text-xs text-gray-500 mt-2'>
          Tip: Keep it concise (3-4 sentences) and focus on your most relevant achievements and skills.
        </p>
      </div>
    </div>
  )
}

export default SummaryForm