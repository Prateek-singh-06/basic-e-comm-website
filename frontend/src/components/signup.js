import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";
let s = 1;

const Signup = () => {
  const [userid, setUserid] = useState("");
  const [userName, setName] = useState("");
  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");
  const [confirmUserPassword, setconfirmpassword] = useState("");

  function setdata(e) {
    setconfirmpassword(e.target.value);
  }

  function handleInputChange(e) {
    setdata(e);
    // setconfirmpassword(e.target.value);
    update();
    // console.log("hello");
  }

  const navigate = useNavigate();

  function update() {
    if (s === 0) {
      var password = document.getElementById("userPassword").value;
      var confirm_password = document.getElementById(
        "confirmUserPassword"
      ).value;
      if (password === confirm_password) {
        document.getElementById("errorText").style.display = "none";
      }
      if (password !== confirm_password) {
        document.getElementById("errorText").style.display = "block";
      }
      console.log(s);
    }
  }

  useEffect(() => {
    const auth = localStorage.getItem("localinfo");
    if (auth) {
      navigate("/");
    }
  });

  const collectdata = async () => {
    console.log(userid, userName, userEmail, userPassword, confirmUserPassword);
    let result = await fetch("http://localhost:5000/register", {
      method: "post",
      body: JSON.stringify({
        userid,
        userName,
        userEmail,
        userPassword,
        confirmUserPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    if (result.success === true) {
      localStorage.setItem("localinfo", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      if (result) {
        navigate("/");
      }
    } else {
    }
  };

  function submitForm(e) {
    e.preventDefault();

    var password = document.getElementById("userPassword").value;
    var confirm_password = document.getElementById("confirmUserPassword").value;
    if (password === confirm_password) {
      s = 1;
      document.getElementById("errorText").style.display = "none";

      collectdata();
    } else {
      var inputElement = document.getElementById("confirmUserPassword");
      inputElement.classList.add("error-input");
      document.getElementById("errorText").style.display = "block";
      s = 0;
      console.log(s);
    }
  }

  // document.getElementById("form").addEventListener("submit", submitForm);

  return (
    <div>
      <form id="form_register" className="form_page_register">
        <h1 className="form_heading">Sign Up</h1>
        <label htmlFor="userid">user id:</label>
        <input
          type="text"
          className="form_input"
          id="userid"
          value={userid}
          onChange={(e) => setUserid(e.target.value)}
          name="userid"
          required
          placeholder="id"
        />
        <label htmlFor="userName">Name:</label>
        <input
          type="text"
          id="userName"
          className="form_input"
          value={userName}
          onChange={(e) => setName(e.target.value)}
          name="name"
          required
          placeholder="name"
        />
        <label htmlFor="userEmail">Email:</label>
        <input
          type="email"
          className="form_input"
          id="userEmail"
          value={userEmail}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          required
          placeholder="email"
        />
        <label htmlFor="userPassword">Password:</label>
        <input
          type="password"
          className="form_input"
          id="userPassword"
          value={userPassword}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          required
          placeholder="password"
        />
        <label htmlFor="confirmUserPassword">Confirm Password:</label>
        <span id="errorText" className="error-message">
          * it should be same as password
        </span>
        <input
          type="password"
          className="form_input"
          id="confirmUserPassword"
          value={confirmUserPassword}
          onChange={handleInputChange}
          name="confirm-password"
          required
          placeholder="confirm-password"
          // onChange={update}
        />
        <button
          type="button"
          id="sign_submit_button"
          name="submit"
          placeholder="submit"
          onClick={submitForm}
          // onClick={collectdata}
        >
          Submit
        </button>
      </form>
      {/* <script type="module" src="script.js"></script> */}
    </div>
  );
};

export default Signup;
