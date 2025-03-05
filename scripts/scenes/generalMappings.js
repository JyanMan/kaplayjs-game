import Bat from "../entities/bat.js";

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
            offscreen({ hide: true}),
            layer("foreground")
        ],
        3: () => [
            sprite(`${tiletype}-tileset`, {anim: "l"}),
            offscreen({ hide: true}),
            layer("foreground")
        ],
        4: () => [
            sprite(`${tiletype}-tileset`, {anim: "r"}),
            offscreen({ hide: true}),
            layer("foreground")
        ],
        5: () => [
            sprite(`${tiletype}-tileset`, {anim: "l"}),
            area(),
            body({ isStatic: true }),
            offscreen({ hide: true}),
            layer("foreground")
        ],
        6: () => [
            sprite(`${tiletype}-tileset`, {anim: "r"}),
            area(),
            body({ isStatic: true }),
            offscreen({ hide: true}),
            layer("foreground")
        ],
        "e": () => [
            sprite(`crystal-idle`, { anim: "idle" }),
            offscreen({ hide: true}),
            layer("object"),
            area(),
            "end-crystal"
        ],
        'g': () => [
            sprite('gun', { anim: 'idle' }),
            offscreen({ hide: true }),
            layer("object"),
            area(),
            'unowned-gun'
        ]
    }
}