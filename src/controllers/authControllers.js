import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

const register = async (req, resp) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await prisma.user.findUnique({
      where: { email: email },
    });
    if (userExists) {
      return resp
        .status(400)
        .json({ status: "error", message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = await prisma.user.create({
      data: {
        user_name: name,
        email,
        password: hashedPassword,
      },
    });

    const token = await generateToken(userData.id, resp);

    return resp.status(201).json({
      status: "success",
      message: "User created successfully",
      data: { user: userData, token },
    });
  } catch (error) {
    return resp.status(500).json({
      status: "error",
      message: "Failed to create user",
      error: error.message,
    });
  }
};

const login = async (req, resp) => {
  const { email, password } = req.body;

  const userData = await prisma.user.findUnique({ where: { email } });
  if (!userData) {
    return resp
      .status(400)
      .json({ status: "error", message: "Invalid User or Password" });
  }

  const passwordValid = await bcrypt.compare(password, userData.password);
  if (!passwordValid) {
    return resp
      .status(400)
      .json({ status: "error", message: "Invalid User or Password" });
  }

  const token = await generateToken(userData.id, resp);
  return resp.status(200).json({
    status: "success",
    message: "Logged in Successfully",
    data: { user: userData, token },
  });
};

const logout = async (req, resp) => {
  resp.cookie("jwt", "", {
    httpOnly: true,
    expire: new Date(),
  });

  return resp.status(200).json({
    status: "success",
    message: "Logout Successfully",
  });
};

const fetchUser = async (req, res) => {
  return res.status(200).json({
    status: "success",
    data: { user: req.user },
  });
};

export { register, login, logout, fetchUser };
