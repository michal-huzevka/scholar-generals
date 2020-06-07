
class TileView {
    constructor(gameState, tileId) {
        this.tile = gameState.getModel('Tile', tileId);
        if (this.tile.getUnitId()) {
            this.unit = gameState.getModel('Unit', this.tile.getUnitId());
        } else {
            this.unit = null;
        }
    }

    static buildFromLocation(gameState, location) {
        const tileId = location.x + ',' + location.y;

        return new TileView(gameState, tileId);
    }

    getUnit() {
        return this.unit;
    }

    getTile() {
        return this.tile;
    }
}

export default TileView;