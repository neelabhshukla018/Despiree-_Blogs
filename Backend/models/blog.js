// ========================================
// Backend/models/blog.js
// ========================================

import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(

  {

    // ========================================
    // BASIC BLOG INFO
    // ========================================

    title: {

      type: String,

      required: true,

    },

    description: {

      type: String,

      required: true,

    },

    content: {

      type: String,

      required: true,

    },

    image: {

      type: String,

      required: true,

    },

    category: {

      type: String,

      required: true,

    },

    published: {

      type: Boolean,

      default: true,

    },

    // ========================================
    // AUTHOR INFO
    // ========================================

    authorId: {

      type: String,

      required: true,

    },

    authorName: {

      type: String,

      required: true,

    },

    authorEmail: {

      type: String,

      required: true,

    },

    // ========================================
    // LIKES
    // ========================================

    likes: {

      type: Number,

      default: 0,

    },

    likedBy: [

      {

        type: String,

      },

    ],

    // ========================================
    // DISLIKES
    // ========================================

    dislikes: {

      type: Number,

      default: 0,

    },

    dislikedBy: [

      {

        type: String,

      },

    ],

    // ========================================
    // COMMENTS
    // ========================================

    comments: [

      {

        user: {

          type: String,

        },

        text: {

          type: String,

        },

        createdAt: {

          type: Date,

          default: Date.now,

        },

      },

    ],

  },

  {

    timestamps: true,

  }

);

const Blog = mongoose.model(

  "Blog",

  blogSchema

);

export default Blog;