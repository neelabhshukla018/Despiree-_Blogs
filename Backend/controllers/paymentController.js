import Razorpay from "razorpay";
import crypto from "crypto";

import User from "../models/user.js";
import Payment from "../models/Payment.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


export const createOrder = async (
  req,
  res
) => {
  try {
    const options = {
      amount: 4900, // ₹49
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order =
      await razorpay.orders.create(
        options
      );

res.status(200).json({
  order,
});
  } catch (error) {
    console.log(
      "Create Order Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to create order",
    });
  }
};


export const paymentSuccess = async (
  req,
  res
) => {
  try {
    const {
      userId,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    } = req.body;

    const generatedSignature =
      crypto
        .createHmac(
          "sha256",
          process.env.RAZORPAY_KEY_SECRET
        )
        .update(
          `${razorpay_order_id}|${razorpay_payment_id}`
        )
        .digest("hex");

    if (
      generatedSignature !==
      razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid payment signature",
      });
    }

    await Payment.create({
      userId,
      paymentId:
        razorpay_payment_id,
      orderId:
        razorpay_order_id,
      signature:
        razorpay_signature,
      amount: 49,
    });

    await User.findOneAndUpdate(
      {
        clerkId: userId,
      },
      {
        isPro: true,
      }
    );

    return res.status(200).json({
      success: true,
      message:
        "DeSpire Pro Activated",
    });
  } catch (error) {
    console.log(
      "Payment Verification Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Payment verification failed",
    });
  }
};