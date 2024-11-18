import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const info = {
    email: "",
    password: "",
  };

  const [data, setData] = useState(info);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    const response = await fetch("http://localhost:5000/api/auth/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json) {
      localStorage.setItem("authToken", json.authToken);
      // const a = localStorage.getItem("token");
      // console.log(a);
      // console.log("HERE");
    }
  };

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="outerbox">
      <div className="innerbox">
        <h1>Welcome Back to iNoteBook!</h1>
        <form onSubmit={handleSubmit}>
          <p>
            <label htmlFor="exampleInputEmail1">Enter Registered Email</label>
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
            <input type="submit" id="submit" value="LOGIN" />
          </p>
        </form>
        <div className="footer">
          <p>
            Don't have an Account? <Link to="/signup">SignUp</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
