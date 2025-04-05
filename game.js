window.onload = function() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
  
    // Draw a red rectangle
    ctx.fillStyle = 'red';
    ctx.fillRect(50, 50, 200, 100);
  };
  