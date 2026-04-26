import { Plus, Trash2 } from 'lucide-react';
import { GoProjectRoadmap } from "react-icons/go";
import React from 'react'

function ProjectForm({ data = [], onChange }) {

  const addProject = () => {
    const newProject = {
      name: "",
      type: "",
      description: ""
    };
    onChange([...data, newProject]);
  };

  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <GoProjectRoadmap className="size-5"/>
            Projects
          </h3>
          <p className="text-sm text-gray-500">
            Add your Projects
          </p>
        </div>

        <button
          onClick={addProject}
          type="button"
          className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 hover:bg-green-200 transition rounded-lg"
        >
          <Plus className="size-4" />
          Add Project
        </button>
      </div>

      {/* EMPTY */}
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <GoProjectRoadmap className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No projects added yet.</p>
          <p className="text-sm">Click "Add Project" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((project, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-3">

              {/* HEADER */}
              <div className="flex justify-between items-center">
                <h4 className="font-medium">
                  Project #{index + 1}
                </h4>

                <button
                  onClick={() => removeProject(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              {/* INPUTS */}
              <div className="grid gap-3">

                <input
                  value={project.name}
                  onChange={(e) =>
                    updateProject(index, "name", e.target.value)
                  }
                  type="text"
                  placeholder="Project Name"
                  className="px-3 py-2 text-sm border rounded-lg"
                />

                <input
                  value={project.type}
                  onChange={(e) =>
                    updateProject(index, "type", e.target.value)
                  }
                  type="text"
                  placeholder="Project Type (e.g. Web App)"
                  className="px-3 py-2 text-sm border rounded-lg"
                />

                <textarea
                  value={project.description}
                  onChange={(e) =>
                    updateProject(index, "description", e.target.value)
                  }
                  placeholder="Project Description"
                  className="px-3 py-2 text-sm border rounded-lg"
                />

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProjectForm;