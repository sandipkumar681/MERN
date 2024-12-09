import express from "express";
import Note from "../model/note.model.js";
const router = express.Router();
import { fetchUserDetails } from "../middleware/fetchUserDetails.middleware.js";
import { body } from "express-validator";
import {
  createNote,
  deleteNote,
  fetchaallnotes,
  updateNote,
} from "../controller/note.controller.js";

//Route 1: Create a note for an User using POST "/api/notes/createnotes".Login required
router.post(
  "/createnote",
  fetchUserDetails,
  [
    body("title", "Title cannot be blank").exists(),
    body("description", "description cannot be blank").exists(),
  ],
  createNote
);

//Route 2: Upadte a note for an User using PUT "/api/notes/createnotes".Login required
router.patch(
  "/updatenote/:id",
  fetchUserDetails,
  [
    body("title", "Title cannot be blank").exists(),
    body("description", "description cannot be blank").exists(),
  ],
  updateNote
);

//Route 3: Delete a note for an User using DELETE "/api/notes/deletenote".Login required
router.delete("/deletenote/:id", fetchUserDetails, deleteNote);

//Route 4: Fetch an User's all Notes using POST "/api/notes/fetchaallnotes".Login required
router.get("/fetchaallnotes", fetchUserDetails, fetchaallnotes);

export default router;
