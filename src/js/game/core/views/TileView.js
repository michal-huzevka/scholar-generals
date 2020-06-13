import BaseView from 'js/game/core/views/BaseView';

class TileView extends BaseView {
    constructor(generalOptions, viewOptions) {
        super(generalOptions, viewOptions);
        let tileId;

        if (viewOptions.tileId) {
            tileId = viewOptions.tileId;
        } else if (viewOptions.location) {
            tileId = viewOptions.location.x + ',' + viewOptions.location.y;
        }

        this.tile = this.gameState.getModel('Tile', tileId);
        if (this.tile.getUnitId()) {
            this.unit = this.gameState.getModel('Unit', this.tile.getUnitId());
        } else {
            this.unit = null;
        }
    }

    getUnit() {
        return this.unit;
    }

    getTile() {
        return this.tile;
    }
}

export default TileView;