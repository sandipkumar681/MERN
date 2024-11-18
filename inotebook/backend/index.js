// import "dotenv/config";
import connectToMongo from "./db.js";
import auth from "./routes/auth.js";
import note from "./routes/note.js";
import express from "express";
import cors from "cors";

connectToMongo();

const app = express();
const port = 5000;
app.use(cors());

// CORS is enabled for the selected origins

app.use(express.json());

app.use("/api/auth", auth);
app.use("/api/notes", note);

// app.listen(process.env.PORT, () => {
//   console.log(`Example app listening on port ${process.env.PORT}`);
// });

app.listen(port, () => {
  console.log(`iNoteBook backend listening on port ${port}`);
});
