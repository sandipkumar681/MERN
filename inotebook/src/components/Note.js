import React, { useContext, useEffect } from "react";
import NoteItem from "./NoteItem";
import noteContext from "../context/note/noteContext";
import { Link } from "react-router-dom";
import addNoteIcon from "../addNoteIcon2.jpg";

const Note = () => {
  const { notes, fetchNote } = useContext(noteContext);
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      fetchNote();
    }

    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <h2>YOUR NOTES</h2>
      <div className="display-flex flexwrap">
        {notes.map((note, index) => {
          return (
            <NoteItem
              key={note._id}
              title={note.title}
              description={note.description}
              tag={note.tag}
              _id={note._id}
            />
          );
        })}

        <div className="addNoteClass">
          <Link to="/addNote">
            <img src={addNoteIcon} alt="addNoteIcon" id="addNoteIcon" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Note;
