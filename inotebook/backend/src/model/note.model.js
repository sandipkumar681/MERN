import mongoose from "mongoose";
const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    tag: {
      type: String,
      default: "General",
    },
  },
  { timestamps: true }
);
const Note = mongoose.model("Note", noteSchema);
export default Note;
