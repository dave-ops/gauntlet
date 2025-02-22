const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

console.log('Game initialization started');

const gameCore = (function() {
    const spd = 3;
    let wX = 0, wY = 0; // World offset
    const aud = new (window.AudioContext || window.webkitAudioContext)();
    let lstStp = 0, stpCd = 200;

    console.log('GameCore initialized');

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

console.log('Starting game loop with ctx:', ctx);

// Start the game loop with ctx
startGameLoop(ctx);