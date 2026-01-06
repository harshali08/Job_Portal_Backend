import express from "express";
import {
  fetchUser,
  login,
  logout,
  register,
} from "../controllers/authControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", authMiddleware, fetchUser);

export default router;
