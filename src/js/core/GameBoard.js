import _ from 'underscore';
import Footman from 'js/core/unitTypes/Footman';
import Tile from 'js/core/Tile';
import Player from 'js/core/Player';
import BOARD_CONFIG from 'config/board';
import HexGrid from 'js/utils/hexGrid/HexGrid';

const WIDTH = BOARD_CONFIG.width;
const HEIGHT = BOARD_CONFIG.height;

class GameBoard {
    constructor(players) {
        this.hexGrid = new HexGrid(WIDTH, HEIGHT);
        this.hexGrid.getAllLocations().forEach((location) => {
            this.hexGrid.setLocationData(location, new Tile());
        });

        BOARD_CONFIG.units.forEach((unit) => {
            const owner = _.find(players, player => player.id === unit.owner);

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

    isUnitInMoveRange(unitLocation, targetLocation) {
        const unit = this.getTileAt(unitLocation).getUnit();
        const locations = this.getLocationsInRange(unitLocation, unit.moveSpeed);

        return _.find(locations, (location) => {
            return _.isEqual(targetLocation, location);
        });
    }
}

export default GameBoard;