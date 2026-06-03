import fs from "fs";
// import imagekit from "./imageKit.js";
import { getImageKit } from "./imageKit.js";


export const uploadToImageKit = async (file, removeBackground = false) => {
  const imagekit = getImageKit();
  try {
    const response = await imagekit.upload({
      file: fs.readFileSync(file.path), // buffer
      fileName: file.filename,
      folder: "user-resume",
      transformation: {
        pre: `w-300,h-300,fo-face,z-0.75${removeBackground ? ",e-bg-remove" : ""}`
      }
    });

    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    return response.url;

  } catch (error) {
    fs.unlinkSync(file.path);
    throw error;
  }
};