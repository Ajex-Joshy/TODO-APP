import express from "express";
import { register, login, logout } from "../controllers/authController.js";
import validateUser from "../middlewares/validateUser.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Fix __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/app", validateUser, (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

export default router;
