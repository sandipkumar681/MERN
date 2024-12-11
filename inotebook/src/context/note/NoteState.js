import noteContext from "./noteContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NoteState = (props) => {
  const authToken = localStorage.getItem("authToken");

  const [notes, setNotes] = useState([]);

  const navigate = useNavigate();

  //Get All Note

  const fetchNote = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_LINK}/api/v1/notes/fetchaallnotes`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const json = await response?.json();

      if (json.statusCode === 200) {
        setNotes(json.data);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  //Add Note

  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_LINK}/api/v1/notes/createnote`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ title, description, tag }),
        }
      );

      const json = await response.json();

      if (json.statusCode === 201) {
        const _id = json.data._id;

        setNotes((prev) => [{ _id, title, description, tag }, ...prev]);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  //Delete Note

  const deleteNote = async (_id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_LINK}/api/v1/notes/deletenote/${_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const json = await response.json();

      if (json.statusCode === 200) {
        setNotes((prev) =>
          prev.filter((todo) => {
            return todo._id !== _id;
          })
        );
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  //Edit Note

  const updateNote = async (updatedNote) => {
    try {
      const { _id, updatedTitle, updatedDescription, updatedTag } = updatedNote;

      const response = await fetch(
        `${process.env.REACT_APP_SERVER_LINK}/api/v1/notes/updatenote/${_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            updatedTitle,
            updatedDescription,
            updatedTag,
          }),
        }
      );

      const json = await response.json();

      if (json.statusCode === 200) {
        setNotes((prev) =>
          prev.map((note) => {
            return note._id === _id
              ? {
                  _id,
                  title: updatedTitle,
                  description: updatedDescription,
                  tag: updatedTag,
                }
              : note;
          })
        );
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_LINK}/api/v1/users/logoutuser`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const json = await response.json();

      if (json.statusCode === 200) {
        localStorage.removeItem("authToken");

        // document.cookie =
        //   "noteCookie" + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";

        setNotes([]);

        navigate("/");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <noteContext.Provider
      value={{ notes, fetchNote, addNote, deleteNote, updateNote, logout }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
