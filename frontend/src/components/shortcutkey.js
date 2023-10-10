import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./nav";

function Setting_shortcut_key() {
  const navigate = useNavigate();
  useEffect(() => {
    let keysDown = {};
    window.onkeydown = function (e) {
      keysDown[e.key] = true;
      if (keysDown["Control"] && keysDown["r"]) {
        console.log("control + r");
        navigate("/register");
      } else if (keysDown["Control"] && keysDown["s"]) {
        console.log("control + s");
        navigate("/signin");
      } else if (keysDown["Control"] && keysDown["a"]) {
        console.log("control + a");
        navigate("/add");
      } else if (keysDown["Control"] && keysDown["p"]) {
        console.log("control + p");
        navigate("/");
      } else if (keysDown["Control"] && keysDown["u"]) {
        console.log("control + u");
        navigate("/update");
      }
    };
    window.onkeyup = function (e) {
      keysDown[e.key] = false;
    };
  });
}
export default Setting_shortcut_key;
