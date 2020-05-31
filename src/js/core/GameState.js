import GameBoard from 'js/core/GameBoard';
import Player from 'js/core/Player';

class GameState {
    constructor() {
        const player1 = new Player({ color: 'red', id: 1 });
        const player2 = new Player({ color: 'blue', id: 2 });
        this.players = [player1, player2];

        this.gameBoard = new GameBoard(this.players);
        this.step = 0;
    }

    getBoard() {
        return this.gameBoard;
    }
}

export default GameState;