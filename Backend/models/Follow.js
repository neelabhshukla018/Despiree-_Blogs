import mongoose from "mongoose";

const followSchema =
  new mongoose.Schema(
    {
      followerId: {
        type: String,
        required: true,
      },

      followingId: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );

export default mongoose.model(
  "Follow",
  followSchema
);