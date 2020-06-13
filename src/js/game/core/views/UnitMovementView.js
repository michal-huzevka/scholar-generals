import _ from 'underscore';
import TileView from 'js/game/core/views/TileView';
import Player from 'js/game/core/models/Player';
import Grid from 'js/game/core/models/Grid';
import HexGrid from 'js/game/utils/hexGrid/HexGrid';
import BaseView from 'js/game/core/views/BaseView';

class UnitMovementView extends BaseView {
    constructor(generalOptions, viewOptions) {
        super(generalOptions, viewOptions);

        this.unitLocation = viewOptions.unitLocation;
        this.grid = this.gameState.getModel(Grid.staticGetModelType());
        this.hexGrid = new HexGrid(this.grid.getWidth(), this.grid.getHeight());

        const tileView = this.viewManager.getView('TileView', this.gameState, { location: this.unitLocation });
        const unit = tileView.getUnit();
        const opposingPlayer = Player.getOpponentId(unit.getOwner());

        this.hexGrid.getAllLocations().forEach((location) => {
            const id = location.x + ',' + location.y;
            const tile = this.viewManager.getView('TileView', this.gameState, { tileId: id });

            this.hexGrid.setLocationData(location, tile);

            const unit = tile.getUnit();

            if (unit && unit.getOwner() === opposingPlayer) {
                this.hexGrid.setObstacle(location);
            }
        });
    }

    getReachableLocations() {
        const unit = this.hexGrid.getLocationData(this.unitLocation).getUnit();

        return this.hexGrid.getReachableLocations(this.unitLocation, unit.getMovesLeft());
    }

    getPathTo = (toLocation) => {
        return this.hexGrid.getPath(this.unitLocation, toLocation);
    };

    isUnitInMoveRange(targetLocation) {
        const locations = this.getReachableLocations();

        return _.find(locations, (location) => {
            return _.isEqual(targetLocation, location);
        });
    }
}

export default UnitMovementView;