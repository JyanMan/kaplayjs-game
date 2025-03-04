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

    if (entity.healthBar) {
        entity.healthBar.updateHealthBar(entity.maxHealth, entity.health);
    }
    
    if (!entity.knocked) {
        entity.knocked = true
        knockback(entity, attacker);
        entity.gameObj.color = BLACK;
        setKnockTimer(entity);
    }
    
    if (entity.health <= 0) {
        for (const child of entity.gameObj.children) {
            entity.gameObj.destroy(child);
        }
        entity.objDestroyed = true;
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
    const knockDirection = normalizeVec(entity.gameObj.pos.sub(attacker.pos).add(vec2(0, -50)));
    entity.gameObj.vel = vec2Product(knockDirection, attacker.knockStrength*2);
}