import mongoose from "mongoose";

const notificationSchema =
  new mongoose.Schema(
    {
      userId: {
        type: String,
        required: true,
      },

      message: {
        type: String,
        required: true,
      },

      blogId: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "Blog",
      },

      read: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  );

export default mongoose.model(
  "Notification",
  notificationSchema
);