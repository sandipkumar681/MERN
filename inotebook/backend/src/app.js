import "./loadEnv.js";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
console.log(process.env.PORT);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(cookieParser());

//routes import
import userRouter from "./route/user.route.js";
import noteRouter from "./route/note.route.js";

//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/notes", noteRouter);

export default app;
