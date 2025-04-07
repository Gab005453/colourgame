import React from "react";

function Game() {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>🎨 Warm vs Cool Colour Game</h1>
      <p>Click a button to choose a colour!</p>
      <div>
        <button style={{ background: "red", padding: "1rem", margin: "1rem" }}>Red</button>
        <button style={{ background: "blue", padding: "1rem", margin: "1rem" }}>Blue</button>
      </div>
    </div>
  );
}

export default Game;
