import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(cookieParser());

// console.log("HERE");

//routes import
import userRouter from "./route/user.route.js";
import noteRouter from "./route/note.route.js";

//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/notes", noteRouter);

export default app;
