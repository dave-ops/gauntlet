const GameLogic = (function() {
    function update() {
        updatePosition();
        updateMonsters();
        checkCollisions();
        checkMonsterCollisions();
    }

    function updatePosition() {
        player.isMoving = false;
        if (Input.isKeyDown('ArrowUp')) { World.updateOffset(0, -3); player.isMoving = true; }
        if (Input.isKeyDown('ArrowDown')) { World.updateOffset(0, 3); player.isMoving = true; }
        if (Input.isKeyDown('ArrowLeft')) { World.updateOffset(-3, 0); player.isMoving = true; }
        if (Input.isKeyDown('ArrowRight')) { World.updateOffset(3, 0); player.isMoving = true; }
        if (player.isMoving) player.legAngle += 0.2;
        else player.legAngle = Math.sin(player.legAngle) * 0.1;
        AudioManager.playStepSound();
    }

    function updateMonsters() {
        Monsters.forEach(monster => {
            if (!monster.defeated && monster.type === 'kobold') {
                monster.x += monster.speed * monster.direction;
                if (monster.x <= 325) monster.direction = 1;
                if (monster.x >= 375) monster.direction = -1;
            }
        });
    }

    function checkCollisions() {
        const playerBounds = { left: player.x - 15, right: player.x + 15, top: player.y - 10, bottom: player.y + 60 };
        const offset = World.getOffset();
        Items.forEach(item => {
            if (!item.collected) {
                const screenX = item.x - offset.x, screenY = item.y - offset.y;
                const itemBounds = item.getBounds(screenX, screenY);
                if (playerBounds.right > itemBounds.left && playerBounds.left < itemBounds.right &&
                    playerBounds.bottom > itemBounds.top && playerBounds.top < itemBounds.bottom) {
                    if ((item.type === 'armor' && Math.abs(item.x - (player.x + offset.x)) < 50) || 
                        (item.type === 'sword' && Math.abs(item.x - (player.x + offset.x)) < 50)) {
                        item.collected = true;
                        if (item.type === 'armor') player.hasArmor = true;
                        if (item.type === 'sword') player.hasSword = true;
                    }
                }
            }
        });
    }

    function checkMonsterCollisions() {
        const playerBounds = { left: player.x - 15, right: player.x + 15, top: player.y - 10, bottom: player.y + 60 };
        const offset = World.getOffset();
        Monsters.forEach(monster => {
            if (!monster.defeated) {
                const screenX = monster.x - offset.x, screenY = monster.y - offset.y;
                const monsterBounds = monster.getBounds(screenX, screenY);
                if (playerBounds.right > monsterBounds.left && playerBounds.left < monsterBounds.right &&
                    playerBounds.bottom > monsterBounds.top && playerBounds.top < monsterBounds.bottom) {
                    monster.defeated = true;
                }
            }
        });
    }

    function verifyState() {
        const state = `${player.hasArmor}-${player.hasSword}-${Monsters[0].defeated}`;
        const hash = btoa(state);
        if (sessionStorage.getItem('gameState') && sessionStorage.getItem('gameState') !== hash) {
            console.warn('State tampered! Resetting...');
            return false;
        }
        sessionStorage.setItem('gameState', hash);
        return true;
    }

    return { update, verifyState };
})();