export function withinRadius(obj1, obj2, radius) {
    const dist = obj2.pos.sub(obj1.pos);
    if (dist.len() <= radius) {
        return true;
    }
    return false;
}