import BaseView from 'js/game/core/views/BaseView';
import Player from 'js/game/core/models/Player';

class PlayersView extends BaseView {
    constructor(generalOptions) {
        super(generalOptions);
        this.activePlayerId = this.gameState.get('activePlayerId');
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