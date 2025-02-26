class Zombie {
    constructor(initialX, initialY) {
        this.pos = vec2(initialX, initialY);
        this.speed = 100;
        this.accel = 5;
        this.width = 10;
        this.height = 28;
        this.moveX = 0;

        this.isWalking = false;
        this.attacking = false;
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
            this.followPlayer();
        }) 
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

    followPlayer() {
        const player = get("player")[0];
        if (!player) {
            this.isWalking = false;
            return
        }
        this.isWalking = true;

        const distanceToPlayer = player.pos.sub(this.gameObj.pos);
        //console.log(distanceToPlayer);

        //move to player
        this.moveX +=Math.sign(distanceToPlayer.x)*this.accel;
        if (Math.abs(this.moveX) >= this.speed) {
            this.moveX = Math.sign(this.moveX)*this.speed;        
        }

        this.gameObj.vel = vec2(
            this.moveX,
            this.gameObj.vel.y 
        );
    }
}

export default Zombie;