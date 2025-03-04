import Player from "../../player/player.js"
import { cameraAttach } from "../../utils/camera.js";
import { Level } from "../level.js";
import { levelMappings } from "./generalMappings.js";
import { level1Layout } from "./levelLayout.js";
import { generateLevel1Entities } from "./level1Entities.js";

export const levelOne = () => {
    console.log("called agian");
    const player = new Player(200, 0, 20)
    
    function start() {
        
        const level = new Level();
        level.drawBackground(4);
        level.drawMapLayout(level1Layout, levelMappings);
        player.makePlayer();
        generateLevel1Entities();
        
        const completedLevels = JSON.parse(sessionStorage.getItem("completedLevels"));
        console.log(completedLevels);
    }
    
    onUpdate(() => {
        cameraAttach(player);
    });
    
    setGravity(1600);
    start();
}