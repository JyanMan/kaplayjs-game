class DodgeBar {
    constructor(owner) {
        this.owner = owner;
    }
    
    initialize() {
        onUpdate(() => {
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
                pos: vec2(gap*i, 40),
                width: width,
                color: BLACK,
            })
        }
        
        for (let i = 0; i < dodgeAmount; i++) {
            drawSprite({
                sprite: "dodgy",
                pos: vec2(gap*i, 40),
                width: width, 
            })
        }
    }
}

export default DodgeBar;