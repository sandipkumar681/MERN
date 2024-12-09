import { asyncHandler } from "../utils/asyncHandler.js";
import { validationResult } from "express-validator";
import Note from "../model/note.model.js";
import { apiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";

const createNote = asyncHandler(async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, tag } = req.body;

    const note = await Note.create({
      user: req.user._id,
      title,
      description,
      tag,
    });

    return res
      .status(201)
      .json(new apiResponse(201, note, "Note created successfully!"));
  } catch (error) {
    throw new apiError(
      error.statusCode || 500,
      error.message || "Internal server error while creating note!"
    );
  }
});

const updateNote = asyncHandler(async (req, res) => {
  try {
    const { updatedTitle, updatedDescription, updatedTag } = req.body;
    const newNote = {};
    if (updatedTitle) {
      newNote.title = updatedTitle;
    }
    if (updatedDescription) {
      newNote.description = updatedDescription;
    }
    if (updatedTag) {
      newNote.tag = updatedTag;
    }
    const doesNoteExists = await Note.findById(req.params.id);

    if (!doesNoteExists) {
      throw new apiError(400, "Note does not exists!");
    }

    if (doesNoteExists.user.toString() !== req.user._id) {
      throw new apiError(400, "Not allowed!");
    }

    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    return res
      .status(200)
      .json(new apiResponse(200, note, "Note updated successfully!"));
  } catch (error) {
    throw new apiError(
      error.statusCode || 500,
      error.message || "Internal server error while updating note!"
    );
  }
});

const deleteNote = asyncHandler(async (req, res) => {
  try {
    let doesNoteExists = await Note.findById(req.params.id);

    if (!doesNoteExists) {
      throw new apiError(404, "Note does not exists");
    }

    if (doesNoteExists.user.toString() !== req.user._id) {
      return res.status(404).send("Not Allowed");
    }

    const note = await Note.findByIdAndDelete(req.params.id);

    return res
      .status(200)
      .json(new apiResponse(200, {}, "Note deleted successfully!"));
  } catch (error) {
    throw new apiError(
      error.statusCode || 500,
      error.message || "Internal server error while deleting note!"
    );
  }
});

const fetchaallnotes = asyncHandler(async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }).select(
      "-password  -__v"
    );

    return res
      .status(200)
      .json(new apiResponse(200, notes, "All notes fetched successfully!"));
  } catch (error) {
    throw new apiError(
      error.statusCode || 500,
      error.message || "Internal server error while fetching all notes!"
    );
  }
});

export { createNote, updateNote, deleteNote, fetchaallnotes };
