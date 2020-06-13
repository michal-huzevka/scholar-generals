class GameHistory {
    constructor(gameState, viewManager) {
        this.states = [gameState];
        this.currentStepCounter = 0;
        this.viewManager = viewManager;
    }

    // allows you to go see what happened in the past
    setStepCounter(stepCounter) {
        this.currentStepCounter = stepCounter;
    }

    addState(state) {
        this.states.push(state);
    }

    getState() {
        return this.states[this.currentStepCounter];
    }

    getView = (viewName, viewOptions) => {
        const gameState = this.getState()

        return this.viewManager.getView(viewName, gameState, viewOptions);
    }
}

export default GameHistory;