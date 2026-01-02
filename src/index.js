import express from "express";
import cors from "cors";
import jobRoutes from "./routes/jobRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true, // allow cookies to be sent
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/jobs", jobRoutes);
app.use("/auth", authRoutes);
app.use("/company", companyRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
