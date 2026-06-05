import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },

  name: String,

  email: String,

  isPro: {
    type: Boolean,
    default: false,
  },

  freeBlogsUsed: {
    type: Number,
    default: 0,
  },

  // ⭐ NEW
  freeImagesUsed: {
    type: Number,
    default: 0,
  },


  savedBlogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],

});

export default mongoose.model(
  "User",
  userSchema
);