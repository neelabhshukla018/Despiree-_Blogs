
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(

  {


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


    likes: {

      type: Number,

      default: 0,

    },

    likedBy: [

      {

        type: String,

      },

    ],


    dislikes: {

      type: Number,

      default: 0,

    },

    dislikedBy: [

      {

        type: String,

      },

    ],


comments: [
  {
    user: {
      type: String,
    },

    userId: {
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