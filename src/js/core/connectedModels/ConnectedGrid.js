import _ from 'underscore';
import Footman from 'js/core/unitTypes/Footman';
import Tile from 'js/core/Tile';
import Player from 'js/core/models/Player';
import Grid from 'js/core/models/Grid';
import BOARD_CONFIG from 'config/board';
import HexGrid from 'js/utils/hexGrid/HexGrid';

class ConnectedGrid {
    constructor(gameState) {
        this.grid = gameState.getModel(Grid.staticGetModelType());
        this.hexGrid = new HexGrid(this.grid.getWidth(), this.grid.getHeight());

        this.hexGrid.getAllLocations().forEach((location) => {
            this.hexGrid.setLocationData(location, new Tile());
        });

        BOARD_CONFIG.units.forEach((unit) => {
            if (unit.type === 'footman') {
                this.hexGrid.getLocationData(unit.location).setUnit(new Footman(unit.owner));
            }
        });
    }

    getAllUnitsForPlayer(playerId) {
        const locations = this.getAllLocations();
        const units = [];

        locations.forEach((location) => {
            const tile = this.getTileAt(location);
            const unit = tile.getUnit();

            if (unit && unit.ownerId === playerId) {
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
        const hexGrid = new HexGrid(this.grid.getWidth(), this.grid.getHeight());

        // set up obstacles for enemy players
        const opposingPlayer = unit.ownerId === '1' ? '2' : '1';
        const locations = this.getAllLocations();
        const units = [];

        locations.forEach((location) => {
            const tile = this.getTileAt(location);
            const unit = tile.getUnit();

            if (unit && unit.ownerId === opposingPlayer) {
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

export default ConnectedGrid;