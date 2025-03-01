export function vec2Product(vec, m) {
    return vec2(vec.x*m, vec.y*m) 
}

export function normalizeVec(vec, len) {
    const vecLength = (len) ? len : vec.len();
    return vec2(vec.x/vecLength, vec.y/vecLength);
}

export function getCenterPos(obj) {
    const scale = obj.gameObj.scale.x;
    const area = obj.gameObj.area;
    
    return obj.gameObj.pos.add(vec2(
        obj.width*scale,
        obj.height*scale
    )).add(vec2(
        area.offset.x*scale,
        area.offset.y*scale
    ))
}

export function mousePosWithCam() {
    return getCamPos().sub(vec2(width()/2, height()/2)).add(
        mousePos()
    );
}