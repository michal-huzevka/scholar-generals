import GameState from 'js/core/GameState';

class Game {
    constructor() {
        this.gameState = new GameState();
    }

    getState() {
        return this.gameState;
    }

    setState(state) {
        this.gameState = state;
    }

    moveUnit(fromLocation, toLocation) {

    }
}

export default Game;