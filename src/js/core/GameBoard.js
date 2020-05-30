import Footman from 'js/core/unitTypes/Footman';
import Tile from 'js/core/Tile';
import Player from 'js/core/Player';
import BOARD_CONFIG from 'config/board';
import HexGrid from 'js/utils/hexGrid/HexGrid';

const WIDTH = BOARD_CONFIG.width;
const HEIGHT = BOARD_CONFIG.height;

// https://www.redblobgames.com/grids/hexagons/
class GameBoard {
    constructor() {
        const player1 = new Player({ color: 'red', id: 1 });
        const player2 = new Player({ color: 'blue', id: 2 });
        this.hexGrid = new HexGrid(WIDTH, HEIGHT);
        this.players = [player1, player2];
        this.hexGrid.getAllLocations().forEach((location) => {
            this.hexGrid.setLocationData(location, new Tile());
        });

        BOARD_CONFIG.units.forEach((unit) => {
            const owner = unit.owner === 1 ? player1 : player2;

            if (unit.type === 'footman') {
                this.hexGrid.getLocationData(unit.location).setUnit(new Footman(owner));
            }
        });
    }

    getAllLocations() {
        return this.hexGrid.getAllLocations();
    }

    getTileAt(location) {
        return this.hexGrid.getLocationData(location);
    }

    getLocationsInRange(location, numberOfSpaces) {
        return this.hexGrid.getLocationsInRange(location, numberOfSpaces);
    }
}

export default GameBoard;