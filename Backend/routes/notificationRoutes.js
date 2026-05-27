import express from "express";

import Notification from "../models/Notification.js";

const router =
  express.Router();

// ============================
// GET NOTIFICATIONS
// ============================

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

// ============================
// MARK ALL AS READ
// ============================

router.put(
  "/read/:userId",

  async (req, res) => {

    try {

      // MARK READ
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

      // FETCH AGAIN
      const notifications =
        await Notification.find({

          userId:
            req.params.userId,

        }).sort({

          createdAt: -1,

        });

      // SEND UPDATED
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