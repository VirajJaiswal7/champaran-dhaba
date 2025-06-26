import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  cloud_name: process.env.CLOUD_NAME,
});

export const uploadMedia = async (path) => {
  try {
    const response = await cloudinary.uploader.upload(path, {
      resource_type: "auto",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteImage = async (pathUrl) => {
  try {
    await cloudinary.uploader.destroy(pathUrl);
  } catch (error) {
    console.log(error);
  }
};

export const deleteVideo = async (pathUrl) => {
  try {
    await cloudinary.uploader.destroy(pathUrl, { resource_type: "video" });
  } catch (error) {
    console.log(error);
  }
};
