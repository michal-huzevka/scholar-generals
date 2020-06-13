import _ from 'underscore';
import GameState from 'js/game/core/GameState';
import initialGameState from 'js/game/core/initialGameState';
import ActionMaster from 'js/game/core/ActionMaster';
import StepMaster from 'js/game/core/StepMaster';
import GameHistory from 'js/game/core/GameHistory';
import ViewManager from 'js/game/core/ViewManager';

class CoreMain {
    constructor() {
        this.gameState = initialGameState();
        this.eventListeners = {
            'stepCounter:increase': [],
            'action:complete': []
        };
        this.actionMaster = new ActionMaster();
        this.gameHistory = new GameHistory(this.gameState);
        this.viewManager = new ViewManager();
        this.stepMaster = new StepMaster(this.viewManager);
        this.lastAction = null;
    }

    getHistory() {
        return this.gameHistory;
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
        this.trigger('action:complete');
    }

    getLastAction = () => {
        return this.lastAction;
    }

    getView = (viewName, stepCounter, viewOptions) => {
        const generalOptions = {
            gameState: this.gameHistory.getStateAt(stepCounter),
            viewManager: this.viewManager
        };
        return this.viewManager.getView(viewName, generalOptions, viewOptions);
    }
}

export default CoreMain;