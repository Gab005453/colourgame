import React, { useEffect, useRef, useState } from "react";
import "./App.css";

// Utility functions
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
  const canvasRef = useRef(null);
  const [mainColor, setMainColor] = useState(generateRandomColor());
  const [backgroundColor1, setBackgroundColor1] = useState(generateRandomColor());
  const [backgroundColor2, setBackgroundColor2] = useState(generateRandomColor());
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [guess, setGuess] = useState("");

  useEffect(() => {
    // Draw initial game elements when component mounts
    drawGame();
  }, []);

  // Generate new random colors for the game
  const generateNewColors = () => {
    setMainColor(generateRandomColor());
    setBackgroundColor1(generateRandomColor());
    setBackgroundColor2(generateRandomColor());
    setMessage("");
    setGuess("");
    drawGame(); // Redraw the game on the canvas
  };

  // Draw the game elements on the canvas
  const drawGame = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Calculate positions and sizes
    const boxSize = 160;
    const innerSquareSize = 80;
    const padding = 30;
    const leftX = padding;
    const rightX = canvasWidth - boxSize - padding;
    const boxY = (canvasHeight - boxSize) / 2;

    // Draw the left box
    ctx.fillStyle = backgroundColor1;
    ctx.fillRect(leftX, boxY, boxSize, boxSize);
    ctx.fillStyle = mainColor;
    ctx.fillRect(leftX + (boxSize - innerSquareSize) / 2, boxY + (boxSize - innerSquareSize) / 2, innerSquareSize, innerSquareSize);
    ctx.fillStyle = getContrastingColor(mainColor);
    ctx.font = "24px Arial";
    ctx.fillText("?", leftX + (boxSize - innerSquareSize) / 2 + 30, boxY + (boxSize - innerSquareSize) / 2 + 50);

    // Draw the right box
    ctx.fillStyle = backgroundColor2;
    ctx.fillRect(rightX, boxY, boxSize, boxSize);
    ctx.fillStyle = mainColor;
    ctx.fillRect(rightX + (boxSize - innerSquareSize) / 2, boxY + (boxSize - innerSquareSize) / 2, innerSquareSize, innerSquareSize);
    ctx.fillStyle = getContrastingColor(mainColor);
    ctx.fillText("?", rightX + (boxSize - innerSquareSize) / 2 + 30, boxY + (boxSize - innerSquareSize) / 2 + 50);

    // Draw message and score
    ctx.fillStyle = "#000";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 20, 30);
    ctx.fillText(message, canvasWidth / 2 - 50, 30);
  };

  const warmth1 = calculateWarmth(backgroundColor1);
  const warmth2 = calculateWarmth(backgroundColor2);
  const correctAnswer = warmth1 > warmth2 ? "Left" : warmth1 < warmth2 ? "Right" : "Same";

  // Handle the user's guess
  const handleGuess = (direction) => {
    setGuess(direction);
    if (direction === correctAnswer) {
      setScore(score + 1);
      setMessage("✅ Correct!");
    } else {
      setMessage("❌ Incorrect. Try again!");
    }
    drawGame(); // Redraw the game after the guess
  };

  return (
    <div className="container">
      <h1 className="title">🎨 Warm vs Cool Color Game</h1>
      <p className="subtitle">Which side makes the center color look warmer?</p>

      <canvas ref={canvasRef} width={800} height={600} style={{ border: "1px solid black" }} />

      <div className="feedback">
        <p>{message}</p>
        <p>Score: <strong>{score}</strong></p>
      </div>

      <div>
        <button className="btn left-btn" onClick={() => handleGuess("Left")}>Left</button>
        <button className="btn right-btn" onClick={() => handleGuess("Right")}>Right</button>
      </div>

      <button className="btn next-btn" onClick={generateNewColors}>
        🎲 Next Round
      </button>
    </div>
  );
}
