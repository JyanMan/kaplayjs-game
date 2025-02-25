export function vec2Product(vec, m) {
    return vec2(vec.x*m, vec.y*m) 
}

export function normalizeVec(vec, len) {
    const vecLength = (len) ? len : vec.len();
    return vec2(vec.x/vecLength, vec.y/vecLength);
}