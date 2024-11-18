import React, { useContext } from "react";
import noteContext from "../context/note/noteContext";

const NoteItem = (prop) => {
  const { title, description, tag, _id } = prop;

  const { deleteNote } = useContext(noteContext);
  const handleDelete = (_id) => {
    // a.deleteNote(_id);
    deleteNote(_id);
  };

  // useEffect(() =`> {
  //   a.fetchNote();
  // }, [handleDelete()]);

  return (
    <div className="noteItem">
      <h4>{title}</h4>
      <p>{description}</p>
      <p>{tag}</p>
      <i className="fa-regular fa-pen-to-square"></i>
      <i
        className="fa-solid fa-trash"
        onClick={() => {
          deleteNote(_id);
        }}
        // onClick={handleDelete(_id)}
      ></i>
    </div>
  );
};

export default NoteItem;
