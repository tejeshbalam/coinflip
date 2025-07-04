import { useEffect, useRef , useState} from "react";
import { Coinflip } from "../index";
import {Menu} from "../components/Menu";
import { Betpanel } from "../addingBet";
import "../style.css";
import '@fortawesome/fontawesome-free/css/all.min.css';


const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Coinflip | null>(null);
  const [displayMenu,setDisplayMenu] = useState(false);
  const [isGameReady, setIsGameReady] = useState(false); 

  useEffect(() => {
    const game = new Coinflip();
    gameRef.current = game;
    if (containerRef.current) {
      game.applicationInit(containerRef.current);
      game.preload().then(() => {
        game.initializeGame().then(() => {
          setIsGameReady(true);
        });
      });
    }
  }, []);

  

  return (
    <>
    <div id="coin-flip-main">
      <div
        ref={containerRef}
        id="coin-flip-container"
        style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
      ></div>
      <nav id="nav-coin-flip">
        <div id="nav-home">
          <i className="fa-solid fa-house" id="home-icon"></i>
        </div>
        <div id="nav-sound-menu">
          <i className="fa-solid fa-volume-low" id="sound-icon"></i>
          <i className="fa-solid fa-bars" id="menu-icon" onClick= {() => setDisplayMenu(true)}></i>
        </div>
      </nav>
    </div>
    {/* {displayMenu && gameRef.current ? (<Menu app={gameRef.current.app} />) : null} */}
   
    {displayMenu && isGameReady && gameRef.current?.betPanel instanceof Betpanel && (
      <Menu onClose={() => setDisplayMenu(false)} betPanel={gameRef.current.betPanel} />
    )}



    </>
  );
  
};

export default Home;
