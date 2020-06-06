import GridView from 'js/game/core/views/GridView';
import UnitMovementView from 'js/game/core/views/UnitMovementView';
import PlayersView from 'js/game/core/views/PlayersView';
import Player from 'js/game/core/models/Player';


class MoveUnitHandler {
    getActionType() {
        return 'MOVE_UNIT';
    }

    computeAction(action, state) {
        const gridView = new GridView(state);
        const playersView = new PlayersView(state);
        const unitMovementView = new UnitMovementView(state, action.data.fromLocation);
        const path = unitMovementView.getPathTo(action.data.toLocation);
        const steps = [];
        let fromLocation = action.data.fromLocation;

        if (gridView.getUnit(fromLocation).getOwner() !== playersView.getActivePlayerId()) {
            // invalid
            return [];
        }

        path.forEach((location) => {
            steps.push({
                type: 'MOVE_ONE_SPACE',
                data: {
                    fromLocation,
                    toLocation: location
                }
            });
            fromLocation = location;
        });

        return steps;
    }
}

export default MoveUnitHandler;