import _ from 'underscore';
import GameState from 'js/core/GameState';
import initialGameState from 'js/core/initialGameState';
import GridView from 'js/core/views/GridView';
import ActionMaster from 'js/core/ActionMaster';
import StepMaster from 'js/core/StepMaster';
import GameHistory from 'js/core/GameHistory';

class Game {
    constructor() {
        this.gameState = initialGameState();
        this.eventListeners = {
            'stepCounter:increase': []
        };
        this.actionMaster = new ActionMaster();
        this.stepMaster = new StepMaster();
        this.gameHistory = new GameHistory(this.gameState);
        this.lastAction = null;
    }

    getHistory() {
        return this.gameHistory;
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
        this.gameState = state;
        this.gameHistory.addState(state);
        this.trigger('stepCounter:increase', state.get('stepCounter'));

        document.gs = state;
    }

    doAction = (action) => {
        let remainingSteps = this.actionMaster.computeAction(action, this.getState());

        while (remainingSteps.length) {
            const step = remainingSteps[0];
            
            remainingSteps = _.rest(remainingSteps);
            const result = this.stepMaster.computeStep(step, this.getState(), remainingSteps);

            remainingSteps = result.remainingSteps;

            this.setState(result.state);
        }
        this.lastAction = action;
    }

    getLastAction = () => {
        return this.lastAction;
    }
}

export default Game;