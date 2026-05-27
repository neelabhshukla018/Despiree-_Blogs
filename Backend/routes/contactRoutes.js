import express from "express";

import upload from "../middleware/upload.js";

import Contact from "../models/contactModel.js";

const router = express.Router();


// CREATE CONTACT MESSAGE

router.post(

  "/contact",

  upload.single("file"),

  async (req, res) => {

    try {

      const {
        name,
        email,
        subject,
        message,
      } = req.body;

      const newContact = new Contact({

        name,

        email,

        subject,

        message,

        file: req.file?.path || "",

      });

      await newContact.save();

      res.status(200).json({

        success: true,

        message: "Message Sent Successfully",

        contact: newContact,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message: "Server Error",

      });

    }

  }

);


// GET ALL CONTACTS (ADMIN)

router.get(

  "/contacts",

  async (req, res) => {

    try {

      const contacts = await Contact.find()

        .sort({ createdAt: -1 });

      res.status(200).json({

        success: true,

        contacts,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message: "Server Error",

      });

    }

  }

);


// DELETE CONTACT

router.delete(

  "/contact/:id",

  async (req, res) => {

    try {

      await Contact.findByIdAndDelete(

        req.params.id
      );

      res.status(200).json({

        success: true,

        message: "Message Deleted",

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message: "Server Error",

      });

    }

  }

);

export default router;