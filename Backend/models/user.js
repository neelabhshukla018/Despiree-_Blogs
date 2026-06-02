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
});

export default mongoose.model(
  "User",
  userSchema
);