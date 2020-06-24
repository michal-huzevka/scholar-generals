import _ from 'underscore';
import TileView from 'js/game/core/views/TileView';
import BaseStepHandler from 'js/game/core/stepHandlers/BaseStepHandler';

class AttackUnitHandler extends BaseStepHandler {
    getStepType() {
        return 'ATTACK_UNIT';
    }

    computeStep(step, state, remainingSteps) {
        const { attackerLocation, attackedLocation } = step.data;
        const attackingUnit = this
            .viewManager
            .getView('TileView', state, { location: attackerLocation })
            .getUnit();
        let attackedUnit = this
            .viewManager
            .getView('TileView', state, { location: attackedLocation })
            .getUnit();
        let damageMultiplier = this
            .viewManager
            .getView('TileView', state, { location: attackedLocation })
            .getTile()
            .getDamageMultiplier();
            
        const dmg = Math.round(attackingUnit.getDamagePerAttack() * damageMultiplier);


        attackedUnit = attackedUnit.modifyHealth(-dmg);
        state = state.setModel(attackedUnit);

        if (attackedUnit.getHealth() === 0) {
            // kill the unit
            // this will get rid of other attacks
            remainingSteps.unshift({
                type: 'KILL_UNIT',
                data: {
                    unitLocation: attackedLocation
                }
            });
        }

        return {
            state,
            remainingSteps
        };
    }
}

export default AttackUnitHandler;