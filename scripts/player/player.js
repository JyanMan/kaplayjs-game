import { vec2Product } from "../utils/vector2.js";

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
        this.width = 15;
        this.height = 21.5;

        this.dodgingTime = 0.1;
        this.dodgeRadius = 200;
        this.dodgeMin = 100

        //USE STATES INSTEAD
        this.isRunning = false;
        this.jumped = false;
        this.dodged = false;
        this.dodgeLerp = false;
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
            area({ shape: new Rect(vec2(this.width/2, this.height/2), this.width, this.height)}),
            body(),
            "player"
        ]); 

        //stuff called at the start
        this.gameObj.jumpForce = this.jumpForce;

    }
    
    update() {
        this.playerInput();
        this.playerAnimate();

        //console.log(this.gameObj.scale);
        //draw collider for testing
        drawRect({
            width: this.width*this.gameObj.scale.x,
            height: this.height*this.gameObj.scale.y,
            pos: this.gameObj.pos.add(
                this.width*this.gameObj.scale.x/2,
                this.height*this.gameObj.scale.y/2
            ),
            color: YELLOW,
            fill: true
        })
    }

    fixedUpdate() {
        this.playerMove();
    }

    playerInput() {
        if (isButtonPressed("dodge") && !this.dodgeLerp) {
            this.dodged = true;
            wait(this.dodgingTime, () => {
                this.dodged = false; 
                this.dodgeLerp = true; //player stay on air for few secs
            })
        }
        if (isButtonDown("jump") && this.gameObj.isGrounded()) {
            this.jumped = true;
        }
        if (isButtonDown("right") || isButtonDown("left")) {
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
                accel = this.accel*0.8;
            }
            if (isButtonDown("right")) {
                this.moveX += accel;
            }
            if (isButtonDown("left")) {
                this.moveX -= accel;
            }
        }
        else {
            if (this.gameObj.isGrounded()) {
                if (Math.abs(this.moveX) >= this.accel) {
                    this.moveX -= Math.sign(this.moveX)*Math.abs(this.accel);
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
        else if (this.dodgeLerp) {
            this.gameObj.vel = vec2Product(this.gameObj.vel, 0.8);
            wait(0.2, () => {
                this.dodgeLerp = false; //player stay on air for 0.2s
            })
            return;
        }
        this.gameObj.vel = vec2(this.moveX, this.gameObj.vel.y);

    }
    
    playerDodge() {
        //get mouse position from player
        //get mouse direction
        const selfCenter = this.gameObj.pos.add(
            this.width*this.gameObj.scale.x, 
            this.height*this.gameObj.scale.y
        );
        let mouseDelta = mousePos().sub(selfCenter);
        const mouseDeltaLen = mouseDelta.len();
        const mouseDir = vec2(mouseDelta.x/mouseDeltaLen, mouseDelta.y/mouseDeltaLen);

        //limit mouse delta between dodge min and dodge radius/max
        if (mouseDeltaLen <= this.dodgeMin) {
            mouseDelta = vec2(
                mouseDir.x*this.dodgeMin,
                mouseDir.y*this.dodgeMin
            );
        }
        if (mouseDeltaLen >= this.dodgeRadius) {
            mouseDelta = vec2(
                mouseDir.x*this.dodgeRadius,
                mouseDir.y*this.dodgeRadius
            );
            console.log(mouseDelta)
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
        if (this.dodged) {
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
            //(this.state === "dodging") ? "dodging" : 
            "idle";
            
        if (this.gameObj.vel.x < 0 ) {
            this.gameObj.flipX = true;
        }
        else if (this.gameObj.vel.x > 0) {
            this.gameObj.flipX = false;
        }

        if (this.animState !== nextAnim) {
            this.animState = nextAnim;
            this.gameObj.play(nextAnim);
        }
    }
}

export default Player;