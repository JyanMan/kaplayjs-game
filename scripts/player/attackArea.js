class AttackArea {
    constructor(attacker, radius) {
        this.attacker = attacker;
        this.radius = radius;
        this.attacking = false;
    }

    initialize() {
        this.gameObj = this.attacker.add([
            area({
                shape: new Rect(
                    vec2(0, 0),
                    this.radius,
                    this.radius
                ),
                offset: vec2(0, 0) 
            }),
            scale(1),
            pos(this.attacker.pos)
        ])

        onUpdate(() => {
            this.draw();    
            //console.log(this.gameObj.area.shape.pos)
            //this.gameObj.pos = this.attacker.pos;
            //console.log(this.gameObj.pos)
            // this.gameObj.pos = vec2(0, 0);
            // const enemy = get("zombie")[0];
            // if (this.gameObj.isOverlapping(enemy)) {
            //     console.log("enemy");
            // }
        }) 
    }
    draw() {
        const obj = this.gameObj;
        drawRect({
            width: this.radius*4,
            height: this.radius*4,
            pos: this.attacker.pos,
            color: YELLOW
        })
    }

    attack(direction, attackDuration) {
        if (!this.attacking) {
            this.attacking = true;
            this.setTimer(attackDuration);
        }

        this.gameObj.pos = vec2(this.radius*direction/2, 0);  //this.radius*direction;
        const enemy = get("zombie")[0];
        if (this.gameObj.isOverlapping(enemy)) {
            console.log("enemy");
        }
    }

    setTimer(attackDuration) {
        wait(attackDuration, () => {
            this.attacking = false;
        }) 
    }
}
export default AttackArea;