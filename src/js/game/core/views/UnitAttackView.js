import _ from 'underscore';
import TileView from 'js/game/core/views/TileView';
import Player from 'js/game/core/models/Player';
import Grid from 'js/game/core/models/Grid';
import HexGrid from 'js/game/utils/hexGrid/HexGrid';

class UnitAttackView {
    constructor(gameState, unitLocation) {
        this.unitLocation = unitLocation;
        this.grid = gameState.getModel(Grid.staticGetModelType());
        this.hexGrid = new HexGrid(this.grid.getWidth(), this.grid.getHeight());

        const tileView = new TileView(gameState, unitLocation.x + ',' + unitLocation.y);
        const unit = tileView.getUnit();
        this.opposingPlayer = Player.getOpponentId(unit.getOwner());

        this.hexGrid.getAllLocations().forEach((location) => {
            const id = location.x + ',' + location.y;
            const tile = new TileView(gameState, id);

            this.hexGrid.setLocationData(location, tile);
        });
    }

    getAttackableLocations = () => {
        const locations = this.hexGrid.getReachableLocations(this.unitLocation, 1);

        return locations.filter((location) => {
            const unit = this.hexGrid.getLocationData(location).getUnit();

            return unit && unit.getOwner() === this.opposingPlayer;
        });
    }
}

export default UnitAttackView;