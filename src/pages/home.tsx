import React from "react";
import { useEffect, useRef } from "react";
import { Coinflip } from "../index";
import "../style.css";

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const game = new Coinflip();
    if (containerRef.current) {
      game.applicationInit(containerRef.current);
      game.preload().then(() => {
        game.initializeGame();
      });
    }
  }, []);

  return (
    <div id="coin-flip-main">
      <div
        ref={containerRef}
        id="coin-flip-container"
        style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
      ></div>
      {/* <nav id="nav-coin-flip">
        <div id="nav-home">
          <i className="fa-solid fa-house" id="home-icon"></i>
        </div>
        <div id="nav-sound-menu">
          <i className="fa-solid fa-volume-low" id="sound-icon"></i>
          <i className="fa-solid fa-bars" id="menu-icon"></i>
        </div>
      </nav> */}
    </div>
  );
};

export default Home;
