import { mousePosWithCam, normalizeVec, vec2Product } from "../utils/vector2.js";

export function playerHasGun(player) {
    player.gameObj.add([
        sprite('gun', { anim: 'idle '}),
        'owned-gun'
    ])
}

export function playerShoot(player) {

    const playerPos = player.gameObj.pos;
    const direction = normalizeVec(mousePosWithCam().sub(playerPos));

    const width = 5;
    const speed = 1000;
    const maxReach = 300;
    const damage = 1;
    const knockStrength = 50;
    let isDestroyed = false;
    let alreadyHit = false;
    
    //add object or bullet
    const bullet = add([
        sprite("bullet"),
        pos(playerPos),
        anchor(vec2(0, 0.5)),
        scale(4),
        layer("object"),
        "bullet",
        offscreen({ hide: true }),
        area({
            shape: new Rect(vec2(0,0), width, width),
            collisionIgnore: ['player', 'attackArea', 'end-crystal']
        }),
        {
            knockStrength: knockStrength,
        }
    ])
    //player bounce
    playerBounce(player);
    const gun = player.gameObj.get('owned-gun')[0];
    gun.shootAnim();
    gun.faceDirection(direction);

    //destroy it after some time
    wait(maxReach/speed, () => {
        if (!isDestroyed) {
            destroy(bullet);
        }
    })
    
    //move bullet to direction
    bullet.onUpdate(() => {
        bullet.move(vec2Product(direction, speed));
    })

    //check for bullet collisions
    bullet.onCollide((obj) => {
        isDestroyed = true;
        if (obj.tags.includes("enemy") && !alreadyHit) {
            alreadyHit = true;
            obj.isHit(0, damage, bullet)
        }
        //destroy object if collided
        destroy(bullet);
    })
}

function playerBounce(player) {
    const force = 400;
    const direction = normalizeVec(player.gameObj.pos.sub(mousePosWithCam()));
    
    //player.moveX = 0;
    player.moveX = direction.x*force;
    player.gameObj.vel = vec2Product(direction, force);
}

export function playerSword(player) {
    const mouseDir = normalizeVec(mousePosWithCam().sub(player.gameObj.pos));
    const targets = get("enemy");
    player.attackArea.attack(mouseDir, targets);
    player.moveX = 0;
    player.gameObj.vel = vec2(Math.sign(mouseDir.x)*50, 0);
}