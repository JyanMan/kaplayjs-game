import { ownGun } from "../weapons/playerGun.js";

export function checkForPickups(player) {
    player.gameObj.onCollide((obj) => {
        if (obj.is('unowned-gun')) {
            ownGun(player);
            destroy(obj);
        }
    })
}