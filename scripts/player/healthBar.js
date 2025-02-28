class HealthBar {
    constructor(owner) {
        this.owner = owner;
    }

    initialize() {
        this.gameObj = add([
            sprite('healthbar', { frame: 1 }),
            scale(4),
            pos(0, 0)
        ])
    }

    updateHealthBar() {

    }
}

export default HealthBar;