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

    checkCollisions();
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

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updatePosition();
    render(ctx, worldOffsetX, worldOffsetY);
    requestAnimationFrame(animate);
}

animate();