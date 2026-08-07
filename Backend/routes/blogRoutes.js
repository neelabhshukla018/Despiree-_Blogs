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
  deleteComment,
} from "../controllers/blogController.js";

const router = express.Router();


router.post(
  "/create",
  upload.single("image"),
  createBlog
);

router.get("/", getBlogs);


router.get("/myblogs", getMyBlogs);


router.get("/:id", getSingleBlog);


router.delete("/:id", deleteBlog);


router.put(
  "/:id",
  upload.single("image"),
  updateBlog
);


router.put(
  "/:id/like",
  likeBlog
);


router.put(
  "/:id/dislike",
  dislikeBlog
);


router.post(
  "/:id/comment",
  addComment
);


router.delete(
  "/:blogId/comment/:commentId",
  deleteComment
);

export default router;