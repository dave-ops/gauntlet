const Player = (function() {
    console.log('Player module loaded');
    let state = { x: 200, y: 200, legAngle: 0, isMoving: false, hasArmor: false, hasSword: false };
    return {
        x: state.x,
        y: state.y,
        get legAngle() { return state.legAngle; },
        set legAngle(v) { state.legAngle = v; },
        get isMoving() { return state.isMoving; },
        set isMoving(v) { state.isMoving = v; },
        get hasArmor() { return state.hasArmor; },
        set hasArmor(v) { state.hasArmor = v; },
        get hasSword() { return state.hasSword; },
        set hasSword(v) { state.hasSword = v; }
    };
})();

function drawStickFigure(ctx, x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = '#FFD700';
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(x, y + 10);
    ctx.lineTo(x, y + 40);
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#0000FF';
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(x - 15, y + 20);
    ctx.lineTo(x + 15, y + 20);
    if (Player.hasSword) {
        ctx.lineTo(x + 25, y + 30);
        drawSword(ctx, x + 25, y + 30, Math.PI / 4);
    }
    ctx.stroke();
    ctx.closePath();

    const legBaseY = y + 40, legLength = 20, maxSwing = 10;
    let leftLegX = x - maxSwing * Math.sin(Player.legAngle);
    let rightLegX = x + maxSwing * Math.sin(Player.legAngle);
    let leftLegY = legBaseY + legLength, rightLegY = legBaseY + legLength;

    ctx.beginPath();
    ctx.moveTo(x, legBaseY);
    ctx.lineTo(leftLegX, leftLegY);
    ctx.moveTo(x, legBaseY);
    ctx.lineTo(rightLegX, rightLegY);
    ctx.stroke();
    ctx.closePath();
}

function drawArmoredPlayer(ctx, x, y) {
    ctx.beginPath();
    ctx.moveTo(x - 12, y - 15);
    ctx.lineTo(x + 12, y - 15);
    ctx.quadraticCurveTo(x + 15, y, x + 12, y + 10);
    ctx.lineTo(x - 12, y + 10);
    ctx.quadraticCurveTo(x - 15, y, x - 12, y - 15);
    ctx.fillStyle = '#A9A9A9';
    ctx.fill();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(x - 8, y - 5);
    ctx.lineTo(x + 8, y - 5);
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(x - 15, y + 10);
    ctx.lineTo(x + 15, y + 10);
    ctx.lineTo(x + 20, y + 40);
    ctx.lineTo(x - 20, y + 40);
    ctx.fillStyle = '#A9A9A9';
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    const armBaseY = y + 20, armLength = 18, armSwing = 5;
    let leftArmX = x - armLength + armSwing * Math.sin(Player.legAngle);
    let rightArmX = x + armLength - armSwing * Math.sin(Player.legAngle);

    ctx.beginPath();
    ctx.moveTo(x - 15, armBaseY);
    ctx.lineTo(leftArmX, armBaseY + 10);
    ctx.moveTo(x + 15, armBaseY);
    ctx.lineTo(rightArmX, armBaseY + 10);
    if (Player.hasSword) drawSword(ctx, rightArmX, armBaseY + 10, Math.PI / 4);
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#A9A9A9';
    ctx.stroke();
    ctx.closePath();

    const legBaseY = y + 40, legLength = 25, maxSwing = 12;
    let leftLegX = x - maxSwing * Math.sin(Player.legAngle);
    let rightLegX = x + maxSwing * Math.sin(Player.legAngle);
    let leftLegY = legBaseY + legLength, rightLegY = legBaseY + legLength;

    ctx.beginPath();
    ctx.moveTo(x - 10, legBaseY);
    ctx.lineTo(leftLegX, leftLegY);
    ctx.moveTo(x + 10, legBaseY);
    ctx.lineTo(rightLegX, rightLegY);
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#A9A9A9';
    ctx.stroke();
    ctx.closePath();
}