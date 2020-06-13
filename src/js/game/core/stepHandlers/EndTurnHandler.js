import GridView from 'js/game/core/views/GridView';
import PlayersView from 'js/game/core/views/PlayersView';
import Player from 'js/game/core/models/Player';
import GlobalView from 'js/game/core/views/GlobalView';
import BaseStepHandler from 'js/game/core/stepHandlers/BaseStepHandler';

class EndTurnHandler extends BaseStepHandler {
    getStepType() {
        return 'END_TURN';
    }

    computeStep(step, state, remainingSteps) {
        const playersView = this.viewManager.getView('PlayersView', state);
        const globalView = this.viewManager.getView('GlobalView', state);
    
        const units = globalView.getAllUnitsForActivePlayer();
    
        units.forEach((unit) => {
            state = state.setModel(unit.refresh());
        });
        const activePlayerId = Player.getOpponentId(playersView.getActivePlayerId());
    
        state = state.set('activePlayerId', activePlayerId);

        return {
            state,
            remainingSteps
        };
    }
}

export default EndTurnHandler;