import express from "express";
import dotenv from "dotenv";
import connectionDB from "./db/connectionDB.js";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth-route.js";
import userRoutes from "./routes/user-route.js";
import postRoutes from "./routes/post-route.js";
import notificationRoutes from "./routes/notification-route.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use(express.json({ limit: "5mb" })); //it will parse req.body
app.use(express.urlencoded({ extended: true })); //to parse form data(ur;encoded)

app.use(cookieParser()); //to parse cookies

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});
// app.get("/", (req, res) => {
//   res.send("Server is ready");
// });

// const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectionDB();
});
