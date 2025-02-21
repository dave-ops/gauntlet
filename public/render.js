function render(ctx, worldOffsetX, worldOffsetY) {
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

    // Draw player
    if (player.hasArmor) {
        drawArmorSprite(ctx, player.x, player.y);
    } else {
        drawPerson(ctx, player.x, player.y);
    }
}