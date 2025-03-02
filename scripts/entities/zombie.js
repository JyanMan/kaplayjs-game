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

        this.objDestroyed = false

    }

    makeZombie() {
        this.gameObj = add([
            sprite("zombie", {anim: "idle"}),
            scale(4),
            pos(this.pos),
            area({
                shape: new Rect(vec2(this.width/2, this.height/2), this.width, this.height),
                offset: vec2(6, -10),
                collisionIgnore: ["player", "zombie"]
            }),
            body(),
            color(WHITE),
            "zombie",
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
            // //randomize this.speed
            // const randomNum = (Math.random()*0.5)+0.5;
            // //console.log(randomNum);
            // this.speed = this.speed*randomNum;
            const randomNum = Math.floor(Math.random()*this.speedTypes.length);
            this.speed = this.speedTypes[randomNum];
            this.accel = this.speed/10;
        }
        this.start();

        onUpdate(() => {
            if (this.objDestroyed) return;
            this.animation();
            //this.draw();
        }) 
        onFixedUpdate(() => {
            if (this.objDestroyed) return;
            this.move();
            //this.attackIfOnRange();
        });
    }

    draw() {
        const obj = this.gameObj;
        drawRect({
            width: this.width*obj.scale.x,
            height: this.height*obj.scale.y,
            pos: this.gameObj.pos.add(
                (this.width/2 + obj.area.offset.x)*obj.scale.x,
                (this.height/2+obj.area.offset.y)*obj.scale.y
            ),
            color: YELLOW,
            fill: true
        })
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
        //console.log(this.gameObj);
        const player = get("player")[0];
        //console.log(withinRadius(this.gameObj, player, this.followRange));
        this.gameObj.vel = vec2(this.moveX, this.gameObj.vel.y);

        if (!player || !withinRadius(this.gameObj, player, this.followRange)) {
            this.isWalking = false;
            this.moveX = 0;
            return;
        }

        const distanceToPlayer = player.pos.sub(this.gameObj.pos);
        
        if (distanceToPlayer.len() <= this.attackRadius) {
            //this.isWalking = false;
            this.attack();
            // if (Math.abs(distanceToPlayer.y) <= this.attackRadius) {

            //     this.attack();
            // }
            // if (Math.abs(this.moveX) > this.accel) {
            //     this.moveX -= this.accel*Math.sign(this.moveX);
            // }
            // else {
            //     this.moveX = 0;
            // }
            // return;
        }

        this.onJumpLogic(distanceToPlayer);

        this.isWalking = true;
        //console.log(distanceToPlayer);

        //move to player
        this.moveX +=Math.sign(distanceToPlayer.x)*this.accel;
        if (Math.abs(this.moveX) >= this.speed) {
            this.moveX = Math.sign(this.moveX)*this.speed;        
        }
    }

    onJumpLogic(distance) {
        const distanceY = distance.y; 
        // if (!this.gameObj.isGrounded()) {
        //     return;
        // }
        if (this.onJumpCooldown) {
            return;
        }
        this.onJumpCooldown = true;
        this.setJumpOnDelay(distanceY);
        // if (distanceY < 0) {
        //     //console.log(distanceY);
        //     this.onJumpCooldown = true;
        //     this.gameObj.jump();
        //     this.setJumpCooldown();
        // }
    }

    setJumpOnDelay(distanceY) {
        wait(this.jumpCooldown/2, () => {
            
            if (!this.gameObj.isGrounded()) {
                return;
            }
            if (distanceY < 0) {
                this.gameObj.jump();
            }
            wait(this.jumpCooldown/2, () => {
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
        // const distToPlayer = player.pos.sub(this.gameObj.pos);
        // //console.log(distToPlayer);
        // if (Math.abs(distToPlayer.x) <= this.attackRadius) {
        //     console.log("within range");
        // }
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