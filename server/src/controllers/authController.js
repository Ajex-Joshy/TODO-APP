import { validateRegisterData } from "../utils/validation.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();

export const register = async (req, res) => {
  try {
    validateRegisterData(req);
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.json({ msg: "user registered successfully" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!validator.isEmail(email)) throw new Error("Enter a valid email id");
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid credentials");
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) throw new Error("Invalid credentials");
    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.json({ msg: "Login successful" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.json({ msg: "user logged out successfully" });
  } catch (err) {
    res.status(400).json({ msg: err.message }, process.env.JWT_KEY);
  }
};
