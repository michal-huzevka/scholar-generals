import GridView from 'js/core/views/GridView';
import GlobalView from 'js/core/views/GlobalView';
import PlayersView from 'js/core/views/PlayersView';
import Player from 'js/core/models/Player';

class ActionMaster {
    computeAction(action, state) {
        let newState = state;
        let outcome = {};
        if (action.type === 'MOVE_UNIT') {
            const { fromLocation, toLocation } = action.data;

            newState = this.moveUnit(fromLocation, toLocation, state);
        }

        if (action.type === 'END_TURN') {
            newState = this.endTurn(state);
        }

        return {
            state: newState,
            outcome: {}
        }
    }

    moveUnit = (fromLocation, toLocation, state) => {
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

        return state;
    }

    endTurn = (state) => {
        const playersView = new PlayersView(state);
        const globalView = new GlobalView(state);

        const units = globalView.getAllUnitsForActivePlayer();

        units.forEach((unit) => {
            state = state.setModel(unit.refresh());
        });
        const activePlayerId = Player.getOpponentId(playersView.getActivePlayerId());

        return state.set('activePlayerId', activePlayerId);
    }
}

export default ActionMaster;