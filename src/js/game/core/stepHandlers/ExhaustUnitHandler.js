import TileView from 'js/game/core/views/TileView';

class ExhaustUnitHandler {
    getStepType() {
        return 'EXHAUST_UNIT';
    }

    computeStep(step, state, remainingSteps) {
        const { unitLocation } = step.data;
        const unit = TileView.buildFromLocation(state, unitLocation).getUnit();

        state = state.setModel(unit.exhaustUnit());

        return {
            state,
            remainingSteps
        };
    }
}

export default ExhaustUnitHandler;