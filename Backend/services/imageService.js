import axios from "axios";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

export const generateCoverImage = async (
  prompt
) => {
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.com/models/black-forest-labs/FLUX.1-schnell",
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
      }
    );

    const buffer = Buffer.from(
      response.data
    );

    return await new Promise(
      (resolve, reject) => {
        const uploadStream =
          cloudinary.uploader.upload_stream(
            {
              folder:
                "despire-ai-covers",
            },
            (error, result) => {
              if (error)
                return reject(error);

              resolve(
                result.secure_url
              );
            }
          );

        streamifier
          .createReadStream(buffer)
          .pipe(uploadStream);
      }
    );
  } catch (error) {
    console.error(
      "HF ERROR:",
      error?.response?.data ||
        error.message ||
        error
    );

    throw new Error(
      error?.response?.data?.error ||
        error.message ||
        "Failed to generate AI cover."
    );
  }
};