import { getCamLeftEnd } from "../utils/camera.js";

class DodgeBar {
    constructor(owner) {
        this.owner = owner;
        this.pos = vec2(0, 0)
    }
    
    initialize() {
        onUpdate(() => {
            this.pos = getCamLeftEnd();
            this.drawDodgies();
        }) 
    }
    
    drawDodgies() {
        const dodgeMax = this.owner.dodgeAmountMax;
        const dodgeAmount = this.owner.dodgeAmount;
        const width = 50;
        const gap = 40;
        for (let i = 0; i < dodgeMax; i++) {
            drawSprite({
                sprite: "dodgy",
                pos: this.pos.add(vec2(gap*i, 40)),
                width: width,
                color: BLACK,
            })
            if (i < dodgeAmount) {
                drawSprite({
                    sprite: "dodgy",
                    pos: this.pos.add(vec2(gap*i, 40)),
                    width: width, 
                })
            }
        }
    }
}

export default DodgeBar;