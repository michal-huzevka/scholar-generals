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
            outcome: {
                path
            }
        };
    }
}

export default MoveUnitHandler;