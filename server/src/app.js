import express from "express";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import validateUser from "./middlewares/validateUser.js";
import taskRouter from "./routes/taskRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

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

app.use("/auth", authRouter);
app.use("/task", validateUser, taskRouter);

const startServer = async () => {
  await connectDB();
  app.listen(process.env.PORT, () =>
    console.log(`Server successfully running on PORT: ${process.env.PORT}`)
  );
};
startServer();
