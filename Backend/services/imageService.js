import axios from "axios";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

export const generateCoverImage = async (prompt) => {
  try {
    // Check API Key
    if (!process.env.HUGGINGFACE_API_KEY) {
      throw new Error(
        "HUGGINGFACE_API_KEY is missing. Please add it to your Render Environment Variables."
      );
    }

    // Generate image using Hugging Face
    const response = await axios.post(
      "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-schnell",
      {
        inputs: prompt,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
          Accept: "image/png",
        },
        responseType: "arraybuffer",
        timeout: 120000,
      }
    );

    // Convert response to Buffer
    const buffer = Buffer.from(response.data);

    // Ensure an image was returned
    const contentType = response.headers["content-type"];

    if (!contentType || !contentType.startsWith("image/")) {
      throw new Error(
        `Expected an image but received '${contentType}'.`
      );
    }

    // Upload image to Cloudinary
    const imageUrl = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "despire-ai-covers",
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }

          resolve(result.secure_url);
        }
      );

      streamifier.createReadStream(buffer).pipe(uploadStream);
    });

    return imageUrl;
  } catch (error) {
    let errorMessage = error.message;

    if (error.response?.data) {
      try {
        // Decode Buffer into readable JSON/string
        errorMessage = Buffer.from(error.response.data).toString("utf8");
      } catch {
        errorMessage = error.response.data.toString();
      }
    }

    console.error("========== HUGGING FACE ERROR ==========");
    console.error(errorMessage);
    console.error("========================================");

    throw new Error(errorMessage);
  }
};