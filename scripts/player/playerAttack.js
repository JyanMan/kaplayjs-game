import { normalizeVec, vec2Product } from "../utils/vector2.js";

export function playerShoot(playerPos, targetPos) {
    const direction = normalizeVec(targetPos.sub(playerPos));
    const width = 5;
    const speed = 1000;
    const maxReach = 300;
    const damage = 1;
    let isDestroyed = false;
    let alreadyHit = false;
    
    //add object or bullet
    const bullet = add([
        sprite("bullet"),
        pos(playerPos),
        area({
            shape: new Rect(vec2(0,0), width, width),
            collisionIgnore: ['player', 'attackArea']
        }),
        anchor(vec2(0, 0.5)),
        scale(4),
        layer("object"),
        "bullet",
        offscreen({ hide: true }),
        {
            knockStrength: 10,
        }
    ])
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
        if (obj.tags.includes("zombie") && !alreadyHit) {
            alreadyHit = true;
            obj.isHit(0, damage, bullet)
        }
        //destroy object if collided
        destroy(bullet);
    })
}