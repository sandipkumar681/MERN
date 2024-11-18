import React from "react";
import { useState } from "react";
import noteContext from "../context/note/noteContext";
import { useContext } from "react";

const AddNote = () => {
  const a = useContext(noteContext);

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // localStorage.removeItem("token");
    // console.log(note);
    a.addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="outerbox">
      <div className="innerbox">
        <h1>Add A Note</h1>
        <form onSubmit={handleSubmit}>
          <p>
            <label htmlFor="exampleInputTitle">Title</label>
          </p>
          <p>
            <input
              type="text"
              name="title"
              id="exampleInputTitle"
              placeholder="Enter your title here"
              onChange={onChange}
              required
            />
          </p>
          <p>
            <label htmlFor="exampleInputDescription">Enter Description</label>
          </p>
          <p>
            <input
              type="text"
              id="exampleInputDescription"
              name="description"
              placeholder="Enter your description here"
              onChange={onChange}
              required
            />
          </p>
          <p>
            <label htmlFor="exampleInputTag">Enter Tag</label>
          </p>
          <p>
            <input
              type="text"
              id="exampleInputTag"
              name="tag"
              placeholder="Enter your tag here"
              onChange={onChange}
            />
          </p>
          <p>
            <input type="submit" id="submit" value="Add This Note" />
          </p>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
