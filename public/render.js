function render(ctx, worldOffsetX, worldOffsetY, specks) {
    // Draw specks
    specks.forEach(speck => {
        const screenX = speck.x - worldOffsetX;
        const screenY = speck.y - worldOffsetY;
        // Only draw if on-screen
        if (screenX >= 0 && screenX < canvas.width && screenY >= 0 && screenY < canvas.height) {
            ctx.beginPath();
            ctx.arc(screenX, screenY, 2, 0, Math.PI * 2); // Small dots
            ctx.fillStyle = speck.color;
            ctx.fill();
            ctx.closePath();
        }
    });

    // Draw items
    items.forEach(item => {
        if (!item.collected) {
            const screenX = item.x - worldOffsetX;
            const screenY = item.y - worldOffsetY;
            if (item.type === 'armor') {
                drawArmorItem(ctx, screenX, screenY);
            } else if (item.type === 'sword') {
                drawSword(ctx, screenX, screenY, 0);
            }
        }
    });

    // Draw monsters
    monsters.forEach(monster => {
        if (!monster.defeated) {
            const screenX = monster.x - worldOffsetX;
            const screenY = monster.y - worldOffsetY;
            if (monster.type === 'kobold') {
                drawKobold(ctx, screenX, screenY);
            }
        }
    });

    // Draw player
    if (player.hasArmor) {
        drawArmorSprite(ctx, player.x, player.y);
    } else {
        drawPerson(ctx, player.x, player.y);
    }
}