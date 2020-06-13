import BaseActionHandler from 'js/game/core/actionHandlers/BaseActionHandler';

class EndTurnHandler extends BaseActionHandler {
    getActionType() {
        return 'END_TURN';
    }

    computeAction(action, state) {
        return [{
            type: 'END_TURN'
        }];
    }
}

export default EndTurnHandler;