class GameHistory {
    constructor(gameState) {
        this.states = [gameState];
        this.currentStepCounter = 0;
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
}

export default GameHistory;