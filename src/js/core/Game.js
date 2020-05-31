import GameState from 'js/core/GameState';
import cloneDeep from 'js/utils/cloneDeep';

class Game {
    constructor() {
        this.gameState = new GameState();

        this.eventListeners = {
            'step:increase': []
        };
    }

    onEvent(eventName, listener) {
        this.eventListeners[eventName].push(listener);
    }
    
    offEvent(eventName, listener) {
        const eventListeners = this.eventListeners[eventName];

        eventListeners = _.without(eventListeners, listener);
    }

    trigger(eventName, eventData) {
        this.eventListeners[eventName].forEach(callback => callback(eventData));
    }

    getState() {
        return this.gameState;
    }

    setState(state) {
        state.step++;
        this.gameState = state;
        this.trigger('step:increase', state.step);
    }

    moveUnit(fromLocation, toLocation) {
        //TODO: Not working yet
        const state = cloneDeep(this.gameState);
        const board = state.getBoard();

        const tile = board.getTileAt(fromLocation);
        const unit = tile.getUnit();

        tile.setUnit(null);

        board.getTileAt(toLocation).setUnit(unit);

        this.setState(state);
    }

    changePlayer1Color = (color) => {
        const state = cloneDeep(this.gameState);

        state.players[0].color = color;

        this.setState(state);
    }
}

export default Game;