import { prisma } from "../config/db.js";

const getAllJobPosts = async (req, res) => {
  try {
    const offset = parseInt(req.query.offset) || 0; // Can be any number: 0, 10, 25, 100...
    const limit = parseInt(req.query.limit) || 10;

    const [allJobPosts, totalCount] = await Promise.all([
      prisma.jobPost.findMany({
        skip: offset, // Direct offset (any number)
        take: limit,
        orderBy: {
          createdAt: "desc", // Required for stable pagination
        },
      }),
      prisma.jobPost.count(),
    ]);

    return res.status(200).json({
      status: "success",
      message: "Data fetched successfully",
      pagination: {
        offset,
        limit,
        total: totalCount,
        hasMore: offset + limit < totalCount,
      },
      data: allJobPosts,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch job posts",
      error: error.message,
    });
  }
};

const createJobPosts = async (req, res) => {
  try {
    // Pick only the fields we want
    const {
      job_role,
      job_type,
      job_description,
      company,
      salary,
      location,
      category,
      key_responsibities,
      professional_skills,
      tags,
      education,
      experience,
      created_by,
      updated_by,
    } = req.body;

    if (!job_role || !job_type || !job_description || !company || !category) {
      return res.status(400).json({
        status: "error",
        message: "Missing required fields",
      });
    }

    // Create the job post
    const jobPost = await prisma.jobPost.create({
      data: {
        job_role,
        job_type,
        job_description,
        company,
        salary: salary || null, // optional
        location: location || null, // optional
        category,
        key_responsibities,
        professional_skills,
        tags: tags || [], // default to empty array
        education,
        experience,
        created_by,
        updated_by,
      },
    });

    return res.status(201).json({
      status: "success",
      message: "Job post created successfully",
      data: jobPost,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to create job post",
      error: error.message,
    });
  }
};

const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const jobPost = await prisma.jobPost.findUnique({ where: { id: id } });
    if (!jobPost) {
      return res.status(404).json({
        status: "error",
        message: "Job Not Found",
        data: {},
      });
    }
    return res.status(200).json({
      status: "success",
      message: "data fetched successfully",
      data: jobPost,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to create job post",
      error: error.message,
    });
  }
};

// PUT /api/jobposts/:id
const updateJobPost = async (req, res) => {
  const { id } = req.params;
  const {
    job_role,
    job_type,
    job_description,
    company,
    salary,
    location,
    category,
    key_responsibilities,
    professional_skills,
    tags,
    education,
    experience,
    updated_by,
  } = req.body;

  try {
    const existingPost = await prisma.jobPost.findUnique({ where: { id } });
    if (!existingPost) {
      return res
        .status(404)
        .json({ status: "error", message: "Job not found" });
    }

    const updatedPost = await prisma.jobPost.update({
      where: { id },
      data: {
        job_role,
        job_type,
        job_description,
        company,
        salary,
        location,
        category,
        key_responsibities:
          key_responsibilities || existingPost.key_responsibities, // Map + fallback
        professional_skills,
        tags,
        education,
        experience,
        updated_by: updated_by || req.user?.id, // Auth fallback
        // Remove updated_at - @updatedAt handles automatically
      },
    });

    res.json({
      status: "success",
      message: "Job post updated",
      data: updatedPost,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to update job post",
      error: error.message,
    });
  }
};

const deleteJobPost = async (req, res) => {
  const { id } = req.params;

  try {
    const existingPost = await prisma.jobPost.findUnique({ where: { id } });
    if (!existingPost) {
      return res
        .status(404)
        .json({ status: "error", message: "Job not found" });
    }

    await prisma.jobPost.delete({
      where: { id },
    });

    return res.json({
      status: "success",
      message: "Job post deleted successfully",
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to delete job post",
      error: error.message,
    });
  }
};
export {
  createJobPosts,
  getAllJobPosts,
  getJobById,
  updateJobPost,
  deleteJobPost,
};
