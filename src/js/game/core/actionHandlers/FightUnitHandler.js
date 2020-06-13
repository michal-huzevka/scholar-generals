import TileView from 'js/game/core/views/TileView';
import BaseActionHandler from 'js/game/core/actionHandlers/BaseActionHandler';

class FightUnitHandler extends BaseActionHandler {
    getActionType() {
        return 'FIGHT_UNIT';
    }

    computeAction(action, state) {
        // if unit has already attacked, return early
        const { attackerLocation, attackedLocation } = action.data;
        const attackingUnit = this
            .viewManager
            .getView('TileView', state, { location: attackerLocation })
            .getUnit();
        const defendingUnit = this
            .viewManager
            .getView('TileView', state, { location: attackedLocation })
            .getUnit();

        if (!attackingUnit.canAttack()) {
            return [];
        }

        const steps = [];
        let done = false;
        let attackerAttacksLeft = attackingUnit.getAttackCount();
        let defenderAttacksLeft = defendingUnit.getAttackCount();

        if (defendingUnit.isRanged() || attackingUnit.isRanged()) {
            // ranged units cant defend
            // units targetted by ranged attacks also can' defend
            defenderAttacksLeft = 0;
        }
        // alternate attacks
        while (!done) {
            if (attackerAttacksLeft > 0) {
                steps.push({
                    type: 'ATTACK_UNIT',
                    data: {
                        attackerLocation,
                        attackedLocation
                    }
                });
                attackerAttacksLeft--;
            }
            if (defenderAttacksLeft > 0) {
                steps.push({
                    type: 'ATTACK_UNIT',
                    data: {
                        // reverse attacker location and attacked location
                        attackerLocation: attackedLocation,
                        attackedLocation: attackerLocation
                    }
                });
                defenderAttacksLeft--;
            }
            if (attackerAttacksLeft === 0 && defenderAttacksLeft === 0) {
                done = true;
            }
        }

        steps.push({
            type: 'EXHAUST_UNIT',
            data: {
                unitLocation: attackerLocation
            }
        });

        return steps;
    }
}

export default FightUnitHandler;