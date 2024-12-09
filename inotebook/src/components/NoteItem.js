import { PencilIcon, TrashIcon, CheckIcon } from "@heroicons/react/24/solid";
import { useContext, useState } from "react";
import noteContext from "../context/note/noteContext";

const NoteItem = ({ _id, title, description, tag }) => {
  const { deleteNote, updateNote } = useContext(noteContext);

  // States for edit mode and updated fields
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedDescription, setUpdatedDescription] = useState(description);
  const [updatedTag, setUpdatedTag] = useState(tag);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Call updateNote context function to save changes
    updateNote({ _id, updatedTitle, updatedDescription, updatedTag });
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteNote(_id);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
      {/* Title */}
      {isEditing ? (
        <input
          type="text"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
          className="text-xl font-semibold text-gray-800 mb-2 w-full border border-gray-300 rounded p-2"
        />
      ) : (
        <h3 className="text-xl font-semibold text-gray-800 mb-2 break-words">
          {title}
        </h3>
      )}

      {/* Description */}
      {isEditing ? (
        <textarea
          value={updatedDescription}
          onChange={(e) => setUpdatedDescription(e.target.value)}
          className="text-gray-600 mb-4 w-full border border-gray-300 rounded p-2"
          rows={3}
        />
      ) : (
        <p className="text-gray-600 mb-4 break-words">{description}</p>
      )}

      {/* Tag */}
      {isEditing ? (
        <input
          type="text"
          value={updatedTag}
          onChange={(e) => setUpdatedTag(e.target.value)}
          className="inline-block bg-blue-100 text-blue-500 text-sm font-medium px-3 py-1 rounded mb-4 w-full border border-gray-300"
        />
      ) : (
        <span className="inline-block bg-blue-500 text-white text-sm font-medium px-3 py-1 rounded mb-4 break-words">
          {tag}
        </span>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-4">
        {/* Edit/Save Button */}
        {isEditing ? (
          <button
            onClick={handleSave}
            className="text-green-500 hover:text-green-700 transition"
          >
            <CheckIcon className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className="text-blue-500 hover:text-blue-700 transition"
          >
            <PencilIcon className="w-5 h-5" />
          </button>
        )}

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700 transition"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default NoteItem;
