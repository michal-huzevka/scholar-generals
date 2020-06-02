import _ from 'underscore';
import GameState from 'js/core/GameState';
import initialGameState from 'js/core/initialGameState';
import GridView from 'js/core/views/GridView';
import ActionMaster from 'js/core/ActionMaster';

class Game {
    constructor() {
        this.gameState = initialGameState();
        this.eventListeners = {
            'step:increase': []
        };
        this.actionMaster = new ActionMaster();
    }

    getGridView() {
        return new GridView(this.gameState);
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
        const step = state.get('step') + 1;

        this.gameState = state.set('step', step);
        this.trigger('step:increase', step);
    }

    doAction = (action) => {
        const result = this.actionMaster.computeAction(action, this.getState())

        this.setState(result.state);
    }
}

export default Game;