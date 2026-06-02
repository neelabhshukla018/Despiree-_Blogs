import express from "express";
import User from "../models/user.js";

const router = express.Router();

// ============================
// SYNC USER
// ============================

router.post("/sync", async (req, res) => {
  try {

    const {
      clerkId,
      name,
      email,
    } = req.body;

    let user =
      await User.findOne({
        clerkId,
      });

    if (!user) {

      user =
        await User.create({
          clerkId,
          name,
          email,
        });

    }

    return res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
    });

  }
});

// ============================
// GET USER DATA
// ============================

router.get("/:clerkId", async (req, res) => {
  try {

    const user =
      await User.findOne({
        clerkId:
          req.params.clerkId,
      });

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    }

    return res.status(200).json(user);

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
    });

  }
});

export default router;