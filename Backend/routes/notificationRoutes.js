import express from "express";

import Notification from "../models/Notification.js";

const router =
  express.Router();


router.get(
  "/:userId",

  async (req, res) => {

    try {

      const notifications =
        await Notification.find({

          userId:
            req.params.userId,

        }).sort({

          createdAt: -1,

        });

      res.json(
        notifications
      );

    } catch (error) {

      res.status(500).json({

        message:
          error.message,

      });

    }
  }
);


router.put(
  "/read/:userId",

  async (req, res) => {

    try {

      await Notification.updateMany(

        {

          userId:
            req.params.userId,

        },

        {

          $set: {

            read: true,

          },

        }

      );

      const notifications =
        await Notification.find({

          userId:
            req.params.userId,

        }).sort({

          createdAt: -1,

        });

      res.json({

        success: true,

        notifications,

      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message,

      });

    }
  }
);

export default router;