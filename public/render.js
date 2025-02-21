function r(ctx, ox, oy, s) {
    s.forEach(sp => {
        const sx = sp.x - ox, sy = sp.y - oy;
        if (sx >= 0 && sx < canvas.width && sy >= 0 && sy < canvas.height) {
            ctx.beginPath();
            ctx.arc(sx, sy, 2, 0, Math.PI * 2);
            ctx.fillStyle = sp.c;
            ctx.fill();
            ctx.closePath();
        }
    });

    items.forEach(i => {
        if (!i.c) {
            const sx = i.x - ox, sy = i.y - oy;
            if (i.t === 'a') dAI(ctx, sx, sy);
            else if (i.t === 's') dS(ctx, sx, sy, 0);
        }
    });

    monsters.forEach(m => {
        if (!m.d) {
            const sx = m.x - ox, sy = m.y - oy;
            if (m.t === 'k') dK(ctx, sx, sy);
        }
    });

    if (player.hA) dA(ctx, player.x, player.y);
    else dP(ctx, player.x, player.y);
}