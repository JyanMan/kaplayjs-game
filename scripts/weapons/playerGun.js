import { vec2Product } from "../utils/vector2.js";

export function ownGun(player) {
    player.ownedGun = true;
    const gun = player.gameObj.add([
        sprite('gun', { anim: 'idle' }),
        scale(1),
        rotate(-60),
        pos(0, 0),
        anchor('center'),
        //anchor(vec2(0.3, 0.4)),
        'owned-gun',
    ])
    gun.hidden = true;

    gun.shootAnim = function() {
        gun.play('shoot')
        gun.beingUsed = true;
        gun.hidden = false;
        //console.log("asdf");
    }
    gun.onAnimEnd(() => {
        gun.play('idle');
        gun.beingUsed = false;
        gun.pos = vec2(0, 0);
        gun.hidden = true;
    })

    gun.faceDirection = (direction) => {
        const gap = 15;
        console.log(gun.pos);
        gun.pos = gun.pos.add(vec2Product(direction, gap));
        let angle = gun.pos.angle(direction);
        if (direction.x < 0) {
            gun.flipX = true;
            angle = angle+180;
        }
        else {
            gun.flipX = false;
        }
        //console.log(angle);
        gun.rotateTo(angle);
    }
}