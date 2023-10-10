import React from "react";
// import Logo from "./bird.png";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import animation_j from "./animation_ln6hnr5t.json";
import Spline from "@splinetool/react-spline";

const home = () => {
  const animation = () => {
    // document.getElementsByClassName("showanimation").style.display = "none";
    const elements = document.getElementById("showanimation");
    elements.style.display = "none";
  };

  return (
    <div>
      {/* <h1>Home</h1> */}
      {/* <div id="showanimation">
        <Player
          hover
          loop
          // src="https://lottie.host/d5b507a2-fc85-4bad-a1f5-3921847a4ac3/nGymI85BCL.json"
          src={animation_j}
          //or u can directly paste the link given on the lottie file
          style={{ height: "100px", width: "100px" }}
        >
          {/* <Controls
          visible={true}
          buttons={["play", "repeat", "frame", "debug"]}
        /> */}
      {/* </Player> */}
      {/* </div>  */}
      <div className="spline">
        <Spline
          className="spline1"
          // style={{ height: "400px", width: "100%" }}
          // scene="https://prod.spline.design/RrvXziVylaztIhnm/scene.splinecode"
          scene="https://prod.spline.design/lbj9bdr5kSg93tlr/scene.splinecode"
        />
      </div>
      {/* <button onClick={animation}>show animation</button> */}

      {/* <img src={Logo} alt="Logo" /> */}
    </div>
  );
};
export default home;
