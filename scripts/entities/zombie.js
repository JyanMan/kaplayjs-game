import AttackArea from "../player/attackArea.js";
import { isHit } from "../utils/healthModule.js";
import { withinRadius } from "../utils/enemyLogic.js";
import { normalizeVec } from "../utils/vector2.js";

class Zombie {
    constructor(
        initialX, 
        initialY,
        health
    ) {
        this.pos = vec2(initialX, initialY);
        this.speed = 100;
        this.speedTypes = [40, 50, 60, 90]
        this.accel = this.speed/10;
        this.width = 10;
        this.height = 28;
        this.moveX = 0;

        this.attackRadius = 60;
        this.followRange = 600;

        this.onJumpCooldown = false;
        this.jumpCooldown = 4;

        this.isWalking = false;
        this.attacking = false;
        this.faceRight = false;
        this.knocked = false;
        this.attackersLists = new Set();
        this.attacked = false;
        this.attackCoolingDown = false;
        this.attackDuration = 0.4;
        this.attackCooldown = 1;
        this.attackDamage = 2;
        this.state = "idle";
        this.animState = "idle";

        this.maxHealth = health;
        this.health = health;
        this.makeZombie();

    }

    makeZombie() {
        this.gameObj = add([
            sprite("zombie", {anim: "idle"}),
            scale(4),
            pos(this.pos),
            anchor('center'),
            area({
                shape: new Rect(vec2(0,0), this.width, this.height),
                offset: vec2(0, 2),
                collisionIgnore: ["player", "zombie"]
            }),
            body(),
            color(WHITE),
            'zombie', 'enemy',
            {
                attackDamage: this.attackDamage,
                attackRadius: this.attackRadius*0.25,
                attackDuration: this.attackDuration,
                knockStrength: 150,
                isHit: (entity, damage, attacker) => isHit(this, damage, attacker)
            },
            offscreen({ hide: true }),
        ]);

        this.start = () => {
            this.gameObj.jumpForce = 500;
            this.attackArea = new AttackArea(this.gameObj);
            this.attackArea.initialize();

            const randomNum = Math.floor(Math.random()*this.speedTypes.length);
            this.speed = this.speedTypes[randomNum];
            this.accel = this.speed/10;
        }
        this.start();

        this.gameObj.onUpdate(() => {
            this.animation();
            this.draw();
        }) 
        this.gameObj.onFixedUpdate(() => {
            this.move();
            //this.attackIfOnRange();
        });
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

    move() {
        if (this.knocked) {
            return;
        }
        this.followPlayer();
        this.changeDirection();
    }

    changeDirection() {
        if (this.gameObj.vel.x > 0) {
            this.faceRight = true;
        }
        else if (this.gameObj.vel.x < 0) {
            this.faceRight = false;
        }
    }
    
    followPlayer() {
        const player = get("player")[0];
        this.gameObj.vel = vec2(this.moveX, this.gameObj.vel.y);

        //if not within radius or player does not exist
        if (!player || !withinRadius(this.gameObj, player, this.followRange)) {
            this.isWalking = false;
            this.moveX = 0;
            return;
        }

        const distanceToPlayer = player.pos.sub(this.gameObj.pos);
        
        if (distanceToPlayer.len() <= this.attackRadius) {
            this.attack();
        }

        this.onJumpLogic(distanceToPlayer.y);

        this.isWalking = true;

        //move to player
        this.moveX +=Math.sign(distanceToPlayer.x)*this.accel;
        if (Math.abs(this.moveX) >= this.speed) {
            this.moveX = Math.sign(this.moveX)*this.speed;        
        }
    }

    onJumpLogic(distanceY) {
        if (!this.gameObj.isGrounded() || this.onJumpCooldown || distanceY >= 0) {
            return;
        }
        this.onJumpCooldown = true;
        this.setJumpOnDelay();
    }

    setJumpOnDelay() {
        wait(this.jumpCooldown*0.15, () => {
            
            if (!this.gameObj.isGrounded()) {
                this.onJumpCooldown = false;
                return;
            }
            this.gameObj.jump();
            wait(this.jumpCooldown*0.85, () => {
                this.onJumpCooldown = false;
            })
        })
    }

    animation() {
        //console.log(this.attacked);
        if (!this.gameObj.isGrounded()) {
            if (this.gameObj.vel < 0) {
                this.state = "rising";
            }
            else {
                this.state = "falling";
            }
        }
        else if (this.attacked) {
            this.state = "attack";
        }
        else if (this.isWalking) {
            this.state = "run";
        }
        else {
            this.state = "idle";
        }

        const currentAnim =
            (this.state === "run") ? "run" :
            (this.state === "attack") ? "attack" :
            (this.state === "rising") ? "rise" :
            (this.state === "falling") ? "fall" :
            "idle";
        
        if (currentAnim !== this.animState) {
            //console.log("asfadf");
            this.animState = currentAnim;
            if (currentAnim === "run") {
                this.gameObj.play(currentAnim, {speed: this.speed/10});
            }
            else {

                this.gameObj.play(currentAnim);
            }
        }
        
        this.gameObj.flipX = !this.faceRight;
    }

    attack() {
        if (!this.gameObj.isGrounded()) {
            return;
        }
        if (this.attacked) {
            this.attackTarget();
            return;
        }
        if (this.attackCoolingDown) {
            return;
        }
        this.setAttackTimer();
        this.attackCoolingDown = true;
        this.attacked = true;
        //console.log("attacked");
    }
    
    attackTarget() {
        const players = get("player");
        const player = players[0];
        //const attackDir = (this.faceRight) ? 1 : -1;
        const attackDir = normalizeVec(player.pos.sub(this.gameObj.pos));
        this.attackArea.attack(attackDir, players);
    }

    setAttackTimer() {
        wait(this.attackDuration, () => {
            this.attacked = false;
        })
        wait(this.attackCooldown, () => {
            this.attackCoolingDown = false;
        })
    }

    destroySelf() {
        destroy(this.gameObj); 
    }
}

export default Zombie;