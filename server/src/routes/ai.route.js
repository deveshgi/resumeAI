import { Router } from "express";
import { 
  enhanceSummary,
  enhanceJobDescription,
  uploadResume
 } from "../controllers/ai.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/enhance-summary", verifyJWT, enhanceSummary); 
router.post("/enhance-job-desc", verifyJWT, enhanceJobDescription) 
router.post("/upload", verifyJWT, uploadResume) 



export default router;