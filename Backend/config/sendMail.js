// ========================================
// Backend/config/sendMail.js
// ========================================

import nodemailer from "nodemailer";

// ========================================
// CREATE TRANSPORTER
// ========================================

const transporter =
  nodemailer.createTransport({

    service: "gmail",

    auth: {

      user:
        process.env.EMAIL_USER,

      pass:
        process.env.EMAIL_PASS,

    },

  });

// ========================================
// SEND MAIL FUNCTION
// ========================================

const sendMail = async (
  to,
  subject,
  text
) => {

  try {

    await transporter.sendMail({

      from:
        process.env.EMAIL_USER,

      to,

      subject,

      text,

    });

    console.log(
      "Email Sent Successfully ✅"
    );

  } catch (error) {

    console.log(
      "MAIL ERROR:",
      error
    );

  }

};

export default sendMail;