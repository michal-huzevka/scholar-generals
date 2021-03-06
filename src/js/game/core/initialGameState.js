import _ from 'underscore';
import Player from 'js/game/core/models/Player';
import Grid from 'js/game/core/models/Grid';
import GameState from 'js/game/core/GameState';

import BOARD_CONFIG from 'config/board';
import Tile from 'js/game/core/models/Tile';
import Unit from 'js/game/core/models/Unit';

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
            const tileConfig = _.find(BOARD_CONFIG.tiles, (tile) =>
                tile.location.x === x && tile.location.y === y);

            if (tileConfig) {
                const terrain = tileConfig.terrain;

                tiles[id] = new Tile({ id, terrain });
            } else {
                tiles[id] = new Tile({ id, terrain: 'grass' });

            }
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
                'default': grid
            },
            'Tile': tiles,
            'Unit': units
        },
        activePlayerId: player1.getId(),
        stepCounter: 0,
        lastStep: null
    };

    const gameState = new GameState(store);

    return gameState;
}
export default initialGameState;