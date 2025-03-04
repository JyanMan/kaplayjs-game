import { withinRadius } from '../utils/enemyLogic.js';

class Bat {
    constructor(x, y, health) {
        this.pos = vec2(x, y);

        this.followRange = 600;
        
        this.speed = 100;
        this.accel = this.speed/10;

        this.moving = false;
        this.moveX = 0;

        this.onBounceFly = false;
        this.onBounceFlyCd = 0.2;
        
        this.jumpForce = 500;

        this.health = health
    }
    
    makeBat() {
        this.gameObj = add([
            sprite("enemy-bat", {anim: "fly"}),
            scale(4),
            pos(this.pos),
            area({
                collisionIgnore: ['player', 'enemy']
            }),
            anchor('center'),
            body(),
            color(WHITE),
            'bat', 'enemy',
            {
                // attackDamage: this.attackDamage,
                // attackRadius: this.attackRadius*0.25,
                // attackDuration: this.attackDuration,
                knockStrength: 150,
                isHit: (entity, damage, attacker) => isHit(this, damage, attacker)
            },
            offscreen({ hide: true }),
        ]);
        
        onUpdate(() => {
            this.followPlayer();
            //console.log(this.gameObj.pos);
        })
    }

    followPlayer() {
        const player = get("player")[0];
        this.gameObj.vel = vec2(this.moveX, this.gameObj.vel.y);

        //if not within radius or player does not exist
        if (!player || !withinRadius(this.gameObj, player, this.followRange)) {
            this.moving = false;
            this.moveX = 0;
            return;
        }

        //attack on collide
        const distanceToPlayer = player.pos.sub(this.gameObj.pos);
        // if (distanceToPlayer.len() <= this.attackRadius) {
        //     this.attack();
        // }

        this.onFlyLogic(distanceToPlayer.y);

        this.moving = true;

        //move to player
        this.moveX += Math.sign(distanceToPlayer.x)*this.accel;
        if (Math.abs(this.moveX) >= this.speed) {
            this.moveX = Math.sign(this.moveX)*this.speed;        
        }
    }

    onFlyLogic(distanceY) {
        if (this.onBounceFly) {
            return;
        }
        console.log("aboved");
        this.setBounceCooldown();
        if (distanceY < 0) {
            this.gameObj.jump(this.jumpForce);
        }
    }
    setBounceCooldown() {
        this.onBounceFly = true;
        wait(this.onBounceFlyCd, () => {
            this.onBounceFly = false;
        })
    }
}

export default Bat;