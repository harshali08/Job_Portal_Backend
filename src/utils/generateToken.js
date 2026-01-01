import jwt from "jsonwebtoken";

const generateToken = async (userId, resp) => {
  const payload = { id: userId };
  const token = await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7m",
  });

  await resp.cookie("jwt", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 7,
  });
  return token;
};

export default generateToken;
