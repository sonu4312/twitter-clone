import express from "express";
import authRoutes from "./routes/auth-routers.js";
import dotenv from "dotenv";
import connectionDB from "./db/connectionDB.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); //it will parse req.body
app.use(express.urlencoded({ extended: true })); //to parse form data(ur;encoded)

app.use(cookieParser()); //to parse cookies

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Server is ready");
});

// const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectionDB();
});
