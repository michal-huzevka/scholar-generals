import _ from 'underscore';
import TileView from 'js/game/core/views/TileView';

class AttackUnitHandler {
    getStepType() {
        return 'ATTACK_UNIT';
    }

    computeStep(step, state, remainingSteps) {
        const { attackerLocation, attackedLocation } = step.data;
        const attackingUnit = TileView.buildFromLocation(state, attackerLocation).getUnit();
        let attackedUnit = TileView.buildFromLocation(state, attackedLocation).getUnit();
        const dmg = attackingUnit.getDamagePerAttack();


        attackedUnit = attackedUnit.modifyHealth(-dmg);
        state = state.setModel(attackedUnit);

        if (attackedUnit.getHealth() === 0) {
            // kill the unit and stop other attacks
            remainingSteps = _.clone(remainingSteps);
            remainingSteps = _.reject(remainingSteps, step => step.type === 'ATTACK_UNIT');
            remainingSteps.unshift({
                type: 'KILL_UNIT',
                data: {
                    unitLocation: attackedLocation
                }
            });

            console.log(remainingSteps);
        }

        return {
            state,
            remainingSteps
        };
    }
}

export default AttackUnitHandler;