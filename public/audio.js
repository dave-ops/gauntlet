const AudioManager = (function() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let lastStepTime = 0;
    const stepCooldown = 200;
    function playStepSound() {
        const now = Date.now();
        if (now - lastStepTime < stepCooldown) return;
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(100, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.05);
        lastStepTime = now;
    }
    return { playStepSound };
})();