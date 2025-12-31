import express from "express";
const router = express.Router();

router.get("/all-posts", (req, resp) => {
  resp.send("all posts");
});
