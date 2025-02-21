const items = (function() {
    let i = [
        { t: 'a', x: 300, y: 100, c: false },
        { t: 's', x: 450, y: 200, c: false }
    ];
    return i.map(it => ({
        t: it.t,
        x: it.x,
        y: it.y,
        get c() { return it.c; },
        set c(v) { it.c = v; },
        gB: (sx, sy) => it.t === 'a' ? { l: sx - 12, r: sx + 12, t: sy - 10, b: sy + 15 } : { l: sx - 5, r: sx + 20, t: sy - 5, b: sy + 5 }
    }));
})();

const monsters = (function() {
    let m = [
        { t: 'k', x: 350, y: 300, d: false, s: 1, dn: 1 }
    ];
    return m.map(mn => ({
        t: mn.t,
        get x() { return mn.x; },
        set x(v) { mn.x = v; },
        y: mn.y,
        get d() { return mn.d; },
        set d(v) { mn.d = v; },
        s: mn.s,
        get dn() { return mn.dn; },
        set dn(v) { mn.dn = v; },
        gB: (sx, sy) => ({ l: sx - 15, r: sx + 20, t: sy - 20, b: sy + 35 })
    }));
})();

function dAI(ctx, x, y) {
    ctx.beginPath();
    ctx.moveTo(x - 10, y - 10);
    ctx.lineTo(x + 10, y - 10);
    ctx.quadraticCurveTo(x + 12, y, x + 10, y + 15);
    ctx.lineTo(x - 10, y + 15);
    ctx.quadraticCurveTo(x - 12, y, x - 10, y - 10);
    ctx.fillStyle = '#A9A9A9';
    ctx.fill();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(x - 6, y);
    ctx.lineTo(x + 6, y);
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();
}

function dS(ctx, x, y, a) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(a);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(20, 0);
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#C0C0C0';
    ctx.stroke();
    ctx.moveTo(0, -5);
    ctx.lineTo(0, 5);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#808080';
    ctx.stroke();
    ctx.restore();
}

function dK(ctx, x, y) {
    ctx.beginPath();
    ctx.ellipse(x, y - 10, 8, 10, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#8B4513';
    ctx.fill();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + 20);
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#8B4513';
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(x - 10, y + 5);
    ctx.lineTo(x + 10, y + 5);
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(x, y + 20);
    ctx.lineTo(x - 8, y + 35);
    ctx.moveTo(x, y + 20);
    ctx.lineTo(x + 8, y + 35);
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(x, y + 20);
    ctx.lineTo(x - 15, y + 30);
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(x + 10, y + 5);
    ctx.lineTo(x + 20, y - 10);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#808080';
    ctx.stroke();
    ctx.closePath();
}