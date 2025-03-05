//import kaplay from "https://unpkg.com/kaplay@3001/dist/kaplay.mjs";
import kaplay from "./lib/kaplay.mjs";
import { load } from "./scripts/utils/loader.js";
import { levelOne } from "./scripts/scenes/level1/level1.js";
import { uiManager } from "./scripts/utils/UIManager.js";
import { levelTwo } from "./scripts/scenes/level2/level2.js";

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
        },
        shoot: {
            keyboard: ["shift"]
        }
    }
});

setLayers(
    ["foreground", "background", "object", "ui"],
    "object"
)


load.assets();
const storedCompletedLevels = JSON.parse(sessionStorage.getItem("completedLevels"));

const completedLevels = (!storedCompletedLevels) ?
    new Set([0]) :
    new Set([...storedCompletedLevels]);

// const completedLevels = new Set([0]);
sessionStorage.setItem("completedLevels", JSON.stringify([...completedLevels]));

const scenes = {
    menu: () => {
        uiManager.displayMainMenu();
    },
    levelsMenu: () => {
        uiManager.displayLevels(2);
    },
    level1: () => {
        levelOne();
    },
    level2: () => {
        levelTwo();
    },
    defeat: () => {
        uiManager.displayDefeated();
    }
}

for (let key of Object.keys(scenes)) {
    scene(key, scenes[key]);
}

go("menu"); 
