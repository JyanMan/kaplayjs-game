class HealthBar {
    constructor(maxHealth, currentHealth) {
        this.maxHealth = maxHealth; 
        this.currentHealth = currentHealth;
        this.pos = vec2(0, 0)
        this.emptyHealthWidth = 200;
        this.barHeight = 50;
        this.currentHealthWidth = this.emptyHealthWidth;
    }

    initialize() {
        // this.gameObj = add([
        //     sprite('healthbar', { frame: 1 }),
        //     scale(4),
        //     pos(0, 0)
        // ])
        
        //setup currenthealthwidth;
        this.updateHealthBar(this.maxHealth, this.currentHealth)

        onUpdate(() => {
            //console.log(this.owner.width*this.owner.scale.x);
            //console.log(this.currentHealth, this.maxHealth);
            drawSprite({
                sprite: "healthbar",
                width: this.emptyHealthWidth, 
                height: this.barHeight,
                pos: this.pos,
                frame: 1,
            })
            drawSprite({
                sprite: "healthbar",
                width: this.currentHealthWidth, 
                height: this.barHeight,
                //THIS HEALTH WIDTH FORMULA IS A TEMPORARY SOLUTION
                pos: vec2((this.emptyHealthWidth-this.currentHealthWidth)/6, 0),
                frame: 0,
            })
            console.log(this.currentHealthWidth);
        })
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