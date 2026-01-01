import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

const register = async (req, resp) => {
  const { name, password, email, age } = req.body;
  const userExists = await prisma.user.findUnique({
    where: { email: email },
  });
  if (userExists) {
    return resp.status(400).json({
      status: "error",
      message: "User already exists",
      data: req.body,
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const userData = await prisma.user.create({
    data: {
      user_name: name,
      email: email,
      password: hashedPassword,
      age: age,
    },
  });

  const token = await generateToken(userData.id, resp);

  console.log(token, "token");

  return resp.status(201).json({
    status: "success",
    message: "User created successfully",
    data: {
      user: userData,
      token,
    },
  });
};

const login = async (req, resp) => {
  const { name, password, email, age } = req.body;
  const userData = await prisma.user.findUnique({
    where: { email: email },
  });
  if (!userData) {
    return resp.status(400).json({
      status: "error",
      message: "Invalid User or Password",
    });
  }

  const passwordValid = await bcrypt.compare(password, userData.password);
  if (!passwordValid) {
    return resp.status(400).json({
      status: "error",
      message: "Invalid User or Password",
    });
  } else {
    const token = await generateToken(userData.id, resp);
    return resp.status(201).json({
      status: "success",
      message: "Logged in Successfully",
      data: {
        userData,
        token,
      },
    });
  }
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

export { register, login, logout };
