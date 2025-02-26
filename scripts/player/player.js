import { vec2Product } from "../utils/vector2.js";
import { normalizeVec } from "../utils/vector2.js";

class Player {
    constructor(
        initialX,
        initialY,
    ) {
        this.pos = vec2(initialX, initialY);
        this.speed = 300;
        this.accel = 50;
        this.moveX = 0;
        this.jumpForce = 600;
        this.width = 10;
        this.height = 19;

        this.dodgingTime = 0.1;
        this.dodgeRadius = 200;
        this.dodgeMin = 100;
        this.dodgeSlowTime = 0.2;

        //USE STATES INSTEAD
        this.isRunning = false;
        this.runDirection = "right";
        this.jumped = false;
        this.dodged = false;
        this.slowAfterDodge = false;
        this.attacking = false;
        this.attackDuration = 0.5;
        this.state = "idle";
        this.animState = "idle";
    }
    
    makePlayer() {
        this.gameObj = add([
            sprite("player", { anim: this.animState }),
            scale(4),
            pos(this.pos),
            //FIX THIS AREA, ITS NOT PROPERLY OFFSET
            //COULD FIX SPRITESHEET INSTEAD
            area({ 
                shape: new Rect(vec2(this.width/2, this.height/2), this.width, this.height),
                offset: vec2(6, 3.5),
                collisionIgnore: ["player", "zombie"]
            }),
            body(),
            "player"
        ]); 

        //stuff called at the start
        this.gameObj.jumpForce = this.jumpForce;
        
        onUpdate(() => {
            this.playerInput();
            this.playerAnimate();

            //for debuggin collider
            //this.draw();
        });
        onFixedUpdate(() => {
            this.playerMove();
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

    playerInput() {
        if (isButtonPressed("dodge") && !this.slowAfterDodge) {
            this.dodged = true;
            wait(this.dodgingTime, () => { //name this dodge duration
                this.dodged = false; 
                this.slowAfterDodge = true; //player stay on air for few secs
            })
        }
        if (isButtonPressed("attack") && !this.attacking) {
            console.log("attacked");
            this.attacking = true;
            wait(this.attackDuration, () => {
                this.attacking = false;
            })
        }
        if (isButtonDown("jump") && this.gameObj.isGrounded()) {
            this.jumped = true;
        }
        if (isButtonDown("right") || isButtonDown("left")) {
            if (isButtonDown("right")) this.runDirection = "right";
            if (isButtonDown("left")) this.runDirection = "left";
            this.isRunning = true;
        }
        else {
            this.isRunning = false;
        }
    }

    playerMove() {

        //LEFT AND RIGHT MOVEMENT
        let accel = this.accel;
        if (this.isRunning) {
            if (!this.gameObj.isGrounded()) {
                accel = this.accel*0.8; //for less agility in air
            }
            this.moveX += (this.runDirection === "right") ? accel : -accel;
        }
        else {
            if (this.gameObj.isGrounded()) {
                //slowly decreases movement instead of just 
                //setting to zero
                if (Math.abs(this.moveX) >= accel) {
                    this.moveX -= Math.sign(this.moveX)*Math.abs(accel);
                }
                else {
                    this.moveX = 0;
                }
            }
        }
        //limit moveX to player speed
        if (Math.abs(this.moveX) >= this.speed) {
            this.moveX = Math.sign(this.moveX)*this.speed;
        }
        
        //JUMP
        if (this.jumped) {
            this.gameObj.jump();
            this.jumped = false;
        }
        
        //DODGE
        if (this.dodged) {
            this.playerDodge();
            return;
        }
        else if (this.slowAfterDodge) {
            const percentVel = 0.8;
            this.gameObj.vel = vec2Product(this.gameObj.vel, percentVel);
            wait(this.dodgeSlowTime, () => {
                this.slowAfterDodge = false; //player stay on air for seconds
            })
            return;
        }

        //playerattack
        if (this.attacking) {
            this.attack();
        }

        //move player based on movex
        this.gameObj.vel = vec2(this.moveX, this.gameObj.vel.y);

    }

    attack() {
        console.log("attacking");
    }
    
    playerDodge() {
        //get mouse position from player
        //get mouse direction
        const selfCenter = this.gameObj.pos.add(
            this.width*this.gameObj.scale.x, 
            this.height*this.gameObj.scale.y
        );
        let mouseDelta = mousePos().sub(selfCenter); //mousePos SUBTRACT selfCenter
        const mouseDeltaLen = mouseDelta.len();
        const mouseDir = normalizeVec(mouseDelta, mouseDeltaLen);

        //limit mouse delta between dodge min and dodge radius / dodge max
        if (mouseDeltaLen <= this.dodgeMin) {
            mouseDelta = vec2Product(mouseDir, this.dodgeMin);
        }
        else if (mouseDeltaLen >= this.dodgeRadius) {
            mouseDelta = vec2Product(mouseDir, this.dodgeRadius)
        }

        //move player to mouse position
        this.moveX = 0;
        this.gameObj.vel = vec2(0, 0);
        this.gameObj.vel = vec2Product(mouseDelta, 8);

        //for debugging purposes
        drawCircle({
            pos: mouseDelta.add(selfCenter),
            radius: 20,
            color: GREEN
        });
    }

    playerAnimate() {
        if (this.dodged || this.slowAfterDodge) {
            this.state = "dodging";
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
            "idle";
        
        this.gameObj.flipX = (this.runDirection === "left") ? true : false;

        if (this.animState !== nextAnim) {
            this.animState = nextAnim;
            this.gameObj.play(nextAnim);
        }
    }
}

export default Player;