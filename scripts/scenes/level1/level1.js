import Player from "../../player/player.js"
import { cameraAttach } from "../../utils/camera.js";
import { Level } from "../level.js";
import { levelMappings } from "../generalMappings.js";
import { level1Layout } from "./levelLayout.js";
import { generateLevel1Entities } from "./level1Entities.js";

export const levelOne = () => {
    const player = new Player(200, 0, 20);
    
    function start() {
        
        const level = new Level(1);
        level.drawBackground(4);
        level.drawMapLayout(level1Layout, levelMappings);
        player.makePlayer();
        generateLevel1Entities();

        level.onCheckLevelFinished(player);
    }
    
    onUpdate(() => {
        cameraAttach(player);
    });
    
    setGravity(1600);
    start();
}