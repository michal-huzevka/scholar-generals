import GridView from 'js/core/views/GridView';
import PlayersView from 'js/core/views/PlayersView';
import Player from 'js/core/models/Player';

class MoveUnitHandler {
    getStepType() {
        return 'MOVE_UNIT';
    }

    computeStep(step, state, remainingSteps) {
        const { fromLocation, toLocation } = step.data;
        const gridView = new GridView(state);
        const playersView = new PlayersView(state);
        let fromTile = gridView.getTile(fromLocation);
        let toTile = gridView.getTile(toLocation);
        let unit = gridView.getUnit(fromLocation);
    
        const path = gridView.getPath(fromLocation, toLocation);
    
        unit = unit.spendMoves(path.length);
        fromTile = fromTile.setUnitId(null);
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

export default MoveUnitHandler;