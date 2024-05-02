import express from "express";
import authRoutes from "./routes/auth-routers.js";
import dotenv from "dotenv";
import connectionDB from "./db/connectionDB.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

console.log(process.env.MONGO_URI);

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Server is ready");
});

// const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectionDB()
});
