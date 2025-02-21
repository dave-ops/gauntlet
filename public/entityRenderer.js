const entityRenderer = {
    render: function(ctx, offsetX, offsetY, specks) {
        specks.forEach(speck => {
            const screenX = speck.x - offsetX, screenY = speck.y - offsetY;
            if (screenX >= 0 && screenX < ctx.canvas.width && screenY >= 0 && screenY < ctx.canvas.height) {
                ctx.beginPath();
                ctx.arc(screenX, screenY, 2, 0, Math.PI * 2);
                ctx.fillStyle = speck.color;
                ctx.fill();
                ctx.closePath();
            }
        });

        Items.forEach(item => {
            if (!item.collected) {
                const screenX = item.x - offsetX, screenY = item.y - offsetY;
                if (item.type === 'armor') drawArmorItem(ctx, screenX, screenY);
                else if (item.type === 'sword') drawSword(ctx, screenX, screenY, 0);
            }
        });

        Monsters.forEach(monster => {
            if (!monster.defeated) {
                const screenX = monster.x - offsetX, screenY = monster.y - offsetY;
                if (monster.type === 'kobold') drawKobold(ctx, screenX, screenY);
            }
        });

        if (Player.hasArmor) drawArmoredPlayer(ctx, Player.x, Player.y);
        else drawStickFigure(ctx, Player.x, Player.y);
    }
};