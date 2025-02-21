function startGameLoop(ctx) {
    console.log('Game loop started with ctx:', ctx);

    function loop() {
        console.log('Animation loop running...');

        if (!GameLogic.verifyState()) {
            console.log('State verification failed, stopping loop');
            return;
        }
        console.log('State verified, proceeding with rendering');

        const biome = Biome.getBiome(Player.x, Player.y);
        console.log('Biome determined:', biome);

        ctx.fillStyle = biome.color;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        console.log('Canvas filled with biome color:', biome.color);

        GameLogic.update();
        console.log('Game logic updated');

        const offset = World.getOffset();
        console.log('World offset:', offset);

        entityRenderer.render(ctx, offset.x, offset.y, World.getSpecks());
        console.log('Entities rendered');

        requestAnimationFrame(loop);
    }
    loop();
}