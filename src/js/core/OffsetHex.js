import AxialHex from 'js/core/AxialHex';
import Cube from 'js/core/Cube';

class OffsetHex {
    constructor(col, row) {
        this.col = col;
        this.row = row;
    }

    toAxialHex() {
        var x = this.col;
        var z = this.row - (this.col - (this.col&1)) / 2;

        var q = x;
        var r = z;

        return new AxialHex(r, q);
    }

    // odd-q shoves odd columns by +½ row
    // https://www.redblobgames.com/grids/hexagons/
    toCube() {
        var x = this.col;
        var z = this.row - (this.col - (this.col&1)) / 2;
        var y = -x-z;
        return new Cube(x, y, z);
    }
}

export default OffsetHex;