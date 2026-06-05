import express from "express";

import {
  generateBlog,
  generateCover,
} from "../controllers/aiController.js";

const router = express.Router();

router.post(
  "/generate",
  generateBlog
);

router.post(
  "/generate-cover",
  generateCover
);

export default router;