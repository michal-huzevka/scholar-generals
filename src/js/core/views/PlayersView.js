import Player from 'js/core/models/Player';

class PlayersView {
    constructor(gameState) {
        this.gameState = gameState;
    }

    getActivePlayerId() {
        return this.gameState.get('activePlayerId');
    }

    getActivePlayer() {
        return this.gameState.getModel('Player', this.getActivePlayerId());
    }

    getPlayerById = (id) => {
        return this.gameState.getModel('Player', id);
    }
}

export default PlayersView;