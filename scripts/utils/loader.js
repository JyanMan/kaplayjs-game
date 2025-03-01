export const load = {
    assets: () => {
        loadSprite("player", '../assets/player/player-with-dodge.png', {
            sliceX: 6,
            sliceY: 6,
            anims: {
                idle: { from: 0, to: 3, loop: true, speed: 4 },
                run: { from: 5, to: 12, loop: true },
                rise: { from: 13, to: 13, loop: true},
                fall: { from: 15, to: 15, loop: true},
                dodge: { from: 26, to: 30, loop: false},
                attack: { from: 16, to: 19, loop: false, speed: 15 }
            }
        });
        loadSprite("healthbar", '../assets/player/hp-bar.png', {
            sliceX: 1,
            sliceY: 2,
        })
        loadSprite("zombie", '../assets/zombie.png', {
            sliceX: 4,
            sliceY: 4,
            anims: {
                idle: { from: 0, to: 2, loop: true, speed: 3 },
                run: { from: 3, to: 7, loop: true },
                attack: { from: 10, to: 15, loop: false, speed: 10}
            }
        });
        loadSprite("dodgy", '../assets/player/dodge-bar.png')
        loadSprite("block-tileset", '../assets/block-tileset.png', {
            sliceX: 4,
            sliceY: 4,
            anims: {
                tl: 0,
                tm: 1,
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