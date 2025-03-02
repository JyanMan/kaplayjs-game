export const levelMappings = generateMappings('mr');

function generateMappings(tiletype) {
    console.log(`${tiletype}-tileset`);
    return {
        0: () => [
            sprite(`${tiletype}-tileset`, {anim: "tl"}),
            area(),
            body({ isStatic: true }),
            offscreen({ hide: true})
        ],
        1: () => [
            sprite(`${tiletype}-tileset`, {anim: "tm"}),
            area(),
            body({ isStatic: true }),
            offscreen({ hide: true})
        ],
        "=": () => [
            sprite(`${tiletype}-tileset`, {anim: "g"}),
            area(),
            body({ isStatic: true }),
            offscreen({ hide: true})
        ],
        2: () => [
            sprite(`${tiletype}-tileset`, {anim: "d"}),
            area(),
            offscreen({ hide: true}),
            z(-1)
        ],
        3: () => [
            sprite(`${tiletype}-tileset`, {anim: "l"}),
            area(),
            offscreen({ hide: true}),
            z(-1)
        ],
        4: () => [
            sprite(`${tiletype}-tileset`, {anim: "r"}),
            area(),
            offscreen({ hide: true}),
            z(-1)
        ]
    }
}