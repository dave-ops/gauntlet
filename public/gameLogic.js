const GameLogic = {
    gameState: 'playing', // 'playing', 'gameOver', or 'won'

    update: function() {
        console.log('GameLogic update called, Game State:', this.gameState);

        if (this.gameState !== 'playing') return; // Stop updates if game is over or won

        this.updatePosition();
        this.updateMonsters();
        this.checkCollisions();
        this.checkMonsterCollisions();
    },

    updatePosition: function() {
        console.log('Updating player position');

        Player.isMoving = false;
        if (Input.isKeyDown('ArrowUp')) { World.updateOffset(0, -3 * 0.5); Player.isMoving = true; } // Scale movement by 50%
        if (Input.isKeyDown('ArrowDown')) { World.updateOffset(0, 3 * 0.5); Player.isMoving = true; } // Scale movement by 50%
        if (Input.isKeyDown('ArrowLeft')) { World.updateOffset(-3 * 0.5, 0); Player.isMoving = true; } // Scale movement by 50%
        if (Input.isKeyDown('ArrowRight')) { World.updateOffset(3 * 0.5, 0); Player.isMoving = true; } // Scale movement by 50%
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
                monster.x += monster.speed * monster.direction * 0.5; // Scale movement by 50%
                if (monster.x <= 325 * 0.5) monster.direction = 1; // Scale kobold bounds by 50%
                if (monster.x >= 375 * 0.5) monster.direction = -1; // Scale kobold bounds by 50%
            }
        });
        console.log('Monsters updated, kobold x:', Monsters[0].x);
    },

    checkCollisions: function() {
        console.log('Checking item collisions');

        const playerBounds = { 
            left: Player.x - 15 * 0.5, right: Player.x + 15 * 0.5, 
            top: Player.y - 10 * 0.5, bottom: Player.y + 60 * 0.5 
        }; // Scale player bounds by 50%
        const offset = World.getOffset();
        console.log('Player bounds:', playerBounds, 'World offset:', offset);

        Items.forEach(item => {
            if (!item.collected) {
                const screenX = (item.x - offset.x) * 0.5, screenY = (item.y - offset.y) * 0.5; // Scale item positions by 50%
                const itemBounds = item.getBounds(screenX, screenY);
                console.log('Checking item:', item.type, 'at', { screenX, screenY }, 'Bounds:', itemBounds);
                if (playerBounds.right > itemBounds.left && playerBounds.left < itemBounds.right &&
                    playerBounds.bottom > itemBounds.top && playerBounds.top < itemBounds.bottom) {
                    console.log('Collision detected with item:', item.type, 'before collection');
                    if ((item.type === 'armor' && Math.abs(item.x - (Player.x + offset.x)) < 50 * 0.5) || 
                        (item.type === 'sword' && Math.abs(item.x - (Player.x + offset.x)) < 50 * 0.5)) { // Scale proximity by 50%
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
                        MusicPlayer.playMusicCollection('victory'); // Play victory music on item collection
                    }
                }
            }
        });
    },

    checkMonsterCollisions: function() {
        console.log('Checking monster collisions');

        const playerBounds = { 
            left: Player.x - 15 * 0.5, right: Player.x + 15 * 0.5, 
            top: Player.y - 10 * 0.5, bottom: Player.y + 60 * 0.5 
        }; // Scale player bounds by 50%
        const offset = World.getOffset();
        console.log('Player bounds:', playerBounds, 'World offset:', offset);

        Monsters.forEach(monster => {
            if (!monster.defeated && this.gameState === 'playing') {
                const screenX = (monster.x - offset.x) * 0.5, screenY = (monster.y - offset.y) * 0.5; // Scale monster positions by 50%
                const monsterBounds = monster.getBounds(screenX, screenY);
                console.log('Checking monster:', monster.type, 'at', { screenX, screenY }, 'Bounds:', monsterBounds);
                if (playerBounds.right > monsterBounds.left && playerBounds.left < monsterBounds.right &&
                    playerBounds.bottom > monsterBounds.top && playerBounds.top < monsterBounds.bottom) {
                    console.log('Collision detected with monster:', monster.type, 'Player state:', { hasArmor: Player.hasArmor, hasSword: Player.hasSword });
                    if (!Player.hasArmor) {
                        console.log('Game Over: Collided with kobold without armor');
                        this.gameState = 'gameOver';
                        MusicPlayer.stopAllMusic(); // Stop all music on game over
                    } else if (!Player.hasSword) {
                        console.log('Game Over: Collided with kobold without sword');
                        this.gameState = 'gameOver';
                        MusicPlayer.stopAllMusic(); // Stop all music on game over
                    } else {
                        console.log('You Win: Collided with kobold with armor and sword');
                        this.gameState = 'won';
                    }
                }
            }
        });
    },

    // Disabled verifyState as it causes incorrect termination and game should only end on death
    verifyState: function() {
        console.log('VerifyState disabled - Game only terminates if player dies (collides with kobold without armor or sword)');
        return true; // Always return true to allow gameplay, relying on checkMonsterCollisions for termination
    }
};