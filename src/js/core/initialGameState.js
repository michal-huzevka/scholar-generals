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

    const units = {};
    let unitIdInteger = 0;

    BOARD_CONFIG.units.forEach((unitConfig) => {
        const id = unitConfig.location.x + ',' + unitConfig.location.y;
        const unitId = unitIdInteger.toString();
        const unit = new Unit({ id: unitId, owner: unitConfig.owner, type: unitConfig.type });

        units[unitId] = unit;
        tiles[id] = tiles[id].setUnitId(unitId);

        unitIdInteger++;
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
            'Tile': tiles,
            'Unit': units
        },
        activePlayerId: player1.getId(),
        step: 0
    };
    console.log(store);

    const gameState = new GameState(store);

    return gameState;
}
export default initialGameState;