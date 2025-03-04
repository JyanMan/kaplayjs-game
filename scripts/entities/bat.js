import { withinRadius } from '../utils/enemyLogic.js';
import { isHit } from '../utils/healthModule.js';

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
        
        this.jumpForce = 300;

        this.attackDamage = 2;
        this.attackCooldown = 0.2;
        this.onAttackCooldown = false;

        this.health = health
    }
    
    makeBat() {
        this.gameObj = add([
            sprite("enemy-bat", {anim: "fly"}),
            scale(4),
            pos(this.pos),
            anchor('center'),
            area({
                shape: new Rect(vec2(0,0), 10, 10),
                collisionIgnore: ['enemy']
            }),
            body(),
            color(WHITE),
            'bat', 'enemy',
            {
                // attackDamage: this.attackDamage,
                // attackRadius: this.attackRadius*0.25,
                // attackDuration: this.attackDuration,
                knockStrength: 100,
                attackDuration: this.attackCooldown,
                isHit: (entity, damage, attacker) => isHit(this, damage, attacker)
            },
            offscreen({ hide: true }),
        ]);
        
        onUpdate(() => {
            this.draw();
            //console.log(this.gameObj.pos);
        })
        onFixedUpdate(() => {
            this.followPlayer();
        })
    }
    draw() {
        if (!this.gameObj) {
            return;
        }
        const obj = this.gameObj;
        const objVertices = obj.worldArea().pts
        drawPolygon({
            pts: [
                objVertices[0],
                objVertices[1],
                objVertices[2],
                objVertices[3],
            ],
            z: 10,
            pos: vec2(0, 0),
            color: YELLOW,
            layer: "ui"
        })
        // const obj = this.gameObj;
        // drawRect({
        //     width: this.width*obj.scale.x,
        //     height: this.height*obj.scale.y,
        //     pos: this.gameObj.pos.add(
        //         (this.width/2 + obj.area.offset.x)*obj.scale.x,
        //         (this.height/2+obj.area.offset.y)*obj.scale.y
        //     ),
        //     color: YELLOW,
        //     fill: true
        // })
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
        if (this.gameObj.isColliding(player)) {
            //console.log("00000");
            this.attack(player);
        }

        // if (distanceToPlayer.len() <= this.attackRadius) {
            //     this.attack();
            // }
            
        const distanceToPlayer = player.pos.sub(this.gameObj.pos);
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

    attack(player) {
        if (this.onAttackCooldown) {
            return;
        }
        console.log('asdf');
        this.onAttackCooldown = true;
        player.isHit(0, this.attackDamage, this.gameObj);
        wait(this.attackCooldown, () => {
            this.onAttackCooldown = false;
        })
    }
}

export default Bat;