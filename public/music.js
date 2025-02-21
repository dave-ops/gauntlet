// music.js
const MusicPlayer = (function() {
    let audioCtx = null;
    let isPlaying = {};

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

    // Base music collections (scalable for future additions)
    const musicCollections = {
        adventure: [
            new Note(440, 0.2, 'square'),  // A4
            new Note(523, 0.2, 'square'),  // C5
            new Note(659, 0.2, 'square'),  // E5
            new Note(784, 0.2, 'square'),  // G5
            new Note(659, 0.4, 'square'),  // E5 (longer)
            new Note(523, 0.2, 'square'),  // C5
            new Note(440, 0.6, 'square')   // A4 (longer)
        ],
        victory: [
            new Note(880, 0.3, 'square'),  // A5 (high, triumphant beep)
            new Note(1046, 0.3, 'square'), // C6 (higher beep)
            new Note(1318, 0.3, 'triangle'), // E6 (smooth, rising tone)
            new Note(1568, 0.5, 'square'), // G6 (long, victorious note)
            new Note(1318, 0.3, 'triangle') // E6 (smooth finish)
        ]
        // Add more collections (e.g., defeat, level-up) here for scalability
    };

    function playMusicCollection(collectionName, loop = false) {
        if (!musicCollections[collectionName]) {
            console.warn(`Music collection '${collectionName}' not found`);
            return;
        }
        if (isPlaying[collectionName]) return; // Prevent overlapping
        isPlaying[collectionName] = true;

        const collection = musicCollections[collectionName];
        let time = 0;
        collection.forEach(note => {
            setTimeout(() => playNote(note), time * 1000);
            time += note.duration;
        });

        if (loop) {
            // Loop the music after a delay (total duration + 1-second pause)
            setTimeout(() => {
                isPlaying[collectionName] = false;
                playMusicCollection(collectionName, loop);
            }, time * 1000 + 1000);
        } else {
            // Allow replay after non-looping music finishes
            setTimeout(() => {
                isPlaying[collectionName] = false;
            }, time * 1000);
        }
    }

    // Start music on user interaction (e.g., keypress) for adventure theme
    window.addEventListener('keydown', () => {
        if (!isPlaying['adventure']) playMusicCollection('adventure', true); // Loop adventure music
    }, { once: true });

    // Expose methods for game integration
    return {
        playMusicCollection, // Play any collection (e.g., 'victory', 'adventure')
        Note,               // Create custom notes for new collections
        addMusicCollection: function(name, collection) {
            musicCollections[name] = collection;
            console.log(`Added new music collection: ${name}`);
        } // Scalable method to add new collections
    };
})();