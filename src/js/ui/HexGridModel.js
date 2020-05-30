
import _ from 'underscore';

class HexGridModel {
    constructor(hexGrid) {
        this.hexGrid = hexGrid;
        this.selectedLocation = null;
        this.eventListeners = {
            'tile:select': []
        };
    }

    getTileAt(x, y) {
        return this.hexGrid.getTileAt(x, y);
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