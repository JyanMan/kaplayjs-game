import Bat from "../../entities/bat.js";
import Zombie from "../../entities/zombie.js";

export function generateLevel2Entities() {
    new Bat(1070, 200, 5);
    new Bat(1630, 610, 5);
    new Bat(1451, 200, 5);
    new Bat(1500, 200, 5);
    new Bat(2105, 0, 5);
    new Zombie(2646, 322, 10);
    new Bat(2259, 610, 5);

    //new Zombie(1050, 200, 10);
}