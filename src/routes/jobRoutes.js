import express from "express";
const router = express.Router();

router.get("/all-job-posts", (req, resp) => {
  resp.send("all job posts");
});

export default router;
