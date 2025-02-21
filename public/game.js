const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const gameCore = (function() {
    const spd = 3;
    let wX = 0, wY = 0; // World offset
    const aud = new (window.AudioContext || window.webkitAudioContext)();
    let lstStp = 0, stpCd = 200;

    // Speck generation
    const spks = [];
    for (let i = 0; i < 200; i++) {
        const x = Math.random() * 800, y = Math.random() * 800;
        spks.push({ x, y, c: (x < 400 && y < 400) ? '#228B22' : (x >= 400 && x < 800 && y < 400) ? '#F0F0F0' : '#4682B4' });
    }

    function playSnd() {
        const n = Date.now();
        if (n - lstStp < stpCd) return;
        const o = aud.createOscillator(), g = aud.createGain();
        o.type = 'square';
        o.frequency.setValueAtTime(100, aud.currentTime);
        g.gain.setValueAtTime(0.1, aud.currentTime);
        o.connect(g);
        g.connect(aud.destination);
        o.start();
        o.stop(aud.currentTime + 0.05);
        lstStp = n;
    }

    function biome(x, y) {
        const wx = x + wX, wy = y + wY;
        if (wx >= 0 && wx < 400 && wy >= 0 && wy < 400) return { n: 'g', c: '#32CD32' };
        if (wx >= 400 && wx < 800 && wy >= 0 && wy < 400) return { n: 's', c: '#FFFFFF' };
        if (wx >= 0 && wx < 400 && wy >= 400 && wy < 800) return { n: 'w', c: '#00B7EB' };
        return { n: 'g', c: '#32CD32' };
    }

    // Integrity check
    function verifyState(p, i, m) {
        const state = `${p.hA}-${p.hS}-${m[0].d}`;
        const hash = btoa(state);
        if (sessionStorage.getItem('gs') && sessionStorage.getItem('gs') !== hash) {
            console.warn('State tampered! Resetting...');
            return false; // Could reset game here
        }
        sessionStorage.setItem('gs', hash);
        return true;
    }

    return {
        gO: () => ({ x: wX, y: wY }),
        uO: (dx, dy) => { wX += dx; wY += dy; },
        gB: biome,
        pS: playSnd,
        gS: () => spks,
        vS: verifyState,
        spd: spd
    };
})();

// Input
const k = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };
window.addEventListener('keydown', e => { if (e.key in k) k[e.key] = true; });
window.addEventListener('keyup', e => { if (e.key in k) k[e.key] = false; });

function upd() {
    player.m = false;

    if (k.ArrowUp) { gameCore.uO(0, -gameCore.spd); player.m = true; }
    if (k.ArrowDown) { gameCore.uO(0, gameCore.spd); player.m = true; }
    if (k.ArrowLeft) { gameCore.uO(-gameCore.spd, 0); player.m = true; }
    if (k.ArrowRight) { gameCore.uO(gameCore.spd, 0); player.m = true; }

    if (player.m) {
        player.lA += 0.2;
        gameCore.pS();
    } else {
        player.lA = Math.sin(player.lA) * 0.1;
    }

    updM();
    chkC();
    chkMC();
}

function updM() {
    monsters.forEach(m => {
        if (!m.d && m.t === 'k') {
            m.x += m.s * m.dn;
            if (m.x <= 325) m.dn = 1;
            if (m.x >= 375) m.dn = -1;
        }
    });
}

function chkC() {
    const pB = { l: player.x - 15, r: player.x + 15, t: player.y - 10, b: player.y + 60 };
    const o = gameCore.gO();

    items.forEach(i => {
        if (!i.c) {
            const sx = i.x - o.x, sy = i.y - o.y;
            const iB = i.gB(sx, sy);
            if (pB.r > iB.l && pB.l < iB.r && pB.b > iB.t && pB.t < iB.b) {
                if ((i.t === 'a' && Math.abs(i.x - (player.x + o.x)) < 50) || 
                    (i.t === 's' && Math.abs(i.x - (player.x + o.x)) < 50)) {
                    i.c = true;
                    if (i.t === 'a') player.hA = true;
                    if (i.t === 's') player.hS = true;
                }
            }
        }
    });
}

function chkMC() {
    const pB = { l: player.x - 15, r: player.x + 15, t: player.y - 10, b: player.y + 60 };
    const o = gameCore.gO();

    monsters.forEach(m => {
        if (!m.d) {
            const sx = m.x - o.x, sy = m.y - o.y;
            const mB = m.gB(sx, sy);
            if (pB.r > mB.l && pB.l < mB.r && pB.b > mB.t && pB.t < mB.b) {
                m.d = true;
            }
        }
    });
}

function anim() {
    if (!gameCore.vS(player, items, monsters)) return; // Stop if tampered

    const b = gameCore.gB(player.x, player.y);
    ctx.fillStyle = b.c;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    upd();
    const o = gameCore.gO();
    r(ctx, o.x, o.y, gameCore.gS()); // Changed from 'render' to 'r'
    requestAnimationFrame(anim);
}

anim();