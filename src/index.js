import express from "express";
import jobRoutes from "./routes/jobRoutes.js";
import { connectDB } from "./config/db";
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/jobs", jobRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
