import GameState from 'js/core/GameState';
import cloneDeep from 'js/utils/cloneDeep';

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
        //TODO: Not working yet
        const state = _.cloneDeep(this.gameState);
        const board = state.getBoard();

        const tile = board.getTileAt(fromLocation);
        const unit = tile.getUnit();

        tile.setUnit(null);

        board.getTileAt(toLocation).setUnit(unit);

        this.setState(state);
    }
}

export default Game;