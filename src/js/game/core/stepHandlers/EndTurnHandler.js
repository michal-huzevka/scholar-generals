import GridView from 'js/game/core/views/GridView';
import PlayersView from 'js/game/core/views/PlayersView';
import Player from 'js/game/core/models/Player';
import GlobalView from 'js/game/core/views/GlobalView';

class EndTurnHandler {
    getStepType() {
        return 'END_TURN';
    }

    computeStep(step, state, remainingSteps) {
        const playersView = new PlayersView(state);
        const globalView = new GlobalView({ gameState: state });
    
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