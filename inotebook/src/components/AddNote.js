import React, { useState, useContext } from "react";
import noteContext from "../context/note/noteContext";
import { useNavigate } from "react-router-dom";

const AddNote = () => {
  const { addNote } = useContext(noteContext);

  const navigate = useNavigate();

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    navigate("/allnote");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center min-h-60  bg-gradient-to-r from-indigo-500">
      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10 mb-20">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Add a Note
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Title Input */}
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter your title here"
              value={note.title}
              onChange={onChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description Input */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Description
            </label>
            <input
              type="text"
              name="description"
              id="description"
              placeholder="Enter your description here"
              value={note.description}
              onChange={onChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Tag Input */}
          <div className="mb-6">
            <label
              htmlFor="tag"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Tag
            </label>
            <input
              type="text"
              name="tag"
              id="tag"
              placeholder="Enter your tag here"
              value={note.tag}
              onChange={onChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add This Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
