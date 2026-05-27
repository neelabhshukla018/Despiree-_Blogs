import express from "express";

import Follow from "../models/Follow.js";

const router = express.Router();

// ======================================
// FOLLOW USER
// ======================================

router.post(
  "/follow",
  async (req, res) => {

    try {

      const {
        followerId,
        followingId,
      } = req.body;

      // PREVENT SELF FOLLOW
      if (
        followerId ===
        followingId
      ) {

        return res
          .status(400)
          .json({
            message:
              "You cannot follow yourself",
          });

      }

      // CHECK EXISTING FOLLOW
      const existing =
        await Follow.findOne({
          followerId,
          followingId,
        });

      if (existing) {

        return res
          .status(400)
          .json({
            message:
              "Already Following",
          });

      }

      // CREATE FOLLOW
      const follow =
        await Follow.create({
          followerId,
          followingId,
        });

      res.status(201).json(
        follow
      );

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  }
);

// ======================================
// UNFOLLOW USER
// ======================================

router.post(
  "/unfollow",
  async (req, res) => {

    try {

      const {
        followerId,
        followingId,
      } = req.body;

      await Follow.findOneAndDelete(
        {
          followerId,
          followingId,
        }
      );

      res.json({
        message:
          "Unfollowed Successfully",
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  }
);

// ======================================
// CHECK FOLLOW STATUS
// ======================================

router.get(
  "/check/:followerId/:followingId",

  async (req, res) => {

    try {

      const follow =
        await Follow.findOne({
          followerId:
            req.params.followerId,

          followingId:
            req.params.followingId,
        });

      res.json({
        following: !!follow,
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  }
);

// ======================================
// GET FOLLOWERS COUNT
// ======================================

router.get(
  "/followers/:userId",

  async (req, res) => {

    try {

      // PEOPLE FOLLOWING THIS USER
      const count =
        await Follow.countDocuments({
          followingId:
            req.params.userId,
        });

      const followers =
        await Follow.find({
          followingId:
            req.params.userId,
        });

      res.json({
        count,
        followers,
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  }
);

// ======================================
// GET FOLLOWING COUNT
// ======================================

router.get(
  "/following/:userId",

  async (req, res) => {

    try {

      // PEOPLE THIS USER FOLLOWS
      const count =
        await Follow.countDocuments({
          followerId:
            req.params.userId,
        });

      const following =
        await Follow.find({
          followerId:
            req.params.userId,
        });

      res.json({
        count,
        following,
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  }
);

export default router;