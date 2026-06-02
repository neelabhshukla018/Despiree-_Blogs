import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,

 params: async (req, file) => ({
  folder: "DevSpireUploads",
  resource_type: "auto",
}),
});

const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },

  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "audio/",
      "video/",
      "image/",
    ];

    const isAllowed = allowedTypes.some((type) =>
      file.mimetype.startsWith(type)
    );

    if (isAllowed) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only images, PDFs, videos, audio, and documents are allowed"
        ),
        false
      );
    }
  },
});

export default upload;