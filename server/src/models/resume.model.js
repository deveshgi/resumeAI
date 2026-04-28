import mongoose, { Schema } from "mongoose";

const resumeShema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  title: { type: String, default: 'Untitled Resume' },
  public: { type: Boolean, default: false },
  template: { type: String, default: "classic" },
  summary: { type: String, default: '' },
  accent_color: { type: String, default: '#3B82F6' },
  skills: [{ type: String }],
  personal_info: {
    image: { type: String, default: '' },
    full_name: { type: String, default: '' },
    profession: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    location: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    website: { type: String, default: '' },
  },
  experience: [
    {
      company: { type: String },
      position: { type: String },
      start_date: { type: String },
      end_date: { type: String },
      description: { type: String },
      is_current: { type: Boolean },
    }
  ],
  project: [
    {
      name: { type: String },
      type: { type: String },
      description: { type: String },
    }
  ],
  education: [
    {
      institution : { type: String },
      degree: { type: String },
      field: { type: String },
      graduation_date: { type: String },
      gpa: { type: String },
    }
  ],
},{timestamps: true, minimize:false})

export const Resume = mongoose.model("Resume", resumeShema)