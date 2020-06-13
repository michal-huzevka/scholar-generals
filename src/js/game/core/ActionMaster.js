import EndTurnHandler from 'js/game/core/actionHandlers/EndTurnHandler';
import MoveUnitHandler from 'js/game/core/actionHandlers/MoveUnitHandler';
import FightUnitHandler from 'js/game/core/actionHandlers/FightUnitHandler';

class ActionMaster {
    constructor(viewManager) {
        const options = { viewManager };

        this.handlers = [
            new EndTurnHandler(options),
            new MoveUnitHandler(options),
            new FightUnitHandler(options)
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