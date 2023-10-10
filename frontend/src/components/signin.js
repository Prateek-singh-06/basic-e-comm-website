import { Link, useNavigate } from "react-router-dom";
import React from "react";
import "./signin.css";
import { useState } from "react";
import { useEffect } from "react";

const Signin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("localinfo");
    if (auth) {
      navigate("/");
    }
  });

  const [userid, setuserid] = useState("");
  const [userPassword, setPassword] = useState("");

  const Handlelogin = async (e) => {
    e.preventDefault();
    console.log(userid, userPassword);
    let result = await fetch("http://localhost:5000/signin", {
      method: "post",
      body: JSON.stringify({ userid, userPassword }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result.success === true) {
      localStorage.setItem("localinfo", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));

      navigate("/");
    } else {
      alert("please check the input");
    }
  };

  function user_selector() {
    const username = document.querySelector("#name");
    const Password = document.querySelector("#password");
    username.style.color = "black";
    username.style.fontSize = "16px";
    username.style.transition = "0.5s";
    Password.style.fontSize = "13px";
    Password.style.transition = "0.5s";
    Password.style.color = "black";
    document.getElementById("usename-top").style.color = "#03a9f4";
    document.getElementById("password-top").style.color = "black";
    document.getElementById("usename-top").style.fontSize = "18px";
    document.getElementById("password-top").style.fontSize = "10px";
    document.getElementById("usename-top").style.transition = "0.4s";
    document.getElementById("password-top").style.transition = "0.4s";
  }

  function password_selector() {
    const username = document.querySelector("#name");
    const Password = document.querySelector("#password");

    Password.style.color = "#03a9f4";
    Password.style.fontSize = "16px";
    Password.style.transition = "0.5s";
    username.style.fontSize = "13px";
    username.style.transition = "0.5s";
    username.style.color = "black";
    document.getElementById("password-top").style.color = "#03a9f4";
    document.getElementById("usename-top").style.color = "black";
    document.getElementById("usename-top").style.fontSize = "10px";
    document.getElementById("password-top").style.fontSize = "18px";
    document.getElementById("usename-top").style.transition = "0.4s";
    document.getElementById("password-top").style.transition = "0.4s";
  }

  return (
    <div className="login-box">
      <div className="login_top">
        <span id="usename-top">userid</span>
        <span>/</span>
        <span id="password-top">Password</span>
      </div>
      <h2 className="form_heading">Login</h2>
      <form>
        <div className="user-box">
          <input
            type="text"
            id="name"
            name="Username"
            placeholder="userid"
            value={userid}
            onChange={(e) => setuserid(e.target.value)}
            onClick={user_selector}
          />

          {/* <!-- <label>Username</label> --> */}
        </div>
        <div className="user-box">
          <input
            type="password"
            id="password"
            name=""
            required=""
            placeholder="Password"
            onClick={password_selector}
            value={userPassword}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* <!-- <label>Password</label> --> */}
        </div>
        <button id="submit" onClick={Handlelogin}>
          Submit
        </button>
        <Link to="/register" id="register">
          register
        </Link>
      </form>
    </div>
  );
};

export default Signin;
