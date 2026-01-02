import express from "express";
import {
  createJobPosts,
  deleteJobPost,
  getAllJobPosts,
  getJobById,
  updateJobPost,
} from "../controllers/jobsControllers.js";
const router = express.Router();

router.post("/create-jobs", createJobPosts);
router.get("/all-jobs", getAllJobPosts);
router.get("/get-job-details/:id", getJobById);
router.put("/update-post/:id", updateJobPost);
router.delete("/delete-post/:id", deleteJobPost);

export default router;
