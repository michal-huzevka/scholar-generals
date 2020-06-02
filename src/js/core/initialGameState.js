import Player from 'js/core/models/Player';
import Grid from 'js/core/models/Grid';
import GameState from 'js/core/GameState';

import BOARD_CONFIG from 'config/board';
import Tile from 'js/core/models/Tile';
import Unit from 'js/core/models/Unit';

const WIDTH = BOARD_CONFIG.width;
const HEIGHT = BOARD_CONFIG.height;

const initialGameState = () => {
    const player1 = new Player({ id: '1', color: 'red' });
    const player2 = new Player({ id: '2', color: 'blue'});
    const grid = new Grid({ id: '1', width: WIDTH, height: HEIGHT });
    const tiles = {};

    for (let x = 0; x<WIDTH; x++) {
        for (let y = 0; y<HEIGHT; y++) {
            const id = `${x},${y}`;

            tiles[id] = new Tile({ id });
        }
    }

    BOARD_CONFIG.units.forEach((unit) => {
        const id = unit.location.x + ',' + unit.location.y;

        tiles[id].setUnit(new Unit({ owner: unit.owner, type: unit.type }));
    });

    const store = {
        models: {
            'Player': {
                [player1.getId()]: player1,
                [player2.getId()]: player2,
            },
            'Grid': {
                '1': grid
            },
            'Tile': tiles
        },
        activePlayerId: player1.getId(),
        step: 0
    };

    const gameState = new GameState(store);

    return gameState;
}
export default initialGameState;