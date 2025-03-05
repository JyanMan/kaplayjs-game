export function drawObjArea(obj, color) {
    if (!obj) {
        return;
    }
    const objVertices = obj.worldArea().pts
    drawPolygon({
        pts: [
            objVertices[0],
            objVertices[1],
            objVertices[2],
            objVertices[3],
        ],
        z: 10,
        pos: vec2(0, 0),
        color: color || YELLOW,
        layer: "ui"
    })

}

export function drawObjCenter(obj, color) {
    //draw the center
    drawCircle({
        pos: obj.pos,
        radius: 10,
        color: color || GREEN 
    })
}