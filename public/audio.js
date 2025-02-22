let audioCtx = null;

const AudioManager = (function() {
    console.log('Audio module loaded');
    let lastStepTime = 0;
    const stepCooldown = 200;

    function ensureAudioContext() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        return audioCtx;
    }

    function playStepSound() {
        const now = Date.now();
        if (now - lastStepTime < stepCooldown) return;

        const ctx = ensureAudioContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(100, ctx.currentTime);
        gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        oscillator.start();
        oscillator.stop(ctx.currentTime + 0.05);
        lastStepTime = now;
    }

    // Ensure audio starts with a user gesture
    window.addEventListener('keydown', ensureAudioContext, { once: true });

    return { playStepSound };
})();