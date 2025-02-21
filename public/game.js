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
            // Patrol between x bounds (e.g., 325 to 375)
            monster.x += monster.speed * monster.direction;
            if (monster.x <= 325) monster.direction = 1; // Move right
            if (monster.x >= 375) monster.direction = -1; // Move left
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updatePosition();
    render(ctx, worldOffsetX, worldOffsetY);
    requestAnimationFrame(animate);
}

animate();