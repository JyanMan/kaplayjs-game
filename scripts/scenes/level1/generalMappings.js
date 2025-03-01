export const levelMappings = generateMappings('block');

function generateMappings(tiletype) {
    console.log(`${tiletype}-tileset`);
    return {
        0: () => [
            sprite(`${tiletype}-tileset`, {anim: "tl"}),
            area(),
            body({ isStatic: true }),
            offscreen()
        ],
        1: () => [
            sprite(`${tiletype}-tileset`, {anim: "tm"}),
            area(),
            body({ isStatic: true }),
            offscreen()
        ],
    }
}