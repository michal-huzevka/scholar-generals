import Point from 'js/Point';

const HEIGHT = 5;
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
        this.tiles[2][3] = 'special';
    }

    offsetHexToAxialHex(hex) {
        var x = hex.col - (hex.row - (hex.row&1)) / 2
        var z = hex.row

        return { q: z, r: x };
    }

    getAllAxialHexes() {
        const hexes = [];
        for (let column = 0; column<WIDTH; column++) {
            for (let row = 0; row<HEIGHT; row++) {
                hexes.push({ col: column, row });
            }
        }
        return hexes.map(this.offsetHexToAxialHex);
    }
}

class Tile {

}

export default HexGrid;