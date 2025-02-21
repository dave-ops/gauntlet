function startGameLoop(ctx) {
    const dpr = window.devicePixelRatio || 1; // Get device pixel ratio for high-DPI screens
    const canvas = ctx.canvas;
    canvas.width = 800 * dpr; // Physical pixel width for sharpness
    canvas.height = 800 * dpr; // Physical pixel height for sharpness
    ctx.scale(dpr, dpr); // Scale context for logical 800x800

    console.log('Game loop started with ctx:', ctx, 'Device Pixel Ratio:', dpr, 'Canvas Size:', { width: canvas.width, height: canvas.height });

    function loop() {
        console.log('Animation loop running...', 'Player.hasArmor:', Player.hasArmor, 'Game State:', GameLogic.gameState, 'Player Position (Scaled):', { x: Player.x * 0.5, y: Player.y * 0.5 });

        if (GameLogic.gameState !== 'playing') {
            if (GameLogic.gameState === 'gameOver') {
                console.log('Game Over: Player lost');
            } else if (GameLogic.gameState === 'won') {
                console.log('You Win: Player defeated the kobold with armor and sword');
            }
            return; // Stop the loop if game is over or won
        }

        console.log('Proceeding with rendering (verifyState disabled)');

        const biome = Biome.getBiome(Player.x, Player.y);
        console.log('Biome determined:', biome);

        ctx.fillStyle = biome.color;
        ctx.fillRect(0, 0, 800, 800); // Fixed 800x800 logical size
        console.log('Canvas filled with biome color:', biome.color, 'Dimensions:', { width: 800, height: 800 });

        GameLogic.update();
        console.log('Game logic updated');

        const offset = World.getOffset();
        console.log('World offset (Scaled):', { x: offset.x, y: offset.y });

        entityRenderer.render(ctx, offset.x, offset.y, World.getSpecks());
        console.log('Entities rendered');

        requestAnimationFrame(loop);
    }
    loop();
}