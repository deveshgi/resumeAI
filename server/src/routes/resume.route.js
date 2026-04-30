import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getUserResumes,
  getResumeById,
  createResume,
  updateResume,
  deleteResume,
  getPublicResumeById
} from "../controllers/resume.controller.js";
import { upload } from "../middlewares/multer.middleware.js";


const router = Router();


router.post("/", verifyJWT, createResume);

router.get("/all", verifyJWT, getUserResumes);

router.get("/:id", verifyJWT, getResumeById);

router.patch(
  "/update/:id",
  verifyJWT,
  upload.single("image"),
  updateResume
);

router.delete("/delete/:id", verifyJWT, deleteResume);

router.get("/public/:resumeId", getPublicResumeById);

export default router;