class AttackArea {
    constructor(attacker) {
        //USE TARGET VARIABLE
        this.attacker = attacker;
        this.radius = attacker.attackRadius;
        this.attacking = false;
        this.scale = attacker.scale.x;

        this.alreadyHit = new Set();

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
           // console.log(this.attacker.attackRadius);
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

    attack(direction, targets) {
        if (this.attacking) {
            this.attackEnemy(this.attacker.attackDamage, targets);
            return;
        }
        this.alreadyHit.clear();
        //console.log("asdf")
        this.attacking = true;
        this.setTimer(this.attacker.attackDuration);
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
        //SOMETHING TO FIX
    }
    
    attackEnemy(damage, targets) {
        //console.log(targets);
        if (targets.length === 0) {
            return;
        }

        targets.forEach((target) => {

            console.log(target.id);
            if (this.alreadyHit.has(target.id)) {
                console.log("hit already");
                return;
            }
            this.alreadyHit.add(target.id);

            // //check if target is already attacked
            // if (target.tags.some(tag => this.alreadyHit.has(tag))) {
            //     console.log(this.alreadyHit);
            //     return;
            // }
            // //otherwise, add the target tag to already attacked list
            // target.tags.forEach(tag => {
            //     if (tag !== "*") {
            //         this.alreadyHit.add(tag);
            //     }
            // });
    
            if (this.gameObj.isOverlapping(target)) {
                target.isHit(damage, this.attacker);
            }
        });
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