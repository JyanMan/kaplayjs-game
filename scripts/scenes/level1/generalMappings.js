export const levelMappings = generateMappings('mr');

function generateMappings(tiletype) {
    console.log(`${tiletype}-tileset`);
    return {
        0: () => [
            sprite(`${tiletype}-tileset`, {anim: "tl"}),
            area(),
            body({ isStatic: true }),
            offscreen({ hide: true}),
            layer("foreground")
        ],
        1: () => [
            sprite(`${tiletype}-tileset`, {anim: "tm"}),
            area(),
            body({ isStatic: true }),
            offscreen({ hide: true}),
            layer("foreground")
        ],
        "=": () => [
            sprite(`${tiletype}-tileset`, {anim: "g"}),
            area(),
            body({ isStatic: true }),
            offscreen({ hide: true}),
            layer("foreground")
        ],
        2: () => [
            sprite(`${tiletype}-tileset`, {anim: "d"}),
            area(),
            offscreen({ hide: true}),
            z(-1),
            layer("foreground")
        ],
        3: () => [
            sprite(`${tiletype}-tileset`, {anim: "l"}),
            area(),
            offscreen({ hide: true}),
            z(-1),
            layer("foreground")
        ],
        4: () => [
            sprite(`${tiletype}-tileset`, {anim: "r"}),
            area(),
            offscreen({ hide: true}),
            z(-1),
            layer("foreground")
        ],
        "e": () => [
            sprite(`crystal-idle`, { anim: "idle" }),
            area(),
            offscreen({ hide: true}),
            layer("object"),
        ]
    }
}