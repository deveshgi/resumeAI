<<<<<<< HEAD
=======

>>>>>>> 417972b (updated code)
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

  // LOAD FROM BACKEND
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

  // CREATE RESUME
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

  // DELETE RESUME
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

  // UPDATE TITLE
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
