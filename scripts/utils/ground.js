class Ground {
    constructor (x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    makeGround() {
        this.gameObj = add([
            rect(this.width, this.height),
            pos(this.x, this.y),
            color(this.color),
            body({ isStatic: true }),
            area(),
            "ground"
        ])
    }
}

export default Ground;