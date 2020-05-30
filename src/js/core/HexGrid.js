import OffsetHex from 'js/core/OffsetHex';
import AxialHex from 'js/core/AxialHex';
import Tile from 'js/core/Tile';
import Footman from 'js/core/unitTypes/Footman';
// https://www.redblobgames.com/grids/hexagons/
const HEIGHT = 12;
const WIDTH = 8;

class HexGrid {
    constructor() {
        // x, y
        this.tiles = [];

        for (let column = 0; column<WIDTH; column++) {
            this.tiles.push([]);
            for (let row = 0; row<HEIGHT; row++) {
                this.tiles[column].push(new Tile());
            }
        }

        this.tiles[3][0].setUnit(new Footman());
        this.tiles[4][0].setUnit(new Footman());
    }

    getTiles() {
        return this.tiles;
    }

    getTileAt(x, y) {
        return this.tiles[x][y];
    }

    getAllAxialHexes() {
        const hexes = [];
        for (let column = 0; column<WIDTH; column++) {
            for (let row = 0; row<HEIGHT; row++) {
                hexes.push(new OffsetHex(column, row));
            }
        }
        return hexes.map(hex => hex.toAxialHex());
    }
}

export default HexGrid;