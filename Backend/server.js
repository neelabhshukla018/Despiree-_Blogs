import express from "express";

import cors from "cors";

import dotenv from "dotenv";

import connectDB from "./config/db.js";

import blogRoutes from "./routes/blogRoutes.js";

import aiRoutes from "./routes/aiRoutes.js";

import followRoutes from "./routes/followRoutes.js";

import notificationRoutes from "./routes/notificationRoutes.js";

import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();


// ============================
// MIDDLEWARES
// ============================

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);


// ============================
// ROUTES
// ============================


// BLOG ROUTES
app.use(
  "/api/blogs",
  blogRoutes
);


// AI ROUTES
app.use(
  "/api/ai",
  aiRoutes
);


// FOLLOW ROUTES
app.use(
  "/api/follow",
  followRoutes
);


// NOTIFICATION ROUTES
app.use(
  "/api/notifications",
  notificationRoutes
);


// CONTACT ROUTES
app.use(
  "/api",
  contactRoutes
);


// ============================
// TEST ROUTE
// ============================

app.get("/", (req, res) => {

  res.send(
    "Backend Running..."
  );

});


// ============================
// PORT
// ============================

const PORT =
  process.env.PORT || 5000;


// ============================
// START SERVER
// ============================

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


// START
startServer();