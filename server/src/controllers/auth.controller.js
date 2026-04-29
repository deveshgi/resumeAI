import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { handler } from "../utils/handler.js";
import { generateTokens } from "../services/token.service.js";


export const refreshAccessToken = handler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies?.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Refresh token missing");
  }

  const decoded = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const user = await User.findById(decoded._id);

  if (!user || user.refreshToken !== incomingRefreshToken) {
    throw new ApiError(401, "Invalid refresh token");
  }

  const { accessToken, refreshToken } =
    await generateTokens(user._id);

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV || false,
    sameSite: "lax",
    path: "/"
  };

  return res
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, {}, "Token refreshed"));
});

export const registerUser = handler(async (req, res) => {
  const { name, email, password } = req.body;

  const existed = await User.findOne({ email });
  if (existed) throw new ApiError(400, "User already exists");

  const user = (await User.create({ name, email, password }));

  const { accessToken, refreshToken } = await generateTokens(user._id);

  const options = {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/"
  };

  return res.status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        201,
        { user },
        "User registered & logged in"
      )
    );
});

export const loginUser = handler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User not found");

  const isMatch = await user.isPasswordCorrect(password);
  if (!isMatch) throw new ApiError(401, "Invalid password");

  const { accessToken, refreshToken } = await generateTokens(user._id);

  const options = {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/"
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user },
        "Login successful"
      )
    );
});

export const logoutUser = handler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {
    refreshToken: null,
  });

  return res
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json(new ApiResponse(200, {}, "Logged out"));
});
