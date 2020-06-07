import TileView from 'js/game/core/views/TileView';

class KillUnitHandler {
    getStepType() {
        return 'KILL_UNIT';
    }

    computeStep(step, state, remainingSteps) {
        const { unitLocation } = step.data;
        let tile = TileView.buildFromLocation(state, unitLocation).getTile();

        state = state.setModel(tile.removeUnit());

        return {
            state,
            remainingSteps
        };
    }
}

export default KillUnitHandler;