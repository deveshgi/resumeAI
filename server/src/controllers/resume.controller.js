import { handler } from "../utils/handler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Resume } from "../models/resume.model.js";
import mongoose from "mongoose";
import { uploadToImageKit } from "../config/uploadToImageKit.js";


export const getUserResumes = handler(async (req, res) => {
  const userId = req.user?._id;
  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  // const resumes = await Resume.find({ userId })
  //   .sort({ createdAt: -1 });
  const [resumes, totalResumes] = await Promise.all([
    Resume.find({ userId }).sort({ createdAt: -1 }),
    Resume.countDocuments({ userId })
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        totalResumes,
        resumes
      },
      "User resumes fetched successfully"
    )
  );
});

export const getResumeById = handler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?._id;

  if (!id) throw new ApiError(400, "Resume ID required");

  const resume = await Resume.findOne({
    _id: id,
    userId
  });
  if (!resume) {
    throw new ApiError(404, "Resume not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      { resume },
      "Resume fetched successfully"
    )
  );
});

export const createResume = handler(async (req, res) => {
  const userId = req.user?._id;
  // const { title } = req.body;

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  const resume = await Resume.create({
    userId,
    ...req.body
  });

  return res.status(201).json(
    new ApiResponse(
      201,
      { resume },
      "Resume created successfully"
    )
  );
});

export const updateResume = handler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?._id;

  if (!id) {
    throw new ApiError(400, "Resume ID required");
  }

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  let updateData = {};

  // ✅ handle JSON + form-data
  if (req.body.resumeData) {
    updateData = JSON.parse(req.body.resumeData);
  } else {
    updateData = req.body;
  }

  // ✅ handle image upload
  if (req.file) {
    const imageUrl = await uploadToImageKit(
      req.file,
      req.body.removeBackground === "true"
    );

    // 👇 adjust based on your schema
    updateData.personal_info = {
      ...(updateData.personal_info || {}),
      image: imageUrl
    };
  }

  const updatedResume = await Resume.findOneAndUpdate(
    { _id: id, userId },
    { $set: updateData },
    { returnDocument: "after", runValidators: true, lean: true }
  );

  if (!updatedResume) {
    throw new ApiError(404, "Resume not found or unauthorized");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      { resume: updatedResume },
      "Resume updated successfully"
    )
  );
});

export const deleteResume = handler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?._id;

  if (!id) {
    throw new ApiError(400, "Resume ID required");
  }

  const resume = await Resume.findOneAndDelete({
    _id: id,
    userId
  });

  if (!resume) {
    throw new ApiError(404, "Resume not found or unauthorized");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {},
      "Resume deleted successfully"
    )
  );
});

export const getPublicResumeById = handler(async (req, res) => {
  const { resumeId } = req.params;

  // validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(resumeId)) {
    throw new ApiError(400, "Invalid resume ID");
  }

  const resume = await Resume.findOne({
    _id: resumeId,
    public: true
  });

  if (!resume) {
    throw new ApiError(404, "Resume not found or not public");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      { resume },
      "Public resume fetched successfully"
    )
  );
});