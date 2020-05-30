import OffsetHex from 'js/core/OffsetHex';
import AxialHex from 'js/core/AxialHex';
import Cube from 'js/core/Cube';
import Tile from 'js/core/Tile';
import Footman from 'js/core/unitTypes/Footman';
import BOARD_CONFIG from 'config/board';

const WIDTH = BOARD_CONFIG.width;
const HEIGHT = BOARD_CONFIG.height;

// https://www.redblobgames.com/grids/hexagons/
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

        const units = BOARD_CONFIG.units;

        units.forEach((unit) => {
            const { x, y } = unit.location;

            if (unit.type === 'footman') {
                this.tiles[x][y].setUnit(new Footman());
            }
        });
    }

    getHexesInRange(hex, n) {
        const results = [];
        const center = hex.toCube();

        console.log(center);

        for (let x = -n; x<=n; x++) {
            const max = Math.max(-n, -x-n);
            const min  = Math.min(n, -x+n);

            for (let y = max; y<= min; y++) {
                const z = -x-y;
                const cube = { x, y, z };

                results.push(center.add(new Cube(x, y, z)));
            }
        }

        console.log(results);
        return results;
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