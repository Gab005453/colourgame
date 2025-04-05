import React, { useState } from "react";
import "./App.css";

const generateRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
};

const getContrastingColor = (color) => {
  const [r, g, b] = color.match(/\d+/g).map(Number);
  return r + g + b > 382 ? "black" : "white";
};

const calculateWarmth = (color) => {
  const [r, g, b] = color.match(/\d+/g).map(Number);
  return r - b;
};

export default function App() {
  const [mainColor, setMainColor] = useState(generateRandomColor());
  const [backgroundColor1, setBackgroundColor1] = useState(generateRandomColor());
  const [backgroundColor2, setBackgroundColor2] = useState(generateRandomColor());
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [guess, setGuess] = useState("");

  const generateNewColors = () => {
    setMainColor(generateRandomColor());
    setBackgroundColor1(generateRandomColor());
    setBackgroundColor2(generateRandomColor());
    setMessage("");
    setGuess("");
  };

  const warmth1 = calculateWarmth(backgroundColor1);
  const warmth2 = calculateWarmth(backgroundColor2);
  const correctAnswer = warmth1 > warmth2 ? "Left" : warmth1 < warmth2 ? "Right" : "Same";

  const handleGuess = (direction) => {
    setGuess(direction);
    if (direction === correctAnswer) {
      setScore(score + 1);
      setMessage("✅ Correct!");
    } else {
      setMessage("❌ Incorrect. Try again!");
    }
  };

  return (
    <div className="container">
      <h1 className="title">🎨 Warm vs Cool Color Game</h1>
      <p className="subtitle">Which side makes the center color look warmer?</p>

      <div className="game-row">
        {/* Left Box */}
        <div className={`color-box ${guess === "Left" ? "selected" : ""}`}>
          <div
            className="outer-square"
            style={{ backgroundColor: backgroundColor1 }}
          >
            <div
              className="inner-square"
              style={{
                backgroundColor: mainColor,
                color: getContrastingColor(mainColor),
              }}
            >
              ?
            </div>
          </div>
          <button className="btn left-btn" onClick={() => handleGuess("Left")}>
            Left
          </button>
        </div>

        {/* Right Box */}
        <div className={`color-box ${guess === "Right" ? "selected" : ""}`}>
          <div
            className="outer-square"
            style={{ backgroundColor: backgroundColor2 }}
          >
            <div
              className="inner-square"
              style={{
                backgroundColor: mainColor,
                color: getContrastingColor(mainColor),
              }}
            >
              ?
            </div>
          </div>
          <button className="btn right-btn" onClick={() => handleGuess("Right")}>
            Right
          </button>
        </div>
      </div>

      <div className="feedback">
        <p>{message}</p>
        <p>Score: <strong>{score}</strong></p>
      </div>

      <button className="btn next-btn" onClick={generateNewColors}>
        🎲 Next Round
      </button>
    </div>
  );
}
