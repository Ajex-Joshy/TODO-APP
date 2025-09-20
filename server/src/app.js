import express from "express";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import validateUser from "./middlewares/validateUser.js";
import taskRouter from "./routes/taskRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Fix __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const allowedOrigins = ["https://todo-app-three-snowy-23.vercel.app"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // for non-browser requests
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true, // <--- must be true to allow cookies
  })
);

app.get("/verify", validateUser, (req, res) => {
  res.status(200).json({ msg: "token validated", user: req.user });
});
app.use("/auth", authRouter);
app.use("/task", validateUser, taskRouter);

const startServer = async () => {
  await connectDB();
  app.listen(process.env.PORT, () =>
    console.log(`Server successfully running on PORT: ${process.env.PORT}`)
  );
};
startServer();
