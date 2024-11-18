import express from "express";
import Note from "../models/Note.js";
const router = express.Router();
import fetchUser from "../middleware/fetchUser.js";
import { body, validationResult } from "express-validator";

//Route 1: Fetch an User's all Notes using POST "/api/notes/fetchaallnotes".Login required
router.post("/fetchaallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).select(
      "-password -date -user"
    );
    // res.json({notes})
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured!");
  }
});

//Route 2: Create a note for an User using POST "/api/notes/createnotes".Login required
router.post(
  "/createnotes",
  fetchUser,
  [
    body("title", "Title cannot be blank").exists(),
    body("description", "description cannot be blank").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const notes = await Note.create({
        user: req.user.id,
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
      });
      // res.json({ "message": "Note is created successfully" });
      res.json(notes);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured!");
    }
  }
);

//Route 3: Upadte a note for an User using PUT "/api/notes/createnotes".Login required
router.put(
  "/updatenote/:id",
  fetchUser,
  //  [
  // body('title', 'Title cannot be blank').exists(),
  // body('description', 'description cannot be blank').exists()],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const newNote = {};
      if (title) {
        newNote.title = title;
      }
      if (description) {
        newNote.description = description;
      }
      if (tag) {
        newNote.tag = tag;
      }
      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not HERE Found");
      }
      console.log(note);

      if (note.user.toString() !== req.user.id) {
        return res.status(404).send("Not Allowed");
      }
      note = await Note.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.json(note);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured!");
    }
  }
);

//Route 4: Delete a note for an User using DELETE "/api/notes/deletenote".Login required
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    console.log(note);

    if (note.user.toString() !== req.user.id) {
      return res.status(404).send("Not Allowed");
    }
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note Deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured!");
  }
});

export default router;
