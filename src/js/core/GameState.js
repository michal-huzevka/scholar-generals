import GameBoard from 'js/core/GameBoard';
import Player from 'js/core/models/Player';
import ModelFactory from 'js/core/ModelFactory';

class GameState {
    constructor() {
        this.gameBoard = new GameBoard();
        this.step = 0;
        this.store = {
            collections: {
                'Player': {
                    '1': {
                        color: 'red'
                    },
                    '2': {
                        color: 'blue'
                    }
                }
            },
            singles: {

            },
            activePlayerId: '1'
        };
        console.log(this.store);
    }

    getBoard() {
        return this.gameBoard;
    }

    getActivePlayerId() {
        return this.store.activePlayerId;
    }

    getActivePlayer() {
        return this.getModel(this.store.activePlayerId, 'Player');
    }

    //TODO make immutable
    setActivePlayer(id) {
        this.store.activePlayerId = id;
    }
    
    getModel(id, type) {
        const data = this.store.collections[type][id];

        return ModelFactory.build(id, data, type);
    }

    getPlayerById = (id) => {
        return this.getModel(id, 'Player');
    }
}

export default GameState;