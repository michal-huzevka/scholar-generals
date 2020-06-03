import GridView from 'js/core/views/GridView';
import PlayersView from 'js/core/views/PlayersView';
import Player from 'js/core/models/Player';


class MoveUnitHandler {
    getActionType() {
        return 'MOVE_UNIT';
    }

    computeAction(action, state) {
        const gridView = new GridView(state);
        const playersView = new PlayersView(state);
        const path = gridView.getPath(action.data.fromLocation, action.data.toLocation);
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