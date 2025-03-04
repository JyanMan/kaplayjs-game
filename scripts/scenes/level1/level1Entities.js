import Zombie from "../../entities/zombie.js";

export function generateLevel1Entities() {
    new Zombie(width()/2, 20, 10);
    new Zombie(900, 20, 10);
    new Zombie(2364, 200, 10);
}