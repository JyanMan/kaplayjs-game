import Zombie from "../../entities/zombie.js";

export function generateLevel1Entities() {
    const zombie = new Zombie(width()/2, 20, 10);
    const zombie2 = new Zombie(800, 20, 10);
    const zombie3 = new Zombie(900, 20, 10);
    new Zombie(900, 20, 10);
    new Zombie(900, 20, 10);
    new Zombie(900, 20, 10);

}