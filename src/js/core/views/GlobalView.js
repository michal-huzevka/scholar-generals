
import GridView from 'js/core/views/GridView';
import PlayersView from 'js/core/views/PlayersView';

class GlobalView {
    constructor(gameState) {
        this.gameState = gameState;
        this.gridView = new GridView(gameState);
        this.playersView = new PlayersView(gameState);
    }

    getAllUnitsForActivePlayer() {
        return this.gridView.getAllUnitsForPlayer(this.playersView.getActivePlayerId());
    }
}

export default GlobalView;