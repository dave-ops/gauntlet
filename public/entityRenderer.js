const entityRenderer = {
    render: function(ctx, offsetX, offsetY, specks) {
        console.log('EntityRenderer: Rendering entities with offset:', { offsetX, offsetY }, 'Player.hasArmor:', Player.hasArmor, 'Game State:', GameLogic.gameState, 'Canvas Dimensions:', { width: 800, height: 800 });

        // Clear canvas or show game over/win if not playing
        if (GameLogic.gameState !== 'playing') {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, 800, 800);
            ctx.fillStyle = 'white';
            ctx.font = '30px Arial'; // Fixed font size for consistency
            ctx.textAlign = 'center';
            ctx.fillText(GameLogic.gameState === 'gameOver' ? 'Game Over' : 'You Win', 400, 400); // Center at 400,400 for 800x800
            return; // Exit rendering for entities
        }

        specks.forEach(speck => {
            const screenX = speck.x - offsetX, screenY = speck.y - offsetY;
            if (screenX >= 0 && screenX < 800 && screenY >= 0 && screenY < 800) {
                console.log('EntityRenderer: Rendering speck at:', { screenX, screenY });
                ctx.beginPath();
                ctx.arc(screenX, screenY, 2, 0, Math.PI * 2); // Fixed speck size
                ctx.fillStyle = speck.color;
                ctx.fill();
                ctx.closePath();
            }
        });

        Items.forEach(item => {
            if (!item.collected) {
                const screenX = item.x - offsetX, screenY = item.y - offsetY;
                console.log('EntityRenderer: Rendering item:', item.type, 'at', { screenX, screenY });
                if (item.type === 'armor') drawArmorItem(ctx, screenX, screenY);
                else if (item.type === 'sword') drawSword(ctx, screenX, screenY, 0);
            }
        });

        Monsters.forEach(monster => {
            if (!monster.defeated) {
                const screenX = monster.x - offsetX, screenY = monster.y - offsetY;
                console.log('EntityRenderer: Rendering monster:', monster.type, 'at', { screenX, screenY });
                if (monster.type === 'kobold') drawKobold(ctx, screenX, screenY);
            }
        });

        console.log('EntityRenderer: Rendering player, hasArmor:', Player.hasArmor);
        if (Player.hasArmor) drawArmoredPlayer(ctx, Player.x, Player.y);
        else drawStickFigure(ctx, Player.x, Player.y);
    }
};

// Helper functions (revert to original, unscaled versions)
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