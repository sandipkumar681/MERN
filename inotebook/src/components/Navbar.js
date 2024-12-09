import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import noteContext from "../context/note/noteContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { logout } = useContext(noteContext);

  const handleLogOut = () => {
    logout();
  };

  return (
    <nav className="bg-indigo-600 text-white p-4">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-2xl font-semibold">
            iNoteBook
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/about" className="hover:text-indigo-300">
            About
          </Link>

          <Link to="/allnote" className="hover:text-indigo-300">
            All Notes
          </Link>

          {!localStorage.getItem("authToken") ? (
            <>
              <Link to="/login" className="hover:text-indigo-300">
                Login
              </Link>
              <Link to="/signup" className="hover:text-indigo-300">
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogOut}
              className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none"
            >
              LogOut
            </button>
          )}
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } md:hidden bg-indigo-600 text-white space-y-4 px-4 py-3`}
      >
        <Link to="/about" className="block hover:text-indigo-300">
          About
        </Link>

        <Link to="/allnote" className="block hover:text-indigo-300">
          All Notes
        </Link>

        {!localStorage.getItem("authToken") ? (
          <>
            <Link to="/login" className="block hover:text-indigo-300">
              Login
            </Link>
            <Link to="/signup" className="block hover:text-indigo-300">
              Sign Up
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogOut}
            className="block bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none"
          >
            LogOut
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
