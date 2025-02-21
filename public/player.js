const player = (function() {
    let p = { x: 200, y: 200, lA: 0, m: false, hA: false, hS: false };
    return {
        x: p.x, // Read-only
        y: p.y,
        get lA() { return p.lA; },
        set lA(v) { p.lA = v; },
        get m() { return p.m; },
        set m(v) { p.m = v; },
        get hA() { return p.hA; },
        set hA(v) { p.hA = v; },
        get hS() { return p.hS; },
        set hS(v) { p.hS = v; }
    };
})();

function dP(ctx, x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = '#FFD700';
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(x, y + 10);
    ctx.lineTo(x, y + 40);
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#0000FF';
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(x - 15, y + 20);
    ctx.lineTo(x + 15, y + 20);
    if (player.hS) {
        ctx.lineTo(x + 25, y + 30);
        drawSword(ctx, x + 25, y + 30, Math.PI / 4);
    }
    ctx.stroke();
    ctx.closePath();

    const lb = y + 40, ll = 20, ms = 10;
    let llx = x - ms * Math.sin(player.lA), rlx = x + ms * Math.sin(player.lA);
    let lly = lb + ll, rly = lb + ll;

    ctx.beginPath();
    ctx.moveTo(x, lb);
    ctx.lineTo(llx, lly);
    ctx.moveTo(x, lb);
    ctx.lineTo(rlx, rly);
    ctx.stroke();
    ctx.closePath();
}

function dA(ctx, x, y) {
    ctx.beginPath();
    ctx.moveTo(x - 12, y - 15);
    ctx.lineTo(x + 12, y - 15);
    ctx.quadraticCurveTo(x + 15, y, x + 12, y + 10);
    ctx.lineTo(x - 12, y + 10);
    ctx.quadraticCurveTo(x - 15, y, x - 12, y - 15);
    ctx.fillStyle = '#A9A9A9';
    ctx.fill();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(x - 8, y - 5);
    ctx.lineTo(x + 8, y - 5);
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(x - 15, y + 10);
    ctx.lineTo(x + 15, y + 10);
    ctx.lineTo(x + 20, y + 40);
    ctx.lineTo(x - 20, y + 40);
    ctx.fillStyle = '#A9A9A9';
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    const ab = y + 20, al = 18, as = 5;
    let lax = x - al + as * Math.sin(player.lA), rax = x + al - as * Math.sin(player.lA);

    ctx.beginPath();
    ctx.moveTo(x - 15, ab);
    ctx.lineTo(lax, ab + 10);
    ctx.moveTo(x + 15, ab);
    ctx.lineTo(rax, ab + 10);
    if (player.hS) drawSword(ctx, rax, ab + 10, Math.PI / 4);
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#A9A9A9';
    ctx.stroke();
    ctx.closePath();

    const lb = y + 40, ll = 25, ms = 12;
    let llx = x - ms * Math.sin(player.lA), rlx = x + ms * Math.sin(player.lA);
    let lly = lb + ll, rly = lb + ll;

    ctx.beginPath();
    ctx.moveTo(x - 10, lb);
    ctx.lineTo(llx, lly);
    ctx.moveTo(x + 10, lb);
    ctx.lineTo(rlx, rly);
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#A9A9A9';
    ctx.stroke();
    ctx.closePath();
}