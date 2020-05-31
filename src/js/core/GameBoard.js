import _ from 'underscore';
import cloneDeep from 'js/utils/cloneDeep';
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

    getAllUnitsForPlayer(playerId) {
        const locations = this.getAllLocations();
        const units = [];

        locations.forEach((location) => {
            const tile = this.getTileAt(location);
            const unit = tile.getUnit();

            if (unit && unit.getOwner().id === playerId) {
                units.push(unit);
            }
        });

        return units;
    }

    getAllLocations() {
        return this.hexGrid.getAllLocations();
    }

    getTileAt(location) {
        return this.hexGrid.getLocationData(location);
    }

    getReachableLocations(location, unit) {
        const hexGrid = cloneDeep(this.hexGrid);

        // set up obstacles for enemy players
        const opposingPlayer = unit.getOwner().id === 1 ? 2 : 1;
        const locations = this.getAllLocations();
        const units = [];

        locations.forEach((location) => {
            const tile = this.getTileAt(location);
            const unit = tile.getUnit();

            if (unit && unit.getOwner().id === opposingPlayer) {
                hexGrid.setObstacle(location);
            }
        });

        return hexGrid.getReachableLocations(location, unit.movesLeft);
    }

    getDistance = (firstLocation, secondLocation) => {
        return this.hexGrid.getDistance(firstLocation, secondLocation);
    };

    isUnitInMoveRange(unitLocation, targetLocation) {
        const unit = this.getTileAt(unitLocation).getUnit();
        const locations = this.getReachableLocations(unitLocation, unit);

        return _.find(locations, (location) => {
            return _.isEqual(targetLocation, location);
        });
    }
}

export default GameBoard;