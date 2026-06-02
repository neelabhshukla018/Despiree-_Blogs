import express from "express";
import User from "../models/user.js";

const router = express.Router();

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

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
    });

  }
});

export default router;