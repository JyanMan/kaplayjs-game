class DodgeBar {
    constructor(owner) {
        this.owner = owner;
        this.pos = vec2(0, 0)
    }
    
    initialize() {
        const dodgeMax = this.owner.dodgeAmountMax;
        //const dodgeAmount = this.owner.dodgeAmount;
        const gap = 40;
        this.dodgies = [];
        for (let i = 0; i < dodgeMax; i++) {
            this.dodgies.push(add([
                sprite("dodgy"),
                fixed(),
                pos(gap*i, 20),
                scale(4),
                color(WHITE),
                z(1)
            ]))
        }
        onUpdate(() => {
            this.updateDodgies();
        })
    }

    updateDodgies() {
        const dodgeMax = this.owner.dodgeAmountMax;
        const dodgeAmount = this.owner.dodgeAmount;
        
        for (let i = dodgeMax-1; i >= 0; i--) {
            if (i >= dodgeAmount) {
                this.dodgies[i].color = BLACK;
            }
            else {
                this.dodgies[i].color = WHITE;
            }
        }
    }
}

export default DodgeBar;