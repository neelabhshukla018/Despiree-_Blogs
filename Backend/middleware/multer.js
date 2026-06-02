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
    fileSize: 2 * 1024 * 1024,
  },

fileFilter: (req, file, cb) => {
  const allowedTypes = [
    "image/",
    "video/",
    "audio/",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const allowed = allowedTypes.some(type =>
    file.mimetype.startsWith(type)
  );

  if (allowed) {
    cb(null, true);
  } else {
    cb(new Error("File type not supported"), false);
  }
},
});

export default upload;