import axios from "axios";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

export const generateCoverImage = async (prompt) => {
  try {
    const seed = Math.floor(Math.random() * 2147483647);

    const imageUrl =
      `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}` +
      `?model=flux` +
      `&width=1280` +
      `&height=720` +
      `&seed=${seed}`;

    console.log("Generating image...");
    console.log(imageUrl);

    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer",
      timeout: 180000,
      headers: {
        Accept: "image/*",
      },
      validateStatus: () => true,
    });

    if (response.status !== 200) {
      const errorText = Buffer.from(response.data).toString("utf8");
      throw new Error(errorText);
    }

    const contentType = response.headers["content-type"];

    if (!contentType || !contentType.startsWith("image/")) {
      const errorText = Buffer.from(response.data).toString("utf8");
      throw new Error(errorText);
    }

    const buffer = Buffer.from(response.data);

    const cloudinaryUrl = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "despire-ai-covers",
          resource_type: "image",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result.secure_url);
        }
      );

      streamifier.createReadStream(buffer).pipe(uploadStream);
    });

    return cloudinaryUrl;
  } catch (error) {
    console.log("========== POLLINATIONS ERROR ==========");

    if (error.response?.data) {
      try {
        console.log(Buffer.from(error.response.data).toString("utf8"));
      } catch {
        console.log(error.response.data);
      }
    }

    console.log(error.message);
    console.log("========================================");

    throw error;
  }
};