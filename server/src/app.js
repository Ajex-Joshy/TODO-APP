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
app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000", // React app URL
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use("/app", express.static(path.join(__dirname, "../../client/dist/")));
app.get("/app", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
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
