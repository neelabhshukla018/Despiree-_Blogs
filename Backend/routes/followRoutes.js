import express from "express";

import Follow from "../models/Follow.js";

const router = express.Router();


router.post(
  "/follow",
  async (req, res) => {

    try {

      const {
        followerId,
        followingId,
      } = req.body;

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


router.get(
  "/followers/:userId",

  async (req, res) => {

    try {

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


router.get(
  "/following/:userId",

  async (req, res) => {

    try {

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