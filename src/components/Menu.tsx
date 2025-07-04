import React from "react";
import { useState } from "react";
import { Menuoption } from "./Menuoption";
import "./menuStyle.css";
import { BetSettings } from "./Betsettings";
import { SoundSettings } from "./Soundsettings";
import { Rules } from "./Rules";
import { History } from "./History";
import { Betpanel } from "../addingBet";

type MenuProps = {
  onClose: () => void;
  betPanel: Betpanel;
};

const menuOptions = [
  {
    id: 1,
    optionName: "Bet Settings",
    optionpng: "/tabs-icon/bet.png",
    optionhoverpng: "/tabs-icon/bet_hover.png",
  },
  {
    id: 2,
    optionName: "Sound & Music",
    optionpng: "/tabs-icon/sound.png",
    optionhoverpng: "/tabs-icon/sound_hover.png",
  },
  {
    id: 3,
    optionName: "Rules",
    optionpng: "/tabs-icon/rules.png",
    optionhoverpng: "/tabs-icon/rules_hover.png",
  },
  {
    id: 4,
    optionName: "History",
    optionpng: "/tabs-icon/history.png",
    optionhoverpng: "/tabs-icon/history_hover.png",
  },
];



export const Menu: React.FC<MenuProps> = ({ onClose, betPanel }) => {

  const [selectedOption, setSelectedOption] = useState<string>("Bet Settings");

  const renderMenuInfo = () => {
    switch (selectedOption) {
      case "Bet Settings":
        return <BetSettings onBetChange={(value) => betPanel.updateBetAmount(value)} />
      case "Sound & Music":
        return <SoundSettings />
      case "Rules":
        return <Rules />
      case "History":
        return <History />
    }
  };

  return (
    <div className="menu-overlay">
      <h1 className="menu-title">Head And Tail</h1>
      <div className="menu-container">
        <div className="menu-options-container">
          {menuOptions.map((item) => (
            <Menuoption
              key={item.id}
              label={item.optionName}
              icon={item.optionpng}
              hoverIcon={item.optionhoverpng}
              onClick={() => setSelectedOption(item.optionName)}
            />
          ))}
        </div>
        <div className="menu-options-info">
          {renderMenuInfo()}
        </div>
      </div>
      <button className="menu-close-button" onClick={onClose}>
        Close Menu
      </button>
    </div>
  );
};
