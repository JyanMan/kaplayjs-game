//import kaplay from "https://unpkg.com/kaplay@3001/dist/kaplay.mjs";
import kaplay from "./lib/kaplay.mjs";
import { load } from "./scripts/utils/loader.js";
import { levelOne } from "./scripts/scenes/level1/level1.js";
import { uiManager } from "./scripts/utils/UIManager.js";

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
        },
        attack: {
            mouse: ["left"]
        }
    }
});


setLayers(
    ["foreground", "background", "object", "ui"],
    "object"
)
load.assets();

const scenes = {
    menu: () => {
        uiManager.displayMainMenu();
    },
    level1: () => {
        levelOne();
    },
    level2: () => {

    }
}

for (let key of Object.keys(scenes)) {
    scene(key, scenes[key]);
}

go("menu"); 
