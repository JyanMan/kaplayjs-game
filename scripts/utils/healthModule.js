import { normalizeVec } from "./vector2.js";
import { vec2Product } from "./vector2.js";

export function isHit(entity, damage, attacker) {
    
    if (entity.dodged || entity.slowAfterDodge) {
        return;
    }
    
    if (!attacker) {
        return;
    }
    entity.health -= damage;
    console.log(entity.health);
    //console.log(this.health);

    if (entity.healthBar) {
        console.log("asdfadf");
        entity.healthBar.updateHealthBar(entity.maxHealth, entity.health);
    }
    
    if (!entity.knocked) {
        entity.knocked = true
        knockback(entity, attacker);
        entity.gameObj.color = BLACK;
        setKnockTimer(entity);
    }
    
    if (entity.health <= 0) {
        console.log("DEAD");
        destroy(entity.gameObj);
    }
}

function setKnockTimer(entity) { //MAKE ONE FUNCTION SETTIMER NEXT TIME
    wait(0.2, () => {
        entity.knocked = false;
        entity.gameObj.color = WHITE;
    });
}
    
function knockback(entity, attacker) {
    const knockDirection = normalizeVec(entity.gameObj.pos.sub(attacker.pos));
    //console.log(knockDirection);
    //console.log(this.gameObj.vel);
    entity.gameObj.vel = vec2Product(knockDirection, attacker.knockStrength*2);
    //this.gameObj.addForce(vec2Product(knockDirection, attacker.knockStrength*100));
    //this.gameObj.vel = knockDirection*attacker.knockStrength;
}