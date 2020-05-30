
import _ from 'underscore';

class HexGridModel {
    constructor(game) {
        this.game = game;
        this.selectedLocation = null;
        this.eventListeners = {
            'tile:select': []
        };
    }

    getBoard() {
        return this.game.getState().getBoard();
    }

    getTileAt(location) {
        return this.getBoard().getTileAt(location);
    }

    selectTile(location) {
        this.selectedLocation = location;

        this.trigger('tile:select', location);
    }

    trigger(eventName, eventData) {
        this.eventListeners[eventName].forEach(callback => callback(eventData));
    }

    onEvent(eventName, listener) {
        this.eventListeners[eventName].push(listener);
    }
    
    offEvent(eventName, listener) {
        const eventListeners = this.eventListeners[eventName];

        eventListeners = _.without(eventListeners, listener);
    }
}

export default HexGridModel;