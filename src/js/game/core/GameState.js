import _ from 'underscore';

class GameState {
    constructor(store) {
        this.store = store;
    }

    get(key) {
        return this.store[key];
    }

    set(key, value) {
        const store = _.clone(this.store);

        store[key] = value;

        return new GameState(store);
    }

    setModel(model) {
        let id = model.getId();
        const type = model.getModelType();
        if (!id) {
            id = 'default';
        }

        const store = _.clone(this.store);
        
        store.models = _.clone(store.models);
        store.models[type] = _.clone(store.models[type]);
        store.models[type][id] = model;

        return new GameState(store);
    }

    removeModel(model) {
        let id = model.getId();
        const type = model.getModelType();
        const store = _.clone(this.store);

        store.models = _.clone(store.models);
        store.models[type] = _.clone(store.models[type]);
        delete store.models[type][id];

        return new GameState(store);
    }
    
    getModel(type, id) {
        if (!id) {
            id = 'default';
        }
        return this.store.models[type][id];
    }
}

export default GameState;