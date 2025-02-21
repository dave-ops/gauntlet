function startGameLoop(ctx) {
    function loop() {
        if (!GameLogic.verifyState()) return;
        const biome = Biome.getBiome(player.x, player.y);
        ctx.fillStyle = biome.color;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        GameLogic.update();
        const offset = World.getOffset();
        render(ctx, offset.x, offset.y, World.getSpecks());
        requestAnimationFrame(loop);
    }
    loop();
}

// Start the game when the script loads
startGameLoop(ctx);