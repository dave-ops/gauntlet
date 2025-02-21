const World = (function() {
    console.log('World module loaded');
    let offsetX = 0, offsetY = 0;
    const specks = [];
    for (let i = 0; i < 200; i++) {
        const x = Math.random() * 800, y = Math.random() * 800;
        specks.push({ x, y, color: (x < 400 && y < 400) ? '#228B22' : (x >= 400 && x < 800 && y < 400) ? '#F0F0F0' : '#4682B4' });
    }
    return {
        getOffset: () => ({ x: offsetX, y: offsetY }),
        updateOffset: (dx, dy) => { offsetX += dx; offsetY += dy; },
        getSpecks: () => specks
    };
})();