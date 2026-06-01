// ========================================
// Backend/controllers/blogController.js
// ========================================

import Blog from "../models/blog.js";



import Follow from "../models/Follow.js";

import Notification from "../models/Notification.js";



export const createBlog = async (req, res) => {
  try {
    const {
      title,
      description,
      content,
      category,
      authorId,
      authorName,
      authorEmail,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image not found",
      });
    }

    const blog = await Blog.create({
      title,
      description,
      content,
      category,

      // CloudinaryStorage already uploaded image
      image: req.file.path,

      authorId,
      authorName,
      authorEmail,
      published: true,
    });

    // Return response immediately
    res.status(201).json({
      success: true,
      message: "Blog Published Successfully 🚀",
      blog,
    });

    // Background notifications
    try {
      const followers = await Follow.find({
        followingId: authorId,
      });

      if (followers.length > 0) {
        const notifications = followers.map(
          (follower) => ({
            userId: follower.followerId,
            message: `${authorName} dropped a new blog:\n"${title}" 🚀`,
            blogId: blog._id,
          })
        );

        await Notification.insertMany(
          notifications
        );
      }
    } catch (err) {
      console.log(
        "Notification Error:",
        err
      );
    }

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// GET ALL BLOGS
// ========================================

export const getBlogs = async (req, res) => {

  try {

    const blogs =
      await Blog.find().sort({

        createdAt: -1,

      });

    res.status(200).json({

      success: true,

      blogs,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message:
        error.message,

    });

  }

};

// ========================================
// GET SINGLE BLOG
// ========================================

export const getSingleBlog = async (req, res) => {

  try {

    const blog =
      await Blog.findById(
        req.params.id
      );

    if (!blog) {

      return res.status(404).json({

        success: false,

        message:
          "Blog not found",

      });

    }

    res.status(200).json({

      success: true,

      blog,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message:
        error.message,

    });

  }

};

// ========================================
// GET MY BLOGS
// ========================================

export const getMyBlogs = async (req, res) => {

  try {

    const { email } =
      req.query;

    const blogs =
      await Blog.find({

        authorEmail:
          email,

      }).sort({

        createdAt: -1,

      });

    res.status(200).json({

      success: true,

      blogs,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message:
        error.message,

    });

  }

};

// ========================================
// DELETE BLOG
// ========================================

export const deleteBlog = async (req, res) => {

  try {

    await Blog.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({

      success: true,

      message:
        "Blog Deleted Successfully",

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message:
        error.message,

    });

  }

};

// ========================================
// UPDATE BLOG
// ========================================

export const updateBlog = async (req, res) => {

  try {

    const {
      title,
      description,
      content,
      category,
    } = req.body;

    const existingBlog =
      await Blog.findById(
        req.params.id
      );

    if (!existingBlog) {

      return res.status(404).json({

        success: false,

        message:
          "Blog not found",

      });

    }

    let imageUrl =
      existingBlog.image;

if (req.file) {
  imageUrl = req.file.path;
}

    const updatedBlog =
      await Blog.findByIdAndUpdate(

        req.params.id,

        {

          title,

          description,

          content,

          category,

          image:
            imageUrl,

        },

        {

          new: true,

        }

      );

    res.status(200).json({

      success: true,

      message:
        "Blog Updated Successfully",

      updatedBlog,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message:
        error.message,

    });

  }

};

// ========================================
// LIKE BLOG
// ========================================

export const likeBlog = async (req, res) => {

  try {

    const {
      userId,
      userName,
    } = req.body;

    const blog =
      await Blog.findById(
        req.params.id
      );

    if (!blog) {

      return res.status(404).json({

        success: false,

        message:
          "Blog not found",

      });

    }

    if (
      blog.likedBy.includes(
        userId
      )
    ) {

      blog.likes -= 1;

      blog.likedBy =
        blog.likedBy.filter(
          (id) =>
            id !== userId
        );

    } else {

      blog.likes += 1;

      blog.likedBy.push(
        userId
      );

      if (
        blog.dislikedBy.includes(
          userId
        )
      ) {

        blog.dislikes -= 1;

        blog.dislikedBy =
          blog.dislikedBy.filter(
            (id) =>
              id !== userId
          );

      }

    }

    await blog.save();

    // FAST RESPONSE
    res.status(200).json({

      success: true,

      likes:
        blog.likes,

      dislikes:
        blog.dislikes,

      likedBy:
        blog.likedBy,

      dislikedBy:
        blog.dislikedBy,

    });

    // BACKGROUND EMAIL + NOTIFICATION
    if (
      userId !==
      blog.authorId
    ) {

      await Notification.create({

        userId:
          blog.authorId,

        message:
`${userName} liked your blog:
"${blog.title}" ❤️`,

        blogId:
          blog._id,

      });



  
    }

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message:
        error.message,

    });

  }

};

// ========================================
// DISLIKE BLOG
// ========================================

export const dislikeBlog = async (req, res) => {

  try {

    const {
      userId,
      userName,
    } = req.body;

    const blog =
      await Blog.findById(
        req.params.id
      );

    if (!blog) {

      return res.status(404).json({

        success: false,

        message:
          "Blog not found",

      });

    }

    if (
      blog.dislikedBy.includes(
        userId
      )
    ) {

      blog.dislikes -= 1;

      blog.dislikedBy =
        blog.dislikedBy.filter(
          (id) =>
            id !== userId
        );

    } else {

      blog.dislikes += 1;

      blog.dislikedBy.push(
        userId
      );

      if (
        blog.likedBy.includes(
          userId
        )
      ) {

        blog.likes -= 1;

        blog.likedBy =
          blog.likedBy.filter(
            (id) =>
              id !== userId
          );

      }

    }

    await blog.save();

    // FAST RESPONSE
    res.status(200).json({

      success: true,

      likes:
        blog.likes,

      dislikes:
        blog.dislikes,

      likedBy:
        blog.likedBy,

      dislikedBy:
        blog.dislikedBy,

    });

    // BACKGROUND EMAIL + NOTIFICATION
    
    if (
      userId !==
      blog.authorId
    ) {

      await Notification.create({

        userId:
          blog.authorId,

        message:
`${userName} disliked your blog:
"${blog.title}" 👎`,

        blogId:
          blog._id,

      });

     

    }

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message:
        error.message,

    });

  }

};

// ========================================
// ADD COMMENT
// ========================================

export const addComment = async (req, res) => {

  try {

    const {
      user,
      text,
      userId,
      userName,
    } = req.body;

    const blog =
      await Blog.findById(
        req.params.id
      );

    if (!blog) {

      return res.status(404).json({

        success: false,

        message:
          "Blog not found",

      });

    }

    blog.comments.push({

      user,

      text,

    });

    await blog.save();

    res.status(200).json({

      success: true,

      comments:
        blog.comments,

    });

    if (
      userId !==
      blog.authorId
    ) {

      await Notification.create({

        userId:
          blog.authorId,

        message:
`${userName} commented:
"${text}"

on your blog:
"${blog.title}" 💬`,

        blogId:
          blog._id,

      });

   

    }

  } catch (error) {

    res.status(500).json({

      success: false,

      message:
        error.message,

    });

  }

};