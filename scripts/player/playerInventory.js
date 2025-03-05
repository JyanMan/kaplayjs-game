export function checkForPickups(player) {
    player.gameObj.onCollide((obj) => {
        if (obj.is('unowned-gun')) {
            ownGun(player);
            destroy(obj);
        }
    })
}

function ownGun(player) {
    player.ownedGun = true;
    const gun = player.gameObj.add([
        sprite('gun', { anim: 'idle' }),
        scale(1),
        rotate(-60),
        pos(0, 0),
        anchor('center'),
        //anchor(vec2(0.3, 0.4)),
        'owned-gun'
    ])

    gun.onUpdate(() => {
        if (player.gameObj.flipX) {
            gun.flipX = true;
            gun.rotateTo(60);
        }
        else {
            gun.flipX = false;
            gun.rotateTo(-60);
        }
    })
}