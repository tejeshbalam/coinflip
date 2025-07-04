import  { useState, useEffect } from "react";
import "./betsetting.css";

type BetSettingsProps = {
  onBetChange: (betValue: number) => void;
};

const betValues = [20, 100, 500, 1000, 20000];

export const BetSettings = ({ onBetChange }: BetSettingsProps) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    onBetChange(betValues[currentIndex]);
  }, [currentIndex, onBetChange]);

  const rotateLeft = () => {
    if (animating) return;
    setAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + betValues.length) % betValues.length);
    setTimeout(() => setAnimating(false), 300);
  };

  const rotateRight = () => {
    if (animating) return;
    setAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % betValues.length);
    setTimeout(() => setAnimating(false), 300);
  };

  const getDisplayedValues = () => {
    const left = betValues[(currentIndex - 1 + betValues.length) % betValues.length];
    const center = betValues[currentIndex];
    const right = betValues[(currentIndex + 1) % betValues.length];
    return { left, center, right };
  };

  const { left, center, right } = getDisplayedValues();

  return (
    <div className="bet-settings-container">
      <h1 className="bet-title">Bet Value</h1>
      <h2 className="bet-value">{center}</h2>
      <div className="roll-container">
        <img src="/settings/roll-bg.png" alt="bet-carousel-bg" className="roll-background" />
        <div className="left-zone" onClick={rotateLeft}></div>
        <div className="right-zone" onClick={rotateRight}></div>

        <div className={`bet-values ${animating ? "animate" : ""}`}>
          <span className="bet-value left">{left}</span>
          <span className="bet-value center">{center}</span>
          <span className="bet-value right">{right}</span>
        </div>
      </div>
    </div>
  );
};
