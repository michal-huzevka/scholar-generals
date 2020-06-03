import _ from 'underscore';
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
            const tile = this.getTileView(location);
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
    
    getUnit(location) {
        return this.getTileView(location).getUnit();
    }

    getTile(location) {
        return this.getTileView(location).getTile();
    }

    getTileView(location) {
        return this.hexGrid.getLocationData(location);
    }

    getReachableLocations(location, unit) {
        const hexGrid = new HexGrid(this.grid.getWidth(), this.grid.getHeight());

        // set up obstacles for enemy players
        const opposingPlayer = Player.getOpponentId(unit.getOwner());
        const locations = this.getAllLocations();
        const units = [];

        locations.forEach((location) => {
            const tile = this.getTileView(location);
            const unit = tile.getUnit();

            if (unit && unit.getOwner() === opposingPlayer) {
                hexGrid.setObstacle(location);
            }
        });

        return hexGrid.getReachableLocations(location, unit.getMovesLeft());
    }

    // TODO: Make this consider obstacles
    getPath = (firstLocation, secondLocation) => {
        return this.hexGrid.getPath(firstLocation, secondLocation);
    };

    isUnitInMoveRange(unitLocation, targetLocation) {
        const unit = this.getTileView(unitLocation).getUnit();
        const locations = this.getReachableLocations(unitLocation, unit);

        return _.find(locations, (location) => {
            return _.isEqual(targetLocation, location);
        });
    }
}

export default GridView;