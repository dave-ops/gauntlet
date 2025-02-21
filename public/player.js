const player = {
    x: 200, // Centered
    y: 200,
    legAngle: 0,
    isMoving: false,
    hasArmor: false,
    hasSword: false
};

function drawPerson(ctx, x, y) {
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
    if (player.hasSword) {
        ctx.lineTo(x + 25, y + 30);
        drawSword(ctx, x + 25, y + 30, Math.PI / 4);
    }
    ctx.stroke();
    ctx.closePath();

    const legBaseY = y + 40;
    const legLength = 20;
    const maxSwing = 10;
    let leftLegX = x - maxSwing * Math.sin(player.legAngle);
    let rightLegX = x + maxSwing * Math.sin(player.legAngle);
    let leftLegY = legBaseY + legLength;
    let rightLegY = legBaseY + legLength;

    ctx.beginPath();
    ctx.moveTo(x, legBaseY);
    ctx.lineTo(leftLegX, leftLegY);
    ctx.moveTo(x, legBaseY);
    ctx.lineTo(rightLegX, rightLegY);
    ctx.stroke();
    ctx.closePath();
}

function drawArmorSprite(ctx, x, y) {
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

    const armBaseY = y + 20;
    const armLength = 18;
    const armSwing = 5;
    let leftArmX = x - armLength + armSwing * Math.sin(player.legAngle);
    let rightArmX = x + armLength - armSwing * Math.sin(player.legAngle);

    ctx.beginPath();
    ctx.moveTo(x - 15, armBaseY);
    ctx.lineTo(leftArmX, armBaseY + 10);
    ctx.moveTo(x + 15, armBaseY);
    ctx.lineTo(rightArmX, armBaseY + 10);
    if (player.hasSword) {
        drawSword(ctx, rightArmX, armBaseY + 10, Math.PI / 4);
    }
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#A9A9A9';
    ctx.stroke();
    ctx.closePath();

    const legBaseY = y + 40;
    const legLength = 25;
    const maxSwing = 12;
    let leftLegX = x - maxSwing * Math.sin(player.legAngle);
    let rightLegX = x + maxSwing * Math.sin(player.legAngle);
    let leftLegY = legBaseY + legLength;
    let rightLegY = legBaseY + legLength;

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