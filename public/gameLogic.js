const GameLogic = (function() {
    function update() {
        updatePosition();
        updateMonsters();
        checkCollisions();
        checkMonsterCollisions();
    }

    function updatePosition() {
        Player.isMoving = false;
        if (Input.isKeyDown('ArrowUp')) { World.updateOffset(0, -3); Player.isMoving = true; }
        if (Input.isKeyDown('ArrowDown')) { World.updateOffset(0, 3); Player.isMoving = true; }
        if (Input.isKeyDown('ArrowLeft')) { World.updateOffset(-3, 0); Player.isMoving = true; }
        if (Input.isKeyDown('ArrowRight')) { World.updateOffset(3, 0); Player.isMoving = true; }
        if (Player.isMoving) Player.legAngle += 0.2;
        else Player.legAngle = Math.sin(Player.legAngle) * 0.1;
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
        const playerBounds = { left: Player.x - 15, right: Player.x + 15, top: Player.y - 10, bottom: Player.y + 60 };
        const offset = World.getOffset();
        Items.forEach(item => {
            if (!item.collected) {
                const screenX = item.x - offset.x, screenY = item.y - offset.y;
                const itemBounds = item.getBounds(screenX, screenY);
                if (playerBounds.right > itemBounds.left && playerBounds.left < itemBounds.right &&
                    playerBounds.bottom > itemBounds.top && playerBounds.top < itemBounds.bottom) {
                    if ((item.type === 'armor' && Math.abs(item.x - (Player.x + offset.x)) < 50) || 
                        (item.type === 'sword' && Math.abs(item.x - (Player.x + offset.x)) < 50)) {
                        item.collected = true;
                        if (item.type === 'armor') Player.hasArmor = true;
                        if (item.type === 'sword') Player.hasSword = true;
                    }
                }
            }
        });
    }

    function checkMonsterCollisions() {
        const playerBounds = { left: Player.x - 15, right: Player.x + 15, top: Player.y - 10, bottom: Player.y + 60 };
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
        const state = `${Player.hasArmor}-${Player.hasSword}-${Monsters[0].defeated}`;
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