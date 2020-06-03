import GridView from 'js/core/views/GridView';
import PlayersView from 'js/core/views/PlayersView';
import Player from 'js/core/models/Player';

class MoveUnitHandler {
    getActionType() {
        return 'MOVE_UNIT';
    }

    computeAction(action, state) {
        const { fromLocation, toLocation } = action.data;
        const gridView = new GridView(state);
        const playersView = new PlayersView(state);
        let fromTile = gridView.getTile(fromLocation);
        let toTile = gridView.getTile(toLocation);
        let unit = gridView.getUnit(fromLocation);
    
        if (unit.getOwner() !== playersView.getActivePlayerId()) {
            return false;
        }
    
        unit = unit.spendMoves(gridView.getDistance(fromLocation, toLocation));
        fromTile = fromTile.setUnitId(null);
        toTile = toTile.setUnitId(unit.getId());
    
        state = state
            .setModel(unit)
            .setModel(fromTile)
            .setModel(toTile);
    
        return {
            state,
            outcome: {}
        };
    }
}

export default MoveUnitHandler;