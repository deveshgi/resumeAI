import { Router } from "express";
import { getCurrentUser, getUserById } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();


router.get("/me", verifyJWT, getCurrentUser);
router.get("/:id", verifyJWT, getUserById);


export default router;