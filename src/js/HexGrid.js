import OffsetHex from 'js/OffsetHex';
import AxialHex from 'js/AxialHex';
// https://www.redblobgames.com/grids/hexagons/
const HEIGHT = 10;
const WIDTH = 5;

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

        console.log(this.tiles.length);

        this.tiles[3][0].setPawn('F');
        this.tiles[4][0].setPawn('F');
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

class Tile {
    setPawn(pawn) {
        this.pawn = pawn;
    }

    getPawn(pawn) {
        return this.pawn;
    }

}

export default HexGrid;