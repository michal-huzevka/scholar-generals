import _ from 'underscore';
import Footman from 'js/core/unitTypes/Footman';
import TileView from 'js/core/views/TileView';
import Player from 'js/core/models/Player';
import Grid from 'js/core/models/Grid';
import HexGrid from 'js/utils/hexGrid/HexGrid';

class GridView {
    constructor(gameState) {
        this.grid = gameState.getModel(Grid.staticGetModelType());
        this.hexGrid = new HexGrid(this.grid.getWidth(), this.grid.getHeight());

        this.hexGrid.getAllLocations().forEach((location) => {
            const id = location.x + ',' + location.y;
            const tile = new TileView(gameState, id);

            this.hexGrid.setLocationData(location, tile);
        });
    }

    getAllUnitsForPlayer(playerId) {
        const locations = this.getAllLocations();
        const units = [];

        locations.forEach((location) => {
            const tile = this.getTileAt(location);
            const unit = tile.getUnit();

            if (unit && unit.getOwner() === playerId) {
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
        const opposingPlayer = unit.getOwner() === '1' ? '2' : '1';
        const locations = this.getAllLocations();
        const units = [];

        locations.forEach((location) => {
            const tile = this.getTileAt(location);
            const unit = tile.getUnit();

            if (unit && unit.getOwner() === opposingPlayer) {
                hexGrid.setObstacle(location);
            }
        });

        return hexGrid.getReachableLocations(location, unit.getMovesLeft());
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

export default GridView;