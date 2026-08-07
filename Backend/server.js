import express from "express";

import cors from "cors";

import dotenv from "dotenv";

import connectDB from "./config/db.js";

import blogRoutes from "./routes/blogRoutes.js";

import aiRoutes from "./routes/aiRoutes.js";

import followRoutes from "./routes/followRoutes.js";

import notificationRoutes from "./routes/notificationRoutes.js";

import contactRoutes from "./routes/contactRoutes.js";

import paymentRoutes from "./routes/paymentRoutes.js";

import userRoutes from "./routes/userRoutes.js";


dotenv.config();

const app = express();


app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://despire-blogsmt.netlify.app"
  ],
  credentials: true
}))


app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  "/api/blogs",
  blogRoutes
);

app.use(
  "/api/user",
  userRoutes
);


app.use(
  "/api/ai",
  aiRoutes
);

app.use(
  "/api/follow",
  followRoutes
);


app.use(
  "/api/notifications",
  notificationRoutes
);


app.use(
  "/api",
  contactRoutes
);


app.use(
  "/api/payment",
  paymentRoutes
);


app.get("/", (req, res) => {

  res.send(
    "Backend Running..."
  );

});


app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Despire Backend is Alive 🚀",
    timestamp: new Date()
  });
});




const PORT =
  process.env.PORT || 5000;


const startServer =
  async () => {

    try {

      // CONNECT DATABASE
      await connectDB();

      app.listen(PORT, () => {

        console.log(
          `Server running on ${PORT}`
        );

      });

    } catch (error) {

      console.log(
        "Server Error:",
        error
      );

    }

  };

startServer();