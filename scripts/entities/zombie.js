class Zombie {
    constructor(
        initialX, 
        initialY
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
        this.state = "idle";
        this.animState = "idle";
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
            "zombie"
        ]);

        onUpdate(() => {
            this.draw();
            this.animation();
        }) 
        onFixedUpdate(() => {
            this.move();
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
        if (this.isWalking) {
            this.state = "run";
        }
        else {
            this.state = "idle";
        }

        const currentAnim =
            (this.state === "run") ? "run" :
            "idle";
        
        if (currentAnim !== this.animState) {
            this.animState = currentAnim;
            this.gameObj.play(currentAnim);
        }
        
        this.gameObj.flipX = !this.faceRight;
    }
}

export default Zombie;