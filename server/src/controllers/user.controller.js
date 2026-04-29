import { handler } from "../utils/handler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {User} from "../models/user.model.js";


export const getUserById = handler(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new ApiError(400, "User ID is required");

  const user = await User.findById(id).select("-password -refreshToken");
  if (!user) throw new ApiError(404, "User not found");

  return res.status(200).json(
    new ApiResponse(
      200,
      { user },
      "User fetched successfully"
    )
  );

})

export const getCurrentUser = handler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User fetched successfully"));
});
// export const getCurrentUser = handler(async (req, res) => {
//   const user = req.user;

//   if (!user) {
//     throw new ApiError(401, "Unauthorized");
//   }

//   return res.status(200).json(
//     new ApiResponse(
//       200,
//       { user },
//       "Current user fetched successfully"
//     )
//   );
// });