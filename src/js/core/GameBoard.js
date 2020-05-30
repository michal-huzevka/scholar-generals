import Footman from 'js/core/unitTypes/Footman';
import Tile from 'js/core/Tile';
import BOARD_CONFIG from 'config/board';
import HexGrid from 'js/utils/hexGrid/HexGrid';

const WIDTH = BOARD_CONFIG.width;
const HEIGHT = BOARD_CONFIG.height;

// https://www.redblobgames.com/grids/hexagons/
class GameBoard {
    constructor() {
        // x, y
        this.hexGrid = new HexGrid(WIDTH, HEIGHT);
        this.hexGrid.getAllLocations().forEach((location) => {
            this.hexGrid.setLocationData(location, new Tile());
        });

        BOARD_CONFIG.units.forEach((unit) => {
            if (unit.type === 'footman') {
                this.hexGrid.getLocationData(unit.location).setUnit(new Footman());
            }
        });
    }

    getAllLocations() {
        return this.hexGrid.getAllLocations();
    }

    getTileAt(location) {
        return this.hexGrid.getLocationData(location);
    }
}

export default GameBoard;