import mongoose from "mongoose";

const paymentSchema =
  new mongoose.Schema(
    {
      userId: String,

      paymentId: String,

      orderId: String,

      signature: String,

      amount: Number,
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Payment",
  paymentSchema
);