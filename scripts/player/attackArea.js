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
            //this.draw();
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
        //console.log("existing")
        //console.log("asdfasdf");
        if (this.attacking) {
            this.attackTarget(this.attacker.attackDamage, targets);
            return;
        }
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
    
    
    attackTarget(damage, targets) {
        if (targets.length === 0) {
            return;
        }
        //console.log(targets);

        targets.forEach((target) => {
            
            if (!this.gameObj.isOverlapping(target)) {
                //console.log(target.id);
                return;
            }
            if (this.alreadyHit.has(target.id)) {
                //console.log("hit already");
                return;
            }
            this.alreadyHit.add(target.id);
            //console.log("hit")
            //console.log(this.attacker.tags);
            //console.log(this);
            target.isHit(0, damage, this.attacker);
        });
    }

    attackEnd() {
        this.attacking = false;
        this.colliderColor = RED;
        this.alreadyHit.clear();
    }

    setTimer(attackDuration) {
        wait(attackDuration, () => {
            this.attackEnd();
        }) 
    }
}
export default AttackArea;