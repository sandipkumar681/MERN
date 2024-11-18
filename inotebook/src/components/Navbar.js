import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  // let location = useLocation();
  const handleLogOut = () => {
    // console.log("HI");
    localStorage.removeItem("authToken");
    // const navigate = useNavigate();
    // navigate("/login");
  };
  return (
    <nav className="nav-bg display-flex justify-content-between nav-padding">
      <div className="display-flex">
        <Link className="default-padding" to="/">
          <h1>iNoteBook</h1>
        </Link>
        <ul className="display-flex">
          {/* <li className="default-padding">
            <Link to="/home">Home</Link>
          </li> */}
          <li className="default-padding">
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
      {!localStorage.getItem("authToken") ? (
        <div>
          <ul className="display-flex">
            <li className="default-padding">
              <Link to="/login">LogIn</Link>
            </li>
            <li className="default-padding">
              <Link to="/signup">SignUp</Link>
            </li>
          </ul>
        </div>
      ) : (
        <button className="default-padding" onClick={handleLogOut}>
          LogOut
        </button>
      )}
    </nav>
  );
};

export default Navbar;
