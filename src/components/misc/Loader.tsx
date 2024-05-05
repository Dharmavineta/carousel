import React from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

const Loader = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <Player
        autoplay
        loop
        src={
          "https://lottie.host/b74b0168-30a2-462c-ad57-a0ca23805fdb/UCXfnNpl5p.json"
        }
        style={{ height: "500px", width: "500px" }}
      />
    </div>
  );
};

export default Loader;
