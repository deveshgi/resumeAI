import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true, }))
app.use(express.static("public"))
app.use(cookieParser())


import healthRouters from "./routes/health.route.js"
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js"
import resumeRoutes from "./routes/resume.route.js"
import aiRoutes from "./routes/ai.route.js"



app.use("/api/v1/health", healthRouters);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/resume", resumeRoutes);
app.use("/api/v1/ai", aiRoutes);




import { errorHandler } from "./middlewares/error.middleware.js"

app.use(errorHandler);

export { app }