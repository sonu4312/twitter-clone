import express from "express";
import dotenv from "dotenv";
import connectionDB from "./db/connectionDB.js";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

import authRoutes from "./routes/auth-routers.js";
import userRoutes from "./routes/user-routers.js";
import postRoutes from "./routes/post-routers.js"

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); //it will parse req.body
app.use(express.urlencoded({ extended: true })); //to parse form data(ur;encoded)

app.use(cookieParser()); //to parse cookies

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts",postRoutes)

app.get("/", (req, res) => {
  res.send("Server is ready");
});

// const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectionDB();
});
