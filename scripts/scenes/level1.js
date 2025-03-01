import Zombie from "../entities/zombie.js";
import Player from "../player/player.js"
import { cameraAttach } from "../utils/camera.js";
import Ground from "../utils/ground.js"
import { Level } from "./level.js";
import { levelMappings } from "./level1/generalMappings.js";
import { level1Layout } from "./level1/levelLayout.js";

export const levelOne = () => {
    
    const groundColor = [100, 80, 70];

    const player = new Player(200, 0, 20);
    const mainFloor = new Ground(
        0, height()-100, width(), 100, groundColor
    )
    const platform1 = new Ground(
        200, mainFloor.y-170, 300, 50, groundColor
    );

    const zombie = new Zombie(width()/2, 20, 10);
    const zombie2 = new Zombie(60, 40, 10);
    
    function start() {
        player.makePlayer();
        //platform1.makeGround();
        //mainFloor.makeGround();
        zombie.makeZombie();
        //zombie2.makeZombie();

        //console.log(levelLayout);

        const level = new Level();
        level.drawMapLayout(level1Layout, levelMappings);
    }
    
    onUpdate(() => {
        //console.log(player.gameObj.pos);
        //setCamPos(player.gameObj.pos);
        cameraAttach(player);
    });
    
    onFixedUpdate(() => {
    });
    
    setGravity(1200);
    start();
}