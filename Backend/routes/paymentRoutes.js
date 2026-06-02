import express from "express";

import {
  createOrder,
  paymentSuccess,
} from "../controllers/paymentController.js";

const router = express.Router();

router.post(
  "/create-order",
  createOrder
);

router.post(
  "/success",
  paymentSuccess
);

export default router;