const Monsters = (function() {
    console.log('Monsters module loaded');    
    let monsters = [
        { type: 'kobold', x: 350, y: 300, defeated: false, speed: 1, direction: 1 }
    ];
    const result = monsters.map(monster => ({
        type: monster.type,
        get x() { return monster.x; },
        set x(v) { monster.x = v; },
        y: monster.y,
        get defeated() { return monster.defeated; },
        set defeated(v) { monster.defeated = v; },
        speed: monster.speed,
        get direction() { return monster.direction; },
        set direction(v) { monster.direction = v; },
        getBounds: (screenX, screenY) => ({ left: screenX - 15, right: screenX + 20, top: screenY - 20, bottom: screenY + 35 })
    }));
    console.log({ result });
    return result;
})();

function drawKobold(ctx, x, y) {
    ctx.beginPath();
    ctx.ellipse(x, y - 10, 8, 10, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#8B4513';
    ctx.fill();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + 20);
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#8B4513';
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(x - 10, y + 5);
    ctx.lineTo(x + 10, y + 5);
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(x, y + 20);
    ctx.lineTo(x - 8, y + 35);
    ctx.moveTo(x, y + 20);
    ctx.lineTo(x + 8, y + 35);
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(x, y + 20);
    ctx.lineTo(x - 15, y + 30);
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(x + 10, y + 5);
    ctx.lineTo(x + 20, y - 10);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#808080';
    ctx.stroke();
    ctx.closePath();
}

function drawTroglodyte(ctx, x, y) {
    // Define the cell size (20x20 pixels to match your sprite creator)
    const cellSize = 20;
    
    // Draw the stick figure (brown, #8B4513)
    ctx.strokeStyle = '#8B4513'; // Brown for the body
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';

    // Head (small circle)
    ctx.beginPath();
    ctx.arc(x, y - 2 * cellSize, cellSize / 2, 0, Math.PI * 2);
    ctx.fillStyle = '#8B4513';
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    // Body (vertical line)
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + 3 * cellSize);
    ctx.stroke();
    ctx.closePath();

    // Arms (horizontal lines)
    ctx.beginPath();
    ctx.moveTo(x - cellSize, y + cellSize);
    ctx.lineTo(x + cellSize, y + cellSize);
    ctx.stroke();
    ctx.closePath();

    // Legs (diagonal lines)
    ctx.beginPath();
    ctx.moveTo(x, y + 3 * cellSize);
    ctx.lineTo(x - cellSize, y + 5 * cellSize);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(x, y + 3 * cellSize);
    ctx.lineTo(x + cellSize, y + 5 * cellSize);
    ctx.stroke();
    ctx.closePath();

    // Sword (grey, #808080, simple line and triangle for blade)
    ctx.strokeStyle = '#808080'; // Grey for the sword
    ctx.lineWidth = 3;

    // Sword handle (vertical line from right hand)
    ctx.beginPath();
    ctx.moveTo(x + cellSize, y + cellSize);
    ctx.lineTo(x + 2 * cellSize, y + cellSize);
    ctx.stroke();
    ctx.closePath();

    // Sword blade (diagonal line for simplicity)
    ctx.beginPath();
    ctx.moveTo(x + 2 * cellSize, y + cellSize);
    ctx.lineTo(x + 3 * cellSize, y);
    ctx.stroke();
    ctx.closePath();
}