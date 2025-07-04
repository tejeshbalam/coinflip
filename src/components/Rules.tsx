import React from "react";
import "./rules.css";

export const Rules = () => {
  return (
    <div id="rules">
      <h1 id="heads-and-tails">Heads and Tails</h1>

      <h2 id="description">Description</h2>
      <p>
        Heads and Tails is a super simple yet exciting casual game. The purpose is to flip the coin and try to guess which side will show face up.
      </p>
      <p>RTP is 99%</p>

      <h2 id="how-to-play">How to Play</h2>
      <ol>
        <li>Go to <strong>Settings</strong> and choose your bet value</li>
        <li>Make your choice: heads or tails?</li>
        <li>Our “gravity generators” will start flipping the coin</li>
        <li>If your guess was correct - you win times 1.98 the amount of your bet!</li>
      </ol>

      <p>
        Malfunction voids all plays and pays! All unfinished rounds will be terminated every 24 hours. If the game requires “Collect” - “Collect” will take place and the win from the round will be added to the player balance. If the game requires action from a player, the result is counted assuming that the player has chosen the action with no risk without raising the initial bet.
        <br />
        <span className="game_version">Game Version 1.0.0.</span>
      </p>
    </div>
  );
};
