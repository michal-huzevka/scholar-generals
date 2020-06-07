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

        return {
            state,
            remainingSteps
        };
    }
}

export default AttackUnitHandler;