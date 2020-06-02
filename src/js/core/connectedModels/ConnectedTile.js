
class ConnectedTile {
    constructor(gameState, tileId) {
        this.tile = gameState.getModel('Tile', tileId);
        if (this.tile.getUnitId()) {
            this.unit = gameState.getModel('Unit', this.tile.getUnitId());
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

export default ConnectedTile;