import AttackArea from "../player/attackArea.js";
import { normalizeVec, vec2Product } from "../utils/vector2.js";

class Zombie {
    constructor(
        initialX, 
        initialY,
        health
    ) {
        this.pos = vec2(initialX, initialY);
        this.speed = 100;
        this.accel = 10;
        this.width = 10;
        this.height = 28;
        this.moveX = 0;

        this.attackRadius = 40;

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

        this.health = health;
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
            "zombie",
            {
                attackDamage: this.attackDamage,
                attackRadius: this.attackRadius,
                attackDuration: this.attackDuration,
                knockStrength: 50,
                isHit: (damage, attacker) => this.isHit(damage, attacker)
            }
        ]);

        this.attackArea = new AttackArea(this.gameObj);
        this.attackArea.initialize();

        onUpdate(() => {
            this.animation();
            //this.draw();
        }) 
        onFixedUpdate(() => {
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
        const player = get("player")[0];
        if (!player) {
            this.isWalking = false;
            return
        }

        const distanceToPlayer = player.pos.sub(this.gameObj.pos);
        this.gameObj.vel = vec2(this.moveX, this.gameObj.vel.y);
        
        if (Math.abs(distanceToPlayer.x) <= this.attackRadius) {
            this.isWalking = false;
            if (Math.abs(distanceToPlayer.y) <= this.attackRadius) {

                this.attack();
            }
            if (Math.abs(this.moveX) > this.accel) {
                this.moveX -= this.accel*Math.sign(this.moveX);
            }
            else {
                this.moveX = 0;
            }
            return;
        }
        this.isWalking = true;
        //console.log(distanceToPlayer);

        //move to player
        this.moveX +=Math.sign(distanceToPlayer.x)*this.accel;
        if (Math.abs(this.moveX) >= this.speed) {
            this.moveX = Math.sign(this.moveX)*this.speed;        
        }

    }

    animation() {
        //console.log(this.attacked);
        if (this.attacked) {
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
            "idle";
        
        if (currentAnim !== this.animState) {
            //console.log("asfadf");
            this.animState = currentAnim;
            this.gameObj.play(currentAnim);
        }
        
        this.gameObj.flipX = !this.faceRight;
    }

    isHit(damage, attacker) {
       // console.log(attacker.tags);

        if (!attacker) {
            console.log('this is the reason');
            return;
        }
        this.health -= damage;
        //console.log(this.health);
        
        if (!this.knocked) {
            this.knocked = true
            this.knockback(attacker);
            this.setKnockTimer();
        }
        
        if (this.health <= 0) {
            console.log("DEAD");
            destroy(this.gameObj);
        }
    }

    setKnockTimer() { //MAKE ONE FUNCTION SETTIMER NEXT TIME
        wait(0.2, () => {
            this.knocked = false;
        });
    }

    knockback(attacker) {
        const knockDirection = normalizeVec(this.gameObj.pos.sub(attacker.pos));
        //console.log(knockDirection);
        //console.log(this.gameObj.vel);
        this.gameObj.vel = vec2Product(knockDirection, attacker.knockStrength*2);
        //this.gameObj.addForce(vec2Product(knockDirection, attacker.knockStrength*100));
        //this.gameObj.vel = knockDirection*attacker.knockStrength;
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
        const attackDir = (this.faceRight) ? 1 : -1;
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
}

export default Zombie;