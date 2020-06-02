import _ from 'underscore';
import GameState from 'js/core/GameState';
import initialGameState from 'js/core/initialGameState';
import cloneDeep from 'js/utils/cloneDeep';

class Game {
    constructor() {
        this.gameState = initialGameState();

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
        state.store.step++;
        this.gameState = state;
        this.trigger('step:increase', state.store.step);
    }

    moveUnit = (fromLocation, toLocation) => {
        //TODO: check this is a valid move
        const state = cloneDeep(this.gameState);
        const board = state.getBoard();
        const tile = board.getTileAt(fromLocation);
        const unit = tile.getUnit();

        if (unit.ownerId !== state.getActivePlayerId()) {
            return false;
        }

        unit.movesLeft -= board.getDistance(fromLocation, toLocation);

        tile.setUnit(null);

        board.getTileAt(toLocation).setUnit(unit);

        this.setState(state);
    }

    endTurn = () => {
        const state = cloneDeep(this.gameState);

        const units = state.getBoard().getAllUnitsForPlayer(state.getActivePlayerId());

        units.forEach((unit) => unit.refresh());
        const activePlayerId = state.getActivePlayerId() === '1' ? '2' : '1';

        let newState = state.setActivePlayer(activePlayerId);

        this.setState(newState);
    }
}

export default Game;