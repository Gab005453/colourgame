import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [leftColor, setLeftColor] = useState('');
  const [rightColor, setRightColor] = useState('');
  const [centerColor, setCenterColor] = useState('');
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');

  const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
  };

  const generateNewRound = () => {
    const left = generateRandomColor();
    const right = generateRandomColor();
    const center = generateRandomColor();
    setLeftColor(left);
    setRightColor(right);
    setCenterColor(center);
    setMessage('');
  };

  const perceivedWarmth = (bgColor) => {
    const rgb = bgColor.match(/\d+/g).map(Number);
    return rgb[0] - rgb[2]; // red - blue = warmth
  };

  const handleGuess = (guess) => {
    const leftWarmth = perceivedWarmth(leftColor);
    const rightWarmth = perceivedWarmth(rightColor);
    const warmerSide = leftWarmth > rightWarmth ? 'left' : 'right';

    if (guess === warmerSide) {
      setScore(score + 1);
      setMessage('✅ Correct!');
    } else {
      setScore(0);
      setMessage('❌ Wrong! Try again.');
    }
  };

  useEffect(() => {
    generateNewRound();
  }, []);

  return (
    <div className="page-background">
      <div className="game-container">
        <h1>🎨 Warm vs Cool Color Game</h1>
        <p>Which side makes the center color look warmer?</p>

        <div className="color-display">
          <div className="color-box" style={{ backgroundColor: leftColor }}>
            <div className="inner-box" style={{ backgroundColor: centerColor }}>?</div>
          </div>
          <div className="color-box" style={{ backgroundColor: rightColor }}>
            <div className="inner-box" style={{ backgroundColor: centerColor }}>?</div>
          </div>
        </div>

        <div>
          <button className="left-button" onClick={() => handleGuess('left')}>Left</button>
          <button className="right-button" onClick={() => handleGuess('right')}>Right</button>
        </div>

        <p>Score: {score}</p>
        <p>{message}</p>
        <button className="next-button" onClick={generateNewRound}>🎲 Next Round</button>
      </div>
    </div>
  );
}

export default App;
