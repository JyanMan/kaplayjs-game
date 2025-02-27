class AttackArea {
    constructor(attacker, radius) {
        this.attacker = attacker;
        this.radius = radius;
        this.attacking = false;
        this.scale = this.attacker.scale.x;

        //for debugging, drawing area rect
        this.colliderColor = RED;
    }

    initialize() {
        this.gameObj = this.attacker.add([
            area({
                shape: new Rect(
                    vec2(0, 0),
                    this.radius,
                    this.radius
                ),
                offset: vec2(-this.radius/2, -this.radius/2) 
            }),
            scale(1),
            pos(vec2(32, 0))
        ])

        onUpdate(() => {
            //console.log(this.attacker.width);
            this.draw();    
            //console.log(this.gameObj.area.shape.pos)
            //this.gameObj.pos = this.attacker.pos;
            //console.log(this.gameObj.pos)
            // this.gameObj.pos = vec2(0, 0);
            // const enemy = get("zombie")[0];
            // if (this.gameObj.isOverlapping(enemy)) {
            //     console.log("enemy");
            // }
            //console.log(this.gameObj.worldArea().pts[0], this.attacker.pos.x);
        }) 
    }
    draw() {
        const obj = this.gameObj;
        const objVertices = obj.worldArea().pts
        // drawRect({
        //     width: this.radius*this.scale,
        //     height: this.radius*this.scale,
        //     pos: this.gameObj.worldArea().pts[0], 
        //     //this might be confusing, but the position is  drawing rects is
        //     //just offset for some reason.
        //     color: this.colliderColor
        // })
        drawPolygon({
            pts: [
                objVertices[0],
                objVertices[1],
                objVertices[2],
                objVertices[3],
            ],
            pos: vec2(0, 0),
            color: this.colliderColor
        })
    }

    attack(direction, attackDuration) {
        if (this.attacking) {
            this.attackEnemy();
            return;
        }
        this.attacking = true;
        this.setTimer(attackDuration);
        this.colliderColor = GREEN;
        //console.log("attacking");
        console.log(this.gameObj.pos.x);
        this.gameObj.pos = vec2(this.radius*direction/2, 0)
        .add(
            vec2(
                this.attacker.width/2,
                this.attacker.height/2
            )
        )
        // .add(
        //     vec2(
        //         this.attacker.width/2,
        //         (this.attacker.height/2)-(this.radius/2)
        //     ).add( //anotehr offset, as center of sprite is not the actual center
        //         vec2(
        //            -this.attacker.area.offset.x,
        //            this.attacker.area.offset.y 
        //         )
        //     )
        // );  //this.radius*direction;
    }
    
    attackEnemy() {
        const enemy = get("zombie")[0];
        if (this.gameObj.isOverlapping(enemy)) {
            console.log("enemy");
        }
    }

    attackEnd() {
        this.attacking = false;
        this.colliderColor = RED;
    }

    setTimer(attackDuration) {
        wait(attackDuration, () => {
            this.attackEnd();
        }) 
    }
}
export default AttackArea;