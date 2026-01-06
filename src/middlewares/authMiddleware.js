import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "Not authenticated",
      });
    }

    // Verify token (SYNC)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from DB
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        user_name: true,
        email: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "User not found",
      });
    }

    // Attach user to request
    req.user = user;

    next(); // ✅ allow request
  } catch (error) {
    return res.status(401).json({
      status: "error",
      message: "Invalid or expired token",
    });
  }
};

export default authMiddleware;
