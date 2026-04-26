import React, { useMemo, useEffect } from 'react'
import { Mail, Phone, User, Briefcase } from 'lucide-react'
import { FaLinkedin } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";

function PersonalInfoForm({
  data = {},
  onChange,
  removeBackground,
  setRemoveBackground
}) {

  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value })
  }

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  };

const handleImageUpload = async (file) => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const { data } = await api.patch(
      `/resume/update/${resumeId}`,
      formData
    );

    setResumeData(prev => ({
      ...prev,
      personal_info: {
        ...prev.personal_info,
        image: data.data.resume.personal_info.image
      }
    }));

    toast.success("Image uploaded ✅");

  } catch (err) {
    toast.error("Image upload failed ❌");
  }
};

  // const imageUrl = useMemo(() => {
  //   if (!data?.image) return null;

  //   if (typeof data.image === "string") { return data.image; }

  //   if (data.image instanceof File || data.image instanceof Blob) {
  //     try {
  //       return URL.createObjectURL(data.image);
  //     } catch {
  //       return null;
  //     }
  //   }
  //   return null;
  // }, [data?.image]);

  // useEffect(() => {
  //   return () => {
  //     if (imageUrl && typeof data.image !== "string") {
  //       URL.revokeObjectURL(imageUrl);
  //     }
  //   };
  // }, [imageUrl]);

  const fields = [
    { key: "full_name", label: "Full Name", icon: User, type: "text", required: true },
    { key: "email", label: "Email Address", icon: Mail, type: "email", required: true },
    { key: "phone", label: "Phone Number", icon: Phone, type: "tel" },
    { key: "profession", label: "Profession", icon: Briefcase, type: "text" },
    { key: "location", label: "Location", icon: SlLocationPin, type: "text" },
    { key: "linkedin", label: "LinkedIn Profile", icon: FaLinkedin, type: "url" },
  ];


  return (
    <div>
      {/* Heading */}
      <h3 className="text-lg font-semibold text-gray-900">
        Personal Information
      </h3>
      <p className="text-sm text-gray-600">
        Get started with your personal information
      </p>

      {/* Image Upload */}
      <div className="flex items-center gap-4 mt-4">
        <label className="cursor-pointer group">
          {data?.image ? (
            <img
              src={data.image}
              alt="user"
              className="w-16 h-16 rounded-full object-cover ring ring-slate-300 group-hover:opacity-80 transition"
            />
          ) : (
            <div className="inline-flex items-center gap-2 text-slate-600">
              <User className="size-10 p-2 border rounded-full" />
              <span className="text-sm">Upload Image</span>
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageUpload(e.target.files[0])}
          />
        </label>

        {/* Toggle */}
        {data?.image && (
          <div className="flex flex-col gap-1 text-sm">
            <p>Remove Background</p>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={removeBackground}
                onChange={() =>
                  setRemoveBackground(prev => !prev)
                }
              />

              {/* Background */}
              <div className="w-10 h-5 bg-slate-300 rounded-full transition peer-checked:bg-green-600"></div>

              {/* Dot */}
              <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-5"></span>
            </label>
          </div>
        )}
      </div>

      {/* Inputs */}
      {fields.map((field) => {
        const Icon = field.icon;

        return (
          <div key={field.key} className="space-y-1 mt-5">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <Icon className="size-4 shrink-0" />
              {field.label}
              {field.required && (
                <span className="text-red-500">*</span>
              )}
            </label>

            <input
              type={field.type}
              value={data?.[field.key] || ""}
              onChange={(e) =>
                handleChange(field.key, e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              placeholder={`Enter your ${field.label.toLowerCase()}`}
              required={field.required}
            />
          </div>
        );
      })}
    </div>
  )
}

export default PersonalInfoForm