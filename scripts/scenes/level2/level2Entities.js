import Bat from "../../entities/bat.js";
import Zombie from "../../entities/zombie.js";

export function generateLevel2Entities() {
    new Bat(1070, 200, 5).makeBat();
    new Zombie(1050, 200, 10);
}