class AttackArea {
    constructor(attacker, radius, target) {
        this.attacker = attacker;
        this.radius = radius;
        this.attacking = false;
        this.scale = this.attacker.scale.x;
        this.target = target;

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
            this.draw();
        }) 
    }
    draw() {
        const obj = this.gameObj;
        const objVertices = obj.worldArea().pts
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
        //console.log(this.gameObj.pos.x);
        this.gameObj.pos = vec2(this.radius*direction/2, 0)
        .add(
            vec2(
                this.attacker.width/2,
                this.attacker.height/2
            )
        )
    }
    
    attackEnemy() {
        const enemy = get("zombie")[0];
        if (this.gameObj.isOverlapping(enemy)) {
            //console.log("enemy");
            //console.log(enemy.isHit);
            enemy.isHit();
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