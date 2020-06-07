import EndTurnHandler from 'js/game/core/actionHandlers/EndTurnHandler';
import MoveUnitHandler from 'js/game/core/actionHandlers/MoveUnitHandler';
import FightUnitHandler from 'js/game/core/actionHandlers/FightUnitHandler';

class ActionMaster {
    constructor() {
        this.handlers = [
            new EndTurnHandler(),
            new MoveUnitHandler(),
            new FightUnitHandler()
        ];
    }

    computeAction(action, state) {
        let result = [];

        this.handlers.forEach((handler) => {
            if (handler.getActionType() === action.type) {
                result = handler.computeAction(action, state);
            }
        });

        return result;
    }
}

export default ActionMaster;