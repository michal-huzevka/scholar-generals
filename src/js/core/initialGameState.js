import Player from 'js/core/models/Player';
import Grid from 'js/core/models/Grid';
import GameState from 'js/core/GameState';

import BOARD_CONFIG from 'config/board';

const WIDTH = BOARD_CONFIG.width;
const HEIGHT = BOARD_CONFIG.height;

const initialGameState = () => {
    const player1 = new Player({ id: '1', color: 'red' });
    const player2 = new Player({ id: '2', color: 'blue'});
    const grid = new Grid({ id: '1', width: WIDTH, height: HEIGHT });
    const store = {
        models: {
            'Player': {
                [player1.getId()]: player1,
                [player2.getId()]: player2,
            },
            'Grid': {
                '1': grid
            }
        },
        activePlayerId: player1.getId(),
        step: 0
    };

    const gameState = new GameState(store);

    return gameState;
}
export default initialGameState;