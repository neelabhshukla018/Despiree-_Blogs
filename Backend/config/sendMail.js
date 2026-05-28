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
// VERIFY MAIL SERVER
// ========================================

transporter.verify(
  (error, success) => {

    if (error) {

      console.log(
        "MAIL VERIFY ERROR ❌"
      );

      console.log(error);

    } else {

      console.log(
        "MAIL SERVER READY ✅"
      );

    }

  }
);

// ========================================
// SEND MAIL FUNCTION
// ========================================

const sendMail = async (
  to,
  subject,
  text
) => {

  try {

    console.log(
      "SENDING EMAIL TO:",
      to
    );

    const info =
      await transporter.sendMail({

        from:
          process.env.EMAIL_USER,

        to,

        subject,

        text,

      });

    console.log(
      "EMAIL SENT SUCCESSFULLY ✅"
    );

    console.log(info.response);

    return {

      success: true,

    };

  } catch (error) {

    console.log(
      "MAIL ERROR ❌"
    );

    console.log(error);

    return {

      success: false,

      error:
        error.message,

    };

  }

};

export default sendMail;