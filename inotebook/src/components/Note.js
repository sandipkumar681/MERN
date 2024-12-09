import { useContext, useEffect } from "react";
import NoteItem from "./NoteItem";
import noteContext from "../context/note/noteContext";
import { Link, useNavigate } from "react-router-dom";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

const Note = () => {
  const navigate = useNavigate();

  const { notes, setNotes, fetchNote } = useContext(noteContext);

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      console.log("Navigating to login");
      navigate("/login");
    } else {
      fetchNote();
    }
  }, [setNotes]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Your Notes
      </h2>

      {/* Notes Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Map over notes */}
        {notes?.map((note) => (
          <NoteItem
            key={note._id}
            title={note.title}
            description={note.description}
            tag={note.tag}
            _id={note._id}
          />
        ))}

        {/* Add Note Button */}
        <div className="flex items-center justify-center border-2 border-dashed border-gray-400 rounded-lg p-6 bg-gray-100 hover:border-blue-500 hover:bg-blue-50 transition">
          <Link to="/addNote" className="text-center">
            <button>
              <PlusCircleIcon className="w-16 h-16 mx-auto mb-2" />
            </button>

            <p className="text-blue-500 font-semibold text-lg">Add Note</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Note;
