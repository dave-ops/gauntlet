function startGameLoop(ctx) { // Accept ctx as a parameter
    function loop() {
        if (!GameLogic.verifyState()) return;
        const biome = Biome.getBiome(Player.x, Player.y);
        ctx.fillStyle = biome.color;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        GameLogic.update();
        const offset = World.getOffset();
        entityRenderer.render(ctx, offset.x, offset.y, World.getSpecks());
        requestAnimationFrame(loop);
    }
    loop();
}