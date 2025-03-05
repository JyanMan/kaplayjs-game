import Player from "../../player/player.js"
import { cameraAttach } from "../../utils/camera.js";
import { Level } from "../level.js";
import { levelMappings } from "../generalMappings.js";
import { level2Layout } from "./levelLayout.js";
import { generateLevel2Entities } from "./level2Entities.js";

export const levelTwo = () => {

    const player = new Player(200, 0, 20)
    
    function start() {
        
        const level = new Level(2);
        level.drawBackground(4);
        level.drawMapLayout(level2Layout, levelMappings);
        player.makePlayer();
        
        generateLevel2Entities();
        level.onCheckLevelFinished(player);

        cameraAttach(player);
    }
    
    setGravity(1600);
    start();
}