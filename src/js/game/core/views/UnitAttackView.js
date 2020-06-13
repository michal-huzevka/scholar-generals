import _ from 'underscore';
import TileView from 'js/game/core/views/TileView';
import Player from 'js/game/core/models/Player';
import Grid from 'js/game/core/models/Grid';
import HexGrid from 'js/game/utils/hexGrid/HexGrid';
import BaseView from 'js/game/core/views/BaseView';

class UnitAttackView extends BaseView {
    constructor(generalOptions, viewOptions) {
        super(generalOptions, viewOptions);

        this.unitLocation = viewOptions.unitLocation;
        this.grid = this.gameState.getModel(Grid.staticGetModelType());
        this.hexGrid = new HexGrid(this.grid.getWidth(), this.grid.getHeight());

        const tileView = this.viewManager.getView(
            'TileView',
            this.gameState,
            { location: this.unitLocation }
        );
        this.unit = tileView.getUnit();
        this.opposingPlayer = Player.getOpponentId(this.unit.getOwner());

        this.hexGrid.getAllLocations().forEach((location) => {
            const id = location.x + ',' + location.y;
            const tile = this.viewManager.getView('TileView', this.gameState, { tileId: id });

            this.hexGrid.setLocationData(location, tile);
        });
    }

    getAttackableLocations = () => {
        const locations = this.hexGrid.getReachableLocations(this.unitLocation, this.unit.getRange());

        return locations.filter((location) => {
            const unit = this.hexGrid.getLocationData(location).getUnit();

            return unit && unit.getOwner() === this.opposingPlayer;
        });
    }
}

export default UnitAttackView;