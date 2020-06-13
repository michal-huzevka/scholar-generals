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


        fromTile = fromTile.removeUnit();
        toTile = toTile.setUnitId(unit.getId());
    
        // do the move
        state = state
            .setModel(fromTile)
            .setModel(toTile);

        // check if the unit has moved into enemy ZoC
        // if so, spend all moves
        const unitMovementView = this.viewManager.getView('UnitMovementView', state, {
            unitLocation: toLocation
        });

        if (unitMovementView.isUnitInEnemyZoneOfControl()) {
            unit = unit.setField('movesLeft', 0);
        } else {
            unit = unit.spendMoves(1);
        }

        state = state.setModel(unit);
    
        return {
            state,
            remainingSteps
        }
    }
}

export default MoveOneSpaceHandler;