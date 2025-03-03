class HealthBar {
    constructor(maxHealth, currentHealth, owner) {
        this.owner = owner;
        this.maxHealth = maxHealth; 
        this.currentHealth = currentHealth;
        this.healthOffsetWidth = 32;
    }

    initialize() {
        this.emptyHealthObj = add([
            fixed(),
            sprite("healthbar", {frame: 1}),
            scale(4),   
            z(1)
        ])
        this.currentHealthObj = add([
            fixed(),
            sprite("healthbar", {frame: 0}),
            scale(4),
            pos(0, 0),
            z(2)
        ])
    }

    updateHealthBar(maxHealth, currentHealth) {
        if (currentHealth <= 0) {
            this.currentHealthObj.width = 0.1;
            //this.currentHealthObj.hide = true;
            return;
        }

        //change width of current health
        const currentHealthRatio = currentHealth/maxHealth;
        this.currentHealthObj.width = this.emptyHealthObj.width*currentHealthRatio;
        
        //change the health offset, because the spritesheet has left offset
        const healthOffsetX = this.healthOffsetWidth*currentHealthRatio;
        const offsetX = this.healthOffsetWidth-healthOffsetX;
        this.currentHealthObj.pos = vec2((offsetX), 0);
    }
}

export default HealthBar;