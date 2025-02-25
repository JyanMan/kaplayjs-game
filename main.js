import kaplay from "https://unpkg.com/kaplay@3001/dist/kaplay.mjs";
import { load } from "./scripts/utils/loader.js";
import { levelOne } from "./scripts/scenes/level1.js";

kaplay({
    width: 1280,
    height: 720,
    letterbox: true,
    background: [120, 150, 120],
    buttons: {
        jump: {
            keyboard: ["space", "up"]
        },
        left: {
            keyboard: ["a", "left"]
        },
        right: {
            keyboard: ["d", "right"]
        },
        dodge: {
            keyboard: ["q"],
            mouse: ["right"]
        }
    }
});


load.assets();

const scenes = {
    level1: () => {
        levelOne();
    },
    level2: () => {

    }
}

for (let key of Object.keys(scenes)) {
    scene(key, scenes[key]);
}

go("level1"); 
