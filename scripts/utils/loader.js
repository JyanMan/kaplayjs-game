export const load = {
    assets: () => {
        loadSprite("player", '../assets/player/player-with-dodge.png', {
            sliceX: 6,
            sliceY: 6,
            anims: {
                idle: { from: 0, to: 3, loop: true },
                run: { from: 5, to: 12, loop: true },
                rise: { from: 13, to: 13, loop: true},
                fall: { from: 15, to: 15, loop: true},
                dodge: { from: 26, to: 30, loop: false}
            }
        });
        loadSprite("zombie", '../assets/zombie.png', {
            sliceX: 4,
            sliceY: 4,
            anims: {
                idle: { from: 0, to: 2, loop: true },
                run: { from: 3, to: 7, loop: true },
                attack: { from: 12, to: 15, loop: false}
            }
        });
    },
    playerChicken: () => {
        loadSprite("player", '../assets/player/player-with-dodge.png', {
            sliceX: 6,
            sliceY: 6,
            anims: {
                idle: { from: 0, to: 5, loop: true },
                run: { from: 15, to: 23, loop: true },
                rise: { from: 24, to: 24, loop: true},
                fall: { from: 26, to: 26, loop: true}
            }
        });
    }
};