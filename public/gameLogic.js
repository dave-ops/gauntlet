const GameLogic = {
    update: function() {
        console.log('GameLogic update called');

        this.updatePosition();
        this.updateMonsters();
        this.checkCollisions();
        this.checkMonsterCollisions();
    },

    updatePosition: function() {
        console.log('Updating player position');

        Player.isMoving = false;
        if (Input.isKeyDown('ArrowUp')) { World.updateOffset(0, -3); Player.isMoving = true; }
        if (Input.isKeyDown('ArrowDown')) { World.updateOffset(0, 3); Player.isMoving = true; }
        if (Input.isKeyDown('ArrowLeft')) { World.updateOffset(-3, 0); Player.isMoving = true; }
        if (Input.isKeyDown('ArrowRight')) { World.updateOffset(3, 0); Player.isMoving = true; }
        console.log('Player movement state:', Player.isMoving);

        if (Player.isMoving) Player.legAngle += 0.2;
        else Player.legAngle = Math.sin(Player.legAngle) * 0.1;
        console.log('Player leg angle updated:', Player.legAngle);

        AudioManager.playStepSound();
        console.log('Step sound played (if moving)');
    },

    updateMonsters: function() {
        console.log('Updating monsters');

        Monsters.forEach(monster => {
            if (!monster.defeated && monster.type === 'kobold') {
                monster.x += monster.speed * monster.direction;
                if (monster.x <= 325) monster.direction = 1;
                if (monster.x >= 375) monster.direction = -1;
            }
        });
        console.log('Monsters updated, kobold x:', Monsters[0].x);
    },

    checkCollisions: function() {
        console.log('Checking item collisions');

        const playerBounds = { left: Player.x - 15, right: Player.x + 15, top: Player.y - 10, bottom: Player.y + 60 };
        const offset = World.getOffset();
        console.log('Player bounds:', playerBounds, 'World offset:', offset);

        Items.forEach(item => {
            if (!item.collected) {
                const screenX = item.x - offset.x, screenY = item.y - offset.y;
                const itemBounds = item.getBounds(screenX, screenY);
                console.log('Checking item:', item.type, 'at', { screenX, screenY }, 'Bounds:', itemBounds);
                if (playerBounds.right > itemBounds.left && playerBounds.left < itemBounds.right &&
                    playerBounds.bottom > itemBounds.top && playerBounds.top < itemBounds.bottom) {
                    console.log('Collision detected with item:', item.type, 'before collection');
                    if ((item.type === 'armor' && Math.abs(item.x - (Player.x + offset.x)) < 50) || 
                        (item.type === 'sword' && Math.abs(item.x - (Player.x + offset.x)) < 50)) {
                        item.collected = true;
                        if (item.type === 'armor') {
                            console.log('Attempting to set Player.hasArmor to true');
                            Player.hasArmor = true;
                            console.log('Player.hasArmor set to:', Player.hasArmor);
                        }
                        if (item.type === 'sword') {
                            console.log('Attempting to set Player.hasSword to true');
                            Player.hasSword = true;
                            console.log('Player.hasSword set to:', Player.hasSword);
                        }
                        console.log('Item collected:', item.type, 'Player state:', { hasArmor: Player.hasArmor, hasSword: Player.hasSword });
                    }
                }
            }
        });
    },

    checkMonsterCollisions: function() {
        console.log('Checking monster collisions');

        const playerBounds = { left: Player.x - 15, right: Player.x + 15, top: Player.y - 10, bottom: Player.y + 60 };
        const offset = World.getOffset();
        console.log('Player bounds:', playerBounds, 'World offset:', offset);

        Monsters.forEach(monster => {
            if (!monster.defeated) {
                const screenX = monster.x - offset.x, screenY = monster.y - offset.y;
                const monsterBounds = monster.getBounds(screenX, screenY);
                console.log('Checking monster:', monster.type, 'at', { screenX, screenY }, 'Bounds:', monsterBounds);
                if (playerBounds.right > monsterBounds.left && playerBounds.left < monsterBounds.right &&
                    playerBounds.bottom > monsterBounds.top && playerBounds.top < monsterBounds.bottom) {
                    console.log('Collision detected with monster:', monster.type);
                    monster.defeated = true;
                }
            }
        });
    },

    verifyState: function() {
        console.log('Verifying game state, Player.hasArmor:', Player.hasArmor, 'Player.hasSword:', Player.hasSword, 'Monster defeated:', Monsters[0].defeated);

        const state = `${Player.hasArmor}-${Player.hasSword}-${Monsters[0].defeated}`;
        const hash = btoa(state);
        if (sessionStorage.getItem('gameState') && sessionStorage.getItem('gameState') !== hash) {
            // Check if the change is a normal gameplay action (e.g., collecting armor, sword, or defeating monster)
            const prevState = atob(sessionStorage.getItem('gameState') || '').split('-');
            const currentState = state.split('-');
            const armorChanged = prevState[0] === 'false' && currentState[0] === 'true'; // Armor collected
            const swordChanged = prevState[1] === 'false' && currentState[1] === 'true'; // Sword collected
            const monsterDefeated = prevState[2] === 'false' && currentState[2] === 'true'; // Monster defeated

            if (armorChanged || swordChanged || monsterDefeated) {
                console.log('Normal state change detected (e.g., armor/sword collected or monster defeated), updating hash');
                sessionStorage.setItem('gameState', hash);
                return true;
            }
            console.warn('State tampered! Resetting...', 'Previous state:', prevState, 'Current state:', currentState);
            return false;
        }
        console.log('State verified, hash:', hash, 'Player state:', { hasArmor: Player.hasArmor, hasSword: Player.hasSword });
        sessionStorage.setItem('gameState', hash);
        return true;
    }
};