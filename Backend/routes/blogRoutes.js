import express from "express";

import upload from "../middleware/multer.js";

import {
  createBlog,
  getBlogs,
  getMyBlogs,
  deleteBlog,
  updateBlog,
  getSingleBlog,
  likeBlog,
  dislikeBlog,
  addComment,
} from "../controllers/blogController.js";

const router = express.Router();

// ============================
// CREATE BLOG
// ============================

router.post(
  "/create",
  upload.single("image"),
  createBlog
);

// ============================
// GET ALL BLOGS
// ============================

router.get("/", getBlogs);

// ============================
// GET MY BLOGS
// IMPORTANT: KEEP ABOVE :id
// ============================

router.get("/myblogs", getMyBlogs);

// ============================
// GET SINGLE BLOG
// ============================

router.get("/:id", getSingleBlog);

// ============================
// DELETE BLOG
// ============================

router.delete("/:id", deleteBlog);

// ============================
// UPDATE BLOG
// ============================

router.put(
  "/:id",
  upload.single("image"),
  updateBlog
);

// ============================
// LIKE BLOG
// ============================

router.put(
  "/:id/like",
  likeBlog
);

// ============================
// DISLIKE BLOG
// ============================

router.put(
  "/:id/dislike",
  dislikeBlog
);

// ============================
// COMMENT BLOG
// ============================

router.post(
  "/:id/comment",
  addComment
);

export default router;