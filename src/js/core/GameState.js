import _ from 'underscore';
import Player from 'js/core/models/Player';
import ConnectedGrid from 'js/core/connectedModels/ConnectedGrid';
import ModelFactory from 'js/core/ModelFactory';

class GameState {
    constructor(store) {
        this.store = store;
    }

    getBoard() {
        return new ConnectedGrid(this);
    }

    getActivePlayerId() {
        return this.store.activePlayerId;
    }

    getActivePlayer() {
        return this.getModel('Player', this.store.activePlayerId);
    }

    setActivePlayer(id) {
        const store = _.clone(this.store);

        store.activePlayerId = id;

        return new GameState(store);
    }

    setModel(model) {
        let id = model.getId();
        const type = model.getModelType();
        if (!id) {
            id = '1';
        }

        const store = _.clone(this.store);
        
        store.models = _.clone(store.models);
        store.models[type] = _.clone(store.models[type]);
        store.models[type][id] = model;

        return new GameState(store);
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