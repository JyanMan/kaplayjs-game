import { getCenterPos } from "./vector2.js";

export function getCamLeftEnd() {
    return getCamPos().sub(vec2(width()/2, height()/2));
}

export function cameraAttach(obj) {
    setCamPos(getCenterPos(obj))
}