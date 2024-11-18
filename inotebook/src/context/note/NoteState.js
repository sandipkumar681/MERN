import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const authToken = localStorage.getItem("authToken");
  // console.log(authToken);

  const [notes, setNotes] = useState([]);

  //Get Note

  const fetchNote = async () => {
    const response = await fetch(
      "http://localhost:5000/api/notes/fetchaallnotes",
      {
        method: "POST",
        headers: {
          "auth-token": authToken,
        },
      }
    );
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  //Add Note
  //ToDo link to DB and add it

  const addNote = async (title, description, tag) => {
    const response = await fetch(
      "http://localhost:5000/api/notes/createnotes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
        body: JSON.stringify({ title, description, tag }),
      }
    );
    console.log(response);
    // const note = [{ title, description, tag }];
    // const noteexample = {
    //   _id: "unique",
    //   title: "added",
    //   description: "added",
    //   tag: "added",
    // };
    // console.log(noteexample);
    // setNotes(noteexample);
    // console.log("HERE");
  };

  // setNote(noteexample);

  //Delete Note

  const deleteNote = async (_id) => {
    // notes.splice(e, 1);
    // console.log(_id);
    const newNotes = notes.filter((note) => {
      return note._id !== _id;
    });
    setNotes(newNotes);
    const response = await fetch(
      `http://localhost:5000/api/notes/deletenote/${_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
        // body: JSON.stringify({ title, description, tag }),
      }
    );
    const json = await response.json();
    console.log(json);

    // console.log("HERE");
  };

  //Edit Note

  return (
    <noteContext.Provider value={{ notes, fetchNote, addNote, deleteNote }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
