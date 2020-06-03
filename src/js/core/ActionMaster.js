import EndTurnHandler from 'js/core/actionHandlers/EndTurnHandler';
import MoveUnitHandler from 'js/core/actionHandlers/MoveUnitHandler';

class ActionMaster {
    constructor() {
        this.handlers = [
            new EndTurnHandler(),
            new MoveUnitHandler()
        ];
    }

    computeAction(action, state) {
        let result = {
            state,
            outcome: null
        };

        this.handlers.forEach((handler) => {
            if (handler.getActionType() === action.type) {
                result = handler.computeAction(action, state);
            }
        });

        return result;
    }
}

export default ActionMaster;