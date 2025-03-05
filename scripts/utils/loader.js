export const load = {
    assets: () => {
        loadSprite("background", '../assets/mr-platformer/Backgrounds/merged-full-background.png');
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
        loadSprite('gun', '../assets/player/gun-spritesheet.png', {
            sliceX: 3,
            sliceY: 1,
            anims: {
                idle: 0,
                shoot: { from: 1, to: 2, loop: false}
            }
        });
        loadSprite("zombie", '../assets/zombie.png', {
            sliceX: 4,
            sliceY: 4,
            anims: {
                idle: { from: 0, to: 2, loop: true, speed: 3 },
                run: { from: 3, to: 7, loop: true },
                attack: { from: 10, to: 15, loop: false, speed: 10},
                rise: 8,
                fall: 9
            }
        });
        loadSprite('enemy-bat', '../assets/mr-platformer/Enemies/Enemy-Bat-Fly-32x32.png', {
            sliceX: 2,
            sliceY: 3,
            anims: {
                fly: { from: 0, to: 4, loop: true }
            }
        })
        
        loadSprite("dodgy", '../assets/player/dodge-bar.png')
        loadSprite("healthbar", '../assets/player/hp-bar.png', {
            sliceX: 1,
            sliceY: 2,
        })

        loadSprite("mr-tileset", '../assets/mr-platformer/Tiles/combined-tilesheet.png', {
            sliceX: 39,
            sliceY: 1,
            anims: {
                tl: 0,
                tm: 1,
                g: 5,
                d: 2,
                l: 3,
                r: 4,
            }
        });
        loadSprite("crystal-idle", '../assets/mr-platformer/Objects/Obj-Crystal-Idle-32x32.png', {
            sliceX: 2,
            sliceY: 3,
            anims: {
                idle: {from: 0, to: 4, loop: true}
            }
        })
        loadSprite("crystal-open", '../assets/mr-platformer/Objects/Obj-Crystal-Open-32x32.png')
        loadSprite("bullet", '../assets/mr-platformer/Objects/Obj-Barrel.png')
        
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