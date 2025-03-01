class HealthBar {
    constructor(maxHealth, currentHealth, owner) {
        this.owner = owner;
        this.maxHealth = maxHealth; 
        this.currentHealth = currentHealth;
        this.pos = vec2(0, 0)
        this.emptyHealthWidth = 200;
        this.barHeight = 50;
        this.currentHealthWidth = this.emptyHealthWidth;
    }

    initialize() {
        
        //setup currenthealthwidth;
        this.updateHealthBar(this.maxHealth, this.currentHealth)
        //this.pos = this.owner.gameObj.pos;

        // onUpdate(() => {
        //     drawRect({
        //         pos: this.owner.gameObj.pos,
        //         width: 100,
        //         height: 100,
        //         color: BLACK
        //     })
        //     //console.log("asdf");
        //     drawSprite({
        //         sprite: "healthbar",
        //         width: this.emptyHealthWidth, 
        //         height: this.barHeight,
        //         pos: this.pos,
        //         frame: 1,
        //     })
        //     drawSprite({
        //         sprite: "healthbar",
        //         width: this.currentHealthWidth, 
        //         height: this.barHeight,
        //         //THIS HEALTH WIDTH FORMULA IS A TEMPORARY SOLUTION
        //         pos: vec2((this.emptyHealthWidth-this.currentHealthWidth)/6, 0),
        //         frame: 0,
        //     })
        //     //console.log(this.currentHealthWidth);
        // })
    }

    drawHealthBar() {
        drawRect({
            pos: this.owner.gameObj.pos,
            width: 100,
            height: 100,
            color: BLACK
        })
        // //console.log("asdf");
        drawSprite({
            sprite: "healthbar"
        })
        // drawSprite({
        //     sprite: "healthbar",
        //     width: this.emptyHealthWidth, 
        //     height: this.barHeight,
        //     pos: this.pos,
        //     frame: 1,
        // })
        // drawSprite({
        //     sprite: "healthbar",
        //     width: this.currentHealthWidth, 
        //     height: this.barHeight,
        //     //THIS HEALTH WIDTH FORMULA IS A TEMPORARY SOLUTION
        //     pos: vec2((this.emptyHealthWidth-this.currentHealthWidth)/6, 0),
        //     frame: 0,
        // })
    }

    updateHealthBar(maxHealth, currentHealth) {
        if (currentHealth <= 0) {
            this.currentHealthWidth = 1;
            return;
        }

        const currentHealthRatio = currentHealth/maxHealth;
        this.currentHealthWidth = this.emptyHealthWidth*currentHealthRatio;
    }
}

export default HealthBar;