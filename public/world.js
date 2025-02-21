const World = (function() {
    console.log('World module loaded');
    let offsetX = 400 - 200, offsetY = 400 - 200; // Center player at (400,400), scaled by 50% (original player at 200,200 in 800x800 world)
    const specks = [];
    for (let i = 0; i < 200; i++) {
        const x = Math.random() * 1600, y = Math.random() * 1600; // Double the world size (1600x1600) to scale down by 50%
        specks.push({ x, y, color: (x < 800 && y < 800) ? '#228B22' : (x >= 800 && x < 1600 && y < 800) ? '#F0F0F0' : '#4682B4' });
    }
    return {
        getOffset: () => ({ x: offsetX, y: offsetY }),
        updateOffset: (dx, dy) => { 
            offsetX += dx * 0.5; // Scale movement by 50% to reduce zoom
            offsetY += dy * 0.5; // Scale movement by 50% to reduce zoom
            console.log('World offset updated:', { offsetX, offsetY });
        },
        getSpecks: () => specks
    };
})();