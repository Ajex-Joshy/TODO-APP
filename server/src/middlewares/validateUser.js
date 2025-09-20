import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { configDotenv } from "dotenv";
configDotenv();

const validateUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) throw new Error("Token not found");
    const userId = jwt.verify(token, process.env.JWT_KEY);
    if (!userId) throw new Error("Invalid token");
    const user = await User.findById(userId.id);
    if (!user) throw new Error("User not found");
    req.user = user;
    next();
  } catch (err) {
    res.staus(400).json({ msg: err.message });
  }
};

export default validateUser;
