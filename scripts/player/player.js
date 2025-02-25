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

        //USE STATES INSTEAD
        this.isRunning = false;
        this.jumped = false;
        this.dodged = false;
        this.state = "idle";
    }
<<<<<<< HEAD
    
=======
>>>>>>> 9c020aaf9755dda7c8aad0563e13c6bf5ad6fb01
    makePlayer() {
        this.gameObj = add([
            sprite("player", { anim: "idle" }),
            scale(4),
            pos(this.pos),
            area({ shape: new Rect(vec2(this.width/2, this.height/2), this.width, this.height)}),
            body(),
            "player"
        ]); 
        
        this.gameObj.jumpForce = this.jumpForce;
        this.animState = this.gameObj.getCurAnim().name;
    }

    update() {
        this.playerInput();
        this.playerAnimate();
    }

    fixedUpdate() {
        this.playerMove();
    }

    playerInput() {
        if (isButtonPressed("dodge")) {
            this.dodged = true;
            this.state = "dodging";
        }
        if (isButtonDown("jump") && this.gameObj.isGrounded()) {
            this.jumped = true;
            this.state = "jumped";
        }
        if (isButtonDown("right") || isButtonDown("left")) {
            this.state = "running";
            this.isRunning = true;
        }
        else {
<<<<<<< HEAD
=======
            // if (this.gameObj.isGrounded())
            //     this.state = "idle";
            // else {
            //     if (this.gameObj.vel.y < 0) {
            //         this.state = "rising";
            //     }
            //     else {
            //         this.state = "falling";
            //     }
            // }
>>>>>>> 9c020aaf9755dda7c8aad0563e13c6bf5ad6fb01
            this.isRunning = false;
        }
    }

    playerMove() {
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

        if (this.jumped) {
            this.gameObj.jump();
            this.jumped = false;
        }

        this.gameObj.vel = vec2(this.moveX, this.gameObj.vel.y);

        if (this.dodged) {
            this.playerDodge();
            this.dodged = false;
        }
    }

    playerDodge() {
        console.log('dodged');
    }

    playerAnimate() {
<<<<<<< HEAD
=======
        //USE STATES INSTEAD
        // const nextAnimation = (anim) => {
        //     const currentAnim = this.gameObj.getCurAnim().name;
        //     if (currentAnim === anim) 
        //         return;
        //     this.gameObj.play(anim);
        // }
>>>>>>> 9c020aaf9755dda7c8aad0563e13c6bf5ad6fb01
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
<<<<<<< HEAD
=======
            
        // if(this.gameObj.vel.x < 0 ) {
        //     this.gameObj.flipX = true;
        // }
        // else if (this.gameObj.vel.x > 0) {
        //     this.gameObj.flipX = false;
        // }

        // if (this.gameObj.isGrounded() === false) {
        //     //jumping
        //     if (this.gameObj.vel.y <= 0)
        //         nextAnimation("rise");
        //     else
        //         nextAnimation("fall");
        //     return;
        // }

        // if (this.gameObj.vel.x !== 0) {
        //     nextAnimation("run");
        // }
        // else {
        //     nextAnimation("idle");
        // }
>>>>>>> 9c020aaf9755dda7c8aad0563e13c6bf5ad6fb01
    }
}

export default Player;