import { mousePosWithCam, vec2Product, normalizeVec } from "../utils/vector2.js";
import { isHit } from "../utils/healthModule.js";
import { playerShoot, playerSword } from "./playerAttack.js";
import { checkForPickups } from "./playerInventory.js";
import { drawObjArea, drawObjCenter } from "../utils/debugDraw.js";
import AttackArea from "./attackArea.js";
import HealthBar from "./playerHealthBar.js";
import DodgeBar from "./playerDodgeBar.js";

class Player {
    constructor(initialX, initialY, health) {
        this.pos = vec2(initialX, initialY);
        this.width = 10;
        this.height = 19;
        
        this.speed = 225;
        this.accel = 25;
        this.moveX = 0;
        this.isRunning = false;
        this.runDirection = 1;
        
        this.jumpForce = 700;
        this.jumped = false;
        
        this.dodgeDuration = 0.1;
        this.dodgeRadius = 150;
        this.dodgeMin = 80;
        this.dodgeSlowTime = 0.2;
        this.dodged = false;
        this.slowAfterDodge = false;
        this.dodgeAmountMax = 2;
        this.dodgeAmount = this.dodgeAmountMax;
        this.dodgeCooldown = 2;

        this.attacking = false;
        this.attackDuration = 0.3;
        this.attackCooldown = 0.1;
        this.attackCoolingDown = false;
        this.attackRadius = 17;
        this.attackDamage = 2;

        this.shootCooldown = 1;
        this.onShootCooldown = false;
        this.shot = false;

        this.knocked = false;
        this.maxHealth = health;
        this.health = health;

        this.state = "idle";
        this.animState = "idle";
        this.faceRight = false;
        this.faceMouse = true;
    }
    
    makePlayer() {
        this.gameObj = add([
            sprite("player", { anim: this.animState }),
            scale(4),
            pos(this.pos),
            area({ 
                shape: new Rect(vec2(0,0), this.width, this.height),
                offset: vec2(0, 6),
                collisionIgnore: ["player", "enemy"]
            }),
            anchor('center'),
            body(),
            color(WHITE),
            "player",
            layer("object"),
            {
                //public properties
                attackDamage: this.attackDamage,
                attackRadius: this.attackRadius,
                attackDuration: this.attackDuration,
                knockStrength: 100,
                isHit: (entity, damage, attacker) => isHit(this, damage, attacker) //(entity, damage, attacker) => this.isHit(this, damage, attacker)
            }
        ]); 

        //stuff called at the start
        const start = () => {
            this.gameObj.jumpForce = this.jumpForce;
            this.attackArea = new AttackArea(this.gameObj);
            this.attackArea.initialize();

            this.healthBar = new HealthBar(this.maxHealth, this.health, this);
            this.healthBar.initialize();

            this.dodgeBar = new DodgeBar(this);
            this.dodgeBar.initialize();

            checkForPickups(this);
        }
        start();
        
        this.gameObj.onUpdate(() => {
            this.playerInput();
            this.playerAnimate();
            this.changeFaceDirection();
            //drawObjArea(this.gameObj);
            //drawObjCenter(this.gameObj, WHITE);
        });
        this.gameObj.onFixedUpdate(() => {
            //this.playerMove();
            this.action();
        });
    }

    playerInput() {

        if (isButtonPressed("dodge") && !this.slowAfterDodge &&
        this.dodgeAmount > 0
    ) {
            this.startDodge();
        }
        if (isButtonPressed("shoot") && this.ownedGun && !this.onShootCooldown) {
            this.shot = true;
        }

        if (isButtonDown("right") || isButtonDown("left")) {
            if (isButtonDown("right")) this.runDirection = 1;
            else if (isButtonDown("left")) this.runDirection = -1;
            this.isRunning = true;
        }
        else {
            this.isRunning = false;
        }

        if (!this.gameObj.isGrounded()) {
            return;
        }
        if (isButtonPressed("attack") && !this.attacking && !this.attackCoolingDown) {
            this.setAttackCooldown();
        }
        if (isButtonDown("jump")) {
            this.jumped = true;
        }
    }

    action() {
        //JUMP
        if (this.knocked) {
            return;
        }
        if (this.jumped) {
            this.gameObj.jump();
            this.jumped = false;
        }
        
        //DODGE
        if (this.dodged) {
            this.playerDodge();
            //console.log("start")
            return;
        }
        else if (this.slowAfterDodge) {
            const percentVel = 0.8;
            this.gameObj.vel = vec2Product(this.gameObj.vel, percentVel);
            return;
        }

        if (this.shot) {
            this.shot = false;
            this.startShoot();
        }

        //playerattack
        if (this.attacking) {
            playerSword(this);
            return;
        }
        
        this.moveLeftRight();
        //move player based on movex
        this.gameObj.vel = vec2(this.moveX*dt()*50, this.gameObj.vel.y*dt()*50);
        
    }
    moveLeftRight() {
        //limit moveX to player speed
        if (Math.abs(this.moveX) >= this.speed) {
            this.moveX = Math.sign(this.moveX)*this.speed;
        }

        //LEFT AND RIGHT MOVEMENT
        let accel = this.accel;
        if (this.isRunning) {
            if (!this.gameObj.isGrounded()) {
                accel = this.accel*0.8; //for less agility in air
            }
            this.moveX += (this.runDirection === 1) ? accel : -accel;
        }
        else {
            if (this.gameObj.isGrounded()) {
                if (Math.abs(this.moveX) >= accel) {
                    this.moveX -= Math.sign(this.moveX)*Math.abs(accel);
                }
                else {
                    this.moveX = 0;
                }
            }
        }
    }
    
    setAttackCooldown() {
        this.attackCoolingDown = true;
        this.attacking = true;
        wait(this.attackDuration, () => {
            this.attacking = false;
            wait(this.attackCooldown, () => {
                this.attackCoolingDown = false;
            })
        })
    }

    startShoot() {
        this.onShootCooldown = true;
        wait(this.shootCooldown, () => {
            this.onShootCooldown = false;
        })
        playerShoot(this);
    }

    startDodge() {
        //decrement dodge amount
        this.dodgeAmount--;
        if (this.dodgeAmount === this.dodgeAmountMax-1) {
            this.setDodgeResetTimer();
        }

        this.dodged = true;
        wait(this.dodgeDuration, () => { //name this dodge duration
            this.slowAfterDodge = true; //player stay on air for few secs
            this.dodged = false; 
            //this.gameObj.vel = vec2Product(this.gameObj.vel, 0.3);
            this.startDodgeSlow();
        })
    }

    startDodgeSlow() {
        wait(this.dodgeSlowTime, () => {
            //console.log("end")
            this.slowAfterDodge = false; //player stay on air for seconds
        })
    }
    setDodgeResetTimer() {
        wait(this.dodgeCooldown, () => {
            this.dodgeAmount = this.dodgeAmountMax;
        })
    }
    
    playerDodge() {
        //get mouse position from player
        //get mouse direction
        let mouseDelta = mousePosWithCam().sub(this.gameObj.pos); //mousePos SUBTRACT selfCenter
        const mouseDeltaLen = mouseDelta.len();
        const mouseDir = normalizeVec(mouseDelta, mouseDeltaLen);

        //limit mouse delta between dodge min and dodge radius / dodge max
        if (mouseDeltaLen <= this.dodgeMin) {
            mouseDelta = vec2Product(mouseDir, this.dodgeMin);
        }
        else if (mouseDeltaLen >= this.dodgeRadius) {
            mouseDelta = vec2Product(mouseDir, this.dodgeRadius*dt()*50)
        }

        this.moveX = 0;
        this.gameObj.vel = vec2(0, 0);
        this.gameObj.vel = vec2Product(mouseDelta, 8);

        drawCircle({
            pos: mouseDelta.add(this.gameObj.pos),
            radius: 20,
            color: BLACK
        });
    }

    playerAnimate() {
        if (this.dodged || this.slowAfterDodge) {
            this.state = "dodging";
        }
        else if (this.attacking) {
            this.state = "attack";
        }
        else if (!this.gameObj.isGrounded()) {
            this.state = (this.gameObj.vel.y < 0) ? "rising" : "falling";
        }
        else if (this.isRunning) {
            this.state =  "running";
        }
        else {
            this.state = "idle";
        }
        const nextAnim = 
            (this.state === "running") ? "run" :
            (this.state === "rising") ? "rise" :
            (this.state === "falling") ? "fall" :
            (this.state === "dodging") ? "dodge" : 
            (this.state === "attack") ? "attack" :
            "idle";
        
        if (this.animState !== nextAnim) {
            this.animState = nextAnim;
            this.gameObj.play(nextAnim);
        }
    }
    
    changeFaceDirection() {
        this.gameObj.flipX = (this.faceRight === false) ? true : false;

        if (this.attacking) {
            if (this.faceMouse) {
                this.faceMouse = false;
                const mouseDirX = Math.sign(mousePosWithCam().x - this.gameObj.pos.x);
                this.faceRight = (mouseDirX === 1) ? true : false;
                this.runDirection = mouseDirX;
            }
            return;
        }
        else {
            this.faceMouse = true;
        }
        
        this.faceRight = (this.runDirection === 1) ? true : false;
    }
    
    finishLevel() {
        if (get('enemy').length > 0) {
            return;
        }
        go('menu');
    }
}

export default Player;