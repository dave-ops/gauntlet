// music.js
const MusicPlayer = (function() {
    let audioCtx = null;
    let isPlaying = false;

    // Note object to represent a single beep or boop
    function Note(frequency, duration, type = 'square') {
        this.frequency = frequency; // Frequency in Hz (e.g., 440 for A4)
        this.duration = duration;   // Duration in seconds (e.g., 0.2)
        this.type = type;          // Waveform type ('sine', 'square', 'triangle', 'sawtooth')
    }

    function ensureAudioContext() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        return audioCtx;
    }

    function playNote(note) {
        const ctx = ensureAudioContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.type = note.type;
        oscillator.frequency.setValueAtTime(note.frequency, ctx.currentTime);
        gainNode.gain.setValueAtTime(0.1, ctx.currentTime); // Quiet volume for chiptune style

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.start();
        oscillator.stop(ctx.currentTime + note.duration);
    }

    // Create a music collection (array of Note objects) for an adventuring tune
    const adventureMusicCollection = [
        new Note(440, 0.2, 'square'),  // A4 (short beep)
        new Note(523, 0.2, 'square'),  // C5 (short beep)
        new Note(659, 0.2, 'square'),  // E5 (short beep)
        new Note(784, 0.2, 'square'),  // G5 (short beep)
        new Note(659, 0.4, 'square'),  // E5 (longer beep)
        new Note(523, 0.2, 'square'),  // C5 (short beep)
        new Note(440, 0.6, 'square')   // A4 (longer beep)
    ];

    function playMusicCollection(collection) {
        if (isPlaying) return; // Prevent overlapping
        isPlaying = true;

        let time = 0;
        collection.forEach(note => {
            setTimeout(() => playNote(note), time * 1000);
            time += note.duration;
        });

        // Loop the music after a delay (e.g., 2.6 seconds total + 1-second pause)
        setTimeout(() => {
            isPlaying = false;
            playMusicCollection(collection); // Restart the music
        }, time * 1000 + 1000);
    }

    // Start music on user interaction (e.g., keypress) to comply with browser policies
    window.addEventListener('keydown', () => {
        if (!isPlaying) playMusicCollection(adventureMusicCollection);
    }, { once: true });

    return {
        playMusicCollection, // Expose for manual control if needed
        Note,               // Expose Note object for creating custom collections
        adventureMusicCollection // Expose the default collection for reference
    };
})();