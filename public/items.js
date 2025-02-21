const items = [
    { type: 'armor', x: 300, y: 100, collected: false },
    { type: 'sword', x: 450, y: 200, collected: false }
];

const monsters = [
    { type: 'kobold', x: 350, y: 300, defeated: false }
];

function drawArmorItem(ctx, x, y) {
    ctx.beginPath();
    ctx.moveTo(x - 10, y - 10);
    ctx.lineTo(x + 10, y - 10);
    ctx.quadraticCurveTo(x + 12, y, x + 10, y + 15);
    ctx.lineTo(x - 10, y + 15);
    ctx.quadraticCurveTo(x - 12, y, x - 10, y - 10);
    ctx.fillStyle = '#A9A9A9';
    ctx.fill();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(x - 6, y);
    ctx.lineTo(x + 6, y);
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();
}

function drawSword(ctx, x, y, angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(20, 0);
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#C0C0C0';
    ctx.stroke();
    ctx.moveTo(0, -5);
    ctx.lineTo(0, 5);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#808080';
    ctx.stroke();
    ctx.restore();
}

function drawKobold(ctx, x, y) {
    // Head (small oval)
    ctx.beginPath();
    ctx.ellipse(x, y - 10, 8, 10, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#8B4513'; // Brown skin
    ctx.fill();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();

    // Body
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + 20);
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#8B4513';
    ctx.stroke();
    ctx.closePath();

    // Arms
    ctx.beginPath();
    ctx.moveTo(x - 10, y + 5);
    ctx.lineTo(x + 10, y + 5);
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.closePath();

    // Legs
    ctx.beginPath();
    ctx.moveTo(x, y + 20);
    ctx.lineTo(x - 8, y + 35);
    ctx.moveTo(x, y + 20);
    ctx.lineTo(x + 8, y + 35);
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.closePath();

    // Tail
    ctx.beginPath();
    ctx.moveTo(x, y + 20);
    ctx.lineTo(x - 15, y + 30);
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    // Spear
    ctx.beginPath();
    ctx.moveTo(x + 10, y + 5);
    ctx.lineTo(x + 20, y - 10);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#808080';
    ctx.stroke();
    ctx.closePath();
}

items.forEach(item => {
    item.getBounds = (screenX, screenY) => {
        if (item.type === 'armor') {
            return { left: screenX - 12, right: screenX + 12, top: screenY - 10, bottom: screenY + 15 };
        } else if (item.type === 'sword') {
            return { left: screenX - 5, right: screenX + 20, top: screenY - 5, bottom: screenY + 5 };
        }
    };
});

monsters.forEach(monster => {
    monster.getBounds = (screenX, screenY) => {
        if (monster.type === 'kobold') {
            return { left: screenX - 15, right: screenX + 20, top: screenY - 20, bottom: screenY + 35 };
        }
    };
});