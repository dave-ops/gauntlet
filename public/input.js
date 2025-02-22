const Input = (function() {
    console.log('Input module loaded');
    const keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };
    window.addEventListener('keydown', e => { if (e.key in keys) keys[e.key] = true; });
    window.addEventListener('keyup', e => { if (e.key in keys) keys[e.key] = false; });
    return {
        isKeyDown: (key) => keys[key] || false
    };
})();