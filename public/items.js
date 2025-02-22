const Items = (function() {
    console.log('Items module loaded');
    let items = [
        { type: 'armor', x: 300, y: 100, collected: false },
        { type: 'sword', x: 450, y: 200, collected: false }
    ];
    return items.map(item => ({
        type: item.type,
        x: item.x,
        y: item.y,
        get collected() { return item.collected; },
        set collected(v) { item.collected = v; },
        getBounds: (screenX, screenY) => item.type === 'armor' ? 
            { left: screenX - 12, right: screenX + 12, top: screenY - 10, bottom: screenY + 15 } : 
            { left: screenX - 5, right: screenX + 20, top: screenY - 5, bottom: screenY + 5 }
    }));
})();

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