import _ from 'underscore';
import TileView from 'js/game/core/views/TileView';

class KillUnitHandler {
    getStepType() {
        return 'KILL_UNIT';
    }

    computeStep(step, state, remainingSteps) {
        const { unitLocation } = step.data;
        let tileView = TileView.buildFromLocation(state, unitLocation);

        state = state
            .removeModel(tileView.getUnit())
            .setModel(tileView.getTile().removeUnit());

        remainingSteps = _.clone(remainingSteps);
        remainingSteps = _.reject(remainingSteps, step => step.type === 'ATTACK_UNIT');
        remainingSteps = _.reject(remainingSteps, (step) => {
            return step.type === 'EXHAUST_UNIT' && step.data.unitLocation === unitLocation;
        });
        return {
            state,
            remainingSteps
        };
    }
}

export default KillUnitHandler;