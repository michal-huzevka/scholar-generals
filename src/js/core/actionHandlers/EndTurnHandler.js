import GridView from 'js/core/views/GridView';
import PlayersView from 'js/core/views/PlayersView';
import Player from 'js/core/models/Player';
import GlobalView from 'js/core/views/GlobalView';

class EndTurnHandler {
    getActionType() {
        return 'END_TURN';
    }

    computeAction(action, state) {
        const playersView = new PlayersView(state);
        const globalView = new GlobalView(state);
    
        const units = globalView.getAllUnitsForActivePlayer();
    
        units.forEach((unit) => {
            state = state.setModel(unit.refresh());
        });
        const activePlayerId = Player.getOpponentId(playersView.getActivePlayerId());
    
        return {
            state: state.set('activePlayerId', activePlayerId),
            outcome: null
        };
    }
}

export default EndTurnHandler;