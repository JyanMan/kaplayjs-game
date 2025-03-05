export function getCamLeftEnd() {
    return getCamPos().sub(vec2(width()/2, height()/2));
}

export function cameraAttach(obj) {
    setCamPos(obj.gameObj.pos);
    onUpdate(() => {
        const lerpValue = 0.08
        const pos = getCamPos().lerp(obj.gameObj.pos, lerpValue);
        setCamPos(pos);
    })
}