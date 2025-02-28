import Zombie from "../entities/zombie.js";
import Player from "../player/player.js"
import Ground from "../utils/ground.js"

export const levelOne = () => {
    
    const groundColor = [100, 80, 70];

    const player = new Player(width()/2, 0, 20);
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
        platform1.makeGround();
        mainFloor.makeGround();
        zombie.makeZombie();
        //zombie2.makeZombie();
    }
    
    onUpdate(() => {
    });
    
    onFixedUpdate(() => {
    });
    
    setGravity(1200);
    start();
}