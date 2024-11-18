import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const info = {
    name: "",
    email: "",
    password: "",
  };
  const [data, setData] = useState(info);
  //   const
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);
  };

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <div className="outerbox">
      <div className="innerbox">
        <h1>Get Started with iNoteBook</h1>
        <form onSubmit={handleSubmit}>
          <p>
            <label htmlFor="exampleInputName">Enter Your Full Name</label>
          </p>
          <p>
            <input
              type="text"
              name="name"
              id="exampleInputName"
              placeholder="Enter your name here"
              onChange={onChange}
              required
              minLength={3}
            />
          </p>
          <p>
            <label htmlFor="exampleInputEmail1">Enter Email</label>
          </p>
          <p>
            <input
              type="email"
              name="email"
              id="exampleInputEmail1"
              placeholder="Enter your email here"
              onChange={onChange}
              required
            />
          </p>
          <p>
            <label htmlFor="exampleInputPassword">Enter Password</label>
          </p>
          <p>
            <input
              type="password"
              id="exampleInputPassword"
              name="password"
              placeholder="Enter your password here"
              onChange={onChange}
              required
              minLength={6}
            />
          </p>
          <p>
            <input type="submit" id="submit" value="SIGNUP" />
          </p>
        </form>
        <div className="footer">
          <p>
            Already have an Account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

/*

<form>
        <div className="">
          <p>
            <label htmlFor="exampleInputEmail1">Email address</label>
          </p>
          <input
            type="email"
            className=""
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <p>
            <small id="emailHelp" className="">
              We'll never share your email with anyone else.
            </small>
          </p>
        </div>
        <p>
          <div className="">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className=""
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
        </p>
        <p>
          <button type="submit" className="">
            Submit
          </button>
        </p>
      </form>*/
