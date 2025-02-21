const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const speed = 3;

// World offset
let worldOffsetX = 0;
let worldOffsetY = 0;

// Input handling
const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
};

window.addEventListener('keydown', (e) => {
    if (e.key in keys) keys[e.key] = true;
});
window.addEventListener('keyup', (e) => {
    if (e.key in keys) keys[e.key] = false;
});

// Audio setup
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let lastStepTime = 0;
const stepCooldown = 200; // ms between steps

function playStepSound() {
    const now = Date.now();
    if (now - lastStepTime < stepCooldown) return; // Prevent spam

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'square'; // Retro step sound
    oscillator.frequency.setValueAtTime(100, audioCtx.currentTime); // Low pitch
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime); // Quiet volume

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.05); // 50ms duration

    lastStepTime = now;
}

// Generate specks
const specks = [];
for (let i = 0; i < 200; i++) {
    const x = Math.random() * 800;
    const y = Math.random() * 800;
    let color;
    if (x < 400 && y < 400) color = '#228B22';
    else if (x >= 400 && x < 800 && y < 400) color = '#F0F0F0';
    else if (x < 400 && y >= 400) color = '#4682B4';
    specks.push({ x, y, color });
}

function getBiome(x, y) {
    const worldX = x + worldOffsetX;
    const worldY = y + worldOffsetY;

    if (worldX >= 0 && worldX < 400 && worldY >= 0 && worldY < 400) {
        return { name: 'grass', color: '#32CD32' };
    } else if (worldX >= 400 && worldX < 800 && worldY >= 0 && worldY < 400) {
        return { name: 'snow', color: '#FFFFFF' };
    } else if (worldX >= 0 && worldX < 400 && worldY >= 400 && worldY < 800) {
        return { name: 'water', color: '#00B7EB' };
    }
    return { name: 'grass', color: '#32CD32' };
}

function updatePosition() {
    player.isMoving = false;

    if (keys.ArrowUp) {
        worldOffsetY -= speed;
        player.isMoving = true;
    }
    if (keys.ArrowDown) {
        worldOffsetY += speed;
        player.isMoving = true;
    }
    if (keys.ArrowLeft) {
        worldOffsetX -= speed;
        player.isMoving = true;
    }
    if (keys.ArrowRight) {
        worldOffsetX += speed;
        player.isMoving = true;
    }

    if (player.isMoving) {
        player.legAngle += 0.2;
        playStepSound(); // Play sound when moving
    } else {
        player.legAngle = Math.sin(player.legAngle) * 0.1;
    }

    updateMonsters();
    checkCollisions();
    checkMonsterCollisions();
}

function updateMonsters() {
    monsters.forEach(monster => {
        if (!monster.defeated && monster.type === 'kobold') {
            monster.x += monster.speed * monster.direction;
            if (monster.x <= 325) monster.direction = 1;
            if (monster.x >= 375) monster.direction = -1;
        }
    });
}

function checkCollisions() {
    const playerBounds = { left: player.x - 15, right: player.x + 15, top: player.y - 10, bottom: player.y + 60 };

    items.forEach(item => {
        if (!item.collected) {
            const itemScreenX = item.x - worldOffsetX;
            const itemScreenY = item.y - worldOffsetY;
            const itemBounds = item.getBounds(itemScreenX, itemScreenY);
            if (
                playerBounds.right > itemBounds.left &&
                playerBounds.left < itemBounds.right &&
                playerBounds.bottom > itemBounds.top &&
                playerBounds.top < itemBounds.bottom
            ) {
                item.collected = true;
                if (item.type === 'armor') player.hasArmor = true;
                if (item.type === 'sword') player.hasSword = true;
            }
        }
    });
}

function checkMonsterCollisions() {
    const playerBounds = { left: player.x - 15, right: player.x + 15, top: player.y - 10, bottom: player.y + 60 };

    monsters.forEach(monster => {
        if (!monster.defeated) {
            const monsterScreenX = monster.x - worldOffsetX;
            const monsterScreenY = monster.y - worldOffsetY;
            const monsterBounds = monster.getBounds(monsterScreenX, monsterScreenY);
            if (
                playerBounds.right > monsterBounds.left &&
                playerBounds.left < monsterBounds.right &&
                playerBounds.bottom > monsterBounds.top &&
                playerBounds.top < monsterBounds.bottom
            ) {
                monster.defeated = true;
            }
        }
    });
}

function animate() {
    const biome = getBiome(player.x, player.y);
    ctx.fillStyle = biome.color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    updatePosition();
    render(ctx, worldOffsetX, worldOffsetY, specks);
    requestAnimationFrame(animate);
}

animate();