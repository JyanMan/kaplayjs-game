import AttackArea from '../player/attackArea.js';
import { withinRadius } from '../utils/enemyLogic.js';
import { isHit } from '../utils/healthModule.js';
import { normalizeVec, vec2Product } from '../utils/vector2.js';

class Bat {
    constructor(x, y, health) {
        this.pos = vec2(x, y);

        this.followRange = 600;
        
        this.speed = 150;
        this.accel = this.speed/10;

        this.moving = false;
        this.moveX = 0;
        this.moveDirection = 1;
        this.scale = 4;

        this.onBounceFly = false;
        this.onBounceFlyCd = 0.2;
        this.jumpForce = 300;

        this.attackDamage = 2;
        this.attackCooldown = 0.5;
        this.onAttackCooldown = false;
        this.attackRadius = 10;
        this.attackDuration = 0.2;

        this.faceRight = false;

        this.knocked = false;

        this.health = health
        this.objDestroyed = false;
    }
    
    makeBat() {
        this.gameObj = add([
            sprite("enemy-bat", {anim: "fly"}),
            scale(4),
            pos(this.pos),
            anchor('center'),
            area({
                shape: new Rect(vec2(0,0), 10, 10),
                collisionIgnore: ['enemy'],
                offset: vec2(0, 0)
            }),
            body(),
            color(WHITE),
            'bat', 'enemy',
            {
                attackDamage: this.attackDamage,
                knockStrength: 100,
                isHit: (entity, damage, attacker) => isHit(this, damage, attacker)
            },
            offscreen({ hide: true }),
        ]);

        const start = () => {
            this.gameObj.mass = 0.5;
        }
        
        this.gameObj.onUpdate(() => {
            //this.draw();
            //console.log(this.gameObj.pos);
        })
        this.gameObj.onFixedUpdate(() => {
            this.followPlayer();
            this.changeFaceDirection();
        })
        start();
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
    }

    followPlayer() {
        if (this.knocked) {
            this.moveX = 0;
            return;
        }
        const player = get("player")[0];
        this.gameObj.vel = vec2(this.moveX, this.gameObj.vel.y);
        //if not within radius or player does not exist
        if (!player || !withinRadius(this.gameObj, player, this.followRange)) {
            this.moving = false;
            this.moveX = 0;
            return;
        }
        const distanceToPlayer = player.pos.sub(this.gameObj.pos);

        //attack on collide
        if (distanceToPlayer.len() <= this.attackRadius*this.gameObj.scale.x) {
            //console.log("00000");
            this.attack(player);
        }
        
        this.onFlyLogic(distanceToPlayer.y);

        this.moving = true;

        //move to player
        this.moveDirection = Math.sign(distanceToPlayer.x);
        this.moveX += this.moveDirection*this.accel;
        if (Math.abs(this.moveX) >= this.speed) {
            this.moveX = Math.sign(this.moveX)*this.speed;        
        }
    }

    onFlyLogic(distanceY) {
        
        if (this.onBounceFly) {
            return;
        }
        const heightDistance = 10;
        this.setBounceCooldown();
        if (distanceY < heightDistance) {
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
        // console.log("happenin");
        // const direction = normalizeVec(player.pos.sub(this.gameObj.pos));
        // this.attackArea.attack(direction, player);
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

    changeFaceDirection() {
        this.faceRight = (this.moveDirection === 1) ? true : false;
        this.gameObj.flipX = (this.faceRight) ? true : false;
    }
}

export default Bat;