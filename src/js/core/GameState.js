import Player from 'js/core/models/Player';
import ConnectedGrid from 'js/core/connectedModels/ConnectedGrid';
import ModelFactory from 'js/core/ModelFactory';

class GameState {
    constructor(store) {
        this.store = store;
        this.board = new ConnectedGrid(this);
    }

    getBoard() {
        return this.board;
    }

    getActivePlayerId() {
        return this.store.activePlayerId;
    }

    getActivePlayer() {
        return this.getModel('Player', this.store.activePlayerId);
    }

    //TODO make immutable
    setActivePlayer(id) {
        this.store.activePlayerId = id;
    }
    
    getModel(type, id) {
        if (!id) {
            id = '1';
        }
        return this.store.models[type][id];
    }

    getPlayerById = (id) => {
        return this.getModel('Player', id);
    }
}

export default GameState;