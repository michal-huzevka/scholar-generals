import GridView from 'js/game/core/views/GridView';
import UnitMovementView from 'js/game/core/views/UnitMovementView';
import PlayersView from 'js/game/core/views/PlayersView';
import Player from 'js/game/core/models/Player';
import BaseActionHandler from 'js/game/core/actionHandlers/BaseActionHandler';

class MoveUnitHandler extends BaseActionHandler {
    getActionType() {
        return 'MOVE_UNIT';
    }

    computeAction(action, state) {
        const gridView = this.viewManager.getView('GridView', state);
        const playersView = this.viewManager.getView('PlayersView', state);
        const unitMovementView = new UnitMovementView(state, action.data.fromLocation);
        const path = unitMovementView.getPathTo(action.data.toLocation);
        const steps = [];
        let fromLocation = action.data.fromLocation;
        const unit = gridView.getUnit(fromLocation);

        if (unit.getOwner() !== playersView.getActivePlayerId()) {
            // invalid
            return [];
        }
        if (unit.getMovesLeft() === 0) {
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