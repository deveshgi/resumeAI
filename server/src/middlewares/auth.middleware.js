import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { handler } from "../utils/handler.js";

export const verifyJWT = handler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized");
    }
// console.log("Cookies:", req.cookies);
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    req.user = decoded;
    next();

  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(new ApiError(401, "jwt expired"));
    }
    return next(new ApiError(401, "Invalid token"));
  }
});

