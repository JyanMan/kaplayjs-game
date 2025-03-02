import Player from "../../player/player.js"
import { cameraAttach } from "../../utils/camera.js";
import { Level } from "../level.js";
import { levelMappings } from "./generalMappings.js";
import { level1Layout } from "./levelLayout.js";
import { generateLevel1Entities } from "./level1Entities.js";

export const levelOne = () => {

    
    //const zombie2 = new Zombie(60, 40, 10);
    const player = new Player(200, 0, 20)
    
    function start() {
        
        //const zombie = new Zombie(width()/2, 20, 10);
        const level = new Level();
        level.drawMapLayout(level1Layout, levelMappings);
        level.drawBackground(4);
        
        generateLevel1Entities();
        player.makePlayer();
    }
    
    onUpdate(() => {
        //console.log(player.gameObj.pos);
        //setCamPos(player.gameObj.pos);
        cameraAttach(player);
    });
    
    onFixedUpdate(() => {
    });
    
    setGravity(1600);
    start();
}