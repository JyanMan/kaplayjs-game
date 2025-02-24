export const load = {
    assets: () => {
        loadSprite("player", '../assets/player/chicken-player.png', {
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