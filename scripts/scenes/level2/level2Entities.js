import Bat from "../../entities/bat.js";
import Zombie from "../../entities/zombie.js";

export function generateLevel2Entities() {
    // new Zombie(width()/2, 20, 10);
    // new Zombie(2364, 200, 10);
    // new Zombie(900, 20, 10);
    // new Zombie(900, 20, 10);
    new Bat(50, 50, 5).makeBat();
}