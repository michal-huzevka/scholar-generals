import Player from 'js/game/core/models/Player';

class PlayersView {
    constructor(gameState) {
        this.gameState = gameState;
        this.activePlayerId = gameState.get('activePlayerId');
    }

    getActivePlayerId() {
        return this.activePlayerId;
    }

    getActivePlayer() {
        return this.gameState.getModel('Player', this.activePlayerId);
    }

    getPlayerById = (id) => {
        return this.gameState.getModel('Player', id);
    }
}

export default PlayersView;