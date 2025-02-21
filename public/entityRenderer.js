const entityRenderer = {
    render: function(ctx, offsetX, offsetY, specks) {
        console.log('EntityRenderer: Rendering entities with offset:', { offsetX, offsetY });

        specks.forEach(speck => {
            const screenX = speck.x - offsetX, screenY = speck.y - offsetY;
            if (screenX >= 0 && screenX < ctx.canvas.width && screenY >= 0 && screenY < ctx.canvas.height) {
                console.log('EntityRenderer: Rendering speck at:', { screenX, screenY });
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
                console.log('EntityRenderer: Rendering item:', item.type, 'at', { screenX, screenY });
                if (item.type === 'armor') drawArmorItem(ctx, screenX, screenY);
                else if (item.type === 'sword') drawSword(ctx, screenX, screenY, 0);
            }
        });

        console.log({Monsters})
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