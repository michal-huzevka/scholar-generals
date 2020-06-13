import GridView from 'js/game/core/views/GridView';
import Player from 'js/game/core/models/Player';
import BaseStepHandler from 'js/game/core/stepHandlers/BaseStepHandler';

class MoveOneSpaceHandler extends BaseStepHandler {
    getStepType() {
        return 'MOVE_ONE_SPACE';
    }

    computeStep(step, state, remainingSteps) {
        // Assume the move is always one space
        const { fromLocation, toLocation } = step.data;
        const gridView = this.viewManager.getView('GridView', state);
        let fromTile = gridView.getTile(fromLocation);
        let toTile = gridView.getTile(toLocation);
        let unit = gridView.getUnit(fromLocation);
    
        unit = unit.spendMoves(1);

        fromTile = fromTile.removeUnit();
        toTile = toTile.setUnitId(unit.getId());
    
        state = state
            .setModel(unit)
            .setModel(fromTile)
            .setModel(toTile);
    
        return {
            state,
            remainingSteps
        }
    }
}

export default MoveOneSpaceHandler;