import BaseView from 'js/game/core/views/BaseView';
import TileView from 'js/game/core/views/TileView';
import Grid from 'js/game/core/models/Grid';
import HexGrid from 'js/game/utils/hexGrid/HexGrid';

class GridView extends BaseView {
    constructor(generalOptions) {
        super(generalOptions);

        this.grid = this.gameState.getModel(Grid.staticGetModelType());
        this.hexGrid = new HexGrid(this.grid.getWidth(), this.grid.getHeight());

        this.hexGrid.getAllLocations().forEach((location) => {
            const id = location.x + ',' + location.y;
            const tile = this.viewManager.getView('TileView', this.gameState, { tileId: id });

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
}

export default GridView;