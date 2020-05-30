import OffsetHex from 'js/core/OffsetHex';
import Point from 'js/core/Point';
import constants from 'js/core/constants';

const { HEXAGON_SIZE } = constants;

class AxialHex {
    // r is up down direction
    // q is diagonal direction
    constructor(r, q) {
        this.r = r;
        this.q = q;
    }

    // Use https://www.redblobgames.com/grids/hexagons/
    // odd-q flat top very important
    toOffsetHex() {
        var x = this.q;
        var z = this.r;

        var col = x;
        var row = z + (x - (x&1)) / 2

        // this is wrong!
        return new OffsetHex(col, row);
    }

    toPoint() {
        const x = HEXAGON_SIZE * (3/2 * this.q);
        const y = HEXAGON_SIZE * (Math.sqrt(3)/2 * this.q  +  Math.sqrt(3) * this.r);
        return new Point(x, y);
    }
}

export default AxialHex;