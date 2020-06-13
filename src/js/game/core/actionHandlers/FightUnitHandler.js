import TileView from 'js/game/core/views/TileView';

class FightUnitHandler {
    getActionType() {
        return 'FIGHT_UNIT';
    }

    computeAction(action, state) {
        // if unit has already attacked, return early
        const { attackerLocation, attackedLocation } = action.data;
        const attackingUnit = TileView.buildFromLocation(state, attackerLocation).getUnit();
        const defendingUnit = TileView.buildFromLocation(state, attackedLocation).getUnit();

        if (!attackingUnit.canAttack()) {
            return [];
        }

        const steps = [];
        let done = false;
        let attackerAttacksLeft = attackingUnit.getAttackCount();
        let defenderAttacksLeft = defendingUnit.getAttackCount();
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