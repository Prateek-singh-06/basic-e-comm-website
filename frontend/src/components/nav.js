// import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Setting_shortcut_key from "./shortcutkey";
import { BsPersonFill } from "react-icons/bs";

const Nav = () => {
  const auth = localStorage.getItem("localinfo");
  const navigate = useNavigate();

  Setting_shortcut_key();

  const confirmlogout = () => {
    const confirmBox = window.confirm("Do you really want to logout");
    if (confirmBox === true) {
      logout();
    }
  };

  //after the confirmation this function will delete the localstorage and you will be log out
  const logout = () => {
    localStorage.clear();
    navigate("/sigin");
  };
  return (
    <div>
      <ul className="navigation_bar">
        <li className="nav-li">
          <Link to="/" title="ctrl+p">
            Home
          </Link>{" "}
        </li>
        <li className="nav-li">
          <Link to="/product" title="ctrl+p">
            Product
          </Link>{" "}
        </li>
        <li className="nav-li">
          <Link to="/add" title="ctrl+a">
            Add product
          </Link>
        </li>
        {/* <li className="nav-li">
          <Link to="/update" title="ctrl+u">
            Update product
          </Link>
        </li> */}
        <ul className="right_nav">
          {auth ? (
            <>
              <li className="nav-li">
                <Link onClick={confirmlogout} to="/signin" title="Logout">
                  Logout
                </Link>
              </li>
              <li className="Account_icon1">
                <Link to="/profile" className="Account_icon2" title="Account">
                  <BsPersonFill />
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-li">
                <Link to="/signin" title="ctrl+s">
                  signin
                </Link>
              </li>
              <li className="nav-li">
                <Link to="/register" title="ctrl+r">
                  register
                </Link>
              </li>
            </>
          )}
        </ul>
      </ul>
    </div>
  );
};
export default Nav;
