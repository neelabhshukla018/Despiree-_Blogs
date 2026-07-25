import axios from "axios";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

export const generateCoverImage = async (prompt) => {
  try {
    if (!process.env.POLLINATIONS_API_KEY) {
      throw new Error("POLLINATIONS_API_KEY is missing.");
    }

    const imageUrl =
      `https://gen.pollinations.ai/image/${encodeURIComponent(prompt)}` +
      `?model=flux` +
      `&width=1280` +
      `&height=720` +
      `&seed=${Date.now()}` +
      `&nologo=true` +
      `&key=${process.env.POLLINATIONS_API_KEY}`;

    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer",
      timeout: 180000,
      headers: {
        Accept: "image/png,image/jpeg,image/*",
      },
    });

    const contentType = response.headers["content-type"];

    if (!contentType?.startsWith("image/")) {
      const errorText = Buffer.from(response.data).toString("utf8");
      throw new Error(errorText);
    }

    const buffer = Buffer.from(response.data);

    const imageUrlCloudinary = await new Promise((resolve, reject) => {
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

    return imageUrlCloudinary;
  } catch (error) {
    console.error("========== POLLINATIONS ERROR ==========");

    if (error.response?.data) {
      try {
        console.error(Buffer.from(error.response.data).toString("utf8"));
      } catch {
        console.error(error.response.data);
      }
    } else {
      console.error(error.message);
    }

    console.error("========================================");

    throw error;
  }
};